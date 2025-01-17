#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ErrorCode,
    ListToolsRequestSchema,
    McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { TicketmasterClient } from './TicketmasterClient.js';
import { TicketmasterApiError } from './types.js';

const API_KEY = process.env.TICKETMASTER_API_KEY;
if (!API_KEY) {
    throw new Error('TICKETMASTER_API_KEY environment variable is required');
}

// Now TypeScript knows API_KEY is definitely a string
const client = new TicketmasterClient(API_KEY);

class TicketmasterServer {
    private server: Server;
    private client: TicketmasterClient;

    constructor() {
        this.client = client;
        this.server = new Server(
            {
                name: 'ticketmaster',
                version: '0.1.0',
            },
            {
                capabilities: {
                    tools: {},
                },
            }
        );

        this.setupToolHandlers();
        
        this.server.onerror = (error) => console.error('[MCP Error]', error);
        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }

    private setupToolHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: [
                {
                    name: 'find_msg_events',
                    description: 'Get events at Madison Square Garden for next month',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            startDate: {
                                type: 'string',
                                description: 'Start date in YYYY-MM-DD format',
                            },
                            endDate: {
                                type: 'string',
                                description: 'End date in YYYY-MM-DD format',
                            },
                        },
                        required: ['startDate', 'endDate'],
                    },
                },
            ],
        }));

        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            if (request.params.name !== 'find_msg_events') {
                throw new McpError(
                    ErrorCode.MethodNotFound,
                    `Unknown tool: ${request.params.name}`
                );
            }

            const { startDate, endDate } = request.params.arguments as {
                startDate: string;
                endDate: string;
            };

            try {
                const events = await this.client.getEventsAtVenue(
                    new Date(startDate),
                    new Date(endDate)
                );

                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(events, null, 2),
                        },
                    ],
                };
            } catch (error) {
                if (error instanceof TicketmasterApiError) {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `API Error: ${error.message} (Code: ${error.code}, Status: ${error.status})`,
                            },
                        ],
                        isError: true,
                    };
                }
                throw error;
            }
        });
    }

    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('Ticketmaster MCP server running on stdio');
    }
}

const server = new TicketmasterServer();
server.run().catch(console.error);
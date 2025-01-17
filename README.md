# MCP Server for Ticketmaster Events

A Model Context Protocol server that provides tools for discovering events at Madison Square Garden through the Ticketmaster Discovery API.

## Features

- Find events at Madison Square Garden for any date range
- Returns structured JSON data with event details including:
  - Event name and ID
  - Date and time
  - Price ranges
  - Ticket purchase URL
  - Event images

## Installation

```bash
npm install mcp-server-ticketmaster
```

## Configuration

The server requires a Ticketmaster API key. You can get one by:
1. Going to https://developer.ticketmaster.com/
2. Creating an account or signing in
3. Going to "My Apps" in your account
4. Creating a new app to get your API key

Set your API key in your MCP settings file:

```json
{
  "mcpServers": {
    "ticketmaster": {
      "command": "node",
      "args": ["path/to/mcp-server-ticketmaster/build/index.js"],
      "env": {
        "TICKETMASTER_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

## Usage

The server provides a tool called `find_msg_events` that accepts:
- `startDate`: Start date in YYYY-MM-DD format
- `endDate`: End date in YYYY-MM-DD format

Example usage in Claude:
```
<use_mcp_tool>
<server_name>ticketmaster</server_name>
<tool_name>find_msg_events</tool_name>
<arguments>
{
  "startDate": "2025-02-01",
  "endDate": "2025-02-28"
}
</arguments>
</use_mcp_tool>
```

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Test with the inspector: `npm run inspector`

## License

MIT License - see LICENSE file for details
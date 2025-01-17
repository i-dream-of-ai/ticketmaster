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

1. Get your Ticketmaster API key:
   - Go to https://developer.ticketmaster.com/
   - Create an account or sign in
   - Go to "My Apps" in your account
   - Create a new app to get your API key

2. Create a `.env` file in your project root:
   ```bash
   cp .env.example .env
   ```
   Then add your Ticketmaster API key to the `.env` file.

3. Add to your MCP settings file:

```json
{
  "mcpServers": {
    "ticketmaster": {
      "command": "node",
      "args": ["path/to/mcp-server-ticketmaster/build/index.js"],
      "env": {
        "TICKETMASTER_API_KEY": "$TICKETMASTER_API_KEY"
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
2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
3. Add your Ticketmaster API key to `.env`
4. Install dependencies:
   ```bash
   npm install
   ```
5. Build the project:
   ```bash
   npm run build
   ```
6. Test with the inspector:
   ```bash
   npm run inspector
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details
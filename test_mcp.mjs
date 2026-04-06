import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  const transport = new StdioClientTransport({
    command: "npx",
    args: ["-y", "mcp-remote", "http://127.0.0.1:3845/mcp"],
  });

  const client = new Client({
    name: "test-client",
    version: "1.0.0",
  }, {
    capabilities: {},
  });

  try {
    await client.connect(transport);
    console.log("SUCCESS: Connected to MCP server");
    const tools = await client.listTools();
    console.log("Available tools:", JSON.stringify(tools, null, 2));
    await transport.close();
  } catch (error) {
    console.error("FAILURE: Could not connect to MCP server", error);
    process.exit(1);
  }
}

main();

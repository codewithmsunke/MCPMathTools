import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
async function main() {
    // Create the MCP server (with name + version metadata)
    const server = new McpServer({
        name: "demo-mcp-server",
        version: "0.1.0",
    });
    // Register basic math tools
    // Addition
    server.registerTool("add", {
        title: "Addition tool",
        description: "Add two numbers a + b",
        inputSchema: { a: z.number(), b: z.number() },
    }, async ({ a, b }) => {
        const sum = a + b;
        return {
            content: [
                { type: "text", text: `The sum of ${a} and ${b} is ${sum}` }
            ]
        };
    });
    // Square Root
    server.registerTool("sqrt", {
        title: "Square Root tool",
        description: "Calculate the square root of a number (rounded to two decimals)",
        inputSchema: { x: z.number() },
    }, async ({ x }) => {
        if (x < 0) {
            return {
                content: [
                    { type: "text", text: `Error: Square root of negative number is not allowed.` }
                ],
                isError: true
            };
        }
        const result = Math.sqrt(x);
        const rounded = Math.round(result * 100) / 100;
        return {
            content: [
                { type: "text", text: `The square root of ${x} is ${rounded}` }
            ]
        };
    });
    // Subtraction
    server.registerTool("subtract", {
        title: "Subtraction tool",
        description: "Subtract b from a (a - b)",
        inputSchema: { a: z.number(), b: z.number() },
    }, async ({ a, b }) => {
        const diff = a - b;
        return {
            content: [
                { type: "text", text: `The difference of ${a} and ${b} is ${diff}` }
            ]
        };
    });
    // Square
    server.registerTool("square", {
        title: "Square tool",
        description: "Calculate the square of a number",
        inputSchema: { a: z.number() },
    }, async ({ a }) => {
        const result = a * a;
        return {
            content: [
                { type: "text", text: `The square of ${a} is ${result}` }
            ]
        };
    });
    // Multiplication
    server.registerTool("multiply", {
        title: "Multiplication tool",
        description: "Multiply two numbers a * b",
        inputSchema: { a: z.number(), b: z.number() },
    }, async ({ a, b }) => {
        const product = a * b;
        return {
            content: [
                { type: "text", text: `The product of ${a} and ${b} is ${product}` }
            ]
        };
    });
    // Division
    server.registerTool("divide", {
        title: "Division tool",
        description: "Divide a by b (a / b)",
        inputSchema: { a: z.number(), b: z.number() },
    }, async ({ a, b }) => {
        if (b === 0) {
            return {
                content: [
                    { type: "text", text: `Error: Division by zero is not allowed.` }
                ],
                isError: true
            };
        }
        const quotient = a / b;
        return {
            content: [
                { type: "text", text: `The quotient of ${a} divided by ${b} is ${quotient}` }
            ]
        };
    });
    // Register a “greet” resource: returns a greeting based on name parameter
    server.registerResource("greet", new ResourceTemplate("greet://{name}", { list: undefined }), {
        title: "Greeting Resource",
        description: "Generate a greeting for a given name"
    }, async (uri, { name }) => {
        return {
            contents: [
                {
                    uri: uri.href,
                    text: `Hello, ${name}!`
                }
            ]
        };
    });
    // Set up transport (stdio in this case, so MCP messages come via stdin/stdout)
    const transport = new StdioServerTransport();
    // Connect and start handling requests
    await server.connect(transport);
    console.log("MCP server started (stdio transport)");
}
main().catch(err => {
    console.error("Error starting MCP server:", err);
    process.exit(1);
});

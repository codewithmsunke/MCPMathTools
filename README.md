# MCP Math Server

A Model Context Protocol (MCP) server built with TypeScript and Node.js, designed to provide basic math operations and a greeting resource for AI assistants and tool integrations.

## Features
- Addition, Subtraction, Multiplication, Division (with division-by-zero error handling)
- Square and Square Root (with error handling for negative input, and results rounded to two decimals)
- Greeting resource (returns a personalized greeting)
- Fully type-safe using Zod schemas
- Easily extensible for more tools/resources

## Installation
1. Clone the repository or copy the project files.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Compile the TypeScript code:
   ```sh
   npx tsc
   ```

## Running the Server
This project is designed to run as an MCP server using VS Code's MCP integration.

1. Ensure your `.vscode/mcp.json` is configured as follows:
   ```jsonc
   {
     "servers": {
       "my-mcp-server-d95b22f0": {
         "type": "stdio",
         "command": "node",
         "args": ["d:/Proj/3/mcp-demo/dist/index.js"]
       }
     },
     "inputs": []
   }
   ```
2. Start VS Code and ensure the MCP extension is enabled. The server will start automatically.

## Available Tools
- **add**: Add two numbers
  - Input: `{ a: number, b: number }`
  - Output: `The sum of a and b is result`
- **subtract**: Subtract b from a
  - Input: `{ a: number, b: number }`
  - Output: `The difference of a and b is result`
- **multiply**: Multiply two numbers
  - Input: `{ a: number, b: number }`
  - Output: `The product of a and b is result`
- **divide**: Divide a by b
  - Input: `{ a: number, b: number }`
  - Output: `The quotient of a divided by b is result` (error if b = 0)
- **square**: Square a number
  - Input: `{ a: number }`
  - Output: `The square of a is result`
- **sqrt**: Square root of a number
  - Input: `{ x: number }`
  - Output: `The square root of x is result` (rounded to two decimals, error if x < 0)
- **lcm**: Least Common Multiple of two numbers
  - Input: `{ a: number, b: number }`
  - Output: `The LCM of a and b is result`

## Greeting Resource
- **greet**: Returns a greeting for a given name
  - Resource URI: `greet://{name}`
  - Output: `Hello, {name}!`

## Example Usage
- Add: `{ a: 2, b: 3 }` → `The sum of 2 and 3 is 5`
- Subtract: `{ a: 10, b: 5 }` → `The difference of 10 and 5 is 5`
- Multiply: `{ a: 4, b: 6 }` → `The product of 4 and 6 is 24`
- Divide: `{ a: 8, b: 2 }` → `The quotient of 8 divided by 2 is 4`
- Square: `{ a: 7 }` → `The square of 7 is 49`
- Square Root: `{ x: 5 }` → `The square root of 5 is 2.24`
- LCM: `{ a: 2, b: 5 }` → `The LCM of 2 and 5 is 10`
- Greeting: `greet://Alice` → `Hello, Alice!`

## Extending the Project
You can easily add more tools or resources by registering them in `src/index.ts` using the MCP SDK and Zod schemas.

## License
MIT

**100 Node.js Interview Questions**

**1\. What is Node.js, and how does it work?**

**Node.js** is an open-source, cross-platform runtime environment that allows you to execute JavaScript code outside a browser. It is built on the **V8 JavaScript engine** (the same engine that powers Google Chrome), which compiles JavaScript into highly efficient machine code.

Node.js uses an **event-driven, non-blocking I/O model**, making it ideal for building scalable and high-performance applications, such as web servers, APIs, and real-time applications. It works by using a single-threaded event loop to handle multiple concurrent requests without creating separate threads for each one.

**2\. Explain the difference between JavaScript in the browser and Node.js.**

**Feature JavaScript in the Browser Node.js**

| **Environment** | Runs in a browser<br><br>environment | Runs in a server environment |
| --- | --- | --- |
| **Global**<br><br>**Object** | window | global |
| --- | --- | --- |
| **APIs** | DOM manipulation, fetch API | File system, HTTP, Streams |
| --- | --- | --- |
| **Modules** | import/export | require (CommonJS) or ES Modules |
| --- | --- | --- |
| **Purpose** | Frontend user interfaces | Backend, server-side scripting |
| --- | --- | --- |
| **Runtime** | Limited to browser-specific tasks | Built for I/O-heavy tasks like file access or network communication |
| --- | --- | --- |

**3\. What is the purpose of the file?**

package.json

1/105

The file is a configuration file for a Node.js project. It serves several purposes: package.json

**Metadata**: Contains project details like name, version, author, and description. **Dependencies**: Lists the packages the project depends on.

**Scripts**: Defines custom commands for development (e.g., , ). start test

**Engines**: Specifies the Node.js version the project supports.

Example:

json

{

"name": "my-app",

"version": "1.0.0",

"scripts": {

"start": "node index.js",

"test": "jest"

},

"dependencies": {

"express": "^4.18.2"

}

}

**4\. How do you install a package using npm?**

To install a package using npm (Node Package Manager):

1\. Open a terminal.

2\. Run the command:

For a **specific package**:

npm install &lt;package-name&gt;

To install globally:

npm install -g &lt;package-name&gt;

To save it as a **dependency**: (default adds to npm install &lt;package-name&gt;

dependencies

in ) package.json

To save it as a **development dependency**: dev

npm install &lt;package-name&gt; --save-

2/105

**5\. How do you initialize a new Node.js project?** 1\. Open a terminal and navigate to the project directory. 2. Run the command:

bash

npm init

You’ll be prompted to fill out details like project name, version, etc.

3\. Alternatively, use default values.

to skip the prompts and create a file with npm init -y package.json

**6\. What is a module in Node.js?**

A **module** in Node.js is a reusable block of code that can be exported and imported into other files. Node.js organizes code into modules to improve maintainability, modularity, and reusability.

Types of modules:

1\. **Built-in modules**: Predefined modules like ,

, .

fs os http

2\. **Third-party modules**: Installed via npm (e.g.,

express

, ). lodash

3\. **Custom modules**: User-defined modules created within a project. **7\. How do you import and export modules in Node.js?**

**Exporting a module**: Use Modules.

javascript

_// CommonJS_

for CommonJS syntax or for ES

module.exports export

module.exports = { greet: () => console.log("Hello") };

3/105

_// ES Modules_

export const greet = () => console.log("Hello");

**Importing a module**:

javascript

_// CommonJS_

const myModule = require('./myModule');

myModule.greet();

_// ES Modules_

import { greet } from './myModule.js';

greet();

**8\. What is the function in Node.js?**

require

The function is used to import modules in Node.js. It loads a module and returns require

its exported objects or functions. Commonly used with CommonJS modules. Example:

javascript

const fs = require('fs'); _// Import built-in module_

const customModule = require('./customModule'); _// Import custom module_

**9\. How do you check the installed version of Node.js?** To check the installed version of Node.js:

1\. Open a terminal or command prompt.

2\. Run the command:

bash

4/105

node -v

This will display the installed Node.js version (e.g., v18.16.0 ).

**10\. Explain the purpose of the object in Node.js.** process

The object in Node.js is a global object that provides information about and control process

over the current Node.js process. It is part of the Key features:

events

module and is always available.

**Environment variables**: Accessed via

**Current directory**: . process.cwd()

.

process.env

**Arguments**: Command-line arguments are available in . process.argv

**Exit the process**: .

process.exit()

**Signal events**: Allows listening to system signals like .

SIGINT

Example:

javascript

console.log(\`Current directory: ${process.cwd()}\`);

console.log(\`Node.js version: ${process.version}\`);

console.log(\`Environment: ${process.env.NODE_ENV}\`);

**11\. What is the difference between and ?** readFile readFileSync

**Feature** readFile readFileSync

| **Type** | Asynchronous (non-blocking) | Synchronous (blocking) |
| --- | --- | --- |
| **Execution** | Uses callbacks or Promises for<br><br>completion | Pauses execution until the file is read |
| --- | --- | --- |
| **Performance** | Suitable for high-performance<br><br>applications | Suitable for small tasks or scripts |
| --- | --- | --- |
| **Example** |     |     |
| --- | --- | --- |
| **Code**<br><br>**Example** |     |     |
| --- | --- | --- |

5/105

**Feature** readFile readFileSync

|     | \`\`\`javascript | \`\`\`javascript |
| --- | --- | --- |
|     | const fs = require('fs'); | const fs = require('fs'); |
| --- | --- | --- |
|     | fs.readFile('example.txt', 'utf8', (err, data) => { | const data = fs.readFileSync('example.txt', 'utf8'); |
| --- | --- | --- |
|     | if (err) console.error(err); | console.log(data); |
| --- | --- | --- |
|     | else console.log(data); | \`\`\` |
| --- | --- | --- |
|     | }); |     |
| --- | --- | --- |

**12\. What is the purpose of the module?**

path

The module in Node.js provides utilities for working with file and directory paths in a path

cross-platform way. It handles path manipulations, ensuring compatibility across different operating systems (e.g., Windows and Linux).

**Common Uses**:

Normalize file paths ( ).

path.normalize

Join multiple segments into a single path ( ).

path.join

Resolve absolute paths ( ).

path.resolve

Extract file information (e.g., , ).

path.basename path.extname

**Example**:

javascript

const path = require('path');

console.log(path.join( dirname, 'file.txt')); _// Joins current directory with 'file.txt'_

console.log(path.extname('file.txt')); _// Outputs: '.txt'_

**13\. How do you create a simple HTTP server in Node.js?**

6/105

You can use the built-in **Example**:

javascript

http

module to create an HTTP server.

const http = require('http');

const server = http.createServer((req, res) => { res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end('Hello, world!\\n');

});

server.listen(3000, () => {

console.log('Server is running on http://localhost:3000'); });

http.createServer

creates the server.

res.writeHead server.listen

sets the response status and headers. starts the server on a specified port.

**14\. What is an event loop in Node.js?**

The **event loop** is a core concept in Node.js. It allows Node.js to handle multiple concurrent operations without creating multiple threads. It is part of Node.js's **non-blocking I/O** model.

**How It Works**:

1\. Incoming requests or events are placed in a **queue**.

2\. The event loop processes these events sequentially, executing the associated callback functions.

3\. Long-running tasks (e.g., I/O) are offloaded to the worker threads, and their results are pushed back to the event loop when ready.

**15\. What is the module used for?**

fs

7/105

The (File System) module in Node.js provides methods to interact with the file system, fs 

such as reading, writing, deleting, and updating files or directories.

**Common Methods**:

fs.readFile

: Asynchronously reads a file.

fs.writeFile

: Asynchronously writes data to a file.

fs.rename

fs.unlink

**Example**:

javascript

: Renames a file or directory. : Deletes a file.

const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => { if (err) throw err;

console.log(data);

});

**16\. How can you read a file synchronously in Node.js?**

You can use **Example**:

javascript

fs.readFileSync

to read a file synchronously.

const fs = require('fs');

const data = fs.readFileSync('example.txt', 'utf8');

console.log(data);

This method blocks the execution of subsequent code until the file is fully read. **17\. How do you handle errors in Node.js?**

8/105

**Error handling** in Node.js can be done using:

1\. **Callbacks**: Pass an error object as the first argument to the callback. 2. **Try-Catch**: For synchronous operations or Promise-based functions. 3. **Event Emitters**: Listen for error events.

4\. **Global Handlers**: Use

process.on('uncaughtException')

to catch unhandled

exceptions (not recommended for all use cases).

**Example** (Callback):

javascript

const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {

if (err) {

console.error('Error reading file:', err.message);

} else {

console.log(data);

}

});

**18\. What is npm, and why is it important?**

**npm (Node Package Manager)** is the default package manager for Node.js. It helps developers manage dependencies and share reusable code.

**Why it’s important**:

Provides access to a vast library of open-source packages.

Simplifies dependency management through .

package.json

Allows version control and updates for dependencies.

Supports custom scripts for project automation.

**19\. How do you update a package using npm?**

9/105

To update a package:

1\. Run:

bash

npm update &lt;package-name&gt;

2\. To update globally installed packages:

bash

npm update -g &lt;package-name&gt;

3\. To ensure the latest version is installed:

bash

npm install &lt;package-name&gt;@latest

**20\. What is the difference between and ?** setTimeout setInterval

**Feature** setTimeout setInterval

| **Purpose** | Executes a function after a delay. | Repeatedly executes a function at<br><br>intervals. |
| --- | --- | --- |
| **Execution** | Executes once after the specified delay. | Executes repeatedly until cleared. |
| --- | --- | --- |
| **Clearing** | Use clearTimeout(timerId) . | Use clearInterval(intervalId) . |
| --- | --- | --- |
| **Example** |     |     |
| --- | --- | --- |
| **Code**<br><br>**Example** | \`\`\`javascript | \`\`\`javascript |
| --- | --- | --- |
|     | setTimeout(() => console.log('Hello'), 1000); | const intervalId = setInterval(() => { |
| --- | --- | --- |
|     |     | console.log('Hello'); |
| --- | --- | --- |
|     |     | }, 1000); |
| --- | --- | --- |
|     | \`\`\` | \`\`\` |
| --- | --- | --- |

10/105

**21\. What is the difference between**

**and**

npm install npm install --

save

**?**

**Command Purpose Behavior**

| npm install | Installs all dependencies listed in package.json . |
| --- | --- |
| npm install -<br><br>\-save | Installs a specific package and adds it to dependencies . |
| --- | --- |

Does not modify package.json ; it simply ensures the required packages are installed.

Automatically updates the dependencies section of package.json .

**Note**: As of npm 5 (released in 2017), is the default behavior for . --save npm install

Explicitly using **Example**:

bash

\--save

is no longer necessary.

npm install express _\# Adds express to dependencies (default behavior)_ npm install express --save _\# Does the same as above (deprecated syntax)_

**22\. How do you uninstall a package in Node.js?**

To uninstall a package:

1\. Open a terminal and navigate to the project directory.

2\. Run:

bash

npm uninstall &lt;package-name&gt;

3\. To remove it globally:

bash

npm uninstall -g &lt;package-name&gt;

4\. To remove the package from :

package.json

bash

11/105

npm uninstall &lt;package-name&gt; --save

**23\. What is a callback function in Node.js?**

A **callback function** is a function passed as an argument to another function and is executed after the completion of an asynchronous operation. This allows non-blocking execution in Node.js.

**Example** (Reading a file with a callback):

javascript

const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {

if (err) {

console.error('Error:', err);

} else {

console.log('File Content:', data);

}

});

In this example:

fs.readFile

is asynchronous.

The callback function ( occurs.

(err, data) => {}

) runs when the file is read or if an error

**24\. How do you handle multiple requests in a Node.js server?**

Node.js handles multiple requests using its **event-driven, non-blocking I/O model**. The server processes incoming requests through a **single-threaded event loop**, delegating I/O operations to worker threads when necessary.

**Example**:

12/105

javascript

const http = require('http');

const server = http.createServer((req, res) => {

if (req.url === '/') {

res.writeHead(200, { 'Content-Type': 'text/plain' });

res.end('Welcome to the homepage!');

} else if (req.url === '/about') {

res.writeHead(200, { 'Content-Type': 'text/plain' });

res.end('About page');

} else {

res.writeHead(404, { 'Content-Type': 'text/plain' });

res.end('Page not found');

}

});

server.listen(3000, () => {

console.log('Server running at http://localhost:3000');

});

Requests are queued, and their responses are handled asynchronously.

I/O-heavy operations (e.g., database calls) are offloaded to the event loop or worker threads.

**25\. What is the purpose of the module in Node.js?** console

The **module** provides a simple debugging and logging utility. It is similar to the console

console

object in the browser and is used to output messages to the terminal or

stdout/stderr streams. **Common Methods**:

console.log

: Outputs to the standard output (stdout).

console.error

: Outputs to the standard error (stderr).

console.warn

: Outputs warnings (stderr).

console.table

: Displays tabular data.

13/105

console.time

**Example**:

javascript

and : Measures execution time for code. console.timeEnd

console.log('This is a log message');

console.error('This is an error message');

console.table(\[{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }\]); console.time('Execution Time');

setTimeout(() => {

console.timeEnd('Execution Time');

}, 1000);

This module is especially helpful during development for debugging purposes. **26\. What is the difference between CommonJS and ES6 modules?**

**Feature CommonJS ES6 Modules**

| **Syntax** | Uses require to import and<br><br>module.exports to export. | Uses import and export keywords. |
| --- | --- | --- |
| **Default Support** | Default module system in Node.js before v13. | Supported in modern Node.js (v12+ with flag, v13+ without flag). |
| --- | --- | --- |
| **File Extension** | Files typically use .js . | Files must use .mjs (or set type: "module" in package.json ). |
| --- | --- | --- |
| **Execution**<br><br>**Model** | Synchronous, as require is<br><br>blocking. | Asynchronous, allowing parallel loading. |
| --- | --- | --- |
| **Interoperability** | Can import ES6 modules with<br><br>dynamic import . | Can use require with createRequire function. |
| --- | --- | --- |

**Example**:

**CommonJS**:

javascript

_// math.js_

module.exports.add = (a, b) => a + b;

_// app.js_

const math = require('./math');

console.log(math.add(2, 3)); _// 5_

14/105

**ES6 Modules**:

javascript

_// math.mjs_

export const add = (a, b) => a + b;

_// app.mjs_

import { add } from './math.mjs';

console.log(add(2, 3)); _// 5_

**27\. How do you manage environment variables in a Node.js application?**

Environment variables are used to configure applications dynamically without hardcoding sensitive or environment-specific information. They can be accessed through the

process.env

object in Node.js.

**Steps to Manage Environment Variables**:

1\. **Define Variables**: Create a file in your project root. .env

makefile

DB_HOST=localhost

DB_USER=root

DB_PASS=securepassword

2\. **Load Variables**: Use the package to load these into . dotenv process.env

bash

npm install dotenv

3\. **Access Variables in Code**:

javascript

require('dotenv').config();

15/105

console.log(process.env.DB_HOST); _// Outputs: localhost_ console.log(process.env.DB_USER); _// Outputs: root_

4\. **Best Practices**:

Do not commit

.env

to version control.

Use

process.env

for accessing variables safely.

**28\. Explain streams in Node.js.**

**Streams** in Node.js are objects that handle continuous data flows, enabling efficient I/O operations by processing data chunk-by-chunk, rather than loading it all into memory.

**Types of Streams**:

1\. **Readable Streams**: For reading data (e.g.,

fs.createReadStream

).

2\. **Writable Streams**: For writing data (e.g.,

fs.createWriteStream

).

3\. **Duplex Streams**: Both readable and writable (e.g., TCP sockets).

4\. **Transform Streams**: Duplex streams that modify data (e.g., **Key Events**:

zlib

for compression).

data

: Emitted when data is available.

end

: Emitted when no more data is available.

error

**Example**: javascript

: Emitted if an error occurs.

const fs = require('fs');

_// Create a readable stream_

const readable = fs.createReadStream('input.txt', 'utf8');

_// Handle stream events_

readable.on('data', chunk => {

console.log('Received chunk:', chunk);

});

16/105

readable.on('end', () => {

console.log('Stream ended.');

});

**29\. What is middleware in the context of Node.js?**

Middleware in Node.js refers to functions that execute during the lifecycle of a request to a server. They are used to process requests, handle authentication, perform logging, or modify responses before they reach the client.

**Key Characteristics**:

Middleware functions take three arguments: .

(req, res, next)

The function passes control to the next middleware.

next

Middleware is executed in sequence.

**Example Without Express.js**:

javascript

const http = require('http');

_// Middleware function_

function logger(req, res, next) {

console.log(\`${req.method} ${req.url}\`);

next();

}

_// Simple middleware handler_

function middleware(req, res) {

logger(req, res, () => {

res.writeHead(200, { 'Content-Type': 'text/plain' });

res.end('Hello, world!');

});

}

const server = http.createServer(middleware);

server.listen(3000, () => {

17/105

console.log('Server running on http://localhost:3000');

});

**30\. How do you use the module to hash data in Node.js?** crypto

The module in Node.js provides cryptographic functionality, including creating crypto

hashes, which are fixed-size strings generated from input data. Hashes are commonly used for checksums and password storage.

**Steps to Hash Data**:

1\. Import the 2. Use the

crypto

module.

method with an algorithm like , , etc.

crypto.createHash sha256 md5

3\. Update the hash object with data and output the result. **Example**:

javascript

const crypto = require('crypto');

_// Hashing data using SHA-256_

const data = 'Hello, world!';

const hash = crypto.createHash('sha256').update(data).digest('hex');

console.log('Hash:', hash);

_// Example output: "Hash:_

_a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b92dbb8a62d93d799"_

**Notes**:

Use strong algorithms like or for security.

sha256

sha512

Avoid or for sensitive data as they are considered weak.

md5 sha1

**31\. Explain the concept of asynchronous programming in Node.js.**

Asynchronous programming allows Node.js to perform non-blocking operations, enabling efficient execution of I/O tasks. Instead of waiting for a task (e.g., file reading or network

18/105

request) to complete, Node.js moves on to execute other tasks, enhancing performance and scalability.

**Key Features**:

**Non-Blocking I/O**: Tasks like file operations or database queries are handled in the background, freeing the event loop for other operations.

**Callback Functions**: Functions that execute once an asynchronous task completes.

**Promises &** readably.

async/await

: Modern syntax for managing asynchronous flows more

**Event Loop**: Central mechanism managing callbacks and deferring long-running operations to worker threads.

**Example**:

javascript

const fs = require('fs');

_// Asynchronous File Read_

fs.readFile('example.txt', 'utf8', (err, data) => {

if (err) {

console.error('Error:', err);

} else {

console.log('File content:', data);

}

});

console.log('This executes before file reading finishes.');

**32\. What are the different types of streams in Node.js?**

Node.js streams provide a way to handle continuous data efficiently. There are four main types of streams:

1\. **Readable Streams**: For reading data (e.g., file reading, HTTP request body).

Example:

fs.createReadStream()

19/105

Events: , , data end

error

2\. **Writable Streams**: For writing data (e.g., file writing, HTTP response).

Example:

fs.createWriteStream()

Methods: , .write()

.end()

3\. **Duplex Streams**: For both reading and writing (e.g., sockets).

Example:

net.Socket

Readable and writable interfaces.

4\. **Transform Streams**: A type of Duplex stream that modifies data as it passes through (e.g., compression, encryption).

Example:

zlib.createGzip()

**Example** (Readable + Writable):

javascript

const fs = require('fs');

const readable = fs.createReadStream('input.txt');

const writable = fs.createWriteStream('output.txt');

readable.pipe(writable);

console.log('Data is being copied from input.txt to output.txt.');

**33\. How does Node.js handle child processes?**

Node.js provides the module to spawn child processes, enabling tasks to run child_process

concurrently. This is useful for performing CPU-intensive operations without blocking the main event loop.

**Methods to Create Child Processes**:

1\. : Launches a new process for streaming data.

spawn

javascript

20/105

const { spawn } = require('child_process');

const ls = spawn('ls', \['-lh', '/usr'\]);

ls.stdout.on('data', (data) => {

console.log(\`Output: ${data}\`);

});

ls.on('close', (code) => {

console.log(\`Child process exited with code ${code}\`);

});

2\. : Executes a command and buffers the output.

exec

javascript

const { exec } = require('child_process');

exec('ls -lh', (err, stdout, stderr) => {

if (err) throw err;

console.log(\`Output: ${stdout}\`);

});

3\. : Specifically for running another Node.js script.

fork

javascript

const { fork } = require('child_process');

const child = fork('child_script.js');

child.on('message', (msg) => {

console.log('Message from child:', msg);

});

child.send({ hello: 'world' });

**34\. How do you handle file uploads in a Node.js application?**

File uploads are handled in Node.js using the module or third-party libraries like http

formidable

or . Below is an example using the module without any external multer http

21/105

libraries.

**Steps**:

1\. Parse the incoming request for multipart data.

2\. Write the uploaded file's data to the server.

**Example**:

javascript

const http = require('http');

const fs = require('fs');

http.createServer((req, res) => {

if (req.method === 'POST') {

const file = fs.createWriteStream('uploaded_file.txt'); req.pipe(file);

req.on('end', () => {

res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end('File uploaded successfully.');

});

} else {

res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(\`

&lt;form method="POST" enctype="multipart/form-data"&gt;

&lt;input type="file" name="file" /&gt;

&lt;button type="submit"&gt;Upload&lt;/button&gt;

&lt;/form&gt;

\`);

}

}).listen(3000, () => {

console.log('Server listening on http://localhost:3000'); });

**35\. What is in Node.js, and how does it work?**Cluster

22/105

The cluster module in Node.js enables the creation of multiple processes (workers) to utilize multiple CPU cores effectively. Each worker runs an instance of the application, sharing the same server port.

**How It Works**:

1\. The **master process** spawns worker processes.

2\. Each worker handles incoming requests independently.

3\. The master manages worker processes and restarts them if they fail.

**Use Case**: Clusters are ideal for improving performance in CPU-bound tasks. **Example**:

javascript

const cluster = require('cluster');

const http = require('http');

const os = require('os');

if (cluster.isMaster) {

const numCPUs = os.cpus().length;

console.log(\`Master process is running with PID ${process.pid}\`);

_// Fork workers_

for (let i = 0; i < numCPUs; i++) {

cluster.fork();

}

cluster.on('exit', (worker, code, signal) => {

console.log(\`Worker ${worker.process.pid} exited. Restarting...\`); cluster.fork();

});

} else {

http.createServer((req, res) => {

res.writeHead(200);

res.end(\`Hello from Worker ${process.pid}\`);

}).listen(3000);

console.log(\`Worker process started with PID ${process.pid}\`);

}

23/105

**Key Notes**:

The method determines the number of CPUs.

os.cpus().length

Workers share the same server port for load balancing.

Suitable for CPU-intensive applications.

**36\. Explain how to use the and modules in Node.js.** http https

The and modules allow Node.js to create HTTP and HTTPS servers and make http https

HTTP(S) requests.

**Creating an HTTP Server:**

The

http

module is used to create a server that listens for requests on a specified port.

**Example**:

javascript

const http = require('http');

const server = http.createServer((req, res) => { res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end('Hello, world!');

});

server.listen(3000, () => {

console.log('HTTP server running at http://localhost:3000'); });

**Creating an HTTPS Server:**

The key.

https

module is used to create secure servers. It requires an SSL certificate and private

**Example**:

javascript

const https = require('https');

const fs = require('fs');

_// Load SSL credentials_

const options = {

key: fs.readFileSync('private-key.pem'),

24/105

cert: fs.readFileSync('certificate.pem'),

};

https.createServer(options, (req, res) => {

res.writeHead(200, { 'Content-Type': 'text/plain' });

res.end('Secure Hello, world!');

}).listen(3443, () => {

console.log('HTTPS server running at https://localhost:3443');

});

**Making HTTP/HTTPS Requests:**

Both modules can also make outgoing requests.

**Example**:

javascript

const https = require('https');

https.get('https://jsonplaceholder.typicode.com/todos/1', (res) => { let data = '';

res.on('data', chunk => {

data += chunk;

});

res.on('end', () => {

console.log('Response:', data);

});

}).on('error', (err) => {

console.error('Error:', err.message);

});

**37\. How do you implement authentication in a Node.js application?**

Authentication in Node.js can be implemented in various ways depending on the security requirements. Common approaches include **basic authentication**, **token-based authentication (e.g., JWT)**, or **OAuth**.

25/105

**Steps for Token-Based Authentication:** 1\. **Generate a Token**:

Use libraries like credentials.

bash

jsonwebtoken

to create a secure token after verifying user

npm install jsonwebtoken

javascript

const jwt = require('jsonwebtoken');

const secretKey = 'mySecretKey';

const token = jwt.sign({ userId: 123 }, secretKey, { expiresIn: '1h' }); console.log('JWT Token:', token);

2\. **Verify Token**:

Protect routes by verifying the token during requests.

javascript

const verifyToken = (req, res, next) => {

const token = req.headers\['authorization'\];

if (!token) return res.status(403).send('No token provided.');

jwt.verify(token, secretKey, (err, decoded) => {

if (err) return res.status(401).send('Invalid token.');

req.userId = decoded.userId;

next();

});

};

3\. **Apply to Protected Routes**:

javascript

const http = require('http');

const server = http.createServer((req, res) => {

if (req.url === '/protected' && req.method === 'GET') {

verifyToken(req, res, () => {

26/105

res.end('Protected content accessed.');

});

} else {

res.end('Public content.');

}

});

server.listen(3000);

**38\. What is the class in Node.js?**

EventEmitter

The class is part of Node.js's module and allows objects to emit and EventEmitter events

listen for events. It is fundamental to Node.js's event-driven architecture.

**Basic Usage:**

1\. **Create an Instance**:

EventEmitter

javascript

const EventEmitter = require('events');

const myEmitter = new EventEmitter();

myEmitter.on('event', () => {

console.log('An event occurred!');

});

myEmitter.emit('event'); _// Outputs: An event occurred!_

2\. **Handling Events with Arguments**:

javascript

myEmitter.on('greet', (name) => {

console.log(\`Hello, ${name}!\`);

});

myEmitter.emit('greet', 'Alice'); _// Outputs: Hello, Alice!_

3\. **Predefined Events**: also emits system events like . EventEmitter error

27/105

javascript

myEmitter.on('error', (err) => {

console.error('Error occurred:', err.message);

});

myEmitter.emit('error', new Error('Something went wrong'));

**39\. How do you handle uncaught exceptions in Node.js?** Uncaught exceptions in Node.js can crash the application. To handle these, you can use the

process.on('uncaughtException') **Example**:

javascript

event. However, this should be a last resort.

process.on('uncaughtException', (err) => {

console.error('Uncaught Exception:', err.message);

_// Optionally clean up resources before exiting_

process.exit(1);

});

_// Intentionally causing an exception_

throw new Error('This is an uncaught exception.');

**Best Practices**:

1\. Use proper error handling ( or for Promises).

try-catch

2\. Log uncaught exceptions for debugging.

.catch()

3\. Consider process restarts using tools like **PM2**.

**40\. Explain the and streams in Node.js.** readable writable

Streams are data-handling objects in Node.js. **Readable** and **Writable** streams process data incrementally rather than loading it all into memory.

28/105

**Readable Streams:**

These are used to read data in chunks.

**Example** (Reading a File):

javascript

const fs = require('fs');

const readable = fs.createReadStream('example.txt', 'utf8'); readable.on('data', chunk => {

console.log('Received chunk:', chunk);

});

readable.on('end', () => {

console.log('No more data.');

});

**Writable Streams:**

These are used to write data in chunks.

**Example** (Writing to a File):

javascript

const fs = require('fs');

const writable = fs.createWriteStream('output.txt'); writable.write('Hello, world!\\n');

writable.write('Appending some data.');

writable.end(() => {

console.log('Finished writing to file.');

});

**Piping (Connecting Readable to Writable):**

Streams can be chained together using . .pipe()

**Example**:

javascript

const readable = fs.createReadStream('example.txt'); const writable = fs.createWriteStream('copy.txt');

29/105

readable.pipe(writable);

console.log('File copied successfully.');

**41\. What are the benefits of using the framework?** express

Express

is a lightweight and flexible web application framework for Node.js, designed to

simplify the process of building robust web applications and APIs. Its benefits include:

**1\. Simplified Routing:**

Easy to define and manage routes for HTTP requests.

javascript

const express = require('express');

const app = express();

app.get('/', (req, res) => {

res.send('Hello, World!');

});

app.listen(3000, () => console.log('Server running on port 3000'));

**2\. Middleware Support:**

Provides a robust middleware system to process requests (e.g., for authentication, logging, etc.).

**3\. Extensibility:**

Compatible with many plugins for extended functionality (e.g., body parsing, cookies).

**4\. Scalability:**

Ideal for building RESTful APIs and scalable web applications.

**5\. Community Support:**

Extensive documentation and a large community offer reliable solutions for common challenges.

30/105

**42\. How do you create a RESTful API in Node.js?** To create a RESTful API, follow these steps:

**Step 1: Set Up Node.js and Express**

Install Express:

bash

npm install express

**Step 2: Define Routes**

Create routes for CRUD operations ( , , , ). GET POST PUT DELETE

**Example**:

javascript

const express = require('express');

const app = express();

_// Middleware to parse JSON_

app.use(express.json());

let items = \[

{ id: 1, name: 'Item 1' },

{ id: 2, name: 'Item 2' },

\];

_// GET: Fetch all items_

app.get('/items', (req, res) => {

res.json(items);

});

_// POST: Add a new item_

app.post('/items', (req, res) => {

const newItem = { id: items.length + 1, name: req.body.name }; items.push(newItem);

res.status(201).json(newItem);

});

_// PUT: Update an item_

app.put('/items/:id', (req, res) => {

31/105

const item = items.find(i => i.id == req.params.id);

if (item) {

item.name = req.body.name;

res.json(item);

} else {

res.status(404).send('Item not found');

}

});

_// DELETE: Remove an item_

app.delete('/items/:id', (req, res) => {

items = items.filter(i => i.id != req.params.id);

res.status(204).send();

});

_// Start server_

app.listen(3000, () => console.log('API running on port 3000'));

**43\. What is the purpose of the module?** child_process

The module in Node.js is used to spawn and manage subprocesses, allowing child_process

you to execute system commands or other scripts from your Node.js application. It is useful for:

**Key Use Cases:**

1\. **Executing Shell Commands**:

Use to execute commands and capture their output.

exec

javascript

const { exec } = require('child_process');

exec('ls', (err, stdout, stderr) => {

if (err) throw err;

console.log('Output:', stdout);

});

2\. **Streaming Data**:

32/105

Use to handle large data streams between parent and child processes. spawn

javascript

const { spawn } = require('child_process');

const ls = spawn('ls', \['-lh'\]);

ls.stdout.on('data', (data) => console.log(\`Output: ${data}\`));

3\. **Running Node.js Scripts**:

Use to create child processes specifically for Node.js scripts. fork

javascript

const { fork } = require('child_process');

const child = fork('child.js');

**44\. How do you use promises in Node.js?**

Promises provide a way to handle asynchronous operations, improving readability and avoiding callback hell.

**Creating a Promise:**

javascript

const myPromise = new Promise((resolve, reject) => {

const success = true;

if (success) {

resolve('Operation succeeded');

} else {

reject('Operation failed');

}

});

**Using Promises with and :**

.then() .catch()

javascript

33/105

myPromise

.then(result => console.log(result)) _// Output: Operation succeeded_ .catch(error => console.error(error));

**Using :**

async/await

async/await javascript

simplifies promise usage by making asynchronous code look synchronous.

const asyncFunction = async () => {

try {

const result = await myPromise;

console.log(result);

} catch (error) {

console.error(error);

}

};

asyncFunction();

**Example (Using Promises for File Reading):**

javascript

const fs = require('fs').promises;

fs.readFile('example.txt', 'utf8')

.then(data => console.log('File content:', data))

.catch(err => console.error('Error reading file:', err));

**45\. How do you implement WebSockets in Node.js?**

WebSockets provide a persistent, full-duplex communication channel between the server

and the client. In Node.js, you can implement WebSockets using the built-in ws

**Steps to Implement WebSockets:**

1\. **Install** :

ws

library.

34/105

bash

npm install ws

2\. **Create a WebSocket Server**:

javascript

const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {

console.log('Client connected');

_// Listen for messages_

socket.on('message', (message) => {

console.log('Received:', message);

socket.send(\`Echo: ${message}\`);

});

_// Handle disconnection_

socket.on('close', () => {

console.log('Client disconnected');

});

});

console.log('WebSocket server running on ws://localhost:8080'); 3. **Client Implementation**:

javascript

const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {

console.log('Connected to server');

socket.send('Hello, server!');

};

socket.onmessage = (event) => {

console.log('Received from server:', event.data);

};

35/105

socket.onclose = () => console.log('Disconnected from server');

**Summary:**

**Express Framework**: Simplifies building web apps and APIs.

**RESTful API**: Use with HTTP verbs ( , , etc.) to manage resources. Express POST

GET

child_process

**Module**: Execute external commands or scripts.

**Promises**: Handle asynchronous tasks cleanly with , , or . .then .catch async/await

**WebSockets**: Enable real-time, bidirectional communication using the library. ws 

**46\. Explain the role of the module in Node.js.**

zlib

The module in Node.js is used for **compression and decompression** of data. It zlib

provides bindings to the popular **zlib compression library** in C, allowing developers to efficiently compress and decompress data in formats like Gzip and Deflate.

**Use Cases:**

Compressing HTTP responses to reduce bandwidth usage.

Archiving files with compressed formats.

Handling compressed streams of data.

**Example (Compressing and Decompressing):**

**1\. Compressing a File**:

javascript

const zlib = require('zlib');

const fs = require('fs');

const input = fs.createReadStream('example.txt');

const output = fs.createWriteStream('example.txt.gz');

input.pipe(zlib.createGzip()).pipe(output);

console.log('File compressed successfully.');

36/105

**2\. Decompressing a File**:

javascript

const input = fs.createReadStream('example.txt.gz');

const output = fs.createWriteStream('decompressed.txt');

input.pipe(zlib.createGunzip()).pipe(output);

console.log('File decompressed successfully.');

**47\. How do you debug a Node.js application?**

Debugging is an essential step in the development process. Node.js provides several tools for debugging.

**1\. Using the Flag:**

\--inspect

Run the application with the flag to enable debugging.

\--inspect

bash

node --inspect app.js

Open Chrome DevTools and connect to the debugging URL printed in the terminal.

**2\. Using**

**:**

console.log

Insert

console.log

statements to print variable values and track execution flow.

**3\. Using**

debugger

**Statement:**

Insert the

javascript

let x = 10;

debugger

keyword in your code where you want to pause execution.

debugger; _// Execution stops here_ x += 20;

console.log(x);

37/105

**4\. Using a Debugger Tool (e.g., VS Code):**

Set breakpoints and step through the code using an IDE like Visual Studio Code. Open the **Run and Debug** panel.

Add a breakpoint and start debugging.

**5\. Using Third-Party Tools:**

Tools like offer enhanced debugging capabilities.

ndb

bash

npm install -g ndb

ndb app.js

**48\. What is the purpose of the module in Node.js?** os

The module provides utilities to interact with the operating system. It helps retrieve os 

system information, such as CPU details, memory usage, and network interfaces.

**Key Methods:**

1\. **Getting System Info**:

Retrieve platform, architecture, and uptime.

javascript

const os = require('os');

console.log('Platform:', os.platform());

console.log('Architecture:', os.arch());

console.log('Uptime (seconds):', os.uptime());

2\. **Getting CPU Details**:

javascript

console.log('CPU Info:', os.cpus());

3\. **Memory Usage**:

38/105

Retrieve total and free memory.

javascript

console.log('Total Memory:', os.totalmem());

console.log('Free Memory:', os.freemem());

4\. **Network Interfaces**:

javascript

console.log('Network Interfaces:', os.networkInterfaces()); 5. **Home Directory**:

javascript

console.log('Home Directory:', os.homedir());

**49\. How do you use async/await in Node.js?**

async/await

is a syntactic feature in JavaScript for handling asynchronous code in a cleaner,

more readable way. It works with promises and is ideal for avoiding callback hell.

**Using and :**

async await

1\. Declare a function as .

async

2\. Use to pause execution until a promise resolves.

await

**Example**:

javascript

const fs = require('fs').promises;

async function readFileContent() {

try {

const data = await fs.readFile('example.txt', 'utf8');

console.log('File content:', data);

} catch (err) {

39/105

console.error('Error reading file:', err);

}

}

readFileContent();

**Handling Multiple Promises:**

Use with to handle multiple asynchronous operations. Promise.all async/await

javascript

async function getData() {

const \[file1, file2\] = await Promise.all(\[

fs.readFile('file1.txt', 'utf8'),

fs.readFile('file2.txt', 'utf8'),

\]);

console.log('File1:', file1);

console.log('File2:', file2);

}

getData();

**50\. How do you schedule tasks in Node.js?**

Node.js allows you to schedule tasks to run at specified intervals or after a delay. This is typically done using built-in functions like , , or third-party libraries setTimeout setInterval

like .

node-schedule

**1\. Using :**

setTimeout

Executes a function after a specified delay.

javascript

setTimeout(() => {

console.log('Task executed after 2 seconds');

}, 2000);

**2\. Using :**

setInterval

40/105

Executes a function repeatedly at a fixed interval. javascript

setInterval(() => {

console.log('Task executed every 3 seconds'); }, 3000);

**3\. Using**

clearTimeout

**and :** clearInterval

Cancel scheduled tasks.

javascript

const timer = setTimeout(() => { console.log('This will not run'); }, 5000);

clearTimeout(timer);

**4\. Using**

node-schedule

**(Third-Party Library):**

To schedule more complex tasks (e.g., Cron jobs): bash

npm install node-schedule

javascript

const schedule = require('node-schedule');

schedule.scheduleJob('\*/5 \* \* \* \* \*', () => { console.log('Task executed every 5 seconds'); });

**Summary:**

zlib

: Handles compression and decompression (e.g., Gzip).

41/105

**Debugging**: Use , , or IDE tools like VS Code. --inspect debugger

**Module**: Provides system-level information (e.g., CPU, memory). os 

**Async/Await**: Simplifies promise-based asynchronous operations.

**Task Scheduling**: Use , setTimeout

Cron-like tasks.

, or libraries like for

setInterval node-schedule

**51\. What is the difference between**

process.nextTick

**and**

setImmediate

**?**

Both and are used to schedule callbacks in Node.js, but process.nextTick setImmediate

they differ in their execution timing within the event loop.

**:**

process.nextTick

Executes callbacks **before the next iteration** of the event loop begins. It's a part of the **microtask queue** and has higher priority than the timers phase. Suitable for deferring tasks to execute as soon as the current operation is complete.

**:**

setImmediate

Executes callbacks in the **check phase** of the event loop, after I/O events. It's part of the **macrotask queue** and will run after microtasks are completed.

**Example**:

javascript

console.log('Start');

process.nextTick(() => console.log('NextTick'));

setImmediate(() => console.log('SetImmediate'));

console.log('End');

**Output**:

sql

Start

End

42/105

NextTick

SetImmediate

**Key Difference:**

: Runs **before** as it has a higher priority.

process.nextTick setImmediate

**Use Case for**

process.nextTick

: Critical operations to execute immediately after the

current function.

**Use Case for**

setImmediate

: Tasks to run after I/O events.

**52\. Explain the concept of backpressure in Node.js streams.**

**Backpressure** occurs in Node.js streams when the rate of data production (write stream) exceeds the rate of data consumption (read stream). This imbalance can cause memory overflow if not properly managed.

**How Backpressure Happens:**

1\. The **producer** generates data faster than the consumer can process it.

2\. The writable buffer fills up, and the writable stream signals the producer to stop sending more data.

**Managing Backpressure:**

Use the method's return value:

write()

javascript

const writable = fs.createWriteStream('output.txt');

let canWrite = writable.write('Some data');

if (!canWrite) {

writable.once('drain', () => {

console.log('Drain event fired, resuming writes.');

writable.write('More data');

});

}

Use **pipe** for automatic backpressure handling:

43/105

javascript

const readable = fs.createReadStream('input.txt');

const writable = fs.createWriteStream('output.txt');

readable.pipe(writable); _// Automatically manages backpressure_

**Why It Matters:**

Properly handling backpressure ensures efficient resource usage and prevents system crashes due to memory overload.

**53\. How do you optimize the performance of a Node.js application?**

Optimizing a Node.js application involves improving its speed, scalability, and efficiency. Here are key strategies:

**1\. Optimize I/O Operations:**

Use **asynchronous I/O** methods.

Implement **streams** for handling large datasets.

**2\. Efficient Memory Management:**

Avoid memory leaks by tracking object references.

Use tools like or for profiling.

clinic node-inspect

**3\. Use Clustering:**

Distribute workload across multiple CPU cores using the module. cluster

javascript

const cluster = require('cluster');

const http = require('http');

if (cluster.isMaster) {

const numCPUs = require('os').cpus().length;

for (let i = 0; i < numCPUs; i++) cluster.fork();

} else {

44/105

http.createServer((req, res) => {

res.end('Hello World');

}).listen(3000);

}

**4\. Use Caching:**

Implement caching for repeated requests (e.g., in-memory caching with ). Redis

**5\. Reduce Middleware Overhead:**

Only use necessary middleware and keep middleware chains short.

**6\. Enable Gzip Compression:**

Use the module for compressing responses to reduce bandwidth usage. zlib

**7\. Optimize Database Queries:**

Use efficient queries and indexes.

Batch database operations to minimize connections.

**8\. Monitor and Profile:**

Use monitoring tools like **PM2**, **New Relic**, or **AppDynamics**.

**54\. What are worker threads in Node.js, and how are they used?**

Worker threads in Node.js provide a way to execute JavaScript code in parallel, leveraging multiple threads in a single Node.js process. This is useful for CPU-intensive tasks.

Why use worker threads? Node.js is single-threaded for JavaScript execution. Worker threads allow offloading heavy tasks, preventing them from blocking the main thread.

**How to Use Worker Threads:**

1\. Import the class from the module.

Worker worker_threads

2\. Create a worker and specify the script or code to execute.

**Example**:

45/105

javascript

const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {

const worker = new Worker( filename);

worker.on('message', (message) => console.log('From Worker:', message)); worker.postMessage('Hello Worker');

} else {

parentPort.on('message', (message) => {

parentPort.postMessage(\`Received: ${message}\`);

});

}

**Use Cases:**

Processing large datasets.

Performing cryptographic operations.

Image or video processing.

**55\. How does Node.js manage memory?**

Node.js uses **V8's garbage collector** for memory management. Memory is divided into different regions for optimized allocation and deallocation.

**Memory Structure:**

1\. **Stack**:

Stores function calls and local variables.

Limited in size.

2\. **Heap**:

Stores objects, closures, and global variables.

Where garbage collection occurs.

3\. **C++ Objects**:

Native objects managed outside of the V8 heap.

46/105

**Garbage Collection:**

Garbage collection in Node.js is automatic but can cause performance issues during large sweeps.

**Mark-and-Sweep Algorithm**:

Marks unused objects in memory and clears them.

**Incremental GC**:

Breaks large sweeps into smaller tasks for better performance.

**Memory Management Tips:**

1\. **Avoid Memory Leaks**:

Keep track of references to prevent objects from lingering in memory.

Use tools like

2\. **Use Streams**:

heapdump

to analyze memory usage.

Avoid loading large files or data sets into memory; use streams to process data in chunks.

3\. **Limit Memory Usage**:

Configure memory limits using the flag.

\--max-old-space-size

bash

node --max-old-space-size=4096 app.js

4\. **Monitoring**:

Use to monitor memory consumption:

process.memoryUsage()

javascript

console.log(process.memoryUsage());

**Summary:**

**vs.** : Microtask vs. macrotask execution.

process.nextTick setImmediate

47/105

**Backpressure**: Prevents memory overflow in streams by pausing data flow.

**Performance Optimization**: Involves efficient I/O, clustering, caching, and database tuning.

**Worker Threads**: Enable parallel execution of CPU-bound tasks.

**Memory Management**: Uses V8's garbage collector; monitor and optimize usage to prevent leaks.

**56\. What are the main differences between Node.js and other server side technologies like PHP?**

Node.js and PHP are both popular server-side technologies, but they differ in several fundamental aspects.

**1\. Language and Runtime:**

**Node.js**:

Node.js is a **runtime environment** for executing JavaScript on the server-side. It is built on **Google's V8 JavaScript engine** and allows developers to use JavaScript for both frontend and backend development.

**Event-driven and Non-blocking**: Node.js uses an asynchronous, event-driven architecture, which makes it efficient for I/O-bound tasks.

**PHP**:

PHP is a **scripting language** primarily designed for web development. It is traditionally embedded in HTML to produce dynamic web pages.

**Synchronous**: PHP processes requests synchronously, meaning each request is handled one at a time.

**2\. Performance:**

**Node.js**: Due to its non-blocking, event-driven architecture, Node.js is well-suited for handling a large number of concurrent requests (e.g., for real-time applications or APIs).

**PHP**: PHP is generally better suited for typical server-rendered web applications but can struggle with highly concurrent or real-time applications due to its synchronous processing.

**3\. Concurrency Model:**

48/105

**Node.js**: Uses a **single-threaded event loop** and **non-blocking I/O** to handle multiple requests simultaneously without the need for multiple threads. It scales well with tasks that are I/O-bound but not CPU-intensive.

**PHP**: Each incoming request is handled by a new **process** or thread. It is often paired with web servers like Apache or Nginx, which spawn multiple worker processes to handle requests.

**4\. Ecosystem and Package Management:**

**Node.js**: Uses **npm (Node Package Manager)**, which has a large ecosystem of libraries and modules for all sorts of tasks (from web frameworks to data manipulation).

**PHP**: Uses **Composer** for managing dependencies, and while its ecosystem is strong, it’s not as modern or as large as Node.js's npm.

**5\. Learning Curve:**

**Node.js**: Developers familiar with JavaScript can transition to server-side development easily, but understanding asynchronous programming (callbacks, promises, async/await) is crucial.

**PHP**: PHP has a relatively low learning curve and is designed specifically for web development, making it easy for beginners to get started with server-side development.

**57\. How do you handle circular dependencies in Node.js modules?**

Circular dependencies occur when two or more modules depend on each other directly or indirectly. In Node.js, circular dependencies can lead to unexpected behavior, such as incomplete module loading.

**How Node.js Handles Circular Dependencies:**

1\. When a module is required, Node.js loads it and caches the result.

2\. If a module has already been loaded, Node.js returns the cached version, even if it is still in the process of loading.

3\. As a result, if a circular dependency exists, the first module will receive an incomplete version of the second module until the module has finished loading.

**Handling Circular Dependencies:**

49/105

**Refactor the Code**: Break the circular dependency by restructuring the code. Move shared functionality into a separate module or separate concerns to avoid interdependence.

**Lazy Loading**: Delay the statement until it's absolutely necessary. This can require

sometimes prevent circular dependency issues by ensuring the modules are only loaded when they are needed.

javascript

_// Instead of requiring the module at the top, require it when needed_ function foo() {

const bar = require('./bar');

bar.doSomething();

}

**Use Carefully**: Be cautious about modifying after the module has exports exports

been loaded, as it can result in partial exports being used.

**58\. What is the purpose of the module in Node.js?**

v8

The module provides bindings to the **V8 JavaScript engine** used by Node.js. This module v8 

allows developers to interact directly with the engine to optimize and debug performance.

**Key Features of the Module:**

v8

**Heap Snapshot**: Allows taking a snapshot of the heap for memory usage analysis. **Garbage Collection**: Provides methods for controlling or observing garbage collection. **Memory Allocation**: Helps inspect and manage memory allocated to the V8 heap.

**Customizable Flags**: Allows for setting custom V8 flags to influence the behavior of the engine (e.g., to enable or disable specific optimizations).

**Example Usage:**

You can use the module to access heap statistics or take heap snapshots for debugging: v8

javascript

50/105

const v8 = require('v8');

console.log(v8.getHeapStatistics());

**59\. Explain how the cluster module can be used for scaling applications.**

The **module** in Node.js allows you to create child processes (workers) that can cluster

share the same server port. It is useful for scaling applications to take advantage of multi core systems.

**How It Works:**

Node.js is **single-threaded**, which means it can only use one CPU core. The

cluster

module allows you to fork multiple processes to use multiple cores, enabling you to handle more traffic efficiently.

Each worker is an independent process, but they share the same server socket, making it easier to scale the application horizontally.

**Basic Example:**

javascript

const cluster = require('cluster');

const http = require('http');

const os = require('os');

if (cluster.isMaster) {

_// Fork workers based on the number of CPU cores_

const numCPUs = os.cpus().length;

for (let i = 0; i < numCPUs; i++) {

cluster.fork();

}

cluster.on('exit', (worker, code, signal) => {

console.log(\`Worker ${worker.process.pid} died\`);

});

} else {

_// Worker processes handle requests_

http.createServer((req, res) => {

51/105

res.writeHead(200);

res.end('Hello from Node.js cluster!');

}).listen(8000);

}

**Benefits of Clustering:**

**Increased Concurrency**: Each worker can handle multiple requests concurrently. **Fault Tolerance**: If one worker crashes, other workers can continue to handle requests.

**Optimal CPU Utilization**: Clustering allows Node.js to make use of all available CPU cores.

**60\. What is the difference between a process and a thread in Node.js?**

In Node.js, understanding the difference between a **process** and a **thread** is essential, especially when dealing with concurrent programming.

**1\. Process:**

A **process** is an independent execution unit that has its own memory space, system resources, and execution context.

Each Node.js application runs as a **single process**.

Processes are isolated from each other and cannot directly access each other’s memory.

**2\. Thread:**

A **thread** is a smaller unit of execution within a process. Threads share the same memory space and resources as their parent process.

Node.js is **single-threaded** by default, meaning the event loop and JavaScript execution happen in a single thread.

However, Node.js can spawn additional threads for certain tasks, such as using the **worker threads** module for parallel processing.

**Key Differences:**

**Memory**: Processes have their own memory, while threads share memory with other threads in the same process.

52/105

**Performance**: Processes are more isolated, leading to higher overhead, whereas threads are more lightweight but can lead to concurrency issues if not properly managed.

**Concurrency**: Node.js uses a **single thread** for JavaScript execution but employs additional threads for I/O operations and background tasks (e.g., the worker threads module).

**Summary:**

**Node.js vs. PHP**: Node.js is event-driven, non-blocking, and uses JavaScript, while PHP is synchronous and uses a different model for processing requests.

**Circular Dependencies**: Can be handled by refactoring code or using lazy loading.

**Module**: Provides access to V8 engine features like memory management and v8 

garbage collection.

**Cluster Module**: Enables multi-core scaling by forking worker processes.

**Processes vs. Threads**: Processes are independent units of execution with separate memory, while threads share memory within a process and are lighter weight.

**61\. How does Node.js handle asynchronous I/O operations?**

Node.js uses a non-blocking, **event-driven** model to handle asynchronous I/O operations. This allows Node.js to handle many I/O tasks concurrently without waiting for one task to complete before starting another. Here's how it works:

**Key Concepts:**

**Event Loop**: The event loop in Node.js constantly monitors the event queue and processes I/O operations as they complete. The event loop runs in a single thread, and when an I/O operation is requested (e.g., reading from a file or making an HTTP request), Node.js offloads this task to the operating system, freeing up the event loop to process other tasks.

**Callbacks**: When an I/O operation is complete, Node.js invokes a callback function that was registered to handle the result. This callback is added to the event loop’s queue, and once the current operation finishes, the callback is executed.

**Libuv Library**: Node.js uses **libuv**, a multi-platform support library that handles asynchronous I/O, to manage operations such as file system access, networking, and

53/105

child process management. It is the foundation behind the non-blocking behavior of Node.js.

**Example:**

javascript

const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {

if (err) throw err;

console.log(data); _// This is called when the file reading is complete_ });

console.log("File reading in progress...");

Here, reads a file asynchronously. While the file is being read, Node.js fs.readFile

continues executing the **Advantages:**

console.log("File reading in progress...")

statement.

High concurrency: Non-blocking I/O allows Node.js to handle thousands of concurrent connections.

Efficiency: Node.js does not wait for I/O operations to finish before continuing with other tasks, leading to efficient use of system resources.

**62\. Explain the role of event delegation in Node.js.**

**Event delegation** in Node.js refers to the technique of assigning an event listener to a **parent** object rather than multiple individual child objects. This pattern is particularly useful in scenarios like handling I/O events or when working with streams or large numbers of event listeners.

While event delegation is commonly discussed in the context of **DOM manipulation** (e.g., in browsers), in Node.js, the concept can be applied in several ways:

**How it Works:**

Instead of attaching event listeners to each individual child object, you attach a listener to a parent or container object that listens for events that bubble up.

54/105

When an event is triggered on a child, the parent can **delegate** the handling of the event based on the event's properties (like event type or target).

**Example in Node.js (HTTP Server):**

In a scenario with many routes in an HTTP server, instead of assigning individual listeners for each route, we can use a single event listener on the server object: request

javascript

const http = require('http');

const server = http.createServer((req, res) => {

if (req.url === '/home') {

res.write('Home Page');

} else if (req.url === '/about') {

res.write('About Page');

}

res.end();

});

server.listen(3000, () => {

console.log('Server is listening on port 3000');

});

Here, event delegation is used by attaching a single listener to the server that handles different requests, rather than creating individual handlers for each route.

**63\. How do you ensure thread safety in a Node.js application?**

Node.js is **single-threaded** for JavaScript execution, meaning that only one operation runs at a time in the event loop. However, issues can arise when working with asynchronous operations or multiple processes. While thread safety is not an issue in typical Node.js applications (because of the single-threaded nature of JavaScript execution), it's still important to consider thread safety when using worker threads, child processes, or external modules that interact with the system.

**How to Ensure Thread Safety:**

55/105

1\. **Avoid Shared Mutable State**: The most important strategy in ensuring thread safety is to avoid shared mutable state between concurrent tasks. If shared state is needed, consider using **locks** or other synchronization techniques.

2\. **Worker Threads**: If you use the **worker threads** module to run CPU-intensive tasks, ensure thread safety by passing messages instead of sharing objects directly between threads.

You can use **atomic operations** (where possible) to ensure consistency when multiple threads are involved.

Pass data between threads using message event.

postMessage()

and handle the result through the

3\. **Child Processes**: For parallel processing, use child processes in conjunction with the

cluster issues.

module. Each child process has its own memory space, avoiding shared state

4\. **Libraries**: For thread-safe data structures, consider using libraries like or async

immutable.js

for managing state in an asynchronous environment.

5\. **Asynchronous Operations**: For asynchronous I/O, Node.js naturally avoids thread safety issues by not allowing multiple operations to interfere with each other on the main thread.

**Example Using Worker Threads:**

javascript

const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {

const worker = new Worker( filename);

worker.on('message', (message) => console.log('Worker says:', message)); worker.postMessage('Hello Worker');

} else {

parentPort.on('message', (message) => {

parentPort.postMessage(\`Received: ${message}\`);

});

}

In this example, communication between the main thread and worker thread is done via messages, ensuring data safety and no shared memory issues.

56/105

**64\. What is the difference between blocking and non-blocking code in Node.js?**

The distinction between **blocking** and **non-blocking** code is crucial in understanding how Node.js works, especially with respect to asynchronous operations.

**Blocking Code:**

**Blocking** refers to operations that stop the execution of subsequent code until the current operation is finished.

In a blocking operation, Node.js waits for a task to complete before moving on to the next task, effectively **blocking the event loop**.

**Example of Blocking Code:**

javascript

const fs = require('fs');

console.log('Start');

const data = fs.readFileSync('example.txt', 'utf8'); _// Blocking_

console.log(data);

console.log('End');

In this example, is a blocking call. The program waits for the file to be read fs.readFileSync

before continuing, blocking the event loop and delaying further execution.

**Non-blocking Code:**

**Non-blocking** operations allow Node.js to continue executing other code while waiting for a task to complete. These operations use callbacks, promises, or async/await to handle the result once the operation finishes.

**Example of Non-blocking Code:**

javascript

const fs = require('fs');

console.log('Start');

fs.readFile('example.txt', 'utf8', (err, data) => { _// Non-blocking_

57/105

if (err) throw err;

console.log(data);

});

console.log('End');

Here, the function is non-blocking. While the file is being read, Node.js fs.readFile

continues to execute the callback is triggered.

**Key Difference:**

console.log('End')

statement, and once the file is read, the

**Blocking**: Delays the execution of the program until the operation completes. **Non-blocking**: Allows other tasks to execute while waiting for the operation to finish.

**65\. How do you handle large datasets in Node.js efficiently?**

Handling large datasets efficiently in Node.js requires strategies that prevent memory overuse, reduce blocking, and optimize I/O operations. Node.js’s **event-driven, non-blocking** nature makes it well-suited for this, but you must still be mindful of performance.

**Techniques for Handling Large Datasets:**

1\. **Streams**:

Node.js streams allow you to read and write data piece-by-piece, which is particularly useful for large files or datasets. Instead of loading the entire dataset into memory, streams read and process data in chunks, helping to conserve memory.

**Readable Streams** for input (e.g., reading files or HTTP requests).

**Writable Streams** for output (e.g., writing to files or sending HTTP responses). Example:

javascript

const fs = require('fs');

const readableStream = fs.createReadStream('largefile.txt', { encoding: 'utf8' });

readableStream.on('data', chunk => {

58/105

console.log(chunk); _// Process data chunk by chunk_

});

2\. **Pagination**:

When working with large datasets from a database or API, implement **pagination** to load and process data in smaller chunks.

Example:

javascript

const pageSize = 100;

let currentPage = 1;

function fetchData(page) {

_// Simulate a data fetch_

return new Promise(resolve => {

setTimeout(() => resolve(\`Data for page ${page}\`), 500);

});

}

async function loadData() {

for (let i = 0; i < 1000; i += pageSize) {

const data = await fetchData(currentPage++);

console.log(data); _// Process data page by page_

}

}

loadData();

3\. **Batch Processing**:

For operations like database writes or API requests, split the large dataset into smaller **batches**. This prevents overwhelming the system with too much data at once and ensures smooth handling.

4\. **Optimize Memory Usage**:

Use **buffering** techniques when dealing with binary data or large files. Buffers allow you to work with raw binary data more efficiently than regular strings.

Consider using tools like **Redis** or **MongoDB** to store large datasets offload them from memory.

5\. **Compression**:

59/105

If you're dealing with large datasets over a network, compressing the data before sending it can reduce I/O time and memory usage. Node.js has built-in support for compression via the **zlib** module.

6\. **Use External Tools**:

When appropriate, consider using external tools or databases like **MongoDB**, **Cassandra**, or **Hadoop** for processing large datasets, especially if the data is structured or needs distributed processing.

By using these techniques, Node.js applications can efficiently handle large datasets without consuming excessive resources or causing performance bottlenecks.

**66\. Explain how to implement rate-limiting in a Node.js application.**

**Rate-limiting** is used to control the number of requests a user or client can make to an API or service within a given time period, typically to prevent abuse or overload.

In a Node.js application, you can implement rate-limiting using various approaches,

including third-party libraries like your own custom solution.

express-rate-limit

(if using Express) or by implementing

**Custom Rate-Limiting Implementation:**

1\. **In-Memory Rate-Limiting**:

Track the number of requests from a user (typically using the user's IP address or session identifier).

Store the timestamps of the user's requests and check if the user has exceeded the limit within the specified time window.

2\. **Example**:

javascript

const http = require('http');

const rateLimit = new Map(); _// Store IP address request count_

const requestLimit = 5; _// Max requests per time window_

const timeWindow = 60 \* 1000; _// 1 minute_

const server = http.createServer((req, res) => {

const ip = req.connection.remoteAddress; _// Use IP for identification_ const currentTime = Date.now();

60/105

if (!rateLimit.has(ip)) {

rateLimit.set(ip, \[\]);

}

const requestTimes = rateLimit.get(ip);

_// Filter out requests that are older than the time window_

rateLimit.set(ip, requestTimes.filter(time => currentTime - time <= timeWindow));

_// Check if the request limit has been reached_

if (requestTimes.length >= requestLimit) {

res.statusCode = 429; _// Too many requests_

res.end('Rate limit exceeded. Please try again later.');

} else {

rateLimit.get(ip).push(currentTime); _// Record the request_

res.statusCode = 200;

res.end('Request accepted');

}

});

server.listen(3000, () => {

console.log('Server is running');

});

This example tracks requests per IP address, and if a user exceeds the limit, it returns a 429

Too Many Requests

response.

3\. **Using Third-Party Libraries**:

For more complex rate-limiting needs (e.g., using Redis to persist rate-limit data), you can use libraries like .

express-rate-limit

bash

npm install express-rate-limit

Then, implement it in your application:

javascript

const express = require('express');

const rateLimit = require('express-rate-limit');

61/105

const app = express();

const limiter = rateLimit({

windowMs: 1 \* 60 \* 1000, _// 1 minute_

max: 5, _// limit to 5 requests per IP_

message: 'Too many requests, please try again later.',

});

app.use(limiter);

app.get('/', (req, res) => {

res.send('Hello World!');

});

app.listen(3000, () => {

console.log('Server running on port 3000');

});

**67\. What is a memory leak, and how do you detect it in a Node.js application?**

A **memory leak** occurs when memory that is no longer needed by the application is not released, resulting in increased memory usage over time. This can lead to performance degradation or crashes if the application consumes all available memory.

**Detecting Memory Leaks:**

1\. **Use Node.js Profiler**:

You can use the built-in monitor memory usage.

Example:

bash

node --inspect-brk app.js

\--inspect

flag in Node.js to start a debugging session and

62/105

Then, open Chrome DevTools to monitor memory usage and inspect heap snapshots.

2\. **Heap Snapshots**:

You can take **heap snapshots** to analyze memory allocations over time. Tools like

Chrome DevTools or

clinic.js

can help you visualize memory usage patterns.

3\. **Using**

:

process.memoryUsage()

The

process.memoryUsage()

method provides detailed information about the

memory consumption of the Node.js process.

Example:

javascript

setInterval(() => {

console.log(process.memoryUsage());

}, 1000);

4\. **Third-Party Libraries**:

Libraries like or can help monitor memory usage and

memwatch-next

heapdump

detect leaks by generating memory dumps or alerts when memory usage is unusually high.

Example with :

memwatch-next

bash

npm install memwatch-next

javascript

const memwatch = require('memwatch-next');

memwatch.on('leak', (info) => {

console.log('Memory leak detected:', info);

});

63/105

**68\. What is the purpose of the deprecated?**

domain

**module, and why is it**

The **module** in Node.js was introduced to manage uncaught exceptions in domain

asynchronous callbacks. It allowed you to group multiple I/O operations and handle errors for all operations in that group (domain). It provided a mechanism to catch errors that were otherwise difficult to handle, like those in callbacks.

**Purpose:**

**Error Handling**: It was used for catching exceptions in asynchronous code, where the normal try-catch block would not work.

**Grouping Operations**: Domains allowed grouping of related I/O operations together to manage and handle errors more efficiently.

**Why is it deprecated?:**

The **module** was deprecated in Node.js because its usage often led to domain

unintended side effects and unpredictable error handling behavior. The asynchronous model in Node.js (using callbacks, promises, and async/await) makes error handling more straightforward without requiring special constructs like domains.

Modern JavaScript patterns, such as and **global error handlers** like async/await

process.on('uncaughtException') **Recommendation:**

, are now preferred for error handling.

Instead of using , handle errors in asynchronous code using with domain try-catch

async/await

or handle event-driven errors with proper error event listeners.

**69\. How does Node.js handle DNS queries?**

Node.js handles **DNS (Domain Name System)** queries via the dns

module, which provides

methods to resolve domain names to IP addresses and vice versa.

**Methods in the**

dns

**module:**

1.

dns.lookup()

: Resolves a hostname to an IP address.

It uses the operating system's DNS resolver to look up the IP address.

64/105

Example:

javascript

const dns = require('dns');

dns.lookup('google.com', (err, address, family) => { if (err) throw err;

console.log('IP address:', address);

});

2.

dns.resolve() Example:

javascript

: Resolves a hostname to a set of records (e.g., A records, MX records).

dns.resolve('google.com', 'A', (err, addresses) => { if (err) throw err;

console.log('A records:', addresses);

});

3.

dns.reverse()Example:

javascript

: Performs a reverse DNS lookup (maps an IP address to a hostname).

dns.reverse('8.8.8.8', (err, hostnames) => {

if (err) throw err;

console.log('Reverse lookup:', hostnames);

});

These functions can be used to interact with DNS servers and resolve domains as part of network operations in Node.js.

**70\. How do you use the module in Node.js?**

buffer

The **module** in Node.js provides a way to handle binary data directly. Buffers are raw buffer

memory allocations, allowing you to work with binary data streams like images, files, or network packets without the overhead of converting them into strings.

65/105

**Creating Buffers:**

1\. **From a String**:

javascript

const buffer = Buffer.from('Hello, World!');

console.log(buffer); _// Output: &lt;Buffer 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21&gt;_

2\. **Allocating Buffers**:

You can allocate a buffer of a specified size.

javascript

const buffer = Buffer.alloc(10); _// Allocates a buffer with 10 bytes_ console.log(buffer); _// Output: &lt;Buffer 00 00 00 00 00 00 00 00 00 00&gt;_

3\. **From an Array**:

javascript

const buffer = Buffer.from(\[1, 2, 3, 4, 5\]);

console.log(buffer); _// Output: &lt;Buffer 01 02 03 04 05&gt;_

**Manipulating Buffers:**

You can read and write to buffers using different methods such as , .toString()

.write()Example:

javascript

, or . .slice()

const buffer = Buffer.from('Hello, Node.js!');

console.log(buffer.toString('utf8', 0, 5)); _// Output: Hello_

**Use Cases:**

**File Handling**: Buffers are used extensively when working with file systems to handle binary data (e.g., reading/writing images, videos, or other binary files).

**Networking**: Buffers are useful in network operations where raw binary data needs to be processed or transferred.

66/105

These are the main concepts related to handling DNS queries and working with the

buffer

module in Node.js, along with detailed explanations on various aspects of the Node.js environment.

**71\. How does the library contribute to Node.js?** libuv

The library plays a critical role in the performance and behavior of **Node.js**, libuv

particularly in managing **asynchronous I/O operations** and event-driven architecture. It is a **multi-platform** library that provides a **uniform interface** for I/O operations and is responsible for the core features that make Node.js efficient in handling concurrent tasks.

**Key Contributions of :**

libuv

1\. **Event Loop**:

The event loop is the heart of Node.js, and implements this loop, which libuv

allows Node.js to handle multiple concurrent operations efficiently without blocking the thread.

It enables **non-blocking I/O**, allowing Node.js to execute I/O operations (like reading files or querying databases) asynchronously while continuing to process other tasks.

2\. **Asynchronous I/O**:

libuv

abstracts system-specific mechanisms (such as on Linux, on epoll kqueue

macOS, and IOCP on Windows) for non-blocking I/O operations, allowing Node.js to be highly performant in environments with high concurrency.

3\. **Thread Pool**:

libuv

uses a **thread pool** to handle I/O operations that are blocking in nature (e.g.,

file system operations, DNS resolution). While JavaScript runs on a single thread,

libuv

offloads some blocking tasks to the thread pool, allowing the main thread

(event loop) to remain free for other operations. 4. **Cross-Platform Compatibility**:

libuv

abstracts platform-specific features, making Node.js applications portable

across various operating systems like Windows, macOS, and Linux without requiring special handling for OS-specific I/O mechanisms.

In summary, provides the foundation for asynchronous, non-blocking I/O and libuv

concurrency, ensuring that Node.js can handle high levels of traffic and complex operations

67/105

in an efficient and scalable way.

**72\. How do you implement caching in a Node.js application?**

Caching in a Node.js application can significantly improve performance by reducing the number of requests to databases or external services. Caching can be implemented using various techniques, such as **in-memory caching**, **file-based caching**, or **external cache stores** (e.g., Redis or Memcached).

**In-Memory Caching:**

1\. **Using a Simple In-Memory Cache**:

You can use a JavaScript object or a package like caching.

Example using :

node-cache

bash

npm install node-cache

javascript

const NodeCache = require('node-cache'); const cache = new NodeCache();

_// Set a cache item_

node-cache

for basic in-memory

cache.set('user_123', { name: 'John Doe', age: 30 }, 3600); _// TTL 1 hour_

_// Get a cached item_

const user = cache.get('user_123');

if (user) {

console.log('Cache hit:', user);

} else {

console.log('Cache miss, fetch data...');

_// Fetch data and store it in cache_

}

2\. **Using Redis for Caching**:

68/105

Redis is a popular in-memory data store that can be used to cache data outside the application process. It is commonly used in distributed systems for high performance caching.

Example using Redis:

bash

npm install redis

javascript

const redis = require('redis');

const client = redis.createClient();

_// Set cache data with an expiration time (TTL)_

client.setex('user_123', 3600, JSON.stringify({ name: 'John Doe', age: 30 }));

_// Get cache data_

client.get('user_123', (err, reply) => {

if (reply) {

console.log('Cache hit:', JSON.parse(reply));

} else {

console.log('Cache miss');

_// Fetch data and cache it_

}

});

**Other Caching Techniques:**

**HTTP Caching**: Cache HTTP responses using caching headers ( , , Cache-Control ETag

etc.).

**Content Delivery Networks (CDNs)**: For static assets, CDNs can be used for caching content globally, reducing latency and server load.

**73\. Explain the role of a reverse proxy with Node.js.**

69/105

A **reverse proxy** is a server that sits between client devices and a backend server (like a Node.js application), forwarding client requests to the appropriate backend service. It acts as an intermediary, ensuring proper request handling, load balancing, security, and caching.

**Key Roles of a Reverse Proxy with Node.js:**

1\. **Load Balancing**:

A reverse proxy can distribute incoming traffic across multiple instances of a Node.js application, improving performance and ensuring better resource utilization. This is particularly important for handling high volumes of requests.

2\. **SSL Termination**:

The reverse proxy can handle **SSL/TLS encryption** and decryption (SSL termination), reducing the computational load on the Node.js server by offloading the encryption task to the proxy.

3\. **Caching**:

A reverse proxy can cache static content (e.g., HTML, images, etc.) and reduce the load on your Node.js application by serving cached data for repeated requests.

4\. **Security**:

A reverse proxy can act as an additional security layer, filtering out malicious requests, preventing DDoS attacks, or protecting sensitive endpoints.

5\. **API Gateway**:

Reverse proxies can also serve as an **API Gateway**, managing requests to multiple microservices, directing them to different backend services based on routing rules.

6\. **Scaling**:

It enables **horizontal scaling** by distributing requests to multiple instances of a Node.js application. This ensures better fault tolerance and scalability.

**Example of Reverse Proxy Setup:**

Popular reverse proxy tools include **NGINX** and **HAProxy**. NGINX can be configured to forward requests to a Node.js app running on a different port.

Example configuration for NGINX:

nginx

70/105

server {

listen 80;

server_name example.com;

location / {

proxy_pass http://localhost:3000; # Forward requests to Node.js app proxy_http_version 1.1;

proxy_set_header Upgrade $http_upgrade;

proxy_set_header Connection 'upgrade';

proxy_set_header Host $host;

proxy_cache_bypass $http_upgrade;

}

}

**74\. How do you use a message queue with Node.js (e.g., RabbitMQ)?**

A **message queue** allows asynchronous communication between services by sending messages that can be processed later. **RabbitMQ** is a popular open-source message broker that supports various messaging patterns, including publish/subscribe, work queues, and routing.

**Using RabbitMQ with Node.js:**

To use RabbitMQ with Node.js, you can use the to interact with RabbitMQ.

1\. **Install** :

amqplib

bash

npm install amqplib

amqplib

library, which provides an interface

2\. **Producer (Sending Messages)**: A producer sends messages to a specific queue.

javascript

const amqp = require('amqplib/callback_api');

71/105

amqp.connect('amqp://localhost', (err, conn) => {

if (err) throw err;

conn.createChannel((err, channel) => {

if (err) throw err;

const queue = 'task_queue';

const msg = 'Hello, RabbitMQ!';

channel.assertQueue(queue, { durable: true });

channel.sendToQueue(queue, Buffer.from(msg), { persistent: true }); console.log(" \[x\] Sent '%s'", msg);

});

});

3\. **Consumer (Receiving Messages)**: A consumer listens for messages from the queue and processes them.

javascript

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {

if (err) throw err;

conn.createChannel((err, channel) => {

if (err) throw err;

const queue = 'task_queue';

channel.assertQueue(queue, { durable: true });

console.log(" \[\*\] Waiting for messages in %s. To exit press CTRL+C");

channel.consume(queue, (msg) => {

if (msg !== null) {

console.log(" \[x\] Received %s", msg.content.toString());

channel.ack(msg);

}

}, { noAck: false });

});

});

4\. **Benefits**:

**Decoupling**: Services are decoupled, making them easier to scale and maintain. **Reliability**: RabbitMQ ensures that messages are not lost (durable queues).

72/105

**Asynchronous Processing**: RabbitMQ can handle heavy or slow tasks

asynchronously, freeing up resources for other operations.

**75\. How do you integrate microservices with Node.js?**

Integrating **microservices** in a Node.js environment involves creating multiple small, independently deployable services that communicate with each other over a network (typically via HTTP, WebSockets, or messaging queues).

**Steps for Integrating Microservices with Node.js:**

1\. **Use REST APIs**:

Each microservice exposes a REST API for communication with other services. You can use **Express** or other frameworks to create APIs.

2\. **Service Discovery**:

Microservices need to discover and communicate with each other. This can be achieved using tools like **Consul** or **Eureka**, which register microservices and provide dynamic service discovery.

3\. **Inter-Service Communication**:

**HTTP** or **gRPC** (for faster communication) can be used to communicate between services. For asynchronous communication, a **message queue** like RabbitMQ or Kafka can be used.

4\. **API Gateway**:

Use an **API Gateway** (such as NGINX or Kong) to route incoming requests to the correct microservice and handle cross-cutting concerns like authentication, rate limiting, and logging.

5\. **Database per Service**:

Each microservice should have its own database to ensure loose coupling. This can be SQL, NoSQL, or a combination, depending on the service's needs.

6\. **Authentication and Authorization**:

Implement **JWT** ( JSON Web Tokens) for service-to-service authentication or use a centralized identity provider (e.g., **OAuth2**).

73/105

**Example of Simple Microservice Architecture: Service 1**: User Service (manages users, exposes

/users

API).

**Service 2**: Product Service (manages products, exposes

/products

API).

**API Gateway**: Routes incoming requests to the appropriate service.

In this architecture, each microservice can be scaled independently based on its load.

These answers provide an overview of key topics related to Node.js and microservices, helping you better understand how to optimize and scale your applications.

**76\. Explain the Internals of the Node.js Event Loop and Its Phases.**

The **Node.js event loop** is the core mechanism behind **non-blocking, asynchronous execution** in Node.js. It allows Node.js to handle multiple operations (such as I/O, network requests, and timers) concurrently without blocking the execution thread.

The event loop operates in multiple phases, each with specific tasks. Understanding these phases is essential to grasp how Node.js processes tasks.

**Phases of the Event Loop:**

1\. **Timers Phase**:

This phase executes callbacks for and functions. If a setTimeout setInterval

timer's time threshold has passed, its callback is executed.

2\. **I/O Callbacks Phase**:

Executes callbacks for completed **I/O operations** (like reading files, network requests, etc.) that were queued in the previous cycle.

3\. **Idle, Prepare Phase**:

This phase is used internally for housekeeping and to prepare for the next cycle. It does not typically execute application-level code.

4\. **Poll Phase**:

The **poll phase** is where most I/O events are handled. If there are no timers to execute, the event loop will block and wait for I/O events. This phase processes **I/O tasks** (such as database queries) that are ready for execution. If there are callbacks to execute, they are processed here.

74/105

5\. **Check Phase**:

Executes callbacks for calls. This phase happens immediately after setImmediate()

the poll phase, before any new timers are triggered.

6\. **Close Callbacks Phase**:

Handles close events, such as when a socket or handle is closed. This includes events like or .

socket.on('close') process.on('exit')

**Event Loop Execution Cycle:**

The event loop continuously cycles through these phases. The order of execution is: Timers -> I/O Callbacks -> Idle/Prepare -> Poll -> Check -> Close Callbacks.

The event loop provides **non-blocking concurrency** by allowing I/O operations to be handled without pausing the execution of the program.

**77\. How Do You Handle High Concurrency in a Node.js Application?**

Handling high concurrency efficiently is one of the major benefits of Node.js. Since Node.js uses a single-threaded event loop, it can handle thousands of simultaneous requests by **non blocking I/O**. However, there are several strategies to further improve its concurrency handling:

**1\. Asynchronous I/O:**

Use **asynchronous non-blocking operations** to handle file system, database queries, network calls, etc., without blocking the event loop. This ensures that Node.js remains responsive to incoming requests while performing I/O operations.

**2\. Clustering:**

The **module** allows you to create multiple child processes (workers) running in cluster

parallel. Each worker runs on a separate CPU core, leveraging multi-core systems and improving concurrency.

Example using :

cluster

javascript

75/105

const cluster = require('cluster');

const http = require('http');

const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {

_// Fork workers for each CPU core_

for (let i = 0; i < numCPUs; i++) {

cluster.fork();

}

} else {

_// Worker code_

http.createServer((req, res) => {

res.writeHead(200);

res.end('Hello, world!');

}).listen(8000);

}

**3\. Load Balancing:**

Use a **reverse proxy** (like NGINX) or a **load balancer** to distribute incoming requests to multiple instances of the Node.js application, ensuring no single process is overwhelmed.

**4\. Caching:**

Implement **caching** mechanisms (e.g., Redis) to reduce the load on the application by storing frequently accessed data in memory.

**5\. Rate Limiting:**

Implement **rate limiting** to prevent clients from overwhelming your server with too many requests. Tools like **Redis** and middleware like **express-rate-limit** can be useful.

**6\. Use Worker Threads:**

For CPU-intensive tasks, consider using **worker threads**. These allow you to run operations on separate threads, freeing the main event loop for I/O-bound tasks.

**78\. What Are Some Advanced Patterns for Error Handling in Node.js?**

76/105

Error handling in Node.js is a crucial aspect of ensuring that the application runs reliably, especially in an asynchronous environment. Here are some **advanced patterns** for handling errors:

**1\. Centralized Error Handling Middleware:**

For frameworks like **Express**, you can use a centralized error-handling middleware. This pattern helps manage all application errors in a single place, improving maintainability.

Example:

javascript

app.use((err, req, res, next) => {

console.error(err.stack);

res.status(500).send('Something went wrong!');

});

**2\. Domain Module (Deprecated):**

The **module** was used for handling uncaught errors across asynchronous domain

callbacks. While it's deprecated, it was a useful tool for catching unhandled errors in

multiple callbacks and preventing crashes. Consider using patterns instead.

**3\. Promises and :**

.catch()

try/catch

blocks or other

In asynchronous code using Promises, use the method to catch errors at the .catch()

end of the chain, ensuring you don't miss exceptions thrown at any point in the chain. Example:

javascript

someAsyncFunction()

.then(result => { _/\* process result \*/_ })

.catch(error => { console.error('Error:', error); });

**4\. Async/Await with Try/Catch:**

When using **async/await**, wrap asynchronous code in exceptions synchronously.

Example:

try/catch

blocks to handle

77/105

javascript

async function someFunction() {

try {

const result = await someAsyncOperation();

console.log(result);

} catch (err) {

console.error('Error:', err);

}

}

**5\. Graceful Shutdown:**

Handle uncaught exceptions and unhandled promise rejections to allow for a **graceful shutdown**.

Listen for

and

process.on('uncaughtException') process.on('unhandledRejection')

to prevent crashes and clean up resources.

Example:

javascript

process.on('uncaughtException', (err) => {

console.error('Uncaught Exception:', err);

process.exit(1); _// Exit after logging the error_

});

**79\. How Does Node.js Integrate with WebAssembly?**

**WebAssembly (Wasm)** is a binary instruction format for safe, portable, and high performance execution of code in web browsers and other environments, including Node.js. In Node.js, **WebAssembly** is used for **high-performance computing tasks**, such as image processing, cryptography, or physics simulations.

**Integrating WebAssembly in Node.js:**

1\. **Loading a WebAssembly Module**:

78/105

Use the API to load and instantiate WebAssembly modules in Node.js. WebAssembly

This allows you to run compiled code (e.g., C, C++, Rust) within a Node.js process. Example:

javascript

const fs = require('fs');

const wasmBuffer = fs.readFileSync('example.wasm');

WebAssembly.instantiate(wasmBuffer)

.then(wasmModule => {

const result = wasmModule.instance.exports.add(5, 3);

console.log('Result from WebAssembly:', result); _// Output: 8_

})

.catch(err => {

console.error('Failed to load WebAssembly module', err);

});

2\. **Interoperability**:

WebAssembly code in Node.js can interact with JavaScript through **imports and exports**. You can pass values between JavaScript and WebAssembly modules, enabling high-performance operations.

3\. **Use Cases**:

**Heavy computation**: Use WebAssembly for tasks requiring high performance (e.g., cryptographic operations).

**Third-party libraries**: If a library is written in C or Rust, compile it to WebAssembly and use it in Node.js for improved performance.

**80\. How Do You Create a Custom Stream in Node.js?**

A **custom stream** in Node.js allows you to define your own streaming behavior by extending the or stream classes from the module. Readable stream

Writable

**Creating a Custom Readable Stream:**

79/105

You can create a custom stream by extending the stream class and implementing Readable

the method, which dictates how data is pushed to the stream. \_read

javascript

const { Readable } = require('stream');

class MyReadableStream extends Readable {

constructor(options) {

super(options);

this.data = \['Hello', 'World', 'from', 'Node.js'\];

}

\_read(size) {

const chunk = this.data.shift();

if (chunk) {

this.push(chunk);

} else {

this.push(null); _// End the stream_

}

}

}

const readableStream = new MyReadableStream();

readableStream.pipe(process.stdout);

**Creating a Custom Writable Stream:**

To create a custom writable stream, extend the class and implement the Writable \_write

method, which determines how data is written to the stream.

javascript

const { Writable } = require('stream');

class MyWritableStream extends Writable {

\_write(chunk, encoding, callback) {

console.log(\`Writing: ${chunk.toString()}\`);

callback();

}

}

const writableStream = new MyWritableStream();

80/105

**What's the difference between CommonJS and ES Modules in Node?**
require()/module.exports (CommonJS) is Node's original, synchronous module system. import/export (ES Modules) is the JS standard, loaded asynchronously — enable it per-project with "type": "module" in package.json, or per-file with a .mjs extension.

**What is a Buffer, and how does it differ from a JS string?**
A Buffer holds raw binary data (bytes) directly, while a string is always a sequence of UTF-16 code units — Buffers are used for anything binary (file contents, network data, images) that a string can't represent safely.

**What is Node's permissions model?**
An experimental flag-gated feature that restricts what a Node process is allowed to do (file system access, network, child processes) at the runtime level — aimed at limiting the blast radius if a dependency turns out to be malicious.

**What's the difference between exports and module.exports?**
module.exports is the actual object require() returns. exports is just a shortcut variable pointing to the same object initially — reassigning exports = {...} breaks that link, so always reassign module.exports directly when replacing the whole export.

**How does top-level await work in Node ESM modules?**
In an ES module (not CommonJS), you can use await directly at the top level of a file, outside any async function — useful for things like awaiting a database connection before the rest of the module runs.

**What's the difference between spawn, exec, and fork for child processes?**
spawn streams output as it's produced (good for long-running processes). exec buffers the entire output and returns it once the process finishes (simpler for short commands). fork is a special case of spawn for launching another Node script, with a built-in message channel.

**How do you implement graceful shutdown in a Node HTTP server?**
Listen for SIGTERM, stop accepting new connections, let in-flight requests finish, close database connections, then exit — instead of the process dying mid-request when a deploy or scale-down kills it abruptly.
```
process.on('SIGTERM', async () => {
  server.close(() => process.exit(0));
});
```

**What is N-API, and why does it matter for native addons?**
A stable C API for building native (C/C++) addons for Node that isn't tied to a specific V8 version — addons built against N-API keep working across Node upgrades without needing to be recompiled for every version.

**How do you profile a Node.js application to find a CPU bottleneck?**
Run Node with --prof to generate a V8 profiling log, or use a tool like clinic.js, to see exactly which functions are consuming CPU time — essential before trying to optimize code based on a guess.

**What's the difference between process.env and a .env file?**
Node doesn't natively load .env files — a library like dotenv reads it and copies its values into process.env at startup (newer Node versions added a built-in --env-file flag that does this natively too).

**ND1: Is Node single-threaded?**
Your JS runs on one thread, but I/O (files, network, DB) is handled in the background by the OS/libuv, and callbacks are queued back onto that one thread — that's how Node handles many requests without blocking.

**ND2: process.nextTick vs microtask vs setImmediate?**
`process.nextTick` runs first, then Promise callbacks (microtasks), then `setImmediate` runs after I/O in the next loop iteration.

**ND3: How do you handle async errors?**
Wrap `await` in try/catch, or attach `.catch()` to a Promise chain.
```js
try {
  const user = await prisma.user.findUnique({ where: { id } });
} catch (err) {
  console.error('DB lookup failed', err);
}
```

**ND4: How does middleware work in a request pipeline?**
Each middleware runs in order, can inspect/modify the request, and calls `next()` to pass control along (or ends the response early, e.g. on auth failure).

**ND5: What causes a memory leak in Node?**
Ever-growing global caches/arrays, event listeners never removed, closures holding large objects. Diagnose with `--inspect` and a heap snapshot.

**ND6: CommonJS vs ESM?**
`require`/`module.exports` (CommonJS) is Node's original, synchronous system. `import`/`export` (ESM) is the modern standard, loaded asynchronously.

**ND7: What are streams for?**
Process data in small chunks instead of loading a whole file into memory — essential for large files.

**ND8: Clustering vs worker threads?**
Clustering runs multiple full Node processes (own memory each) across CPU cores for more requests. Worker threads run separate threads in one process, sharing memory — better for CPU-heavy work.

**ND9: How do you secure a Node API?**
Validate/sanitize all input (this project uses Zod), use parameterized queries (Prisma does this automatically), never trust client-side validation alone.

**ND10: How do you manage config/secrets?**
Environment variables, never committed to git, with different values loaded per environment (dev/staging/prod).

**ND11: exports vs module.exports?**
`module.exports` is the actual object `require()` returns; `exports` is a shortcut reference to it. Reassigning `exports = {...}` breaks the link — always reassign `module.exports` instead.

**ND12: What is a Buffer?**
A fixed chunk of raw binary data that JS strings can't represent directly — used for files, images, network data.

**ND13: spawn vs exec vs fork?**
`spawn` streams output (good for long-running commands). `exec` buffers all output and returns it at once (good for short commands). `fork` runs another Node script that can message the parent.

**ND14: What is backpressure?**
When a stream produces data faster than it's consumed, Node signals "pause" until the receiver catches up, avoiding unlimited memory buffering.

**ND15: REST vs GraphQL?**
REST exposes fixed endpoints per resource, simple and cache-friendly. GraphQL exposes one endpoint where the client asks for exactly the fields it needs, at the cost of more server complexity.

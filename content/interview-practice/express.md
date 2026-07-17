# Express.js Interview PrepCore Concepts

**1\. What is Express.js, and how does it relate to Node.js?**

Express is a minimal web framework built on top of Node.js. Node gives you a raw HTTP server and JS runtime; Express adds the layer most people actually need on top of that — routing, middleware, request/response helpers — so you're not manually parsing URLs and writing response headers by hand for every endpoint.

const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000);

**2\. Explain the concept of middleware in Express.js.**

A middleware is just a function (req, res, next) that sits in the request pipeline — it can inspect/modify the request, end the response, or call next() to hand off to whatever's next in line. Chaining several of these together is how Express handles things like logging, auth checks, and body parsing without cramming it all into one handler.

app.use((req, res, next) => {

console.log(req.method, req.url);

next();

});

**3\. How would you set up a basic Express.js application?**

npm init -y

npm install express

// app.js

const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Hello, World!'));

app.listen(3000, () => console.log('Running on port 3000'));

Run it with node app.js, or nodemon app.js during development so it restarts on file changes automatically.

**4\. What is the purpose of the \`app.use()\` function?**

It registers middleware — either globally (runs on every request) or scoped to a path prefix. It's the mechanism behind body parsing, serving static files, CORS, logging, and error handling; basically anything that needs to touch the request before (or after) your actual route logic.

app.use(express.json()); // parse JSON bodies

app.use('/static', express.static('public')); // scoped to /static

**5\. How do you serve static files using Express.js?**

The built-in express.static middleware.

app.use(express.static('public'));

Anything in the public folder is now served directly — public/style.css becomes reachable at /style.css. You can mount it under a prefix too: app.use('/assets', express.static('public')).

**6\. Discuss the difference between \`app.get()\` and \`app.post()\` in Express.js.**

app.get() handles GET requests — meant for reading/retrieving data, with any parameters typically in the URL (query string) and visible/bookmarkable. app.post() handles POST — meant for submitting/creating data, with the payload in the request body instead of the URL, so it's suited for forms, file uploads, or anything sensitive that shouldn't sit in a browser history.

**7\. How do you retrieve the URL parameters from a GET request in Express.js?**

Path parameters (:id segments) come from req.params; query string parameters (?key=value) come from req.query — two different things people often mix up.

app.get('/users/:id', (req, res) => {

res.send(\`User ID: ${req.params.id}\`); // /users/42 -> "42"

});

app.get('/search', (req, res) => {

res.send(req.query.q); // /search?q=node -> "node"

});

**8\. What are route handlers, and how would you implement them?**

Functions that respond to a specific method + path combination — the actual logic that runs when a matching request comes in. You can also chain multiple handlers for one route (each calling next()) to run checks like auth before the "real" handler executes.

app.get('/profile', requireAuth, (req, res) => {

res.send('Welcome to your profile');

});

**9\. How do you enable CORS in an Express.js application?**

Easiest is the cors package.

npm install cors

const cors = require('cors');

app.use(cors({ origin: 'https://example.com' }));

Without it, browsers block cross-origin requests to your API by default — you can also set the headers manually, but the package handles the edge cases (preflight OPTIONS requests, etc.) for you.

**10\. Explain the use of \`next()\` in Express.js middleware.**

next() passes control to the next middleware/handler in the chain. Forget to call it (without ending the response some other way), and the request just hangs forever — the client gets no response at all. Calling next(err) with an argument skips straight to Express's error-handling middleware instead of the normal chain.

app.use((req, res, next) => {

if (!req.headers.authorization) return next(new Error('No auth header'));

next();

});

**11\. What is the role of the \`express.Router\` class?**

Lets you define routes in a separate, self-contained module instead of piling everything onto the main app object — useful once you have more than a handful of routes and want them organized by feature (users, orders, auth, etc.).

// routes/users.js

const router = require('express').Router();

router.get('/', (req, res) => res.send('all users'));

module.exports = router;

// app.js

app.use('/users', require('./routes/users'));

**12\. How do you handle 404 errors in Express.js?**

A catch-all middleware placed after every other route — since Express checks routes top-to-bottom, anything that reaches this point didn't match anything real.

app.use((req, res) => {

res.status(404).send('Not Found');

});

**13\. What are the differences between \`req.query\` and \`req.params\`?**

req.params reads named segments from the route path itself (/users/:id). req.query reads key-value pairs from after the ? in the URL (/users?sort=name). Same idea as Q7, just framed as a direct comparison — path params identify a specific resource, query params typically filter/modify how you fetch it.

**14\. Describe the purpose of \`req.body\` and how you would access it.**

Holds the parsed body of a POST/PUT/PATCH request — form data or a JSON payload the client sent. It's empty/undefined until you've told Express how to parse it, via the built-in body-parsing middleware.

app.use(express.json()); // for JSON payloads

app.use(express.urlencoded({ extended: true })); // for form submissions

app.post('/login', (req, res) => {

const { username, password } = req.body;

});

**15\. How do you create a middleware that logs the request method and URL for every request?**

A plain function registered globally with app.use(), run before your routes so it fires on everything.

app.use((req, res, next) => {

console.log(\`${new Date().toISOString()} ${req.method} ${req.url}\`);

next();

});

In a real project you'd reach for something like morgan instead of hand-rolling this, but this is exactly the pattern it's built on.

**What's the difference between application-level, router-level, and error-handling middleware?**
Application-level middleware (app.use(...)) runs for every request on the whole app. Router-level middleware is scoped to one express.Router() instance. Error-handling middleware is any middleware function with 4 arguments (err, req, res, next) — Express only calls it when an error is passed to next(err).

**How do you handle errors globally in Express?**
Define a middleware with 4 parameters at the end of your middleware chain — Express skips straight to it whenever next(err) is called anywhere upstream.
```
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```

**What's the difference between express.json() and body-parser?**
express.json() is Express's own built-in JSON body parser (added in Express 4.16+), functionally the same as the old separate body-parser package — body-parser is now largely redundant for JSON/urlencoded bodies since Express absorbed it.

**How do you validate request bodies in Express?**
Validate the request body/params/query with a schema library (Joi, Zod) inside a route or middleware, and respond with a 400 before any business logic runs if it fails — never trust that the client sent well-formed data.

**How do you structure a large Express app?**
Separate routes (endpoint definitions), controllers (request/response handling), and services (business logic/database calls) into their own folders/files, so a route file stays a short list of paths instead of hundreds of lines of logic.

**What's the difference between res.send(), res.json(), and res.end()?**
res.json() always serializes the argument as JSON with the right content-type header. res.send() is more flexible and infers content type from what you pass. res.end() just closes the response with no body.

**How do you implement rate limiting in Express?**
The express-rate-limit middleware tracks requests per IP (or another key) within a time window and returns a 429 once the limit is exceeded, protecting against abuse or accidental traffic spikes.

**How do you secure an Express app?**
helmet sets safer default HTTP headers, always validate/sanitize input, never build queries by string concatenation, serve everything over HTTPS, and keep dependencies patched since many real-world vulnerabilities come from outdated packages.

**How does session management work in Express?**
express-session stores a session ID in a cookie and keeps the actual session data server-side (in memory by default, or a store like Redis in production) — the cookie itself never holds sensitive data directly.

**What's the difference between app.all() and defining the same route per method?**
app.all('/path', handler) runs the handler for every HTTP method on that path in one line, useful for middleware-like logic (e.g. logging) that shouldn't care which verb was used.

**How do you handle file uploads in Express?**
multer is middleware that parses multipart/form-data requests and makes the uploaded file(s) available on req.file/req.files, since Express's built-in body parsers don't handle file uploads.

**What is the purpose of express.static()?**
Serves files directly from a folder (like public/) as-is over HTTP, without writing a route for every single file — used for images, CSS, client-side JS, etc.

**How do you write tests for Express routes?**
supertest lets you send real HTTP requests against your Express app in a test (without needing to actually start a server on a port) and assert on the response status/body, usually paired with Jest.

**What are common API versioning strategies?**
Either put the version in the URL (/api/v1/users) or in a request header. URL versioning is simpler and more visible/cacheable; header versioning keeps URLs clean but is less obvious when debugging.

**How would you connect Express to a database?**
Use a connection pool (most DB drivers/ORMs support this out of the box) so requests reuse a small set of open connections instead of opening a brand new one per request, which is far too slow at any real scale.
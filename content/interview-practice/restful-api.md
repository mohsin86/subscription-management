# 1. REST Fundamentals (Must Know)

Be able to explain:

* What REST is
* REST constraints:
  * Client-Server
  * Stateless
  * Cacheable
  * Uniform Interface
  * Layered System
  * Code on Demand (rarely used)
* Resource-oriented design

Example:

```
❌ /getUsers
❌ /createUser

✅ /users
✅ /users/:id
```

# 2. HTTP Methods

Know when to use each one.

| Method | Purpose | Idempotent |
| --- | --- | --- |
| GET | Read | ✅ |
| POST | Create | ❌ |
| PUT | Replace | ✅ |
| PATCH | Partial update | Usually ✅ |
| DELETE | Remove | ✅ |
| HEAD | Metadata | ✅ |
| OPTIONS | Discover capabilities / CORS | ✅ |

Typical interview question:

> PUT vs PATCH?

Good answer:

PUT replaces the entire resource, while PATCH updates only the provided fields.

# 3. Status Codes

These come up constantly. Know these without thinking.

Success:

* 200 OK
* 201 Created
* 202 Accepted
* 204 No Content

Client errors:

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 405 Method Not Allowed
* 409 Conflict
* 422 Unprocessable Entity
* 429 Too Many Requests

Server:

* 500 Internal Server Error
* 502 Bad Gateway
* 503 Service Unavailable

Interview question:

> When would you return 409?

Example: Email already exists.

# 4. URL Design

Good:

```
GET /users
GET /users/12
GET /users/12/orders
POST /orders
PATCH /orders/55
DELETE /orders/55
```

Bad:

```
/createUser
/updateOrder
/deletePost
```

# 5. Query Parameters

Know how APIs handle:

* `?page=2`
* `?limit=20`
* `?sort=name`
* `?order=desc`
* `?search=iphone`
* `?status=active`
* `?fields=id,name,email`

# 6. Filtering

```
GET /products?category=laptop
GET /products?priceMin=500
GET /products?priceMax=1000
```

# 7. Pagination

Offset:

```
?page=2&limit=20
```

Cursor:

```
?cursor=abc123
```

Know why cursor pagination is better for very large datasets and real-time feeds.

# 8. Authentication

Expect questions like:

* JWT
* Bearer Token
* Cookies
* Session authentication
* Refresh Token

Example:

```
Authorization: Bearer <token>
```

# 9. Versioning

```
/v1/users
/v2/users
```

or

```
Accept: application/vnd.company.v2+json
```

Know why versioning matters.

# 10. Idempotency

Very common.

Question:

> Why is PUT idempotent?

Example:

```
PUT /users/5
```

Sending it 10 times results in the same resource state. POST usually creates new resources each time.

# 11. Error Response Design

Bad:

```
Error
```

Good:

```json
{
  "success": false,
  "message": "Email already exists",
  "code": "EMAIL_EXISTS"
}
```

# 12. Caching

Know:

* ETag
* If-None-Match
* Cache-Control
* 304 Not Modified

# REST Basics

**1. What is REST?**
An architectural style for designing networked applications. It defines a set of constraints (statelessness, client-server, uniform interface, etc.) for building web services that communicate over HTTP.

**2. What does REST stand for?**
REpresentational State Transfer.

**3. What makes an API RESTful?**
It follows REST's architectural constraints: statelessness, uniform interface, client-server separation, cacheability, layered system, and (optionally) code-on-demand. Using HTTP verbs correctly and resource-based URLs is the practical baseline.

**4. What are the REST architectural constraints?**
Client-server, statelessness, cacheability, uniform interface, layered system, and code-on-demand (optional).

**5. What is a resource in REST?**
Any piece of data or object exposed by the API (a user, an order, a product). Each resource is identified by a URI, e.g., `/users/123`.

**6. What is the difference between REST and RESTful?**
REST is the architectural style/set of rules. "RESTful" describes an API that actually implements those rules. In practice people use the terms interchangeably.

**7. What is statelessness?**
Each request from client to server must contain all information needed to understand and process it. The server stores no client session state between requests.

**8. Why is statelessness important?**
It improves scalability (any server instance can handle any request), simplifies server design, and improves reliability since there's no session state to lose or synchronize.

**9. What is a representation of a resource?**
The format in which a resource's state is sent over the wire — typically JSON, sometimes XML. The same resource can have multiple representations depending on the `Accept` header.

**10. What is HATEOAS? Have you ever used it?**
Hypermedia As The Engine Of Application State — responses include links to related actions/resources so clients can navigate the API dynamically instead of hardcoding URLs. It's the most rigorous REST constraint and is rarely fully implemented in practice; most "REST APIs" skip it. Good answer in interviews: explain it, mention it's uncommon, and note you'd use it for public/evolvable APIs where discoverability matters.

# HTTP Methods

**11. Explain GET, POST, PUT, PATCH, DELETE.**
- GET: retrieve a resource, no side effects.
- POST: create a new resource (or trigger a non-idempotent action).
- PUT: replace a resource entirely.
- PATCH: partially update a resource.
- DELETE: remove a resource.

**12. When would you use PUT instead of PATCH?**
When you're sending the complete representation of the resource and want to replace it entirely — e.g., overwriting a user profile with a full new object.

**13. What is the difference between PUT and PATCH?**
PUT replaces the whole resource (client sends the full object); PATCH applies a partial update (client sends only the fields that changed).

**14. What is the difference between POST and PUT?**
POST creates a new resource and the server usually assigns the ID (not idempotent — calling it twice creates two resources). PUT creates/replaces a resource at a client-specified URI and is idempotent (calling it twice has the same effect as once).

**15. Is DELETE idempotent?**
Yes. Deleting the same resource multiple times leaves the system in the same state (deleted), even though the second call may return 404 instead of 200/204.

**16. Which HTTP methods are idempotent?**
GET, PUT, DELETE, HEAD, OPTIONS. POST and PATCH are generally not idempotent.

**17. Which HTTP methods are safe?**
"Safe" means no side effects on the server (read-only): GET, HEAD, OPTIONS.

**18. What is the HEAD method?**
Same as GET but returns only headers, no body. Useful for checking if a resource exists or getting metadata (size, last-modified) without downloading it.

**19. What is the OPTIONS method?**
Returns the HTTP methods and other options supported by a resource/endpoint. Commonly used by browsers for CORS preflight requests.

**20. What is the TRACE method? (Rare)**
Echoes back the received request for diagnostic purposes. Rarely used in practice and often disabled for security reasons (susceptible to XST attacks).

# Status Codes

**21. What is the difference between 200 and 201?**
200 OK = general success (e.g., GET, successful update). 201 Created = a new resource was successfully created, typically returned by POST, often with a `Location` header pointing to the new resource.

**22. When would you return 202 Accepted?**
When a request has been accepted for processing but isn't complete yet — for async/long-running operations (e.g., a background job queued for processing).

**23. When should you return 204 No Content?**
When the request succeeded but there's no body to return — common for DELETE, or PUT/PATCH where you don't return the updated resource.

**24. Difference between 400 and 422?**
400 Bad Request = malformed request (bad JSON, wrong data type, missing required field at the syntax level). 422 Unprocessable Entity = request is well-formed but fails semantic/business validation (e.g., email already exists).

**25. Difference between 401 and 403?**
401 Unauthorized = not authenticated (missing/invalid credentials). 403 Forbidden = authenticated but not authorized to access this resource.

**26. When should you return 404?**
When the requested resource doesn't exist at that URI, or sometimes intentionally to hide the existence of a resource the user isn't authorized to see.

**27. When would you return 405?**
405 Method Not Allowed — the resource exists, but the HTTP method used isn't supported on it (e.g., DELETE on a read-only endpoint).

**28. When should you return 409 Conflict?**
When the request conflicts with the current state of the resource — e.g., duplicate creation, version mismatch in optimistic concurrency, or trying to create a resource that already exists.

**29. What is 429 Too Many Requests?**
Returned when a client has exceeded a rate limit. Usually paired with a `Retry-After` header telling the client when to try again.

**30. Difference between 500, 502, and 503?**
500 Internal Server Error = generic unhandled server-side error. 502 Bad Gateway = an upstream/proxy server got an invalid response from another server. 503 Service Unavailable = server is temporarily overloaded or down for maintenance.

# API Design

**31. How do you design a REST API?**
Identify resources and their relationships, model URLs around nouns, choose appropriate HTTP methods and status codes, define request/response schemas, plan versioning/auth/error handling upfront, then document with OpenAPI/Swagger.

**32. What are REST naming conventions?**
Use plural nouns for collections (`/users`), lowercase with hyphens for multi-word paths (`/order-items`), nest resources logically (`/users/123/orders`), and keep URLs consistent and predictable.

**33. Should URLs use verbs or nouns?**
Nouns. The HTTP method conveys the action/verb. `/users` + GET/POST, not `/getUsers` or `/createUser`. Exceptions are sometimes made for actions that don't map to CRUD (e.g., `/orders/123/cancel`).

**34. How do you design nested resources?**
Nest when there's a clear parent-child ownership relationship: `/users/123/orders` for a user's orders. Use it for filtering/scoping, but avoid excessive nesting.

**35. How deep should nested resources be?**
Generally no more than 2 levels deep (`/parent/id/child`). Beyond that, prefer flattening with query parameters, e.g., `/comments?postId=123` instead of `/posts/123/comments/456/replies/789`.

**36. How do you handle relationships between resources?**
Via nested routes for ownership (`/users/123/orders`), via IDs/foreign keys in the resource body, or via a dedicated linking resource for many-to-many relationships (e.g., `/enrollments` linking students and courses).

**37. How do you version REST APIs?**
Common approaches: URI versioning (`/api/v1/users`), header versioning (`Accept: application/vnd.myapi.v1+json`), or query parameter versioning (`/users?version=1`). URI versioning is most common for clarity and cache-friendliness.

**38. URI versioning vs Header versioning?**
URI versioning is simple, visible, and cache-friendly but "pollutes" the URL and technically implies a different resource per version. Header versioning keeps URLs clean and is more RESTfully "correct" (same resource, different representation) but is less discoverable and harder to test/debug (can't just paste a URL in a browser).

**39. What makes a good API design?**
Consistency, predictability, proper use of HTTP semantics, good error messages, sensible pagination/filtering, versioning strategy, thorough documentation, and backward compatibility.

**40. What mistakes do developers commonly make in REST API design?**
Using verbs in URLs, ignoring proper status codes (returning 200 for everything), inconsistent naming, no versioning strategy, leaking internal DB structure directly as the API, poor error messages, and not handling pagination for large collections.

# Query Parameters

**41. How do you implement filtering?**
Query parameters matching field names: `/products?category=shoes&status=active`. Support operators for ranges/comparisons if needed, e.g., `/products?price[gte]=10&price[lte]=50`.

**42. How do you implement sorting?**
A `sort` query parameter, e.g., `/products?sort=price` (ascending) and `/products?sort=-price` (descending), or `sort=price,-name` for multiple fields.

**43. How do you implement searching?**
A `q` or `search` query parameter for free-text search, e.g., `/products?q=laptop`, often backed by a full-text search index (Elasticsearch, Postgres full-text search) for larger datasets.

**44. How do you implement pagination?**
Common patterns: offset-based (`?page=2&limit=20` or `?offset=40&limit=20`) or cursor-based (`?cursor=abc123&limit=20`). Include metadata like total count, next/prev links in the response.

**45. Offset pagination vs Cursor pagination?**
Offset pagination is simple and allows jumping to any page, but performance degrades on large offsets and results can shift if data changes between requests. Cursor pagination (using a pointer/last-seen ID) is more performant and stable for large, frequently-changing datasets but doesn't support jumping to arbitrary pages.

**46. How do you allow clients to request only specific fields?**
A `fields` query parameter for sparse fieldsets, e.g., `/users?fields=id,name,email`, so the server returns only the requested fields, reducing payload size.

**47. When should query parameters be used instead of path parameters?**
Path parameters identify a specific resource (`/users/123`). Query parameters are for optional modifiers on a collection — filtering, sorting, pagination, searching — things that don't identify a unique resource.

**48. How do you design flexible search endpoints?**
Support combinable filters, sorting, pagination, and field selection via query params for simple cases. For complex queries (many conditions, full-text + filters), consider a dedicated `/search` POST endpoint accepting a structured query body.

# Authentication & Authorization

**49. How do you secure a REST API?**
Use HTTPS, authenticate requests (JWT/OAuth/API keys), authorize per-endpoint (RBAC), validate/sanitize input, rate limit, apply CORS rules, and avoid leaking sensitive data in errors or logs.

**50. JWT vs Session authentication?**
Sessions store state server-side (session ID in a cookie, data in server memory/store) — easy to revoke but harder to scale across servers. JWT is stateless and self-contained (signed token holds claims) — scales easily but harder to revoke before expiry unless you add a blocklist.

**51. Bearer Token vs API Key?**
Bearer tokens (like JWTs) are typically short-lived, tied to a specific user/session, and sent via `Authorization: Bearer <token>`. API keys are usually long-lived, tied to an application/service rather than a user, and used for server-to-server or third-party integration auth.

**52. What is OAuth?**
An authorization framework that lets a third-party application access a user's resources on another service without handling the user's password, using access tokens issued after the user grants consent (e.g., "Login with Google").

**53. How do Refresh Tokens work?**
A refresh token is a long-lived credential used to obtain new short-lived access tokens without requiring the user to log in again. It's stored securely (httpOnly cookie or secure storage) and exchanged at a token endpoint when the access token expires.

**54. Where should JWTs be stored?**
Preferably in an httpOnly, Secure cookie to protect against XSS (JavaScript can't read it). Storing in localStorage is common but vulnerable to XSS; if used, mitigate with strict CSP and input sanitization.

**55. How do you protect sensitive endpoints?**
Require authentication, enforce authorization/role checks, use HTTPS, rate-limit, validate input strictly, and log/audit access. Sensitive actions (payments, password changes) may also need re-authentication or MFA.

**56. What is role-based authorization?**
Access control where permissions are assigned to roles (admin, editor, viewer) rather than individual users, and users are assigned roles. Middleware checks the user's role against required permissions before allowing an action.

# Validation & Error Handling

**57. How do you validate incoming requests?**
Use schema validation libraries (Joi, Zod, class-validator, express-validator) to check types, required fields, formats, and ranges before processing. Validate both syntactically (structure) and semantically (business rules).

**58. How should API errors be structured?**
Consistently, e.g.:
```json
{ "error": { "code": "VALIDATION_ERROR", "message": "Email is required", "details": [...] } }
```
Include a machine-readable code, a human-readable message, and optionally field-level details.

**59. What information should an error response contain?**
An appropriate HTTP status code, an error code/type, a clear message, and (for validation errors) which fields failed and why. Avoid exposing internal implementation details.

**60. Should stack traces be returned to clients?**
No, not in production. Stack traces leak implementation details useful to attackers. Log them server-side; return a generic error message and a reference/trace ID to the client instead.

**61. How do you implement centralized error handling?**
Use a single error-handling middleware (e.g., Express's error-handling middleware with 4 args) that catches errors thrown/passed from anywhere in the app, maps them to consistent HTTP responses, and logs them — instead of handling errors ad hoc in every route.

**62. How do you handle validation errors?**
Return 400 or 422 with a structured list of which fields failed validation and why, caught early via middleware/schema validation before hitting business logic.

# Performance

**63. How do you improve REST API performance?**
Caching (HTTP caching, CDN, Redis), pagination, database indexing and query optimization, compression, connection pooling, async/background processing for heavy work, and horizontal scaling/load balancing.

**64. How do you reduce response payload size?**
Sparse fieldsets (`fields` param), pagination, compression (gzip/brotli), avoiding over-fetching nested data, and using efficient serialization formats.

**65. What is HTTP compression?**
Compressing response bodies (typically gzip or Brotli) before sending them over the wire, negotiated via `Accept-Encoding`/`Content-Encoding` headers, reducing bandwidth and improving load time.

**66. What is response caching?**
Storing a response so subsequent identical requests can be served without recomputation — at the browser, CDN, reverse proxy, or server level — controlled via headers like `Cache-Control` and `ETag`.

**67. What is an ETag?**
A response header that's a hash/version identifier of a resource's content. Clients send it back via `If-None-Match` on subsequent requests; if unchanged, the server returns 304 Not Modified instead of the full body.

**68. What is Cache-Control?**
An HTTP header that specifies caching directives, e.g., `Cache-Control: no-cache`, `max-age=3600`, `private`, `public` — controlling whether/how long a response can be cached by browsers or intermediaries.

**69. What is 304 Not Modified?**
A response telling the client that the cached version of the resource is still valid, so it can reuse its cached copy instead of receiving the body again — saves bandwidth. Triggered via conditional requests (`If-None-Match`, `If-Modified-Since`).

**70. How do you prevent unnecessary database queries?**
Caching (in-memory/Redis), eager/lazy loading appropriately to avoid N+1 queries, indexing, query batching/dataloaders, and denormalizing data where read performance matters more than write simplicity.

# Security

**71. What is CORS?**
Cross-Origin Resource Sharing — a browser security mechanism that restricts web pages from making requests to a different origin than the one that served the page, unless the server explicitly allows it via `Access-Control-Allow-Origin` and related headers.

**72. Why is HTTPS important?**
It encrypts data in transit, preventing eavesdropping, man-in-the-middle attacks, and tampering. Also required for secure cookies, modern browser features, and SEO/trust signals.

**73. What is CSRF?**
Cross-Site Request Forgery — an attack where a malicious site tricks an authenticated user's browser into making unwanted requests to another site where they're logged in (exploiting automatically-sent cookies). Mitigated with CSRF tokens, SameSite cookies, and checking origin/referer headers.

**74. What is XSS?**
Cross-Site Scripting — injecting malicious scripts into a web page viewed by other users, typically via unsanitized user input rendered in HTML. Mitigated by output encoding, input sanitization, and Content Security Policy.

**75. What is SQL Injection?**
An attack where malicious SQL is inserted into a query via unsanitized user input, potentially exposing or corrupting data. Prevented using parameterized queries/prepared statements and ORM query builders instead of string concatenation.

**76. How do you prevent brute-force attacks?**
Rate limiting/throttling login attempts, account lockout or exponential backoff after repeated failures, CAPTCHA, and multi-factor authentication.

**77. How do you implement rate limiting?**
Track requests per client (by IP, API key, or user ID) using a sliding window/token bucket algorithm, often backed by Redis for distributed systems. Return 429 with a `Retry-After` header when the limit is exceeded.

**78. How do you protect file upload endpoints?**
Validate file type/size, scan for malware, restrict allowed extensions, store outside the web root (or in object storage like S3), rename files to avoid path traversal, and set strict permissions on uploaded content.

# Practical Backend

**79. How do you structure REST APIs in Express.js?**
Typically: `routes/` (define endpoints), `controllers/` (handle req/res, call services), `services/` (business logic), `repositories/` or `models/` (data access), `middleware/` (auth, validation, error handling), and a central `app.js`/`server.js` wiring it together.

**80. How do you organize controllers, services, and repositories?**
Controllers handle HTTP concerns only (parsing request, calling service, formatting response). Services contain business logic, independent of HTTP. Repositories handle data access/persistence, abstracting the database. This layering improves testability and separation of concerns.

**81. What middleware do you commonly use?**
Body parsing (`express.json()`), CORS, authentication/authorization, request logging (morgan), rate limiting, input validation, compression, and centralized error handling.

**82. How do you log API requests?**
Middleware (e.g., morgan, pino, winston) that logs method, path, status code, response time, and request ID for every request — sent to console in dev and to a centralized logging system (ELK, Datadog, CloudWatch) in production.

**83. How do you document APIs?**
Using OpenAPI/Swagger specs (generated or hand-written), which describe endpoints, parameters, request/response schemas, and auth — often rendered as interactive docs (Swagger UI, Redoc). Postman collections are also common.

**84. Have you used Swagger/OpenAPI?**
(Personal/experience question — frame your answer around: defining schemas, generating interactive docs, using it for contract-first design, or generating client SDKs from the spec.)

**85. How do you test REST APIs?**
Unit tests for business logic, integration tests hitting actual endpoints (Supertest, Postman/Newman), contract tests against the OpenAPI spec, and manual/exploratory testing with tools like Postman or Insomnia. Include tests for success cases, validation errors, and auth failures.

# Advanced

**86. REST vs GraphQL?**
REST exposes fixed endpoints per resource, often causing over-fetching/under-fetching. GraphQL exposes a single endpoint where clients specify exactly the data they need in one query, reducing round trips but adding complexity (query cost analysis, caching is harder since it's not URL-based).

**87. REST vs gRPC?**
REST typically uses JSON over HTTP/1.1, human-readable, widely supported by browsers. gRPC uses Protocol Buffers over HTTP/2, is faster/more compact, supports streaming, but is less browser-friendly and less human-readable — better suited for internal service-to-service communication.

**88. REST vs WebSockets?**
REST is request-response, stateless, client-initiated. WebSockets provide a persistent, full-duplex connection allowing the server to push data to the client in real time — better for chat, live notifications, or streaming use cases than repeated REST polling.

**89. When would REST not be the best choice?**
Real-time bidirectional communication (use WebSockets), highly flexible/nested data-fetching needs (GraphQL), high-performance internal microservice communication (gRPC), or simple event-driven pipelines (message queues).

**90. How do you design APIs for high traffic?**
Horizontal scaling with load balancers, caching at multiple layers (CDN, Redis, HTTP cache headers), database read replicas/sharding, async processing for heavy operations, rate limiting, and stateless services so any instance can handle any request.

**91. How do you ensure backward compatibility?**
Version the API, avoid removing/renaming fields in existing versions, add new fields as optional, deprecate gradually with warnings before removal, and maintain old versions for a defined support window.

**92. How do you handle long-running operations?**
Return 202 Accepted immediately with a reference to the job/task, then let clients poll a status endpoint (`/jobs/123`) or use webhooks/callbacks to notify completion, rather than holding the HTTP connection open.

**93. How do you implement idempotency in payment APIs?**
Require clients to send a unique `Idempotency-Key` header per request. The server stores the result of the first request with that key and returns the same result for retries with the same key, preventing duplicate charges.

**94. How do you avoid breaking existing clients?**
Version your API, never change existing response shapes/types in place, add fields rather than removing them, use feature flags/gradual rollouts, and maintain deprecation notices with ample lead time before removing anything.

**95. How would you redesign a poorly designed REST API?**
Audit current usage, introduce a new versioned API alongside the old one (don't break existing consumers), fix naming/status codes/error structures, add proper pagination/filtering/docs, then migrate clients gradually and deprecate the old version on a timeline.

**96. How would you handle API deprecation?**
Announce early, mark deprecated endpoints clearly (docs + `Deprecation`/`Sunset` headers), provide a migration guide, give a reasonable timeline, monitor usage of the old endpoint, and communicate directly with high-usage consumers before shutting it down.

**97. How do you implement optimistic concurrency?**
Include a version number or ETag with each resource. When updating, the client sends back the version it read; the server rejects the update (409 Conflict) if the current version doesn't match, meaning someone else modified it first.

**98. How do you make REST APIs scalable?**
Keep services stateless, cache aggressively, use load balancers and horizontal scaling, optimize database access (indexing, read replicas, connection pooling), offload heavy work to background jobs/queues, and design for idempotency to make retries safe.

**99. How do you monitor API performance in production?**
Track metrics like request rate, latency (p50/p95/p99), error rate, and status code distribution using tools like Prometheus/Grafana, Datadog, or New Relic. Set up alerting on anomalies, distributed tracing for request flows, and structured logging for debugging.

**100. If you were designing a REST API from scratch today, what best practices would you follow?**
Resource-based, consistent naming; proper HTTP verbs and status codes; versioning from day one; strong input validation and consistent error format; pagination/filtering/sorting on collections; authentication + role-based authorization; rate limiting; HTTPS everywhere; caching where appropriate; OpenAPI documentation; idempotency for critical operations; and designing with backward compatibility and observability in mind from the start.

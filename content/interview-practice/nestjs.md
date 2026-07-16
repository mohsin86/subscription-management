# NestJS Interview PrepNestJS Basics

**1\. What is NestJS?**

A backend framework built on top of Node.js (using Express or Fastify under the hood) for building scalable server-side apps. It's written in and fully supports TypeScript, and borrows a lot of its structure — modules, decorators, dependency injection — straight from Angular.

**2\. Who developed NestJS, and why?**

Created by Kamil Myśliwiec, a Polish software engineer. Node.js/Express apps at the time had no enforced structure — everyone organized things differently — so he built Nest to bring the kind of opinionated, modular architecture Angular has on the frontend to the backend.

**3\. When was NestJS first released?**

October 2016.

**4\. How do you install NestJS and set up a new project?**

npm i -g @nestjs/cli

nest new project-name

From there, nest generate module users (or the shorthand nest g resource users) scaffolds a controller, service, module, and DTOs for a resource in one go.

**5\. What's the difference between NestJS and Angular?**

Angular is a frontend framework for building client-side UIs — components, templates, browser-side routing. NestJS is a backend framework for server-side APIs — controllers, services, no rendering. They share the same architectural DNA (modules, decorators, DI) because Nest was deliberately modeled after Angular, but they solve completely different problems.

**6\. Can you use other languages like C++, Ruby, or Python with NestJS?**

Not directly — NestJS runs on the Node.js runtime, so it only executes JavaScript/TypeScript. What you can do is run a separate service written in Python or Ruby and have it talk to your NestJS app over HTTP, gRPC, or a message queue — a normal microservices pattern.

**7\. What are the main components of a NestJS application?**

Modules (organize the app into cohesive feature blocks), controllers (handle incoming requests and routing), providers/services (hold business logic, injected via DI), and supporting pieces like pipes, guards, interceptors, and middleware for cross-cutting concerns.

**8\. How do you declare a class as a controller in NestJS?**

The @Controller() decorator, optionally with a route prefix.

@Controller('users')

export class UsersController {

@Get()

findAll() { return \[\]; }

}

**9\. How do you use decorators in a NestJS controller?**

Decorators mark methods/params with metadata Nest reads at runtime — @Get()/@Post() for HTTP methods, @Param()/@Query()/@Body() to extract request data.

@Get(':id')

findOne(@Param('id') id: string) { return \`user ${id}\`; }

**10\. How do you use route parameters in a NestJS controller?**

@Param() pulls a value out of the URL path.

@Get(':id')

findOne(@Param('id') id: string) { return this.usersService.findOne(id); }

**11\. What is the role of the \`@Body()\` decorator?**

Extracts the parsed request body (typically JSON) and injects it into the handler's parameter — usually typed against a DTO class so you get validation and type safety.

@Post()

create(@Body() dto: CreateUserDto) { return this.usersService.create(dto); }

**12\. What is an interceptor in NestJS?**

A class that wraps around a request/response, letting you run logic before and after a handler executes — used for things like logging, transforming the response shape, caching, or timing how long a request took.

@Injectable()

export class LoggingInterceptor implements NestInterceptor {

intercept(context: ExecutionContext, next: CallHandler) {

console.log('Before...');

return next.handle().pipe(tap(() => console.log('After...')));

}

}

**13\. What are pipes in NestJS?**

Classes that transform or validate incoming data before it reaches a route handler — e.g. ParseIntPipe converts a string param to a number, ValidationPipe checks a DTO against its decorators and rejects the request if it fails.

@Get(':id')

findOne(@Param('id', ParseIntPipe) id: number) { ... }

**14\. What are guards in NestJS?**

Classes that decide whether a given request is allowed to proceed, based on conditions like authentication or role — implemented via canActivate(), returning true/false. Commonly used for auth checks (@UseGuards(AuthGuard)).

**15\. What are middlewares in NestJS?**

Functions that run before the route handler, with access to the raw request/response — same concept as Express middleware, used for things like logging or attaching data to the request early. Unlike guards/interceptors, middleware has no idea which specific handler will run.

**16\. Explain Dependency Injection in NestJS. How does it help build modular, testable apps?**

Instead of a class creating its own dependencies (like new UsersService()), Nest's IoC container creates and injects them automatically based on the constructor's type hints. This decouples classes from how their dependencies are built, makes swapping implementations easy, and makes testing simple — you just inject a mock service instead of the real one.

@Injectable()

export class UsersController {

constructor(private usersService: UsersService) {}

}

**17\. What's the difference between \`@Injectable()\` and \`@Inject()\`?**

@Injectable() marks a class as something Nest's DI container can manage and provide — it goes on the class being injected. @Inject() is used when you need to manually specify what to inject (like injecting by a custom token or string, rather than relying on automatic type-based resolution).

**18\. How does the Nest logger differ from \`console.log()\`?**

Nest's built-in Logger gives you structured, leveled output (log, warn, error, debug) with consistent formatting including context/timestamps, and it can be swapped out for a custom logger (like Winston or Pino) app-wide without changing every call site. console.log is fine for quick debugging, but you don't want it scattered through production code.

**19\. What is the difference between interceptors and middleware?**

Middleware runs earliest, before routing has even resolved which controller/handler will run, and only has the raw req/res. Interceptors run after routing (so they know the exact handler and its metadata) and can wrap around the handler's execution — modifying both the incoming call and the outgoing response, which middleware alone can't easily do.

**20\. What testing frameworks work best with NestJS?**

Jest is the default and works out of the box with a fresh Nest project — Nest even provides a Test module (@nestjs/testing) for building a testing module with mocked providers, making it easy to unit test services/controllers in isolation.

**21\. Explain the purpose of DTOs in NestJS.**

Data Transfer Objects define the exact shape of data coming in/out of your API — usually a class with class-validator decorators. They give you a single source of truth for what a request body should look like, and combined with ValidationPipe, they auto-reject malformed requests before your business logic even runs.

class CreateUserDto {

@IsString() name: string;

@IsEmail() email: string;

}

**22\. How do you handle asynchronous operations in NestJS, and what's the role of Promises?**

Just standard async/await — Nest handlers can be async and return a Promise, and Nest automatically waits for it to resolve before sending the response. This is what lets you cleanly do things like DB queries or external API calls inside a controller/service without manually managing callbacks.

@Get()

async findAll() { return await this.usersService.findAll(); }

**23\. Explain the purpose of the \`@InjectRepository()\` decorator.**

Used with TypeORM — injects a specific entity's repository (the object you use to query/save that entity) into a service's constructor, so you can call things like .find() or .save() without manually wiring up the database connection each time.

constructor(@InjectRepository(User) private userRepo: Repository&lt;User&gt;) {}

**24\. Explain the purpose of the \`@nestjs/jwt\` package.**

A wrapper around signing and verifying JSON Web Tokens — provides a JwtService with sign() and verify() methods, so you don't have to hand-roll token creation/validation logic; commonly paired with Passport's JWT strategy for auth.

**25\. How are tokens used for authorization in an API? Authentication vs authorization?**

Authentication confirms who the user is (login, verifying credentials); authorization decides what that authenticated user is allowed to do. In token-based APIs, after authenticating once, the server issues a JWT the client sends on every request — the server verifies its signature to confirm identity, then checks the user's role/permissions (often embedded in the token) to authorize specific actions.

**26\. Why is token expiration important? How do refresh tokens fit in?**

A token that never expires is a permanent credential if stolen — expiration limits the damage window. Short-lived access tokens handle regular requests; a longer-lived refresh token (stored more securely) is used solely to request a new access token once the old one expires, without forcing the user to log in again.

**27\. Describe the mechanism for a token refresh in NestJS.**

The client holds an access token and a refresh token. When the access token expires (API returns 401), the client calls a refresh endpoint with the refresh token; the server verifies it, and if valid, issues a new access token (and often a new refresh token, rotating it). This is usually implemented with a dedicated /auth/refresh route protected by a separate refresh-token guard/strategy.

**28\. How does NestJS support authentication and authorization?**

Mainly through @nestjs/passport (integrating Passport.js strategies like local, JWT, OAuth) combined with Guards — an AuthGuard runs a strategy to authenticate the request, and custom guards (checking roles/permissions) handle authorization afterward.

**29\. Difference between Provider and Service in NestJS — can a provider exist without \`@Injectable()\`?**

"Service" is really just a naming convention for a common kind of provider that holds business logic — in Nest's DI system, both are just "providers." Providers usually need @Injectable() so Nest's DI container can manage them, but you can register a plain value or factory function as a provider in a module without decorating a class at all.

{ provide: 'CONFIG', useValue: { apiKey: '123' } }

**30\. What are custom providers, and how do they differ from standard providers?**

Standard providers are just classes decorated with @Injectable(). Custom providers let you control exactly what gets injected for a given token — via useValue (a plain value), useClass (swap in a different implementation), or useFactory (a function that builds the value, often using other injected dependencies).

{ provide: 'API_KEY', useFactory: (config: ConfigService) => config.get('KEY'), inject: \[ConfigService\] }

**31\. How do you generate API docs with Swagger in NestJS?**

The @nestjs/swagger package introspects your controllers/DTOs (via decorators) to auto-generate an OpenAPI spec and interactive UI.

const config = new DocumentBuilder().setTitle('API').build();

const document = SwaggerModule.createDocument(app, config);

SwaggerModule.setup('api', app, document);

Good docs matter because they let frontend/consumer teams explore and test your API without reading source code or pinging you for every field name.

**32\. Explain \`@ApiProperty()\` and \`@ApiOperation()\` from \`@nestjs/swagger\`.**

@ApiProperty() documents a DTO field (type, example, required/optional) so it shows up correctly in the generated Swagger UI. @ApiOperation() documents a route handler itself — a summary/description of what that endpoint does.

class CreateUserDto {

@ApiProperty({ example: 'John' }) name: string;

}

**33\. Explain the purpose of a Dockerfile in a NestJS app.**

Defines the steps to build a container image for the app — install dependencies, copy source, build the TypeScript, and specify the start command. It guarantees the app runs the same way regardless of the host machine, which is the whole point of containerization.

FROM node:20

WORKDIR /app

COPY . .

RUN npm install && npm run build

CMD \["node", "dist/main"\]

**34\. How do you use Docker Compose with NestJS?**

docker-compose.yml defines multiple services (your Nest app, a Postgres/Mongo container, Redis, etc.) that run together as one stack, with defined networking between them — so your app can reach db:5432 by service name instead of hardcoding IPs, and you spin the whole stack up with one docker-compose up.

**35\. What is \`@nestjs/passport\`, and how does it facilitate authentication?**

A wrapper integrating the Passport.js authentication middleware ecosystem into Nest's module/guard system. You implement a strategy (e.g. JwtStrategy extending PassportStrategy), and then protect routes simply with @UseGuards(AuthGuard('jwt')), without wiring Passport's raw middleware yourself.

**36\. How do you handle file uploads in NestJS? What's Multer's role?**

@nestjs/platform-express wraps Multer (Express's file-upload middleware) via the FileInterceptor.

@Post('upload')

@UseInterceptors(FileInterceptor('file'))

uploadFile(@UploadedFile() file: Express.Multer.File) { return file.originalname; }

Multer handles parsing the multipart form data and gives you the file as a buffer or saved-to-disk reference.

**37\. How does NestJS handle database interactions, and what databases are supported?**

Nest doesn't dictate a specific ORM — it has first-class integration modules for TypeORM, Mongoose (MongoDB), Sequelize, and Prisma, so it works with both SQL databases (Postgres, MySQL, SQLite) and NoSQL (MongoDB). You typically inject a repository/model into a service and query through that, rather than writing raw driver calls.

**38\. What is a circular dependency in NestJS, and how do you fix it?**

When Module/Service A depends on B, and B depends back on A (directly or through a chain), Nest can't resolve which to instantiate first. Fix it with forwardRef(() => ModuleB) on both sides of the circular reference, or better, refactor the shared logic into a third module both can depend on without needing each other.

**39\. How do you handle errors in NestJS?**

Throw one of Nest's built-in HTTP exceptions (NotFoundException, BadRequestException, etc.) and Nest automatically converts it into the right HTTP response. For custom formatting or logging across the whole app, implement an Exception Filter with @Catch().

@Catch(HttpException)

export class HttpExceptionFilter implements ExceptionFilter {

catch(exception: HttpException, host: ArgumentsHost) { ... }

}

**40\. How does NestJS handle CORS?**

Enable it with one call in main.ts, optionally restricting it to specific origins/methods rather than allowing everything.

app.enableCors({ origin: 'https://example.com' });

**41\. Explain the purpose of \`ExecutionContext\` in NestJS middleware.**

Technically ExecutionContext isn't available in plain middleware (it's an Express-style req/res/next function) — it's available in guards, interceptors, and exception filters, giving you access to the underlying request plus metadata about which controller/handler is about to run, so you can make context-aware decisions.

**42\. How do you implement soft deletes in NestJS with TypeORM?**

Add a @DeleteDateColumn() to the entity, then use .softRemove()/.softDelete() instead of .remove()/.delete() — TypeORM sets the deletion timestamp instead of actually removing the row, and normal queries automatically exclude soft-deleted rows.

@DeleteDateColumn() deletedAt: Date;

Preferred over hard deletes when you need an audit trail, want to support "undo," or have other data referencing that row.

**43\. Explain environment variables in NestJS and how they're used for configuration.**

@nestjs/config loads variables from a .env file (via dotenv) into a ConfigService you inject anywhere, instead of scattering process.env.X throughout the codebase — keeping secrets and environment-specific values (DB URLs, API keys) out of source code.

ConfigModule.forRoot();

constructor(private config: ConfigService) {

const dbUrl = this.config.get('DATABASE_URL');

}

**44\. What is the role of migration scripts in TypeORM, and how do you create/run them?**

Migrations are version-controlled, incremental changes to your database schema (adding a column, creating a table) — they let a team apply the exact same schema changes in the same order across dev, staging, and production instead of relying on synchronize: true (which is unsafe outside local dev).

npm run typeorm migration:generate -- -n AddUserTable

npm run typeorm migration:run

**45\. What is the purpose of \`ExecutionContext\` in NestJS?**

Same as Q41 — an abstraction available in guards/interceptors/filters giving access to the current request plus metadata (which class and handler are about to execute), letting you write logic that works across HTTP, WebSocket, or RPC contexts uniformly.

**46\. What is the purpose of the \`@Res()\` decorator in NestJS controllers?**

Gives direct access to the underlying platform's response object (Express/Fastify) so you can manually control the response — but using it means you take over the response lifecycle yourself (Nest won't auto-serialize a returned value anymore unless you pass { passthrough: true }). Generally avoided unless you need something Nest's standard return-value handling doesn't support, like streaming a file.

**47\. Explain the various types of Modules in NestJS.**

The root AppModule bootstraps the whole app. Feature modules (UsersModule, AuthModule) group related controllers/providers for one domain area. Shared modules export providers so multiple other modules can reuse them. Global modules (@Global()) are available everywhere without being explicitly imported — useful for things like a config module.

**48\. How can you secure your NestJS application?**

Validate all input with DTOs + ValidationPipe, use guards for auth/authorization on every protected route, set security headers with Helmet, enable and restrict CORS properly, rate-limit endpoints (@nestjs/throttler), keep secrets in environment variables (never hardcoded), and keep dependencies updated.

**49\. What is the entry file of a NestJS application?**

main.ts — it bootstraps the app by creating the Nest application instance from the root module and starting the HTTP listener.

async function bootstrap() {

const app = await NestFactory.create(AppModule);

await app.listen(3000);

}

bootstrap();

**50\. What's the difference between Dependency Injection and Inversion of Control?**

IoC is the broader principle — control over object creation/wiring is handed off from your code to a framework/container, instead of your code constructing everything itself. Dependency Injection is one specific technique for achieving IoC — the container injects a class's dependencies into it (usually via the constructor) rather than the class instantiating them itself.

**51\. How do you implement caching in NestJS?**

The built-in CacheModule (backed by an in-memory store by default, or Redis for production) lets you cache responses or manually cache/retrieve values.

@Injectable()

export class UsersService {

constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

}

Or slap @CacheKey()/@CacheTTL() plus the CacheInterceptor on a route to cache its whole response automatically.

**52\. Explain the Dependency Inversion Principle in the context of NestJS.**

High-level modules shouldn't depend directly on low-level implementation details — both should depend on an abstraction. In Nest, this shows up as coding against an interface/token rather than a concrete class, and using custom providers to supply whichever concrete implementation you want at runtime — e.g. a service depends on an abstract NotificationService interface, and you can swap in an email or SMS implementation without changing the consumer.

**53\. How can you schedule tasks in NestJS?**

The @nestjs/schedule package — decorate a method with @Cron() for cron-style schedules, or @Interval()/@Timeout() for simpler recurring/delayed jobs.

@Cron('0 0 \* \* \*')

handleMidnightJob() { /\* runs daily at midnight \*/ }

**54\. How do you handle database transactions in NestJS, and why do they matter?**

With TypeORM, wrap multiple related operations in a QueryRunner transaction so they all succeed or all roll back together — critical when several writes must stay consistent (like debiting one account and crediting another; you never want just one half to happen).

await queryRunner.startTransaction();

try {

await queryRunner.manager.save(...);

await queryRunner.commitTransaction();

} catch (e) {

await queryRunner.rollbackTransaction();

}

**55\. How do you implement versioning in NestJS APIs?**

Nest has built-in support for URI versioning (/v1/users), header versioning, or media-type versioning — enabled globally, then applied per-controller/route with a version option.

app.enableVersioning({ type: VersioningType.URI });

@Controller({ path: 'users', version: '1' })

**56\. Explain \`@Resolver()\` and \`@Scalar()\` from \`@nestjs/graphql\`.**

@Resolver() marks a class as handling GraphQL queries/mutations/field resolution for a specific type — the GraphQL equivalent of a controller. @Scalar() lets you define a custom scalar type (like DateTime or JSON) beyond GraphQL's built-in primitives, with your own serialize/parse logic.

**57\. Explain Serialization and Deserialization in NestJS.**

Serialization controls what shape of data actually goes out in the response — Nest's ClassSerializerInterceptor combined with @Exclude()/@Expose() on an entity lets you strip sensitive fields (like a password hash) before sending it to the client. Deserialization is the reverse — turning incoming raw JSON into a typed class instance (a DTO), which is what makes class-validator decorators work on it.

**58\. Explain NestJS middleware in a Microservices context.**

In an HTTP-based microservice, middleware still works the same way — running before the route handler for things like logging or request tagging. A common scenario: attaching a correlation/trace ID to every incoming request in a gateway service, so that ID can be passed along to downstream microservices and used to trace a single request across all of them in logs.

**59\. Explain tight vs loose coupling, and how NestJS modules help achieve loose coupling.**

Tight coupling means a class directly depends on a concrete implementation and breaks if that implementation changes. Loose coupling means it depends on an abstraction, so implementations can be swapped freely. NestJS modules encourage this by encapsulating providers and exposing only what's explicitly exported — combined with DI against interfaces/tokens rather than concrete classes, modules can be swapped, mocked, or reused without other modules needing to know the implementation details.

**60\. How does NestJS support Server-Sent Events (SSE)? What are its advantages?**

A controller method can return an Observable decorated with @Sse(), and Nest streams each emitted value to the client as an SSE message over a single long-lived HTTP connection.

@Sse('events')

sse(): Observable&lt;MessageEvent&gt; {

return interval(1000).pipe(map((i) => ({ data: { count: i } })));

}

SSE is simpler than WebSockets when you only need one-way server-to-client updates (like live notifications or progress updates) — it runs over plain HTTP, auto-reconnects natively in the browser, and doesn't need a separate protocol/handshake.
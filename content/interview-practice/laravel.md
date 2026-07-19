# Core Concepts (1–50)

**1. What is Laravel?**
A free, open-source PHP web framework following the MVC pattern, known for expressive syntax, built-in tools for routing, ORM (Eloquent), authentication, caching, queues, and testing.

**2. What are the main features of Laravel?**
Eloquent ORM, Artisan CLI, Blade templating, routing, middleware, migrations/seeders, queues, events/listeners, task scheduling, built-in auth (Sanctum/Passport), and a rich ecosystem (Forge, Vapor, Nova).

**3. Explain the MVC architecture in Laravel.**
Model handles data/business logic (Eloquent models), View renders the UI (Blade templates), Controller receives requests, coordinates between Model and View, and returns a response.

**4. What is Artisan?**
Laravel's command-line interface for common tasks — generating boilerplate (`make:controller`, `make:model`), running migrations, clearing caches, queue workers, and custom commands.

**5. How do you create a new Laravel project?**
`composer create-project laravel/laravel project-name` or `laravel new project-name` using the Laravel installer.

**6. What is routing in Laravel?**
Mapping URIs to controller actions or closures, defined in `routes/web.php` (web) and `routes/api.php` (API), e.g. `Route::get('/users', [UserController::class, 'index']);`.

**7. Difference between web.php and api.php routes?**
`web.php` routes go through the `web` middleware group (sessions, CSRF protection, cookie encryption) and are for browser-based apps. `api.php` routes go through the `api` middleware group (typically stateless, rate limiting, no CSRF) and are prefixed with `/api` for stateless API consumption.

**8. What is middleware in Laravel?**
Code that runs before/after an HTTP request is handled, used for filtering requests — e.g., authentication checks, logging, CORS. Registered in `app/Http/Kernel.php` and applied via routes or controllers.

**9. How do you create custom middleware?**
`php artisan make:middleware CheckAge`, implement the `handle()` method, then register it in the kernel (global, group, or route-specific) and apply via `Route::middleware('checkage')`.

**10. What is Eloquent ORM?**
Laravel's built-in ActiveRecord-style ORM that lets you interact with database tables using PHP model classes instead of raw SQL, e.g., `User::where('active', 1)->get()`.

**11. What is a Model in Laravel?**
A class representing a database table, extending `Illuminate\Database\Eloquent\Model`, providing methods to query, insert, update, and delete records, plus relationships, accessors/mutators, and events.

**12. How do you define relationships in Eloquent?**
Methods on the model: `hasOne`, `hasMany`, `belongsTo`, `belongsToMany`, `hasManyThrough`, and polymorphic relations (`morphTo`, `morphMany`). E.g., `public function posts() { return $this->hasMany(Post::class); }`.

**13. Explain hasOne, hasMany, belongsTo, and belongsToMany.**
`hasOne`: one-to-one (User hasOne Profile). `hasMany`: one-to-many (User hasMany Posts). `belongsTo`: inverse of hasOne/hasMany (Post belongsTo User). `belongsToMany`: many-to-many via a pivot table (User belongsToMany Roles).

**14. What is a pivot table?**
An intermediate table used to join two models in a many-to-many relationship (e.g., `role_user` linking `users` and `roles`), accessed via `belongsToMany` and the `pivot` attribute on results.

**15. What are Eloquent accessors and mutators?**
Accessors transform an attribute's value when retrieved (`getNameAttribute` or `protected function name(): Attribute` in newer Laravel). Mutators transform it before saving (`setNameAttribute`). Used for formatting, encryption, casting, etc.

**16. What are migrations?**
Version-controlled PHP files describing schema changes (create/alter tables), run via `php artisan migrate`, allowing teams to keep database structure in sync across environments.

**17. How do you create and run a migration?**
`php artisan make:migration create_posts_table`, define the schema in the `up()`/`down()` methods using the Schema builder, then run `php artisan migrate` (or `migrate:rollback` to undo).

**18. What are seeders and factories?**
Seeders populate the database with initial/test data (`php artisan db:seed`). Factories define blueprints for generating fake model data (using Faker), often used in seeders and tests: `User::factory()->count(10)->create()`.

**19. What is Blade?**
Laravel's templating engine — compiles to plain PHP, supports directives like `@if`, `@foreach`, `@extends`, `@section`, layout inheritance, and component-based templating (`<x-component>`).

**20. How does Blade differ from plain PHP templates?**
Blade offers cleaner syntax, template inheritance (`@extends`/`@section`/`@yield`), automatic output escaping (`{{ }}`), reusable components/slots, and is compiled and cached for performance — while still allowing raw PHP when needed.

**21. What is Composer's role in Laravel?**
Laravel's dependency manager — installs and autoloads packages (via `composer.json`), manages the framework itself and third-party libraries, and generates the autoloader (`vendor/autoload.php`).

**22. What is the service container in Laravel?**
A powerful IoC (Inversion of Control) container that manages class dependencies and performs dependency injection, resolving classes automatically based on type hints, e.g., in controller constructors.

**23. What are service providers?**
Central places where the app's services/bindings are registered and bootstrapped (in `app/Providers`) — e.g., binding interfaces to implementations, registering event listeners, or configuring packages. Every Laravel app boots through its providers.

**24. What is dependency injection in Laravel?**
Automatically resolving and injecting a class's dependencies (e.g., another class or interface) via constructor or method type-hinting, rather than manually instantiating them — handled by the service container.

**25. What are Facades?**
Static-like interfaces to classes bound in the service container (e.g., `Cache::get()`, `Route::get()`), providing a simple, expressive syntax while still being testable and swappable under the hood.

**26. What is the difference between Facades and Dependency Injection?**
Facades provide convenient static-style access resolved from the container at call time; DI explicitly passes dependencies into a class's constructor/methods. DI is generally preferred for testability, but facades are more concise and are themselves testable via `Facade::shouldReceive()`.

**27. What are Laravel events and listeners?**
A pub/sub pattern: events represent something that happened (e.g., `OrderShipped`), listeners react to them (send email, log activity). Decouples side effects from core logic. Defined/registered in `EventServiceProvider` or auto-discovered.

**28. What are Jobs and Queues in Laravel?**
Jobs represent units of work that can be dispatched to run asynchronously (e.g., sending emails, processing uploads). Queues (backed by database, Redis, SQS, etc.) hold jobs for background workers (`php artisan queue:work`) to process, improving response times for heavy tasks.

**29. How do you dispatch a job in Laravel?**
`php artisan make:job ProcessPodcast`, implement the `handle()` method, then dispatch with `ProcessPodcast::dispatch($podcast);` (optionally `->onQueue()`, `->delay()`).

**30. What is task scheduling in Laravel?**
Defining recurring tasks (cron jobs) in code via the `Schedule` facade/class (e.g., `Schedule::command('emails:send')->daily();`), with a single cron entry (`* * * * * php artisan schedule:run`) driving all scheduled tasks.

**31. What is the difference between `session()` and `cache()`?**
Sessions store per-user data across requests (tied to a session ID/cookie), typically for authentication state or flash messages. Cache stores arbitrary data (often shared across users) to avoid recomputation/expensive queries, with configurable TTL.

**32. How does Laravel handle validation?**
Via the `validate()` method on requests, Form Request classes (`php artisan make:request`), or the `Validator` facade — defining rules per field (`required`, `email`, `unique:users`, etc.) and automatically redirecting/returning errors on failure.

**33. What are Form Requests?**
Dedicated classes (`php artisan make:request StoreUserRequest`) encapsulating validation rules and authorization logic for a specific request, keeping controllers clean. Injected via type-hint into controller methods.

**34. What is CSRF protection in Laravel?**
Laravel automatically generates a CSRF token per user session and verifies it on state-changing requests (POST/PUT/PATCH/DELETE) via the `VerifyCsrfToken` middleware, protecting against cross-site request forgery. Blade forms include `@csrf` to embed the token.

**35. How does Laravel handle authentication?**
Via the `auth` package/scaffolding (Breeze, Jetstream, Fortify), session-based guards for web, and token-based auth (Sanctum for SPA/mobile, Passport for full OAuth2) for APIs. Guards and providers are configured in `config/auth.php`.

**36. What is Laravel Sanctum?**
A lightweight authentication package for SPAs, mobile apps, and simple token-based APIs — issues personal access tokens or uses cookie-based session auth for first-party SPAs, without the complexity of full OAuth2.

**37. What is Laravel Passport?**
A full OAuth2 server implementation for Laravel, used when you need complete OAuth2 features (authorization codes, client credentials, scopes) — typically for APIs consumed by third-party applications.

**38. What is the difference between Sanctum and Passport?**
Sanctum is simpler, ideal for first-party SPAs/mobile apps and basic API tokens. Passport implements full OAuth2 with scopes and multiple grant types, suited for APIs granting access to third-party applications.

**39. What are Laravel Policies and Gates?**
Authorization mechanisms. Gates are simple closures for authorization checks (`Gate::define('edit-post', ...)`). Policies are classes organizing authorization logic per model (e.g., `PostPolicy` with `update($user, $post)`), used via `$this->authorize()` or `@can` in Blade.

**40. How do you implement soft deletes?**
Add the `SoftDeletes` trait to the model and a `deleted_at` nullable timestamp column via migration. Deleting sets `deleted_at` instead of removing the row; queries automatically exclude soft-deleted records unless `withTrashed()` is used.

**41. What are Laravel Collections?**
A fluent, convenient wrapper around arrays returned by Eloquent queries (and usable standalone), providing chainable methods like `map`, `filter`, `reduce`, `pluck`, `groupBy` for expressive data manipulation.

**42. What is route model binding?**
Automatically injecting a model instance into a route/controller based on a route parameter, e.g., `Route::get('/users/{user}', ...)` resolves `{user}` to a `User` model by ID automatically, instead of manually querying it.

**43. What are API Resources in Laravel?**
Classes (`php artisan make:resource UserResource`) that transform Eloquent models/collections into JSON structures for API responses, giving control over which fields/format are exposed, decoupling internal model structure from the API contract.

**44. How do you handle exceptions in Laravel?**
Centrally in `app/Exceptions/Handler.php` (or `bootstrap/app.php` in Laravel 11+), where you can customize how specific exceptions are rendered/reported — e.g., returning JSON error responses for API routes.

**45. What is the difference between `find()`, `first()`, and `get()`?**
`find($id)` retrieves a single model by primary key. `first()` retrieves the first matching record from a query. `get()` retrieves all matching records as a Collection.

**46. What is N+1 query problem and how do you solve it in Laravel?**
Occurs when a query triggers one additional query per related record (e.g., looping over posts and accessing `->author` triggers a query each time). Solved with eager loading: `Post::with('author')->get()` loads the relation in one extra query instead of N.

**47. What is the difference between `with()` and `load()`?**
`with()` eager-loads relationships as part of the initial query (`Post::with('comments')->get()`). `load()` lazy-eager-loads relationships on an already-retrieved model/collection (`$posts->load('comments')`), useful when you didn't originally eager load.

**48. How do you write raw SQL queries in Laravel?**
Via the `DB` facade: `DB::select(...)`, `DB::insert(...)`, `DB::update(...)`, `DB::delete(...)`, or `DB::statement(...)` for raw queries, with parameter binding to prevent SQL injection.

**49. How do you test in Laravel?**
Using PHPUnit or Pest, with feature tests (HTTP requests through the app, e.g., `$this->get('/users')->assertStatus(200)`) and unit tests (isolated class logic). Laravel provides testing helpers, database refresh traits (`RefreshDatabase`), and factories for test data.

**50. What is the difference between `env()` and `config()`?**
`env()` reads directly from the `.env` file (only reliable outside of cached config, and mainly meant for use inside config files). `config()` reads from the cached, compiled configuration files in `config/`, which is faster and the correct way to access settings in application code — always use `config()`, never `env()`, outside of config files.

# Advanced & Practical (51–100)

**51. What is the Laravel request lifecycle?**
A request enters through `public/index.php` → bootstraps the app via `bootstrap/app.php` → the HTTP kernel runs global middleware → the router matches the route and runs route/group middleware → the controller/closure handles it → a response is generated → response middleware runs → the response is sent back to the browser.

**52. What are Laravel contracts?**
Interfaces defined by the framework (in `Illuminate\Contracts`) representing core framework services (e.g., `Illuminate\Contracts\Queue\Queue`). Coding against contracts instead of concrete classes decouples your code and makes it easier to swap implementations.

**53. What is the difference between a Contract and a Facade?**
A contract is an interface you can type-hint for explicit dependency injection (fully testable, swappable). A facade is a static-style proxy to a container-bound class, more convenient but slightly more "magic." Contracts favor explicit DI; facades favor terse syntax — both are equally testable.

**54. What is a Repository pattern and does Laravel need it?**
A design pattern that abstracts data access behind an interface, decoupling business logic from Eloquent. Not required by Laravel (Eloquent already provides an abstraction), but useful in larger apps for testability, swapping data sources, or enforcing clean architecture boundaries.

**55. What are Laravel Traits and how are they used?**
PHP traits are reusable blocks of methods mixed into classes (since PHP doesn't support multiple inheritance). Laravel uses them heavily — e.g., `SoftDeletes`, `Notifiable`, `HasFactory` — to add reusable behavior to Eloquent models.

**56. What is the `HasFactory` trait?**
Added to Eloquent models to enable factory-based fake data generation, e.g., `User::factory()->create()`, linking the model to its corresponding factory class in `database/factories`.

**57. What are global scopes and local scopes in Eloquent?**
Global scopes automatically apply constraints to all queries for a model (e.g., only active records), defined via a class implementing `Scope` or `addGlobalScope`. Local scopes are reusable query constraints defined as methods (`scopeActive()`) and called via `Model::active()`.

**58. What is mass assignment and how do you protect against it?**
Setting multiple model attributes at once from an array (e.g., `User::create($request->all())`). Protected via `$fillable` (whitelist of assignable attributes) or `$guarded` (blacklist) on the model, preventing malicious extra fields from being set.

**59. What is the difference between `$fillable` and `$guarded`?**
`$fillable` is a whitelist — only listed attributes can be mass-assigned. `$guarded` is a blacklist — all attributes except listed ones can be mass-assigned. Using `$guarded = []` allows everything (use with caution).

**60. What are model events (Eloquent lifecycle hooks)?**
Events fired during a model's lifecycle: `creating`, `created`, `updating`, `updated`, `saving`, `saved`, `deleting`, `deleted`, etc. You can hook into them via the `booted()` method, observers, or event listeners to run logic automatically (e.g., generating a slug before saving).

**61. What are Observers in Laravel?**
Classes (`php artisan make:observer UserObserver --model=User`) that group all the event-listening logic for a model in one place instead of scattering it across the model or controllers — e.g., sending a welcome email `created()` a user.

**62. What is the difference between `save()`, `create()`, and `update()`?**
`create()` mass-assigns and saves a new model in one step. `save()` persists an existing (or new, manually built) model instance. `update()` mass-assigns and saves changes to an existing model instance in one call.

**63. What is eager loading with constraints?**
Restricting which related records are loaded during eager loading, e.g., `Post::with(['comments' => fn($q) => $q->where('approved', true)])->get()` — loads only approved comments per post.

**64. What is lazy loading and why is it sometimes disabled?**
Loading a relationship only when it's accessed (`$post->comments`), which can trigger the N+1 problem if done in a loop. Laravel lets you call `Model::preventLazyLoading()` (often in `AppServiceProvider` for non-production) to throw an exception when lazy loading occurs, forcing developers to eager load explicitly.

**65. What are Laravel Casts?**
Attribute type conversions defined via `$casts` (or the `casts()` method) on a model, e.g., casting a JSON column to an array, a string to a boolean/date, or using custom cast classes — so you always work with the correct native PHP type.

**66. How do you implement custom validation rules?**
`php artisan make:rule Uppercase`, implement `passes()`/`validate()` logic in the rule class, then use it like `'field' => [new Uppercase]` in validation rules — or use a closure rule inline for simple one-off cases.

**67. What is the `unique` and `exists` validation rule used for?**
`unique:table,column` ensures a value doesn't already exist in the database (e.g., unique email on registration). `exists:table,column` ensures a value does exist (e.g., a `category_id` must reference a real category).

**68. What is a Laravel Transformer/Resource Collection?**
A `ResourceCollection` (or a resource returning a collection) wraps multiple model instances with consistent JSON structure, optional pagination metadata (`links`, `meta`), and shared transformation logic — e.g., `UserResource::collection($users)`.

**69. How does Laravel handle database transactions?**
Via `DB::transaction(function () { ... });`, which automatically commits on success or rolls back on exception — ensuring multiple related database operations succeed or fail together (atomicity).

**70. What is optimistic locking / how do you prevent race conditions in Laravel?**
Use `lockForUpdate()` or `sharedLock()` within a transaction to lock rows during a read-modify-write sequence, or maintain a version column and check it before updating, rejecting the update if the version has changed since it was read.

**71. What is the difference between `firstOrCreate()` and `updateOrCreate()`?**
`firstOrCreate($attributes, $values)` finds a matching record or creates a new one with the merged attributes/values, without updating an existing match. `updateOrCreate($attributes, $values)` finds a matching record and updates it with `$values`, or creates a new one if none exists.

**72. What is the difference between `Route::resource()` and manually defined routes?**
`Route::resource('posts', PostController::class)` automatically generates the full set of RESTful CRUD routes (index, create, store, show, edit, update, destroy) with conventional naming, saving you from manually defining each one.

**73. What is route caching and when should you use it?**
`php artisan route:cache` compiles all routes into a single cached file for faster route registration in production. Should be used in production only (not while developing, since closures can't be cached and routes need to reflect code changes immediately).

**74. What other caching commands does Laravel provide for production?**
`config:cache` (caches config files), `route:cache` (caches routes), `view:cache` (precompiles Blade views), and `optimize`/`optimize:clear` to cache or clear all of the above together.

**75. How do you handle file uploads in Laravel?**
Access the file via `$request->file('avatar')`, validate it (`'avatar' => 'image|max:2048'`), then store it with `$request->file('avatar')->store('avatars')` or `storeAs()`, typically using the `Storage` facade with a configured disk (local, S3, etc.).

**76. What is the Storage facade and what are "disks"?**
`Storage` provides a unified API for file storage regardless of backend. "Disks" are configured storage backends in `config/filesystems.php` (local, public, s3, etc.) — you can swap backends without changing application code.

**77. What is a Laravel Notification?**
A class (`php artisan make:notification InvoicePaid`) representing something to notify a user about, deliverable via multiple channels (mail, database, SMS via Vonage, Slack, broadcast) through a single `via()` method and channel-specific methods like `toMail()`.

**78. What is broadcasting in Laravel?**
A way to broadcast server-side events to the client in real time over WebSockets (via Pusher, Laravel Reverb, Ably, etc.), letting frontend JavaScript (Laravel Echo) listen for events like new chat messages without polling.

**79. What is Laravel Echo?**
A JavaScript library that makes it easy to subscribe to channels and listen for events broadcast by the Laravel backend, working with WebSocket drivers like Pusher or Laravel Reverb.

**80. What are Form Request authorization checks used for?**
The `authorize()` method in a Form Request class determines whether the currently authenticated user is allowed to make the request at all (returns true/false) — separate from field validation, keeping authorization and validation concerns cleanly split.

**81. What is the `tap()` helper used for?**
Calls a given closure with the value and then returns the value itself, useful for chaining an action (like logging or firing an event) without breaking a fluent chain, e.g., `return tap($user)->update([...]);`.

**82. What is the `dd()` vs `dump()` difference?**
`dump()` prints a variable's contents and continues execution. `dd()` ("dump and die") prints the variable and immediately halts script execution — commonly used for quick debugging.

**83. What is Laravel Tinker?**
An interactive REPL (`php artisan tinker`) for the Laravel application, letting you run PHP/Eloquent code directly against your app (query the DB, test snippets) without building a full request/response cycle.

**84. What is the purpose of the `.env` file?**
Stores environment-specific configuration (DB credentials, API keys, app URL, debug mode) outside of version control, loaded at runtime and referenced by `config/*.php` files via `env()`.

**85. How does Laravel's config caching interact with `.env`?**
Once `config:cache` is run, Laravel reads only the cached config array and stops reading `.env` directly at runtime — so `env()` calls outside config files will return `null` in production after caching. This is why `env()` should only be used inside `config/` files.

**86. What is a Service Class in Laravel (and why use one)?**
A plain PHP class (not part of Laravel's core, but a common convention) that holds business logic extracted from controllers/models, keeping controllers thin and making logic reusable and easier to unit test.

**87. What is the Repository + Service layered architecture used for in larger Laravel apps?**
Controllers stay thin (HTTP only), Services hold business logic/orchestration, Repositories abstract data access from Eloquent specifics — improving testability, separation of concerns, and making it easier to swap implementations (e.g., cache layer, different data source) without touching business logic.

**88. What is the difference between `Route::apiResource()` and `Route::resource()`?**
`apiResource()` generates the same RESTful routes as `resource()` but excludes the `create` and `edit` routes (which return HTML forms), since APIs typically don't need form-display endpoints.

**89. How do you rate limit API routes in Laravel?**
Apply the `throttle` middleware, e.g., `Route::middleware('throttle:60,1')` (60 requests per minute), or define named rate limiters in `RouteServiceProvider`/`AppServiceProvider` using `RateLimiter::for()` for more granular control (per-user, per-IP).

**90. What is the difference between `Auth::check()` and `Auth::user()`?**
`Auth::check()` returns a boolean indicating whether a user is authenticated. `Auth::user()` returns the currently authenticated user's model instance (or `null` if not authenticated).

**91. What are Laravel Guards?**
Define how users are authenticated for each request (e.g., `web` guard uses sessions, `api` guard uses tokens/Sanctum), configured in `config/auth.php`, letting different parts of an app use different authentication mechanisms.

**92. What are Laravel Providers vs Guards vs Auth drivers?**
Guards define *how* a request is authenticated (session, token). Providers define *where* user data comes from (Eloquent model, database table). Drivers are the underlying implementation Laravel uses to fetch/verify credentials — together configured in `config/auth.php`.

**93. What is the difference between `Illuminate\Http\Request` and `Illuminate\Http\Response`?**
`Request` represents the incoming HTTP request (input data, headers, files, query params). `Response` represents the outgoing HTTP response (body, status code, headers) returned from a controller/route.

**94. How do you version a Laravel API?**
Common approaches: prefix routes (`Route::prefix('v1')->group(...)`), separate route files per version, namespaced controllers per version (`Api\V1\UserController`), or header-based versioning via middleware — chosen based on how many breaking changes are expected over time.

**95. What is Laravel Sail?**
An official Docker-based local development environment for Laravel, providing a simple CLI (`./vendor/bin/sail up`) to run the app, database, Redis, and other services in containers without installing them locally.

**96. What is Laravel Horizon?**
A dashboard and configuration system for Laravel's Redis queues, giving visibility into job throughput, runtime, and failures, plus tools to configure queue workers — commonly used in production for monitoring queue health.

**97. What is Laravel Telescope?**
A debugging/introspection tool for local development that records requests, exceptions, queries, queued jobs, mail, notifications, and more — giving a detailed dashboard into what the application is doing.

**98. How do you deploy a Laravel application?**
Typical steps: pull code, run `composer install --no-dev --optimize-autoloader`, run migrations, cache config/routes/views (`php artisan optimize`), set correct `.env` values and permissions (e.g., `storage/`, `bootstrap/cache`), restart queue workers, and use a process manager (Supervisor) for queues — often automated via CI/CD or managed platforms like Laravel Forge/Vapor.

**99. What is the difference between Laravel Forge and Laravel Vapor?**
Forge is a server management tool for provisioning and managing traditional VPS servers (DigitalOcean, AWS EC2, etc.) running Laravel apps. Vapor is a serverless deployment platform for Laravel on AWS Lambda, auto-scaling without managing servers directly.

**100. How do you keep a Laravel application secure in production?**
Set `APP_DEBUG=false`, use HTTPS, keep dependencies updated (`composer update`, monitor CVEs), use `$fillable`/validation to prevent mass assignment, escape output in Blade (`{{ }}` not `{!! !!}`) to prevent XSS, use parameterized queries (Eloquent/query builder does this by default), enforce CSRF protection, rate-limit sensitive endpoints, store secrets in `.env` (never commit it), and restrict file/folder permissions appropriately.

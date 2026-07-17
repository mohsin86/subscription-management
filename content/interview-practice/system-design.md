# System Design

**SD1: How would you design a rate limiter?**
Track how many requests a user/IP made in a time window (e.g. a counter in Redis that resets every minute); reject requests once they exceed the limit.

**SD2: Authentication vs authorization?**
Authentication confirms who you are (login). Authorization decides what you're allowed to do once logged in (e.g. only a subscription's owner can edit it).

**SD3: How would you design a notification system?**
A scheduled job queries "what needs to go out today," then hands each notification to the right channel — like this app's renewal-reminders cron sending email + Telegram. Avoid duplicates; don't let one channel failing block the other.

**SD4: Horizontal vs vertical scaling?**
Vertical = a bigger server. Horizontal = more servers behind a load balancer. Horizontal is usually preferred — it also adds redundancy.

**SD5: How do you handle caching and invalidation?**
Store expensive/slow-to-fetch data somewhere fast so you don't redo the work every request. Invalidate it on a time limit (TTL), or explicitly when the underlying data changes.

**SD6: Load balancer vs reverse proxy?**
A reverse proxy forwards requests to your app (and can do SSL termination). A load balancer is a reverse proxy that specifically spreads requests across multiple identical servers.

**SD7: How do you make scheduled notifications reliable (no duplicates)?**
Make each send idempotent — track "already notified for this subscription today" in the database so a retry or duplicate cron run doesn't send twice.

**SD8: What is the CAP theorem?**
During a network problem, a distributed database can only keep 2 of 3: Consistency, Availability, Partition tolerance. Since partitions happen in practice, real systems choose between consistency and availability during a failure.

**SD9: What is idempotency?**
Designing an operation so running it twice has the same effect as once — usually via a unique request ID the server remembers it already processed. Important so a retried write API doesn't double-insert or double-charge.

**SD10: Sync vs async communication?**
Sync (a normal REST call) waits for a response before continuing. Async (a message queue) hands off work and moves on — good when the caller doesn't need to wait.

**SD11: How would you design file upload/storage?**
Client uploads directly to cloud storage using a short-lived "presigned URL" from your server, instead of routing the whole file through your server; a CDN serves it back quickly.

**SD12: What is a message queue for?**
A buffer between two parts of a system so the sender doesn't wait for the work to finish, and load spikes get smoothed out instead of overwhelming the receiver.

**SD13: How do you handle database failover/HA?**
Run a standby replica that automatically takes over if the primary goes down, keeping downtime minimal.

**SD14: What is eventual consistency?**
After a write, not every part of the system sees the new value immediately, but it will catch up — acceptable when a few seconds of staleness doesn't matter (e.g. a slightly lagging read replica).

**SD15: How would you design multi-tenant data isolation?**
Directly relevant to this project's Phase 12 team feature: every query touching team data must filter by `teamId` AND confirm the requesting user is actually a member of that team — otherwise one team could read or edit another team's subscriptions.


**How would you design a URL shortener?**
Generate a short unique key (random or base62-encoded auto-increment ID) for each long URL, store the mapping in a database keyed by that short code, and on a GET to /abc123, look up the code and issue a redirect. Add a cache in front of the database lookup since reads vastly outnumber writes.

**What is consistent hashing?**
A way to distribute keys across a changing set of servers (e.g. cache nodes) so that adding or removing one server only reshuffles a small fraction of keys, instead of nearly all of them like a plain modulo-based hash would.

**What is a CDN, and how does it reduce latency?**
A CDN caches static content (images, JS, CSS) on servers physically distributed close to users worldwide, so a user in Asia doesn't have to fetch a file all the way from a server in the US — cutting network round-trip time significantly.

**Monolith vs microservices — what's the real cost of splitting too early?**
A monolith is one deployable codebase/service; microservices split the system into many independently deployable services. Splitting too early adds real cost — network calls where there used to be function calls, distributed debugging, operational overhead — before the team or traffic actually needs that flexibility.

**What is an API gateway?**
A single entry point in front of multiple backend services that handles cross-cutting concerns — routing, authentication, rate limiting, logging — so individual services don't each have to reimplement them.

**What is the circuit breaker pattern?**
Stops a service from repeatedly calling a downstream dependency that's already failing — after enough failures, it trips and fails fast for a while instead of piling up slow, doomed requests, giving the failing service room to recover.

**How do you do back-of-the-envelope capacity estimation?**
Roughly calculate scale (requests/sec, storage growth, bandwidth) from given assumptions (e.g. 10M users, 5% active daily, one post each) to sanity-check a design's feasibility before diving into details — a standard system design interview step, about being directionally right, not precise.

**What is the difference between master-slave and master-master replication?**
Master-slave (primary-replica) has one server accepting writes, replicated to read-only copies. Master-master allows writes on multiple servers, which is more available but risks write conflicts that need a resolution strategy.

**What is a distributed lock, and why is it harder than a single-process lock?**
A way to coordinate exclusive access to a resource across multiple servers/processes, since a normal in-process lock only works within one machine — e.g. Redlock, built on Redis, used so only one instance of a scheduled job runs at a time.

**How would you design a simple LRU cache?**
A fixed-size cache that evicts the Least Recently Used item when full — typically implemented with a hash map (for O(1) lookup) plus a doubly linked list (to track/update recency order in O(1)).

**What is service discovery?**
How services in a distributed system find each other's current network location, since instances scale up/down and IPs change — a registry (like Consul or a cloud provider's built-in DNS) tracks what's currently running and where.

**What is the difference between vertical and horizontal partitioning (sharding)?**
Vertical partitioning splits a table by columns (e.g. rarely-used columns moved to a separate table). Horizontal partitioning (sharding) splits a table by rows across multiple databases, usually by a key like userId, so no single database holds all the data.

**What is the difference between a liveness and a readiness health check?**
A liveness check asks if this instance is alive at all (restart it if not). A readiness check asks if it's ready to accept traffic right now (e.g. still warming up) — failing liveness gets you killed, failing readiness just gets you temporarily removed from the load balancer.

**How would you design a news feed?**
Fan-out on write pre-computes and pushes a new post into all of a user's followers' feeds immediately (fast reads, expensive for huge follower counts). Fan-out on read builds the feed at request time by pulling from everyone you follow (cheaper writes, slower reads) — real systems often mix both.

**What is leader election?**
The process of automatically picking one node among a group to act as the primary/coordinator (e.g. choosing a new primary database after the old one fails) — algorithms like Raft or tools like ZooKeeper/etcd handle this so the group agrees on exactly one leader even during failures.
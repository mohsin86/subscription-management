# Database / SQL

**DB1: Explain SQL joins.**
```sql
SELECT users.name, subscriptions.name
FROM users
INNER JOIN subscriptions ON subscriptions.user_id = users.id;
```
INNER: only matching rows in both tables. LEFT: all rows from the left table, matched or NULL from the right. RIGHT: opposite of LEFT. FULL: all rows from both.

**DB2: What is normalization?**
Organizing data to avoid duplication (e.g. storing an email once, not on every row). Denormalize when you need faster reads and can tolerate some duplication.

**DB3: What is an index?**
Like a book's index — lets the database find rows without scanning the whole table. Speeds up reads, slightly slows writes, uses extra storage.

**DB4: What is ACID?**
Atomicity (all-or-nothing), Consistency (data stays valid), Isolation (concurrent transactions don't interfere), Durability (survives a crash once committed).

**DB5: What is the N+1 problem?**
1 query for a list + 1 more query per item for related data. Fix by fetching related data in one query.
```ts
// bad: N+1
const subs = await prisma.subscription.findMany();
// good: 1 query
const subs = await prisma.subscription.findMany({ include: { user: true } });
```

**DB6: Primary key vs foreign key?**
Primary key uniquely identifies a row in its own table. Foreign key points to a primary key in another table, linking them. Cascading delete means deleting the parent auto-deletes related children.

**DB7: Optimistic vs pessimistic locking?**
Pessimistic locks the row before editing — others wait. Optimistic doesn't lock, but checks a version number on save and rejects if someone else changed it first. Optimistic is usually preferred for web apps.

**DB8: SQL vs NoSQL?**
SQL enforces a fixed schema and relationships, great for structured, related data. NoSQL is schema-flexible, good for unstructured or rapidly changing data.

**DB9: How do migrations work?**
Versioned, incremental schema changes tracked in code so every environment ends up with the same schema. Rollbacks are written deliberately, not auto-generated.

**DB10: What are isolation levels?**
Control how much one transaction can see of another's in-progress changes. Read Committed (Postgres default) prevents seeing uncommitted data; Serializable is strictest but slowest.

**DB11: How do transactions work in Prisma?**
```ts
await prisma.$transaction([
  prisma.subscription.update({ where: { id }, data: { status: 'CANCELLED' } }),
  prisma.user.update({ where: { id: userId }, data: { subscriptionCount: { decrement: 1 } } }),
]);
```
Both succeed together, or both roll back.

**DB12: What is connection pooling, and why is it tricky on serverless?**
Reusing a small set of open connections instead of opening a new one per request. Serverless can spin up many short-lived function instances that each try to open their own connection and exhaust the database's limit — hence a pooling-aware driver adapter.

**DB13: What is a composite index?**
An index across multiple columns (e.g. `userId + renewalDate`). It only helps queries filtering on the first column, or the first + second together — not the second column alone.

**DB14: GROUP BY vs HAVING?**
`GROUP BY` groups rows sharing a value; `HAVING` filters those groups after grouping (like `WHERE`, but for aggregates).
```sql
SELECT currency, SUM(price) FROM subscriptions
GROUP BY currency
HAVING SUM(price) > 100;
```

**DB15: Sharding vs replication?**
Sharding splits data across multiple databases (each holds different rows, for scale). Replication copies the same data across databases (for redundancy/read performance).


**What is a self-join, and when would you use one?**
A table joined to itself, used when rows relate to other rows in the same table (e.g. an employees table where each row has a managerId pointing to another row's id).
```
SELECT e.name, m.name AS manager
FROM employees e
JOIN employees m ON e.manager_id = m.id;
```

**What's the difference between UNION and UNION ALL?**
UNION combines two queries' results and removes duplicates (slower, extra work). UNION ALL keeps everything including duplicates (faster) — use it whenever you know there won't be overlap or don't care about it.

**What are window functions, and how do they differ from GROUP BY?**
GROUP BY collapses rows into one row per group. Window functions (like ROW_NUMBER() OVER (...)) compute a value per row while still keeping every row visible — useful for rankings or running totals alongside the original data.

**What is a stored procedure, and when would you use one instead of application code?**
A named, precompiled block of SQL logic saved in the database itself, callable like a function. Useful for logic that must run close to the data, though most modern apps put business logic in application code instead for easier testing/versioning.

**What is the difference between a clustered and non-clustered index?**
A clustered index determines the physical order rows are stored on disk (only one per table). A non-clustered index is a separate structure pointing back to the actual rows, and a table can have many of them.

**How do you prevent SQL injection?**
Always use parameterized queries/prepared statements (placeholders like $1 or ?) instead of concatenating user input directly into a SQL string — the database treats the input as data, never as executable SQL.
```
await client.query('SELECT * FROM users WHERE email = $1', [email]);
```

**What is denormalization used for in read-heavy systems?**
Deliberately duplicating data (e.g. storing a username on every comment row instead of joining to a users table each time) to avoid expensive joins on every read, at the cost of extra work keeping copies in sync on writes.

**What's the difference between HAVING and WHERE?**
WHERE filters individual rows before grouping happens. HAVING filters groups after GROUP BY has aggregated them — you can't use an aggregate function like SUM() in a WHERE clause, only in HAVING.

**What is the difference between a view and a materialized view?**
A view is a saved query — it re-runs live every time you select from it. A materialized view stores the actual result physically and must be refreshed manually/periodically, trading freshness for much faster reads.

**What is a deadlock, and how do databases resolve one?**
Two transactions each hold a lock the other one needs, so both wait forever. Databases detect this automatically and kill one of the transactions (a deadlock victim) so the other can proceed.

**What is the difference between OLTP and OLAP systems?**
OLTP (Online Transaction Processing) handles many small, fast read/write operations — a typical app's day-to-day database. OLAP (Online Analytical Processing) handles complex, large-scale aggregate queries over historical data — a data warehouse or reporting system.

**What is the difference between ON DELETE CASCADE and ON DELETE SET NULL?**
CASCADE automatically deletes child rows when the parent is deleted. SET NULL keeps the child rows but clears their foreign key reference instead — used when the child data still has value on its own.

**How would you design a schema to avoid orphaned records?**
Define foreign keys with an explicit ON DELETE behavior (CASCADE or SET NULL) instead of leaving child rows pointing at a deleted parent — without one, most databases just block the delete until you clean up manually.

**What is the difference between a database constraint and a trigger?**
A constraint (NOT NULL, UNIQUE, CHECK, foreign key) declares a rule the database enforces automatically on every write. A trigger is custom code that runs automatically in response to an event — more powerful, but harder to reason about since the logic is hidden from anyone just reading the schema.

**How do you read a query execution plan?**
EXPLAIN (or EXPLAIN ANALYZE to actually run it) shows how the database plans to execute a query — whether it uses an index or scans the whole table, and where the time is actually being spent — the starting point for fixing a slow query.
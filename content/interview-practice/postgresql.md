# PostgreSQL Interview PrepBasics

**1\. What is PostgreSQL, and how does it differ from other SQL databases?**

An open-source, object-relational database that goes beyond standard SQL — full ACID compliance, extensibility (custom types, functions, even languages), native JSON/JSONB support alongside regular tables, and strong support for complex queries, window functions, and CTEs. Compared to MySQL, it's generally considered stronger on standards compliance and advanced features; compared to lightweight databases, it trades some simplicity for that extra power.

**2\. What are the components of PostgreSQL?**

Database (top-level container), schema (a namespace inside a database for organizing objects), table (rows and columns), index (speeds up lookups), and view (a saved query that behaves like a virtual table).

**3\. How do you create a new database in PostgreSQL?**

CREATE DATABASE mydatabase;

**4\. How do you create a new table in PostgreSQL?**

CREATE TABLE employees (

employee_id SERIAL PRIMARY KEY,

name VARCHAR(100),

position VARCHAR(100),

salary NUMERIC,

hire_date DATE

);

**5\. What is a primary key in PostgreSQL?**

A column (or set of columns) guaranteed to uniquely identify every row — it can't be NULL and can't repeat. SERIAL PRIMARY KEY is the common pattern for an auto-incrementing integer ID.

**6\. How do you insert data into a table in PostgreSQL?**

INSERT INTO employees (name, position, salary, hire_date)

VALUES ('John Doe', 'Software Engineer', 80000, '2021-01-15');

**7\. How do you query data from a table in PostgreSQL?**

SELECT \* FROM employees;

SELECT name, salary FROM employees WHERE salary > 70000;

**8\. What is a foreign key in PostgreSQL?**

A column that references the primary key of another table, enforcing that a value here must actually exist over there — this is what keeps related tables consistent (referential integrity), e.g. you can't assign an employee to a department that doesn't exist.

CREATE TABLE employees (

employee_id SERIAL PRIMARY KEY,

department_id INT REFERENCES departments(department_id)

);

**9\. How do you update data in a table in PostgreSQL?**

UPDATE employees SET salary = 85000 WHERE name = 'John Doe';

**10\. How do you delete data from a table in PostgreSQL?**

DELETE FROM employees WHERE name = 'John Doe';

**11\. What is the \`RETURNING\` clause in PostgreSQL?**

Lets an INSERT/UPDATE/DELETE hand back the affected row(s) directly, so you don't need a separate SELECT right after to see what changed — handy for grabbing an auto-generated ID right after an insert.

INSERT INTO employees (name) VALUES ('Jane') RETURNING employee_id;

**12\. How do you create an index in PostgreSQL?**

CREATE INDEX idx_employee_name ON employees(name);

Speeds up lookups/filters/sorts on that column, at the cost of a bit of extra overhead on writes.

**13\. What is a transaction in PostgreSQL?**

A group of statements executed as a single all-or-nothing unit — either every statement succeeds and commits, or if something fails, the whole thing rolls back, leaving no partial changes.

BEGIN;

UPDATE employees SET salary = 90000 WHERE name = 'John Doe';

COMMIT;

**14\. What is VACUUM in PostgreSQL?**

Because PostgreSQL's MVCC model doesn't overwrite rows in place on UPDATE/DELETE (it marks old versions dead instead), VACUUM cleans up those dead row versions and reclaims the space, keeping tables from bloating indefinitely.

**15\. How do you handle backup and restore in PostgreSQL?**

pg_dump exports a database to a SQL file; psql (or pg_restore for the custom binary format) loads it back in.

pg_dump mydatabase > backup.sql

psql mydatabase < backup.sql

**16\. What is \`EXPLAIN ANALYZE\` in PostgreSQL?**

Runs the query for real and shows both the planned execution strategy and actual timing/row counts for each step — the go-to tool for finding out whether a slow query is missing an index or doing something else inefficient.

EXPLAIN ANALYZE SELECT \* FROM employees WHERE salary > 50000;

# Intermediate

**17\. What is a schema in PostgreSQL, and how do you use it?**

A namespace within a database that groups related tables/views/functions — lets two objects share a name as long as they're in different schemas, useful for multi-tenant setups or separating concerns within one database.

CREATE SCHEMA myschema;

CREATE TABLE myschema.mytable (id SERIAL PRIMARY KEY);

**18\. What are joins in PostgreSQL?**

Ways to combine rows from two or more tables based on a related column — INNER JOIN (only matching rows), LEFT JOIN (all left rows plus matches), FULL OUTER JOIN (all rows from both sides), and self-joins (a table joined to itself).

**19\. What is a subquery in PostgreSQL?**

A query nested inside another query, used where you need a computed value or result set as an input to the outer query — e.g. finding employees earning above the company average.

SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);

**20\. What are triggers in PostgreSQL, and how do you create them?**

Functions that fire automatically on INSERT/UPDATE/DELETE — commonly used to auto-update a timestamp, enforce complex validation, or keep a derived/audit table in sync without relying on the application to remember to do it.

CREATE FUNCTION update_timestamp() RETURNS TRIGGER AS $$

BEGIN NEW.updated_at = NOW(); RETURN NEW; END;

$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp BEFORE UPDATE ON employees

FOR EACH ROW EXECUTE FUNCTION update_timestamp();

**21\. What are constraints in PostgreSQL?**

Rules enforced at the column/table level: PRIMARY KEY (unique, not null), FOREIGN KEY (must match a row elsewhere), UNIQUE, NOT NULL, and CHECK (a custom boolean condition, like salary > 0).

**22\. How do you create a view?**

CREATE VIEW high_salary_employees AS

SELECT name, salary FROM employees WHERE salary > 80000;

A view is just a saved, named query — querying it re-runs the underlying SQL each time, so it always reflects current data.

**23\. How do you handle exceptions in PL/pgSQL?**

An EXCEPTION block inside a DO/function body catches specific error conditions and lets you respond gracefully instead of the whole transaction aborting unhandled.

DO $$

BEGIN

INSERT INTO employees (employee_id, name) VALUES (1, 'John');

EXCEPTION

WHEN unique_violation THEN RAISE NOTICE 'Duplicate key!';

END; $$;

**24\. What are CTEs (Common Table Expressions) in PostgreSQL?**

A WITH clause that names a temporary result set you can reference later in the same query — makes complex queries much more readable by breaking them into named, sequential steps instead of deeply nested subqueries.

WITH dept_avg AS (

SELECT department_id, AVG(salary) AS avg_salary FROM employees GROUP BY department_id

)

SELECT \* FROM dept_avg WHERE avg_salary > 70000;

**25\. How do you use window functions in PostgreSQL?**

They compute a value across a set of related rows without collapsing them into one row like GROUP BY does — used for rankings, running totals, and moving averages while still returning every original row.

SELECT name, salary, RANK() OVER (ORDER BY salary DESC) AS salary_rank FROM employees;

**26\. Explain JSON data types in PostgreSQL.**

json stores an exact text copy of the JSON you inserted; jsonb stores it in a parsed binary format — slightly slower to insert but much faster to query and index, which is why jsonb is the default recommendation for anything you'll actually search through.

CREATE TABLE products (id SERIAL PRIMARY KEY, details JSONB);

INSERT INTO products (details) VALUES ('{"name": "Laptop", "price": 1200}');

SELECT details->>'name' FROM products;

**27\. How do you implement partitioning in PostgreSQL?**

Split one logical table into multiple physical pieces (by range, list, or hash) so queries and maintenance only need to touch the relevant partition instead of the whole table — great for time-series data where you mostly query recent partitions.

CREATE TABLE sales (sale_id SERIAL, sale_date DATE, amount NUMERIC) PARTITION BY RANGE (sale_date);

CREATE TABLE sales_2021 PARTITION OF sales FOR VALUES FROM ('2021-01-01') TO ('2022-01-01');

**28\. What is the \`pg_hba.conf\` file, and what is its purpose?**

Controls client authentication — which hosts/users/databases are allowed to connect and what authentication method (password, cert, trust, etc.) they must use. It's the first line of access control before anyone even reaches a login prompt.

**29\. How do you optimize queries in PostgreSQL?**

Index the columns you actually filter/join/sort on, run ANALYZE/VACUUM regularly so the planner has accurate statistics, avoid SELECT \* when you only need a few columns, check EXPLAIN ANALYZE output before assuming a query is "just slow," and review join order/subquery structure for anything doing more work than necessary.

**30\. Explain table inheritance in PostgreSQL.**

A child table can inherit a parent table's columns, then add its own on top — queries on the parent by default include rows from all its children too. It's a less common, more PostgreSQL-specific feature compared to partitioning, and these days partitioning (which is built on the same underlying mechanism) is the more common reason to reach for it.

CREATE TABLE managers (department VARCHAR(100)) INHERITS (employees);

**31\. How do you perform full-text search in PostgreSQL?**

Convert text to a tsvector (a normalized, searchable representation) and search it with a tsquery, which handles stemming and stop words so "running" matches a search for "run."

UPDATE documents SET tsvector_content = to_tsvector(content);

SELECT \* FROM documents WHERE tsvector_content @@ to_tsquery('search_term');

# Advanced

**32\. What is WAL (Write-Ahead Logging) in PostgreSQL, and how does it work?**

Every change is written to a sequential log file before it's applied to the actual data files — if the server crashes mid-write, PostgreSQL replays the WAL on restart to get back to a consistent state instead of losing or corrupting data. It's also the foundation replication is built on.

**33\. How do you configure replication in PostgreSQL?**

Enable WAL archiving and set replication parameters on the primary (wal_level = replica, max_wal_senders), create a replication role, allow the standby's IP in pg_hba.conf, then point the standby at the primary's connection info so it starts streaming and replaying WAL continuously.

**34\. What are the different types of indexes available in PostgreSQL?**

B-Tree (the default, good for most comparisons and sorting), Hash (equality-only lookups), GiST (geometric data, full-text search), SP-GiST (partitioned/hierarchical data), GIN (great for full-text search and JSONB), and BRIN (efficient for huge tables where data is naturally ordered, like a timestamp column that only grows).

**35\. Explain MVCC (Multi-Version Concurrency Control) in PostgreSQL.**

Instead of locking rows for reads, PostgreSQL keeps multiple versions of a row and gives each transaction a consistent snapshot as of when it started — readers never block writers and vice versa, which is a big part of why Postgres handles concurrent access so well.

**36\. How do you use the \`pg_stat_activity\` view to monitor PostgreSQL?**

SELECT pid, usename, application_name, state, query FROM pg_stat_activity;

Shows every current connection, what query (if any) it's running, and its state — the first place to look when you suspect a long-running or stuck query.

**37\. What are the different isolation levels in PostgreSQL?**

Read Committed (default — each statement sees only data committed before it started), Repeatable Read (the whole transaction sees a consistent snapshot from its start), and Serializable (strictest — behaves as if transactions ran one at a time, preventing all anomalies at the cost of more retry conflicts). Read Uncommitted is accepted syntactically but behaves the same as Read Committed since Postgres never does dirty reads.

**38\. How do you handle deadlocks in PostgreSQL?**

PostgreSQL detects deadlocks automatically and aborts one of the transactions to break the cycle — your job is mostly prevention: access tables in a consistent order across your codebase, keep transactions short, and be careful with explicit locking. pg_locks and the logs help diagnose one after the fact.

**39\. Explain the query planner and optimizer in PostgreSQL.**

Before running a query, the planner considers multiple possible execution strategies (which index to use, which join algorithm, which order to join tables in) and picks the one with the lowest estimated cost, based on table statistics gathered by ANALYZE. Stale statistics are a common reason the planner picks a bad plan.

**40\. How do you implement sharding in PostgreSQL?**

No built-in sharding out of the box — common approaches are manual application-level routing combined with partitioning, logical replication to distribute data, or an extension like Citus that turns PostgreSQL into a distributed database with actual shard-aware query routing.

**41\. What are the different types of backup strategies in PostgreSQL?**

Logical backup (pg_dump, portable SQL/archive format), file-system-level backup (copying the data directory while stopped, or via snapshots), continuous archiving (WAL archiving + pg_basebackup, enabling point-in-time recovery), and logical replication for a continuously up-to-date standby copy.

**42\. What are temporary tables in PostgreSQL?**

A table that exists only for the current session (or transaction) and disappears automatically afterward — handy for staging intermediate results in a complex process without leaving cleanup work behind or polluting the permanent schema.

CREATE TEMP TABLE temp_employees (employee_id INT, name VARCHAR(100));

# Query-Based Questions

These use a small sample schema: **Departments** (department_id, department_name), **Employees** (employee_id, name, department_id, salary), **Projects** (project_id, project_name, budget, start_date, end_date, department_id), **Tasks** (task_id, project_id, assigned_to), and **TimeLogs** (employee_id, project_id, hours_worked).

**43\. List the total hours worked by each employee across all projects.**

SELECT e.name, SUM(tl.hours_worked) AS total_hours

FROM employees e

JOIN timelogs tl ON e.employee_id = tl.employee_id

GROUP BY e.name;

Groups the joined rows by employee and sums their logged hours.

**44\. Find the average salary per department, only where it's above 75,000.**

SELECT d.department_name, AVG(e.salary) AS avg_salary

FROM departments d

JOIN employees e ON d.department_id = e.department_id

GROUP BY d.department_name

HAVING AVG(e.salary) > 75000;

HAVING filters on the aggregate result — WHERE can't do this since the average doesn't exist until after grouping.

**45\. Retrieve projects that have more than 2 tasks assigned.**

SELECT p.project_name, COUNT(t.task_id) AS task_count

FROM projects p

JOIN tasks t ON p.project_id = t.project_id

GROUP BY p.project_name

HAVING COUNT(t.task_id) > 2;

**46\. List employees who haven't been assigned to any tasks.**

SELECT e.name

FROM employees e

LEFT JOIN tasks t ON e.employee_id = t.assigned_to

WHERE t.assigned_to IS NULL;

A LEFT JOIN keeps every employee row even with no matching task, and the WHERE ... IS NULL filters down to just the ones that got no match at all.

**47\. Find the project with the highest budget and its department.**

SELECT p.project_name, p.budget, d.department_name

FROM projects p

JOIN departments d ON p.department_id = d.department_id

ORDER BY p.budget DESC

LIMIT 1;

**48\. Calculate the total budget allocated to each department.**

SELECT d.department_name, SUM(p.budget) AS total_budget

FROM departments d

JOIN projects p ON d.department_id = p.department_id

GROUP BY d.department_name;

**49\. List employees who worked on 'Project Alpha'.**

SELECT DISTINCT e.name

FROM employees e

JOIN tasks t ON e.employee_id = t.assigned_to

JOIN projects p ON t.project_id = p.project_id

WHERE p.project_name = 'Project Alpha';

DISTINCT avoids listing the same employee twice if they have multiple tasks on that project.

**50\. Find the department with the most employees.**

SELECT d.department_name, COUNT(e.employee_id) AS employee_count

FROM departments d

JOIN employees e ON d.department_id = e.department_id

GROUP BY d.department_name

ORDER BY employee_count DESC

LIMIT 1;
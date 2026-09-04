import type { ArticleContent } from "./types";

export const isolationArticles: Record<string, ArticleContent> = {
  "env-files": {
    slug: "env-files",
    title: "How to Manage Separate .env Files Per Git Worktree",
    keyword: "git worktree env",
    tags: ["environment", "devops", "security", "git-worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Because `.env` files are untracked by Git, creating a new worktree leaves the new directory without environment variables. Automate copying `.env.example` via pre/post-worktree hooks or WorktreeWise workflows, and keep branch-specific variables isolated.",
    scenario: "Elena creates a worktree to test Stripe webhooks on `feature/stripe`. When booting the app, the server immediately crashes with `Missing required environment variable: STRIPE_SECRET_KEY`. She realizes `.env.local` wasn't copied from the main repository.",
    lead: "Managing environment variables is one of the first hurdles developers encounter when adopting Git worktrees. Because `.env` files contain sensitive secrets and are ignored by `.gitignore`, Git does not track or copy them into newly spawned worktree directories.",
    problem: {
      title: "Why .env Files Disappear in New Worktrees",
      description: "Git only checks out tracked files. Any file listed in `.gitignore`—including `.env`, `.env.local`, and `.env.development`—is strictly ignored. When you create a worktree, the directory starts with only tracked files.",
      errorSnippet: `$ git worktree add ../feature-stripe feature/stripe
$ cd ../feature-stripe && npm run dev
Error: Cannot find module or config in .env.local: ENOENT`,
      internals: "A worktree is a clean checkout based on the target branch's commit tree. Ignored files exist only on disk in the originating directory. You need an automated mechanism to provision worktree-specific environment files upon creation.",
    },
    commands: [
      {
        label: "Manual copy from main repository",
        code: "cp /path/to/main/.env.local ../feature-stripe/.env.local",
        explanation: "Quickly seeds the new worktree with existing development variables.",
      },
      {
        label: "Automated post-worktree hook (bash)",
        code: `#!/bin/sh
# .git/hooks/post-checkout or WorktreeWise hook
TARGET_DIR="$1"
cp .env.example "$TARGET_DIR/.env.local"`,
        explanation: "Automatically generates `.env.local` whenever a worktree is created.",
      },
    ],
    steps: [
      {
        title: "Maintain a pristine .env.example",
        description: "Keep `.env.example` tracked in Git with placeholder values and clear documentation for every required variable.",
      },
      {
        title: "Create the worktree",
        command: "git worktree add ../feat-billing -b feat/billing main",
        description: "Spawn your new working directory.",
      },
      {
        title: "Copy and customize environment variables",
        command: "cp .env.example ../feat-billing/.env.local",
        description: "Seed the worktree and edit any branch-specific variables (e.g. mock API keys or custom ports).",
      },
      {
        title: "Verify .env is properly ignored",
        command: "git -C ../feat-billing status --ignored",
        description: "Confirm `.env.local` appears under 'Ignored files' and will never be committed to Git.",
      },
    ],
    edgeCases: [
      {
        title: "Symlinking .env between worktrees",
        description: "If you want all worktrees to share the exact same `.env` file dynamically, create a filesystem symlink (`ln -s` on macOS/Linux or `mklink` on Windows). Note that edits in one worktree will affect all others.",
      },
    ],
    pitfalls: [
      {
        mistake: "Force-committing `.env` into Git so worktrees inherit it",
        consequence: "Leads to catastrophic security credential leaks to GitHub or GitLab.",
        solution: "Never commit secrets. Automate copying `.env.example` instead.",
      },
    ],
    checks: [
      "New worktrees boot successfully with required environment variables",
      "Secrets remain strictly untracked in `.gitignore`",
    ],
    proTips: [
      "In WorktreeWise, enable the 'Environment Isolation' workflow on worktree creation to automatically copy, template, or offset `.env` files instantly.",
    ],
    keyTakeaways: [
      "Git never copies untracked `.env` files into new worktrees.",
      "Use `.env.example` as the canonical template.",
      "Automate `.env` provisioning with WorktreeWise hooks.",
    ],
    image: "/images/v1.1.0/12-create-worktree-environment-isolation.png",
    imageAlt: "WorktreeWise Environment Isolation configuration for managing .env files",
  },

  ports: {
    slug: "ports",
    title: "Avoiding Port Collisions Across Parallel Git Worktrees",
    keyword: "git worktree different ports",
    tags: ["ports", "devops", "networking", "git-worktree"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "When running multiple worktrees simultaneously, dev servers collide on default ports (e.g. `3000`, `8080`). Use dynamic port environment variables (`PORT=3001 npm run dev`), port offset scripts, or reverse proxies to run unlimited parallel apps.",
    scenario: "Marcus starts a Next.js server on `main` (`localhost:3000`). He switches to his `feature/redesign` worktree and types `npm run dev`. The terminal screams: `Error: listen EADDRINUSE: address already in use :::3000`.",
    lead: "Running multiple branches simultaneously is the primary superpower of Git worktrees. However, operating system network sockets are global: two different processes cannot bind to `0.0.0.0:3000` at the same time. Implementing a clean port allocation strategy is crucial.",
    problem: {
      title: "The EADDRINUSE Dilemma",
      description: "Every modern web framework (Next.js, Vite, Express, Django, Rails) defaults to a fixed port. Without dynamic configuration, starting a second server immediately crashes.",
      errorSnippet: `$ npm run dev
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
Error: listen EADDRINUSE: address already in use :::3000`,
      internals: "TCP socket binding is governed by OS networking kernels. When process A calls `bind()` on port 3000 without `SO_REUSEPORT`, any subsequent `bind()` call by process B is rejected with `EADDRINUSE`.",
    },
    commands: [
      {
        label: "Dynamic port override (Next.js / Vite)",
        code: "PORT=3001 npm run dev",
        explanation: "Overrides the default port for this specific terminal session.",
      },
      {
        label: "Auto-detect available port with Vite",
        code: "npx vite --port 3000",
        explanation: "Vite automatically falls back to 3001 if 3000 is occupied.",
      },
    ],
    steps: [
      {
        title: "Identify active ports",
        command: "lsof -i :3000",
        description: "Check which worktree or process is currently holding port 3000.",
      },
      {
        title: "Define a port convention",
        description: "Assign port 3000 to `main`, 3001 to Worktree A, 3002 to Worktree B.",
      },
      {
        title: "Configure .env.local per worktree",
        description: "Write `PORT=3001` inside `../worktree-a/.env.local`.",
      },
      {
        title: "Run dev servers concurrently",
        description: "Open `http://localhost:3000` and `http://localhost:3001` side-by-side in your browser.",
      },
    ],
    edgeCases: [
      {
        title: "CORS issues with multi-port backends",
        description: "If your backend runs on port 8000 and expects frontend on 3000, update your backend CORS configuration to allow `localhost:300*` regex origins.",
      },
    ],
    pitfalls: [
      {
        mistake: "Killing the existing dev server whenever you switch worktrees",
        consequence: "Destroys the productivity advantage of parallel worktrees.",
        solution: "Use dynamic port offsets so both servers run together.",
      },
    ],
    checks: [
      "Both applications run concurrently on different ports",
      "Browser hot reloading works independently in each tab",
    ],
    proTips: [
      "WorktreeWise can automatically allocate incremented ports (3000, 3001, 3002) for each worktree you create.",
    ],
    keyTakeaways: [
      "OS sockets cannot be shared on the same port.",
      "Override ports via `PORT=300x` in `.env.local`.",
      "Update CORS policies to permit multiple local ports.",
    ],
    image: "/images/v1.1.0/12-create-worktree-environment-isolation.png",
    imageAlt: "WorktreeWise Environment Isolation managing dynamic port allocations",
  },

  docker: {
    slug: "docker",
    title: "Running Docker Containers with Git Worktrees Without Collisions",
    keyword: "git worktree docker",
    tags: ["docker", "containers", "devops", "git-worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Running Docker commands across multiple worktrees causes container name collisions and host port conflicts. Parameterize container names and host port mappings using worktree branch identifiers (e.g. `app-${WORKTREE_NAME}`).",
    scenario: "Lucas builds a Docker container in his main repo named `web-app`. In his feature worktree, he runs `docker run -d --name web-app -p 8080:80 web-app`. Docker rejects the command: `The container name '/web-app' is already in use`.",
    lead: "Docker and Git worktrees are a natural match for full-stack engineering. However, Docker maintains a global container and network namespace on the host engine. Without proper naming conventions, parallel containers will fight over identical names and port forwards.",
    problem: {
      title: "The Shared Docker Daemon Namespace",
      description: "Docker container names, volume names, and host port bindings must be globally unique across the entire Docker daemon.",
      errorSnippet: `docker: Error response from daemon: Conflict. The container name "/web-app" is already in use by container "3d4a11b...".`,
      internals: "Docker's daemon enforces unique constraints on container names and host port bindings (`0.0.0.0:8080`). To run multiple containers concurrently, both the name and the host port mapping must be distinct.",
    },
    commands: [
      {
        label: "Build with worktree-specific tag",
        code: "docker build -t app-feat-auth .",
        explanation: "Tags the Docker image with the worktree branch name.",
      },
      {
        label: "Run with unique name and port",
        code: "docker run -d --name app-feat-auth -p 8081:80 app-feat-auth",
        explanation: "Maps host port 8081 to container port 80 to prevent collision with port 8080.",
      },
    ],
    steps: [
      {
        title: "Define worktree identifier",
        description: "Use the worktree folder name as a unique suffix.",
      },
      {
        title: "Build container image with tag",
        command: "docker build -t myapp:feat-auth .",
        description: "Create an isolated image tag.",
      },
      {
        title: "Launch with dynamic name and port",
        command: "docker run --name myapp-feat-auth -p 8081:3000 myapp:feat-auth",
        description: "Starts without naming or port collision.",
      },
    ],
    edgeCases: [
      {
        title: "Mounting worktree directories as volumes",
        description: "When using `-v $(pwd):/app`, ensure file permissions and file watching (inotify) function properly across worktree paths.",
      },
    ],
    pitfalls: [
      {
        mistake: "Hardcoding container names in Dockerfile or npm scripts",
        consequence: "Guarantees collisions whenever a second worktree runs the script.",
        solution: "Use environment variables like `${CONTAINER_NAME:-app}`.",
      },
    ],
    checks: [
      "`docker ps` shows distinct container names running on separate host ports",
      "Logs from one container do not intermingle with another",
    ],
    proTips: [
      "In WorktreeWise, configure Docker run workflows with variables like `${worktree.name}` and `${worktree.port}`.",
    ],
    keyTakeaways: [
      "Docker container names and host ports must be unique.",
      "Tag images and name containers using the worktree name.",
      "Offset host ports to enable simultaneous testing.",
    ],
    image: "/images/v1.1.0/12-create-worktree-environment-isolation.png",
    imageAlt: "WorktreeWise interface configuring Docker container isolation across worktrees",
  },

  "docker-compose": {
    slug: "docker-compose",
    title: "Docker Compose with Git Worktrees: Isolated Stacks and Networks",
    keyword: "git worktree docker compose",
    tags: ["docker-compose", "docker", "microservices", "git-worktree"],
    readTime: "7 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "By default, Docker Compose uses the project directory name as its project name, causing sibling worktrees to overwrite each other's networks and volumes. Set `COMPOSE_PROJECT_NAME` per worktree to achieve 100% isolated Compose stacks.",
    scenario: "A microservices project uses `docker compose up -d` to spin up PostgreSQL, Redis, and API containers. When running Compose in a second worktree, Docker Compose recreates and destroys the containers from the first worktree!",
    lead: "Docker Compose is the standard tool for multi-container local environments. When combined with Git worktrees, you can run multiple complete application stacks in parallel. However, understanding how Compose names projects, networks, and volumes is essential to prevent destructive collisions.",
    problem: {
      title: "How Docker Compose Determines Project Names",
      description: "If two worktrees are named similarly or if `COMPOSE_PROJECT_NAME` is not set, Compose treats them as the same application and recreates existing containers.",
      errorSnippet: `$ cd ../worktree-b && docker compose up -d
Recreating worktree-db_1 ... done
Recreating worktree-api_1 ... done
[Worktree A] Connection to database lost!`,
      internals: "Compose uses the project name to prefix all containers (`<project>_<service>_1`), volumes (`<project>_<data>`), and networks (`<project>_default`). If two worktrees share the same project name, their volumes and networks collide.",
    },
    commands: [
      {
        label: "Isolate Compose project via env variable",
        code: "COMPOSE_PROJECT_NAME=wt-feat-billing docker compose up -d",
        explanation: "Prefixes all containers, networks, and volumes with `wt-feat-billing`.",
      },
      {
        label: "Specify dedicated .env file with Compose",
        code: "docker compose --env-file .env.worktree up -d",
        explanation: "Loads worktree-specific port and project name variables cleanly.",
      },
    ],
    steps: [
      {
        title: "Define dynamic project name in `.env`",
        description: "Add `COMPOSE_PROJECT_NAME=app-feat-search` to the worktree's `.env` file.",
      },
      {
        title: "Parameterize external ports in `docker-compose.yml`",
        description: "Use `${APP_PORT:-3000}:3000` and `${DB_PORT:-5432}:5432` in your compose file.",
      },
      {
        title: "Launch the stack",
        description: "Start the multi-container stack in detached mode.",
        command: "docker compose up -d",
        output: "Creating network app-feat-search_default\nCreating app-feat-search_db_1 ... done",
      },
      {
        title: "Verify stack isolation",
        description: "Check running Compose projects across worktrees.",
        command: "docker compose ls",
        output: `NAME                 STATUS    CONFIG FILES
app-main             running   docker-compose.yml
app-feat-search      running   docker-compose.yml`,
      },
    ],
    edgeCases: [
      {
        title: "Disk space from multiple database volumes",
        description: "Multiple Compose stacks create multiple Docker volumes. Run `docker volume prune` periodically during maintenance.",
      },
    ],
    pitfalls: [
      {
        mistake: "Hardcoding host ports like `5432:5432` in `docker-compose.yml`",
        consequence: "The second worktree cannot bind to 5432 and fails to start.",
        solution: "Always use environment variables for host ports (`${DB_PORT:-5432}:5432`).",
      },
    ],
    checks: [
      "`docker compose ls` shows separate project entries for each worktree",
      "Each worktree interacts strictly with its own database and services",
    ],
    proTips: [
      "WorktreeWise can automatically inject `COMPOSE_PROJECT_NAME=${worktree.name}` into terminal sessions.",
    ],
    keyTakeaways: [
      "Always set `COMPOSE_PROJECT_NAME` for each worktree.",
      "Parameterize host port mappings in `docker-compose.yml`.",
      "Enjoy fully isolated multi-container stacks running side by side.",
    ],
    image: "/images/v1.1.0/12-create-worktree-environment-isolation.png",
    imageAlt: "WorktreeWise Environment Isolation screen for Docker Compose stacks",
  },

  databases: {
    slug: "databases",
    title: "Database Isolation Strategies for Parallel Git Worktrees",
    keyword: "git worktree database",
    tags: ["database", "isolation", "devops", "testing"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Running concurrent branches against a single shared database corrupts test data and causes migration rollbacks to destroy data. Adopt one of three proven patterns: database-per-worktree, schema-per-worktree, or SQLite-per-worktree.",
    scenario: "Branch A introduces a migration adding a `NOT NULL` column `tenant_id`. Branch B is still on the old schema. When the developer switches worktrees, Branch B's API queries immediately crash because the database schema was migrated forward.",
    lead: "Code state and database state must move together. When you use Git worktrees to run multiple branches in parallel, pointing all worktrees to the same development database leads to migration conflicts, dirty test fixtures, and mysterious bugs.",
    problem: {
      title: "The Schema Drift Collision",
      description: "When Branch A runs `prisma migrate dev` or `rails db:migrate`, the database schema changes globally. Branch B, expecting the old schema, crashes on every query.",
      errorSnippet: `error: column "tenant_id" of relation "users" does not exist
LINE 1: SELECT id, email, tenant_id FROM users;`,
      internals: "Databases do not have Git branches. To allow concurrent development, you must either create distinct databases (e.g. `myapp_main` and `myapp_feat_auth`) or use isolated schemas inside the same database engine.",
    },
    commands: [
      {
        label: "Dynamic database URL per worktree",
        code: "DATABASE_URL=postgresql://localhost/app_feat_auth npm test",
        explanation: "Points the worktree's backend to its own isolated database.",
      },
      {
        label: "Fast template cloning (PostgreSQL)",
        code: "createdb -T app_template app_feat_auth",
        explanation: "Instantly clones schema and seed data from a template database in under 1 second.",
      },
    ],
    steps: [
      {
        title: "Choose an isolation strategy",
        description: "For small apps, use SQLite files (`dev_worktree.sqlite3`). For PostgreSQL/MySQL, use database-per-worktree.",
      },
      {
        title: "Create the isolated database",
        command: "createdb app_feature_search",
        description: "Provision a clean database.",
      },
      {
        title: "Set DATABASE_URL in the worktree's .env",
        description: "Configure `DATABASE_URL=postgres://localhost:5432/app_feature_search`.",
      },
      {
        title: "Run migrations and seed",
        command: "npm run migrate && npm run seed",
        description: "Populate the isolated database.",
      },
    ],
    edgeCases: [
      {
        title: "Cleaning up temporary databases",
        description: "Add a post-removal hook in WorktreeWise to drop `app_${worktree_name}` when removing a worktree.",
      },
    ],
    pitfalls: [
      {
        mistake: "Sharing a single development database across migration branches",
        consequence: "Frequent schema rollbacks that corrupt test data and waste hours.",
        solution: "Provision one database per active worktree.",
      },
    ],
    checks: [
      "Running migrations in Worktree A does not affect Worktree B",
      "Test suites run concurrently without database deadlocks",
    ],
    proTips: [
      "PostgreSQL's `createdb -T <template>` feature clones an entire database with seeded tables in milliseconds via copy-on-write storage.",
    ],
    keyTakeaways: [
      "Databases lack native Git branching—isolate them by name or schema.",
      "Use PostgreSQL templates or SQLite files for instantaneous seeding.",
      "Drop temporary databases when retiring worktrees.",
    ],
    image: "/images/v1.1.0/12-create-worktree-environment-isolation.png",
    imageAlt: "WorktreeWise interface configuring database isolation per worktree",
  },

  postgresql: {
    slug: "postgresql",
    title: "PostgreSQL Isolation Patterns for Git Worktrees",
    keyword: "git worktree postgresql",
    tags: ["postgresql", "database", "sql", "git-worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Isolate PostgreSQL across worktrees using template database cloning (`createdb -T`), dynamic search path schemas (`SET search_path`), or Docker PostgreSQL instances per worktree.",
    scenario: "A backend engineer needs to test a breaking PostgreSQL 16 schema redesign while keeping production parity tests running on the main branch. Template cloning allows instant branch-specific database provisioning.",
    lead: "PostgreSQL offers outstanding multi-tenancy and copy-on-write database cloning capabilities, making it the premier relational database for Git worktree isolation.",
    problem: {
      title: "Concurrent Migration Clashes",
      description: "Running `ALTER TABLE` in a feature worktree locks tables and breaks code in other worktrees that rely on the previous column structure.",
      errorSnippet: `ERROR: relation "invoices" is locked by transaction in another session`,
      internals: "PostgreSQL's `CREATE DATABASE ... TEMPLATE` leverages filesystem copy-on-write to clone all tables, indexes, and records almost instantaneously.",
    },
    commands: [
      {
        label: "Create template database once",
        code: "createdb app_template\npsql app_template < dump.sql",
        explanation: "Creates a master seeded database to serve as the template.",
      },
      {
        label: "Instant worktree database clone",
        code: "createdb -T app_template app_wt_auth",
        explanation: "Clones the master template in 200 milliseconds.",
      },
      {
        label: "Drop worktree database after cleanup",
        code: "dropdb app_wt_auth",
        explanation: "Reclaims storage space when the worktree is deleted.",
      },
    ],
    steps: [
      {
        title: "Prepare the base template",
        description: "Ensure `app_template` is up to date with latest main migrations.",
      },
      {
        title: "Clone for new worktree",
        command: "createdb -T app_template app_feat_checkout",
        description: "Spawn an independent database clone.",
      },
      {
        title: "Update connection string",
        description: "Set `DATABASE_URL=postgresql://localhost:5432/app_feat_checkout`.",
      },
    ],
    edgeCases: [
      {
        title: "Active connections blocking template clone",
        description: "PostgreSQL blocks `-T` if any connection is open to the template. Terminate idle connections before cloning.",
        command: "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'app_template';",
      },
    ],
    pitfalls: [
      {
        mistake: "Forgetting to drop databases when deleting worktrees",
        consequence: "Accumulates dozens of orphan databases over months.",
        solution: "Automate database cleanup in WorktreeWise workflow hooks.",
      },
    ],
    checks: [
      "Both PostgreSQL databases operate with complete independence",
      "Migrations execute without locking other branches",
    ],
    proTips: [
      "Use PostgreSQL schemas (`SET search_path TO worktree_name`) for even lighter-weight isolation without creating new databases.",
    ],
    keyTakeaways: [
      "PostgreSQL template cloning (`-T`) is the fastest way to seed worktree databases.",
      "Schema-based isolation (`search_path`) is ideal for lightweight test suites.",
    ],
    image: "/images/v1.1.0/12-create-worktree-environment-isolation.png",
    imageAlt: "WorktreeWise configuring PostgreSQL database connections per worktree",
  },

  mysql: {
    slug: "mysql",
    title: "MySQL Isolation for Concurrent Git Worktrees",
    keyword: "git worktree mysql",
    tags: ["mysql", "database", "devops", "git-worktree"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Isolate MySQL development databases across Git worktrees using branch-prefixed database schemas, automated dump/restore scripts, or separate containerized MySQL instances.",
    scenario: "A Laravel developer runs parallel worktrees for `v2-upgrade` and `bugfix-cart`. Creating `app_v2` and `app_cart` in MySQL prevents `artisan migrate:fresh` from wiping both environments.",
    lead: "MySQL is widely used across web applications. Because MySQL treats databases and schemas as synonymous concepts, creating branch-specific databases is straightforward.",
    problem: {
      title: "Destructive Migration Collisions in MySQL",
      description: "Frameworks like Laravel and Rails frequently run `migrate:fresh` or destructive test fixtures that truncate tables. Sharing one MySQL schema wipes out concurrent work.",
      errorSnippet: `SQLSTATE[42S02]: Base table or view not found: Table 'app_dev.users' doesn't exist`,
      internals: "In MySQL, `CREATE SCHEMA` and `CREATE DATABASE` are identical. Creating `app_${BRANCH_NAME}` provides full physical isolation of InnoDB tablespaces.",
    },
    commands: [
      {
        label: "Create worktree MySQL schema",
        code: "mysql -u root -e 'CREATE DATABASE app_feat_cart;'",
        explanation: "Creates an isolated database schema for the worktree.",
      },
      {
        label: "Clone schema structure from base",
        code: "mysqldump -u root -d app_dev | mysql -u root app_feat_cart",
        explanation: "Copies the schema definitions without copying heavy data.",
      },
    ],
    steps: [
      {
        title: "Create worktree database",
        command: "mysql -e 'CREATE DATABASE IF NOT EXISTS app_feat_cart'",
        description: "Provision the database.",
      },
      {
        title: "Update `.env` in worktree",
        description: "Set `DB_DATABASE=app_feat_cart`.",
      },
      {
        title: "Run migrations",
        command: "npm run db:migrate",
        description: "Run migrations independently.",
      },
    ],
    edgeCases: [
      {
        title: "MySQL user permissions",
        description: "Grant wildcard permissions `GRANT ALL ON app_*.* TO 'dev'@'localhost'` so new worktree databases work automatically.",
      },
    ],
    pitfalls: [
      {
        mistake: "Hardcoding database credentials in config files",
        consequence: "Worktrees cannot override the database name.",
        solution: "Always read the database name from environment variables.",
      },
    ],
    checks: [
      "Each worktree points to a unique MySQL database name",
      "`mysql -e 'SHOW DATABASES'` lists separate entries",
    ],
    proTips: [
      "Grant wildcard permissions to your local MySQL dev user so you never have to configure user rights for new worktrees.",
    ],
    keyTakeaways: [
      "Use `app_<worktree>` database naming conventions in MySQL.",
      "Use `mysqldump -d` to clone table structures instantly.",
    ],
    image: "/images/v1.1.0/12-create-worktree-environment-isolation.png",
    imageAlt: "WorktreeWise MySQL database isolation settings",
  },

  redis: {
    slug: "redis",
    title: "Redis Key and Session Isolation Across Git Worktrees",
    keyword: "git worktree redis",
    tags: ["redis", "cache", "sessions", "git-worktree"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Shared Redis instances leak user sessions, cache entries, and background BullMQ/Sidekiq jobs between parallel worktrees. Use key prefixing (`REDIS_PREFIX=wt_feat:`), separate logical databases (`SELECT 1`), or lightweight Docker containers.",
    scenario: "A developer logs into the app on Worktree A. When switching to Worktree B in another browser window, she is unexpectedly logged in as the same user, and background worker queues start processing jobs from the wrong branch.",
    lead: "Redis is extraordinarily fast because it runs in-memory. However, by default Redis provides a single global key namespace. If two worktrees store sessions or queue jobs with the same keys, state bleeds across branches.",
    problem: {
      title: "Cross-Contamination in Shared In-Memory Caches",
      description: "When Worktree A writes to `user:101:session`, Worktree B reads that exact data. If Worktree A altered the session serialization format, Worktree B crashes.",
      errorSnippet: `Error: Failed to deserialize session: unexpected field 'mfa_verified' in payload`,
      internals: "Redis supports 16 numbered logical databases (`db 0` through `db 15`) and universal key prefixing in most client libraries (IORedis, redis-py).",
    },
    commands: [
      {
        label: "Configure key prefix in .env",
        code: "REDIS_PREFIX=wt_feat_billing:",
        explanation: "Ensures all keys written by this worktree are prefixed uniquely.",
      },
      {
        label: "Use dedicated logical database",
        code: "REDIS_URL=redis://localhost:6379/2",
        explanation: "Directs all operations to Redis database index 2.",
      },
    ],
    steps: [
      {
        title: "Adopt key prefixing in client config",
        description: "Configure your Redis client to prefix keys with `process.env.REDIS_PREFIX || ''`.",
      },
      {
        title: "Set prefix per worktree",
        description: "Write `REDIS_PREFIX=wt_auth:` in `../worktree-auth/.env.local`.",
      },
      {
        title: "Flush only worktree keys on reset",
        command: "redis-cli --scan --pattern 'wt_auth:*' | xargs redis-cli del",
        description: "Clears only this worktree's cache without disturbing main.",
      },
    ],
    edgeCases: [
      {
        title: "Pub/Sub channels",
        description: "Pub/Sub channel names must also be prefixed (`REDIS_PREFIX + 'notifications'`) to prevent message cross-talk.",
      },
    ],
    pitfalls: [
      {
        mistake: "Running `FLUSHALL` in Redis during local testing",
        consequence: "Wipes all cached data and active sessions across ALL worktrees simultaneously.",
        solution: "Use `FLUSHDB` on isolated database indices or prefix-based deletion.",
      },
    ],
    checks: [
      "`redis-cli keys '*'` displays distinct key prefixes for each branch",
      "Background job queues only process jobs generated by the matching worktree",
    ],
    proTips: [
      "IORedis supports `keyPrefix: 'prefix:'` option natively in its constructor.",
    ],
    keyTakeaways: [
      "Always namespace Redis keys or database indices per worktree.",
      "Never run `FLUSHALL` when multiple worktrees are running.",
    ],
    image: "/images/v1.1.0/12-create-worktree-environment-isolation.png",
    imageAlt: "WorktreeWise Redis isolation configuration",
  },

  "node-modules": {
    slug: "node-modules",
    title: "Managing node_modules in Git Worktrees: Isolation vs Sharing",
    keyword: "git worktree node_modules",
    tags: ["node-modules", "javascript", "npm", "git-worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Should each Git worktree have its own `node_modules` or should they be shared? Individual `node_modules` guarantees 100% dependency safety when branches diverge, while modern package managers (pnpm, yarn) use content-addressable storage to prevent disk bloat.",
    scenario: "Branch A upgrades React from 18 to 19, while Branch B is a maintenance patch on React 18. Attempting to share a single `node_modules` folder causes compilation errors and runtime hook crashes in both branches.",
    lead: "`node_modules` directories in modern JavaScript/TypeScript projects can easily consume 500MB to 2GB of disk space. When working with multiple Git worktrees, developers must choose between complete directory isolation and storage efficiency.",
    problem: {
      title: "The Problem with Sharing Mutable node_modules",
      description: "If two worktrees share a single `node_modules` folder via symlinks, running `npm install` in Branch A mutates the package tree for Branch B. Divergent lockfiles will break builds.",
      errorSnippet: `Error: Cannot find module 'react/jsx-runtime'
Invalid hook call. Hooks can only be called inside the body of a function component.`,
      internals: "Symlinked `node_modules` fail whenever `package.json` or `package-lock.json` differ between branches. True isolation requires separate `node_modules` directories, backed by a global hardlink store (pnpm).",
    },
    commands: [
      {
        label: "Clean install in new worktree",
        code: "cd ../feature-worktree && npm ci",
        explanation: "Installs dependencies exactly matching the branch's package-lock.json.",
      },
      {
        label: "Check disk usage of node_modules",
        code: "du -sh ../*/node_modules",
        explanation: "Compares disk consumption across all worktrees.",
      },
    ],
    steps: [
      {
        title: "Create worktree",
        command: "git worktree add ../feat-ui -b feat/ui main",
        description: "Spawn the clean directory.",
      },
      {
        title: "Run npm ci",
        command: "cd ../feat-ui && npm ci",
        description: "Install branch-accurate dependencies.",
      },
      {
        title: "Verify dependency isolation",
        command: "npm list react",
        description: "Confirm the installed version matches the branch requirements.",
      },
    ],
    edgeCases: [
      {
        title: "Monorepo hoisting",
        description: "In Turborepo/Nx monorepos, root `node_modules` and package `node_modules` must both be isolated per worktree.",
      },
    ],
    pitfalls: [
      {
        mistake: "Symlinking `node_modules` across branches with different dependency versions",
        consequence: "Bizarre runtime errors and broken build outputs that disappear on clean rebuilds.",
        solution: "Keep `node_modules` separate, or use pnpm.",
      },
    ],
    checks: [
      "Each worktree contains its own `node_modules` folder",
      "Dependency upgrades in one worktree do not break sibling worktrees",
    ],
    proTips: [
      "Switching from npm to pnpm reduces multi-worktree disk overhead by 90% through automatic global content-addressable storage.",
    ],
    keyTakeaways: [
      "Never share mutable `node_modules` across branches with divergent dependencies.",
      "Use `npm ci` for fast, reproducible installs.",
      "Adopt pnpm for zero-cost per-worktree dependencies.",
    ],
    image: "/images/v1.1.0/11-create-worktree-share-node-modules.png",
    imageAlt: "WorktreeWise interface options for managing node_modules across worktrees",
  },

  "share-node-modules": {
    slug: "share-node-modules",
    title: "When and How to Safely Share node_modules in Git Worktrees",
    keyword: "share node_modules between worktrees",
    tags: ["node-modules", "symlinks", "performance", "git-worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Sharing `node_modules` via directory symlinks or Windows directory junctions is safe ONLY when both branches share identical `package.json` and `package-lock.json` files. Learn when it saves time and when to avoid it.",
    scenario: "In a 10GB enterprise monorepo, running `npm install` takes 8 minutes. For small documentation and styling tweaks where dependencies never change, sharing `node_modules` allows opening worktrees in 1 second.",
    lead: "For massive monorepos, waiting minutes for `npm install` every time you spawn a temporary worktree is a productivity killer. When dependencies are guaranteed to be identical, sharing `node_modules` can be an effective shortcut.",
    problem: {
      title: "The Risk of Shared Dependency Directories",
      description: "Sharing `node_modules` creates a single point of failure. If any developer or agent runs `npm install` or updates a package in one worktree, all linked worktrees are affected.",
      errorSnippet: `Warning: node_modules is a directory junction pointing to /repos/main/node_modules`,
      internals: "On POSIX systems, `ln -s` creates a symbolic link. On Windows, directory junctions (`mklink /J`) provide native NTFS redirection that Node.js and IDEs resolve transparently.",
    },
    commands: [
      {
        label: "Create directory junction on Windows",
        code: "mklink /J node_modules ..\\main\\node_modules",
        explanation: "Creates an NTFS junction pointing to the main repository's dependencies.",
      },
      {
        label: "Create symlink on macOS / Linux",
        code: "ln -s ../main/node_modules ./node_modules",
        explanation: "Creates a POSIX symlink to the shared dependency folder.",
      },
    ],
    steps: [
      {
        title: "Verify lockfile equality",
        command: "git diff main..HEAD -- package-lock.json",
        description: "Ensure the branch has zero dependency changes.",
      },
      {
        title: "Link node_modules",
        command: "ln -s ../main/node_modules ./node_modules",
        description: "Link to the existing installed folder.",
      },
      {
        title: "Test application build",
        command: "npm run build",
        description: "Confirm build succeeds without missing packages.",
      },
    ],
    edgeCases: [
      {
        title: "Breaking the link when dependencies change",
        description: "If the branch later needs a new package, remove the symlink and run a fresh `npm install`.",
        command: "rm node_modules && npm install",
      },
    ],
    pitfalls: [
      {
        mistake: "Sharing `node_modules` when reviewing dependency upgrade PRs",
        consequence: "Completely invalidates the review test pass.",
        solution: "Only share for non-dependency tasks (docs, styles, content).",
      },
    ],
    checks: [
      "Both worktrees have identical lockfile hashes",
      "No package management commands (`npm add`, `yarn install`) are executed in linked worktrees",
    ],
    proTips: [
      "WorktreeWise includes a 'Share node_modules' toggle during worktree creation with automated lockfile safety checks.",
    ],
    keyTakeaways: [
      "Share `node_modules` only when lockfiles are 100% identical.",
      "Saves gigabytes of disk and eliminates install wait times for small fixes.",
      "Break the symlink immediately if packages change.",
    ],
    image: "/images/v1.1.0/11-create-worktree-share-node-modules.png",
    imageAlt: "WorktreeWise Share node_modules option with automated safety validation",
  },

  pnpm: {
    slug: "pnpm",
    title: "pnpm with Git Worktrees: The Ultimate Fast Setup",
    keyword: "pnpm git worktree",
    tags: ["pnpm", "node-modules", "performance", "git-worktree"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "pnpm is the best package manager for Git worktrees. Its global content-addressable store means `pnpm install` in a new worktree takes seconds and uses hardlinks, consuming near-zero extra disk space while maintaining complete isolation.",
    scenario: "A developer manages 8 parallel Git worktrees with pnpm. All 8 worktrees install in under 4 seconds each, and the combined disk usage of all 8 worktrees is virtually identical to a single checkout.",
    lead: "pnpm was engineered from the ground up to solve the `node_modules` duplication problem. When paired with Git worktrees, pnpm delivers the holy grail: instantaneous installs, near-zero additional disk usage, and 100% dependency isolation.",
    problem: {
      title: "Why npm and Yarn Classic Struggle with Worktrees",
      description: "npm and Yarn Classic copy every package file physically into each worktree's `node_modules`. 5 worktrees = 5x the disk space and 5x the install time.",
      errorSnippet: `5 worktrees with npm: 7.5 GB disk space, 8 min install time
5 worktrees with pnpm: 1.6 GB disk space, 12 sec install time`,
      internals: "pnpm maintains a single global content-addressable store at `~/.local/share/pnpm/store`. When you run `pnpm install`, it creates hard links from the global store into the worktree's `.pnpm` virtual store. Hard links consume zero additional disk sectors.",
    },
    commands: [
      {
        label: "Fast frozen install in new worktree",
        code: "pnpm install --frozen-lockfile",
        explanation: "Links all dependencies from the global store in seconds without re-downloading.",
      },
      {
        label: "Verify hardlink storage efficiency",
        code: "pnpm store status",
        explanation: "Confirms packages are properly linked from the central store.",
      },
    ],
    steps: [
      {
        title: "Create worktree",
        command: "git worktree add ../pnpm-feat -b feat/pnpm main",
        description: "Create the directory.",
      },
      {
        title: "Run pnpm install",
        command: "cd ../pnpm-feat && pnpm install",
        output: "Packages are hard linked from the content-addressable store to the virtual store.\nProgress: resolved 842, reused 842, downloaded 0",
        description: "Notice 'reused 842, downloaded 0'—instant install!",
      },
      {
        title: "Run your application",
        command: "pnpm dev",
        description: "Application boots with isolated, hardlinked packages.",
      },
    ],
    edgeCases: [
      {
        title: "Cross-filesystem hardlink limitations",
        description: "Hard links cannot cross storage drive boundaries. Keep your worktrees on the same drive partition as your pnpm store.",
      },
    ],
    pitfalls: [
      {
        mistake: "Using `pnpm install --shamefully-hoist` without understanding implications",
        consequence: "Flattens `node_modules` and risks ghost dependency bugs.",
        solution: "Stick with pnpm's default isolated symlink structure.",
      },
    ],
    checks: [
      "`pnpm install` completes in seconds without network downloads",
      "Disk storage remains lean across all worktrees",
    ],
    proTips: [
      "If you use Git worktrees heavily for web development, migrating to pnpm is the single highest-ROI performance improvement you can make.",
    ],
    keyTakeaways: [
      "pnpm uses hard links from a global store, using near-zero extra disk per worktree.",
      "`pnpm install` in a new worktree takes seconds.",
      "Provides 100% dependency isolation with none of the duplication drawbacks.",
    ],
    image: "/images/v1.1.0/11-create-worktree-share-node-modules.png",
    imageAlt: "WorktreeWise displaying pnpm hardlink package management efficiency",
  },

  npm: {
    slug: "npm",
    title: "Best Practices for npm in Git Worktrees",
    keyword: "npm git worktree",
    tags: ["npm", "javascript", "dependencies", "git-worktree"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Optimize npm across parallel Git worktrees using `npm ci --prefer-offline`, cache sharing, and avoiding global `npm link` collisions.",
    scenario: "An engineer runs `npm install` across 3 worktrees simultaneously and encounters file lock errors and long network downloads. Switching to `npm ci --prefer-offline` cuts install times by 75%.",
    lead: "While npm historically duplicated packages on disk, modern versions of npm (v9/v10) include robust caching and offline resolution flags that make managing multiple worktrees significantly faster.",
    problem: {
      title: "Slow Installs and Lockfile Mutations",
      description: "Running `npm install` in a worktree often modifies `package-lock.json` unnecessarily and downloads packages over the network that are already cached locally.",
      errorSnippet: `$ npm install
npm WARN idealTree Already up to date, but lockfile was updated`,
      internals: "`npm ci` enforces strict adherence to `package-lock.json` and deletes any pre-existing `node_modules`, ensuring an exact, reproducible installation.",
    },
    commands: [
      {
        label: "Fast offline install",
        code: "npm ci --prefer-offline",
        explanation: "Reuses local npm cache without re-validating against registry servers.",
      },
      {
        label: "Verify npm cache integrity",
        code: "npm cache verify",
        explanation: "Ensures the shared npm cache is healthy across all worktrees.",
      },
    ],
    steps: [
      {
        title: "Create worktree",
        command: "git worktree add ../feat-npm -b feat/npm main",
        description: "Spawn the workspace.",
      },
      {
        title: "Run npm ci",
        command: "cd ../feat-npm && npm ci --prefer-offline",
        description: "Install dependencies from cache.",
      },
      {
        title: "Verify clean tree",
        command: "git status",
        description: "Confirm `package-lock.json` was not modified.",
      },
    ],
    edgeCases: [
      {
        title: "npm link collisions",
        description: "Avoid `npm link` between worktrees as global links overwrite each other. Use file paths (`npm i ../path/to/pkg`) instead.",
      },
    ],
    pitfalls: [
      {
        mistake: "Using `npm install` instead of `npm ci` in temporary worktrees",
        consequence: "Unintentionally mutates `package-lock.json` with minor dependency updates.",
        solution: "Always use `npm ci` in worktrees.",
      },
    ],
    checks: [
      "`package-lock.json` remains pristine",
      "Build passes cleanly with installed dependencies",
    ],
    proTips: [
      "Add `npm ci --prefer-offline` to your WorktreeWise post-creation workflow hook to automate dependency installation.",
    ],
    keyTakeaways: [
      "Always use `npm ci` rather than `npm install` in worktrees.",
      "`--prefer-offline` speeds up installs by reusing the local npm cache.",
    ],
    image: "/images/v1.1.0/05-workflows.png",
    imageAlt: "WorktreeWise Workflows automating npm install commands upon worktree creation",
  },

  yarn: {
    slug: "yarn",
    title: "Yarn with Git Worktrees: Zero-Installs and Cache Sharing",
    keyword: "yarn git worktree",
    tags: ["yarn", "javascript", "pnp", "git-worktree"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Yarn Modern (v3/v4) with Plug'n'Play or global cache sharing provides instant worktree onboarding. Use `yarn install --immutable` to guarantee lockfile reproducibility.",
    scenario: "A team using Yarn Berry creates a worktree. Because the project uses Zero-Installs (`.yarn/cache`), opening the worktree requires ZERO seconds of install time—it is immediately ready to run.",
    lead: "Yarn Modern (Berry) was designed with enterprise monorepos and branch switching in mind. By combining Yarn's global cache or Zero-Installs with Git worktrees, you eliminate package installation friction entirely.",
    problem: {
      title: "Lockfile Drift in Multi-Worktree Yarn Environments",
      description: "Running standard `yarn install` can mutate `yarn.lock` if the registry has newer compatible versions.",
      errorSnippet: `YN0028: The lockfile would have been modified by this install, which is explicitly forbidden.`,
      internals: "Yarn's `--immutable` flag ensures that the installation fails if `yarn.lock` needs modifications, guaranteeing branch integrity.",
    },
    commands: [
      {
        label: "Immutable install in worktree",
        code: "yarn install --immutable",
        explanation: "Installs packages strictly matching `yarn.lock` without modifications.",
      },
      {
        label: "Check Yarn cache folder",
        code: "yarn config get enableGlobalCache",
        explanation: "Confirms whether Yarn is reusing a shared global cache.",
      },
    ],
    steps: [
      {
        title: "Create worktree",
        command: "git worktree add ../yarn-task -b feat/yarn main",
        description: "Spawn the directory.",
      },
      {
        title: "Run immutable install",
        command: "cd ../yarn-task && yarn install --immutable",
        description: "Link dependencies from the shared cache.",
      },
      {
        title: "Start development",
        command: "yarn dev",
        description: "Run application instantly.",
      },
    ],
    edgeCases: [
      {
        title: "Yarn PnP with VS Code",
        description: "Run `yarn dlx @yarnpkg/sdks vscode` in the worktree if TypeScript definitions don't resolve automatically in your editor.",
      },
    ],
    pitfalls: [
      {
        mistake: "Committing large uncompressed `.yarn/cache` without git-lfs",
        consequence: "Inflates Git repository size over time.",
        solution: "Use Yarn global cache if Zero-Installs repository size is an issue.",
      },
    ],
    checks: [
      "`yarn.lock` is unchanged",
      "Application starts without module resolution errors",
    ],
    proTips: [
      "Enable `enableGlobalCache: true` in `.yarnrc.yml` to share one central package cache across all Git worktrees.",
    ],
    keyTakeaways: [
      "Use `yarn install --immutable` in worktrees.",
      "Yarn's global cache allows near-instant dependency resolution across worktrees.",
    ],
    image: "/images/v1.1.0/05-workflows.png",
    imageAlt: "WorktreeWise automating Yarn workflows across worktrees",
  },

  "python-virtualenv": {
    slug: "python-virtualenv",
    title: "Python Virtualenv Isolation Per Git Worktree",
    keyword: "git worktree virtualenv",
    tags: ["python", "virtualenv", "poetry", "git-worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Avoid Python dependency conflicts across Git worktrees by maintaining a dedicated `.venv` inside each worktree directory. Use `direnv`, Poetry, or uv to activate the correct virtual environment automatically upon entering the folder.",
    scenario: "A Python engineer tests upgrading Django from 4.2 LTS to 5.1 in a feature worktree. Because she shared a global virtualenv, running tests in the worktree accidentally breaks Django 4.2 in her main terminal.",
    lead: "Python's import system relies on `sys.path`, which is tied directly to the active virtual environment. When managing multiple Git worktrees with different dependency requirements, maintaining a dedicated virtualenv per worktree is critical.",
    problem: {
      title: "The Danger of Shared Virtual Environments",
      description: "If two worktrees share a single virtualenv, running `pip install -r requirements.txt` in Branch A overwrites package versions required by Branch B.",
      errorSnippet: `ImportError: cannot import name 'url' from 'django.conf.urls' (removed in Django 4.0+)`,
      internals: "A Python virtual environment is a lightweight folder containing a copy of the Python interpreter, symlinked standard libraries, and a `site-packages/` directory.",
    },
    commands: [
      {
        label: "Create local virtualenv in worktree",
        code: "python3 -m venv .venv\nsource .venv/bin/activate\npip install -r requirements.txt",
        explanation: "Creates an isolated virtual environment scoped to this worktree folder.",
      },
      {
        label: "Fast virtualenv with uv (sub-second)",
        code: "uv venv && source .venv/bin/activate && uv pip sync",
        explanation: "Creates and syncs the virtualenv in under 1 second using uv.",
      },
    ],
    steps: [
      {
        title: "Ensure `.venv` is in `.gitignore`",
        description: "Verify that `.venv/` is ignored in the root repository `.gitignore`.",
      },
      {
        title: "Create worktree",
        command: "git worktree add ../py-feature -b feat/py main",
        description: "Spawn the directory.",
      },
      {
        title: "Initialize virtualenv",
        command: "cd ../py-feature && python3 -m venv .venv",
        description: "Create the isolated environment.",
      },
      {
        title: "Activate and install",
        command: "source .venv/bin/activate && pip install -r requirements.txt",
        description: "Install dependencies.",
      },
    ],
    edgeCases: [
      {
        title: "Poetry in-project virtualenvs",
        description: "Configure `poetry config virtualenvs.in-project true` so Poetry automatically places `.venv` inside each worktree.",
      },
    ],
    pitfalls: [
      {
        mistake: "Activating `.venv` from the main repository inside the feature worktree",
        consequence: "Runs Python with the main repo's dependency versions.",
        solution: "Always activate the worktree's own `.venv`.",
      },
    ],
    checks: [
      "`which python` points to the `.venv` inside the current worktree",
      "`pip list` shows versions matching the branch requirements",
    ],
    proTips: [
      "Use `direnv` with `.envrc` containing `layout python3` to auto-activate the virtualenv whenever you `cd` into any worktree.",
    ],
    keyTakeaways: [
      "Always create a separate `.venv` inside each Python worktree.",
      "Use `uv` for sub-second virtualenv creation.",
      "Configure IDEs (PyCharm, VS Code) to point to the worktree's `.venv`.",
    ],
    image: "/images/v1.1.0/12-create-worktree-environment-isolation.png",
    imageAlt: "WorktreeWise interface managing Python virtualenv isolation in Git worktrees",
  },

  maven: {
    slug: "maven",
    title: "Maven Build Isolation Across Git Worktrees",
    keyword: "maven git worktree",
    tags: ["maven", "java", "build-tools", "git-worktree"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Prevent Maven snapshot contamination and concurrent build lockups across Git worktrees using local repository overrides (`-Dmaven.repo.local`) and per-worktree target directories.",
    scenario: "A Java engineer runs `mvn clean install` in Worktree A while Worktree B is running tests. Because both builds write to `~/.m2/repository`, SNAPSHOT dependencies are overwritten mid-test, failing the build.",
    lead: "Apache Maven's local repository (`~/.m2/repository`) is shared by default across all projects on a machine. When running concurrent worktrees on different branches of the same Java project, SNAPSHOT artifact collisions can cause unpredictable build failures.",
    problem: {
      title: "Maven SNAPSHOT Overwrite Contention",
      description: "When Branch A builds `1.0.0-SNAPSHOT`, it installs jars into `~/.m2`. If Branch B relies on an older `1.0.0-SNAPSHOT`, it immediately picks up Branch A's unreleased binaries.",
      errorSnippet: `[ERROR] Failed to execute goal ... SNAPSHOT artifact was modified by another process`,
      internals: "Maven uses `~/.m2/repository` as both an artifact cache and a local installation target. Overriding `maven.repo.local` isolates the cache completely.",
    },
    commands: [
      {
        label: "Isolate local repository per worktree",
        code: "mvn -Dmaven.repo.local=.m2-repo clean test",
        explanation: "Keeps SNAPSHOT artifacts strictly inside the worktree.",
      },
    ],
    steps: [
      {
        title: "Create worktree",
        command: "git worktree add ../java-feat -b feat/java main",
        description: "Spawn the workspace.",
      },
      {
        title: "Build with isolated repository",
        command: "cd ../java-feat && mvn -Dmaven.repo.local=.m2-repo test",
        description: "Executes without SNAPSHOT collisions.",
      },
    ],
    edgeCases: [
      {
        title: "Large download overhead",
        description: "If downloading dependencies into `.m2-repo` is too slow, share `~/.m2` for releases and only isolate SNAPSHOT builds.",
      },
    ],
    pitfalls: [
      {
        mistake: "Running concurrent `mvn clean install` without build isolation",
        consequence: "File locking on jar files on Windows and corrupted SNAPSHOT metadata.",
        solution: "Use `-Dmaven.repo.local` for concurrent builds.",
      },
    ],
    checks: [
      "Maven builds complete cleanly in parallel",
      "SNAPSHOT artifacts do not overwrite sibling branches",
    ],
    proTips: [
      "Configure `.mvn/maven.config` in each worktree to set `-Dmaven.repo.local` automatically.",
    ],
    keyTakeaways: [
      "Maven shares `~/.m2/repository` globally by default.",
      "Use `-Dmaven.repo.local=.m2-repo` to isolate SNAPSHOT builds.",
    ],
    image: "/images/v1.1.0/05-workflows.png",
    imageAlt: "WorktreeWise Maven workflow integration",
  },

  gradle: {
    slug: "gradle",
    title: "Gradle Daemon and Cache Isolation for Git Worktrees",
    keyword: "gradle git worktree",
    tags: ["gradle", "java", "kotlin", "git-worktree"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Optimize Gradle for parallel Git worktrees by managing Gradle daemons, sharing build caches safely, and isolating `--gradle-user-home` when running breaking toolchain updates.",
    scenario: "An Android developer tests a Gradle 8.5 migration in a worktree while running Gradle 8.2 in the main repo. The Gradle daemon crashes due to JVM daemon state conflicts.",
    lead: "Gradle's background daemon architecture provides blazing fast incremental builds. When juggling multiple worktrees with different Gradle or JDK versions, understanding daemon lifecycles ensures smooth concurrent development.",
    problem: {
      title: "Gradle Daemon Version Conflicts",
      description: "When multiple worktrees require different Gradle versions, the daemon manager spawns multiple background daemons that can exhaust system RAM.",
      errorSnippet: `Starting a Gradle Daemon, 2 busy Daemons could not be reused, use --status for details`,
      internals: "Gradle caches build outputs in `<project>/.gradle` and global artifacts in `~/.gradle`. While `<project>/.gradle` is already isolated per worktree, global daemon state is shared.",
    },
    commands: [
      {
        label: "Isolate Gradle user home",
        code: "./gradlew --gradle-user-home .gradle-home test",
        explanation: "Isolates daemons and global caches to the worktree.",
      },
      {
        label: "Inspect active daemons",
        code: "./gradlew --status",
        explanation: "Lists all running Gradle daemons and their memory usage.",
      },
    ],
    steps: [
      {
        title: "Create worktree",
        command: "git worktree add ../android-feat -b feat/android main",
        description: "Spawn directory.",
      },
      {
        title: "Run build",
        command: "cd ../android-feat && ./gradlew test",
        description: "Executes incremental build.",
      },
    ],
    edgeCases: [
      {
        title: "Build cache sharing",
        description: "Gradle's local build cache (`~/.gradle/caches/build-cache-1`) is content-addressable and 100% safe to share across worktrees.",
      },
    ],
    pitfalls: [
      {
        mistake: "Committing `.gradle/` directories to Git",
        consequence: "Pollutes repo with machine-specific binary caches.",
        solution: "Ensure `.gradle/` is in root `.gitignore`.",
      },
    ],
    checks: [
      "Gradle builds succeed across both worktrees",
      "System memory remains stable during concurrent runs",
    ],
    proTips: [
      "Gradle's build cache works across worktrees, allowing Worktree B to reuse compiled tasks from Worktree A.",
    ],
    keyTakeaways: [
      "Gradle's build cache can be safely shared across worktrees.",
      "Isolate `--gradle-user-home` when testing different Gradle/JDK versions.",
    ],
    image: "/images/v1.1.0/05-workflows.png",
    imageAlt: "WorktreeWise Gradle workflow configuration",
  },

  "cache-isolation": {
    slug: "cache-isolation",
    title: "Framework Build Cache Isolation in Git Worktrees",
    keyword: "git worktree cache",
    tags: ["caching", "nextjs", "vite", "webpack"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Modern build tools (.next/cache, .turbo, .vite, tsconfig.tsbuildinfo) cache compilation outputs. Ensure caches are isolated per worktree to prevent stale bundles and cross-branch ghost bugs.",
    scenario: "A developer checks out a worktree to test a CSS overhaul. The browser continues rendering the old styles because Next.js reuses the `.next/cache` from the previous branch.",
    lead: "Incremental compilers and bundlers (Next.js, Webpack, Vite, Turborepo) store serialized ASTs and compilation caches to accelerate hot reloads. In a multi-worktree environment, understanding cache boundaries prevents serving stale assets.",
    problem: {
      title: "Stale Cache Cross-Contamination",
      description: "If cache directories are shared or symlinked, changes on Branch A pollute the compilation cache of Branch B.",
      errorSnippet: `[Next.js] Warning: Found stale cache entry in .next/cache/webpack/client-production`,
      internals: "Build caches assume the filesystem state matches the cached hash. Because each worktree has its own directory, keeping cache folders inside the worktree guarantees isolation.",
    },
    commands: [
      {
        label: "Clear Next.js cache",
        code: "rm -rf .next/cache && npm run build",
        explanation: "Purges cached webpack artifacts cleanly.",
      },
      {
        label: "Override cache directory via environment variable",
        code: "NEXT_CACHE_DIR=.cache/wt-auth npm run build",
        explanation: "Forces Next.js to use an isolated cache folder.",
      },
    ],
    steps: [
      {
        title: "Verify cache folder location",
        description: "Ensure `.next/`, `.cache/`, and `.turbo/` live inside the worktree and are ignored by `.gitignore`.",
      },
      {
        title: "Build cleanly",
        command: "npm run build",
        description: "Generate worktree-specific cache.",
      },
    ],
    edgeCases: [
      {
        title: "TypeScript incremental build info",
        description: "`tsconfig.tsbuildinfo` must remain untracked so each worktree builds types independently.",
      },
    ],
    pitfalls: [
      {
        mistake: "Symlinking cache directories between worktrees to save disk",
        consequence: "Causes ghost compilation bugs where changes in one branch corrupt another.",
        solution: "Never share mutable build caches.",
      },
    ],
    checks: [
      "Cache folders exist independently within each worktree",
      "Hot reloading reflects changes made strictly within that worktree",
    ],
    proTips: [
      "Turborepo remote caching is safe to use across worktrees because it keys caches by input file hashes.",
    ],
    keyTakeaways: [
      "Never share local build caches between worktrees.",
      "Keep cache folders ignored in `.gitignore`.",
      "Purge caches if unexpected compilation artifacts appear.",
    ],
    image: "/images/v1.1.0/12-create-worktree-environment-isolation.png",
    imageAlt: "WorktreeWise cache and environment isolation screen",
  },

  "per-worktree-config": {
    slug: "per-worktree-config",
    title: "Configuring Git Per-Worktree Settings with worktreeConfig",
    keyword: "git worktree config",
    tags: ["git-config", "worktreeConfig", "git-internals", "git-worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Use Git's `extensions.worktreeConfig` feature to configure different `user.email`, `core.hooksPath`, or GPG signing keys for specific worktrees within the same repository.",
    scenario: "A developer contributes to an open-source repo for both personal and work projects. In the `oss-feature` worktree, commits must use `personal@gmail.com`, while `client-feature` requires `dev@company.com`.",
    lead: "By default, `git config` modifies `.git/config`, which applies globally to all worktrees in that repository. With `extensions.worktreeConfig`, Git enables per-worktree configuration files.",
    problem: {
      title: "The Single Configuration Limitation",
      description: "Running `git config user.email` in any worktree normally changes the email across the entire repository. You cannot have different Git settings per worktree without the extension.",
      errorSnippet: `$ git config user.email "work@corp.com"
# Overwrote email for all worktrees!`,
      internals: "Enabling `extensions.worktreeConfig` tells Git to read `.git/worktrees/<name>/config.worktree` in addition to the main `.git/config`.",
    },
    commands: [
      {
        label: "Enable per-worktree configuration extension",
        code: "git config extensions.worktreeConfig true",
        explanation: "Enables per-worktree config files in `.git/worktrees/<name>/config.worktree`.",
      },
      {
        label: "Set configuration for current worktree only",
        code: "git config --worktree user.email 'dev@personal.com'",
        explanation: "Writes the setting strictly to this worktree's config file.",
      },
    ],
    steps: [
      {
        title: "Enable the extension",
        command: "git config extensions.worktreeConfig true",
        description: "Activate worktree configuration support.",
      },
      {
        title: "Set worktree-specific config",
        command: "git config --worktree user.name 'Dev Agent'",
        description: "Apply setting only to this worktree.",
      },
      {
        title: "Verify the configuration scope",
        command: "git config --show-origin user.name",
        output: "file:.git/worktrees/agent/config.worktree\tDev Agent",
        description: "Confirms the setting originates from `config.worktree`.",
      },
    ],
    edgeCases: [
      {
        title: "Per-worktree hooks path",
        description: "You can set `git config --worktree core.hooksPath .githooks/agent` to run custom hooks in specific worktrees.",
      },
    ],
    pitfalls: [
      {
        mistake: "Running `git config --local` thinking it is per-worktree",
        consequence: "`--local` writes to `.git/config`, affecting ALL worktrees.",
        solution: "Use `git config --worktree`.",
      },
    ],
    checks: [
      "`git config --worktree` writes to `.git/worktrees/<id>/config.worktree`",
      "Other worktrees retain their original configuration values",
    ],
    proTips: [
      "WorktreeWise lets you set custom Git author, email, and shell settings per worktree directly in the UI.",
    ],
    keyTakeaways: [
      "Enable `git config extensions.worktreeConfig true`.",
      "Use `git config --worktree <key> <val>` for worktree-scoped settings.",
    ],
    image: "/images/v1.1.0/30-settings-worktrees.png",
    imageAlt: "WorktreeWise Settings screen configuring per-worktree options",
  },

  "sparse-checkout": {
    slug: "sparse-checkout",
    title: "Combining Git Sparse Checkout with Worktrees in Massive Monorepos",
    keyword: "git worktree sparse checkout",
    tags: ["sparse-checkout", "monorepo", "performance", "git-worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Combine `git worktree add` with `git sparse-checkout` to check out only the specific subdirectories you need in a secondary worktree. This saves gigabytes of disk space and keeps IDE indexing lightning-fast in massive monorepos.",
    scenario: "An engineer needs to update a mobile component in a 50GB monorepo containing web, backend, and documentation folders. Using sparse checkout in a worktree, she checks out only `apps/mobile` (300MB), skipping the remaining 49.7GB of files.",
    lead: "In massive enterprise monorepos, checking out the entire repository in multiple worktrees consumes immense disk space and overwhelms editor indexers. By pairing Git worktrees with sparse checkout, you get parallel branches with only the files you actually care about.",
    problem: {
      title: "Monorepo Bloat in Parallel Worktrees",
      description: "Checking out 5 worktrees in a 20GB monorepo consumes 100GB of disk and forces your IDE to index 500,000 files simultaneously.",
      errorSnippet: `Cloning all 50,000 files across 5 worktrees = 100GB disk space, 100% CPU indexing`,
      internals: "Sparse checkout instructs Git's index to populate only paths that match patterns in `.git/worktrees/<name>/info/sparse-checkout`, leaving all other files unmaterialized on disk.",
    },
    commands: [
      {
        label: "Create worktree with sparse checkout",
        code: "git worktree add --no-checkout ../wt-mobile -b feat/mobile main\ncd ../wt-mobile\ngit sparse-checkout set apps/mobile libs/ui\ngit checkout",
        explanation: "Creates worktree and checks out only `apps/mobile` and `libs/ui` folders.",
      },
      {
        label: "Inspect active sparse checkout paths",
        code: "git sparse-checkout list",
        explanation: "Displays which directories are currently materialized in this worktree.",
      },
    ],
    steps: [
      {
        title: "Create worktree without checking out files",
        command: "git worktree add --no-checkout ../wt-docs -b feat/docs main",
        description: "Creates the worktree skeleton.",
      },
      {
        title: "Initialize sparse checkout in cone mode",
        command: "cd ../wt-docs && git sparse-checkout init --cone",
        description: "Enables high-performance cone pattern matching.",
      },
      {
        title: "Define desired folders",
        command: "git sparse-checkout set docs website",
        description: "Select only the documentation and website directories.",
      },
      {
        title: "Checkout files",
        command: "git checkout",
        output: "Updating files: 100% (1,420/1,420), done.",
        description: "Materializes only the selected 1,420 files instead of the full 50,000.",
      },
    ],
    edgeCases: [
      {
        title: "Root files (package.json, tsconfig.json)",
        description: "In cone mode, Git automatically includes all files in the root directory so build configs remain accessible.",
      },
    ],
    pitfalls: [
      {
        mistake: "Running `git sparse-checkout disable` in a worktree",
        consequence: "Immediately checks out all 50,000 files, filling the disk.",
        solution: "Use `git sparse-checkout add <dir>` to expand paths incrementally.",
      },
    ],
    checks: [
      "Only selected directories appear on disk",
      "`git sparse-checkout list` matches required folders",
    ],
    proTips: [
      "WorktreeWise includes a graphical Sparse Checkout selector during worktree creation so you can choose which folders to include with checkboxes.",
    ],
    keyTakeaways: [
      "Pairing worktrees with sparse checkout solves monorepo bloat.",
      "Use `git worktree add --no-checkout` before configuring sparse paths.",
      "Cone mode provides the fastest path matching performance.",
    ],
    image: "/images/v1.1.0/10-create-worktree-sparse-checkout.png",
    imageAlt: "WorktreeWise graphical Sparse Checkout configuration for Git worktrees",
  },
};

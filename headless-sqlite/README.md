# headless-sqlite

 Version: 0.9.1

 date    : 2025/09/10

 update :

***

SQLite + Bun , Headless CMS , 

***
### API document


***
### setup
* .env
* DB_FILE_NAME: db file name 
* API_KEY: API auth key

```
API_KEY=1234
DB_FILE_NAME=file:local.db
```

***
* migrate
```
bunx drizzle-kit generate
bunx drizzle-kit migrate
```
***
* dev-start
```
bun run build
bun run dev
```

***
### blog


***

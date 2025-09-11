# headless-sqlite

 Version: 0.9.1

 date    : 2025/09/10

 update :

***

SQLite + Bun , Headless CMS , 

***
### API document

https://github.com/kuc-arc-f/bun_41ex/blob/main/headless-sqlite/document/api.md

***
### setup
* .env
* DB_FILE_NAME: db file name 
* API_KEY: API auth key
* USER_NAME , PASSWORD: login name ,password

```
API_KEY=1234
DB_FILE_NAME=file:local.db
USER_NAME = "user1@example.com"
PASSWORD = "123"
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

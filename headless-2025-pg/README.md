# headless-2025-pg

 Version: 0.9.1

 date    : 2025/09/06

 update : 2025/09/07

***

PGLite WASM + Bun , Headless CMS , 

***
### API document

https://github.com/kuc-arc-f/bun_41ex/blob/main/headless-2025-pg/document/api.md

***
### setup
* .env
* DATA_DIR: DB data path 
* API_KEY: API auth key
* USER_NAME , PASSWORD : login name, password

```
DATA_DIR="/path/cmsdata"
API_KEY=1234
USER_NAME = "user1@example.com"
PASSWORD = "123"
```

***
* TABLE
```
bun run db_init.ts
```
***
* dev-start
```
npm run build
npm run dev
```

***
### blog

https://zenn.dev/link/comments/2523b02cd7da8b

***

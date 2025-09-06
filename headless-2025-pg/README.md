# headless-2025-pg

 Version: 0.9.1

 date    : 2025/09/06

 update :

***

PGLite + Bun , Headless CMS , 

***
### API document


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


***

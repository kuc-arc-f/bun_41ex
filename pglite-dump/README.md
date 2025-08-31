# pglite-dump

 Version: 0.9.1

 date    : 2025/08/30
 
 update  :

***

PGLite WASM ,  export tool

***
* setup
* .env

```
DATA_DIR="/path/pgdata"
```
***
* CREATE TABLE : ./create_table.sql

```
CREATE TABLE IF NOT EXISTS item (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
***
### export

* ADD Data
* export: dump.sql , output
```
bun run export.ts
```
***
### import

* DELETE from item;
* import
```
bun run import.ts
```

***
### blog 

https://zenn.dev/link/comments/bf90276f75c396

***

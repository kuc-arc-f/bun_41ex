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
### export

* ADD Data
* export: dump.sql , output
```
bun run export.ts
```
***
### import

* DROP TABLE item;
* CREATE TABLE : ./create_table.sql
* import
```
bun run import.ts
```

***
### blog 

***

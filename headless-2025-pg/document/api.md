# API example

***
### List

* curl sample
* your-key: API_KEY 
* content: data type

```
curl -H "Authorization: your-key" http://localhost:3000/api/data/list?content=todo
```

***
* order (option)
* curl sample
* your-key: API_KEY 
* order: asc (created_at ASC ) desc (created_at DESC)

```
curl -H "Authorization: your-key" "http://localhost:3000/api/data/list?content=test1&order=asc"
```
***
* node.js: List

```js
const start = async function() {
  try{
    const response = await fetch("http://localhost:3000/api/data/list?content=test1", {
      method: 'GET',
      headers: {
        'Authorization': 'your-key',
      }
    });
    if (!response.ok) {
      const text = await response.text();
      console.log(text)
      throw new Error('Failed to item');
    }
    const json = await response.json();
    console.log(json)
  }catch(e){console.log(e)}
}
start();
```

***
### GetOne

* curl sample
* your-key: API_KEY 
* content: data type
* id: id data

```
curl -H "Authorization: your-key" "http://localhost:3000/api/data/getone?content=test2&id=e9723af2-4a3f-45e2-8f07-9055d91ae9f8"
```

***
### Create

* curl sample
* your-key: API_KEY 
* content: data type
* data: json data

* data.json
```
{
  "content":"test1", 
  "data": "{\"title\": \"test-1\"}"
}
```
* curl
```
curl -X POST -H "Content-Type: application/json" -H "Authorization: your-key" -d @data.json http://localhost:3000/api/data/create 
```

***
* node.js: create

```js

const start = async function() {
  try{
      const item = {
        content: "test2",
        data: JSON.stringify({
          "title": "tit-22",
          "body": "body-22",
        })
      }
      const response = await fetch("http://localhost:3000/api/data/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'your-key',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      const text = await response.text();
      console.log(text);
      throw new Error('Failed to create item');
    }
    return response.json();
  }catch(e){console.log(e)}
}
start();

```
***
### Delete

* curl sample
* your-key: API_KEY 
* content: data type
* id: id data

* data.json
```
{
  "content": "test2",
  "id": "7b542eb7-5012-4c17-8ad1-c0e747a39e05"
}

```
* curl
```
curl -X POST -H "Content-Type: application/json" -H "Authorization: your-key" -d @data.json http://localhost:3000/api/data/delete
```
***
* node.js: delete

```js
const start = async function() {
  try{
      const item = {
        content: "test2",
        id: "ddccd2b3-cfb2-40a0-ad83-5257e45a1268"
      }      
      const response = await fetch("http://localhost:3000/api/data/delete", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'your-key',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      const text = await response.text();
      console.log(text);
      throw new Error('Failed to create item');
    }
    return response.json();
  }catch(e){console.log(e)}
}
start();

```

***
### Update

* curl sample
* your-key: API_KEY 
* id: id data
* content: data type
* data: json data

* data.json
```
{
  "id": "577690a8-d5d4-4e9c-a3e1-20efd78a67fa",
  "content":"test1", 
  "data": "{\"title\": \"test-update\"}"
}
```
* curl
```
curl -X POST -H "Content-Type: application/json" -H "Authorization: your-key" -d @data.json http://localhost:3000/api/data/update 

```

* node.js: update

```js

const start = async function() {
  try{
      const item = {
        id: "1b1a7f4d-a7a4-4caa-aa5f-369bab0d714f",
        content: "test2",
        data: JSON.stringify({
          "title": "tit-update-1b",
          "body": "body-update-1b",
        })
      }
      const response = await fetch("http://localhost:3000/api/data/update", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'your-key',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      const text = await response.text();
      console.log(text);
      throw new Error('Failed to item');
    }
    return response.json();
  }catch(e){console.log(e)}
}
start();


```
***
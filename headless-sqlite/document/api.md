# API example

***
### List

* curl sample
* your-key: API_KEY 
* content: data type

```
curl -H "Authorization: your-key" "http://localhost:3000/api/data/list?content=test2"
```

***
* order (option)
* curl sample
* your-key: API_KEY 
* order: asc (created_at ASC ) desc (created_at DESC)

```
curl -H "Authorization: your-key" "http://localhost:3000/api/data/list?content=test2&order=asc"
```
***
* node.js: List

```js
const start = async function() {
  try{
    const response = await fetch("http://localhost:3000/api/data/list?content=test2&order=desc", {
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
curl -H "Authorization: your-key" "http://localhost:3000/api/data/getone?content=test3&id=5
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
        content: "test3",
        data: JSON.stringify({
          "title": "tit-3b",
          "body": "body-3b",
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
  "id": 5
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
        id: 3
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
  "id": 4,
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
        id: 5,
        content: "test3",
        data: JSON.stringify({
          "title": "tit-update-5d",
          "body": "body-update-5d",
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
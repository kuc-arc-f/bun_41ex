import express from 'express';
const router = express.Router();

const CONTENT = "sort";
/**
*
* @param
*
* @return
*/
router.post('/list', async function(req: any, res: any) {
  try {
    console.log("#sort /list");
    const body = req.body;
    console.log(body)
    const url = process.env.EXTERNAL_API_URL;	
    const apikey = process.env.API_KEY;	
    const path = "/api/data/list?content=" + CONTENT 
    console.log("url=", url + path)
    //console.log("apikey=", apikey)
    const response = await fetch(url + path, {
      method: 'GET',
      headers: {
        'Authorization': apikey,
      }
    });    
    if(response.ok === false){
      console.error("Error, res.ok = NG");
      throw new Error("Error, res.ok = NG");
    }
    const json = await response.json();
    console.log(json)   
    res.send({ret: 200, data: json.data});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/create', async function(req: any, res: any) {
  try {
    const body = req.body;
    console.log(body)
    const item = {
      content: CONTENT,
      data: JSON.stringify(body),
    };
    console.log(item)
    const sendBody = JSON.stringify(item);	
    const url = process.env.EXTERNAL_API_URL;	
    const apikey = process.env.API_KEY;
    const path = "/api/data/create"; 
    console.log("url=", url + path)
    const response = await fetch(url + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apikey,
      },      
      body: sendBody
    });
    if(response.ok === false){
      console.error("Error, res.ok = NG");
      throw new Error("Error, res.ok = NG");
    }
    const json = await response.json();    
    res.send({ret: 200, text: ""});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/delete', async function(req: any, res: any) {
  try {
    const body = req.body;
    console.log(body);
    const sendBody = JSON.stringify(body);	
    const url = process.env.EXTERNAL_API_URL;	
    const apikey = process.env.API_KEY;
    const path = "/api/data/delete"; 
    console.log("url=", url + path)
    const response = await fetch(url + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apikey,
      },      
      body: sendBody
    });
    if(response.ok === false){
      console.error("Error, res.ok = NG");
      throw new Error("Error, res.ok = NG");
    }
    const json = await response.json();    
    res.send({ret: 200, text: ""});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


router.post('/update', async function(req: any, res: any) {
  try {
    const body = req.body;
    console.log(body)
    const item = {
      id: body.id, 
      content: CONTENT,
      data: JSON.stringify(body),
    };
    console.log(item)
    const sendBody = JSON.stringify(item);	
    const url = process.env.EXTERNAL_API_URL;
    const apikey = process.env.API_KEY;	
    const path = "/api/data/update"; 
    console.log("url=", url + path)
    const response = await fetch(url + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apikey,
      },      
      body: sendBody
    });
    if(response.ok === false){
      console.error("Error, res.ok = NG");
      throw new Error("Error, res.ok = NG");
    }
    const json = await response.json();    
    res.send({ret: 200, text: ""});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;

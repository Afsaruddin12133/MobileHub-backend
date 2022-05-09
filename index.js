const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000


// middleware..
app.use(cors())
app.use(express.json())

// stating api
app.get('/', (req, res) => {
  res.send('Hello MobileHub!')
})

//conected app with mongodb
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.xdwvt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)

 const run =  async() =>{
    try {
        await client.connect();
        const productCollection = client.db("Mobilehubdb").collection("Product");
        app.get('/products',async(req,res)=>{
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products)
        })
      }
      finally {
    
      }
 }
 run().catch(console.dir)
// listening port
app.listen(port, () => {
  console.log(`Mobilehub app listening on port ${port}`)
})
const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        app.post('/products',async(req,res)=>{
           const newUser = req.body;
           const result = await productCollection.insertOne(newUser)
           res.send({result : "sucess"})
        })
        app.delete('/product/:id', async(req,res)=>{
          const productId = req.params.id;
          const query = {_id : ObjectId(id)};
          const result = await productCollection.deleteOne(query)
          res.send(result);
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
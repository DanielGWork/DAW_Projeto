------------------
      Server
------------------

- npm init
- npm i typescript --save-dev
- npm i @types/node --save-dev
- npm i express --save-dev
- npm i @types/express --save-dev
- npm i nodemon --save-dev
- npm i cors --save-dev
- npm i @types/cors --save-dev
- npm i mongoose
- npm i -D @types/express@4 -> por causo do authentication.ts (register)
- npm i compression
- npm i cokie
- npm i @types/body-parser --save-dev 
- npm i @types/cookie-parser --save-dev
- npm i lodash
- npm i @types/lodash

------------------
      DataBase
------------------

mongodb+srv://admin:admin@backenddb.qfqwr.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@backenddb.qfqwr.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


-----------------------------
Primiero Teste Para Registrar
-----------------------------

Utilizando o Postman

--- Post (raw) --- 
{
    "email": "teste@123.com",
    "password": "teste123",
    "username": "teste"
}

--------------------
Recebemos um 200(ok)
--------------------

{
    "username": "teste",
    "email": "teste@123.com",
    "authentication": {
        "password": "bbd85c3025538529cf9691338810815fe64b1769078baabbc751e2ba9dba68a5",
        "salt": "vMVA9jHr9t69YJSYYb6CXgUOn/cmbWBx9TjFIdWwBCOzc3eQrtLFzq9ggMzDqt2/TcKj2l430WNCCs2Jp0CoEU9eO9L0KbPJcA5DCDQF5tFfIajiB34S49ykhsCroUCshhQPZIGCn22Hcz39c72pP/ysdgFgHDgLrlCNWNj9IzU="
    },
    "_id": "676b572ed12c177060445ec4",
    "__v": 0
}

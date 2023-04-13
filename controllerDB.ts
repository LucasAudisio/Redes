var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/Chat";

async function run() {
    try {
      const database = MongoClient.db('Chat');
      const usuarios = database.collection('Usuario');
      // Query for a movie that has the title 'Back to the Future'
      const query = { id: 0 };
      const usuario = await usuarios.findOne(query);
      console.log(usuario);
    } finally {
      // Ensures that the client will close when you finish/error
      await MongoClient.close();
    }
  }
  run().catch(console.dir);
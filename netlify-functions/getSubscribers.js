// Import the MongoClient class from the 'mongodb'const { MongoClient } = require('mongodb');
const { MongoClient } = require('mongodb');

// Define the handler function which is the entry point for AWS Lambda or similar serverless functions.
exports.handler = async (event, context) => {

  // connect to the MongoDB database.
  // MongoDB Atlas URI.
  const client = new MongoClient("mongodb+srv://mohansinghmahecha2000:uRyluGTuCIQXjefE@cluster0.ue1ll.mongodb.net/youtube-backend");

  try {
      // Connect to mongodb server.
    await client.connect();
    //our database name
    const database = client.db('youtube-backend');
    //our database collection
    const collection = database.collection('subscribers');
    //fet all and convert to array 
    const subscribers = await collection.find({}).toArray();
    
    return {
      statusCode: 200,
      body: JSON.stringify(subscribers),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to fetch data' }),
    };
  } finally {
    await client.close();
  }
};

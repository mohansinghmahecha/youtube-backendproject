const { MongoClient } = require('mongodb');


exports.handler = async (event, context) => {
  const client = new MongoClient("mongodb+srv://mohansinghmahecha2000:uRyluGTuCIQXjefE@cluster0.ue1ll.mongodb.net/youtube-backend");

  try {
    await client.connect();
    const database = client.db('youtube-backend');
    const collection = database.collection('subscribers');
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

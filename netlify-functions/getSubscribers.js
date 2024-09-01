const { MongoClient, ObjectId } = require("mongodb");

exports.handler = async (event, context) => {
  const client = new MongoClient(
    "mongodb+srv://mohansinghmahecha2000:uRyluGTuCIQXjefE@cluster0.ue1ll.mongodb.net/youtube-backend",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  try {
    await client.connect();
    const database = client.db("youtube-backend");
    const collection = database.collection("subscribers");

    let subscribers;

    // Check if the request path ends with an ID
    const pathParts = event.path.split("/");
    const id = pathParts[pathParts.length - 1];

    if (pathParts.length > 2 && id.match(/^[0-9a-fA-F]{24}$/)) {
      // If an ID is provided, fetch the subscriber by ID
      subscribers = await collection.findOne({ _id: new ObjectId(id) });

      if (!subscribers) {
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: "No subscriber found with the given ID",
          }),
        };
      }
    } else if (event.path.endsWith("/names")) {
      // If the path ends with '/names', fetch subscribers with specific fields
      subscribers = await collection
        .find({}, { projection: { name: 1, subscribedChannel: 1, _id: 0 } })
        .toArray();
    } else {
      // If no specific ID or '/names' is provided, fetch all subscribers
      subscribers = await collection.find({}).toArray();
    }

    return {
      statusCode: 200,
      body: JSON.stringify(subscribers),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  } finally {
    await client.close();
  }
};

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

    // Extract the ID from the path
    const pathParts = event.path.split("/");
    const id = pathParts[pathParts.length - 1];

    if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
      // Fetch the subscriber by ID
      subscribers = await collection.findOne({ _id: new ObjectId(id) });

      if (!subscribers) {
        // Respond with 404 if no subscriber is found
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

    // Return a successful response with the data
    return {
      statusCode: 200,
      body: JSON.stringify(subscribers),
    };
  } catch (error) {
    // Return a 400 status code for any errors
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  } finally {
    // Ensure the client is always closed
    await client.close();
  }
};

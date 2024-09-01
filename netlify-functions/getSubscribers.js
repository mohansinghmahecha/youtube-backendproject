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

    // Check the route to handle different cases
    const pathParts = event.path.split("/");
    const id = pathParts[pathParts.length - 1];

    if (
      pathParts.length === 3 &&
      pathParts[1] === "subscribers" &&
      id.match(/^[0-9a-fA-F]{24}$/)
    ) {
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
    } else if (pathParts.length === 2 && pathParts[1] === "subscribers") {
      // If the path is '/subscribers', fetch all subscribers
      subscribers = await collection.find({}).toArray();
    } else {
      // Return 400 Bad Request if the path does not match any known routes
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid route",
        }),
      };
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

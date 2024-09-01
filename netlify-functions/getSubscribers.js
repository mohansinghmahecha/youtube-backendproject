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

    if (event.path === "/.netlify/functions/getSubscribers/subscribers") {
      // Route: /subscribers
      subscribers = await collection.find({}).toArray();
    } else if (
      event.path === "/.netlify/functions/getSubscribers/subscribers/names"
    ) {
      // Route: /subscribers/names
      subscribers = await collection
        .find({}, { projection: { name: 1, subscribedChannel: 1, _id: 0 } })
        .toArray();
    } else if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
      // Route: /subscribers/:id
      subscribers = await collection.findOne({ _id: new ObjectId(id) });

      if (!subscribers) {
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: "No subscriber found with the given ID",
          }),
        };
      }
    } else if (id) {
      // If the ID format is incorrect, respond with a 400 Bad Request
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid subscriber ID format",
        }),
      };
    } else {
      // Handle unexpected routes
      return {
        statusCode: 404,
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

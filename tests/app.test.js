const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../App");

const TEST_DATABASE_URL = "mongodb://localhost:27017/testing-database";

beforeAll(async () => {
  await mongoose.connect(TEST_DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /subscribers", () => {
  let testSubscriberId;

  beforeEach(async () => {
    await mongoose.connection.db.collection("subscribers").deleteMany({});

    const result = await mongoose.connection.db
      .collection("subscribers")
      .insertOne({
        name: "Mohan singh",
        subscribedChannel: "Test Almabetter",
      });

    testSubscriberId = result.insertedId.toString();
  });

  it("should return a subscriber by ID", async () => {
    const response = await request(app).get(`/subscribers/${testSubscriberId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", testSubscriberId);
    expect(response.body).toHaveProperty("name", "Mohan singh");
    expect(response.body).toHaveProperty(
      "subscribedChannel",
      "Test Almabetter"
    );
  });

  it("should return 400 if subscriber ID is invalid", async () => {
    const response = await request(app).get("/subscribers/invalidId");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      'Cast to ObjectId failed for value "invalidId" (type string) at path "_id" for model "Subscriber"'
    );
  });
});

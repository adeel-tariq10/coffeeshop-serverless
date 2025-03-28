require('dotenv').config();

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const express = require("express");
const serverless = require("serverless-http");

const app = express();

const USERS_TABLE = process.env.USERS_TABLE;
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

app.use(express.json());

app.get("/users/:userId", async (req, res) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };

  try {
    const command = new GetCommand(params);
    const { Item } = await docClient.send(command);
    if (Item) {
      const { userId, name } = Item;
      res.json({ userId, name });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' });
    }
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve user" });
  }
});

app.post("/users", async (req, res) => {
  const { userId, name } = req.body;
  if (typeof userId !== "string") {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: { userId, name },
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);
    res.json({ userId, name });
  } catch (error) {
    res.status(500).json({ error: "Could not create user" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.createUser = async (event) => {
  const { userId, name } = JSON.parse(event.body);
  
  // Check if user already exists
  const getParams = {
    TableName: process.env.USERS_TABLE,
    Key: { userId },
  };
  
  const { Item } = await docClient.send(new GetCommand(getParams));
  if (Item) {
    return { statusCode: 409, body: JSON.stringify({ error: "User already exists" }) }; // Conflict
  }

  const params = {
    TableName: process.env.USERS_TABLE,
    Item: { userId, name },
  };
  await docClient.send(new PutCommand(params));
  return { statusCode: 201, body: JSON.stringify({ userId, name }) };
};

module.exports.getUser = async (event) => {
  const { userId } = event.pathParameters;
  const params = {
    TableName: process.env.USERS_TABLE,
    Key: { userId },
  };
  const { Item } = await docClient.send(new GetCommand(params));
  return Item ? { statusCode: 200, body: JSON.stringify(Item) } : { statusCode: 404, body: JSON.stringify({ error: "User not found" }) };
};

module.exports.updateUser = async (event) => {
  const { userId } = event.pathParameters;
  const { name } = JSON.parse(event.body);
  
  // Check if user exists
  const getParams = {
    TableName: process.env.USERS_TABLE,
    Key: { userId },
  };
  
  const { Item } = await docClient.send(new GetCommand(getParams));
  if (!Item) {
    return { statusCode: 404, body: JSON.stringify({ error: "User not found" }) }; // Not Found
  }

  const params = {
    TableName: process.env.USERS_TABLE,
    Key: { userId },
    UpdateExpression: "set name = :name",
    ExpressionAttributeValues: {
      ":name": name,
    },
  };
  await docClient.send(new UpdateCommand(params));
  return { statusCode: 200, body: JSON.stringify({ userId, name }) };
};

module.exports.deleteUser = async (event) => {
  const { userId } = event.pathParameters;
  
  // Check if user exists
  const getParams = {
    TableName: process.env.USERS_TABLE,
    Key: { userId },
  };
  
  const { Item } = await docClient.send(new GetCommand(getParams));
  if (!Item) {
    return { statusCode: 404, body: JSON.stringify({ error: "User not found" }) }; // Not Found
  }

  const params = {
    TableName: process.env.USERS_TABLE,
    Key: { userId },
  };
  await docClient.send(new DeleteCommand(params));
  return { statusCode: 204 }; // No Content
};

exports.handler = serverless(app);

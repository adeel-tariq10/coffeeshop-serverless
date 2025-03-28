<!--
title: 'Serverless Framework Node Express API service backed by DynamoDB on AWS'
description: 'This template demonstrates how to develop and deploy a simple Node Express API service backed by DynamoDB running on AWS Lambda using the Serverless Framework.'
layout: Doc
framework: v4
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, Inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework Node Express API on AWS

This template demonstrates how to develop and deploy a simple Node Express API service, backed by a DynamoDB table, running on AWS Lambda using the Serverless Framework.

This template configures multiple functions for handling CRUD operations on user data. The Express.js application exposes the following endpoints:

## API Endpoints

### 1. Create User (POST)
- **Endpoint**: 
  ```
  POST - https://<your-api-id>.execute-api.us-east-1.amazonaws.com/dev/users
  ```
- **Request Body**:
  ```json
  {
    "userId": "uniqueUserId",
    "name": "User Name"
  }
  ```
- **Response**:
  ```json
  {
    "userId": "uniqueUserId",
    "name": "User Name"
  }
  ```

### 2. Get User (GET)
- **Endpoint**: 
  ```
  GET - https://<your-api-id>.execute-api.us-east-1.amazonaws.com/dev/users/{userId}
  ```
- **Example**: 
  ```
  GET - https://<your-api-id>.execute-api.us-east-1.amazonaws.com/dev/users/uniqueUserId
  ```
- **Response**:
  ```json
  {
    "userId": "uniqueUserId",
    "name": "User Name"
  }
  ```

### 3. Update User (PUT)
- **Endpoint**: 
  ```
  PUT - https://<your-api-id>.execute-api.us-east-1.amazonaws.com/dev/users/{userId}
  ```
- **Request Body**:
  ```json
  {
    "name": "Updated User Name"
  }
  ```
- **Response**:
  ```json
  {
    "userId": "uniqueUserId",
    "name": "Updated User Name"
  }
  ```

### 4. Delete User (DELETE)
- **Endpoint**: 
  ```
  DELETE - https://<your-api-id>.execute-api.us-east-1.amazonaws.com/dev/users/{userId}
  ```
- **Example**: 
  ```
  DELETE - https://<your-api-id>.execute-api.us-east-1.amazonaws.com/dev/users/uniqueUserId
  ```
- **Response**: 
  No content (204 status).

## Usage

### Deployment

Install dependencies with:

```
npm install
```

and then deploy with:

```
serverless deploy --profile serverless
```

After running deploy, you should see output similar to:

```
Deploying "my-serverless-api" to stage "dev" (us-east-1)
✔ Service deployed to stack my-serverless-api-dev (109s)
endpoint: ANY - https://<your-api-id>.execute-api.us-east-1.amazonaws.com/dev
functions:
createUser: my-serverless-api-dev-createUser (3.8 MB)
getUser: my-serverless-api-dev-getUser (3.8 MB)
updateUser: my-serverless-api-dev-updateUser (3.8 MB)
deleteUser: my-serverless-api-dev-deleteUser (3.8 MB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [`httpApi` event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/). Additionally, in current configuration, the DynamoDB table will be removed when running `serverless remove`. To retain the DynamoDB table even after removal of the stack, add `DeletionPolicy: Retain` to its resource definition.

### Invocation

After successful deployment, you can create a new user by calling the corresponding endpoint:

```bash
curl --request POST 'https://<your-api-id>.execute-api.us-east-1.amazonaws.com/dev/users' --header 'Content-Type: application/json' --data-raw '{"userId": "uniqueUserId", "name": "User Name"}'
```

Which should result in the following response:

```json
{ "userId": "uniqueUserId", "name": "User Name" }
```

You can later retrieve the user by `userId` by calling the following endpoint:

```bash
curl 'https://<your-api-id>.execute-api.us-east-1.amazonaws.com/dev/users/uniqueUserId'
```

Which should result in the following response:

```json
{ "userId": "uniqueUserId", "name": "User Name" }
```

### Local Development

The easiest way to develop and test your function is to use the `dev` command:

```
serverless dev
```

This will start a local emulator of AWS Lambda and tunnel your requests to and from AWS Lambda, allowing you to interact with your function as if it were running in the cloud.

When you run `serverless dev`, you should see output similar to:

```
Dev ϟ Mode

Dev Mode redirects live AWS Lambda events to your local code enabling you to develop faster without the slowness of deploying changes.

Functions:
  createUser: coffeeshop-serverless-dev-createUser (80 kB)
  getUser: coffeeshop-serverless-dev-getUser (80 kB)
  updateUser: coffeeshop-serverless-dev-updateUser (80 kB)
  deleteUser: coffeeshop-serverless-dev-deleteUser (80 kB)

Endpoints:
  POST - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/users
  GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/users/{userId}
  PUT - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/users/{userId}
  DELETE - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/users/{userId}
```

Now you can invoke the function as before, but this time the function will be executed locally. You can develop your function locally, invoke it, and see the results immediately without having to re-deploy.

When you are done developing, don't forget to run `serverless deploy` to deploy the function to the cloud.

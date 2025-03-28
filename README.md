# Coffeeshop Serverless

A serverless implementation of a Coffeeshop application using the Serverless Framework. This application leverages AWS services such as AWS Lambda, DynamoDB, and Cognito to provide a scalable and efficient solution for managing coffee orders and user profiles.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Setup](#project-setup)
- [Development](#development)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Useful Commands](#useful-commands)
- [Resources](#resources)
- [User Management](#user-management)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Linting JavaScript Files](#linting-javascript-files)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Ensure you have Node.js installed (version 20.17.0 or later).
- **AWS Account**: You need an AWS account with appropriate permissions to create and manage resources.
- **AWS CLI**: Optionally, install and configure the AWS Command Line Interface (CLI) for easier management of AWS resources.

## Installation

Follow these steps to install the Serverless Framework:

1. **Install Serverless Framework globally**:
   ```bash
   npm install -g serverless
   ```

2. **Verify installation**:
   ```bash
   serverless --version
   ```

3. **Update Serverless Framework (if needed)**:
   ```bash
   serverless update
   ```

## Project Setup

1. **Create a new project**:
   You can use the interactive setup provided by the Serverless Framework. Run the following command:
   ```bash
   serverless
   ```
   This command will guide you through the setup process, asking for details such as:
   - Project name
   - AWS credentials (Access Key and Secret Key)
   - Template selection (choose `AWS / Node.js / Express API with DynamoDB` for this project)

2. **Install project dependencies**:
   After the project is created, navigate into your project directory:
   ```bash
   cd coffeeshop-serverless
   ```
   Then install the necessary dependencies:
   ```bash
   npm install
   ```

## Development

1. **Start development mode**:
   ```bash
   serverless dev
   ```

2. **Deploy to AWS**:
   You can deploy your service to different stages (e.g., dev, prod) using the following command:
   ```bash
   serverless deploy --stage dev
   ```
   Replace `dev` with your desired stage name (e.g., `prod` for production).

3. **Deploy individual function**:
   ```bash
   serverless deploy function -f functionName --stage dev
   ```

4. **View logs**:
   ```bash
   serverless logs -f functionName -t --stage dev
   ```

## Usage

### API Endpoints

#### 1. Create User (POST)
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

#### 2. Get User (GET)
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

#### 3. Update User (PUT)
- **Endpoint**: 
  ```
  PUT - https://<your-api-id>.execute-api.us-east-1.amazonaws.com/dev/users/{userId}
  ```
- **Request Body**:
  ```json
  {
    "userId": "uniqueUserId",
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

#### 4. Delete User (DELETE)
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

## Project Structure

```coffeeshop-serverless/
├── .gitignore          # Specifies files and directories to ignore in Git
├── .serverless         # Contains Serverless Framework generated files
│ ├── cloudformation-template-update-stack.json      # CloudFormation template for updates
│ ├── coffeeshop-serverless.zip # Deployed service package
│ ├── meta.json                 # Metadata about the service
│ └── serverless-state.json     # State information for the service
├── README.md                   # Project documentation
├── Setup.md            # Setup instructions for the project
├── handler.js          # Main application logic and Lambda function handlers
├── package-lock.json   # Lock file for npm dependencies
├── package.json        # Project dependencies and scripts
└── serverless.yml      # Serverless Framework configuration file
```

## Useful Commands

- `serverless` - Interactive setup workflow
- `serverless deploy --stage <stage>` - Deploy entire service to a specific stage
- `serverless dev` - Start development mode
- `serverless invoke -f functionName --stage <stage>` - Invoke a specific function in a specific stage
- `serverless logs -f functionName -t --stage <stage>` - Stream logs for a specific function in a specific stage
- `serverless remove --stage <stage>` - Remove service and all associated resources for a specific stage

## Tech Stack

- **Serverless Framework**: For deploying serverless applications.
- **AWS Lambda**: For running backend code in response to events.
- **AWS DynamoDB**: For storing user and order data.
- **Node.js**: For server-side JavaScript execution.
- **TypeScript**: For type-safe JavaScript development.
- **AWS Cognito**: For user authentication and management.

## Resources

- [Serverless Framework Documentation](https://www.serverless.com/framework/docs)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [Serverless Guru Code Challenge](https://github.com/serverless-guru/code-challenges)

## Contributions

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Linting JavaScript Files

To ensure code quality, we use ESLint for linting JavaScript files. Follow the steps below to lint the code locally:

1. **Install ESLint** (if not already installed):
   ```bash
   npm install eslint --save-dev
   ```

2. **Install ESLint Define Config**:
   You also need to install the `eslint-define-config` package:
   ```bash
   npm install eslint-define-config --save-dev
   ```

3. **Set Up Package.json**:
   Ensure your `package.json` includes the following line to enable ES module syntax:
   ```json
   {
     "type": "module",
     // ... other fields ...
   }
   ```

4. **Create or Update ESLint Configuration**:
   Create or update the file named `eslint.config.js` in the root of your project with the following content:
   ```javascript
   import { defineConfig } from 'eslint-define-config';

   export default defineConfig([
     {
       languageOptions: {
         globals: {
           window: 'readonly',
           document: 'readonly',
           // Add other globals as needed
         },
         parserOptions: {
           ecmaVersion: 2021,
           sourceType: 'module',
         },
       },
       rules: {
         'no-console': 'warn',
         'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
         'eqeqeq': 'error',
         'semi': ['error', 'always'],
         'quotes': ['error', 'single'],
         // Add other custom rules as needed
       },
     },
   ]);
   ```

5. **Run ESLint**:
   To lint all JavaScript files in the project, run:
   ```bash
   npx eslint . --ext .js,.jsx
   ```

6. **Fix Issues**:
   You can also automatically fix some issues by running:
   ```bash
   npx eslint . --ext .js,.jsx --fix
   ```

Make sure to check the ESLint configuration file for any specific rules or settings used in this project.


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

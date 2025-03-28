# Coffeeshop Serverless

A serverless implementation of a Coffeeshop application using the Serverless Framework.

## Prerequisites

- Node.js runtime installed
- AWS account with appropriate permissions
- AWS CLI configured (optional)

## Installation

1. Install Serverless Framework globally:
```bash
npm install -g serverless
```

2. Verify installation:
```bash
serverless --version
```

3. Update Serverless Framework (if needed):
```bash
serverless update
```

## Project Setup

1. Create new project:
```bash
serverless create --template aws-nodejs-typescript --path coffeeshop-serverless
cd coffeeshop-serverless
```

2. Install dependencies:
```bash
npm install
```

3. Configure AWS credentials:
```bash
serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY
```

## Development

1. Start development mode:
```bash
serverless dev
```

2. Deploy to AWS:
```bash
serverless deploy
```

3. Deploy individual function:
```bash
serverless deploy function -f functionName
```

4. View logs:
```bash
serverless logs -f functionName -t
```

## Project Structure

```
coffeeshop-serverless/
├── src/
│   ├── handlers/     # Lambda functions
│   ├── models/       # Data models
│   └── services/     # Business logic
├── serverless.yml    # Serverless config
└── package.json      # Dependencies
```

## Useful Commands

- `serverless` - Interactive setup workflow
- `serverless deploy` - Deploy entire service
- `serverless dev` - Start development mode
- `serverless invoke -f functionName` - Invoke function
- `serverless logs -f functionName -t` - Stream logs
- `serverless remove` - Remove service and resources

## Resources

- [Serverless Framework Documentation](https://www.serverless.com/framework/docs)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [Serverless Guru Code Challenge](https://github.com/serverless-guru/code-challenges)

## User Management

### Authentication
- User registration
- Login/Logout functionality
- JWT token management
- Password reset

### User Profile
- Create user profile
- View profile details
- Update profile information
- Delete account

### User Preferences
- Save favorite orders
- Set delivery preferences
- Manage notification settings
- Store payment methods

### Order History
- View past orders
- Track current orders
- Save favorite orders
- Rate and review orders

## Tech Stack

- Serverless Framework
- AWS Lambda
- AWS DynamoDB
- Node.js
- TypeScript
- AWS Cognito (Authentication)

## Features

- User authentication and authorization
- Profile management
- Order history tracking
- Preferences management
- Secure data storage
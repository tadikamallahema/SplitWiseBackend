# Splitwise Backend – Expense Sharing Application

## Project Description
This project is a backend implementation of an expense sharing application similar to Splitwise.  
It allows users to create groups, add shared expenses, split amounts in different ways, track balances, and settle dues.  
The project focuses mainly on backend logic and API design.

---

## Tech Stack Used
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Features Implemented

### User
- Create a user
- Get user details by ID
- View user balance summary (how much the user owes and is owed)

### Group
- Create a group
- Automatically add the group creator as a member
- View simplified balances of a group

### Expense
- Add expenses to a group
- Supported split types:
  - Equal split
  - Exact amount split
  - Percentage split
- Validates that split users belong to the group

### Balance & Settlement
- Track who owes whom
- Simplify balances to reduce unnecessary transactions
- Settle full or partial dues between users

---

## API Endpoints

### User APIs
- `POST /user/adduser` – Create a new user
- `GET /user/:userId` – Get user details
- `GET /user/:userId/balances` – Get user balance summary

### Group APIs
- `POST /group/groups` – Create a group
- `GET /group/groups/:groupId/balances` – Get balances for a group

### Expense APIs
- `POST /expenses/:groupId/expenses` – Add an expense to a group

### Settlement APIs
- `POST /settle/settleup` – Settle dues between users
- `POST /settle/gr/:groupId/simplify` – Simplify balances for a group

---

## Project Structure
backend/
├── controllers
├── models
├── routes
├── services
├── server.js
└── package.json

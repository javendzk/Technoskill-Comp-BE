# Technoskill 1.0 Competition Backend

An Express.js backend for the Technoskill 1.0 manager dashboard competition. It utilizes PostgreSQL and Neon for data storage and management.

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Welcome page, sends an HTML message. |
| `/employee/login` | POST | Log in as an employee and return a JWT payload. |
| `/employee/getByUid` | GET | Get specific employee credentials. |
| `/employee/updateByUid` | PUT | Update specific employee credentials. |
| `/manager/login` | POST | Log in as a manager and return a JWT payload. |
| `/manager/register` | POST | Register a new manager account. |
| `/manager/addEmployee` | POST | Add an employee and associate with the manager's UID. |
| `/manager/getLogsByManager` | GET | View login logs by manager UID. |
| `/manager/getEmployeeByManager` | GET | View employees managed by the manager's UID. |
| `/manager/updateEmployeeByUid` | PUT | Update an employee's information by UID. |
| `/manager/deleteEmployeeByUid` | DELETE | Delete an employee by UID. |
| `/token` | POST | Send a token and return the token's payload. |

## API Documentation

View the detailed API documentation and request examples [here](https://www.apidog.com/apidoc/shared-1621c12a-8ecc-49b7-8983-c0fb900610b5?pwd=tekno).

## Get Started

1. Run `npm install` to install all dependencies.
2. Use `npm run build` to start the server on localhost.
3. Ensure you have a `.env` file with the required environment variables.

## Authors

This project was built by:
- Javana Muhammad
- Christian Hadiwijaya
- Benedict Aurelius 
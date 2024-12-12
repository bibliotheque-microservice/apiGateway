# API Gateway for Library Services

This project implements an **API Gateway** that centralizes the access to different services for managing books, users, and loans. The API Gateway acts as an intermediary between the client and the underlying microservices for books, users, and loans. It is built using **Express.js** and **Axios**.

## Project Structure

The project structure is as follows:



### Files

- **Dockerfile**: Docker configuration for the API Gateway.
- **docker-compose.yml**: Defines the services, networks, and volumes for the Docker containers.
- **index.js**: Main API Gateway logic, which handles routing and requests to the different services (Books, Users, Loans).
- **package.json**: Manages project dependencies, scripts, and metadata.
- **Microservices-efrei.postman_collection.json**: The collection to import in Postman (the url: http://localhost:8085).

## Prerequisites

Before running the API Gateway, make sure you have the following installed:

- **Node.js** (for local development)
- **Docker** and **Docker Compose** (to run the services in containers)
- **Postman** (to test the microservices)

## Running the API Gateway

### 1. Install Dependencies

If you are running the API Gateway locally, install the dependencies by navigating to the `apiGateway` folder and running:

```bash
npm install
```


### 2. Start the Services Using Docker Compose

To start all the required services (API Gateway, Books, Users, Loans), you can use Docker Compose. Navigate to the apiGateway folder and run:

```bash
docker-compose up -d --build
```

This will:

- Build and start all containers (API Gateway, Books, Users, Loans services).
- Set up the necessary networks and volumes.

### 3. Accessing the API Gateway

Once the services are up and running, the API Gateway will be accessible at http://localhost:8085.

## API Gateway Endpoints

The API Gateway exposes the following routes to interact with the Books, Users, and Loans services:

### Books (Livres)
- GET /books: Retrieves a list of all books.
- POST /books: Adds a new book.
- PUT /books/:id: Updates a specific book by its ID.
- DELETE /books/:id: Deletes a specific book by its ID.
- GET /books/:id/availability: Checks the availability of a specific book by its ID.

### Users (Utilisateurs)
- POST /users: Creates a new user.
- GET /users/:id: Retrieves a user's details by their ID.
- POST /penalites: Adds a penalty to a user.
- GET /verifier_retards: Checks if any users have overdue loans.
- POST /penalite/pay: Allows a user to pay a penalty.
- GET /valid-user/:id: Checks if a user is valid.
### Loans (Emprunts)
- POST /loans: Creates a new loan.
- PUT /loans: Updates an existing loan.

## Error Handling

If there are any issues with requests to the underlying services, the following HTTP status codes and messages will be returned:

- 404: Not Found (e.g., book, user, or loan not found).
- 500: Internal Server Error (issues with making requests to the services).

### Logs

You can check the logs of the API Gateway container by running the following command:

```bash
docker-compose logs -f apiGateway
```

### Technologies Used

- Node.js with Express.js for creating the API Gateway server.
- Axios for making HTTP requests to the Books, Users, and Loans services.
- Docker and Docker Compose for containerizing the services and managing dependencies.

### Conclusion

This API Gateway serves as the single entry point for interacting with the decentralized library system. It allows for easy integration between microservices and centralizes the business logic for managing books, users, and loans.

You can expand the functionality by adding new features or improving existing ones in the respective microservices.

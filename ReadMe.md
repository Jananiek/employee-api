# Employee API 🛡️

This is a rest API repository to perform queries related to employee API.
## Build With
This project is build with Node.js, PostgreSQL.
Other specific libraries used:
- class-validator : Object validations [Read more here](https://github.com/typestack/class-validator)class-transformer)
- moment 
-  typeorm : ORM that can run in NodeJS [Read more here](https://typeorm.io/)
## Development

We use `node` version `14.9.0`

```
nvm install 14.9.0
```

```
nvm use 14.9.0
```

The first time, you will need to run

```
yarn
```

Then just start the server with

```
yarn run start
```

It uses nodemon for livereloading

## Setting up Dev

### Project setup

- clone the `employee-api` repo.
- install the dependencies.
- run `cp .env.example .env`.
- configure database credentials with yours in ` .env` file
- run `yarn run start`.
- run `yarn test` to run unit test



**Example error**

```json
{
 "success": false,
 "data": {
   "errorMessage": "Missing User ID"
 },
 "error": {
   "message": "Missing User ID"
 }
}
````

**Example Success**

```json
{
  "success": true,
  "data": {},
  "message": null
}
```

# Database
- Used PostgreSQL along with TypeORM as ORM.

# FAQ

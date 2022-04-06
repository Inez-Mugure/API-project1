# typescript-koa
## https://inviqa.com/blog/how-build-basic-api-typescript-koa-and-typeorm

## what is the project about
- create a simple API that stores movie names, release years, and a numeric rating. 
- The data will then be stored in PostgreSQL using TypeORM, a TypeScript-friendly data mapper.
## step by step process of setting up this project
 
 ### Node basics
 - creating the folder and navigating into it: mkdir -p typescript-koa && cd typescript-koa
 - creating the Node.js project: npm init -y
 - Node dependencies: npm i -D koa koa-{router,bodyparser} http-status-codes typeorm pg reflect-metadata
### Typescript setup
- Typescript dependencies: npm i -D typescript ts-node tslint tslint-config-airbnb nodemon
- Type definitions: npm i -D @types/{node,koa,koa-router,http-status-codes,koa-bodyparser}
### Setting-up Nodemon for seamless server restarts
- To restart our server when changes are made, we’re going to watch for changes with nodemon.json file



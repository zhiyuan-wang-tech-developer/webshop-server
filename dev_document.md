# Client

## Project config

### Create react project

We start with building a front-end application with **react**.
The react is used with **typescript**.
To create react app with typescript template, use npm:

```
    create-react-app client --template typescript
```

### React Bootstrap

We adopt the **react-bootstrap** for UI, use npm to install it.

```
npm install react-bootstrap bootstrap
npm install bootstrap-icons
```

### Form Validation

We validate the form with **Formik** and **Yup**

```
    npm install --save formik yup
    npm install -D @types/yup
```

### React Router

```
    npm install --save react-router-dom
    npm install -D @types/react-router-dom
```

### React Redux for state management

```
    npm install --save redux react-redux redux-thunk
    npm install -D @types/react-redux
    npm install --save redux-devtools-extension
```

### Superagent for sending request to backend

```
    npm install --save superagent
    npm install -D @types/superagent
```

### Open React App with specifed browser "chrome"

1. Install package **cross-env**

```
    npm install --save cross-env
```

2. make a change in package.json file. BROWSER is an environment variable, and you can use the cross-env package to properly handle it.

```
    "start": "cross-env BROWSER=chrome react-scripts start"
```

# Server

## Project config

### Prerequisite

[x] install the **typescript transpiler** globally or make sure you have **typescript** installed.

```
    npm install -g typescript
```

[x] install the **typescript node** globally

```
    npm install -g ts-node
```

### Create Typescript configuration file

```
    tsc --init
```

### Build Koa server

1. install packages related to **Koa** and save them into _dependencies_:

```
    npm install --save koa koa-router koa-bodyparser koa-json koa-logger koa-multer
```

2. install type definition packages for **Koa Typescript Package** and save them into _devDependencies_:

```
    npm install -D @types/koa @types/koa-router @types/koa-bodyparser @types/koa-json @types/koa-logger @types/koa-multer
```

3. install [routing controller framework](https://github.com/typestack/routing-controllers), which is a class-based routing controller with decorator usage in Express/Koa:

```
    npm install --save routing-controllers reflect-metadata
```

4. install routing controller's peer dependencies:

```
    npm install --save class-transformer class-validator
```

5. Cross Origin Resource Sharing (CORS) is used in almost any WEB-API application. To use it, you need to install cors module.

```
    npm install --save kcors
```

### Build database server

1. install TypeORM object-relation-mapper

```
    npm install --save typeorm @types/node
```

2. install postgres driver package that TypeORM needs to communicate with Postgres database server

```
    npm install --save pg
```

3. Run typeorm initialization under the _server_ directory but mind that it may override tsconfig.json so make a backup first.

```
    typeorm init
```

### logging

1. Install chalk for making pretty colors on console.log

```
    npm install --save chalk
```

### Security

1. Install JSON Web Token

```
    npm install --save jsonwebtoken @types/jsonwebtoken
```

2. To safely store your password in database, we use a library **bcrypt** to hash password.

```
    npm install --save bcrypt @types/bcrypt
```

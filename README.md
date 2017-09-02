# :notebook: :100: Math Dojo

<img src="readme/studentLogin.png" alt="Math Dojo mockup" height=600 />

> A responsive, secure and interactive quiz application built for the classroom.

## :busts_in_silhouette: Team

  - [Aaron Trank](https://github.com/aarontrank)
  - [Sean O'Neal](https://github.com/sean-oneal)

## :sparkles: Table of Contents

1. [Team](#busts_in_silhouette-team)
1. [Usage](#tada-usage)
1. [Requirements](#bangbang-requirements)
1. [Development](#construction-development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#warning-tasks)
    1. [Tech Stack](#tech-stack)
1. [Screenshots](#computer-screenshots)
1. [Contributing](#contributing)

## :tada: Usage

> Math Dojo was developed and tested to be used from a mobile device, as well as on a desktop or laptop.  A valid and working Google Account is required for Teachers to login.  To start using Math Dojo, go to `localhost:3000` in your browser.

## :bangbang: Requirements

- Node
- MongoDB
- A valid Google Account

## :construction: Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### :warning: Tasks

1. Open a separate terminal tab/window and launch `mongod`:

```sh
mongod
```

1. From within the `/teacher` directory:

```sh
../node_modules/.bin/webpack -d --watch
```

1. From within the `/student` directory:

```sh
../node_modules/.bin/webpack -d --watch
```

1. From within the root `~/` directory, start server and webpack:

```sh
npm start
```

1. Alternatively, only have webpack watch:

```sh
npm run dev
```

#### Load the database with dummy data:

```sh
npm run db
```

#### Clearing the Database:

```sh
npm run reset
```

## Production Build

```sh
npm run build
```

### :white_check_mark: Tech Stack
> The application was built using the MongoDB, Express, React/Redux, Node (MERN) stack, and incorporates the following technologies:

- React
- React Router
- Redux
- Express
- Mongoose
- Webpack
- PassportJS
- Google OAuth 2.0
- bCrypt
- Axios
- Express Sessions
- Bootstrap
- React Bootstrap
- Chart.js
- Morgan
- jQuery

### :computer: Screenshots

#### Teacher Application

  - Login Screen

    <img src="readme/teacherLogin.png" alt="Math Dojo Mockup" height=600 />

  - Google OAuth Verification

    <img src="readme/googleOAuthLogin.png" alt="Math Dojo (Mobile) Google OAuth 2.0 Login" height=600 />

  - Responsive Dashboard

    <img src="readme/teacherResponsive.png" alt="Math Dojo Teacher Add Student" height=600 />

  - Dashboard Drop-down

    <img src="readme/teacherAddStudent.png" alt="Math Dojo Teacher Sign Out" height=600 />

#### Student Application:

  - Login

    <img src="readme/studentLogin.png" alt="Math Dojo Student Login" height=600 />

  - Desktop Dashboard

    <img src="readme/mathDojo1.png" alt="Math Dojo Student Dashboard" height=400 />

  - Wrong Answer

    <img src="readme/studentWrongAnswer.png" alt="Math Dojo Student Wrong Answer" height=600 />

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

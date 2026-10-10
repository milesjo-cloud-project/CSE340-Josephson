# CSE340 MVC Faculty Directory

An Express and EJS application for practicing the Model–View–Controller (MVC) pattern and parameterized routes. The faculty directory is available at `/faculty`, with individual profiles at `/faculty/:facultyId`.

## Run the application

```powershell
npm install
npm run dev
```

Then open <http://localhost:3000>. Use `npm start` to run without Node's watch mode.

## MVC structure

```text
src/
├── controllers/
│   ├── catalog/catalog.js       # Course request handlers
│   ├── faculty/faculty.js       # Faculty list and profile handlers
│   ├── site/site.js             # Home, about, student, and error handlers
│   └── index.js                 # Central controller exports
├── models/
│   ├── catalog/catalog.js       # Course data and lookup functions
│   ├── faculty/faculty.js       # Faculty data, lookup, and sorting
│   └── student/student.js       # Sample student data
├── routes.js                    # Maps URLs to controller handlers
└── views/
    ├── faculty/                 # Faculty list and detail templates
    ├── partials/                # Shared page header and footer
    ├── error.ejs                # Styled 404 and server error page
    ├── home.ejs
    ├── about.ejs
    └── student.ejs
```

### Request flow

1. `server.js` configures Express, serves static assets, configures EJS, mounts `src/routes.js`, and starts the server.
2. `src/routes.js` maps each URL to a controller and ends with not-found and error handlers.
3. Controllers read route/query parameters and request data from models.
4. Models return application data; controllers pass it to EJS views in `src/views/`.

## Routes

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/` | Home page |
| GET | `/about` | About page |
| GET | `/student` | Sample student information |
| GET | `/faculty` | List faculty; optional `sortBy=name`, `sortBy=department`, or `sortBy=title` |
| GET | `/faculty/:facultyId` | Show a faculty profile, or a 404 page for an unknown ID |
| GET | Any other path | Styled 404 page |

The shared navigation is in `src/views/partials/header.ejs`, and the site stylesheet is `public/css/main.css`.

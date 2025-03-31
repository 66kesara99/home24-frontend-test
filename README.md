# home24 BXP Frontend Test Task

Welcome to the home24 BXP Frontend Test Task

## How to run

- Clone the repo
- Go into repository folder `cd home24-frontend-test`
- Install dependencies `pnpm i`
- Run mock backend server using the script `pnpm json-server`
- Run the frontend in dev mode `pnpm dev`
- Login details. This can be changed in `server/db.json` file if needed.
    - email: `test@email.com`
    - password: `asdf`

## Technologies used

- React + Typescript with Vite: For simple SPA. Nextjs can be used if Server side rendering is required
- React Router: Declarative mode: For simple routing
- Ant Design: UI library

## Possible improvements

- UI can be improved with a better design. Default Ant Design components are used in the application.
- React context is used for state management. Can move to better state management library like Zustand or RTK query if the application is complex.
- Inline styles are used as there were minor customizations done in this app. Can improve with moving into Sass, styled components or tailwind for better styling.
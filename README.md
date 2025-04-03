# home24 BXP Frontend Test Task

Welcome to the home24 BXP Frontend Test Task

https://github.com/user-attachments/assets/8e5fc3cc-aada-49f5-831f-96b4380e837e

## How to Run

- Clone the repo
- Go into repository folder `cd home24-frontend-test`
- Install dependencies `pnpm i`
- Run mock backend server using the script `pnpm json-server`
- Run the frontend in dev mode `pnpm dev` in a separate terminal
- Login details. This can be changed in `server/db.json` file if needed.
    - email: `test@email.com`
    - password: `asdf`

## Technologies Used

- React + Typescript with Vite: For simple SPA
- React Router: For simple routing
- Ant Design: UI library
- json-server: For creating mock backend apis
- vitest: unit testing

## Main Design Decisions

- React with Vite: Selected for simple SPA application. If SSR or better folder structure is needed can go with Nextjs
- React router is used in declarative mode for simple routing
- React context is used for state management as it only has few states. If complex state management is needed we can go with other libraries like Zustand, RTK, Redux etc
- Inline styling is used for CSS customization. Better customization can be achieved if we use libraries like Tailwind, Styled Components or CSS processor like SASS, SCSS
- Vitest library is selected for unit testing as it's fast and supports better in Vite. If UI testing is needed can go with React Testing Library, e2e can be done with Cypress or Playwright

## Folder structure

```
home24-frontend-test 
├── server: Contains db.json file for mock server
├── src
│   ├── api: Contains API calls related to frontend
│   ├── app: Contains all router, pages and components related to main route
│   ├── assets: Contains images or assets related to the app
│   ├── components: Contains shared components
│   ├── entities: Contains domain entities in the app
│   ├── layouts: Contains shared layouts
│   ├── state: Contains global state. Currently using React context. Can be migrated to Zustand or RTK query
│   ├── tests: Contains unit tests for now. Can be extended for other tests
│   ├── utils: Contains utils needed for components. This is for separating shared complex logic from components
│   ├── index.css: Contains the CSS reset file and some global css classes
│   ├── main.tsx
├── .gitignore
├── README.md
├── index.html
├── package.json
```

## Possible improvements

- UI can be improved with a better design. Default Ant Design components are used in the application.
- React context is used for state management. Can move to better state management library like Zustand or RTK query if the complex state management is needed.
- Inline styles are used as there were minor customizations done in this app. Can improve with moving into Sass, styled components or tailwind for better styling.
- Only unit tests are done for util fils. Can extend with other types of testing like UI testing and e2e testing
- Can integrate CI pipelines for automated unit testing in Github actions
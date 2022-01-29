# Introduction
<p>This website is a small travel website. Users can choose their favourite travel routes on this website.</p>

It is composed of searching module, register module, signIn module,shopping cart module and payment module. 

The entire website is developed in react framework and the state controller using the react-redux and redux-toolkit, all pages are connected by using react-router-dom V6.

# Technology Stack

React, JavaScript, TypeScript, CSS, react-router-dom(V6), React-Redux, redux-tool-kit, Antd design, react-i18next, 

# Function
 - Language Change:
 <p>By using the react-i18next, users can change language by clicking the language button on the top-left of the homepage.</p>
 
 - Route Searching:
 <p>Users can type their prefer travel destinaion in the search input blocks, once press search button, the related travel routes information will be showed.
 If users press search button or press enter key without typing any word, it will automatically direct to search page.</p>
 
 - Register:
 <p>Users can register an account by clicking the register button on the top-right of the page. It will navigate to the register page, once user complete the register, all data will be stored on backend database and automatically navigate to the signin page</p>

- SignIn:
<p>Users can signin if they already have the account. Once the users complete signin, due to the redux, users signin state will be kept among all pages</p>


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

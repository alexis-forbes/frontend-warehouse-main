## frontend-warehouse-main
Frontend app created with Vite. Why Vite? => provides instant server start, optimized build, rich features, fully typed APIs...
Teck stack: Javascript, Typescript, React as framework, React-Bootstrap for styling and React context for state management. 

## Requirements
Have warehouse api backend running on port 7000

## Installing the Dependencies
npm install

## Running the app
npm run dev

After installing the dependencies and starting the API, it should be available at <http://localhost:3000/>

## Overall

The app does a `GET` fetch request to the warehouse db products endpoint and lists them as well as the articles for each product. 
You can add items to a cart and create a sale which will do a `POST` request to the sales endpoint in the db. A console log is provided for 
each call to the db, also some visual updates in the UI to inform the user. 

You can delete items in the cart or directly increase or reduce the amount of products you want to send to the cart.
After a sales has been made, the inventory in the store is updated accordingly with React context: 
- Cart will be empty
- The inventory will be reset
- The user is prompted with new options to create a new sale

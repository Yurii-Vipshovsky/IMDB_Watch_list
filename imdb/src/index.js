import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import alreadySeenSlice from './reducers/alreadySeenSlice';
import wantToSeeSlice from './reducers/wantToSeeSlice';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FindMovie from './components/findMovie/FindMovie';
import AlreadySeenMovies from './components/alreadySeenMovies/AlreadySeenMovies';
import WantToSeeMovies from './components/wantToSeeMovies/WantToSeeMovies';

const store = configureStore({
  reducer: {
    alreadySeen: alreadySeenSlice,
    wantToSee: wantToSeeSlice
  }
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "findMovie/:movieName",
        element: <FindMovie></FindMovie>
      },
      {
        path: "watched",
        element: <AlreadySeenMovies></AlreadySeenMovies>
      },
      {
        path: "wantToSee",
        element: <WantToSeeMovies></WantToSeeMovies>
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);


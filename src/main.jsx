import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./components/AuthLayout.jsx";
import {
  Home,
  Signup,
  Login,
  ShowPosts,
  CreatePost,
  UpdatePost,
  ViewPost,
} from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/all-articles",
        element: (
          <AuthLayout authentication={true}>
            {" "}
            <ShowPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-article",
        element: (
          <AuthLayout authentication={true}>
            {" "}
            <CreatePost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication={true}>
            {" "}
            <UpdatePost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <ViewPost />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

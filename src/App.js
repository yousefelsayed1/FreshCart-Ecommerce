import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MasterLayout from "./components/MasterLayout/MasterLayout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Notfound from "./components/Notfound/Notfound";
import UserContextProvider from "./context/TokenContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Details from "./components/Details/Details";
import CartContextProvider from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import CheckOut from "./components/CheckOut/CheckOut";
import Allorders from "./components/Allorders/Allorders";
import WishList from "./components/WishList/WishList";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ProtectedRestPassword from "./components/protectedRestPassword/protectedRestPassword";
import Profile from "./components/Profile/Profile";
import CategoriesBody from "./components/CategoriesBody/CategoriesBody";
import SpecifCategory from "./components/SpecifCategory/SpecifCategory";
import SpecifBrand from "./components/SpecifBrand/SpecifBrand";
import { Offline, Online } from "react-detect-offline";
import Footer from "./components/Footer/Footer";
import OfflinePage from "./components/OfflinePage/OfflinePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MasterLayout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "details/:id",
        element: (
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <CategoriesBody />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories/:id",
        element: (
          <ProtectedRoute>
            <SpecifCategory />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands/:id",
        element: (
          <ProtectedRoute>
            <SpecifBrand />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      { path: "signin", element: <Signin /> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      {
        path: "resetpassword",
        element: (
          <ProtectedRestPassword>
            <ResetPassword />
          </ProtectedRestPassword>
        ),
      },
      { path: "signup", element: <Signup /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <Online>
          <CartContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <ToastContainer theme="colored" autoClose={3000} />
          </CartContextProvider>
        </Online>
      </UserContextProvider>

      <Offline>
        <div className="network rounded-3">
          <i className="fas fa-wifi mx-3"></i>
          you are offline
        </div>
        <OfflinePage />
      </Offline>
    </>
  );
}

export default App;

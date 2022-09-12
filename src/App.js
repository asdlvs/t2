import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route } from "react-router-dom"
import {  useSelector } from "react-redux";
import OrdersList from "./components/OrdersList";
import OrderForm from "./components/OrderForm";
import MainFrom from "./components/MainForm";
import Loading from "./components/Loading";
import ProfileContent from "./components/ProfileContent";
import { SignInButton } from "./components/SingButtons";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

function App() {

  const [isAuth, setIsAuth] = useState("false");
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    setIsAuth(auth);
  }, [auth]);


  return (
    <div>
      <UnauthenticatedTemplate>
        <div className="container h-100 d-flex justify-content-center">
          <div className="jumbotron my-auto">
            <h1 className="display-3">You need to:</h1>
          </div>
          <SignInButton />
        </div>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <ProfileContent />
        {isAuth ? (
          <div className="container mt-3">
            <Loading />
            <MainFrom />
            <br />
            <Routes>
              <Route path="/orders" element={<OrdersList />} />
              <Route path="/orders/new" element={<OrderForm />} />
              <Route path="/orders/:id" element={<OrderForm />} />
            </Routes>
          </div>) : (
          <>Loading...</>
        )
        }
      </AuthenticatedTemplate>
    </div>
  );
}

export default App;

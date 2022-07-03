import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, buttonClick, isLoggedIn }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "100vh",
        background: "white",
      }}
    >
      <Header buttonClick={buttonClick} isLoggedIn={isLoggedIn} />
      <main style={{ flexGrow: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}

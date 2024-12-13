import React from "react";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";

const HomePage = () => {
  return (
    <Layout>
    <div>
      <h1>Home page</h1>
    </div>
    <>
    <h4 
    className="ms-4"
     data-bs-toggle="modal" 
    data-bs-target="#staticBackdrop"
    style={{cursor:"pointer"}}
    >

      <i className="fa-solid fa-plus text-success py-4"></i>
      Add Inventory
      </h4>
     <Modal/>
     </>
    </Layout>
  );
};

export default HomePage;

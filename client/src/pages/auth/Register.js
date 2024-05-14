import React from "react";
import Form from "../../components/shared/Form/Form";

const Register = () => {
  return (
    <>
      <div className="row g-0">
        <div className= "col-md-8 form-banner form-container">
          <img src="./assets/images/banner2.jpg" alt="registerImage"/>
        </div>
        <div className="col-md-4 ">
          <Form formTitle={"Register"} submitbtn={"Register"} 
          formType={"register"}
          />
        </div>

      </div>
    </>
  );
};

export default Register;

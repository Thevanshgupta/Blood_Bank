import React from "react";
import Form from "../../components/shared/Form/Form";
//import InputType from "../../components/shared/Form/InputType";

const Login = () => {
  return (
    <>
        <div className="row g-0">
            <div className="col-md-8 form-banner">
            <img  src="./assets/images/banner1.jpg" alt="loginImage" />
            </div>
            <div className="col-md-4 form-container">
              <Form formTitle={"Login Page"}
              submitbtn={"Login"} 
              formType={"login"}
              />
           

            
            </div>


        </div>
    </>
  );
};

export default Login;

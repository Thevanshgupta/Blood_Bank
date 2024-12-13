import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputType from "../Form/InputType";
import { toast } from "react-toastify";
import API from "../../../services/API";

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");

  const auth = useSelector(state => state.auth);
  const user = auth ? auth.user : null;

  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity || !email) {
        return toast.error("Please Provide All Fields");
      }

      if (!validateEmail(email)) {
        return toast.error("Please Provide a Valid Email");
      }

      const { data } = await API.post("/inventory/create-inventory", {
        email,
        organisation: user?._id,
        inventoryType,
        bloodGroup,
        quantity: parseInt(quantity),
      });

      if (data?.success) {
        toast.success("New Record Created");
        resetForm();
        window.location.reload();
      } else {
        toast.error(data?.message || "An error occurred");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.log(error);
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const resetForm = () => {
    setInventoryType("in");
    setBloodGroup("");
    setQuantity(0);
    setEmail("");
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage Blood Record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="d-flex mb-3">
                Inventory Type: &nbsp;
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name="inventoryType"
                    checked={inventoryType === "in"}
                    value="in"
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-check-input"
                  />
                  <label htmlFor="in" className="form-check-label">
                    IN
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name="inventoryType"
                    value="out"
                    checked={inventoryType === "out"}
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-check-input"
                  />
                  <label htmlFor="out" className="form-check-label">
                    OUT
                  </label>
                </div>
              </div>
              <select
                className="form-select mb-3"
                aria-label="Select Blood Group"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="" disabled>
                  Select Blood Group
                </option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
              </select>
              <InputType
                labelText="Donor Email"
                labelFor="donorEmail"
                inputType="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputType
                labelText="Quantity (ML)"
                labelFor="quantity"
                inputType="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleModalSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

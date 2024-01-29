import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserRegister = () => {
  const [id, idChange] = useState("");
  const [password, passwordChange] = useState("");
  const [email, emailChange] = useState("");
  const [fullName, fullNameChange] = useState("");
  const [phone, phoneChange] = useState("");
  const [address, addressChange] = useState("");

  const navigate = useNavigate();

  const IsValidate = () => {
    let isproceed = true;
    let errorMessage = "Iltimos ma`lumot kiriting 👌";


    if (!isproceed) {
      toast.warning(errorMessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        toast.warning("Iltimos email manzilingizni kiriting !!!");
      }
    }

    return isproceed;
  };

  const handleSubmit = (e) => {
    if (IsValidate()) {
      e.preventDefault();
      let regobj = { id, password, email, phone, address, fullName };
      fetch("http://localhost:8080/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          toast.success("Muvaffaqiyatli ro`yxatdan o`tdingiz ✅");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Xatolik kuzatildi ❌" + err.message);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="color-[#000] font-[700] text-center m-5 pb-5 text-[36px]">
          User Registration
        </h1>

        <div className="flex items-center justify-center gap-9">
          <label className="form-group">
            User Name <span className="errmsg">*</span>
          </label>
          <input
            value={id}
            onChange={(e) => idChange(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter User Name"
            style={{
              height: "48px",
              width: "350px",
              padding: "16px 12px",
              borderRadius: "6px",
              border: "3px solid #E5E9EB",
              background: "#FFF",
              outline: "none",
            }}
          />
        </div>
        <div className="flex items-center justify-center gap-10 mt-5">
          <label className="form-group">
            Password <span className="errmsg">*</span>
          </label>
          <input
            value={password}
            onChange={(e) => passwordChange(e.target.value)}
            type="password"
            className="form-control"
            placeholder="Enter Password"
            style={{
              width: "350px",
              height: "48px",
              padding: "16px 12px",
              borderRadius: "6px",
              border: "3px solid #E5E9EB",
              background: "#FFF",
              outline: "none",
            }}
          />
        </div>
        <div className="flex items-center justify-center gap-10 mt-5">
          <label className="form-group">
            Full Name <span className="errmsg">*</span>
          </label>
          <input
            value={fullName}
            onChange={(e) => fullNameChange(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter Full Name"
            style={{
              height: "48px",
              width: "350px",
              padding: "16px 12px",
              borderRadius: "6px",
              border: "3px solid #E5E9EB",
              background: "#FFF",
              outline: "none",
            }}
          />
        </div>
        <div className="flex items-center justify-center gap-16 mt-5">
          <label className="form-group">
            Email <span className="errmsg">*</span>
          </label>
          <input
            value={email}
            onChange={(e) => emailChange(e.target.value)}
            type="email"
            className="form-control ms-3"
            placeholder="Enter Email Address"
            style={{
              height: "48px",
              width: "350px",
              padding: "16px 12px",
              borderRadius: "6px",
              border: "3px solid #E5E9EB",
              background: "#FFF",
              outline: "none",
            }}
          />
        </div>
        <div className="flex items-center justify-center gap-16 mt-5">
          <label className="form-group">
            Phone <span className="errmsg">*</span>
          </label>
          <input
            value={phone}
            onChange={(e) => phoneChange(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter Phone Number "
            style={{
              height: "48px",
              width: "350px",
              padding: "16px 12px",
              borderRadius: "6px",
              border: "3px solid #E5E9EB",
              background: "#FFF",
              outline: "none",
            }}
          />
        </div>
        <div className="flex items-center justify-center gap-12 mt-5">
          <label className="form-group">
            Address <span className="errmsg">*</span>
          </label>
          <textarea
            value={address}
            onChange={(e) => addressChange(e.target.value)}
            className="form-control"
            placeholder="Enter Address"
            style={{
              width: "350px",
              padding: "16px 12px",
              borderRadius: "6px",
              border: "3px solid #E5E9EB",
              background: "#FFF",
              outline: "none",
            }}
          ></textarea>
        </div>

        <div className="flex items-center justify-center mt-10">
          <button className="bg-blue-500 p-3 rounded-[6px] text-white w-[150px]">
            Register
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default UserRegister;

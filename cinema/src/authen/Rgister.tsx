import { TextField } from "@mui/material";
import "./login.css";
import { useState } from "react";
import axiosInstance from "../axios/axiosServices";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = async () => {
    try {
      const result = await axiosInstance.post("/User/register", {
        email,
        password,
        address,
        fullName,
        phoneNumber,
      });
      localStorage.setItem("user", JSON.stringify(result.data));
      if (result.data.role.name === "USER") {
        navigate("../home");
      } else {
        navigate("admin");
      }
    } catch (err: any) {
      alert(`${err.message}`);
    }
  };

  return (
    <>
      <div
        className="bg-black flex justify-center "
        style={{ width: "100%", height: "100vh" }}
      >
        <div
          className="border-2 border-white p-5 mt-20"
          style={{ width: "600px", height: "500px" }}
        >
          <div className="flex justify-center items-center text-5xl font-bold text-white">
            Đăng Ký
          </div>
          <div className="my-5">
            <TextField
              id="outlined-basic"
              className="w-full "
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              variant="standard"
            />
          </div>
          <div className="my-5">
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-basic"
              className="w-full"
              type="password"
              label="Mật Khẩu"
              variant="standard"
            />
          </div>
          <div className="my-5">
            <TextField
              id="outlined-basic"
              className="w-full "
              onChange={(e) => setAddress(e.target.value)}
              label="Địa chỉ"
              variant="standard"
            />
          </div>
          <div className="my-5">
            <TextField
              id="outlined-basic"
              className="w-full "
              onChange={(e) => setFullName(e.target.value)}
              label="Họ và tên"
              variant="standard"
            />
          </div>
          <div className="my-5">
            <TextField
              id="outlined-basic"
              className="w-full "
              onChange={(e) => setPhoneNumber(e.target.value)}
              label="Số điện thoại"
              variant="standard"
            />
          </div>
          <div className="flex justify-around mt-5">
            <div
              className="text-2xl font-bold text-green-500  "
              onClick={() => handleLogin()}
            >
              Đăng kí
            </div>
            <div className="text-2xl font-bold text-red-500">
              Về Trang Đăng Nhâp
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

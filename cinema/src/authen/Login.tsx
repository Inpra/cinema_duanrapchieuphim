import { TextField } from "@mui/material";
import "./login.css";
import { useState } from "react";
import axiosInstance from "../axios/axiosServices";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const result = await axiosInstance.post("/User/login", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(result.data));
      if (result.data.role.name === "USER") {
        navigate("../home");
      } else {
        navigate("../admin");
      }
    } catch (err: any) {
      alert(`${err.message}`);
    }
  };

  return (
    <>
      <div
        className="bg-black flex justify-center items-center"
        style={{ width: "100%", height: "100vh" }}
      >
        <div
          className="border-2 border-white p-5"
          style={{ width: "600px", height: "300px" }}
        >
          <div className="flex justify-center items-center text-5xl font-bold text-white">
            Đăng Nhập
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
          <div className="flex justify-around mt-5">
            <div
              onClick={() => handleLogin()}
              className="text-2xl font-bold text-green-500"
            >
              Đăng Nhập
            </div>
            <Link to={"/register"}>
              <div className="text-2xl font-bold text-red-500">Đăng Ký</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

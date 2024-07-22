import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosServices";

interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
  ammount: number;
  role: any;
}

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const [data, setData] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setIsLoad(false);
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/User/${user.id}`);
        console.log(response.data);
        setData(response.data);
        setName(response.data?.fullName ?? "");
        setPhoneNumber(response.data?.phoneNumber ?? "");
        setAddress(response.data?.address ?? "");
      } catch (err) {}
    };

    fetchData();
  }, [isLoad]);

  const handleSend = async () => {
    try {
      const result = await axiosInstance.put("/User/update", {
        id: data?.id,
        name: name,
        phoneNumber: phoneNumber,
        address: address,
      });
      user.name = name;
      user.phoneNumber = phoneNumber;
      user.address = address;
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoad(true);
      alert("đã cập nhật thành công");
    } catch (err: any) {
      alert(`${err.message}`);
    }
  };
  return (
    <>
      <div className=" h-full bg-black" style={{ height: "780px" }}>
        <div>
          <Grid container>
            <Grid xs={2}></Grid>
            <Grid xs={8}>
              <div className="text-white font-bold gap-10 my-5 text-4xl flex justify-center">
                Trang cá nhân
              </div>
              <div className="my-5">
                <TextField
                  id="outlined-basic"
                  className="w-full "
                  label="Họ và tên"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  variant="standard"
                />
              </div>
              <div className="my-5">
                <TextField
                  id="outlined-basic"
                  className="w-full "
                  label="Số điện thoại"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  variant="standard"
                />
              </div>
              <div className="my-5">
                <TextField
                  id="outlined-basic"
                  className="w-full "
                  label="Địa Chỉ"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  variant="standard"
                />
              </div>
              <div className="my-5 text-xl font-bold text-white">
                Email :
                <span className=" mx-5 text-xl font-bold text-white">
                  {data?.email}
                </span>
              </div>
              <div className="my-5 text-xl font-bold text-white">
                Số tiền :
                <span className=" mx-5 text-xl font-bold text-white">
                  {data?.ammount.toLocaleString()} đ
                </span>
              </div>
              <div className="text-white font-bold gap-10 my-5 text-4xl flex justify-end">
                <Button
                  onClick={handleSend}
                  className="!bg-red-600 !text-white !capitalize !font-bold !mt-5 "
                >
                  Lưu
                </Button>
              </div>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Profile;

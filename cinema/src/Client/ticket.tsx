import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosServices";

export interface Booking {
  id: number;
  film: any;
  date: string;
  slot: number;
  position: string[];
  totalPrice: number;
  theater: any;
  user: User;
  quantity: number;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
  ammount: number;
  role: any;
}

interface Hour {
  label: string;
  value: number;
}

const Ticket = () => {
  const [data, setData] = useState<Booking[]>([]);
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/Booking/user/${user.id}`);
        console.log(response.data);
        setData(response.data);
      } catch (err) {}
    };

    fetchData();
  }, []);

  const hours: Hour[] = [
    { label: "09:00 - 11:00", value: 1 },
    { label: "11:00 - 13:00", value: 2 },
    { label: "13:00 - 15:00", value: 3 },
    { label: "15:00 - 17:00", value: 4 },
    { label: "17:00 - 19:00", value: 5 },
    { label: "19:00 - 21:00", value: 6 },
    { label: "21:00 - 23:00", value: 7 },
    { label: "23:00 - 01:00", value: 8 },
  ];

  return (
    <>
      <div>
        <div className="" style={{ height: "1086px" }}>
          <Grid container>
            <Grid xs={2}></Grid>
            <Grid xs={8}>
              <div className="text-white font-bold gap-10 my-5 text-4xl flex justify-center">
                Danh sách hóa đơn
              </div>
              <div className="flex justify-center">
                <table>
                  <tr className="text-white text-2xl">
                    <th className="p-2" style={{ border: "1px solid white" }}>
                      Mã Vé
                    </th>
                    <th className="p-2" style={{ border: "1px solid white" }}>
                      Ngày
                    </th>
                    <th className="p-2" style={{ border: "1px solid white" }}>
                      Thời gian
                    </th>
                    <th className="p-2" style={{ border: "1px solid white" }}>
                      Vị trí
                    </th>
                    <th className="p-2" style={{ border: "1px solid white" }}>
                      Tổng giá
                    </th>
                    <th className="p-2" style={{ border: "1px solid white" }}>
                      Họ và tên
                    </th>
                    <th className="p-2" style={{ border: "1px solid white" }}>
                      Số lượng
                    </th>
                  </tr>
                  {data?.map((booking) => (
                    <tr key={booking.id} className="text-white">
                      <td className="p-2" style={{ border: "1px solid white" }}>
                        {booking.id}
                      </td>
                      <td className="p-2" style={{ border: "1px solid white" }}>
                        {new Date(booking.date).toLocaleDateString()}{" "}
                        {new Date(booking.date).toLocaleTimeString()}
                      </td>
                      <td className="p-2" style={{ border: "1px solid white" }}>
                        {hours[booking.slot].label}
                      </td>
                      <td className="p-2" style={{ border: "1px solid white" }}>
                        {booking.position.join(", ")}
                      </td>
                      <td className="p-2" style={{ border: "1px solid white" }}>
                        {booking.totalPrice.toLocaleString()} đ
                      </td>
                      <td className="p-2" style={{ border: "1px solid white" }}>
                        {booking.user.fullName}
                      </td>
                      <td className="p-2" style={{ border: "1px solid white" }}>
                        {booking.quantity}
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Ticket;

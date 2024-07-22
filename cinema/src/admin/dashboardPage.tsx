import { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosServices";
import { Booking } from "./bookingManagement";

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState([]);
  const [booking, setBooking] = useState<Booking[]>([]);
  const [film, setFilm] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/User/Users");
        setUser(response.data);
      } catch (err) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/Booking/bookings");
        setBooking(response.data);
      } catch (err) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/Film/films");
        setFilm(response.data);
      } catch (err) {}
    };

    fetchData();
  }, []);

  const doangthu = () => {
    var sum = 0;
    booking.forEach((x) => {
      sum += x.totalPrice;
    });

    return sum.toLocaleString();
  };

  return (
    <>
      <div className="w-full h-full bg-white rounded-lg">
        <div className="h-60"></div>
        <div className="flex justify-center">
          <div className="w-60 h-60 mr-10 flex justify-center items-center">
            <p className="text-9xl">{user.length}</p>
          </div>
          <div className="w-60 h-60 mr-10 flex justify-center items-center">
            <p className="text-9xl">{booking.length}</p>
          </div>
          <div className="w-60 h-60 mr-10 flex justify-center items-center">
            <p className="text-9xl">{film.length}</p>
          </div>
          <div className="w-60 h-60 flex justify-center items-center">
            <p className="text-5xl">{doangthu()}đ</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-60 h-60 mr-10  flex justify-center">
            <p className="text-3xl">Số khách hàng</p>
          </div>
          <div className="w-60 h-60 mr-10  flex justify-center">
            <p className="text-3xl">Số Đơn hàng</p>
          </div>
          <div className="w-60 h-60 mr-10  flex justify-center">
            <p className="text-3xl">Số Phim</p>
          </div>
          <div className="w-60 h-60  flex justify-center">
            <p className="text-3xl">Doanh thu</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

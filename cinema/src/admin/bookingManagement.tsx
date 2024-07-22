import { Button } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosServices";

export interface Booking {
  id: number;
  film: Film;
  date: string;
  slot: number;
  position: string[];
  totalPrice: number;
  theater: Theater2;
  user: User;
  quantity: number;
}

export interface Film {
  id: number;
  name: string;
  trailerLink: string;
  director: string;
  actor: string;
  publishDate: string;
  hours: number;
  imageUrl: string;
  language: string;
  comments: any;
  theater: Theater[];
}

export interface Theater {
  id: number;
  quantity: number;
  slot: number;
  date: string;
}

export interface Theater2 {
  id: number;
  quantity: number;
  slot: number;
  date: string;
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

const BookingPage: React.FC = () => {
  const [data, setData] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/Booking/bookings`);
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

  const columns: GridColDef[] = [
    { field: "id", headerName: "Mã Đặt", width: 100 },
    {
      field: "user.fullName",
      headerName: "Tên Người Đặt",
      flex: 1,
      renderCell: (params) => <>{params.row.user.fullName}</>,
    },
    {
      field: "date",
      headerName: "Ngày Đặt",
      flex: 1,
    },
    {
      field: "film",
      headerName: "Film",
      flex: 1,
      renderCell: (params) => <>{params.row.film.name}</>,
    },
    {
      field: "quantity",
      headerName: "Số vé",
      flex: 1,
    },
    {
      field: "totalPrice",
      headerName: "Số tiền",
      flex: 1,
      renderCell: (params) => <>{params.row.film.name}</>,
    },
    {
      field: "position",
      headerName: "Vị trí ghế",
      flex: 1,
    },
  ];

  return (
    <>
      <div className="w-full h-full bg-white rounded-lg">
        <p className="text-3xl font-bold ml-3 pt-3">Quản lý đặt vé</p>
        <div className=" mt-5" style={{ height: "60vh" }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </div>
    </>
  );
};

export default BookingPage;

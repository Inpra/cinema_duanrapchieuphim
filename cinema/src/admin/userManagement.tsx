import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
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
}

const UserPage: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/User/Users");
        setData(response.data);
      } catch (err) {}
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Mã khách hàng", width: 120 },
    {
      field: "fullName",
      headerName: "Tên khách hàng",
      flex: 1,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Số điện thoại",
      flex: 1,
      editable: true,
    },
    {
      field: "address",
      headerName: "Điạ chỉ",
      flex: 1,
      editable: true,
    },
    {
      field: "ammount",
      headerName: "Số tiền",
      flex: 1,
      editable: true,
    },
    {
      field: "action",
      headerName: "Hàng động",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <strong>
          <Button variant="contained" color="error" size="small">
            Ban
          </Button>
        </strong>
      ),
    },
  ];

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    try {
      const result = await axiosInstance.post("/User/register", {
        email,
        password,
        address,
        fullName,
        phoneNumber,
      });
      localStorage.setItem("user", JSON.stringify(result.data));
      setOpen(false);
    } catch (err: any) {
      alert(`${err.message}`);
    }
  };

  return (
    <>
      <div className="w-full h-full bg-white rounded-lg">
        <p className="text-3xl font-bold pt-3 ml-3">Quản lý khách hàng</p>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          className="!mt-5 !ml-5"
        >
          Thêm tài khoản
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title" className="w-96">
            {"Thêm khách hàng mới"}
          </DialogTitle>
          <DialogContent>
            <div className="my-5">
              <TextField
                className="w-full "
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
              />
            </div>
            <div className="my-5">
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                type="password"
                label="Mật Khẩu"
              />
            </div>
            <div className="my-5">
              <TextField
                className="w-full "
                onChange={(e) => setAddress(e.target.value)}
                label="Địa chỉ"
              />
            </div>
            <div className="my-5">
              <TextField
                className="w-full "
                onChange={(e) => setFullName(e.target.value)}
                label="Họ và tên"
              />
            </div>
            <div className="my-5">
              <TextField
                className="w-full "
                onChange={(e) => setPhoneNumber(e.target.value)}
                label="Số điện thoại"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy bỏ</Button>
            <Button onClick={handleCreate} autoFocus>
              Lưu
            </Button>
          </DialogActions>
        </Dialog>
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

export default UserPage;

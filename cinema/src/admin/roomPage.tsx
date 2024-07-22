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

const RoomPage: React.FC = () => {
  const [room, setRoom] = useState();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/theater/rooms");
        setRoom(response.data);
      } catch (err) {}
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const response = await axiosInstance.post("/theater/add", { name: name });
      setOpen(true);
    } catch (err) {}
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "Mã Rạp", width: 120 },
    {
      field: "name",
      headerName: "Tên Rạp",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Hàng động",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 300,
      renderCell: (params: GridRenderCellParams) => (
        <strong>
          <Button variant="contained" color="success" size="small">
            Chỉnh sửa
          </Button>
          <span className="mx-2">|</span>
          <Button variant="contained" color="error" size="small">
            Ngưng hoạt động
          </Button>
        </strong>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      firstName: "Rạp 1",
      lastName: "100",
      status: "Đang hoạt động",
    },
  ];

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="w-full h-full bg-white rounded-lg">
        <p className="text-3xl font-bold pt-3 ml-3">Quản lý rạp</p>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          className="!mt-5 !ml-5"
        >
          Thêm Rạp
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">{"Thêm rạp mới"}</DialogTitle>
          <DialogContent>
            <TextField
              label="Tên Rạp"
              id="fullWidth"
              className="!my-2"
              onChange={(x) => setName(x.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy bỏ</Button>
            <Button onClick={handleSave} autoFocus>
              Lưu
            </Button>
          </DialogActions>
        </Dialog>
        <div className=" mt-5" style={{ height: "60vh" }}>
          <DataGrid
            rows={room}
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

export default RoomPage;

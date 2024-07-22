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
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axiosServices";

export interface Root {
  id: number;
  name: string;
  trailerLink: string;
  director: string;
  actor: string;
  publishDate: string;
  hours: number;
  imageUrl: string;
  language: string;
}

const FilmPage: React.FC = () => {
  const navigate = useNavigate();
  const [film, setFilm] = useState([]);
  const [name, setName] = useState<string>("");
  const [trailerLink, setTrailerLink] = useState<string>("");
  const [director, setDirector] = useState<string>("");
  const [actor, setActor] = useState<string>("");
  const [publishDate, setPublishDate] = useState<string>("");
  const [hours, setHours] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [language, setLanguage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/Film/films");
        setFilm(response.data);
      } catch (err) {}
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Tên phim",
      width: 150,
    },
    {
      field: "publishDate",
      headerName: "Ngày ra mắt",
      width: 150,
    },
    {
      field: "trailerLink",
      headerName: "Trailer phim",
      width: 100,
    },
    {
      field: "director",
      headerName: "Đạo diễn",
      width: 100,
    },
    {
      field: "actor",
      headerName: "Diễn viên",
      width: 150,
    },
    {
      field: "hours",
      headerName: "Thời lượng",
      width: 100,
    },
    {
      field: "imageUrl",
      headerName: "Poster",
      width: 150,
    },
    {
      field: "language",
      headerName: "Ngôn ngữ",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 400,
      renderCell: (params: GridRenderCellParams) => (
        <strong>
          <Button
            variant="contained"
            className="!mx-2"
            color="primary"
            size="small"
            onClick={() => navigate(`${params.row.id}`)}
          >
            Chi tiết
          </Button>
          |
          <Button
            className="!mx-2"
            variant="contained"
            color="error"
            size="small"
          >
            Ngưng chiếu
          </Button>
          |
          <Button
            className="!ml-2"
            variant="contained"
            color="success"
            size="small"
          >
            Sửa
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

  const handleSave = async () => {
    try {
      const response = await axiosInstance.post("/Film/add", {
        name: name,
        trailerLink: trailerLink,
        director: director,
        actor: actor,
        publishDate: publishDate,
        hours: hours,
        imageUrl: imageUrl,
        language: language,
      });
      setFilm(response.data);
    } catch (err) {}
  };

  return (
    <>
      <div className="w-full h-full bg-white rounded-lg">
        <p className="text-3xl font-bold ml-3 pt-3">Quản lý phim</p>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          className="!mt-5 !ml-5"
        >
          Thêm Phim Mới
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">{"Thêm Phim Mới"}</DialogTitle>
          <DialogContent>
            <TextField
              label="Tên phim"
              id="fullWidth"
              onChange={(e) => setName(e.target.value)}
              className="!my-2"
              fullWidth
            />
            <TextField
              label="Trailer link"
              id="fullWidth"
              onChange={(e) => setTrailerLink(e.target.value)}
              className="!my-2"
              fullWidth
            />
            <TextField
              label="Đạo diễn"
              id="fullWidth"
              className="!my-2"
              onChange={(e) => setDirector(e.target.value)}
              fullWidth
            />
            <TextField
              label="Diễn viễn"
              id="fullWidth"
              className="!my-2"
              fullWidth
              onChange={(e) => setActor(e.target.value)}
            />
            <TextField
              label="Ngày chiếu"
              type="date"
              id="fullWidth"
              className="!my-2"
              onChange={(e) => setPublishDate(e.target.value)}
              fullWidth
            />
            <TextField
              label="Thời lượng"
              id="fullWidth"
              className="!my-2"
              onChange={(e) => setHours(Number(e.target.value))}
              fullWidth
            />
            <TextField
              label="Ngôn ngữ"
              id="fullWidth"
              onChange={(e) => setLanguage(e.target.value)}
              className="!my-2"
              fullWidth
            />
            <TextField
              label="Hình ảnh"
              id="fullWidth"
              onChange={(e) => setImageUrl(e.target.value)}
              className="!my-2"
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
            rows={film}
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

export default FilmPage;

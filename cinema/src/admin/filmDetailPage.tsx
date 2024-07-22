import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

const FilmDetailPage: React.FC = () => {
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
        <p className="text-3xl font-bold ml-3 pt-3">Quản lý phim</p>
      </div>
    </>
  );
};

export default FilmDetailPage;

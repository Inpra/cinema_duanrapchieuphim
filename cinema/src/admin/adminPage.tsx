import { Button, Drawer, Grid } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const handelLogout = () => {
    localStorage.clear();
    navigate("../login");
  };

  return (
    <>
      <div className="bg-white flex justify-between" style={{ height: "5vh" }}>
        <div className="text-2xl ml-3">Xin chào Admin</div>
        <div>
          <Button
            onClick={handelLogout}
            size="small"
            className="!mr-3"
            variant="contained"
            color="error"
          >
            Đăng xuất
          </Button>
        </div>
      </div>
      <Grid className="bg-slate-300 " container spacing={2}>
        <Grid className="bg-slate-50" item xs={2}>
          <div style={{ height: "95vh !important" }} className="!bg-white">
            <Link to={"dashboard"}>
              <Button className="w-full" variant="contained">
                Báo cáo
              </Button>
            </Link>
            <Link to={"user"}>
              <Button className="w-full" variant="contained">
                Quản lý khách hàng
              </Button>
            </Link>
            <Link to={"film"}>
              <Button className="w-full" variant="contained">
                Quản lý phim
              </Button>
            </Link>
            <Link to={"booking"}>
              <Button className="w-full" variant="contained">
                Quản lý đặt vé
              </Button>
            </Link>
            <Link to={"room"}>
              <Button className="w-full" variant="contained">
                Quản lý phòng chiếu
              </Button>
            </Link>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className="w-full " style={{ height: "95vh" }}>
            <Outlet />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminPage;

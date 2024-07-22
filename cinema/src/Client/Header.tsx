import { Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");

  const handelLogout = () => {
    localStorage.clear();
    navigate("../login");
  };

  return (
    <>
      <div>
        <Grid container className="h-16">
          <Grid xs={1} className="flex justify-center items-center">
            <div className="text-5xl font-bold text-white">TNTO</div>
          </Grid>
          <Grid xs={1}></Grid>
          <Grid xs={1}></Grid>
          <Grid xs={1} className="flex justify-center items-center">
            <Link to={"home"}>
              <div className="text-2xl font-bold text-white">Trang chủ</div>
            </Link>
          </Grid>
          <Grid xs={1} className="flex justify-center items-center">
            <Link to={"films"}>
              <div className="text-2xl font-bold text-white">Phim</div>
            </Link>
          </Grid>
          <Grid xs={1} className="flex justify-center items-center">
            <Link to={"ticket"}>
              <div className="text-2xl font-bold text-white">Vé của tôi</div>
            </Link>
          </Grid>
          <Grid xs={1}></Grid>
          <Grid xs={1}></Grid>
          <Grid xs={1}></Grid>
          <Grid xs={2} className="flex justify-center items-center">
            {user.id === undefined ? (
              <Link to={"login"}>
                <div className="text-2xl font-bold text-white">Đăng Nhập</div>
              </Link>
            ) : (
              <Link to={"profile"}>
                <div className="text-2xl font-bold text-white">
                  {user.fullName}
                </div>
              </Link>
            )}
          </Grid>
          <Grid xs={1} className="flex justify-center items-center">
            {user.id === undefined ? (
              <Link to={"#"}>
                <div className="text-2xl font-bold text-white">Đăng ký</div>
              </Link>
            ) : (
              <div
                onClick={handelLogout}
                className="text-2xl font-bold text-white cursor-pointer"
              >
                Đăng xuất
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Header;

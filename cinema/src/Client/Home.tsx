import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className=" h-full bg-black" style={{ height: "1086px" }}>
        <Grid container>
          <Grid className="h-full bg-red-500" xs={2}></Grid>
          <Grid xs={8}>
            <div className="flex justify-center font-bold text-4xl text-yellow-300">
              ============= WellCome to TNTO Cenima =============
            </div>
            <div className="text-4xl font-bold  text-red-500">
              Phim sắp chiếu
            </div>

            <Grid container>
              <Grid
                className="h-full flex justify-center items-center mt-5"
                xs={3}
              >
                <img
                  className="object-cover"
                  src="https://innovavietnam.vn/wp-content/uploads/poster-561x800.jpg"
                  alt=""
                  style={{ width: 300, height: 400 }}
                />
              </Grid>
              <Grid
                className="h-full flex justify-center items-center mt-5"
                xs={3}
              >
                <Link to={"../film"}>
                  <img
                    className="object-cover"
                    src="https://ocwckgy6c1obj.vcdn.cloud/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/l/m/lm6_2x3_layout.jpg"
                    alt=""
                    style={{ width: 300, height: 400 }}
                  />
                </Link>
              </Grid>
              <Grid
                className="h-full flex justify-center items-center mt-5"
                xs={3}
              >
                <img
                  className="object-cover"
                  src="https://bazaarvietnam.vn/wp-content/uploads/2022/03/Harpers-Bazaar-top-phim-chieu-rap-thang-4-2022_02-scaled.jpg"
                  alt=""
                  style={{ width: 300, height: 400 }}
                />
              </Grid><Grid
                className="h-full flex justify-center items-center mt-5"
                xs={3}
              >
                <img
                  className="object-cover"
                  src="https://cdn.voh.com.vn/voh/Image/2020/08/05/b0bceb5084136d4d3402_20200805102134.jpg"
                  alt=""
                  style={{ width: 300, height: 400 }}
                />
              </Grid>
            </Grid>

            <div className="flex justify-end">
              <Button className="!lowercase !text-2xl !text-zinc-100">
                Xem thêm
              </Button>
            </div>
            <div className="text-4xl font-bold text-red-500">
              Phim đang chiếu
            </div>
            <Grid container>
              <Grid
                className="h-full flex justify-center items-center mt-5"
                xs={3}
              >
                <img
                  className="object-cover"
                  src="https://th.bing.com/th/id/OIP.WpjIjGQtAMaGtKxgDDo-XAHaKC?rs=1&pid=ImgDetMain"
                  alt=""
                  style={{ width: 300, height: 400 }}
                />
              </Grid>
              <Grid
                className="h-full flex justify-center items-center mt-5"
                xs={3}
              >
                <img
                  className="object-cover"
                  src="https://th.bing.com/th/id/R.099da7e23f41b486e3d87c45284ac448?rik=pUeJa8aYKy%2fRsg&pid=ImgRaw&r=0"
                  alt=""
                  style={{ width: 300, height: 400 }}
                />
              </Grid>
              <Grid
                className="h-full flex justify-center items-center mt-5"
                xs={3}
              >
                <img
                  className="object-cover"
                  src="https://innovavietnam.vn/wp-content/uploads/poster-1-539x800.jpg"
                  alt=""
                  style={{ width: 300, height: 400 }}
                />
              </Grid>
              <Grid
                className="h-full flex justify-center items-center mt-5"
                xs={3}
              >
                <img
                  className="object-cover"
                  src="https://th.bing.com/th/id/R.7bd34ee955526d770a4598ad0d8c80a6?rik=9mTTk9Lsxf4%2bIw&riu=http%3a%2f%2fchangethethought.us%2fwp-content%2fuploads%2f2016%2f05%2f1610_SE7EN_1.jpg&ehk=SFhZTZeenJf1xySny059lPiP1JfPC5lGGXVPMmLgEnw%3d&risl=&pid=ImgRaw&r=0"
                  alt=""
                  style={{ width: 300, height: 400 }}
                />
              </Grid>
            </Grid>
            <div className="flex justify-end">
              <Button className="!lowercase !text-2xl !text-zinc-100">
                Xem thêm
              </Button>
            </div>
          </Grid>
          <Grid className="h-full bg-red-500" xs={2}></Grid>
        </Grid>
      </div>
    </>
  );
};

export default Home;

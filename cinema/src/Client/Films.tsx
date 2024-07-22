import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axios/axiosServices";

interface Film {
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

const Films = () => {
  const [data, setData] = useState<Film[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/Film/films");
        setData(response.data);
      } catch (err) {}
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <div>
          <Grid container>
            <Grid xs={2}></Grid>
            <Grid xs={8}>
              <div className="text-white font-bold gap-10 my-5 text-4xl flex justify-center">
                Danh sách phim
              </div>
              <Grid container>
                {data.map((item, index) => (
                  <Grid
                    key={index} // Thêm key để React có thể quản lý danh sách hiệu quả
                    className="h-full flex justify-center items-center mt-5"
                    xs={3}
                  >
                    <Link to={`../film/${item.id}`}>
                      <img
                        className="object-cover"
                        src={item.imageUrl} // Giả sử mỗi phần tử trong data có thuộc tính src chứa URL của hình ảnh
                        alt={item.name} // Giả sử mỗi phần tử trong data có thuộc tính alt chứa văn bản thay thế cho hình ảnh
                        style={{ width: 300, height: 400 }}
                      />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Films;

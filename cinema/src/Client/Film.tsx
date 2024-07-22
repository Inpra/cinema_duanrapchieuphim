import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosServices";
import { Link, useParams } from "react-router-dom";
import YouTube from "react-youtube";

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
  comments: Comment[];
}

interface Comment {
  id: number;
  content: string;
  createDate: string;
  user: User;
}

interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: any;
}

const Film = () => {
  const [data, setData] = useState<Film | null>(null);
  const [comment, setComment] = useState<string>("");
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const [isLoad, setIsLoad] = useState(false);

  const opts = {
    height: "513",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  useEffect(() => {
    setComment("");
    setIsLoad(false);
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/Film/${id}`);
        console.log(response.data);
        setData(response.data);
      } catch (err) {}
    };

    fetchData();
  }, [isLoad]);

  const handleSend = async () => {
    if (comment === "") {
      return;
    }
    try {
      const result = await axiosInstance.post("/Film/addComment", {
        comment,
        userId: user?.id,
        filmId: data?.id,
      });
      setComment("");
      setIsLoad(true);
    } catch (err: any) {
      alert(`${err.message}`);
    }
  };
  return (
    <>
      <div>
        <Grid container>
          <Grid xs={2}></Grid>
          <Grid xs={8}>
            <div className="text-white font-bold gap-10 my-5 text-4xl flex justify-center">
              Trailer Phim
            </div>
            <YouTube videoId={data?.trailerLink} opts={opts} />
            <Grid container>
              <Grid xs={4} className="flex justify-end mt-10">
                <img
                  className="object-cover"
                  src={data?.imageUrl}
                  alt=""
                  style={{ width: 300, height: 400 }}
                />
              </Grid>
              <Grid xs={7}>
                <div className="text-white font-bold text-xl mt-10 ml-10">
                  <div className="mb-10 text-4xl ">{data?.name}</div>
                  <div className="mb-3">Đạo diễn :{data?.director}</div>
                  <div className="mb-3">Diễn viên : {data?.actor}</div>
                  <div className="mb-3">
                    Thể loại : Hành Động, Phiêu Lưu, Thần thoại
                  </div>
                  <div className="mb-3">Khởi chiếu : {data?.publishDate}</div>
                  <div className="mb-3">Thời lượng : {data?.hours}</div>
                  <div className="mb-3">Ngôn ngữ : {data?.language}</div>
                </div>
                <Link to={`../booking/${data?.id}`}>
                  <Button className="!bg-lime-500 !text-white !capitalize !font-bold !ml-10 !mt-10">
                    Đặt Vé
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <div style={{ border: "2px solid white" }} className="mt-10">
              <Grid container padding={5}>
                {data?.comments.map((item, index) => (
                  <>
                    <Grid xs={2}>
                      <div className="flex justify-end pr-10 mb-10">
                        <img
                          className="rounded-full"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngDLxVdX-4fhpWyG8hDPxUWyGV1B9uOXJ3Q&s"
                          alt=""
                          width={80}
                          height={80}
                        />
                      </div>
                    </Grid>
                    <Grid xs={10}>
                      <div className="flex justify-between text-xl text-white">
                        <div>{item.user?.fullName}</div>
                        <div>{item.createDate}</div>
                      </div>
                      <div className="mt-3 text-xl p-2 bg-white rounded-lg">
                        {item.content}
                      </div>
                    </Grid>
                  </>
                ))}

                <Grid xs={12}>
                  <div className="text-xl font-bold my-5 text-white">
                    Bình luận mới
                  </div>
                  <textarea
                    onChange={(e) => setComment(e.target.value)}
                    name=""
                    className="rounded-lg p-2 w-full"
                    id=""
                    required
                    value={comment}
                  ></textarea>
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSend}
                      className="!bg-red-600 !text-white !capitalize !font-bold !mt-5 "
                    >
                      Gửi
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid xs={2}></Grid>
        </Grid>
      </div>
    </>
  );
};

export default Film;

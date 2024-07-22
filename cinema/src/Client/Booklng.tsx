import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosServices";
import { useParams } from "react-router-dom";
import { threadId } from "worker_threads";

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

interface Hour {
  label: string;
  value: number;
}

const Booking = () => {
  const categories = "ABCDEFGHIJ";
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const [data, setData] = useState<Film | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookedSeats, setbookedSeats] = useState<string[]>([]);

  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/Film/withThearter/${id}`);
        console.log(response.data);
        setData(response.data);
      } catch (err) {}
    };

    fetchData();
  }, []);

  const seats = [];
  for (let i = 0; i < 120; i++) {
    const category = categories[Math.floor(i / 12)];
    const seat = `${category}${(i % 12) + 1}`;
    const isSelected = selectedSeats.includes(seat);
    const isBooked = bookedSeats.includes(seat);

    seats.push(
      <Button
        key={i}
        className={`!capitalize !font-bold !mt-5 ${
          isBooked
            ? "!bg-gray-400 !text-gray-700 cursor-not-allowed"
            : isSelected
            ? "!bg-blue-400"
            : "!bg-green-400"
        } !text-white`}
        onClick={() => toggleSeatSelection(seat)}
        disabled={isBooked} // Disable the button if the seat is booked
      >
        {seat}
      </Button>
    );
  }

  const formattedCost = (totalCost: number) => {
    return new Intl.NumberFormat("vi-VN").format(totalCost);
  };

  const toggleSeatSelection = (seat: any) => {
    setSelectedSeats((prevSelectedSeats: any) => {
      if (prevSelectedSeats.includes(seat)) {
        return prevSelectedSeats.filter((s: any) => s !== seat);
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  };

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
  const selectedValues: number[] =
    data?.theater.map((theater) => theater.slot) ?? [];

  const [activeButton, setActiveButton] = useState<number | null>(null);

  const handleButtonClick = (value: number) => {
    setActiveButton(value === activeButton ? null : value);
  };

  const filterDate: Date[] =
    data?.theater.map((theater) => new Date(theater.date)) ?? [];

  const [selectDate, setSelectDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    setSelectDate((prevDate) =>
      prevDate && prevDate.toISOString() === date.toISOString() ? null : date
    );
  };
  const theaterId =
    data?.theater.find((theater) => theater.slot === activeButton)?.id ?? null;

  useEffect(() => {
    var id =
      data?.theater.find((theater) => theater.slot === activeButton)?.id ??
      null;
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/Booking/seats/${id}`);
        setbookedSeats(response.data);
      } catch (err) {
        setbookedSeats([]);
      }
    };

    fetchData();
  }, [activeButton]);

  const handleBooking = async () => {
    console.log(theaterId);
    console.log(selectDate);
    console.log(selectedSeats);
    if (theaterId === null) return;
    if (selectDate === null) return;
    if (selectedSeats.length === 0) return;

    try {
      const result = await axiosInstance.post("/Booking/add", {
        filmId: data?.id,
        date: selectDate,
        slot: activeButton,
        position: selectedSeats,
        totalPrice: selectedSeats.length * 45000,
        userId: user.id,
        thearterId: theaterId,
        quantity: selectedSeats.length,
      });
      alert("đã cập nhật thành công");
    } catch (err: any) {
      alert(`${err.message}`);
    }
  };

  return (
    <>
      <div>
        <div>
          <Grid container>
            <Grid xs={2}></Grid>
            <Grid xs={8}>
              <div className="text-white font-bold gap-10 my-5 text-4xl flex justify-center">
                Đặt vé
              </div>
              <div className="text-white font-bold gap-10 my-5 flex justify-center">
                Chọn ngày chiếu
              </div>
              <div className="text-white font-bold gap-10 my-5 flex justify-center">
                {filterDate.map((date) => (
                  <Button
                    key={date.toISOString()}
                    className={`!capitalize !font-bold !mt-5 ${
                      selectDate?.toISOString() === date.toISOString()
                        ? "!bg-blue-400"
                        : "!bg-gray-400"
                    } !text-white`}
                    onClick={() => handleDateClick(date)}
                  >
                    {date.toDateString()}
                  </Button>
                ))}
              </div>
              {selectDate !== null && (
                <>
                  <div className="text-white font-bold gap-10 my-5 flex justify-center">
                    Chọn giờ chiếu
                  </div>
                  <div className="text-white font-bold gap-10 my-5 flex justify-center">
                    {hours
                      .filter((hour: Hour) =>
                        selectedValues.includes(hour.value)
                      )
                      .map((hour: Hour) => (
                        <Button
                          key={hour.value}
                          className={`!capitalize !font-bold !mt-5 ${
                            activeButton === hour.value
                              ? "!bg-red-400"
                              : "!bg-green-400"
                          } !text-white`}
                          value={hour.value}
                          onClick={() => handleButtonClick(hour.value)}
                        >
                          {hour.label}
                        </Button>
                      ))}
                  </div>
                </>
              )}
              {activeButton !== null && (
                <>
                  <div className="text-white font-bold gap-10 my-5 flex justify-center">
                    Chọn ghế
                  </div>
                  <div className="text-white font-bold gap-10 my-5 flex justify-center flex-wrap">
                    {seats}
                  </div>
                </>
              )}
            </Grid>
            <Grid xs={2}>
              <div
                className="rounded-lg p-5"
                style={{ border: "2px solid white " }}
              >
                <div className="text-white font-bold gap-10 my-5 text-2xl ">
                  Tên Phim
                </div>
                <div className="text-white font-bold">{data?.name}</div>
                <div className="text-white font-bold gap-10 my-5 text-2xl ">
                  Giá vé
                </div>
                <div className="text-white font-bold">45.000đ</div>

                <div className="text-white font-bold gap-10 my-5 text-2xl ">
                  Ngày
                </div>
                <div className="text-white font-bold">
                  {selectDate?.toDateString() ?? ""}
                </div>
                <div className="text-white font-bold gap-10 my-5 text-2xl ">
                  Slot
                </div>
                <div className="text-white font-bold">{activeButton}</div>
                <div className="text-white font-bold gap-10 my-5 text-2xl ">
                  Tổng giá
                </div>
                <div className="text-white font-bold">
                  {formattedCost(selectedSeats.length * 45000)} đ
                </div>
                <div className="text-white font-bold gap-10 my-5 flex justify-center">
                  {selectedSeats.length !== 0 && (
                    <Button
                      className="!bg-red-600 !text-white !capitalize !font-bold !mt-5 "
                      onClick={() => handleBooking()}
                    >
                      Đặt vé
                    </Button>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Booking;

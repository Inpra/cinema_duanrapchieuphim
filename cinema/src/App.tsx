import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./admin/adminPage";
import UserPage from "./admin/userManagement";
import FilmPage from "./admin/filmManagement";
import BookingPage from "./admin/bookingManagement";
import DashboardPage from "./admin/dashboardPage";
import RoomPage from "./admin/roomPage";
import FilmDetailPage from "./admin/filmDetailPage";
import TrangChu from "./Client/HomePage";
import Film from "./Client/Film";
import Home from "./Client/Home";
import Ticket from "./Client/ticket";
import Films from "./Client/Films";
import Booking from "./Client/Booklng";
import Login from "./authen/Login";
import Profile from "./Client/Profile";
import Register from "./authen/Rgister";

function App() {
  return (
    <Routes>
      <Route path="admin" element={<AdminPage />}>
        <Route path="user" element={<UserPage />}></Route>
        <Route path="film" element={<FilmPage />}></Route>
        <Route path="film/:id" element={<FilmDetailPage />}></Route>
        <Route path="booking" element={<BookingPage />}></Route>
        <Route path="dashboard" element={<DashboardPage />}></Route>
        <Route path="room" element={<RoomPage />}></Route>
      </Route>
      <Route path="register" element={<Register />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="" element={<TrangChu />}>
        <Route path="film/:id" element={<Film />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="ticket" element={<Ticket />}></Route>
        <Route path="films" element={<Films />}></Route>
        <Route path="booking/:id" element={<Booking />}></Route>
        <Route path="profile" element={<Profile />}></Route>
      </Route>
    </Routes>
  );
}

export default App;

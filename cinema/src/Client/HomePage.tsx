import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const TrangChu = () => {
  return (
    <div className="">
      <div className="h-16 bg-black">
        <Header />
      </div>
      <div className="bg-black">
        <Outlet />
      </div>
      <div className=" bg-slate-900">
        <Footer />
      </div>
    </div>
  );
};

export default TrangChu;

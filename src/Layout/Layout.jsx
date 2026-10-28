import React from "react";
import { Link, Outlet } from "react-router";
import logo from "/public/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const Layout = () => {
  return (
    <>
      <div className="bg-[#ed9f72] w-[100%] h-[70px] mb-2.5 z-20">
        <header className="bg-[#ed9f72] flex items-center fixed top-0 w-full left-0 justify-between p-4  h-20 px-20 z-50">
          <div>
            <img src={logo} alt="Logo" />
          </div>
          <div className="flex gap-10">
            <Link to="/">Home</Link>
            <Link to="/catalog">Catalog</Link>
            <Link to="/products">Products</Link>
            <Link to="/">Blog</Link>
            <Link to="/">Contacts</Link>
          </div>
          <div className="flex gap-4">
            <Button className="bg-[#FF3F3A] hover:bg-[#e66b32] p-6">
              Get consultation
            </Button>
            <Button
              variant="outline"
              className="p-6 text-[#FF3F3A] hover:bg-[#e66b32]"
            >
              Log in / Register
            </Button>
          </div>
        </header>
       
      </div>
      <Outlet />
     

    </>
  );
};

export default Layout;

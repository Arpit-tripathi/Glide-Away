import React, { useEffect, useState } from "react";
import { Button } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Link } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FiMenu, FiX } from "react-icons/fi";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialoge, setOpenDialoge] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log("User Info:", resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialoge(false);
        toast("Login successfully 🚀");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Failed to fetch user info", err);
        toast("Login Failed, try Again📄");
      });
  };

  return (
    <div className="h-16 shadow-sm flex justify-between items-center px-4 sm:px-8 relative">
      <a href="/">
        <img src="/logo-t.png" alt="logo" className="h-18 w-18 xs:h-14 xs:w-14 sm:h-16 sm:w-16 md:h-22 md:w-22 lg:h-26 lg:w-26 transition-all duration-200" />
      </a>
      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center gap-5">
        {user ? (
          <>
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full text-white">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full text-white">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button onClick={() => setOpenDialoge(true)}>sign in</Button>
        )}
      </div>
   
      {/* Mobile Hamburger */}
      <div className="sm:hidden flex items-center text-white">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="focus:outline-none"
        >
          {/* Smaller icon size */}
          {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="fixed top-0 right-0 h-full w-2/3 max-w-xs bg-white shadow-lg rounded-l-lg p-6 flex flex-col gap-5 z-50">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="focus:outline-none"
              >
                <FiX size={22} />
              </button>
            </div>
            {user ? (
              <>
                <a href="/create-trip">
                  <Button variant="outline" className="rounded-full text-white w-full text-left">
                    + Create Trip
                  </Button>
                </a>
                <a href="/my-trips">
                  <Button variant="outline" className="rounded-full text-white w-full text-left">
                    My Trips
                  </Button>
                </a>
                <div className="flex items-center gap-2">
                  <img
                    src={user?.picture}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-8 w-8 rounded-full"
                  />
                  <button
                    className="text-sm text-gray-700"
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Button onClick={() => { setOpenDialoge(true); setMobileMenuOpen(false); }} className="w-full">
                sign in
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Dialog for Google Login */}
      <Dialog open={openDialoge} onOpenChange={setOpenDialoge}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center ">
              <img src="/logo-t.png" className="h-20 w-20 sm:h-32 sm:w-32" />
            </DialogTitle>
            <DialogDescription>
              <h2 className="flex justify-center items-center pt-0.5">
                Sign in with Google
              </h2>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" /> Sign in With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
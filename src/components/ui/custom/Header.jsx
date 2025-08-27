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
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialoge, setOpenDialoge] = useState(false);
    

  // console.log(user?.picture)

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
    <div className="h-16 shadow-sm  flex justify-between items-center ">
    <a href="/">
      <img src="/logo-t.png" alt="logo" className="h-32 w-32 " />
      </a>
      <div>
        {user ? (
          <div className="flex items-center gap-5">
            <a href="/create-trip">
            <Button variant="outline" className="rounded-full text-white">
              {" "}
              + Create Trip
            </Button>
            </a>
          <a href="/my-trips">
            <Button variant="outline" className="rounded-full text-white">
              {" "}
              My Trips
            </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                {" "}
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
          </div>
        ) : (
          <Button onClick={()=>setOpenDialoge(true)}>sign in</Button>
        )}
      </div>
           <Dialog open={openDialoge}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex justify-center items-center ">
                    <img src="/public/logo-t.png" className="h-32 w-32" />
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

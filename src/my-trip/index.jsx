import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../service/firebaseConfig";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigation = useNavigate();
  const [userTrips, SetUserTrips] = useState([]);
  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigation("/");
      return;
    }
    SetUserTrips([]);
    const q = query(
      collection(db, "AiTrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      SetUserTrips(prevVal => [...prevVal, doc.data()]);
    });
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl p-5">My Trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">{userTrips?.length>0?userTrips.map((trip,index)=>(
        <UserTripCardItem trip={trip} key={index} />
      ))
      :[1,2,3,4,5,6].map((item,index)=>(
        <div key={index} className="h-[200px] w-full bg-slate-200 animate-pulse rounded-xl">

        </div>
      ))
      }</div>
    </div>
  );
}

export default MyTrips;

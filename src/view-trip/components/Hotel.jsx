import React from "react";
import { Link } from "react-router";
function Hotel({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-5">
        {trip?.tripData?.hotels?.map((hotels, index) => (
          <Link
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              hotels?.name +
              "," +
              hotels?.address
            }
            target="_blank" style={{color:"black"}}
          >
            <div className="hover:scale-105 transition-all cursor-pointer ">
              <img
                src="/public/planeH.png"
                alt="plane"
                className="rounded-xl"
                
              />
              <div className="my-2 flex flex-col gap-2" key={index}>
                <h2 className="font-medium" key={index}>{hotels?.name}</h2>
                <h2 className="text-xs text-gray-500" >📍{hotels.address}</h2>
                <h2 className="text-xm ">💰 ₹ {hotels?.pricePerNightINR}</h2>
                <h2 className="text-xm ">🌟{hotels?.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotel;

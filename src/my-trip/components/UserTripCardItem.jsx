import React from "react";
import { Link } from "react-router";

function UserTripCardItem({ trip }) {
  return (
    <Link to={"/view-trip/" + trip?.id} style={{color:"black"}}>
      <div className="hover:scale-105 transitio">
        <img
          src="/planeH.png"
          alt="trips"
          className="object-cover rounded-xl"
        />
        <div>
          <h2 className="font-bold text-lg">{trip?.userSelection?.location}</h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} Budget{" "}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;

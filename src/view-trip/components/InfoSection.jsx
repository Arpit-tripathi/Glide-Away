// import React, { useEffect } from "react";
import { Button } from "../../components/ui/button";
import { IoSend } from "react-icons/io5";
import { GetPlaceDetails } from "../../service/GlobalApi";

function InfoSection({ trip }) {

//   useEffect(()=>{
//     trip&&GetPlacePhoto()
//   },[trip])

// const GetPlacePhoto=async()=>{
//   const data={
//     textQuery:trip?.userSelection?.location
//   }
// const result=await GetPlaceDetails(data).then(resp=>{
//   console.log(resp.data)
// })
// }

  return (
    <div>
      <img
        src="/public/planeH.png"
        alt="plane"
        className="h-[340px] w-full object-cover rounded-xl"
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-xl">{trip?.userSelection?.location}</h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm ">
              📆 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">
              🥂 No. Of Traveler : {trip?.userSelection?.Companions} People
            </h2>
          </div>
        </div>
        <Button> <IoSend /></Button>
      </div>
    </div>
  );
}

export default InfoSection;

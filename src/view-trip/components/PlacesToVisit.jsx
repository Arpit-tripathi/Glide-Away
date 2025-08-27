import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl">Palces to Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div key={index} >
            <h2 className="font-medium text-xl">Day {item.day}</h2>
             <p className="font-medium text-xl text-gray-500">Best Time: {item.bestTimeToVisit}</p>
             <div className="grid md:grid-cols-2 ">
            {item.places.map((place,index)=>(
              <div  key={index} className="my-3 p-1">
             <PlaceCardItem place={place}/>
              </div>
            ))}
           </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;

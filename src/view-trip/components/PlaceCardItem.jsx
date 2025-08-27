import React from 'react'
import { IoLocation } from "react-icons/io5";
import { Button } from '../../components/ui/button';
import { Link } from 'react-router';

function PlaceCardItem({place}) {
  return (
    <Link to={"https://www.google.com/maps/search/?api=1&query="+place.name+","+place.address} target='_blank'style={{color:"black"}}>
    <div className='shadow-md rounde-xl p-3 mt-2 flex gap-2 hover:scale-105 transition-all hover:shado-md cursor-pointer'>
      <img src={place?.imageUrl ? "/public/planeH.png": "nothinh"} alt={place.name} className='w-30 h-30 rounded-xl gap-5' />
      <div >
        <h2 className='font-bold text-xl'>{place.name}</h2>
        <p className='text-sm text-gray-400 '>{place.details.length > 100 ? place.details.slice(0, 100) + "..." :place?.details?.replace(/\s*\[[^\]]*\]/g, "")}</p>
         <p className='text-sm mb-2 mt-2'>🎟 Ticket: ₹{place.ticketPriceINR}</p>
        <h2 className='mt-2 mb-2 text-sm '>🕐{place?.travelTimeMinutes} minutes for travel</h2>
        {/* <Button> <IoLocation /></Button> */}
      </div> 
    </div>
    </Link>
  )
}

export default PlaceCardItem

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../../service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotel from "../components/Hotel";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  useEffect(() => {
    GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, "AiTrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("no Such document");
      toast("No Trip Found");
    }
  };
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* information */}
      <InfoSection trip={trip} />

      {/* Recommeneded Hotels */}
      <Hotel trip={trip} />
      {/* Daily Plan */}
      <PlacesToVisit trip={trip} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Viewtrip;

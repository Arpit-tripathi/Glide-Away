import React, { useState, useEffect } from "react";
import PlaceSearch from "../components/PlaceSearch";
import { AI_PROMPT, SelectBudgetOptions } from "../constants/options";
import { SelectTravelesList } from "../constants/options";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
// import { chatSession } from "../service/AIModal";
import main from "../service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [openDialoge, setOpenDialoge] = useState(false);

  const handleInputChange = (name, value) => {
    if (name == "noOfDays" && value > 10) {
      console.log("please Enter");
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  const login =useGoogleLogin({
    onSuccess:(codeResp)=>console.log(codeResp),
    onError:(error)=>console.log(error)
  })


  const OnGenrateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialoge(true);
      return;
    }

    if (
      !formData?.location ||
      !formData?.budget ||
      !formData?.Companions ||
      !formData?.noOfDays ||
      formData?.noOfDays > 10
    ) {
      toast("Please fill all details correctly.");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData.location)
      .replace("{totalDays}", formData.noOfDays)
      .replace("{totalDays}", formData.noOfDays)
      .replace("{traveler}", formData.Companions)
      .replace("{budget}", formData.budget);

    console.log("Prompt:", FINAL_PROMPT);

    try {
      const result = await main.sendMessage(FINAL_PROMPT);
      console.log("Trip Plan:", result);
      toast("Generated trip successfully 🛩️");
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Failed to generate trip. Please try again.");
    }
  };

  const GetUserProfile=()=>{
    axios.get(`h`)
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        {/* Destination */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <PlaceSearch
            onSelectPlace={(place) => {
              handleInputChange("location", place.place_name);
            }}
          />
          {/* {formData.place && (
            <p className="text-sm text-green-600 mt-1">
              You selected: {formData.place}
            </p>
          )} */}
        </div>

        {/* Duration */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <input
            className="border px-4 py-2 w-full rounded-lg"
            type="number"
            min={1}
            max={10}
            placeholder="ex. 3"
            onChange={(e) =>
              handleInputChange("noOfDays", parseInt(e.target.value, 10))
            }
          />
        </div>
      </div>

      {/* Budget */}
      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                formData?.budget == item.title && "shadow-lg border-black"
              }`}
              onClick={() => handleInputChange("budget", item.title)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Traveler */}
      <div>
        <h2 className="text-xl my-3 font-medium">
          Who are you traveling with?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                formData?.Companions == item.people && "shadow-lg border-black"
              }`}
              onClick={() => handleInputChange("Companions", item.people)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end my-10">
        <Button onClick={OnGenrateTrip}>Generate Trip</Button>
      </div>
      <Dialog open={openDialoge}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center ">
              <img src="/public/logo-t.png" className="h-32 w-32" />
            </DialogTitle>
            <DialogDescription>
              {/* <img src="/public/logo-t.png"  className="h-32 w-32 "/> */}
              <h2 className="flex justify-center items-center pt-0.5">Sign in with Google</h2>
              {/* <p>Sign in to the app With Google authentication securly</p> */}
              <Button onClick={login} className='w-full mt-5 flex gap-4 items-center' > <FcGoogle className="h-7 w-7" /> Sign in With Google </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;

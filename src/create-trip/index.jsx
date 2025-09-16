

import React, { useState, useEffect } from "react";
import PlaceSearch from "../components/PlaceSearch";
import { AI_PROMPT, SelectBudgetOptions } from "../constants/options";
import { SelectTravelesList } from "../constants/options";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
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
import { db } from "../service/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router";

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [openDialoge, setOpenDialoge] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && value > 10) return;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    // console.log("Form Data:", formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const extractJSON = (text) => {
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) return null;

    const jsonString = text.slice(jsonStart, jsonEnd + 1);
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      // console.error("Failed to parse extracted JSON:", jsonString);
      return null;
    }
  };

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

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData.location)
      .replace("{totalDays}", formData.noOfDays)
      .replace("{totalDays}", formData.noOfDays)
      .replace("{traveler}", formData.Companions)
      .replace("{budget}", formData.budget);

    console.log(FINAL_PROMPT);
    try {
      const result = await main.sendMessage(FINAL_PROMPT);
      // console.log("Raw AI Response:", result);

      const parsedTrip = extractJSON(result);
      if (!parsedTrip) {
        toast("Faild to generate trying again in some time.");
        setLoading(false);
        return;
      }

      await SaveAiTrip(parsedTrip);
      toast("Generated trip successfully 🛩️");
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Failed to generate trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    try {
      await setDoc(doc(db, "AiTrips", docId), {
        userSelection: formData,
        tripData: TripData,
        userEmail: user?.email,
        id: docId,
      });
      console.log("Saved tripData:", TripData);
    } catch (error) {
      console.error("Error saving trip to Firestore:", error);
      toast("Failed to save trip. Please try again.");
    } finally {
      setLoading(false);
      navigate("/view-trip/" + docId);
    }
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        // console.log("User Info:", resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialoge(false);
        toast("Login successfully 🚀");
        OnGenrateTrip();
      })
      .catch((err) => {
        console.error("Failed to fetch user info", err);
        toast("Login Failed, try Again📄");
      });
  };

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

      <div className="flex justify-end my-10">
        <Button disabled={loading} onClick={OnGenrateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h- w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      {/* Dialog */}
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

export default CreateTrip;



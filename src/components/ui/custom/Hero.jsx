import React from "react";
import { Button } from "../button";
import { Link } from "react-router";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-4 sm:mx-16 md:mx-32 lg:mx-56 gap-6 sm:gap-8 md:gap-9">
      <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-center mt-8 sm:mt-12 md:mt-16">
        <span className="text-[#f97316]">
          Discover Your Next Adventure With Ai:
        </span>
        <br className="hidden sm:block" />
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-500 text-center">
        Your personal trip planner and travel curator, creating custom itineraries
        tailored to your interest and budget
      </p>
      <Link to={'/create-trip'}>
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}

export default Hero;
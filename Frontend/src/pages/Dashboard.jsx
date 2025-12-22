import React from "react";
import { FaClipboardCheck } from "react-icons/fa";
import Hero from "../assets/hero-img.webp";
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <section className="bg-white min-h-[90vh] flex items-center pt-25" id="home">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Content */}
        <div className="max-w-xl mb-10 -ml-8 mt-10 lg:mb-0">
          <h1 className="text-4xl lg:text-4xl font-bold leading-tight mb-6 mt-[-40px]">
            Analyze your Resume  And get Tailored job recommendations Instantly
          </h1>
          <p className="text-lg text-gray-500 mb-2">Upload your resume and get an instant ATS score.<br/> Fast, easy and designed to help you stand out<br/> with tailored job recommendations</p>
          <br/>

{/* 
           {/* Link to Scan page */}
          <Link to="/upload">
            <button className="bg-blue-600 hover:bg-blue-700 text-white flex cursor-pointer items-center gap-2 py-3 px-6 rounded-full text-lg font-medium mb-4">
              <FaClipboardCheck />
              Get Started
            </button>
          </Link>
          
          <br/>

          <p className="text-sm text-gray-500">
            New to CareerSense?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">Join now</a>
          </p>
        </div>

        {/* Right Content - Image */}
        <div className="relative">
          {/* Main person image */}
          <img
            src={Hero}
            alt="Hero"
            className="max-w-full h-auto"
           
          />

          
        </div>

      </div>
    </section>
  );
}
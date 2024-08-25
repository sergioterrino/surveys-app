import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TypingEffect from "../components/TypingEffect";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col gap-3 justify-center items-center m-6 h-[calc(95vh-100px)]">
      <div className="flex justify-center">
        <img src="/images/hat.png" className="w-24" />
        <img src="/images/sortingHat.png" className="relative right-4 w-52" />
      </div>
      <div>
        <h1 className="text-lg font-semibold text-center">
          <TypingEffect text="Giive the street a voice, let the data speak" speed={35} loop={false}/>
        </h1>
      </div>
    </div>
  );
}

export default LandingPage;

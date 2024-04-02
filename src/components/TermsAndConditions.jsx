import React from "react";
import termconditions_banner from "../assets/images/termconditions_banner.jpg";
import BackNavigateButton from "./BackNavigateButton";

const TermsAndConditions = () => {
  return (
    <div className="bg-gradient-to-br from-transparent via-purple-300 to-transparent">
      <div className="flex flex-col justify-center items-center">
        <img
          src={termconditions_banner}
          alt="terms conditions banner"
          className="mt-5 px-4 lg:px-0"
        />
        <h1 className="mt-4 text-2xl font-semibold">Terms and Conditions</h1>
        <p className="mt-2 text-xl px-4 lg:px-0">This is the Terms and Conditions page.</p>
      </div>
      <div className="text-5xl flex justify-center">
        <BackNavigateButton  />
      </div>
    </div>
  );
};

export default TermsAndConditions;

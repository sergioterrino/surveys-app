import React from "react";
import { ClipLoader } from "react-spinners";

function Spinner({ isLoading }) {
  const override = {
    borderWidth: "10px", // Ajusta el grosor de la barra
  };
  return (
    <ClipLoader
      color="#5d00ff"
      loading={isLoading}
      size={100}
      cssOverride={override}
    />
  );
}

export default Spinner;

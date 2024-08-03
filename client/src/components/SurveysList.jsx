import { useEffect, useState } from "react";
import { getSurveys } from "../api/surveys";
import SurveyCard from "./SurveyCard";

function SurveysList() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const getSurveysList = async () => {
      const res = await getSurveys();
      console.log("geting surveys of the backend: ", res.data);
      setSurveys(res.data);
    };
    getSurveysList();
  }, []);

  return (
    <>
      <h1>Surveys List</h1>
      {surveys.map((survey, i) => (
        <SurveyCard survey={survey} key={i} />
      ))}
    </>
  );
}

export default SurveysList;

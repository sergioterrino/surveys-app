import { useEffect, useState } from "react";
import SurveysList from "../components/SurveysList";
import { getSurveys } from "../api/surveys";

function HomePage() {

  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const getSurveysList = async () => {
      try {
        const res = await getSurveys();
        setSurveys(res.data);
        console.log("geting surveys of the backend: ", res.data);
      } catch (error) {
        console.log('Error getting the surveys at Home', error);
      }
    };
    getSurveysList();
  }, []);

  return (
      <SurveysList surveys={surveys} title={"Current Surveys"}></SurveysList>
  );
}

export default HomePage;

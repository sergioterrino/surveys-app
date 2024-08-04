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
    <div>
      <div>HomePage. Aqui se mostrarán todas las cards de las surveys</div>
      <SurveysList surveys={surveys} title={"List of All surveys"}></SurveysList>
    </div>
  );
}

export default HomePage;

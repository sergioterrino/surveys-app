import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getAnswers } from "../api/surveys";

function OverallResultsPage() {
  const { id } = useParams();
  const location = useLocation();
  const [survey, setSurvey] = useState([]);
  const[answers, setAnswers] = useState([]);


  useEffect(() => {
    console.log("location.survey", location.state?.survey);
    setSurvey(location.state?.survey);
    console.log("surevyuuu", survey, survey.id);
  }, [location]);

  useEffect(() => {
    if (survey && survey.id) {
      console.log("entrando en overall bringAnswers");
      const bringAnswers = async () => {
        try {
          const res = await getAnswers(survey.id);
          console.log("Overall - useEffect - getAnswers - res ->", res);
          setAnswers(res.data);
          console.log('GETANSWERS -> ANSWERS: ', answers);
        } catch (error) {
          console.log("Error bringin the answers of survey", survey.id);
        }
      };
      bringAnswers();
    }
  }, [survey]);


  return (
    <div>
      <h1 className="text-center text-2xl pb-1 mb-3 bg-zinc-600 rounded-md">
        Overall Results
      </h1>
      <div className="px-4 border rounded-md">
        <h1 className="text-center mb-3 font-bold text-lg">{survey.title}</h1>
        <p>
          Aquí se verán el resumen, charts, etc de los resultados de todos los
          que han participado en la survey concreta
        </p>
        {answers.map((answer, i) => (
          <div key={i} className="bg-gray-500 mb-2">
            <h1>Answer Id: {answer.id}</h1>
            <h1>UserID = {answer.user}</h1>
            <p>Result q1: {answer.result1}</p>
            <p>Result q2: {answer.result2}</p>
            <p>Result q3: {answer.result3 | null}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OverallResultsPage;

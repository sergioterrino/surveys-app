import { useEffect, useState } from "react";
import SurveyForm from "../components/SurveyForm";
import { useLocation } from "react-router-dom";
import { getQuestions } from "../api/surveys";

function SurveyPage() {
  const [questions, setQuestions] = useState([]);
  const location = useLocation();
  const { survey } = location.state || {};

  if (!survey) {
    return <div>No survey data available</div>;
  }

  useEffect(() => {
    console.log("SurveyPage - survey -> ", survey);
    const fetchQuestions = async () => {
      if (survey) {
        try {
          console.log("SurveyPage - survey.user -> ", survey.id);
          const res = await getQuestions(survey.id);
          console.log("SurveyPage - res.data -> ", res.data);
          setQuestions(res.data);
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      } else {
        console.log("SurveyPage - No survey data available");
      }
    };
    fetchQuestions();
  }, [survey]);

  return (
    <div className=" lg:px-12 xl:px-36">
      <h1 className="text-font text-center text-2xl w-full pb-1">{survey.title}</h1>
      <hr />
      <SurveyForm survey={survey} questions={questions}></SurveyForm>
    </div>
  );
}

export default SurveyPage;

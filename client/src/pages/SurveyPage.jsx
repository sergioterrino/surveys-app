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
    <div>
      <h2>SurveyPage</h2>
      <SurveyForm survey={survey} questions={questions}></SurveyForm>
    </div>
  );
}

export default SurveyPage;

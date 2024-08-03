import SurveyForm from "../components/SurveyForm"
import { useLocation } from "react-router-dom";

function SurveyPage() {

  const location = useLocation(); 
  const { survey } = location.state || {};

  if (!survey) {
    return <div>No survey data available</div>;
  }

  return (
    <div>
      <h2>SurveyPage</h2>
      <SurveyForm survey={survey}></SurveyForm>
    </div>
  )
}

export default SurveyPage
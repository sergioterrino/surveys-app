import { useNavigate } from 'react-router-dom'

function SurveyCard({survey}) {

  const navigate = useNavigate();

  const goToSurveyPage = () => {
    navigate(`/surveys/${survey.id}`, {state: {survey: survey}})
  }

  return (
    <div>
      <h3>{survey.id} - {survey.title}</h3>
      <p>by {survey.user}</p>
      <p>{survey.description}</p>
      <button onClick={goToSurveyPage}>Fill out</button>
      <hr />
    </div>
  );
}

export default SurveyCard;

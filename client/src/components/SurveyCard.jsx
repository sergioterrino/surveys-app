import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsernameById } from "../api/surveys";

function SurveyCard({ survey, isAuth }) {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const goToSurveyPage = () => {
    navigate(`/surveys/${survey.id}`, { state: { survey: survey } });
  };

  const resultsSurvey = () => {
    console.log('resultsSurvey');
  }

  const editSurvey = () => {
    console.log('editSurvey');
  }

  const deleteSurvey = () => {
    console.log('delete survey');
  }

  useEffect(() => {
    const getUsername = async () => {
      try {
        const res = await getUsernameById(survey.user);
        console.log('SurveyCard - getUsername -> ', res);
        setUsername(res.data.username);
      } catch (error) {
        console.error(error);
      }
    };
    getUsername();
  }, []);

  return (
    <>
      {isAuth ? (
      <div>
        <h3>
          {survey.id} - {survey.title}
        </h3>
        <p>by {username}</p>
        <p>{survey.description}</p>
        <button onClick={resultsSurvey}>Results</button>
        <button onClick={editSurvey}>Edit</button>
        <button onClick={deleteSurvey}>Delete</button>
        <hr />
      </div>
    ) : (
      <div>
        <h3>
          {survey.id} - {survey.title}
        </h3>
        <p>by {username}</p>
        <p>{survey.description}</p>
        <button onClick={goToSurveyPage}>Fill out</button>
        <hr />
      </div>
    )}
    </>
  )

}

export default SurveyCard;

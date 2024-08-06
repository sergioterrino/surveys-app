import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSurvey, getUsernameById } from "../api/surveys";

function SurveyCard({ survey, isAuth, removeSurvey }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const goToSurveyPage = () => {
    navigate(`/surveys/${survey.id}`, { state: { survey: survey } });
  };

  const resultsSurvey = () => {
    console.log("resultsSurvey");
  };

  const updateSurvey = () => {
    console.log("updateSurvey");
    navigate(`/surveys/${survey.id}/update`, { state: { survey, fromUpdateSurvey: true } });
  };

  const delSurvey = async () => {
    try {
      console.log("delete survey");
      const res = await deleteSurvey(survey.id);
      console.log("SurCard - delSurvye - res - before-> ", res);
      if (res.status === 204) {
        removeSurvey(survey.id);
        console.log("SurCard - delSurvye - res-> ", res);
      }
    } catch (error) {
      console.error("Error deleting the survey:", error);
    }
  };

  useEffect(() => {
    const getUsername = async () => {
      try {
        const res = await getUsernameById(survey.user);
        console.log("SurveyCard - getUsername -> ", res);
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
          <button onClick={updateSurvey}>Update</button>
          <button onClick={delSurvey}>Delete</button>
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
  );
}

export default SurveyCard;

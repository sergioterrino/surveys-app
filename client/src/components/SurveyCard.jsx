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
    navigate(`/surveys/${survey.id}/update`, {
      state: { survey, fromUpdateSurvey: true },
    });
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
        <div className="flex flex-col items-center justify-between gap-2 bg-zinc-800 rounded-lg border p-3 text-center">
          <h3 className="font-bold text-lg">{survey.title}</h3>
          <p className="text-sm">{survey.description}</p>
          <div className="flex items-center justify-around w-full mt-2">
            <button
              onClick={resultsSurvey}
              className="px-2 rounded-lg font-bold bg-indigo-700 hover:bg-indigo-800 "
            >
              Results
            </button>
            <button
              onClick={updateSurvey}
              className="px-2 rounded-lg font-bold bg-blue-700 hover:bg-blue-800 "
            >
              Update
            </button>
            <button
              onClick={delSurvey}
              className="px-2 rounded-lg font-bold bg-red-700 hover:bg-red-800 "
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between gap-2 bg-zinc-800 rounded-lg border p-3 text-center">
          <div>
            <h3 className="font-bold text-lg">{survey.title}</h3>
            {/* <p className="text-sm text-gray-500">by {username}</p> */}
          </div>
          <p className="text-sm">{survey.description}</p>
          <button
            onClick={goToSurveyPage}
            className="px-2 rounded-lg font-bold bg-indigo-700 hover:bg-indigo-800 "
          >
            Fill out
          </button>
        </div>
      )}
    </>
  );
}

export default SurveyCard;

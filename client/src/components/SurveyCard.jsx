import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSurvey, getUsernameById } from "../api/surveys";
import ConfirmModal from "./ConfirmModal";

function SurveyCard({ survey, isAuth, removeSurvey }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const goToSurveyPage = () => {
    navigate(`/surveys/${survey.id}`, { state: { survey: survey } });
  };

  const resultsSurvey = () => {
    console.log("resultsSurvey + id", survey.id);
    navigate(`/surveys/${survey.id}/results/overall`, {
      state: { survey: survey },
    });
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
      if (res.status === 204) {
        removeSurvey(survey.id);
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Error deleting the survey:", error);
    }
  };

  // useEffect(() => {
  //   const getUsername = async () => {
  //     try {
  //       const res = await getUsernameById(survey.user);
  //       setUsername(res.data.username);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getUsername();
  // }, []);

  return (
    <>
      <div className="flex flex-col gap-2 bg-cyan-950  rounded-2xl shadow-2xl p-3 pt-2 pb-3">
        <div>
          <h3 className="font-bold text-lg">{survey.title}</h3>
          <hr className="w-full border-t border-gray-300 mt-2" />
        </div>

        <p className="text-md text-left text-slate-300">{survey.description}</p>

        <div className="mt-auto flex items-center justify-around w-full">
          {isAuth ? (
            <>
              <button
                onClick={resultsSurvey}
                className="px-2 py-1.5 inline-flex items-center rounded-lg font-bold border hover:bg-indigo-700 shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                  />
                </svg>
                Results
              </button>
              <button
                onClick={updateSurvey}
                className="px-2 py-1.5 inline-flex items-center rounded-lg font-bold border hover:bg-blue-700 shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
                Update
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-2 py-1.5 rounded-lg font-bold bg-red-700 hover:bg-red-800 inline-flex items-center gap-1 shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                Delete
              </button>
              <ConfirmModal
                onConfirm={delSurvey}
                message="¿Do you want to delete the survey?"
                showModal={showDeleteModal}
                setShowModal={setShowDeleteModal}
              />
            </>
          ) : (
            <>
              <button
                onClick={goToSurveyPage}
                className="px-4 py-2 rounded-lg font-bold border hover:bg-indigo-800 inline-flex items-center gap-1 shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                Fill out
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SurveyCard;

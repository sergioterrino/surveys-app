import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fillSurvey, getQuestions } from "../api/surveys";
import { toast } from "react-hot-toast";
import '../App.css'

function SurveyForm({ survey, questions }) {
  // const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getQuestionsOfSurvey = async () => {
  //     console.log('survey SurveyForm ->', survey);
  //     try {
  //       const res = await getQuestions(survey);
  //       setQuestions(res.data);
  //       console.log('res SurveyForm getQuestions->', res);
  //       console.log('questions SurveyForm ->', questions);
  //     } catch (error) {
  //       console.error("Error fetching questions:", error);
  //     }
  //   };
  //   getQuestionsOfSurvey();
  // }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("submit SurveyForm -> ", data);
      const res = await fillSurvey(survey.id, data);
      if (res.status === 201) {
        console.log("res fillSurvey -> ", res);
        navigate(`/surveys/${survey.id}/questions/results/overall`);
        toast.success("Survey filled");
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  });

  return (
    <div className="w-full p-4 flex flex-col justify-center">
      <form onSubmit={onSubmit}>
        {questions.map((question, i) => (
          <div key={i} className="text-center rounded-md p-2 pb-4 bg-zinc-600 mb-2">
            <h3 className="text-lg font-semibold mb-2.5">{i + 1} - {question.text}</h3>
            <input
              type="range"
              min="1"
              max="10"
              defaultValue={5}
              name={`q${i}`}
              {...register(`q${i}`, { required: true })}
              className="w-64 "
            />
            {errors[`q${i}`] && <div>This field is required</div>}
          </div>
        ))}
        <div className="mx-auto  text-center">
          <button
            type="submit"
            className="py-1 font-bold rounded-md w-64 border hover:text-zinc-800 hover:bg-white"
          >
            Submit
          </button>
        </div>{" "}
      </form>
    </div>
  );
}

export default SurveyForm;

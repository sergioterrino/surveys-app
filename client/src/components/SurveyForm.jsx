import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fillSurvey } from "../api/surveys";
import { toast } from "react-hot-toast";
import '../App.css'

function SurveyForm({ survey, questions }) {
  const [answers, setAnswers] = useState({});
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();

  const handleRangeChange = (e, index) => {
    setAnswers({
      ...answers,
      [index]: e.target.value
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("submit SurveyForm -> ", data);
      const res = await fillSurvey(survey.id, data);
      if (res.status === 201) {
        console.log("res fillSurvey -> ", res);
        navigate(`/surveys/${survey.id}/results/overall/`, {state: {survey: survey}});
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
            <div className="range-wrapper">
              <input
                type="range"
                min="1"
                max="10"
                value={answers[i] || 5}
                name={`q${i}`}
                {...register(`question${i}`, { required: true })}
                onChange={(e) => {
                  handleRangeChange(e, i);
                  setValue(`question${i}`, e.target.value);
                }}
                className="range-input"
              />
              <div className="range-value">{answers[i] || 5}</div>
            </div>
            {errors[`question${i}`] && <div>This field is required</div>}
          </div>
        ))}
        <div className="mx-auto text-center">
          <button
            type="submit"
            className="py-1 font-bold rounded-md w-64 border hover:text-zinc-800 hover:bg-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SurveyForm;

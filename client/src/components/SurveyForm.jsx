import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fillSurvey } from "../api/surveys";
import { toast } from "react-hot-toast";
import "../App.css";

function SurveyForm({ survey, questions }) {
  const [answers, setAnswers] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();

  const handleRangeChange = (e, index) => {
    setAnswers({
      ...answers,
      [index]: e.target.value,
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("submit SurveyForm -> ", data);
      const res = await fillSurvey(survey.id, data);
      if (res.status === 201) {
        console.log("res fillSurvey -> ", res);
        navigate(`/surveys/${survey.id}/results/overall/`, {
          state: { survey: survey },
        });
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
          <div
            key={i}
            className="text-center rounded-md p-2 pb-4 bg-zinc-600 mb-2"
          >
            <h3 className="text-lg font-semibold mb-2.5">
              {question.text}
            </h3>
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

        {survey.sex && (
          <div className="flex gap-10 mb-2 items-center text-center rounded-md py-2 pl-4 bg-zinc-700">
            <h1 className="font-bold text-lg">¿What is your sex?</h1>
            <div className="pt-0.5">
              <input
                type="radio"
                name="sex"
                id="men"
                value={"men"}
                {...register("question11")}
              />
              <label htmlFor="men">&nbsp;Men</label>
              <input
                type="radio"
                name="sex"
                id="women"
                value={"women"}
                {...register("question11")}
                className="ml-4"
              />
              <label htmlFor="women">&nbsp;Women</label>
            </div>
          </div>
        )}

        {survey.age && (
          <div className="flex gap-10 mb-2 items-center rounded-md py-2 pl-4 bg-zinc-700">
            <h1 className="font-bold text-lg">¿How old are you?</h1>
            <div>
              <input
                type="number"
                name="age"
                id="age"
                className="text-white w-11 pl-2 rounded-md bg-zinc-500"
                {...register("question12")}
              />
              <span>&nbsp; years old</span>
            </div>
          </div>
        )}

        {survey.religion && (
          <div className="flex flex-col mb-2 rounded-md py-2 pl-4 bg-zinc-700">
            <h1 className="font-bold text-lg">
              ¿What religion do you practice?
            </h1>
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 ml-4 pt-0.5">
              <div className="text-left">
                <input
                  type="radio"
                  name="religion"
                  id="christian"
                  value={"christian"}
                  {...register("question13")}
                />
                <label htmlFor="christian">&nbsp;Christian</label>
              </div>
              <div className="text-left">
                <input
                  type="radio"
                  name="religion"
                  id="muslim"
                  value={"muslim"}
                  {...register("question13")}
                />
                <label htmlFor="muslim">&nbsp;Muslim</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="religion"
                  id="hindu"
                  value={"hindu"}
                  {...register("question13")}
                />
                <label htmlFor="hindu">&nbsp;Hindu</label>
              </div>
              <div className="text-left">
                <input
                  type="radio"
                  name="religion"
                  id="jewish"
                  value={"jewish"}
                  {...register("question13")}
                />
                <label htmlFor="jewish">&nbsp;Jewish</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="religion"
                  id="buddhist"
                  value={"buddhist"}
                  {...register("question13")}
                />
                <label htmlFor="buddhist">&nbsp;Buddhist</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="religion"
                  id="other"
                  value={"other"}
                  {...register("question13")}
                />
                <label htmlFor="other">&nbsp;Other</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="religion"
                  id="unbeliever"
                  value={"unbeliever"}
                  {...register("question13")}
                />
                <label htmlFor="unbeliever">&nbsp;Unbeliever</label>
              </div>
            </div>
          </div>
        )}

        <div className="mx-auto text-center">
          <button
            type="submit"
            className="py-1.5 mt-2 font-bold rounded-md w-64 border hover:text-zinc-800 hover:bg-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SurveyForm;

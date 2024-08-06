import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fillSurvey, getQuestions } from "../api/surveys";
import { toast } from "react-hot-toast";

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
    <div>
      <form onSubmit={onSubmit}>
        <h4>{survey.title}</h4>
        {questions.map((question, i) => (
          <div key={i}>
            <h5>
              {question.id} - {question.text}
            </h5>
            <input
              type="range"
              min="1"
              max="10"
              defaultValue={5}
              name={`q${i}`}
              {...register(`q${i}`, { required: true })}
            />
            {errors[`q${i}`] && <div>This field is required</div>}
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SurveyForm;

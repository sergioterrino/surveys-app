import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createSurvey } from "../api/surveys";
import { useAuth } from '../context/AuthContext'

function CreateSurveyForm() {
  
  const { user } = useAuth()
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // crea un hueco vacío en el array, para que cuando el usuario escriba se setee en el handleInputChange()
  const addQuestion = () => {
    if (questions.length < 10) setQuestions([...questions, ""]);
  };

  // rellena la question con el input.value
  const handleInputChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index] = event.target.value;
    setQuestions(newQuestions);
    setValue(`q${index + 1}`, event.target.value);
  };

  const onSubmit = handleSubmit(async (data) => {
    // Aquí puedes manejar el envío del formulario al backend
    console.log("CreateSurveyForm - handleSubmit - userAuth -> ", user);
    data.user = user.id;
    console.log("CreateSurveyForm - handleSubmit - user.id -> ", user.id);
    console.log("CreateSurveyForm - handleSubmit - data -> ", data);
    const res = await createSurvey(data);
    if ( res.status === 201 ) {
      navigate('/profile')
      console.log("CreateSurveyForm - handleSubmit - res -> ", res);
    }
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>CreateSurveyForm</h3>

        <input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && <span>The Title is required</span>}
        <textarea
          name="description"
          placeholder="Description"
          rows={3}
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && <span>The Description is required</span>}

        <button
          type="button"
          onClick={addQuestion}
          disabled={questions.length >= 10}
        >
          Add Question
        </button>

        {questions.map((question, i) => (
          <textarea
            key={i}
            name={`q${i + 1}`}
            placeholder={`Which is the question ...?`}

            onChange={(event) => handleInputChange(i, event)}
            {...register(`q${i + 1}`)}
          ></textarea>
        ))}

        <button type="submit">Create Survey</button>
      </form>
    </div>
  );
}

export default CreateSurveyForm;

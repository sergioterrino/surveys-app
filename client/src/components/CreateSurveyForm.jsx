import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { createSurvey, createQuestion, getQuestions, updateSurvey, updateQuestion } from "../api/surveys";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

function CreateSurveyForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // para conseguir el estado de la ruta anterior
  const { id: surveyId } = useParams(); // para conseguir el id de la ruta actual
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      questions: [{ text: "" }],
    },
  });
  // Hook para manejar los campos de tipo array, es decir, cuando el input a controlar es un array de elementos
  const { fields, append, remove } = useFieldArray({
    control, // permite que useForm controle los campos de tipo array
    name: "questions",
  });
  const [oldQuestionsIds, setOldQuestionsIds] = useState();

  useEffect(() => {
    if (location.state?.fromUpdateSurvey && location.state?.survey) {
      console.log("surveyId -> ", surveyId);
      const getQuestionsOfSurvey = async () => {
        try {
          const res = await getQuestions(surveyId);
          const questions = res.data;
          reset({
            title: location.state.survey.title,
            description: location.state.survey.description,
            questions: questions.map((q) => ({ id: q.id, text: q.text })),
          });
          console.log("CSform - res - getquestions ->", res.data);
          // lista con los id de las questions que ya existían
          setOldQuestionsIds(questions.map((q) => q.id));
        } catch (error) {
          console.log("Error getting the questions fromUpdateSurvey");
        }
      };
      getQuestionsOfSurvey();
    }
  }, [surveyId, reset]);

  const onSubmit = async (data) => {
    data.user = user.id;
    if (location.state?.fromUpdateSurvey && location.state?.survey) {
      console.log("dataaaaaaa editSurvey on submit -> ", data);
      const onSubmitUpdateSurvey = async () => {
        try {
          const res = await updateSurvey(surveyId, {
            title: data.title,
            description: data.description,
          });
          console.log("res updateSurvey fromEdit -> ", res);

          // Filtrar preguntas vacías antes de crear o actualizar
          const filteredQuestions = data.questions.filter(
            (question) => question.text.trim() !== ""
          );

          // const res1 = await updateQuestions(surveyId, questions);
          const questionPromises = filteredQuestions.map((q, i) => {
            console.log("fields[i].id->", fields[i].id);
            if (oldQuestionsIds.includes(q.id) && fields[i].id) {
              return updateQuestion({
                id: q.id,
                survey: surveyId,
                text: q.text,
              });
            } else {
              console.log("entrandoooooo q.text", q.text);
              return createQuestion({ survey: surveyId, text: q.text });
            }
          });
          const resUpdate = await Promise.all(questionPromises);
          console.log("resUpdate -> ", resUpdate);

          navigate('/profile', { state: {fromUpdateSurvey: true} })
        } catch (error) {
          console.log("Error updating the survey", error);
        }
      };
      onSubmitUpdateSurvey();
    } else {
      try {
        data.user = user.id; // para que aparezca: by {username}
        const surveyRes = await createSurvey({
          user: data.user,
          title: data.title,
          description: data.description,
        });
        const surveyId = surveyRes.data.id;

        // Filtro las preguntas vacías antes de crearlas
        const filteredQuestions = data.questions.filter(
          (question) => question.text.trim() !== ""
        );

        const questionPromises = filteredQuestions.map((question) =>
          createQuestion({ survey: surveyId, text: question.text })
        );
        await Promise.all(questionPromises);
        navigate("/profile", { state: {fromCreateSurvey: true} });
        console.log("Survey and questions created successfully");
      } catch (error) {
        console.error("Error creating survey:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input placeholder="Title" {...register("title", { required: true })} />
        {errors.title && <span>Title is required</span>}
      </div>

      <div>
        <label>Description</label>
        <textarea
          placeholder="Description"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && <span>Description is required</span>}
      </div>

      <div>
        <label>Questions</label>
        {fields.map((item, index) => (
          <div key={item.id}>
            <input
              {...register(`questions.${index}.text`)}
              placeholder="Enter question text"
            />
            {errors.questions?.[index]?.text && (
              <span>Question is required</span>
            )}
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append({ text: "" })}>
          Add Question
        </button>
      </div>

      <button type="submit">
        {location.state?.fromUpdateSurvey ? "Update Survey" : "Create Survey"}
      </button>
    </form>
  );
}

export default CreateSurveyForm;

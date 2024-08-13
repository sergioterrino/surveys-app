import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useForm, useFieldArray, set } from "react-hook-form";
import {
  createSurvey,
  createQuestion,
  getQuestions,
  updateSurvey,
  updateQuestion,
  deleteQuestion,
} from "../api/surveys";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";

function CreateSurveyForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // para conseguir el estado de la ruta anterior
  const { pathname } = useLocation(); // para conseguir la ruta actual
  const { id: surveyId } = useParams(); // para conseguir el id de la ruta actual
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
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
  const MAX_QUESTIONS = 10; // Número máximo de preguntas permitidas
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
          console.log(
            "useEffect - fromUpdateSurvey - oldQuestionsIds  -> ",
            oldQuestionsIds
          );
        } catch (error) {
          console.log("Error getting the questions fromUpdateSurvey");
        }
      };
      getQuestionsOfSurvey();
    } else {
      // Resetear el formulario si no se está editando
      reset({
        title: "",
        description: "",
        questions: [{ text: "" }],
      });
    }
  }, [surveyId, reset]);

  const onSubmit = async (data) => {
    data.user = user.id;
    // Si se está editando una encuesta
    if (location.state?.fromUpdateSurvey && location.state?.survey) {
      console.log("dataaaaaaa editSurvey on submit -> ", data);
      // Filtro las preguntas vacías antes de crearlas
      const filteredQuestions = data.questions.filter(
        (question) => question.text.trim() !== ""
      );

      // checkeo si hay al menos 1 pregunta y si no está vacía
      if (data.questions.length > 0 && filteredQuestions.length === 0) {
        toast.error("The questions can't be empty");
        return;
      }
      if (filteredQuestions.length === 0) {
        toast.error("You must add at least one question");
        return;
      }

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
            console.log('oldQuestionsIds>>>>>>>>>>>>>>', oldQuestionsIds);
            if (oldQuestionsIds.includes(q.id) && fields[i].id) {
              console.log("if oldQuestionsIds.includes(q.id) && fields[i].id", q.id);
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

          navigate("/profile", { state: { fromUpdateSurvey: true } });
        } catch (error) {
          console.log("Error updating the survey", error);
        }
      };
      onSubmitUpdateSurvey();
    } else {
      try {
        // Filtro las preguntas vacías antes de crearlas
        const filteredQuestions = data.questions.filter(
          (question) => question.text.trim() !== ""
        );

        // checkeo si hay al menos 1 pregunta y si no está vacía
        if (data.questions.length > 0 && filteredQuestions.length === 0) {
          toast.error("The questions can't be empty");
          return;
        }
        if (filteredQuestions.length === 0) {
          toast.error("You must add at least one question");
          return;
        }

        data.user = user.id; // para que aparezca: by {username}
        const surveyRes = await createSurvey({
          user: data.user,
          title: data.title,
          description: data.description,
        });
        const surveyId = surveyRes.data.id;

        const questionPromises = filteredQuestions.map((question) =>
          createQuestion({ survey: surveyId, text: question.text })
        );
        await Promise.all(questionPromises);

        navigate("/profile", { state: { fromCreateSurvey: true } });
        console.log("Survey and questions created successfully");
      } catch (error) {
        console.error("Error creating survey:", error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-9 pb-7 bg-zinc-800 rounded-md"
    >
      <div>
        <label className="text-lg font-bold">Title:</label>
        <input
          placeholder="Title"
          {...register("title", { required: true })}
          className="w-full px-4 py-2 mb-2 rounded-md bg-zinc-500 "
        />
        {errors.title && (
          <span className="font-bold text-red-700">Title is required</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-lg font-bold">Description:</label>
        <textarea
          placeholder="Description"
          {...register("description", { required: true })}
          className="w-full px-4 py-2 mb-2 rounded-md bg-zinc-500 "
        ></textarea>
        {errors.description && (
          <span className="font-bold text-red-700">
            Description is required
          </span>
        )}
      </div>

      <div>
        <label className="text-lg font-bold">Questions:</label>
        {fields.map((item, index) => (
          <div key={item.id} className="flex gap-0.5 mb-3">
            {/* Input hidden para almacenar el ID de la pregunta en el form*/}
            <input type="hidden" {...register(`questions.${index}.id`)} />
            <textarea
              {...register(`questions.${index}.text`)}
              placeholder="Enter question text"
              className="w-full px-4 py-2 rounded-md bg-zinc-500 "
            />
            {errors.questions?.[index]?.text && (
              <span className="font-bold text-red-700">
                Question is required
              </span>
            )}
            <button
              type="button"
              onClick={async () => {
                const questionId = getValues(`questions.${index}.id`);
                if (oldQuestionsIds.includes(questionId)) {
                  try {
                    const res = await deleteQuestion(questionId);
                    console.log(res);
                    if (res.status === 204) {
                      toast.success("Question deleted successfully");
                      remove(index);
                      setOldQuestionsIds(oldQuestionsIds.filter((id) => id !== questionId));
                    } else {
                      toast.error("Error deleting the question");
                    }
                  } catch (error) {
                    console.log("Error deleting question", error);
                  }
                }else{
                  console.log('No está en oldQuestionsIds');
                }
              }}
              className="bg-red-700 font-bold rounded-md px-1 hover:bg-red-900 h-16"
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
            </button>
          </div>
        ))}
        <div className="flex justify-center mb-4">
          <button
            type="button"
            id="addQuestion"
            onClick={() => {
              if (fields.length < MAX_QUESTIONS) {
                append({ text: "" });
              } else {
                toast.error("You can't add more than 10 questions");
              }
            }}
            className=" bg-indigo-900 font-bold px-2 py-1 rounded-md inline-flex items-center hover:bg-indigo-950"
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            &nbsp;new Question
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 font-bold border rounded-md hover:bg-white hover:text-zinc-700"
      >
        {location.state?.fromUpdateSurvey ? "Update Survey" : "Create Survey"}
      </button>
    </form>
  );
}

export default CreateSurveyForm;

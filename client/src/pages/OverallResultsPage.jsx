import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getAnswers, generatePlot } from "../api/surveys";
import Spinner from "../components/Spinner";
import TypingEffect from "../components/TypingEffect";

function OverallResultsPage() {
  const { id } = useParams();
  const location = useLocation();
  const [survey, setSurvey] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("location.survey", location.state?.survey);
    setSurvey(location.state?.survey);
    console.log("surevyuuu", survey, survey.id);
  }, [location]);

  useEffect(() => {
    if (survey && survey.id) {
      console.log("entrando en overall bringAnswers");
      const bringAnswers = async () => {
        try {
          const res = await getAnswers(survey.id);
          console.log("Overall - useEffect - getAnswers - res ->", res);
          setAnswers(res.data);
          console.log("GETANSWERS -> ANSWERS: ", answers);
        } catch (error) {
          console.log("Error bringin the answers of survey", survey.id);
        }
      };
      bringAnswers();

      const fetchPlot = async () => {
        try {
          // Ejecutar el script de Python para generar el gráfico
          const res = await generatePlot(survey.id);
          console.log("feching the img ->", res);
          // get timestamp para que haga nueva busqueda y no coja la imagen de la cache del browser
          const timestamp = new Date().getTime();
          // Establecer la URL de la imagen del gráfico
          setImageUrl(
            `http://127.0.0.1:8000/static/results_chart_${survey.id}.png?v=${timestamp}`
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchPlot();
    }
  }, [survey]);

  useEffect(() => {
    if (imageUrl) setIsLoading(false);
  }, [imageUrl]);

  return (
    <div>
      <h1 className="text-center text-2xl pb-1 mb-3 bg-zinc-600 rounded-md">
        Overall Results
      </h1>
      <div className="px-4 border rounded-md">
        <h1 className="text-center mb-3 font-bold text-lg">{survey.title}</h1>
        {imageUrl ? (
          <div className="my-4 flex justify-center">
            <img src={imageUrl} alt="Plot" />
          </div>
        ) : (
          <div className="m-4 text-center">
            <Spinner loading={isLoading} />
            <h1 className="mt-1 text-2xl">
              <TypingEffect text="....Loading" speed={150} />
            </h1>
          </div>
        )}
        {answers.map((answer, i) => (
          <div key={i} className="bg-gray-500 mb-2">
            <h1>Answer Id: {answer.id}</h1>
            <h1>UserID = {answer.user}</h1>
            <p>Result q1: {answer.question1}</p>
            <p>Result q2: {answer.question2}</p>
            <p>Result q3: {answer.question3 | null}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OverallResultsPage;

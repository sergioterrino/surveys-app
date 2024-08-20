import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getAnswers, generatePlot } from "../api/surveys";
import Spinner from "../components/Spinner";
import TypingEffect from "../components/TypingEffect";

function OverallResultsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [plotUrl, setPlotUrl] = useState("");
  const [plotSexUrl, setPlotSexUrl] = useState("");
  const [plotAgeUrl, setPlotAgeUrl] = useState("");
  const [plotReligionUrl, setPlotReligionUrl] = useState("");
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
          setPlotUrl(
            `http://127.0.0.1:8000/static/plots/results_plot_${survey.id}.html?v=${timestamp}`
          );
          // Si la survey pregunta por sexo:
          if (survey.sex) {
            setPlotSexUrl(
              `http://127.0.0.1:8000/static/plots/results_plot_sex_${survey.id}.html?v=${timestamp}`
            );
          }
          if (survey.age) {
            setPlotAgeUrl(
              `http://127.0.0.1:8000/static/plots/results_plot_age_${survey.id}.html?v=${timestamp}`
            );
          }
          if (survey.religion) {
            setPlotReligionUrl(
              `http://127.0.0.1:8000/static/plots/results_plot_religion_${survey.id}.html?v=${timestamp}`
            );
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchPlot();
    }
  }, [survey]);

  useEffect(() => {
    if (plotUrl) setIsLoading(false);
  }, [plotUrl]);

  return (
    <div>
      <h1 className="text-center text-2xl pb-1 mb-3 bg-zinc-600 rounded-md">
        Overall Results
      </h1>
      <div className="px-1 md:px-4 rounded-md">
        {survey && (
          <h1 className="text-center font-bold text-2xl">{survey.title}</h1>
        )}
        {plotUrl ? (
          <div className="mt-1 mb-1 flex justify-center ">
            {/* <img src={plotUrl} alt="Plot" className="rounded-lg" /> */}
            <iframe src={plotUrl} width="100%" height="600px"></iframe>
          </div>
        ) : (
          <div className="my-24 text-center">
            <Spinner loading={isLoading} />
            {/* <h1 className="mt-1 text-2xl">
              <TypingEffect text="....Loading" speed={150} />
            </h1> */}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 justify-center my-2">
          {plotSexUrl ? (
            <div className="flex justify-center">
              <iframe
                src={plotSexUrl}
                width={"100%"}
                height={"400px"}
              ></iframe>
            </div>
          ) : (
            ""
          )}
          {plotReligionUrl ? (
            <div className="flex justify-center">
              <iframe
                src={plotReligionUrl}
                width="100%"
                height="400px"
              ></iframe>
            </div>
          ) : (
            ""
          )}
        </div>
        {plotAgeUrl ? (
          <div className="flex justify-center">
            <iframe src={plotAgeUrl} width="100%" height="400px"></iframe>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default OverallResultsPage;

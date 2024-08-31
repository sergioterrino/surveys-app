import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getAnswers, generatePlot, getQuestions } from "../api/surveys";
import Spinner from "../components/Spinner";

function OverallResultsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [plotUrls, setPlotUrls] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSurvey(location.state?.survey);
  }, [location]);

  useEffect(() => {
    if (survey && survey.id) {
      const bringAnswers = async () => {
        try {
          const res = await getAnswers(survey.id);
          setAnswers(res.data);
        } catch (error) {
          console.log("Error bringing the answers of survey", survey.id);
        }
      };
      bringAnswers();

      const getQ = async () => {
        const res = await getQuestions(survey.id);
        setQuestions(res.data);
      };
      getQ();

      const fetchPlot = async (plotType) => {
        try {
          const res = await generatePlot(survey.id, plotType);
          const blob = res.data;
          const imageUrl = URL.createObjectURL(blob);
          setPlotUrls(prev => ({ ...prev, [plotType]: imageUrl }));
        } catch (error) {
          console.error(`Error fetching ${plotType} plot:`, error);
        }
      };

      fetchPlot('main');
      // if (survey.sex) fetchPlot('sex');
      // if (survey.age) fetchPlot('age');
      // if (survey.religion) fetchPlot('religion');
    }
  }, [survey]);

  useEffect(() => {
    if (plotUrls['main']) setIsLoading(false);
  }, [plotUrls]);

  return (
    <div>
      <div className="relative flex items-center justify-center text-2xl">
        <div>
          <h1 className="text-2xl">Overall Results</h1>
        </div>
        <div className="absolute right-0">
          <button
            onClick={() => setShowQuestions(prev => !prev)}
            className="pr-2 pt-1 rounded-lg hover:text-cyan-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 20" strokeWidth="1.5" stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
          </button>
          {showQuestions && (
            <div onClick={() => setShowQuestions(false)} className="fixed top-0 left-0 z-1 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center">
              <div className="relative max-w-2xl">
                <button onClick={() => setShowQuestions(false)} className="absolute top-1 right-5 pl-1 hover:text-zinc-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>

                <div onClick={(e) => e.stopPropagation()} className="bg-zinc-800 rounded-2xl px-8 mx-3 pt-2 pb-3 text-lg">
                  <h1 className="text-xl mb-3 text-gray-300">Survey questions text</h1>
                  {questions.map((q, i) => (
                    <div key={i} className="flex gap-2">
                      <div className="font-bold">Q{i + 1}</div>
                      <div> &rarr; </div>
                      <div>{q.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <hr className="w-full border-t border-gray-300 mt-2 mb-2" />

      <div className="px-1 md:px-4 rounded-md">
        {survey && <h1 className="flex items-center justify-center font-bold text-2xl">{survey.title}</h1>}
        {plotUrls['main'] ? (
          <div className="mt-1 mb-4 flex justify-center">
            <img src={plotUrls['main']} alt="Plot" className="rounded-lg" />
          </div>
        ) : (
          <div className="my-24 text-center">
            <Spinner loading={isLoading} />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 xs:gap-4 xxs:gap-4 md:gap-0 justify-center my-2">
          {plotUrls['sex'] && (
            <div className="flex justify-center">
              <img src={plotUrls['sex']} alt="Plot Sex" className="rounded-lg" />
            </div>
          )}
          {plotUrls['religion'] && (
            <div className="flex justify-center">
              <img src={plotUrls['religion']} alt="Plot Religion" className="rounded-lg" />
            </div>
          )}
        </div>
        {plotUrls['age'] && (
          <div className="flex justify-center mb-4">
            <img src={plotUrls['age']} alt="Plot Age" className="rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
}

export default OverallResultsPage;

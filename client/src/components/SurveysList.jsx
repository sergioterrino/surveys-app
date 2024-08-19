import SurveyCard from "./SurveyCard";

function SurveysList({
  title,
  surveys,
  isAuth,
  removeSurvey
}) {
  return (
    <div className="w-full px-0 sm:px-6 pb-4">
      <h1 className="text-center text-2xl mb-3 bg-zinc-600 rounded-md pb-1">{title}</h1>
      {surveys.length ? (
        <div className="w-full grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-sm">
        {surveys.map((survey, i) => (
          <SurveyCard
            survey={survey}
            key={i}
            isAuth={isAuth}
            removeSurvey={removeSurvey}
          />
        ))}</div>
      ) : (
        <div className="text-center flex flex-col justify-center items-center">
          <img src="/images/notSurveys.webp" alt="You don't have any surveys yet"
          className="m-6 mt-10 rounded-lg shadow-xl mask-image lg:mx-56" />
          <img src="/images/notSurveysText.png" alt="" className="w-96 "/>
        </div>
      )}
    </div>
  );
}

export default SurveysList;

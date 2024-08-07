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
      <div className="w-full grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-sm">
      {surveys.map((survey, i) => (
        <SurveyCard
          survey={survey}
          key={i}
          isAuth={isAuth}
          removeSurvey={removeSurvey}
        />
      ))}</div>
    </div>
  );
}

export default SurveysList;

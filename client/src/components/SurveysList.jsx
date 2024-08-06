import SurveyCard from "./SurveyCard";

function SurveysList({
  title,
  surveys,
  isAuth,
  removeSurvey
}) {
  return (
    <>
      <h1>{title}</h1>
      {surveys.map((survey, i) => (
        <SurveyCard
          survey={survey}
          key={i}
          isAuth={isAuth}
          removeSurvey={removeSurvey}
        />
      ))}
    </>
  );
}

export default SurveysList;

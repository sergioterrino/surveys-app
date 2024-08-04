import SurveyCard from "./SurveyCard";

function SurveysList({ title, surveys, isAuthenticated }) {
  return (
    <>
      <h1>{title}</h1>
      {surveys.map((survey, i) => (
        <SurveyCard survey={survey} key={i} isAuth={isAuthenticated} />
      ))}
    </>
  );
}

export default SurveysList;

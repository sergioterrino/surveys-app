import SurveyCard from "./SurveyCard";

function SurveysList({ title, surveys }) {
  return (
    <>
      <h1>{title}</h1>
      {surveys.map((survey, i) => (
        <SurveyCard survey={survey} key={i} />
      ))}
    </>
  );
}

export default SurveysList;

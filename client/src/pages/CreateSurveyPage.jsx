import CreateSurveyForm from "../components/CreateSurveyForm"

function CreateSurveyPage() {
  return (
    <div>
      <h1 className="text-center text-2xl pb-1 mb-3 rounded-md bg-zinc-600">Survey's creator</h1>
      <CreateSurveyForm></CreateSurveyForm>
    </div>
  )
}

export default CreateSurveyPage
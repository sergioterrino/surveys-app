import CreateSurveyForm from "../components/CreateSurveyForm"

function CreateSurveyPage() {
  return (
    <div>
      <h1 className="text-center text-2xl rounded-md ">Survey's creator</h1>
      <hr className="w-full border-t border-gray-300 my-2 mb-3" />
      <CreateSurveyForm></CreateSurveyForm>
    </div>
  )
}

export default CreateSurveyPage
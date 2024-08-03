import { useState } from "react";

function CreateSurveyForm() {
  const [questions, setQuestions] = useState([]);

  // crea un hueco vacío en el array, para que cuando el usuario escriba se setee en el handleInputChange()
  const addQuestion = () => {
    if (questions.length < 10) setQuestions([...questions, ""]);
  };

  // rellena la question con el input.value
  const handleInputChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario al backend
    console.log({ title: event.target.title.value, description: event.target.description.value, questions });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>CreateSurveyForm</h3>

        <input type="text" name="title" placeholder="Title" />
        <textarea
          name="description"
          placeholder="Description"
          rows={3}
        ></textarea>

        <button type="button" onClick={addQuestion} disabled={questions.length >= 10}>Add Question</button>

        {questions.map((question, i) => (
          <textarea
            key={i} name={`q${ i+1 }`}
            placeholder={`Which is the question ...?`}
            value={question}
            onChange={(event) => handleInputChange(i, event)}
          ></textarea>
        ))}

        <button type="submit">Create Survey</button>
      </form>
    </div>
  );
}

export default CreateSurveyForm;


function QuestionCard({question}) {

  return (
    <div>
      <h5>{question.id} - {question.text}</h5>
      {/* <input type="range" name={`a${question.id}`} /> */}
    </div>
  )
}

export default QuestionCard
import { useParams } from 'react-router-dom'

function OverallResultsPage() {

  const { id } = useParams();

  return (
    <div>
      OverallResultsPage
      <h3>Survey {id}</h3>
      <p>Aquí se verán el resumen, charts, etc de los resultados de todos los que han participado en la survey concreta</p>
    </div>
  )
}

export default OverallResultsPage
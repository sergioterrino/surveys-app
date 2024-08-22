import { useEffect, useState } from "react";
import SurveysList from "../components/SurveysList";
import { getSurveys } from "../api/surveys";

function HomePage() {
  const [surveys, setSurveys] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSurveysList = async () => {
      setLoading(true);
      try {
        const res = await getSurveys(page);
        setSurveys((prev) => [...prev, ...res.data.results]);
        if (!res.data.next) setHasMore(false);
        console.log("geting surveys of the backend: ", res.data, res.data.next);
      } catch (error) {
        console.log("Error getting the surveys at Home", error);
      } finally {
        setLoading(false);
      }
    };
    getSurveysList();
  }, [page]);

  const fetchMoreSurveys = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <SurveysList
      surveys={surveys}
      fetchMoreSurveys={fetchMoreSurveys}
      hasMore={hasMore}
      loading={loading}
      title={"Current Surveys"}
    ></SurveysList>
  );
}

export default HomePage;

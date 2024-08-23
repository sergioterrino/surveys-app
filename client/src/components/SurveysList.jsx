import Spinner from "./Spinner";
import SurveyCard from "./SurveyCard";
import InfiniteScroll from "react-infinite-scroll-component";
import TypingEffect from "./TypingEffect";
import { useEffect, useState } from "react";

function SurveysList({
  title,
  surveys,
  isAuth,
  removeSurvey,
  fetchMoreSurveys,
  hasMore,
  loading,
}) {
  const [showNoSurveys, setShowNoSurveys] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (surveys.length === 0 && !loading) {
        setShowNoSurveys(true);
      } else {
        setShowNoSurveys(false);
      }
    }, 1500);
  }, [surveys]);


  return (
    <div className="w-full px-0 sm:px-6 pb-4">
      <h1 className="text-center text-2xl mb-1 bg-transparent rounded-md pb-1">
        {title}
      </h1>
      <hr className="w-full border-t border-gray-300 mb-3" />


      <InfiniteScroll
        dataLength={surveys.length}
        next={fetchMoreSurveys}
        hasMore={hasMore}
        loader={
          <div className="text-center py-6 flex flex-col justify-center">
            <div>
              <Spinner />
            </div>
            <div>
              <span className="text-2xl">Loading</span>
              <TypingEffect text="...." speed={250} />
            </div>
          </div>
        }
      >
        <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-1 smmd:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 rounded-sm">
          {surveys.map((survey, i) => (
            <SurveyCard
              survey={survey}
              key={i}
              isAuth={isAuth}
              removeSurvey={removeSurvey}
            />
          ))}
        </div>
      </InfiniteScroll>

      {showNoSurveys && (
        <div className="text-center flex flex-col justify-center items-center">
          <img
            src="/images/notSurveys.webp"
            alt="You don't have any surveys yet"
            className="m-6 mt-10 rounded-lg shadow-xl mask-image lg:mx-56"
          />
          <img src="/images/notSurveysText.png" alt="" className="w-96 " />
        </div>
      )}
    </div>
  );
}

export default SurveysList;

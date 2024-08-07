import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserSurveys } from "../api/surveys";
import SurveysList from "../components/SurveysList";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

function ProfilePage() {
  const [userSurveys, setUserSurveys] = useState([]);
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const fetchUserSurveys = async () => {
      try {
        const res = await getUserSurveys();
        setUserSurveys(res.data);
        console.log("profilePage - fetchUserSurveys -> ", res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserSurveys();
    console.log("ProfilePage - isAuthenticated -> ", isAuthenticated);
  }, []);

  useEffect(() => {
    if (location.state?.fromLogin) toast.success(`Welcome ${user.username}`);
    if (location.state?.fromCreateSurvey) toast.success(`Survey created`);
    if (location.state?.fromUpdateSurvey) toast.success(`Survey updated`);
  }, [location.state]);

  const removeSurvey = (id_survey) => {
    setUserSurveys(userSurveys.filter((survey) => survey.id !== id_survey));
    toast.remove("Survey deleted");
  };

  return (
    <div>
      <h3>Username: {user.username}</h3>
      <SurveysList
        surveys={userSurveys}
        title={"My surveys"}
        isAuth={isAuthenticated}
        removeSurvey={removeSurvey}
      ></SurveysList>
    </div>
  );
}

export default ProfilePage;

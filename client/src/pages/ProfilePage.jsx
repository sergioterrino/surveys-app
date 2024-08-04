import { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext'
import { getUserSurveys } from "../api/surveys";
import SurveysList from "../components/SurveysList";

function ProfilePage() {
  const [userSurveys, setUserSurveys] = useState([]);
  const { isAuthenticated } = useAuth();

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
    console.log('ProfilePage - isAuthenticated -> ', isAuthenticated);
  }, []);

  return (
    <div>
      <h3>User.name + user.lastname</h3>
      <SurveysList surveys={userSurveys} title={"My surveys"} isAuthenticated={isAuthenticated}></SurveysList>
    </div>
  );
}

export default ProfilePage;

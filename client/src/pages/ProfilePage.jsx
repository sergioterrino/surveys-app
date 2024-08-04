import { useEffect, useState } from "react";
import { getUserSurveys } from "../api/surveys";
import SurveysList from "../components/SurveysList";

function ProfilePage() {
  const [userSurveys, setUserSurveys] = useState([]);

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
  }, []);

  return (
    <div>
      <h3>User.name + user.lastname</h3>
      <SurveysList surveys={userSurveys} title={"My surveys"}></SurveysList>
    </div>
  );
}

export default ProfilePage;

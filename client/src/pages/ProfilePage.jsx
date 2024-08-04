import { useEffect } from 'react'
import { getUserSurveys } from '../api/surveys'

function ProfilePage() {

  useEffect(() => {
    const fetchUserSurveys = async () => {
      try {
        const res = await getUserSurveys()
        console.log('profilePage - fetchUserSurveys -> ', res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserSurveys();
  }, [])

  return (
    <div>
      <h3>User.name + user.lastname</h3>
      <p>Aquí se podrán ver todas las surveys del user.auth</p>
    </div>
  )
}

export default ProfilePage
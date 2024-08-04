import { Link } from "react-router-dom"
import { useAuth } from '../context/AuthContext'

function Navbar() {

  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-zinc-700 flex flex-col gap-y-3 sm:flex-row items-center justify-between my-3 px-10 py-3 rounded-lg">
      <Link to='/'>
        <button className="text-2xl font-bold z-50 bg-zinc-700">Tasks Manager</button>
      </Link>
      <ul className="flex flex-row justify-center items-center gap-2">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/" className="bg-indigo-500 px-2 py-1 rounded-md font-bold">Home</Link>
            </li>
            <li>
              <Link to="/surveys" className="text-indigo-500 bg-white font-bold px-2 py-1 rounded-md">Create Survey</Link>
            </li>
            <li>
              <Link to="/profile" className="text-indigo-500 bg-white font-bold px-2 py-1 rounded-md">Profile</Link>
            </li>
            <li>
              <Link to="/" onClick={() => {logout()}} className="text-indigo-500 bg-white font-bold px-2 py-1 rounded-md">Logout</Link>
            </li>
          </>
        ): (
          <>
            <li>
              <Link to="/" className="bg-indigo-500 px-2 py-1 rounded-md font-bold">Home</Link>
            </li>
            <li>
              <Link to="/login" className="text-indigo-500 bg-white font-bold px-2 py-1 rounded-md">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="text-indigo-500 bg-white font-bold px-2 py-1 rounded-md">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar
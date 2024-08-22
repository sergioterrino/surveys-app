import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import ComfirmModal from "./ConfirmModal";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Referencia al dropdown, para detectar click
  const path = useLocation().pathname; // Ruta actual
  const [showModalLogout, setShowModalLogout] = useState(false);

  const onLogout = () => {
    setShowModalLogout(true);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // muestra u oculta el dropdown
  };
  const closeDropdown = () => {
    setIsDropdownOpen(false); // cierra el dropdown al clickar en un enlace
  };

  // Cerrar dropdown al clickar fuera de él
  useEffect(() => {
    console.log(path);
    const handleClickOutside = (event) => {
      // Si el dropdown está abierto y el click no es dentro del dropdown->closeDropdown
      // el current verifica si el dropdown está presente en el DOM
      // el .contains verifica si el click fue dentro del dropdown
      // event.target es el elemento del DOM  que se clickeó
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    // Si el dropdown está abierto, añadir el event listener
    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    // Eliminar el event listener al desmontar el componente
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="bg-transparent flex gap-y-3 flex-row items-center justify-between mt-3 pl-2 pr-8 py-3 rounded-lg">
      <Link to="/">
        <button className="text-2xl font-bold z-50 bg-transparent flex items-center">
        <img src="/images/hat.png" className="w-24" /><img src="/images/sortingHat.png" className="relative right-4"/>
        </button>
      </Link>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="text-2xl font-bold z-50 bg-transparent h-full"
        >
          <svg
            className="w-9 h-9 mt-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        {isDropdownOpen && (
          <ul className="absolute right-0 top-16 mt-2 w-48 bg-zinc-800 rounded-md shadow-lg py-1 z-1">
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/"
                    onClick={closeDropdown}
                    className={`block px-4 py-2 text-md hover:text-zinc-700 font-bold hover:bg-white ${
                      path === "/" ? "text-indigo-500" : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/surveys"
                    onClick={closeDropdown}
                    className={`block px-4 py-2 text-md hover:text-zinc-700 font-bold hover:bg-white ${
                      path === "/surveys" ? "text-indigo-500" : ""
                    }`}
                  >
                    Create Survey
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    onClick={closeDropdown}
                    className={`block px-4 py-2 text-md hover:text-zinc-700 font-bold hover:bg-white ${
                      path === "/profile" ? "text-indigo-500" : ""
                    }`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      onLogout();
                    }}
                    className="block px-4 py-2 text-md hover:text-zinc-700 font-bold hover:bg-white"
                  >
                    Logout
                  </Link>
                  <ComfirmModal
                    showModal={showModalLogout}
                    setShowModal={setShowModalLogout}
                    message="¿Do you want to log out?"
                    onConfirm={() => {
                      toast.error("Logout");
                      closeDropdown();
                      setShowModalLogout(false);
                      logout();
                      navigate('/')
                    }}
                  />
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    onClick={closeDropdown}
                    className={`block px-4 py-2 text-md hover:text-zinc-700 font-bold hover:bg-white ${
                      path === "/" ? "text-indigo-500" : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    onClick={closeDropdown}
                    className={`block px-4 py-2 text-md hover:text-zinc-700 font-bold hover:bg-white ${
                      path === "/login" ? "text-indigo-500" : ""
                    }`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    onClick={closeDropdown}
                    className={`block px-4 py-2 text-md hover:text-zinc-700 font-bold hover:bg-white ${
                      path === "/signup" ? "text-indigo-500" : ""
                    }`}
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

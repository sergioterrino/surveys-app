import PropTypes from 'prop-types'; // Importa PropTypes para la validación de props
import { useEffect, useState } from "react";

/**
 * Muestra un mensaje en una notificación estilo toast.
 * 
 * @param {Object} props Las propiedades del componente.
 * @param {'gray'|'red'|'green'|'blue'} props.color El color del fondo del toast. Opciones: 'gray', 'red', 'green', 'blue'.
 * @param {number} [props.time=3000] Duración en milisegundos antes de que el toast desaparezca.
 * @param {string} props.message El mensaje a mostrar en el toast.
 * @param {'top'|'middle'|'bottom'} [props.position='middle'] La posición del toast en la pantalla. Opciones: 'top', 'middle', 'bottom'.
 */
function Toast({ color = "gray", time = 2000, message, position = "middle" }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, time);
    return () => clearTimeout(timer);
  }, [time]);

  const bgColorClass = {
    gray: "bg-gray-500",
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
  }[color] || "bg-gray-500";

  const positionClass = {
    top: "top-0 mt-4",
    middle: "top-1/2 -translate-y-1/2",
    bottom: "bottom-0 mb-16",
  }[position];

  if (!show) return null;

  return (
    <div className={`fixed left-1/2 transform -translate-x-1/2 ${positionClass} z-50 opacity-100`}>
      <div className={`${bgColorClass} text-white font-bold px-4 py-2 rounded-md`}>{message}</div>
    </div>
  );
}

// Opcional: Validación de PropTypes para mejorar la documentación y el chequeo en tiempo de ejecución
Toast.propTypes = {
  color: PropTypes.oneOf(['gray', 'red', 'green', 'blue']),
  time: PropTypes.number,
  message: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'middle', 'bottom']),
};

export default Toast;
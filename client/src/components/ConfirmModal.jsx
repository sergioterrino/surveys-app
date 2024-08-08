import { useEffect } from "react";
import PropTypes from 'prop-types'; // Importa PropTypes para la validación de props

/**
 * Muestra un modal de confirmación que puede cerrarse al presionar la tecla Escape o al hacer clic fuera del contenido.
 * 
 * @param {Object} props Las propiedades del componente.
 * @param {boolean} props.showModal Controla la visibilidad del modal.
 * @param {Function} props.setShowModal Función para cambiar el estado de visibilidad del modal.
 * @param {Function} props.onConfirm Función que se ejecuta cuando se confirma la acción del modal.
 * @param {string} props.message Mensaje o contenido del modal.
 */
function ConfirmModal({ showModal, setShowModal, onConfirm, message }) {

  // Para que el modal se cierre cuando se presiona la tecla Esc
  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape') setShowModal(false); }
    // Añade event listener para escuchar el evento keydown (presionar tecla)
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [setShowModal]);

  return showModal ? (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'
      onClick={() => setShowModal(false)}>
      <div className='bg-zinc-800 p-8 rounded-md' onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className='flex justify-around gap-x-4 mt-6'>
          <button className='bg-zinc-500 rounded-md px-4 py-2' onClick={() => setShowModal(false)}>Cancel</button>
          <button className='bg-red-600 rounded-md px-4 py-2' onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  ) : null;
}

// Validación de PropTypes para mejorar la documentación y el chequeo en tiempo de ejecución
ConfirmModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default ConfirmModal;
import "../saas/modal.scss"
import PropTypes from 'prop-types';


// Funcion que sirve para crear modales en las paginas
// Este codigo se reutiliza las veces que se necesite
function Modal({ children, isOpen}) {
  if (!isOpen) return null;


  return (
    <div className="modal">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
}


Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
};



export {
  Modal
} 
import { useEffect } from 'react';

function Modal({ title, isOpen, onClose, children }) {
  // se cierra con la tecla escape
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal" onMouseDown={onClose} role="presentation">
      <div
        className="modal__container"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button className="modal__close" type="button" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>
        <h2 className="modal__title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Modal;

import Modal from './Modal';

function ConfirmDialog({ isOpen, title, text, confirmLabel = 'Eliminar', onConfirm, onClose, isBusy }) {
  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <p className="empty-state__text">{text}</p>
      <div className="modal__actions">
        <button className="button button_secondary" type="button" onClick={onClose}>
          Cancelar
        </button>
        <button className="button button_danger" type="button" onClick={onConfirm} disabled={isBusy}>
          {isBusy ? 'Eliminando...' : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;

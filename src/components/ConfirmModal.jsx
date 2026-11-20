import { Button, Modal } from 'react-bootstrap'

export default function ConfirmModal({ show, title, children, onConfirm, onClose, variant = 'danger' }) {
  const confirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Annuler
        </Button>
        <Button variant={variant} onClick={confirm}>
          Confirmer
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

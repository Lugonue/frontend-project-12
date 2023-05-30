import { Modal } from "react-bootstrap"
import InputNewChannel from "../ui/InputNewChannel";


const AddModal = ({ show, handleClose, toast, t }) => {

  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("modal.add")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputNewChannel toast={toast} closeHandler={handleClose} t={t} />
      </Modal.Body>
    </Modal>
  )
}

export default AddModal;
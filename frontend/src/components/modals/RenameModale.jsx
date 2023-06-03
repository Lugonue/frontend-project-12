import { Modal, ButtonGroup, Button, Form, FloatingLabel } from "react-bootstrap"
import socket from "../../utils/webSocket";

import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const RenameModal = ({ show, handleClose, toast, t }) => {
  const inputRef = useRef(null);

  const channelRenameInfo = useSelector((state) => state.channels.channelRenameInfo);
  const {id, name} = channelRenameInfo;
  console.log(id, name)

  const formik = useFormik({
    initialValues: {
      body: name,
    },
    enableReinitialize : true,
    onSubmit: ({ body }) => {
      const renameChannelServer = () => {
        socket.emit("renameChannel", {
          id, name: body
        }, (response) => {
          if (response.status !== 'ok') {
            toast.error(t("toastify.error"));
            renameChannelServer();
          } else {
            toast.success(t("toastify.rename"));
            handleClose();
          }
        })
      }
      renameChannelServer();
    },
  })

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
      inputRef.current.select();
    }
    
  }, [inputRef.current])


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("modal.rename")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={formik.handleSubmit}
        >
          <FloatingLabel
            controlId="floatingInput"
            label={t("modal.rename")}
          >
            <Form.Control
              ref={inputRef}
              autoFocus
              name="body"
              controlId="floatingInput"
              type="text"
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FloatingLabel>
          <ButtonGroup className="mt-3 text-end">
            <Button
              variant="primary"
              type="submit"
            >
              {t("modal.btnSubmit")}
            </Button>
          </ButtonGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default RenameModal;
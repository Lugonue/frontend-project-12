import { Modal, ButtonGroup, Button, Form, FloatingLabel } from "react-bootstrap"
import socket from "../../utils/webSocket";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import { actions as channelsActions } from "../../slices/channelsSlice";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";

const RenameModal = ({ show, handleClose, toast, t }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const renameChannelId = useSelector((state) => state.modals.renameChannelId);
  const nameChannel = useSelector((state) => state.channels.channels.filter((channel) => channel.id === renameChannelId)[0].name);
  console.log(nameChannel, renameChannelId);

  const formik = useFormik({
    initialValues: {
      body: nameChannel,
    },
    onSubmit: ({ body }) => {
      const renameChannelServer = () => {
        socket.emit("renameChannel", {
          id: renameChannelId, name: body
        }, (response) => {
          if (response.status !== 'ok') {
            toast.error(t("toastify.error"));
            renameChannelServer();
          } else {
            dispatch(channelsActions.renameChannel({ id: renameChannelId, name: body }));
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
    }
  }, [formik])

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
              id="floatingInput"
              type="text"
              value={formik.values.body}
              onChange={formik.handleChange}
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
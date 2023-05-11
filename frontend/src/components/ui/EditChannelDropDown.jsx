import { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Dropdown, Modal, Form } from "react-bootstrap";
import socket from "../../utils/webSocket";
import { useDispatch } from "react-redux";
import { removeChannel, renameChannel, setActiveChannel } from "../../slices/channelsSlice";
import { removeMessagesInCHannel } from "../../slices/messagesSlice";

const EditChannelDropDown = ({ channel }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [channelName, setChannelName] = useState(channel.name);

  const [show, setShow] = useState({
    renameChannel: false,
    removeChannel: false,
  });
  const handleClose = () =>
    setShow({
      renameChannel: false,
      removeChannel: false,
    });
  const handleShow = (prefix) => {
    switch (prefix) {
      case "renameChannel":
        setShow({
          renameChannel: true,
          removeChannel: false,
        });
        break;
      case "removeChannel":
        setShow({
          renameChannel: false,
          removeChannel: true,
        });
      default:
        break;
    }
  };

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
    
  })

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          variant="secondary"
          id="dropdown-basic"
        ></Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => handleShow("renameChannel")}
            // href="#/action-1"
          >
            Переименовать
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleShow("removeChannel")}
            // href="#/action-2"
          >
            Удалить
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={show.renameChannel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Переименовать канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              
              const renameChannelServer = () => {
                socket.emit("renameChannel", {
                  id: channel.id, name: channelName
                }, (response) => {
                  if (response.status !== 'ok') {
                    renameChannelServer();
                  } else {
                    dispatch(renameChannel({ id: channel.id, name: channelName }));
                    handleClose();
                  }
                 })
              }
              renameChannelServer();
            }}
          >
            <Form.Label>Введите имя канала</Form.Label>
            <Form.Control
              ref={inputRef}
              type="text"
              value={channelName}
              autoFocus
              onChange={(event) => {
                setChannelName(event.target.value);
              }}
            />
            <ButtonGroup className="mt-3 text-end">
              <Button variant="primary" type="submit">
                Сохранить
              </Button>
            </ButtonGroup>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={show.removeChannel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-end">
          <ButtonGroup>
            <Button className="me-2" variant="secondary" onClick={handleClose}>
              Отмена
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                const removeChannelServer = () => {
                  socket.emit(
                    "removeChannel",
                    { id: channel.id },
                    (response) => {
                      if (response.status !== "ok") {
                        removeChannelServer();
                      } else {
                        handleClose();
                        dispatch(removeChannel(channel.id));
                        dispatch(removeMessagesInCHannel(channel.id));
                        dispatch(setActiveChannel({name: 'general', id: 1}));
                      }
                    }
                  );
                };
                removeChannelServer();
              }}
            >
              Удалить
            </Button>
          </ButtonGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditChannelDropDown;

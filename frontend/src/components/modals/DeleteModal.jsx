import { Modal, ButtonGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import socket from '../../utils/webSocket';

import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as messagesActions } from '../../slices/messagesSlice';

const DeleteModal = ({
  show, handleClose, toast, t,
}) => {
  const dispatch = useDispatch();

  const deleteChannelId = useSelector((state) => state.modals.deleteChannelId);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-end">
        <ButtonGroup>
          <Button className="me-2" variant="secondary" onClick={handleClose}>
            {t('modal.btnCancel')}
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              const removeChannelServer = () => {
                socket.emit(
                  'removeChannel',
                  { id: deleteChannelId },
                  (response) => {
                    if (response.status !== 'ok') {
                      removeChannelServer();
                      toast.error(t('toastify.error'));
                    } else {
                      dispatch(channelsActions.removeChannel(deleteChannelId));
                      dispatch(messagesActions.removeMessagesInCHannel(deleteChannelId));
                      dispatch(channelsActions.setActiveChannel(1));
                      handleClose();
                      toast.error(t('toastify.remove'));
                    }
                  },
                );
              };
              removeChannelServer();
            }}
          >
            {t('modal.btnRemove')}
          </Button>
        </ButtonGroup>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;

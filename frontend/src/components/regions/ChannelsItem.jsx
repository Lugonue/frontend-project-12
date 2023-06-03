import filter from 'leo-profanity';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';

import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as modalsActions } from '../../slices/modalsSlice';

const ChannelsItem = ({ channel, t }) => {
  const { id, name, removable } = channel;
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);

  const dispatch = useDispatch();

  return (
    <Nav.Item as="li" className="w-100 list-unstyled" key={id}>
      {!removable && (
        <Button
          className="w-100 rounded-0 text-start"
          variant={id === activeChannelId ? 'secondary' : ''}
          onClick={() => dispatch(channelsActions.setActiveChannel({ id, name }))}
        >
          <span className="me-1">#</span>
          {filter.clean(name)}
        </Button>
      )}
      {removable && (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            className="w-100 rounded-0 text-start text-truncate"
            variant={id === activeChannelId ? 'secondary' : ''}
            onClick={() => dispatch(channelsActions.setActiveChannel({ id, name }))}
          >
            <span className="me-1">#</span>
            {filter.clean(name)}
          </Button>
          <Dropdown.Toggle
            split
            variant={id === activeChannelId ? 'secondary' : ''}
            className="flex-grow-0"
          >
            <span className="visually-hidden">{t('main.control')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => dispatch(modalsActions.togleDeleteModal(id))}>{t('main.remove')}</Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                dispatch(modalsActions.togleRenameModal());
                dispatch(channelsActions.setChannelRenameInfo({ id, name }));
              }}
            >
              {t('main.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </Nav.Item>
  );
};

export default ChannelsItem;

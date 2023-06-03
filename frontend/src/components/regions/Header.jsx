import { Button, NavLink } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { actions as stateActions } from '../../slices/stateSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const activeUserName = useSelector((state) => state.userState.currentUser.name);
  const isAuthorized = useSelector((state) => state.userState.authorized);

  const logoutHandler = () => {
    dispatch(stateActions.setAuthorized(false));
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <div className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <div className="d-flex justify-content-between mt-3 mb-3 w-100">
          <NavLink
            className="btn"
            variant="light"
            onClick={() => navigate('/')}
          >
            Hexlet Chat
          </NavLink>

          {isAuthorized
            ? <p className="m-0 text-info fs-5 fw-bold">{activeUserName}</p>

            : null}

          {isAuthorized
            ? (
              <Button
                type="button"
                variant="outline-primary"
                onClick={logoutHandler}
              >
                Выйти
              </Button>
            )
            : null}
        </div>
      </div>
    </div>

  );
};

export default Header;

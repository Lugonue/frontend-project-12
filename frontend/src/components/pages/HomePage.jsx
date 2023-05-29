import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Modal } from "react-bootstrap";

import { setActiveChannel, setChannels } from "../../slices/channelsSlice";
import { setMessages } from "../../slices/messagesSlice";

import ChatFrame from "../ui/ChatFrame";
import InputNewChannel from "../ui/InputNewChannel";
import EditChannelDropDown from "../ui/EditChannelDropDown";
import Header from "../ui/Header";

import { useTranslation } from "react-i18next";
import { setAuthorized } from "../../slices/stateSlice";

const HomePage = ({toast}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const channels = useSelector((state) => state.channels);
  

  const token = localStorage.getItem("token");
  const isAuthorized = useSelector((state) => state.userState.authorized);

  //модальные окна
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(setAuthorized(true));
      const fetchChanels = async () => {
        const { data } = await axios.get("/api/v1/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setChannels(data.channels));
        dispatch(setActiveChannel(data.channels[0]));
        dispatch(setMessages(data.messages));
      };
      fetchChanels();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  return (
    <div className="h-100">
      <div className="container shadow-sm h-100">
        <div className="row h-100 bg-white flex-md-row">
          <div className="d-flex flex-column h-100">
            <Header />
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
              <div className="row h-100 bg-white flex-md-row">
                <div
                  className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex"
                  id="channels"
                >
                  <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                    <b>{t("Каналы")}</b>
                    <button
                      type="button"
                      className="p-0 text-primary btn btn-group-vertical"
                      onClick={() => handleShow("addNewChannel")}
                    >
                      +
                    </button>
                  </div>
                  <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                    {channels.channels.map((channel) => (
                      <li
                        className={
                          "nav-item w-100" +
                          (channel.id === channels.activeChannel.id
                            ? " bg-secondary"
                            : "")
                        }
                        key={channel.id}
                      >
                        <div className="d-flex show dropdown btn-group">
                          <button
                            onClick={() => dispatch(setActiveChannel(channel))}
                            type="button"
                            key={channel.id}
                            className="w-100 rounded-0 text-start btn"
                          >
                            <span className="me-1">#</span>
                            {channel.name}
                          </button>
                          {channel.removable && (
                            <EditChannelDropDown
                            dispatch={dispatch}
                              toast={toast}
                              channel={channel}
                              handleShow={handleShow}
                              t={t}
                            />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col p-0 h-100">
                  <ChatFrame />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Добавить канал")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputNewChannel toast={toast} closeHandler={handleClose} t={t} />
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default HomePage;

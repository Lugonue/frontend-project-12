import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Modal, Button, ButtonGroup } from "react-bootstrap";

import { setActiveChannel, setChannels } from "../slices/channelsSlice";
import { setMessages } from "../slices/messagesSlice";
import ChatFrame from "./ChatFrame";
import InputMessage from "./ui/InputMessage";
import InputNewChannel from "./ui/InputNewChannel";
import EditChannelDropDown from "./ui/EditChannelDropDown";
import socket from "../utils/webSocket";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const channels = useSelector((state) => state.channels);

  const token = localStorage.getItem("token");
  const isAuthorized = useSelector((state) => state.userState.authorized);

  //модальные окна
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!token && !isAuthorized) {
      navigate("/login");
    } else {
      const fetchChanels = async () => {
        const { data } = await axios.get("/api/v1/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log(data.channels[0]);

        dispatch(setChannels(data.channels));
        dispatch(setActiveChannel(data.channels[0]));
        dispatch(setMessages(data.messages));
      };
      fetchChanels();
    }
  }, []);

  useEffect(() => {
    // console.log(channels);
  }, [channels]);

  return (
    <>
      <div className="container  vh-100">
        <div className="row">
          <div className="container">
            <div className="d-flex justify-content-between mt-3 mb-3">
              <h4>Hexlet-chat</h4>
              <button type="button" className="btn btn-primary">
                Выйти
              </button>
            </div>
          </div>
        </div>
        <div
          className="row rounded justify-content-center mt-5 chatFrame"
          style={{ height: "50vh" }}
        >
          <div
            className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex"
            id="channels"
          >
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>Каналы</b>
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
                        channel={channel}
                        handleShow={handleShow}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col p-0 h-100">
            <ChatFrame />
            <div className="mt-auto">
              <InputMessage />
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputNewChannel closeHandler={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HomePage;

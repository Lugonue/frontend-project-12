import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Col, Container, Modal, Row } from "react-bootstrap";

import { actions as channelsActions } from "../../slices/channelsSlice";
import { setMessages } from "../../slices/messagesSlice";

import Header from "../regions/Header";

import { useTranslation } from "react-i18next";
import { setAuthorized, setCurrentUser } from "../../slices/stateSlice";
import socket from "../../utils/webSocket";
import ChatComponent from "../regions/ChatComponent.jsx";
import ModalsWindows from "../modals/index";
import ChannelsItem from "../regions/ChannelsItem";
import ChannelsTitle from "../regions/ChannelsTitle";

const HomePage = ({ toast }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const channels = useSelector((state) => state.channels.channels);
  const isAuthorized = useSelector((state) => state.userState.authorized);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(setCurrentUser({ name: localStorage.getItem("username") }));
      dispatch(setAuthorized(true));

      const fetchChannels = async () => {
        const { data } = await axios.get("/api/v1/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(channelsActions.setChannels(data.channels));
        dispatch(channelsActions.setActiveChannel(data.channels[0]));
        dispatch(setMessages(data.messages));

      };
      fetchChannels();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

useEffect(() => {
  socket.on("removeChannel", ({id}) => {
    dispatch(channelsActions.removeChannel(id));
  })

  socket.on("newChannel", (payload) => {
    dispatch(channelsActions.addNewChannel(payload));
  })

},[])

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Header />
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <Row className="h-100 bg-white flex-md-row">
            <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
              <ChannelsTitle t={t} />
              {channels.map((channel) => (
                <ChannelsItem t={t}  key={channel.id} channel={channel}/>
              ))}
              
            </Col>
            <Col className="p-0 h-100">
              <div className="d-flex flex-column h-100">
                < ChatComponent t={t} toast={toast} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <ModalsWindows t={t} toast={toast} />
    </>
  );
};

export default HomePage;

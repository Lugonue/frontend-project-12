import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

import { setActiveChannel, setChannels } from '../slices/channelsSlice';
import { setMessages } from '../slices/messagesSlice';
import MessagesList from './MessagesList';
import ChatFrame from './ChatFrame';
import InputMessage from './ui/InputMessage';



const HomePage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const channels = useSelector(state => state.channels);

  const token = localStorage.getItem('token');
  const isAuthorized = useSelector(state => state.userState.authorized);


  useEffect(() => {
    if (!token && !isAuthorized) {
      navigate('/login');
    } else {
      const fetchChanels = async () => {
        const { data } = await axios.get('/api/v1/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log(data.channels[0]);

        dispatch(setChannels(data.channels));
        dispatch(setActiveChannel(data.channels[0]));
        dispatch(setMessages(data.messages));
      }
      fetchChanels();
    }

  }, [])

  useEffect(() => {
    // console.log(channels);
  }, [channels])

  return (
    <div className="container  vh-100">

      <div className="row">
        <div className="container">
          <div className="d-flex justify-content-between mt-3 mb-3">
            <h4>Hexlet-chat</h4>
            <button type='button' className='btn btn-primary'>Выйти</button>
          </div>
        </div>
      </div>
      <div className="row rounded justify-content-center mt-5 chatFrame" style={{ height: '50vh' }}>
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex" id="channels">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button type='button' className='p-0 text-primary btn btn-group-vertical'>
              +
            </button>
          </div>
          <ul className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
            {channels.channels.map(channel => (
              <li className='nav-item w-100' key={channel.id}>
                <button type='button' key={channel.id} className="w-100 rounded-0 text-start btn"><span className='me-1'>#</span> {channel.name}</button>
              </li>
            )
            )}
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

  )
}



export default HomePage;
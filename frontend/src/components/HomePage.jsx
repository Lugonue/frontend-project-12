import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contex/authContex';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

import { setChannels } from '../slices/channelsSlice';
import { setMessages } from '../slices/messagesSlice';
import MessagesList from './MessagesList';

import '../styles/homePage.css';

const HomePage = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const auth = useContext(AuthContext);
  const channels = useSelector(state => state.channels);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token && !auth.authorized) {
      navigate('/login');
    } else {
      const fetchChanels = async () => {
        const { data } = await axios.get('/api/v1/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setChannels(data.channels));
        dispatch(setMessages(data.messages));
      }
      fetchChanels();
    }

  }, [])

  useEffect(() => {
    console.log(channels);
  }, [channels])
  return (
    <div className="container homePageChat">
      <h1 className='text-center mt-5'>Home Page</h1>
      <div className="row justify-content-center mt-5 chatFrame">
        <div className="col-2 bg-secondary" id="channels">
          <h3>Channels</h3>
          <ul className=''>
          {channels.channels.map(channel => <li key={channel.id}>{channel.name}</li>)}
          </ul>
        </div>
        <div className="col-8 bg-light d-flex flex-column justify-content-between">
          <MessagesList />
          <div className="mt-5">
            <form className='d-flex p-2'>
              <input type="text"
               className="form-control"
               placeholder="Enter message"
               />
              <button type="submit" className="btn btn-primary">Send</button>
            </form>
          </div>
        </div>
      </div>


    </div>

  )
}



export default HomePage;
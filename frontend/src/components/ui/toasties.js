import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifications = (notificationName) => {

  switch(notificationName){
    case "success": 
      
  }


  // на этой ноте нужно создать карту уведомлений, функция будет возвращать контейнер тоаст-контейнер 

  const notify = () => toast("Wow so easy!");

  return (
    <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
  );
}

export default notifications;
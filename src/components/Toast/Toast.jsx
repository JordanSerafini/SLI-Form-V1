import { useEffect } from 'react';
import PropTypes from 'prop-types'; // Importer PropTypes
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast({ message }) {
  useEffect(() => {
    if (message) {
      toast(message);
    }
  }, [message]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired, 
};

export default Toast;

import { Bounce, toast } from 'react-toastify';

export const errorNotify = (message: string): void => {
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Bounce,
    style: {
      fontSize: '0.9rem',
    }
  });
};

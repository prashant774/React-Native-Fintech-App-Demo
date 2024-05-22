import React, {createContext, useContext, useState} from 'react';
import Toast from '../components/Toast';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({children}) => {
  const [toast, setToast] = useState({visible: false, message: ''});

  const showToast = message => {
    setToast({visible: true, message});
    setTimeout(() => setToast({visible: false, message: ''}), 3000); // Hide after 3 seconds
  };

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      {toast.visible && <Toast message={toast.message} />}
    </ToastContext.Provider>
  );
};

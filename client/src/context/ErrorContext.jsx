import { createContext, useContext, useState, useEffect } from 'react';

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (errorMessage) {
      setShowAlert(true);
    }
  }, [errorMessage]);

  const showError = (message) => setErrorMessage(message);
  const clearError = () => {
    setShowAlert(false);
  };

  return (
    <ErrorContext.Provider
      value={{ errorMessage, showError, clearError, showAlert }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

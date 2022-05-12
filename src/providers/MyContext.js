import React, { useState, useEffect } from "react";

export const Context = React.createContext({});



export const MyContext = (props) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState();
  const [notificationIndex, setNotificationIndex] = useState(0);

  useEffect(() => {
    if (notificationIndex) {
      let copyNotification = { ...notification }
      delete (copyNotification[notificationIndex]);
      setNotification({ ...copyNotification })
    }
  }, [notificationIndex]);

  const addNotification = (type, message) => {
    let lastIndex = 0;
    for (const key in notification) if (key => lastIndex) lastIndex = key
    lastIndex = parseInt(lastIndex) + 1;

    setNotification({ ...notification, [lastIndex]: { type, message } })
    setTimeout(() => { setNotificationIndex(lastIndex); }, 5000)
  }

  return (
    <Context.Provider
      value={{
        loading, setLoading,
        notification, addNotification,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export const useMyContext = () => React.useContext(Context);
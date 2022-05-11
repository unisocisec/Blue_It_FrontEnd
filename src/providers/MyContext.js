import React, { useState } from "react";

export const Context = React.createContext({});

export const MyContext = (props) => {
  const [loading, setLoading] = useState(false);

  return (
    <Context.Provider
      value={{ loading, setLoading }}
      >
      {props.children}
    </Context.Provider>
  );
};

export const useMyContext = () => React.useContext(Context);
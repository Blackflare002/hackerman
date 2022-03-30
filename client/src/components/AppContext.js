import { createConText, useCallback, useEffect, useReducer } from "react";

export const AppContext = createConText();

const initialState = {
  status: "idle",
  error: null,
  items: null,
  cartItems: [],
  cartTotal: 0,
};

const reducer = (action, state) => {
  switch (action.type) {
    case "set-status-loading":
      return {
        ...state,
        status: "loading",
      };
    case "set-status-idle":
      return {
        ...state,
        status: "idle",
      };
    case "set-status-error":
      return {
        ...state,
        error: action.error,
        status: "error",
      };
    case "get-items":
      return {
        ...state,
        items: action.items,
      };
    default:
  }
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setStatusIdle = useCallback(
    () => dispatch({ type: "set-status-idle" }),
    [dispatch]
  );

  const setStatusLoading = useCallback(
    () => dispatch({ type: "set-status-loading" }),
    [dispatch]
  );

  const setStatusError = useCallback((error) =>
    dispatch({ type: "set-status-error", error })
  );

  const getItems = useCallback((items) =>
    dispatch({ type: "get-items", items })
  );

  // fetch items from db on load
  useEffect(() => {
    setStatusLoading();
    fetch("/items")
      .then((res) => res.json())
      .then((data) => {
        setStatusIdle();
        getItems(data.items);
      })
      .catch((err) => setStatusError(err));
  }, []);
  
  return (
    <AppContext.Provider
      value={{
        ...state,
        actions: {
          getItems,
          setStatusError,
          setStatusLoading,
          setStatusIdle,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

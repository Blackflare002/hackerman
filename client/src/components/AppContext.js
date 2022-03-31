import { createConText, useCallback, useEffect, useReducer } from "react";

export const AppContext = createConText();

const initialState = {
  status: "idle",
  error: null,
  items: null, // all items pulled from DB
  cart: {
    items: [],
    totalCost: 0, // totalCost updates as items array updates
    size: 0, // size updates as items as items array updates
  },
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
    case "add-item-to-cart":
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [
            ...state.cart.items,
            action.item, // add item to items array in cart
          ],
          totalCost: state.cart.totalCost + Number(item.cost.slice(1)), // add price to total
          size: state.cart.size + 1, // increment cart size by 1
        },
      };
    case "remove-item-from-cart":
      const { items } = state.cart;

      // remove one item of id provided
      const foundIndex = items.findIndex((item) => item._id === action._id);
      const updatedItems = [...items];
      let priceToDeduct = 0;
      // only remove item if provided item id is found inside cart
      if (foundIndex !== -1) {
        updatedItems.splice(foundIndex, 1);
        // if item is found, find the price to deduct from totalCost
        priceToDeduct = Number(items[foundIndex].price.slice(1));
      }

      return {
        ...state,
        cart: {
          ...state.cart,
          items: updatedItems,
          totalCost: state.cart.totalCost - priceToDeduct,
          size: state.cart.size - 1,
        },
      };
    default:
  }
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItemToCart = useCallback(
    (item) => dispatch({ type: "add-item-to-cart", item }),
    [dispatch]
  );

  const removeItemFromCart = useCallback((_id) =>
    dispatch({ type: "remove-item-from-cart", _id })
  );

  const setStatusIdle = useCallback(
    () => dispatch({ type: "set-status-idle" }),
    [dispatch]
  );

  const setStatusLoading = useCallback(
    () => dispatch({ type: "set-status-loading" }),
    [dispatch]
  );

  const setStatusError = useCallback((error) =>
    dispatch({ type: "set-status-error", error }, [dispatch])
  );

  const getItems = useCallback((items) =>
    dispatch({ type: "get-items", items }, [dispatch])
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
          addItemToCart,
          getItems,
          removeItemFromCart,
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

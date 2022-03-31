import { createContext, useCallback, useEffect, useReducer } from "react";

export const AppContext = createContext();

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

const reducer = (state, action) => {
  switch (action.type) {
    case "set-status-loading": {
      return {
        ...state,
        status: "loading",
      };
    }

    case "set-status-idle": {
      return {
        ...state,
        status: "idle",
      };
    }

    case "set-status-error": {
      return {
        ...state,
        error: action.error,
        status: "error",
      };
    }

    case "get-items": {
      return {
        ...state,
        items: action.items,
      };
    }

    case "add-item-to-cart": {
      const { cart } = state;

      //totalCost is stored as a string, needs to be converted to a number for summing
      const updatedTotalCost =
        Number(cart.totalCost) + Number(action.item.price.slice(1)); // add price to total

      // create local cart for manipulation
      const updatedCart = {
        ...cart,
        totalCost: updatedTotalCost.toFixed(2), // .toFixed() returns a string
        size: cart.size + 1, // increment cart size by 1}
      };

      // check if already in cart
      // increment .numPurchased by 1
      const foundIndex = updatedCart.items.findIndex(
        (item) => item._id === action.item._id
      );

      if (foundIndex > -1) {
        updatedCart.items[foundIndex].numPurchased++; // strict mode caused increment to happen twice inside reducers
      } else {
        // if not already in cart
        // build item object with numPurchased key to keep track of amount added to cart

        updatedCart.items.push({ ...action.item, numPurchased: 1 });
      }

      // set updatedCart to sessionStorage
      sessionStorage.setItem("forkinators_cart", JSON.stringify(updatedCart));

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case "remove-item-from-cart": { // remove one item of provided id
      const { items } = state.cart;

      const foundIndex = items.findIndex((item) => item._id === action._id);
      const updatedItems = [...items];
      let updatedTotal = Number(state.cart.totalCost);
      // check if provided item id is found inside cart
      if (foundIndex !== -1) {
        // if only one of item is in cart, remove from cart
        if (updatedItems[foundIndex].numPurchased === 1) {
          updatedItems.splice(foundIndex, 1);
        } else {
          // else, decrement numPurchased
          updatedItems[foundIndex].numPurchased--;
        }
        // if item is found, find the price to deduct from totalCost
        updatedTotal = updatedTotal - Number(items[foundIndex].price.slice(1));
      }

      // build new cart object to both set new state AND sessionStorage
      const updatedCart = {
        ...state.cart,
        items: updatedItems,
        totalCost: updatedTotal.toFixed(2), // .toFixed() returns a string
        size: state.cart.size - 1,
      };

      sessionStorage.setItem("forkinators_cart", JSON.stringify(updatedCart));

      return {
        ...state,
        cart: updatedCart,
      };
    }

    // restore cart from session storage if it exists
    case "restore-cart-session": {
      const sessionCart = JSON.parse(
        sessionStorage.getItem("forkinators_cart")
      );
      console.log(sessionCart);

      const newState = {
        ...state,
      };

      if (sessionCart) newState.cart = sessionCart;

      return newState;
    }

    case "update-single-item": {
      const { items } = state;
      const indexToUpdate = items.findIndex(
        (item) => item._id === action.item._id
      );
      const updatedItems = [...items];

      updatedItems[indexToUpdate] = action.item; // replace item with provided item

      return {
        ...state,
        items: updatedItems,
      };
    }
    default:
  }
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // add item object to cart.items array
  const addItemToCart = useCallback(
    (item) => dispatch({ type: "add-item-to-cart", item }),
    [dispatch]
  );

  const getItems = useCallback(
    (items) => dispatch({ type: "get-items", items }),
    [dispatch]
  );

  // remove item by ID
  const removeItemFromCart = useCallback(
    (_id) => dispatch({ type: "remove-item-from-cart", _id }),
    [dispatch]
  );

  // if cart exists in sessionStorage, set current cart state equal to it
  const restoreCartSession = useCallback(
    () => dispatch({ type: "restore-cart-session" }),
    [dispatch]
  );

  const setStatusIdle = useCallback(
    () => dispatch({ type: "set-status-idle" }),
    [dispatch]
  );

  const setStatusLoading = useCallback(
    () => dispatch({ type: "set-status-loading" }),
    [dispatch]
  );

  const setStatusError = useCallback(
    (error) => dispatch({ type: "set-status-error", error }),
    [dispatch]
  );

  const updateSingleItem = useCallback(
    (item) => dispatch({ type: "update-single-item", item }),
    [dispatch]
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

  // use cart in sessionStorage on load if it exists
  useEffect(() => {
    restoreCartSession();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        actions: {
          addItemToCart, // accepts item object to add to carts.items array
          getItems, // fetches all items, accepts no args
          removeItemFromCart, // accepts item ID string, removes item from cart.items array
          restoreCartSession, // gets "forkinator_cart" object from sessionStorage and sets it to cart state
          setStatusError,
          setStatusLoading,
          setStatusIdle,
          updateSingleItem, // accepts item object; replaces existing object of the same _id in carts.item with provided item object
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

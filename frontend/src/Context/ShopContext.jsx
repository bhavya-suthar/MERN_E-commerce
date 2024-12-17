import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <= 300; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [all_products, setAll_products] = useState([]);

  useEffect(() => {
    // Fetch all products
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_products(data));

    const token = localStorage.getItem("auth-token");
    if (token) {
      fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Authentication failed");
          }
          return response.json();
        })
        .then((data) => {
          if (data && typeof data === "object") {
            setCartItems(data);
          }
        })
        .catch((err) => console.error("Error fetching cart:", err));
    } else {
      console.error("No auth token found");
    }
  }, []);

  const notify = () =>
    toast.error("You cannot add more than 10 of the same item to the cart.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const addToCart = (itemId) => {
    if (cartItems[itemId] >= 10) {
      notify();
      return;
    }

    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCount = prev[itemId] - 1;
      return { ...prev, [itemId]: updatedCount >= 0 ? updatedCount : 0 }; // Prevent negative values
    });

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const deleteFromCart = (itemId) => {
    setCartItems((prev) => {
      let updatedCart = { ...prev };
      updatedCart[itemId] = 0; // Set the item's quantity to 0 or remove it completely
      return updatedCart;
    });

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/deletecartitem", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        // totalItem += cartItems[item];
        totalItem += 1;
      }
    }
    return totalItem;
  };

  const proceedToCheckout = () => {
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/checkout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: cartItems, // Example: { "1": 2, "3": 1 }
          paymentMethod: "Card", // Example: Card payment
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Checkout failed");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            // Clear the cart on success
            setCartItems(getDefaultCart());
            toast.success("Checkout successful! Your cart is now empty.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
          }
        })
        .catch((err) => console.error("Error during checkout:", err));
    } else {
      console.error("No auth token found");
    }
  };

  const contextValue = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getTotalAmount,
    getTotalCartItems,
    proceedToCheckout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

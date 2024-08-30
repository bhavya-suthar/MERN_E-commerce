import { createContext, useState } from "react";
import all_products from "../assets/all_products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_products.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};
const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  console.log("🚀 ~ ShopContextProvider ~ cartItems:", cartItems);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log("🚀 ~ ShopContextProvider ~ cartItems:", cartItems);
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        console.log("🚀 ~ getTotalAmount ~ itemInfo:", itemInfo);
        totalAmount +=itemInfo.new_price * cartItems[item]
      }
    }
    return totalAmount;
  };

  const getTotalCartItems =()=>{
    let totalItem =0;
    for(const item in cartItems){
      if(cartItems[item]>0){
        totalItem +=cartItems[item];
      }
    }
    return totalItem;
  }

  const contextValue = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalAmount, 
    getTotalCartItems,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

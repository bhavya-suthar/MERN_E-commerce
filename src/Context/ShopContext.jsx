import { createContext } from "react";
import all_products from '../assets/all_products'

export const ShopContext = createContext(null);

const ShopContext = (props)=>{
    const contextValue ={all_products}
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
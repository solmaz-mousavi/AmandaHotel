import React, { useState } from "react";
import { createContext } from "react";
import { CartDataType } from "../dataTypes/Data.type";



type CartContextPropsType = {
  localStorageCartData: CartDataType[];
  cartBadge: number;
  addToCart: (cartItem: CartDataType) => void;
  removeFromCart: (foodID: string) => void;
};
export const CartContext = createContext<CartContextPropsType>(
  {} as CartContextPropsType
);

function CartProvider({ children }: { children: React.ReactNode }) {

  const localStorageCartData: CartDataType[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );
  const [cartBadge, setCartBadge] = useState<number>(
    localStorageCartData.length
  );

  const addToCart = (cartItem: CartDataType) => {

      const isInclue = localStorageCartData.find(
        (item) => item.foodID === cartItem.foodID
      );
      if (isInclue) {
        const index = localStorageCartData.indexOf(isInclue);
        const newCart = [...localStorageCartData];
        newCart[index] = {
          ...isInclue,
          count: isInclue.count + cartItem.count,
        };
        localStorage.setItem("cart", JSON.stringify(newCart));
      } else {
        const newCart = [...localStorageCartData, cartItem];
        localStorage.setItem("cart", JSON.stringify(newCart));
        setCartBadge(newCart.length);
      }
  };
  const removeFromCart = (foodID: string) => {
    const newCart = localStorageCartData.filter(
      (item) => item.foodID !== foodID
    );
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartBadge(newCart.length);
  };

  return (
    <CartContext.Provider
      value={{ localStorageCartData, cartBadge, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

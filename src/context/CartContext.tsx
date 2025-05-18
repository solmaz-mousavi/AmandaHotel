import React, { useState } from "react";
import { createContext } from "react";
import { CartDataType } from "../dataTypes/Data.type";

type CartContextPropsType = {
  cartInfo: CartDataType[];
  cartBadge: number;
  cartPrice: number;
  addToCart: (cartItem: CartDataType) => void;
  removeFromCart: (foodID: string) => void;
  changeCountHandler: (
    index: number,
    cartItem: CartDataType,
    newCount: number
  ) => void;
  updateCart: (newCart: CartDataType[]) => void;
};

export const CartContext = createContext<CartContextPropsType>(
  {} as CartContextPropsType
);

function CartProvider({ children }: { children: React.ReactNode }) {

	const localStorageCartInfo: CartDataType[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );
  const [cartInfo, setCartInfo] =
    useState<CartDataType[]>(localStorageCartInfo);
  const [cartBadge, setCartBadge] = useState<number>(
    localStorageCartInfo.length
  );
  const calculateCartPrice: (newCart: CartDataType[]) => number = (newCart) => {
		if(newCart.length === 0) {
			return 0;
		}
		const newPrice = newCart.map(item => item.price*item.count).reduce((a,b)=> a+b);
    return newPrice;
  };
  const [cartPrice, setCartPrice] = useState(
    calculateCartPrice(localStorageCartInfo)
  );
  const updateCart = (newCart: CartDataType[]) => {
    setCartInfo(newCart);
    setCartBadge(newCart.length);
    setCartPrice(calculateCartPrice(newCart));
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = (newItem: CartDataType) => {
    const isInclude = cartInfo.find((item) => item.foodID === newItem.foodID);
    if (isInclude) {
      const index = cartInfo.indexOf(isInclude);
      const newCart = [...cartInfo];
      newCart[index] = {
        ...isInclude,
        count: isInclude.count + newItem.count,
      };
      updateCart(newCart);
    } else {
      const newCart = [...cartInfo, newItem];
      updateCart(newCart);
    }
  };
  const removeFromCart = (id: string) => {
    const newCart = [...cartInfo].filter((item) => item.id !== id);
    updateCart(newCart);
  };
  const changeCountHandler = (
    index: number,
    cartItem: CartDataType,
    newCount: number
  ) => {
    const newCart = [...cartInfo];
    newCart[index] = { ...cartItem, count: newCount };
    updateCart(newCart);
  };
  return (
    <CartContext.Provider
      value={{
        cartInfo,
        cartBadge,
        cartPrice,
        addToCart,
        removeFromCart,
        changeCountHandler,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

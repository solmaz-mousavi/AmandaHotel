export const addToRoomCart = (product: any) => {
  const localStorageCartData =
    JSON.parse(localStorage.getItem("cart") || "") || [];
  const newLocalStorageCartData = [...localStorageCartData, product];
  localStorage.setItem("cart", JSON.stringify(newLocalStorageCartData));
};

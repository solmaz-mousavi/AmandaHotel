import {
  CommentDataType,
  DescriptionType,
  PersonDataType,
  ScoreDataType,
} from "./Main.type";

export type NewUserDataType = {
  image?: string;
  email?: string;
} & {
  [index in "name" | "password" | "phone" | "role" | "token"]: string;
};
export type UserDataType = NewUserDataType & { id: string };

export type NewRoomDataType = DescriptionType & {
  [index in
    | "roomNumber"
    | "floor"
    | "capacity"
    | "price"
    | "maxAddedPeople"
    | "pricePerAddedPerson"
    | "score"]: number;
} & {
  roomTypeID: string;
  images: string[];
  scores: ScoreDataType[];
  likedUserIDs: string[];
  comments: CommentDataType[];
};
export type RoomDataType = NewRoomDataType & {
  id: string;
};

export type NewRoomReservationDataType = {
  [index in "roomID" | "userID"]: string;
} & {
  price: number;
  strength: number;
  dates: string[];
};
export type RoomReservationDataType = NewRoomReservationDataType & {
  id: string;
};

export type NewFoodDataType = DescriptionType & {
  [index in "title" | "menuCategoryID" | "ingredients" | "image"]: string;
} & {
  [index in "price" | "score" | "calories"]: number;
} & {
  scores: ScoreDataType[];
  likedUserIDs: string[];
  comments: CommentDataType[];
};
export type FoodDataType = NewFoodDataType & { id: string };

export type FoodOrderDataType = {
  id: string;
  date: string;
  totalPrice: number;
  orders: CartDataType[];
};

export type NewStaffDataType =  DescriptionType & {
	[index in "role" | "image" | "name"] : string;
}
export type StaffDataType = NewStaffDataType &
   {
    id: string;
  };

export type MessageDataType = {
  [index in "id" | "name" | "phone" | "email" | "message"]: string;
};

export type CartDataType = {
  [index in "id" | "foodID" | "userID" | "title" | "image"]: string;
} & {
  [index in "count" | "price"]: number;
};

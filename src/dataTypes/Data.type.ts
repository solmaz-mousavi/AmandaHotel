import {
  BaseDataType,
  CommentDataType,
  DescriptionType,
  PersonDataType,
  ScoreDataType,
} from "./Main.type";

type ExtraUserDataType = {
  [index in "password" | "phone" | "email" | "role" | "token"]: string;
};
export interface UserDataType extends PersonDataType, ExtraUserDataType {}

export type RoomDataType = DescriptionType & {
  [index in "id" | "roomTypeID"]: string;
} & {
  [index in
    | "roomNumber"
    | "floor"
    | "capacity"
    | "price"
    | "maxAddedPeople"
    | "pricePerAddedPerson"
    | "score"]: number;
} & {
  images: string[];
  scores: ScoreDataType[];
  likedUserIDs: string[];
  comments: CommentDataType[];
};

export type RoomReservationDataType = {
  [index in "id" | "roomID" | "userID"]: string;
} & {
  price: number;
  strength: number;
  dates: string[];
};

export type FoodDataType = BaseDataType &
  DescriptionType & {
    [index in "menuCategoryID" | "ingredients"]: string;
  } & {
    [index in
      | "price"
      | "score"
      | "calories"
      | "protein"
      | "fat"
      | "sugar"
      | "carbohydrates"]: number;
  } & {
    scores: ScoreDataType[];
    likedUserIDs: string[];
    comments: CommentDataType[];
  };

export type FoodOrderDataType ={
	// id:string;
	date:string;
	totalPrice:number;
	orders: CartDataType[];
}

export type StaffDataType = PersonDataType &
  DescriptionType & {
    role: string;
  };

export type MessageDataType = {
  [index in "id" | "name" | "phone" | "email" | "message"]: string;
};

export type CartDataType = {
  [index in "id" | "foodID" | "userID" | "title" | "image"]: string;
} & {
  [index in "count" | "price"]: number;
};

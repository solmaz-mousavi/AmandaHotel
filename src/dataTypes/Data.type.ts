import { CommentDataType, PersonDataType, ScoreDataType } from "./Main.type";

type ExtraUserDataType = {
  [index in "password" | "phone" | "email" | "role" | "token"]: string;
};
export interface UserDataType extends PersonDataType, ExtraUserDataType {}

export type RoomDataType = {
  [index in "id" | "roomTypeID" | "description"]: string;
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
  [index in "id" | "date" | "roomID" | "userID" | "strength"]: string;
} & {
  price: number;
};

export type FoodDataType = {
  [index in
    | "id"
    | "title"
    | "menuCategoryID"
    | "description"
    | "image"
    | "ingredients"]: string;
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

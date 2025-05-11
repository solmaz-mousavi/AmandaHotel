import { CommentDataType, PersonDataType } from "./Main.type";

type ExtraUserDataType = {
  [index in "password" | "phone" | "email" | "role" | "token"]: string;
};
export interface UserDataType extends PersonDataType, ExtraUserDataType {}

export type RoomDataType = {
  [index in
    | "id"
    | "roomNumber"
    | "roomTypeID"
    | "roomViewID"
    | "description"]: string;
} & {
  [index in
    | "floor"
    | "capacity"
    | "price"
    | "maxAddedPeople"
    | "pricePerAddedPerson"
    | "score"]: number;
} & {
  images: string[];
  likedUserIDs: string[];
  comments: CommentDataType[];
};

export type RoomReservationDataType = {
  [index in "id" | "date" | "roomID" | "userID" | "strength"]: string;
} & {
  price: number;
};






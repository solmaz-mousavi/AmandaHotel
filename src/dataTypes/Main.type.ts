import { ReactNode } from "react";

export type SocialDataType = {
  [index in "id" | "title" | "iconName" | "link"]: string;
};

export type NavbarDataType = {
  [index in "id" | "title" | "route"]: string;
};

export type BaseDataType = {
  [index in "id" | "title" | "image"]: string;
};

export type PersonDataType = {
  [index in "id" | "name" | "image"]: string;
};

export type desc = {
  desc: string;
};

export type CommentDataType = {
  [index in "id" | "userID" | "date" | "desc" | "role"]: string;
};

export type GeneralUiType = {
  id?: string;
	title?: string;
  className?: string;
  fullWidth?: boolean;
};






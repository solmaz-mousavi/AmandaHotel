import { ReactNode } from "react";
import { GeneralUiType } from "./Main.type";

export interface ButtonType extends GeneralUiType {
  type?: "button" | "submit" | "link";
	title?:string;
	bgColor?: string;
  round?: boolean;
  tooltip?: {
    content: string;
    color: string;
    position: "left" | "right" | "top" | "bottom";
  };

  link?: string;
  onClick?: () => void;
  children?: string | ReactNode;
  [index: string]: any;
}

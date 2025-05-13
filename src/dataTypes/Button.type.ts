import { ReactNode } from "react";
import { GeneralUiType } from "./Main.type";

export type ButtonType = GeneralUiType & {
  type?: "button" | "submit" | "reset" | "link";
  bgColor?: string;
  round?: boolean;
  tooltip?: {
		content: string;
    color: string;
    position: "left" | "right" | "top" | "bottom";
  };
	
  link?: string;
  onClick?: () => void;
	innerHtml?: string | ReactNode;
  children?: string | ReactNode;
  [index: string]: any;
};

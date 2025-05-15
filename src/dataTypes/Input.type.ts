import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  ReactNode,
} from "react";
import { RulesType } from "../validator/rules";
import { GeneralUiType } from "./Main.type";
import { DateObject } from "react-multi-date-picker";

export type ValueType = string | number;
export type TagType =
  | "textarea"
  | "select"
  | "text"
  | "email"
  | "number"
  | "bigNumber"
  | "password"
  | "date"
  | "checkbox"
  | "recaptcha"
  | "radio";
export interface FormInputType extends GeneralUiType {
  tag?: TagType;
  name: string;
  initialvalue?: ValueType;
  placeholder?: string;

  variant?: "light" | "dark" | "transparent";
  label?: {
    content: string | ReactNode;
    color: string;
    className?: string;
  };
  selectValues?: { id: string; value: ValueType; title: string }[];
  validators?: { type: RulesType; validatorValue?: any }[];
  [index: string]: any;
}

export interface InputType extends FormInputType {
  value?: ValueType;
  onChange?: ChangeEventHandler<any> | undefined;
  onBlur?: FocusEventHandler<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
  >;
  changeHandler?: (
    value: string | DateObject,
    name: string,
    tag: "recaptcha" | "date" | "bigNumber"
  ) => void;
}

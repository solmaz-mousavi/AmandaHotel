import { ChangeEvent, FocusEventHandler, ReactNode } from "react";
import { RulesType } from "../validator/rules";
import { GeneralUiType } from "./Main.type";

export type ValueType = string | number;

export interface InputType extends GeneralUiType {
  tag?:
    | "textarea"
    | "select"
    | "text"
    | "email"
    | "number"
    | "password"
    | "date"
    | "checkbox"
    | "recaptcha"
    | "radio";
  name: string;
  initialvalue: ValueType;
  placeholder?: string;
  variant?: "light" | "dark" | "transparent";
  label?: {
    content: string | ReactNode;
    color: string;
    className?: string;
  };
  selectValues?: string[];
  validators: { type: RulesType; validatorValue?: any }[];
  [index: string]: any;
}

export interface FormInputType extends InputType {
  value: ValueType;
  onChange: (e: ChangeEvent) => void;
  onBlur: FocusEventHandler<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
  >;
}

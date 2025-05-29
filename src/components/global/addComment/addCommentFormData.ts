import { ButtonType } from "../../../dataTypes/Button.type";
import { FormInputType } from "../../../dataTypes/Input.type";
import { requiredStringValidator } from "../../../validator/rules";

	export const inputs: FormInputType[] = [
		{
			tag: "textarea",
			name: "message",
			placeholder: "پیغام خود را بنویسید",
			validators: [requiredStringValidator()],
			initialvalue: "",
			className: "comments-message",
		},
	];
	export const buttons: ButtonType[] = [
		{
			innerHtml: "ثبت",
			type: "submit",
			bgColor: "var(--gold-color)",
		},
	];
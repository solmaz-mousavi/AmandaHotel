import "./button.scss";
import { ButtonType } from "../../../dataTypes/Button.type";

export default function Button({
  id,
  name,
  className,
  title,
	innerHtml,
  fullWidth = false,
  type = "button",
  bgColor = "#fff",
  round = false,
  tooltip,
  link = "#",
  onClick,
  children,
  ...rest
}: ButtonType) {
  const buttonClassName = `btn ${className || ""}${round ? " round" : ""}${
    fullWidth ? " fullWidth" : ""
  }`;

  return (
    <div className="button-container">
      {tooltip && (
        <span
          className={`tooltip ${tooltip.position}`}
          style={{ color: `${tooltip.color}` }}
        >
          {tooltip.content}
        </span>
      )}

      {type === "link" ? (
        <a
          title={title}
          className={buttonClassName}
          href={link}
          style={{ backgroundColor: `${bgColor}` }}
          {...rest}
        >
          <span>{children}{innerHtml}</span>
        </a>
      ) : (
        <button
          type={type}
          title={title}
          className={buttonClassName}
          onClick={onClick}
          style={{ backgroundColor: `${bgColor}` }}
          {...rest}
        >
          <span>{children}{innerHtml}</span>
        </button>
      )}
    </div>
  );
}

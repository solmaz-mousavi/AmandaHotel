import GetIcon from './iconGetter';
import "./icon.scss";

export type IconPropsType = {
  name: string;
  className?: string;
	onClick?: ()=>void;
};

export default function Icon({
  name,
  className,
	onClick,
}: IconPropsType) {
  const Icon = GetIcon(name);
  return (
    <>
      {Icon && (
        <Icon
          className={`icon ${className || ""}`}
					onClick={onClick}
        />
      )}
    </>
  );
}

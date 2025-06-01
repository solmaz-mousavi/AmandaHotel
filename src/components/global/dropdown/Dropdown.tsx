import React, { useState } from "react";
import "./dropdown.scss";
import { BsCaretDownFill, BsCaretLeftFill } from "react-icons/bs";

export default function Dropdown({
  title,
  content,
}: {
  title: React.ReactNode;
  content: React.ReactNode;
}) {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="dropdown-menu">
      <div
        className="dropdown-title"
        onClick={() => setToggle((prev) => !prev)}
      >
        {toggle ? <BsCaretDownFill /> : <BsCaretLeftFill />}
        {title}
      </div>
      <div className={`${toggle ? "show" : ""} content`}>{content}</div>
    </div>
  );
}

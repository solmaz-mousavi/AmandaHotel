import React from 'react'
import { useState } from "react";
import "animate.css";
import "./aos.scss";
import { InView } from "react-intersection-observer";
type AosPropsType = {
  children?: React.ReactNode;
  aosStyle: string;
  once?: boolean;
  className?: string;
};

// ---- animation on scroll------------------------
// When a <div> is placed between AOS (Animate On Scroll) tags,
// it triggers an animation as soon as it appears on the screen.
// Setting once="true" ensures the animation plays only once.
// The aosStyle class references an animation style from the Animate.css library.

export default function Aos({ children, aosStyle, once = false, className }: AosPropsType) {
  const [repeat, setRepeat] = useState<boolean>(true);
  const repeatHandler = () => {
    if (once) {
      setTimeout(function () {
        setRepeat(false);
      }, 1000);
    }
  };

  return (
    <InView>
      {({ inView, ref }) => (
        <div ref={ref} className="aos-container">
          <div className={className}>
            <div
              className={`${
                !repeat
                  ? ""
                  : `${
                      inView
                        ? `animate__animated animate__${aosStyle}`
                        : "hidden"
                    }`
              } `}
              onAnimationEnd={repeatHandler}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </InView>
  );
}

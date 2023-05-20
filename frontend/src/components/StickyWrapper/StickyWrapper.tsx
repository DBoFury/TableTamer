import { ReactNode } from "react";
import "./StickyWrapper.css";

interface StickyButtonPropsType {
  className: string;
  children: ReactNode | ReactNode[];
}

const StickyWrapper = ({ className, children }: StickyButtonPropsType) => {
  return <div className={`sticky ${className}`}>{children}</div>;
};

StickyWrapper.defaultProps = {
  className: "",
};

export default StickyWrapper;

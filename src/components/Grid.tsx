import { FC } from "react";

interface GridProps {
  children: React.ReactNode;
}

export const Grid: FC<GridProps> = ({ children }) => {
  return <div className="grid">{children}</div>;
};

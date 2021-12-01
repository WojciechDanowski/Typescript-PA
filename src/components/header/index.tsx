import React, { FC } from "react";
import "./header.scss";

interface Props {
  title: string;
}

const Header: FC<Props> = ({ title }) => {
  return (
    <div className="header">
      <div className="header__container justify-content-center">
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Header;

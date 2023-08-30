import React from "react";
import LogoHome from "../../Assets/Welcome/LogoHome";
import { ILogoName } from "../../Models/LogoName";

export default function LogoName(props: ILogoName) {
  const { headerType, headerClasses = "" } = props;

  const Header = (props: { children: React.ReactNode }) => {
    const { children } = props;
    switch (headerType) {
      case "h1":
        return <h1 className={headerClasses}>{children}</h1>;
      case "h2":
        return <h2 className={headerClasses}>{children}</h2>;
      case "h3":
        return <h3 className={headerClasses}>{children}</h3>;
      case "h4":
        return <h4 className={headerClasses}>{children}</h4>;
      case "h5":
        return <h5 className={headerClasses}>{children}</h5>;
      case "h6":
        return <h6 className={headerClasses}>{children}</h6>;
    }
  };

  return (
    <>
      <LogoHome />
      <Header>MERCADÃO DAS FLORES</Header>
    </>
  );
}

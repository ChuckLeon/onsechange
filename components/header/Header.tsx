import { Gift } from "lucide-react";
import "./Header.scss";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <Gift />
        <span>Échange de cadeau!</span>
      </div>
    </header>
  );
};

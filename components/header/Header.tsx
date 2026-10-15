import { Logo } from "@/components/logo";
import "./Header.scss";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <Logo size={36} />
        <span className="header__title">Échange de cadeau!</span>
      </div>
    </header>
  );
};

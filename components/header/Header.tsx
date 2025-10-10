import { Gift } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed left-1/2 top-8 transform -translate-x-1/2 z-20">
      <div
        className="flex items-center justify-center px-8 py-4 gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg text-lg font-semibold min-w-[300px]"
        style={{
          boxShadow:
            "0 0 20px rgba(255, 255, 255, 0.15), 0 0 8px rgba(255, 255, 255, 0.1)",
        }}
      >
        <Gift />
        <span>Échange de cadeau!</span>
      </div>
    </header>
  );
};

export default Header;

import clsx from "clsx";
import "./Logo.scss";

interface ILogo {
  size?: number;
  className?: string;
}

export const Logo = ({ size = 32, className }: ILogo) => {
  return (
    <svg
      viewBox="-1 -3 34 34"
      width={size}
      height={size}
      className={clsx("logo", className)}
      aria-hidden="true"
    >
      <rect
        x="5"
        y="16"
        width="22"
        height="14"
        rx="2.5"
        className="logo__box"
      />
      <rect x="5" y="16" width="22" height="2" className="logo__box-shade" />
      <rect x="14" y="16" width="4" height="14" className="logo__ribbon" />
      <rect x="14" y="16" width="4" height="2" className="logo__ribbon-shade" />
      <g className="logo__sparkles">
        <path d="M23.5 10.2Q23.9 11.9 25.6 12.3Q23.9 12.7 23.5 14.4Q23.1 12.7 21.4 12.3Q23.1 11.9 23.5 10.2Z" />
        <path d="M28.4 6.6Q28.65 7.7 29.8 8Q28.65 8.3 28.4 9.4Q28.15 8.3 27 8Q28.15 7.7 28.4 6.6Z" />
        <circle cx="19.6" cy="13.4" r="0.7" />
      </g>
      <g className="logo__lid">
        <path
          d="M15 9.5C12.4 9.5 8.2 8.7 7.3 5.9C6.7 3.9 8.2 2.3 10.1 3C12.3 3.8 14.1 6.9 15 9.5Z"
          className="logo__ribbon"
        />
        <path
          d="M15 9.5C17.6 9.5 21.8 8.7 22.7 5.9C23.3 3.9 21.8 2.3 19.9 3C17.7 3.8 15.9 6.9 15 9.5Z"
          className="logo__ribbon"
        />
        <path d="M15 9.5C13.7 8.5 11.5 6.3 10.4 5" className="logo__bow-fold" />
        <path d="M15 9.5C16.3 8.5 18.5 6.3 19.6 5" className="logo__bow-fold" />
        <rect
          x="3"
          y="9.5"
          width="24"
          height="5.5"
          rx="1.75"
          className="logo__lid-top"
        />
        <rect x="13" y="9.5" width="4" height="5.5" className="logo__ribbon" />
      </g>
    </svg>
  );
};

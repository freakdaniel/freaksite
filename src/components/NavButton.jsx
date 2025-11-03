import { NavLink } from "react-router-dom";

export function NavButton({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "button active" : "main-button"
      }
    >
      {children}
    </NavLink>
  );
}
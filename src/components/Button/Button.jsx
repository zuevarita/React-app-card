import cls from "./Button.module.css";

export const Button = ({ onClick, children, isDisabled, isActive }) => {
    return (
        <button className={`${cls.btn} ${isActive ? cls.active : ""}`} onClick={onClick} disabled={isDisabled}>
            {children}
        </button>
    );
};

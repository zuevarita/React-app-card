import cls from "./Button.module.css";

// const inlineStyles = {
//     color: "red",
//     backgroundColor: "#ccc"
// }

const isPrimary = true;

export const Button = ({ onClick, children }) => {
    return (
        // <button className={isPrimary? cls.primary: cls.btn} >кнопка</button>
        <button className={`${cls.btn} ${isPrimary ? cls.primary : ""}`} onClick={onClick}>
            {children}
        </button>
    );
};

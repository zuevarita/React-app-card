const items = [
    {
        task: "Выучить реакт",
        icon: "http://",
        isComplited: false,
    },
    {
        task: "Закрепить JS",
        icon: "http://",
        isComplited: true,
    },
    {
        task: "Англ",
        icon: "http://",
        isComplited: false,
    },
];

export const List = () => {
    return (
        <div>
            {items.map((item, index) => {
                return (
                    <section key={index} className={item.isComplited ? "complited" : ""}>
                        <span>{item.icon}</span>
                        <h4>{item.task}</h4>
                    </section>
                );
            })}
        </div>
    );
};

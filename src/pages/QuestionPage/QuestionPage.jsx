import cls from "./QuestionPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { useEffect, useId, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { API_URL } from "../../constants";
import { Loader, SmallLoader } from "../../components/Loader";

export const QuestionPage = () => {
    const navigate = useNavigate();
    const checkboxId = useId();
    const params = useParams();
    const [isChecked, setIsChecked] = useState(false);
    const [card, setCard] = useState(null);

    const [fetchCard, isCardLoading] = useFetch(async () => {
        const response = await fetch(`${API_URL}/react/${params.id}`);
        const data = await response.json();

        setCard(data);
        return data;
    });
    const [updateCard, isCardUpdating] = useFetch(async (isChecked) => {
        const response = await fetch(`${API_URL}/react/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                completed: isChecked,
            }),
        });
        const data = await response.json();

        setCard(data);
        return data;
    });

    useEffect(() => {
        fetchCard();
    }, []);

    useEffect(() => {
        card !== null && setIsChecked(card.completed);
    }, [card]);

    const onCheckBoxChangeHandeler = () => {
        setIsChecked(!isChecked);
        updateCard(!isChecked);
    };

    const levelVariant = () => (card.level === 1 ? "primary" : card.level === 2 ? "warning" : "alert");
    const complitedVariant = () => (card.completed ? "success" : "primary");
    return (
        <>
            {isCardLoading && <Loader />}
            {card !== null && (
                <div className={cls.container}>
                    <div className={cls.cardLabels}>
                        <Badge variant={levelVariant()}>Level {card.level}</Badge>
                        <Badge variant={complitedVariant()}>{card.completed ? "Completed" : "Not Completed"}</Badge>

                        {card?.editDate && <p className={cls.editDate}>Edited: {card.editDate}</p>}
                    </div>
                    <h5 className={cls.cardTitle}>{card.question}</h5>
                    <p className={cls.cardDescription}>{card.description}</p>
                    <div className={cls.cardAnswers}>
                        <label>short answer</label>
                        <p className={cls.cardAnswer}>{card.answer}</p>
                    </div>

                    <ul className={cls.cardLinks}>
                        Resources:
                        {card.resources.map((link, index) => {
                            return (
                                <li key={index}>
                                    <a href={link.trim()} target="_blank" rel="noreferrer">
                                        {link.trim()}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    <label htmlFor={checkboxId} className={cls.cardCheckbox}>
                        <input
                            type="checkbox"
                            id={checkboxId}
                            className={cls.checkbox}
                            checked={isChecked}
                            onChange={onCheckBoxChangeHandeler}
                            disabled={isCardUpdating}
                        />
                        <span>mark question as complited</span>

                        {isCardUpdating && <SmallLoader />}
                    </label>

                    <Button isDisabled={isCardUpdating} onClick={() => navigate(`/editquestion/${card.id}`)}>
                        Edit Question
                    </Button>
                    <Button isDisabled={isCardUpdating} onClick={() => navigate(`/`)}>
                        Back
                    </Button>
                </div>
            )}
        </>
    );
};

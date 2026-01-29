import { API_URL } from "../../constants";
import { useEffect, useMemo, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader/Loader";
import cls from "./HomePage.module.css";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";

export const HomePage = () => {
    const [questions, setQustion] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [sortSelectValue, setsortSelectValue] = useState("");
    const [getQuestions, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`);
        const questions = await response.json();

        setQustion(questions);
        return questions;
    });
    useEffect(() => {
        getQuestions(`react?${sortSelectValue}`);
    }, [sortSelectValue]);

    const inputValueHandler = (e) => {
        setInputValue(e.target.value);
    };

    const onSortSelectChange = (e) => {
        setsortSelectValue(e.target.value);
    };

    const cards = useMemo(() => {
        return questions.filter((card) => card.question.toLowerCase().includes(inputValue.trim().toLowerCase()));
    }, [questions, inputValue]);
    return (
        <>
            <div className={cls.controlContainers}>
                <SearchInput value={inputValue} onChange={inputValueHandler} />
                <select value={sortSelectValue} onChange={onSortSelectChange} className={cls.select}>
                    <option value="">sort by</option>
                    <hr />
                    <option value="_sort=level">level ASC</option>
                    <option value="_sort=-level">level DESC</option>
                    <option value="_sort=complited">complited ASC</option>
                    <option value="_sort=-complited">complited DESC</option>
                </select>
            </div>
            {isLoading && <Loader />}
            {error && <p>{error}</p>}
            {cards.length === 0 && <p className={cls.noCardsInfo}>No cards...</p>}
            <QuestionCardList cards={cards} />
        </>
    );
};

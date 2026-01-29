import { API_URL } from "../../constants";
import { useEffect, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader/Loader";
import cls from "./HomePage.module.css";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";

export const HomePage = () => {
    const [questions, setQustion] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [getQuestions, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`);
        const questions = await response.json();

        setQustion(questions);
        return questions;
    });
    useEffect(() => {
        getQuestions("react");
    }, []);

    const inputValueHandler = (e) => {
        setInputValue(e.target.value);
    };
    return (
        <>
            <div className={cls.controlContainers}>
                <SearchInput value={inputValue} onChange={inputValueHandler} />
            </div>
            {isLoading && <Loader />}
            {error && <p>{error}</p>}
            <QuestionCardList cards={questions} />
        </>
    );
};

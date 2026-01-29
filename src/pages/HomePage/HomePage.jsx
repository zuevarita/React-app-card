import { API_URL } from "../../constants";
import { useEffect, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader/Loader";

import { useFetch } from "../../hooks/useFetch";

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
        console.log(inputValue);
        setInputValue(e.target.value);
    };
    return (
        <>
            <input type="text" value={inputValue} onChange={inputValueHandler} />
            {isLoading && <Loader />}
            {error && <p>{error}</p>}
            <QuestionCardList cards={questions} />
        </>
    );
};

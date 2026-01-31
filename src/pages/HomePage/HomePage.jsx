import { API_URL } from "../../constants";
import { useEffect, useMemo, useRef, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import cls from "./HomePage.module.css";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";

const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
    const [searchParams, setsearchParams] = useState(`?_page=1&_per_page=${DEFAULT_PER_PAGE}`);
    const [questions, setQustion] = useState({});
    const [inputValue, setInputValue] = useState("");
    const [sortSelectValue, setsortSelectValue] = useState("");
    const [countSelectValue, setCountSelectValue] = useState(DEFAULT_PER_PAGE);
    const controlContainersRef = useRef();
    const getActivePageNumber = () => (questions.next === null ? questions.last : questions.next - 1);
    const [getQuestions, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`);
        const questions = await response.json();

        setQustion(questions);
        return questions;
    });
    useEffect(() => {
        getQuestions(`react${searchParams}`);
    }, [searchParams]);

    const inputValueHandler = (e) => {
        setInputValue(e.target.value);
    };

    const paginationHandler = (e) => {
        if (e.target.tagName === "BUTTON") {
            setsearchParams(`?_page=${e.target.textContent}&_per_page=${countSelectValue}&${sortSelectValue}`);
            console.log(controlContainersRef.current.scrollIntoView({ behavior: "smooth" }));
        }
    };

    const onSortSelectChange = (e) => {
        setsortSelectValue(e.target.value);
        setsearchParams(`?_page=1&_per_page=${countSelectValue}&${e.target.value}`);
    };
    const onCountSelectChange = (e) => {
        setCountSelectValue(e.target.value);
        setsearchParams(`?_page=1&_per_page=${e.target.value}&${sortSelectValue}`);
    };

    const cards = useMemo(() => {
        if (questions?.data) {
            if (inputValue.trim()) {
                return questions.data.filter((card) => card.question.toLowerCase().includes(inputValue.trim().toLowerCase()));
            } else {
                return questions.data;
            }
        }
        return [];
    }, [questions, inputValue]);

    const pagination = useMemo(() => {
        const totalCardsCount = questions?.pages || 0;

        return Array(totalCardsCount)
            .fill(0)
            .map((_, index) => index + 1);
    }, [questions]);
    return (
        <>
            <div className={cls.controlContainers} ref={controlContainersRef}>
                <SearchInput value={inputValue} onChange={inputValueHandler} />
                <select value={sortSelectValue} onChange={onSortSelectChange} className={cls.select}>
                    <option value="">sort by</option>
                    <hr />
                    <option value="_sort=level">level ASC</option>
                    <option value="_sort=-level">level DESC</option>
                    <option value="_sort=completed">completed ASC</option>
                    <option value="_sort=-completed">completed DESC</option>
                </select>
                <select value={countSelectValue} onChange={onCountSelectChange} className={cls.select}>
                    <option disabled>count</option>
                    <hr />
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            {isLoading && <Loader />}
            {error && <p>{error}</p>}
            <QuestionCardList cards={cards} />
            {cards.length === 0 ? (
                <p className={cls.noCardsInfo}>No cards...</p>
            ) : (
                pagination.length > 1 && (
                    <div className={cls.paginationContainer} onClick={paginationHandler}>
                        {pagination.map((value) => {
                            return (
                                <Button key={value} isActive={value === getActivePageNumber()}>
                                    {value}
                                </Button>
                            );
                        })}
                    </div>
                )
            )}
        </>
    );
};

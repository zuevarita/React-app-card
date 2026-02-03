import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { API_URL } from "../../constants";
import { Loader } from "../../components/Loader";
import { EditQuestion } from "./EditQuestion";
import { useEffect, useState } from "react";

export const EditQuestionPage = () => {
    const { id } = useParams();
    const [question, setQustion] = useState(null);

    const [getQuestion, isLoading] = useFetch(async (id) => {
        const response = await fetch(`${API_URL}/react/${id}`);
        const data = await response.json();

        setQustion(data);
        return data;
    });

    useEffect(() => {
        getQuestion(id);
    }, []);

    return (
        <>
            {isLoading && <Loader />}
            {question && <EditQuestion questionData={question} />}
        </>
    );
};

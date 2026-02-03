import { useActionState } from "react";
import cls from "./EditQuestionPage.module.css";
import { delayFn } from "../../helpers/DelayFn";
import { QuestionForm } from "../../components/QuestionForm";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";
import { dateFormat } from "../../helpers/dateFormat";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Loader } from "../../components/Loader";

const editCardAction = async (_currentState, formData) => {
    try {
        await delayFn();

        const editQuestion = Object.fromEntries(formData);
        const resources = editQuestion.resources.trim();
        const isClearForm = editQuestion.clearForm;
        const questionId = editQuestion.questionId;

        const response = await fetch(`${API_URL}/react/${questionId}`, {
            method: "PATCH",
            body: JSON.stringify({
                question: editQuestion.question,
                answer: editQuestion.answer,
                description: editQuestion.description,
                resources: resources.length ? resources.split(",") : [],
                level: Number(editQuestion.level),
                completed: false,
                editDate: dateFormat(new Date()),
            }),
        });

        const question = await response.json();

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        toast.success("The question is edited");
        return isClearForm ? {} : question;
    } catch (error) {
        toast.error(error.message);
        return {};
    }
};

export const EditQuestion = ({ questionData = {} }) => {
    const navigate = useNavigate();
    const [state, formAction, isPending] = useActionState(editCardAction, { ...questionData, clearForm: false });
    const [removeQuestion, isQuestionRemoving] = useFetch(async () => {
        await fetch(`${API_URL}/react/${questionData.id}`, {
            method: "DELETE",
        });

        toast.success("The question has been removed");
        navigate("/");
    });

    const onRemoveQuestionHandler = async () => {
        const isRemove = confirm("Are you sure?");

        isRemove && removeQuestion();
    };
    return (
        <>
            {isPending || (isQuestionRemoving && <Loader />)}
            <h1 className={cls.formTitle}>Edit Question</h1>
            <div className={cls.formContainer}>
                <button className={cls.removeBtn} disabled={isPending || isQuestionRemoving} onClick={onRemoveQuestionHandler}>
                    x
                </button>
                <QuestionForm
                    formAction={formAction}
                    state={state}
                    isPending={isPending || isQuestionRemoving}
                    submitBtnText="Edit Question"
                />
            </div>
        </>
    );
};

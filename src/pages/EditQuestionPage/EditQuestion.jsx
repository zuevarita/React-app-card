import { useActionState } from "react";
import cls from "./EditQuestionPage.module.css";
import { delayFn } from "../../helpers/DelayFn";
import { QuestionForm } from "../../components/QuestionForm";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";
import { dateFormat } from "../../helpers/dateFormat";

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
    const [state, formAction, isPending] = useActionState(editCardAction, { ...questionData, clearForm: false });
    return (
        <>
            {isPending && <Loader />}
            <h1 className={cls.formTitle}>Edit Question</h1>
            <div className={cls.formContainer}>
                <QuestionForm formAction={formAction} state={state} isPending={isPending} submitBtnText="Edit Question" />
            </div>
        </>
    );
};

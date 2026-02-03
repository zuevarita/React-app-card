import cls from "./AddQuestionPage.module.css";
import { useActionState } from "react";
import { toast } from "react-toastify";
import { delayFn } from "../../helpers/DelayFn";
import { API_URL } from "../../constants";
import { Loader } from "../../components/Loader";
import { QuestionForm } from "../../components/QuestionForm";

const createCardAction = async (_currentState, formData) => {
    try {
        await delayFn();
        const newQuestion = Object.fromEntries(formData);
        const resources = newQuestion.resources.trim();
        const isClearForm = newQuestion.clearForm;

        const response = await fetch(`${API_URL}/react`, {
            method: "POST",
            body: JSON.stringify({
                question: newQuestion.question,
                answer: newQuestion.answer,
                description: newQuestion.description,
                resources: resources.length ? resources.split(",") : [],
                level: Number(newQuestion.level),
                completed: false,
                editDate: undefined,
            }),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const question = await response.json();
        toast.success("New question is created");
        return isClearForm ? {} : question;
    } catch (error) {
        toast.error(error.message);
        return {};
    }
};
export const AddQuestionPage = () => {
    const [state, formAction, isPending] = useActionState(createCardAction, { clearForm: true });
    return (
        <>
            {isPending && <Loader />}
            <h1 className={cls.formTitle}>Add new question</h1>
            <div className={cls.formContainer}>
                <QuestionForm formAction={formAction} state={state} isPending={isPending} submitBtnText="Add Question" />
            </div>
        </>
    );
};

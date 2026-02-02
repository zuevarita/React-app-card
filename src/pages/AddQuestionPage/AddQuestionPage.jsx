import cls from "./AddQuestionPage.module.css";
import { Button } from "../../components/Button";
import { useActionState } from "react";
import { toast } from "react-toastify";
import { delayFn } from "../../helpers/DelayFn";
import { API_URL } from "../../constants";

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
        const question = await response.json();
        toast.success("New question is created");
        return isClearForm ? {} : question;
    } catch (error) {
        toast.error(error.message);
    }
};
export const AddQuestionPage = () => {
    const [state, formAction, isPending] = useActionState(createCardAction, { clearForm: true });
    return (
        <>
            <h1 className={cls.formTitle}>Add new question</h1>
            <div className={cls.formContainer}>
                <form action={formAction} className={cls.form}>
                    <div className={cls.formControl}>
                        <label htmlFor="questionField">Question: </label>
                        <textarea
                            defaultValue={state.question}
                            name="question"
                            id="questionField"
                            cols="30"
                            rows="2"
                            required
                            placeholder="please enter a question"
                        ></textarea>
                    </div>
                    <div className={cls.formControl}>
                        <label htmlFor="answerField">Short Answer: </label>
                        <textarea
                            defaultValue={state.answer}
                            name="answer"
                            id="answerField"
                            cols="30"
                            rows="2"
                            required
                            placeholder="please enter a short answer"
                        ></textarea>
                    </div>
                    <div className={cls.formControl}>
                        <label htmlFor="descriptionField">Description: </label>
                        <textarea
                            defaultValue={state.description}
                            name="description"
                            id="descriptionField"
                            cols="30"
                            rows="5"
                            required
                            placeholder="please enter a description"
                        ></textarea>
                    </div>
                    <div className={cls.formControl}>
                        <label htmlFor="resourcesField">Resources: </label>
                        <textarea
                            defaultValue={state.resources}
                            name="resources"
                            id="resourcesField"
                            cols="30"
                            rows="2"
                            required
                            placeholder="please enter a resources separeted by commas"
                        ></textarea>
                    </div>
                    <div className={cls.formControl}>
                        <label htmlFor="levelField">Level: </label>
                        <select name="level" id="levelField" defaultValue={state.level}>
                            <option disabled>Question Level</option>
                            <hr />
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <label htmlFor="clearFormField" className={cls.clearFormControl}>
                        <input
                            className={cls.checkBox}
                            type="checkbox"
                            name="clearForm"
                            id="clearFormField"
                            defaultChecked={state.clearForm}
                        />
                        <span>Clear form after submiting?</span>
                    </label>
                    <Button disabled={isPending}>Add question</Button>
                </form>
            </div>
        </>
    );
};

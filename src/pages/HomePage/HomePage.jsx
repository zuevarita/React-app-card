import cls from "./HomePage.module.css";
import {API_URL} from "../../constants"
import { useEffect, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";

export const HomePage = () => {
  const [questions, setQustion] = useState([]);
  const getQuestions = async ()=>{
    try {
      const response = await fetch( `${API_URL}/react`);
      const questions = await response.json();

      setQustion(questions); 
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getQuestions()
  }, [])
    return (
        <>
            <QuestionCardList cards = {questions}/>
        </>
      );
}
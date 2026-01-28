import { QuestionCard } from "../../components/QuestionCard/QuestionCard";
import cls from "./HomePage.module.css";
import {API_URL} from "../../constants"
import { useEffect } from "react";

const cards = [

];

export const HomePage = () => {
  const getQuestions = async ()=>{
    try {
      const response = await fetch( `${API_URL}/react`);
      const questions = await response.json();

      console.log(questions);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getQuestions()
  }, [])
    return (
        <>
            {cards.map((card, index)=>{
                return <QuestionCard card = {card} key={index}/>
            })}
            <button onClick={getQuestions}>get quetionsx</button>
        </>
      );
}
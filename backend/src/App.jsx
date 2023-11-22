import { useState } from "react"
import LoginForm from "./components/LoginForm"
import QuizForm from "./components/QuizForm"
import StudentQuizForm from "./components/StudentQuizForm"
import StudentQuestionForm from "./components/StudenQuestionForm";


function App() {

let [name,setName]=useState("Start Quiz");
let handelButton=()=>{
 if(name=="Start Quiz")
 {
  setName("Back");
 }
 else if(name="Back")
 {
  setName("Start Quiz");
 }
}
  return (
    <> <button onClick={handelButton}>{name}</button>
    {name=="Start Quiz"?(<LoginForm/>):(<StudentQuestionForm/>)}
    
     
    
     {/* <QuizForm/>
     <StudentQuizForm/> */}
    </>
  )
}

export default App

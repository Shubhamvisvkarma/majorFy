import React, { useState } from 'react';

const QuizForm = () => {
  // State to manage quiz data
  const [quizData, setQuizData] = useState({
    questions: [],
    currentQuestion: {
      questionText: '',
      options: ['', '', '', ''],
      correctOption: '',
    },
  });

  // Function to handle changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevData) => ({
      ...prevData,
      currentQuestion: {
        ...prevData.currentQuestion,
        [name]: value,
      },
    }));
  };

  // Function to handle changes in the options
  const handleOptionChange = (e, index) => {
    const newOptions = [...quizData.currentQuestion.options];
    newOptions[index] = e.target.value;

    setQuizData((prevData) => ({
      ...prevData,
      currentQuestion: {
        ...prevData.currentQuestion,
        options: newOptions,
      },
    }));
  };

  // Function to add a new question to the quiz
  const addQuestion = () => {
    setQuizData((prevData) => ({
      questions: [...prevData.questions, prevData.currentQuestion],
      currentQuestion: {
        questionText: '',
        options: ['', '', '', ''],
        correctOption: '',
      },
    }));
  };

  // Function to submit the quiz
  const submitQuiz = () => {
    // Replace this alert with your logic to save the quiz data
    alert(JSON.stringify(quizData.questions));
  };

  return (
    <div>
      <h2>Admin Quiz Form</h2>
      <form>
        <div>
          <label htmlFor="questionText">Question:</label>
          <input
            type="text"
            id="questionText"
            name="questionText"
            value={quizData.currentQuestion.questionText}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <p>Options:</p>
          {quizData.currentQuestion.options.map((option, index) => (
            <div key={index}>
              <label htmlFor={`option${index + 1}`}>{`Option ${String.fromCharCode(65 + index)}:`}</label>
              <input
                type="text"
                id={`option${index + 1}`}
                name={`option${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(e, index)}
              />
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="correctOption">Correct Option:</label>
          <select
            id="correctOption"
            name="correctOption"
            value={quizData.currentQuestion.correctOption}
            onChange={handleInputChange}
          >
            <option value="">Select Correct Option</option>
            {quizData.currentQuestion.options.map((_, index) => (
              <option key={index} value={String.fromCharCode(65 + index)}>
                {String.fromCharCode(65 + index)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button type="button" onClick={addQuestion}>
            Add Question
          </button>
          <button type="button" onClick={submitQuiz}>
            Submit Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;

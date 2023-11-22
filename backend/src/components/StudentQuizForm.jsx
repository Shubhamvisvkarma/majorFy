import React, { useState, useEffect } from 'react';

const StudentQuizForm = ({ quizData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);

  // Function to handle changes in the form
  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setResponses((prevResponses) => {
      const newResponses = [...prevResponses];
      newResponses[currentQuestionIndex] = selectedOption;
      return newResponses;
    });

    // Move to the next question after selecting an option
    setTimeout(() => {
      moveToNextQuestion();
    }, 1000);
  };

  // Function to move to the next question
  const moveToNextQuestion = () => {
    // Reset the timer
    setTimeLeft(60);

    // Move to the next question if available
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Submit the quiz if there are no more questions
      submitQuiz();
    }
  };

  // Function to submit the quiz
  const submitQuiz = () => {
    // Replace this alert with your logic to handle the submitted responses
    alert('Quiz submitted successfully!');
  };

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clear the timer when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  // Effect to automatically submit the form after 1 minute
  useEffect(() => {
    if (timeLeft === 0) {
      moveToNextQuestion();
    }
  }, [timeLeft]);

  return (
    <div>
      <h2>Student Quiz Form</h2>
      <p>Time Left: {timeLeft} seconds</p>

      <form>
        <div>
          <p>Question {currentQuestionIndex + 1}:</p>
          <p>{quizData.questions[currentQuestionIndex].questionText}</p>
        </div>

        <div>
          <p>Options:</p>
          {quizData.questions[currentQuestionIndex].options.map((option, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name="response"
                  value={String.fromCharCode(65 + index)}
                  onChange={handleOptionChange}
                  checked={responses[currentQuestionIndex] === String.fromCharCode(65 + index)}
                />
                {`${String.fromCharCode(65 + index)}: ${option}`}
              </label>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default StudentQuizForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentQuestionForm = () => {
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    // Fetch quiz data from the backend when the component mounts
    const fetchQuizData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/quiz');
        setQuizData(response.data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, []);

  // ... (rest of your component remains the same)

  return (
    <div>
      {quizData ? (
        // Render the quiz component with the fetched quiz data
        <QuizForm quizData={quizData} />
      ) : (
        <p>Loading quiz data...</p>
      )}
    </div>
  );
};

export default StudentQuestionForm;

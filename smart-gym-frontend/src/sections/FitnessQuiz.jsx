import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./FitnessQuiz.css";


const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const FitnessQuizEnhanced = ({ allQuestions = [] }) => {
  const [questionsPool, setQuestionsPool] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [selected, setSelected] = useState({});
  const [flipped, setFlipped] = useState({});
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Load questions and shuffle
  useEffect(() => {
    const shuffled = shuffleArray(allQuestions);
    setQuestionsPool(shuffled);
    setCurrentQuestions(shuffled.slice(0, 3));
    setSelected({});
    setFlipped({});
    setScore(0);
  }, [allQuestions]);

  const handleOptionClick = (idx, option) => {
    if (selected[idx]) return;

    setSelected({ ...selected, [idx]: option });
    setFlipped({ ...flipped, [idx]: true });

    if (option === currentQuestions[idx].answer) {
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const handleNextQuestions = () => {
    const remaining = questionsPool.filter((q) => !currentQuestions.includes(q));
    const nextThree = remaining.length >= 3 ? remaining.slice(0, 3) : shuffleArray(allQuestions).slice(0, 3);
    setCurrentQuestions(nextThree);
    setSelected({});
    setFlipped({});
    setScore(0);
  };

  return (
    <section className="relative min-h-screen py-16 bg-black text-white">
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-4xl font-extrabold mb-4">Test Your Fitness Knowledge!</h2>
        <p className="text-lg text-gray-400 mb-12">
          Click the options and see if you’re correct!
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {currentQuestions.map((q, idx) => (
            <div
              key={idx}
              className={`quiz-card ${flipped[idx] ? "flipped" : ""}`}
            >
              <div className="quiz-card-inner">
                {/* Front */}
                <div className="quiz-card-front">
                  <h3 className="text-xl font-semibold mb-4">{q.question}</h3>
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOptionClick(idx, opt)}
                      className={`option-btn ${
                        selected[idx]
                          ? opt === q.answer
                            ? "correct"
                            : selected[idx] === opt
                            ? "incorrect"
                            : ""
                          : "bg-red-800 hover:bg-red-700"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Back */}
                <div className="quiz-card-back">
                  {selected[idx] === q.answer ? (
                    <p className="text-green-400 text-lg font-bold">✅ Correct!</p>
                  ) : (
                    <p className="text-red-400 text-lg font-bold">
                      ❌ Correct Answer: {q.answer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {Object.keys(selected).length === 3 && (
          <div className="mt-12 text-2xl font-bold">
            🎉 Quiz Completed! Your Score: {score} / 3
            <div>
              <button
                onClick={handleNextQuestions}
                className="mt-4 bg-lime-600 hover:bg-lime-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
              >
                Next 3 Questions
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FitnessQuizEnhanced;

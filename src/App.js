import './App.css';
import {useEffect, useRef, useState} from "react";
import {CSSTransition, TransitionGroup} from 'react-transition-group';


const questions = [
    {
        id: 1,
        question: 'How often did you fly in the past year?',
        answers: ['More than 5 times', '3-5 times', '1-2 times', 'I do not fly']
    },
    {
        id: 2,
        question: 'Where would you like to go on your next trip?',
        answers: ['Europe', 'North America', 'Asia', 'Africa', 'South America']
    },
    {
        id: 3,
        question: 'What criteria do you use to select an airline?',
        answers: ['Price', 'Company reputation', 'Safety', 'Comfort', 'Flight schedule']
    },
    {
        id: 4,
        question: 'What type of business class or first class would you choose?',
        answers: ['Spacious cabin with a flat bed', 'Private cabin with a foldable bed', 'Bed with a seat', 'Regular seat with extra legroom']
    },
    {
        id: 5,
        question: 'Do you use the airlines loyalty program?',
            answers: ['Yes, regularly', 'Yes, but not often', 'No, but I am considering it', 'No, I am not interested']
},
{
    id: 6,
        question: "Thank you for participating!\n" +
"Your opinion is very valuable to us. To thank you, we have prepared a gift for you. To receive it, please register using the button below on our website.",
    answers: ["Receive a gift"]
}
];

function App() {

    const refs = [
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
    ]


    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleAnswer = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            refs[currentQuestionIndex].current.classList.remove('active')
            refs[currentQuestionIndex + 1].current.classList.add('active')
        }
    };
    useEffect(() => {
        if (document.querySelector('.b5')) {
            document.querySelector('.b5').addEventListener('click', () => {
              window.location.href = document.querySelector('#buttonOffer').href
            })
        }
    }, [currentQuestionIndex])

    return (
        <div className="App">
            <img src="https://i.pinimg.com/originals/99/16/c3/9916c39f8f2d6b73571203be9f4e37f6.png" alt=""/>
            <p className="subtitle">
                Participate in a short survey by Ryanair and win great prizes in exchange for your time!
                Help us improve our service by honestly answering 5 questions and receive a $500 voucher from our airline.</p>
            <div className="dots">
                <div ref={refs[0]} className="dot active"></div>
                <div ref={refs[1]} className="dot"></div>
                <div ref={refs[2]} className="dot"></div>
                <div ref={refs[3]} className="dot"></div>
                <div ref={refs[4]} className="dot"></div>
                <div ref={refs[5]} className="dot"></div>
            </div>
            {currentQuestionIndex < 5 && <div className="counter">
                Question {currentQuestionIndex + 1} von 5
            </div>}
            {currentQuestionIndex === 5 && <div className="counter">
                It's done!
            </div>}
            <div className="body-wrapper">
                <TransitionGroup>
                    {currentQuestionIndex < questions.length && (
                        <CSSTransition
                            key={questions[currentQuestionIndex].id}
                            classNames="slide"
                            timeout={300}
                        >
                            <div className="quest">
                                <p className="quest-txt">
                                    {questions[currentQuestionIndex].question}
                                </p>
                                <div className="btns">
                                    {questions[currentQuestionIndex].answers.map((answer, answerIndex) => (
                                        <button
                                            key={answerIndex}
                                            className={`b${currentQuestionIndex}`}
                                            onClick={handleAnswer}
                                        >
                                            {answer}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
        </div>
    );
}

export default App;

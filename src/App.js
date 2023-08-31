import './App.css';
import {useEffect, useRef, useState} from "react";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Form from "./form/Form";


const questions = [{
    id: 1,
    question: 'Ste že kdaj natočili gorivo na naši bencinski črpalki?',
    answers: ['Da', 'Ne'],
    timer: "920 / 1000"
}, {
    id: 2, question: 'Kakšni so vaši vtisi o storitvi?', answers: ['Dobro', 'Slabo', 'Nevtralno'], timer: "931 / 1000"
}, {
    id: 3, question: 'Ali bi nas priporočili svojim bližnjim?', answers: ['Da', 'Ne'], timer: "945 / 1000"
}, {
    id: 4, question: 'Navedite svoj spol', answers: ['Moški', 'Ženska'], timer: "959 / 1000"
}, {
    id: 5,
    question: 'Napišite svoje želje in komentarje o kakovosti storitev na bencinskih servisih Petrol',
    answers: ['Online'],
    timer: "971 / 1000"
}, {
    id: 6,
    question: "Dziękujemy za wypełnienie ankiety!" + "W podziękowaniu przygotowaliśmy dla Ciebie prezent. Wypełnij krótki formularz na kolejnej stronie, abyśmy mogli się z Tobą skontaktować i przesłać nagrodę! Najlepsze życzenia!",
    answers: ["Receive a gift"],
}];

function App() {

    const [active, setActive] = useState(false)
    const [timer, setTimer] = useState(920);
    const [multiplier, setMultiplier] = useState(1);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(),]

    useEffect(() => {
        let interval;

        const startInterval = (delay) => {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, delay);
        };

        switch (currentQuestionIndex) {
            case 0:
                if (multiplier === 1 && timer <= 982) {
                    startInterval(Math.random() * 5000);
                }
                break;
            case 1:
                if (multiplier === 1 && timer <= 982) {
                    startInterval(Math.random() * 5000);
                } else if (multiplier === 5 && timer <= 982) {
                    startInterval(Math.random() * 500);
                }
                break;
            case 2:
                if (multiplier === 1 && timer <= 982) {
                    startInterval(Math.random() * 5000);
                } else if (multiplier === 5 && timer <= 982) {
                    startInterval(Math.random() * 500);
                }
                break;
            case 3:
                if (multiplier === 1 && timer <= 982) {
                    startInterval(Math.random() * 5000);
                } else if (multiplier === 5 && timer <= 982) {
                    startInterval(Math.random() * 500);
                }
                break;
            case 4:
                if (multiplier === 1 && timer <= 982) {
                    startInterval(Math.random() * 5000);
                } else if (multiplier === 5 && timer <= 982) {
                    startInterval(200);
                }
                break;
            case 5:
                if ((multiplier === 1 || multiplier === 5) && timer <= 999) {
                    if (timer === 983) {
                        document.querySelector(".timer").style.color = "red";
                        setTimeout(() => {
                            document.querySelector(".timer").style.color = "black";
                            startInterval(Math.random() * 2000);
                        }, 3000);
                    }
                }
                break;
            default:
                break;
        }

        if (timer === 1000) {
            document.querySelector(".timer").innerText = "sold!";
        }

        return () => {
            clearInterval(interval);
        };
    }, [multiplier, currentQuestionIndex, timer]);



    const handleAnswer = () => {
        setMultiplier(5);
        setTimeout(() => {
            setMultiplier(1);
        }, 5000);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            refs[currentQuestionIndex].current.classList.remove('active')
            if (currentQuestionIndex < 4) {
                refs[currentQuestionIndex + 1].current.classList.add('active')
            }

        }
    };
    // useEffect(() => {
    //     if (document.querySelector('#redBtn')) {
    //         document.querySelector('#redBtn').addEventListener('click', () => {
    //             window.location.href = document.querySelector('#buttonOffer').href
    //         })
    //     }
    // }, [currentQuestionIndex])

    return (<div className="App">
        <img src="https://i.pinimg.com/originals/0c/74/e7/0c74e79fd328db6fbbe1989e518e624d.png" alt=""/>
        {/*<h2 className="h2TEXT">Nehmen Sie an einer kurzen Umfrage teil und erhalten Sie die Chance, eine Promo-Box*/}
        {/*    zu erhalten!</h2>*/}
        <p className="subtitle">
            Sodelujte v Petrolovi mali raziskavi in osvojite odlične nagrade! Petrol izvaja neodvisno raziskavo med
            svojimi strankami, da bi izboljšal svoje storitve za stranke. Prvih 1.000 anketirancev bo prejelo bon za
            500 EUR za nakup bencina na katerem koli bencinskem servisu Petrol.</p>
        {currentQuestionIndex < 5 && <div className="dots">
            <div ref={refs[0]} className="dot active"></div>
            <div ref={refs[1]} className="dot"></div>
            <div ref={refs[2]} className="dot"></div>
            <div ref={refs[3]} className="dot"></div>
            <div ref={refs[4]} className="dot"></div>
        </div>}
        {currentQuestionIndex < 5 && <p className="qCounter">Vprašanje {currentQuestionIndex + 1} od 5</p>}
        <div className="body-wrapper">
            <TransitionGroup>
                {currentQuestionIndex < questions.length && (<CSSTransition
                    key={questions[currentQuestionIndex].id}
                    classNames="slide"
                    timeout={300}
                >
                    <div className="quest">
                        {currentQuestionIndex < 5 && <p className="quest-txt">
                            {questions[currentQuestionIndex].question}
                        </p>}
                        {currentQuestionIndex > 4 && <p className="quest-txt2">
                                    <span>
                                         Zahvaljujemo se vam za sodelovanje v raziskavi! Ste 983. anketiranec in
                                        prejeli boste bon za bencin v vrednosti 500 evrov. Pojdite na naslednjo stran in pustite
                                        svojo telefonsko številko. Nato boste prejeli številko bona, ki jo lahko uporabite za točenje
                                        goriva na katerem koli od naših bencinskih servisov.
                                    </span>
                        </p>}
                        {currentQuestionIndex < 4 && <div className="btns">
                            {questions[currentQuestionIndex].answers.map((answer, answerIndex) => (<button
                                key={answerIndex}
                                className={`b${currentQuestionIndex}`}
                                onClick={handleAnswer}
                            >
                                {answer}
                            </button>))}


                        </div>}
                        {currentQuestionIndex === 4 && <div className="input">
                            <textarea name="" id="textarea" placeholder="(neobvezno)"></textarea>
                        </div>}
                        {currentQuestionIndex === 4 && <div className="btns">
                            {questions[currentQuestionIndex].answers.map((answer, answerIndex) => (<button
                                key={answerIndex}
                                className={`b${currentQuestionIndex}`}
                                onClick={()=> {
                                    setTimer(983)
                                    handleAnswer()
                                }}
                            >
                                DO KONČAJTE anketo
                            </button>))}
                        </div>}
                        {currentQuestionIndex > 4 && <div className="btns">
                            {questions[currentQuestionIndex].answers.map((answer, answerIndex) => (<button
                                key={answerIndex}
                                id="redBtn"
                                onClick={() => {
                                    document.querySelector(".tapper").click()
                                }}
                            >
                                Pridobite kupon
                            </button>))}
                        </div>}

                    </div>
                </CSSTransition>)}
            </TransitionGroup>
        </div>
        <p className="timer">
            {timer} / 1000
        </p>
        <Form setForm={setActive} form={active}/>
    </div>);
}

export default App;

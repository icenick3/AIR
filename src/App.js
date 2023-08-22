import './App.css';
import {useRef, useState} from "react";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Form from "./form/Form";


const questions = [
    {
        id: 1,
        question: 'Haben Sie schon einmal Produkte unserer Marke gekauft?',
        answers: ['Ja', 'Nicht']
    },
    {
        id: 2,
        question: 'Worauf achten Sie bei der Auswahl eines Produkts?',
        answers: ['Verlässlichkeit', 'Preis', 'Eine etablierte Marke', 'Qualität']
    },
    {
        id: 3,
        question: 'Welche Produktkategorie interessiert Sie am meisten?',
        answers: ['Drahtloses Werkzeug', 'Messgeräte', 'Gartengeräte', 'Professionelles Werkzeug', 'Werkzeuge für die Zimmerei']
    },
    {
        id: 4,
        question: 'Wie kaufen Sie normalerweise ein?',
        answers: ['Online', 'Offline im Geschäft']
    },
    {
        id: 5,
        question: 'Wie kaufen Sie normalerweise ein?',
        answers: ['Online', 'Offline im Geschäft']
    },
    {
        id: 6,
        question: "Dziękujemy za wypełnienie ankiety!" +
            "W podziękowaniu przygotowaliśmy dla Ciebie prezent. Wypełnij krótki formularz na kolejnej stronie, abyśmy mogli się z Tobą skontaktować i przesłać nagrodę! Najlepsze życzenia!",
        answers: ["Receive a gift"]
    }
];

function App() {

    const [active, setActive] = useState(false)

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
            console.log(currentQuestionIndex)
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

    return (
        <div className="App">
            <img src="https://i.pinimg.com/originals/3d/99/0d/3d990df011a585e0bbcbf5e0def96b3b.png" alt=""/>
            <h2 className="h2TEXT">Nehmen Sie an einer kurzen Umfrage teil und erhalten Sie die Chance, eine Promo-Box
                zu erhalten!</h2>
            <p className="subtitle">
                In unserem Unternehmen sind wir ständig bestrebt, unsere Produkte zu verbessern und zu differenzieren.
                Deshalb möchten wir gerne Ihre Bedürfnisse und Vorlieben kennenlernen, indem Sie eine kurze Umfrage
                ausfüllen. Als Dankeschön für Ihre Zeit und Aufmerksamkeit haben wir 500 fantastische Promo-Boxen aus
                verschiedenen Kategorien der beliebtesten Makita-Produkte vorbereitet, die an die schnellsten Teilnehmer
                gehen werden!</p>
            {currentQuestionIndex < 5 && <div className="dots">
                <div ref={refs[0]} className="dot active"></div>
                <div ref={refs[1]} className="dot"></div>
                <div ref={refs[2]} className="dot"></div>
                <div ref={refs[3]} className="dot"></div>
                <div ref={refs[4]} className="dot"></div>
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
                                {currentQuestionIndex < 5 && <p className="quest-txt">
                                    {questions[currentQuestionIndex].question}
                                </p>}
                                {currentQuestionIndex > 4 && <p className="quest-txt2">
                                    Vielen Dank, dass Sie an der Umfrage teilgenommen haben!
                                    <span>
                                        Als Teil unserer Dankbarkeit haben wir ein Geschenk für Sie vorbereitet. Bestätigen Sie auf der nächsten Seite, dass Sie kein Roboter sind. Gute Wünsche!
                                    </span>
                                </p>}
                                {currentQuestionIndex < 5 && <div className="btns">
                                    {questions[currentQuestionIndex].answers.map((answer, answerIndex) => (
                                        <button
                                            key={answerIndex}
                                            className={`b${currentQuestionIndex}`}
                                            onClick={handleAnswer}
                                        >
                                            {answer}
                                        </button>
                                    ))}
                                </div>}
                                {currentQuestionIndex > 4 && <div className="btns">
                                    {questions[currentQuestionIndex].answers.map((answer, answerIndex) => (
                                        <button
                                            key={answerIndex}
                                            id="redBtn"
                                            onClick={() => setActive(true)}
                                        >
                                            Weiter
                                        </button>
                                    ))}
                                </div>}
                            </div>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
            <Form setForm={setActive} form={active}/>
        </div>
    );
}

export default App;

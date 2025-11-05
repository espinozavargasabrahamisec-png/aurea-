// Animaciones al hacer scroll
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in");
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });
    
    elements.forEach(el => observer.observe(el));
    
    // Test interactivo
    setupQuiz();
});

// Test interactivo
function setupQuiz() {
    const questions = [
        {
            question: "¿Cuál es el nivel seguro de exposición al ruido durante 8 horas?",
            answers: [
                { text: "Menos de 85 dB", correct: true },
                { text: "Menos de 100 dB", correct: false },
                { text: "Menos de 70 dB", correct: false },
                { text: "Menos de 120 dB", correct: false }
            ]
        },
        {
            question: "¿Qué puede causar la exposición prolongada al ruido?",
            answers: [
                { text: "Pérdida auditiva y tinnitus", correct: true },
                { text: "Mejora de la audición", correct: false },
                { text: "Aumento de la capacidad auditiva", correct: false },
                { text: "Ninguno de los anteriores", correct: false }
            ]
        },
        {
            question: "¿Cuál es una medida efectiva para proteger la audición?",
            answers: [
                { text: "Usar tapones para los oídos en entornos ruidosos", correct: true },
                { text: "Aumentar el volumen de los auriculares", correct: false },
                { text: "Exponerse a ruidos fuertes frecuentemente", correct: false },
                { text: "Limpiar los oídos con objetos puntiagudos", correct: false }
            ]
        },
        {
            question: "¿Qué parte del oído transforma las vibraciones en señales eléctricas?",
            answers: [
                { text: "El oído interno", correct: true },
                { text: "El oído externo", correct: false },
                { text: "El tímpano", correct: false },
                { text: "El canal auditivo", correct: false }
            ]
        }
    ];
    
    let currentQuestionIndex = 0;
    const questionText = document.getElementById("question-text");
    const answersContainer = document.getElementById("answers-container");
    const resultDiv = document.getElementById("result");
    const nextButton = document.getElementById("next-btn");
    
    function showQuestion(question) {
        questionText.textContent = question.question;
        answersContainer.innerHTML = "";
        
        question.answers.forEach(answer => {
            const button = document.createElement("button");
            button.classList.add("answer-btn");
            button.textContent = answer.text;
            button.addEventListener("click", () => selectAnswer(answer.correct, button));
            answersContainer.appendChild(button);
        });
        
        resultDiv.textContent = "";
        resultDiv.className = "";
        nextButton.style.display = "none";
    }
    
    function selectAnswer(isCorrect, button) {
        const answerButtons = document.querySelectorAll(".answer-btn");
        answerButtons.forEach(btn => {
            btn.disabled = true;
            if (btn === button) {
                btn.classList.add(isCorrect ? "correct" : "incorrect");
            }
        });
        
        if (isCorrect) {
            resultDiv.textContent = "¡Correcto!";
            resultDiv.classList.add("correct");
        } else {
            resultDiv.textContent = "Incorrecto. Intenta de nuevo.";
            resultDiv.classList.add("incorrect");
        }
        
        nextButton.style.display = "block";
    }
    
    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            // Fin del test
            questionText.textContent = "¡Has completado el test!";
            answersContainer.innerHTML = "";
            resultDiv.textContent = `Has respondido ${questions.length} preguntas sobre salud auditiva.`;
            resultDiv.className = "correct";
            nextButton.style.display = "none";
            
            // Crear botón para reiniciar
            const restartButton = document.createElement("button");
            restartButton.textContent = "Volver a empezar";
            restartButton.classList.add("button-main");
            restartButton.addEventListener("click", () => {
                currentQuestionIndex = 0;
                showQuestion(questions[0]);
            });
            answersContainer.appendChild(restartButton);
        }
    });
    
    // Mostrar primera pregunta
    showQuestion(questions[0]);
    
    // Botón "Comenzar" del header
    document.querySelector(".button-main").addEventListener("click", () => {
        document.querySelector(".quiz-section").scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
}
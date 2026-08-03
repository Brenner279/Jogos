// Variáveis principais
let score = 0;
let correctAnswer = 0;

// Selecionando elementos da tela
const num1Element = document.getElementById('num1');
const num2Element = document.getElementById('num2');
const operatorElement = document.getElementById('operator');
const answerInput = document.getElementById('answer');
const submitBtn = document.getElementById('submit-btn');
const scoreElement = document.getElementById('score');
const messageElement = document.getElementById('message');

// Função para gerar uma nova conta matemática
function generateProblem() {
    const operators = ['+', '-', '×'];
    const randomOperator = operators[Math.floor(Math.random() * operators.length)];
    let num1, num2;

    // Lógica para cada tipo de operação
    if (randomOperator === '×') {
        num1 = Math.floor(Math.random() * 10) + 1; // 1 a 10
        num2 = Math.floor(Math.random() * 10) + 1; // 1 a 10
        correctAnswer = num1 * num2;
    } else if (randomOperator === '-') {
        num1 = Math.floor(Math.random() * 20) + 1; // 1 a 20
        num2 = Math.floor(Math.random() * 20) + 1; // 1 a 20
        // Evitar números negativos invertendo se num1 for menor que num2
        if (num1 < num2) {
            let temp = num1;
            num1 = num2;
            num2 = temp;
        }
        correctAnswer = num1 - num2;
    } else {
        num1 = Math.floor(Math.random() * 20) + 1; // 1 a 20
        num2 = Math.floor(Math.random() * 20) + 1; // 1 a 20
        correctAnswer = num1 + num2;
    }

    // Atualiza a tela com os novos números
    num1Element.textContent = num1;
    num2Element.textContent = num2;
    operatorElement.textContent = randomOperator;
    
    // Limpa o input
    answerInput.value = '';
    answerInput.focus();
}

// Função para checar a resposta do usuário
function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);

    if (isNaN(userAnswer)) {
        showMessage('Por favor, digite um número!', 'wrong');
        return;
    }

    if (userAnswer === correctAnswer) {
        score += 10;
        scoreElement.textContent = score;
        showMessage('Acertou! 🎉', 'correct');
    } else {
        score = Math.max(0, score - 5); // Perde 5 pontos, mas não fica negativo
        scoreElement.textContent = score;
        showMessage(`Errou! A resposta era ${correctAnswer} 😢`, 'wrong');
    }

    // Gera o próximo problema após um pequeno atraso
    setTimeout(() => {
        messageElement.classList.add('hidden');
        generateProblem();
    }, 1500);
}

// Função para mostrar mensagens de erro/acerto
function showMessage(text, type) {
    messageElement.textContent = text;
    messageElement.className = `message ${type}`;
}

// Event Listeners (Ouvintes de eventos)
submitBtn.addEventListener('click', checkAnswer);

// Permite apertar "Enter" para responder
answerInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Inicia o primeiro jogo quando a página carrega
generateProblem();
let questions = [
    {
        'question': 'Як називається основний закон України?',
        'answers': ['Конституція+', 'Біль про права', 'ПДД', 'Акт'],
        'correct': 0
    },
    {
        'question': 'Як називають знавця багатьох мов?',
        'answers': ['Поліграф', 'Полімер', 'Поліестр', 'Поліглот+'],
        'correct': 3
    },
    {
        'question': 'Яким визначенням незмінно доповнюють старовинну назву Британських островів - "альбіон"?',
        'answers': ['Похмурий', 'Дощовий', 'Туманний+', 'Вітряний'],
        'correct': 2
    },
    {
        'question': 'Чим Давид уразив Голіафа?',
        'answers': ['Хорошими манерами', 'Красою', 'Співом', 'Каменем+'],
        'correct': 3
    },
    {
        'question': 'Як раніше називався Стамбул?',
        'answers': ['Софія', 'Константинополь+', 'Эль-Джазаир', 'Рангун'],
        'correct': 1
    },
    {
        'question': 'Ізмір це — ...',
        'answers': ['Місто в Туреччині+', 'Сорт лікеру', 'Фрукт', 'Єгипетський вигук'],
        'correct': 0
    },
    {
        'question': 'Якою абревіатурою позначають квадратурно-амплітудну модуляція?',
        'answers': ['QUAM', 'AM', 'QM', 'QAM+'],
        'correct': 3
    },
    {
        'question': 'До серії книг "Відьмак" Анджея Сапковського не належить...',
        'answers': ['Дикий гін+', 'Час погорди', 'Вежа Ластівки', 'Сезон гроз'],
        'correct': 0
    },
    {
        'question': 'До класу головоногих молюсків належать...',
        'answers': ['Ценогастроподи', 'Дрейсени', 'Венериди', 'Наутилуси+'],
        'correct': 3
    },
    {
        'question': 'Яку українську партію було створено в 1900 році?',
        'answers': ['Українську народну партію', 'Революційну українську партію+', 'Українську національно-демократичну партію', 'Русько-українську радикальну партію'],
        'correct': 1
    },
    {
        'question': 'Як називать групу елементарних частинок з цілим значенням спіну?',
        'answers': ['ферміони', 'нейтрино', 'протони', 'бозони+'],
        'correct': 3
    },
    {
        'question': 'Найвищою вершиною Анд є...',
        'answers': ['Тупунґато', 'Мерседаріо', 'Майпо', 'Аконкагуа+'],
        'correct': 3
    },
    {
        'question': 'Четвертим за величиною супутником Урана, названим на честь ведучої сильфіди з поеми Александра Поупа «Викрадення локона», є...',
        'answers': ['Міранда', 'Аріель+', 'Титанія', 'Умбріель'],
        'correct': 1
    },
    {
        'question': 'Короля Франції, що правив в 1643-1715 роках звали...',
        'answers': ['Людовик XIII', 'Карл VIII', 'Людовик XIV+', 'Генріх IV'],
        'correct': 2
    },
    {
        'question': 'Коли було засновано Союз оборони Естонії?',
        'answers': ['1992 року', '1917 року+', '1991 року', '1918 року'],
        'correct': 1
    }
];

let current = getCurrentQuestion();

let hint50on50Used = getCurrentHintStatus('hint50on50');
let hintCallUsed = getCurrentHintStatus('hintCall');
let hintAudienceUsed = getCurrentHintStatus('hintAudience');

let winnings = 0;

let answerAudio = new Audio('/audio/answer.ogg');
let loseAudio = new Audio('/audio/lose.ogg');
let correctAudio = new Audio('/audio/win.ogg');

let soundOn = soundIsOn();

let images = [
    '/images/add-frame-hover.svg',
    '/images/add-frame-select.svg',
    '/images/add-frame-correct.svg',
    '/images/add-frame-wrong.svg'
];

let answersIndexes;

document.addEventListener('DOMContentLoaded', () => {
    showQuestion(current);
    document.querySelector('#hint50on50').addEventListener('click', hint50on50);
    document.querySelector('#hintCall').addEventListener('click', hintCall);
    document.querySelector('#hintAudience').addEventListener('click', hintAudience);
    document.querySelectorAll('.answers button').forEach((item) => {
        item.addEventListener('click', (e) => answer(e.currentTarget));
    });
    document.querySelector('.exit').addEventListener('click', exit);
    images.forEach(item => {
        let image = new Image();
        image.src = item;
    });
});

document.querySelector('.sound-control button').addEventListener('click', () => {
    let soundIcon = document.querySelector('.sound-control button img');
    if (soundOn) {
        soundOn = false;
        localStorage.setItem('sound', 'false');
        soundIcon.src = '/images/sound-off.svg';
        stopSound();
    } else {
        soundOn = true;
        localStorage.setItem('sound', 'true');
        soundIcon.src = '/images/sound.svg';
    }
});

function soundIsOn() {
    let soundIcon = document.querySelector('.sound-control button img');
    if (!localStorage.sound || localStorage.sound == 'false') {
        localStorage.setItem('sound', 'false');
        soundIcon.src = '/images/sound-off.svg';
        return false;
    } else if (localStorage.sound == 'true') {
        soundIcon.src = '/images/sound.svg';
        return true;
    }
}

function getCurrentQuestion() {
    if (localStorage.current) {
        return parseInt(localStorage.current);
    } else {
        localStorage.setItem('current', '0');
        return 0;
    }
}

function getCurrentHintStatus(prop) {
    if (localStorage[prop] == 'true') {
        document.querySelector(`#${prop}`).disabled = true;
        return true;
    } else {
        localStorage.setItem(prop, false);
        document.querySelector(`#${prop}`).disabled = false;
        return false;
    }
}

function hint50on50() {
    if (hint50on50Used) {
        document.querySelector('#hint50on50').disabled = true;
        localStorage.hint50on50 = 'true';
        return;
    } else {
        document.querySelector('#hint50on50').disabled = true;
        hint50on50Used = true;
        localStorage.hint50on50 = 'true';

        answersIndexes = [questions[current].correct];

        for (let i = 0; i < 1;) {
            let item = Math.floor(Math.random() * 4);
            if (!answersIndexes.includes(item)) {
                answersIndexes.push(item);
                i++;
            }
        }

        document.querySelectorAll('.answers button').forEach((item, index) => {
            if (index != answersIndexes[0] && index != answersIndexes[1]) {
                item.disabled = true;
            }
        });
    }
}

function hintCall() {
    if (hintCallUsed) {
        document.querySelector('#hintCall').disabled = true;
        localStorage.hintCall = 'true';
        return;
    } else {
        document.querySelector('#hintCall').disabled = true;
        hintCallUsed = true;
        localStorage.hintCall = 'true';

        let hintAnswer = Math.floor(Math.random() * 4);
        let hintAnswerLetters = ['A', 'B', 'C', 'D'];

        if (Math.random() > 0.8) {
            if (answersIndexes) {
                showPopupHint('Я думаю що правильна відповідь ', hintAnswerLetters[answersIndexes[1]]);
                document.querySelectorAll('.answers button')[answersIndexes[1]].classList.add('friend-answer');
            } else {
                showPopupHint('Я думаю що правильна відповідь ', hintAnswerLetters[hintAnswer]);
                document.querySelectorAll('.answers button')[hintAnswer].classList.add('friend-answer');
            }
        } else {
            showPopupHint('Я думаю що правильна відповідь ', hintAnswerLetters[questions[current].correct]);
            document.querySelectorAll('.answers button')[questions[current].correct].classList.add('friend-answer');
        }
    }
}

function hintAudience() {
    if (hintAudienceUsed) {
        document.querySelector('#hintAudience').disabled = true;
        localStorage.hintAudience = 'true';
        return;
    } else {
        document.querySelector('#hintAudience').disabled = true;
        hintAudienceUsed = true;
        localStorage.hintAudience = 'true';

        let hintAnswer = Math.floor(Math.random() * 4);
        let hintAnswerLetters = ['A', 'B', 'C', 'D'];

        if (answersIndexes) {
            if (hintAnswer > 2) {
                alert(answersIndexes[0]);
                showPopupHint('Аудиторія проголосувала за відповідь ', hintAnswerLetters[answersIndexes[0]]);
                document.querySelectorAll('.answers button')[answersIndexes[0]].classList.add('audience-answer');
            } else {
                showPopupHint('Аудиторія проголосувала за відповідь ', hintAnswerLetters[answersIndexes[1]]);
                document.querySelectorAll('.answers button')[answersIndexes[1]].classList.add('audience-answer');
            }
        } else {
            showPopupHint('Аудиторія проголосувала за відповідь ', hintAnswerLetters[hintAnswer]);
            document.querySelectorAll('.answers button')[hintAnswer].classList.add('audience-answer');
        }
    }
}

function allButtonsDisabled() {
    document.querySelectorAll('.game button').forEach((item) => {
        item.disabled = true;
    });
    document.querySelector('.exit').disabled = true;
}

function allButtonsEnabled() {
    document.querySelectorAll('.game button').forEach((item) => {
        item.disabled = false;
    });

    document.querySelector('.exit').disabled = false;

    hint50on50Used = getCurrentHintStatus('hint50on50');
    hintCallUsed = getCurrentHintStatus('hintCall');
    hintAudienceUsed = getCurrentHintStatus('hintAudience');
}

function answer(target) {
    if (soundOn) {
        answerAudio.play();
    }

    let duration = (soundOn) ? 3500 : 1000;

    target.style.backgroundImage = 'url(/images/add-frame-select.svg)';
    allButtonsDisabled();
    setTimeout(() => {
        allButtonsEnabled();
        if (target.id == questions[current].correct) {
            target.style.backgroundImage = 'url(/images/add-frame-correct.svg)'
            if (current < 14) {
                showPopupCorrectAnswer();
            } else {
                showWinPopup();
            }
            nextAnswer(target);
        } else {
            target.style.backgroundImage = 'url(/images/add-frame-wrong.svg)'
            wrongAnswer();
        }
    }, duration);

    document.querySelectorAll('.answers button').forEach(item => item.classList.remove('friend-answer'));
    document.querySelectorAll('.answers button').forEach(item => item.classList.remove('audience-answer'));
}

function wrongAnswer() {
    if (soundOn) {
        loseAudio.play();
    }

    localStorage.setItem('current', 0);
    showPopupWrongAnswer();

    localStorage.hint50on50 = false;
    localStorage.hintCall = false;
    localStorage.hintAudience = false;

    hint50on50Used = getCurrentHintStatus('hint50on50');
    hintCallUsed = getCurrentHintStatus('hintCall');
    hintAudienceUsed = getCurrentHintStatus('hintAudience');

    current = 0;
}

function nextAnswer() {
    if (soundOn) {
        correctAudio.play();
    }

    if (current < 14) {
        current++;
        localStorage.setItem('current', current);
    } else {
        localStorage.setItem('current', '0');
    }
}

function showQuestion(id) {
    document.querySelector('.question > p').innerHTML = questions[id].question;

    document.querySelectorAll('.answers button').forEach((item, index) => {
        let hintAnswerLetters = ['A', 'B', 'C', 'D'];
        item.innerHTML = '';
        let span = document.createElement('span');
        span.innerHTML = hintAnswerLetters[index] + '. ' + questions[current].answers[index];
        item.append(span);
        item.id = index;
    })

    document.querySelectorAll('.levels li[data-id]').forEach((item) => {
        item.classList.remove('active-level');
    });

    document.querySelectorAll('.answers button').forEach((item) => {
        item.disabled = false;
    });

    document.querySelector(`.levels li[data-id="${id + 1}"`).classList.add('active-level');

    showWinnings(id);

    if (current > 0) {
        document.querySelector('.exit').disabled = false;
    } else {
        document.querySelector('.exit').disabled = true;
    }
}

function showWinnings(id) {
    if (id >= 5 && id < 10) {
        winnings = 1000;
    } else if (id >= 10) {
        winnings = 32000;
    }
    document.querySelector('.winnings span').innerHTML = winnings + ' гривень';
}

function showPopupWrongAnswer() {
    let startAgainButton = document.createElement('button');
    startAgainButton.innerText = 'Почати заново';
    startAgainButton.addEventListener('click', deletePopup);

    let toMenuButton = document.createElement('button');
    toMenuButton.innerText = 'Перейти в меню';
    toMenuButton.addEventListener('click', () => {
        window.location.pathname = 'millionaire-start.html';
    });

    let buttonContainers = document.createElement('div');
    buttonContainers.append(startAgainButton);
    buttonContainers.append(toMenuButton);

    let message = document.createElement('p');
    message.innerText = 'Ви програли...';

    let messageWinnings = document.createElement('p');
    if (winnings > 0) {
        messageWinnings.innerText = `...але отримаєте ${winnings} гривень!`;
    } else {
        messageWinnings.innerText = '...і на жаль, нічого не отримаєте';
    }

    let popup = document.createElement('div');
    popup.classList.add('popup');
    popup.append(message);
    popup.append(messageWinnings);
    popup.append(buttonContainers);

    let container = document.createElement('div');
    container.classList.add('container');
    container.append(popup);

    document.body.append(container);
}

function showPopupCorrectAnswer() {
    let continueButton = document.createElement('button');
    continueButton.innerText = 'Продовжити';
    continueButton.addEventListener('click', deletePopup);

    let message = document.createElement('p');
    message.innerText = 'Відповідь правильна!';

    let popup = document.createElement('div');
    popup.classList.add('popup');
    popup.append(message);
    popup.append(continueButton);

    let container = document.createElement('div');
    container.classList.add('container');
    container.append(popup);

    document.body.append(container);
}

function showWinPopup(text = 'Ви виграли 1 мільйон гривень!') {
    document.querySelector('.winnings span').innerHTML = '1000000' + ' гривень';
    let startAgainButton = document.createElement('button');
    startAgainButton.innerText = 'Почати заново';
    startAgainButton.addEventListener('click', () => {

        localStorage.hint50on50 = false;
        localStorage.hintCall = false;
        localStorage.hintAudience = false;

        hint50on50Used = getCurrentHintStatus('hint50on50');
        hintCallUsed = getCurrentHintStatus('hintCall');
        hintAudienceUsed = getCurrentHintStatus('hintAudience');

        current = 0;
        localStorage.setItem('current', 0);

        deletePopup();
    });

    let toMenuButton = document.createElement('button');
    toMenuButton.innerText = 'Перейти в меню';
    toMenuButton.addEventListener('click', () => {
        window.location.pathname = 'millionaire-start.html';
    });

    let buttonContainers = document.createElement('div');
    buttonContainers.append(startAgainButton);
    buttonContainers.append(toMenuButton);

    let message = document.createElement('p');
    message.innerText = text;
    message.style.color = '#ffa500';
    message.style.fontSize = '36px';
    message.style.fontWeight = 'bold';

    let popup = document.createElement('div');
    popup.classList.add('popup');
    popup.append(message);
    popup.append(buttonContainers);

    let container = document.createElement('div');
    container.classList.add('container');
    container.append(popup);

    document.body.append(container);
}

function showPopupHint(text, answer) {
    let continueButton = document.createElement('button');
    continueButton.innerText = 'Продовжити';
    continueButton.addEventListener('click', () => {
        document.querySelector('.container').remove();
    });

    let message = document.createElement('p');
    message.innerText = text + answer;

    let popup = document.createElement('div');
    popup.classList.add('popup');
    popup.append(message);
    popup.append(continueButton);

    let container = document.createElement('div');
    container.classList.add('container');
    container.append(popup);

    document.body.append(container);
}

function deletePopup() {
    document.querySelectorAll('.answers button').forEach((item, index) => {
        item.style.backgroundImage = '';
    });
    document.querySelector('.container').remove();
    showQuestion(current);
    stopSound();

    answersIndexes = undefined;
}

function stopSound() {
    answerAudio.pause();
    answerAudio.currentTime = 0;

    loseAudio.pause();
    loseAudio.currentTime = 0;

    correctAudio.pause();
    correctAudio.currentTime = 0;
}

function exit() {
    let amount = document.querySelector(`.levels li[data-id="${current}"] span`).textContent;

    let noButton = document.createElement('button');
    noButton.innerText = 'Ні';
    noButton.addEventListener('click', () => {
        document.querySelectorAll('.answers button').forEach((item, index) => {
            item.style.backgroundImage = '';
        });
        document.querySelector('.container').remove();
    });

    let yesButton = document.createElement('button');
    yesButton.innerText = 'Так';
    yesButton.addEventListener('click', () => {
        document.querySelectorAll('.answers button').forEach((item, index) => {
            item.style.backgroundImage = '';
        });
        document.querySelector('.container').remove();
        showWinPopup(text = 'Ви виграли ' + amount + ' гривень!');
    });

    let buttonContainers = document.createElement('div');
    buttonContainers.append(noButton);
    buttonContainers.append(yesButton);

    let message = document.createElement('p');
    message.innerText = 'Ви дійсно хочете забрати ' + amount + ' гривень та залишти гру?';

    let popup = document.createElement('div');
    popup.classList.add('popup');
    popup.append(message);
    popup.append(buttonContainers);

    let container = document.createElement('div');
    container.classList.add('container');
    container.append(popup);

    document.body.append(container);
}
(() => {

    // название игры
    const GAME_TITLE = 'Memory Game';

    // создаем пустой массив с парными числами
    const array = [];

    // форма (input) для ввода данных
    let form;

    // переменная - количество открытых карт на поле
    let openCard = 0;

    // счетчик открытых карт
    let count = 0;

    // пустой массив для сравнение карт
    let comparison = [];

    // переменная для определения рядов\стобцов
    let rowAndCol = 4;

    // перменная с половиной массива
    let halfArr;

    // переменные счетчики 1 и 2
    let gameCount1 = 0;
    let gameCount2 = 0;

    // переменные - кнопки счетчиков
    let buttonСounter1;
    let buttonСounter2;

    // переменные для работы таймера
    let intervalID;
    let secondsNumber;

    // переменная с дивом (модальное окно)
    let modalContainer;

    // переменная с основным дивом
    let gameContainer;

    // переменная для создания контейнера кнопки и счетчиков
    let btnContainer;

    // переменная для кнопки "сыграть еще"
    let buttonAgain;

    // переменная для кнопки таймера
    let timerButton;
    
    // массив с классами разных размеров карт li
    let styleArray = ['cardStyle_2x2', 'cardStyle_4x4', 'cardStyle_6x6', 'cardStyle_8x8', 'cardStyle_10x10'];

    // индексы массива с размерами
    let indexOfStyle;

    // функция, создающая модальное окно
    init();

    function init() {
        // создаем модальное окно
        modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');
        document.body.append(modalContainer);

        // заголовок модального окна
        let gameTitle = document.createElement('h1');
        gameTitle.textContent = GAME_TITLE;
        gameTitle.classList.add('caption');
        modalContainer.append(gameTitle);

        let h2 = document.createElement('h2');
        h2.classList.add('title');
        h2.textContent = 'Введите кол-во карточек по вертикали/горизонтали (чётное число от 2 до 10)';
        modalContainer.append(h2);

        // форма для ввода
        form = document.createElement('input');
        form.type = 'number';
        form.classList.add('form');
        modalContainer.append(form);

        // создаем кнопку "Начать игру"
        let buttonStart = document.createElement('button');
        buttonStart.classList.add('btn-start', 'btn');
        buttonStart.textContent = 'Начать игру';
        modalContainer.append(buttonStart);

        // функция запускается по клику
        buttonStart.addEventListener('click', start);
    }

    function start() {
        modalContainer.classList.add('modal-container--unvisible');
        startGame();
    }

    function startGame() {

        // уловие для определения рядов\колонок в игре
        if (form.value < 11 && form.value % 2 === 0 && form.value > 0) {
            rowAndCol = form.value;
        } 

        // вызываем функцию расчета размера карточек
        createListWidth();

        halfArr = rowAndCol * rowAndCol / 2;

        createArr();
            
        // создаем кнопку Назад (в модальное окно)
        let buttonBack = document.createElement('a');
        buttonBack.classList.add('btn-back');
        buttonBack.textContent = 'Назад';
        document.body.append(buttonBack);

        buttonBack.addEventListener('click', updateGame);

        // создаем окно игры (по умолчанию 4х4)
        gameContainer = document.createElement('div');
        gameContainer.classList.add('container');
        document.body.append(gameContainer);

        // создаем заголовок игры и задаем ему стили
        gameTitle = document.createElement('h1');
        gameTitle.textContent = GAME_TITLE;
        gameTitle.classList.add('caption');
        gameContainer.append(gameTitle);
        
        // создаем поле для карточек ul
        let list = document.createElement('ul');
        list.classList.add('listContainer');

        // добавляем поле для карточек ul в контейнер div
        gameContainer.append(list);

        let Arr = halfArr * 2;
        
        // создаем карточки
        for (let i = 0 ; i < Arr ; i++) {
            let card = document.createElement('li');
            card.classList.add('cardStyle');
            card.classList.add(styleArray[indexOfStyle]);
            card.id = i;

            // создаем рубашку для карт
            let shirt = document.createElement('div');
            shirt.classList.add('shirt');
            
            // вставляем рубашку в карточку
            card.appendChild(shirt);

            // вставляем карточку в поле
            list.append(card);
        
            // добавляем переворот карты по клику
            card.addEventListener('click', openCardListener);
        }

        shuffleRand(array);
        const randomArray = array;

        // добавляем перемешанный массив randomArray в элементы li
        let Elements = document.querySelectorAll('li');
        for (let i in randomArray) {
            Elements[i].append(randomArray[i]);
        }
            
        // вызываем функцию зоздания контейнера для кнопки и счетчиков
        createBtnContainer();

        // вызываем функцию счетчик 1
        counter1();

        // создаем кнопку "сыграть еще"
        buttonAgain = document.createElement('button');
        buttonAgain.classList.add('btn-again', 'btn');
        btnContainer.append(buttonAgain);
        buttonAgain.textContent = 'Сыграть ещё раз';

        buttonAgain.addEventListener('click', updateGame);

        // вызываем функцию счетчик 2
        counter2();

        // создаем контейнер для таймера
        let timerContainer = document.createElement('div');
        timerContainer.classList.add('timer-container');
        gameContainer.append(timerContainer);

        // создаем кнопку с таймером
        timerButton = document.createElement('button');
        timerButton.classList.add('btn-timer');
        timerContainer.append(timerButton);
        timerButton.textContent = 60;

        // вызов функции таймер по клику
        timerButton.addEventListener('click', timer);
    }

    // функция для создания массива Х2
    function createArr() {
        for (let i = 0 ; i < 2 ; i++) {
            for (let j = 0; j < halfArr; j++) {
                array.push(j + 1);
            } 
        }
    }

    // функция для перезагрузки страницы
    function updateGame() {
        document.location.reload();
    }

    // функция переворота карты
    function openCardListener() {
        if (openCard !== 2 && !this.classList.contains('rotate')) {
            
            this.classList.add('rotate');
            openCard++;
            comparison.push(this);
            
            if (openCard === 2) {
                
                if (comparison[0].textContent !== comparison[1].textContent) {
                    unflipCards(comparison);
                } else {
                    disableCards(comparison);
                    count = count + 2;
                    if (count == array.length) {
                        buttonAgain.classList.add('btn-again--visible');
                        let html = document.querySelector('html');
                        html.style.backgroundImage = "url('./salut.jpg')";
                        html.style.backgroundSize = 'cover';
                    }
                }
                comparison = [];
            }
        }
    }

    // функция удаления слушателя с двух карт
    function disableCards(comparison) {
        comparison[0].removeEventListener('click', openCardListener);
        comparison[1].removeEventListener('click', openCardListener);
        openCard = 0;
    }

    // функция удаления слушателя класса переворота с двух карт с задержкой
    function unflipCards(comparison) {
        setTimeout(() => {
            comparison[0].classList.remove('rotate');
            comparison[1].classList.remove('rotate');
            openCard = 0;
        }, 1500);
    }

    // создаем функцию создания контейнера для кнопки и счетчиков
    function createBtnContainer() {
        btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container');
        gameContainer.append(btnContainer);
    }

    // создаем функцию счетчик 1 (если игроков двое)
    function counter1() {
        buttonСounter1 = document.createElement('button');
        buttonСounter1.classList.add('btn-counter', 'btn-again','btn');
        btnContainer.append(buttonСounter1);
        increment1();
        buttonСounter1.addEventListener('click', increment1);
    }

    //  функция счетчик 1
    function increment1() {
        buttonСounter1.textContent = gameCount1++;
    }

    // создаем функцию счетчик 2 (если игроков двое)
    function counter2() {
        buttonСounter2 = document.createElement('button');
        buttonСounter2.classList.add('btn-counter', 'btn-again', 'btn');
        btnContainer.append(buttonСounter2);
        increment2();
        buttonСounter2.addEventListener('click', increment2);
    }

    //  функция счетчик 2
    function increment2() {
        buttonСounter2.textContent = gameCount2++;
    }

    // функция таймер
    function timer () {
        clearInterval(intervalID);
        secondsNumber = timerButton.textContent;
        intervalID = setInterval(countDown, 1000);
    }

    // функция обратного отсчета 
    function countDown () {
        secondsNumber--;
        if (secondsNumber == 0) {
        //  перезагрузить страницу
            updateGame();
        }
        timerButton.textContent = secondsNumber;
    }

    // перемешиваем числа в массиве и кладем его в новый массив
    function shuffleRand(array) {
        for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // функция расчета размера карточек
    function createListWidth() {
        indexOfStyle = form.value / 2 - 1;
    }

})();
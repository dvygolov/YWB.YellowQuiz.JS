function initQuiz(params) {
    document.addEventListener('DOMContentLoaded', () => {
        var mainQuizElement = document.getElementById(params.divId);
        var quizElements = [];

        for (let i = 0; i < params.questions.length; i++) {
            var qScreen = document.createElement('div');
            qScreen.className = 'quizcontainer';
            if (params.quizColor !== undefined) qScreen.style = 'background-color:' + params.quizColor;

            var title = document.createElement('div');
            title.className = 'question';
            var qText = document.createTextNode(params.questions[i].title);
            title.appendChild(qText);
            qScreen.appendChild(title);

            if (params.questions[i].subtitle !== undefined) {
                var subtitle = document.createElement('div');
                subtitle.className = 'subtitle';
                var sText = document.createTextNode(params.questions[i].subtitle);
                subtitle.appendChild(sText);
                qScreen.appendChild(subtitle);
            }

            if (params.questions[i].image !== undefined) {
                var image = document.createElement('img');
                image.src = params.questions[i].image;
                qScreen.appendChild(image);
            }

            if (params.questions[i].answers !== undefined) {
                var aContainer = document.createElement('ul');
                aContainer.className = 'answers';
                var direction = params.questions[i].alignAnswers;
                direction = (direction === 'horizontal' ? 'row' : 'column');
                aContainer.style = 'flex-direction:' + direction;

                for (let j = 0; j < params.questions[i].answers.length; j++) {
                    var answer = params.questions[i].answers[j];

                    var li = document.createElement('li');
                    if (params.answersColor !== undefined) li.style = 'background-color:' + params.answersColor;
                    var aButton = document.createElement('a');
                    aButton.onclick = () => moveToNextScreen(mainQuizElement, quizElements, i+1);

                    if (answer.image !== undefined) {
                        var aImage = document.createElement('img');
                        aImage.src = answer.image;
                        aButton.appendChild(aImage);
                    }

                    if (answer.text !== undefined) {
                        var aText = document.createTextNode(answer.text);
                        aButton.appendChild(aText);
                    }

                    li.appendChild(aButton);
                    aContainer.appendChild(li);
                }
                qScreen.appendChild(aContainer);
            }
            quizElements.push(qScreen);
        }

        mainQuizElement.appendChild(quizElements[0]);
    }, false);
}

function moveToNextScreen(mainQuizElement, quizElements, screenNumber) {
    mainQuizElement.textContent = '';
    mainQuizElement.appendChild(quizElements[screenNumber]);
}

class Question {
  constructor(id, text, answers, previousAnswer) {
    this.id = id;
    this.text = text;
    this.answers = answers;
    this.previousAnswer = previousAnswer;
  }
}

class Answer {
  constructor(id, text, nextQuestion) {
    this.id = id;
    this.text = text;
    this.nextQuestion = nextQuestion;
  }
}

const questions = {
  1: new Question(
    1,
    "Is it sunny today?",
    [new Answer(1, "Yes", 2), new Answer(2, "No", 3)],
    null
  ),
  2: new Question(
    2,
    "Are you going for a picnic?",
    [new Answer(1, "Yes", 4), new Answer(2, "No", 5)],
    1
  ),
  3: new Question(
    3,
    "Are you staying indoors?",
    [new Answer(1, "Yes", 6), new Answer(2, "No", 7)],
    1
  ),
  4: new Question(4, "You chose go for a picnic", null, 2),
  5: new Question(5, "You should ask your friend to go shopping", null, 2),
  6: new Question(
    6,
    "Do you live alone or with family?",
    [new Answer(1, "Live alone", 8), new Answer(2, "With family", 9)],
    3
  ),
  7: new Question(7, "You can call your friend", null, 3),
  8: new Question(8, "You should watch TV", null, 6),
  9: new Question(9, "You should cooking with family", null, 6),
};

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const backButton = document.getElementById("back");
const addElement = document.getElementById("add");
const editElement = document.getElementById("edit");
const deleteElement = document.getElementById("delete");
const addForm = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");
const saveElement = document.getElementById("save");
const addButton = document.getElementById("add-button");
const cancelAddButton = document.getElementById("cancel-add");
const cancelEditButton = document.getElementById("cancel-edit");
const answerIdInput = document.getElementById("answer-id");
const answerTextInput = document.getElementById("answer-text");
const nextQuestionIdInput = document.getElementById("next-question-id");
const questionText = document.getElementById("question-text");

let currentQuestionId = questions[1].id;
let recentlyAddedAnswerId = 0;

function renderQuestion(questionId) {
  let currentQuestion = questions[questionId];

  if (!currentQuestion) {
    console.log(recentlyAddedAnswerId);
    currentQuestion = new Question(
      questionId,
      "Question " + questionId,
      [],
      recentlyAddedAnswerId
    );
    questions[currentQuestionId] = currentQuestion;
  }

  questionElement.innerText = currentQuestion.text;
  answersElement.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.addEventListener("click", () => {
      currentQuestionId = answer.nextQuestion;
      renderQuestion(answer.nextQuestion);
    });
    answersElement.appendChild(button);
  });

  if (currentQuestionId !== 1) {
    backButton.style.display = "block";
  } else {
    backButton.style.display = "none";
  }
}

function handleBackButtonClick() {
  if (currentQuestionId !== 1) {
    currentQuestionId = questions[currentQuestionId].previousAnswer;
    renderQuestion(currentQuestionId);
  }
}

function showAddForm() {
  addForm.style.display = "block";
  editForm.style.display = "none";
}

function addQuestion() {
  const newAnswerId = answerIdInput.value;
  const newAnswerText = answerTextInput.value;
  const nextQuestionId = nextQuestionIdInput.value;

  if (newAnswerId === "" || newAnswerText === "" || nextQuestionId === "") {
    alert("Please fill in all fields");
    return;
  }

  if (questions[nextQuestionId]) {
    alert("Question already exists");
    return;
  }

  questions[currentQuestionId].answers.push({
    id: newAnswerId,
    text: newAnswerText,
    nextQuestion: nextQuestionId,
  });

  recentlyAddedAnswerId = currentQuestionId;

  renderQuestion(currentQuestionId);
  addForm.style.display = "none";
  resetForm();
}

function handleAddButtonClick() {
  showAddForm();
}

function showEditForm() {
  addForm.style.display = "none";
  editForm.style.display = "block";

  if (currentQuestionId) {
    questionText.value = questions[currentQuestionId].text;
  }
}

function editQuestion() {
  if (currentQuestionId) {
    questions[currentQuestionId].text = questionText.value;
    renderQuestion(currentQuestionId);
    editForm.style.display = "none";
    alert("Question edited successfully");
  }
}

function handleEditButtonClick() {
  showEditForm();
}

function deleteQuestion() {
  if (confirm("Are you sure you want to delete this question?") === true) {
    if (currentQuestionId === 1) {
      alert("You cannot delete the root question.");
    }

    const previousAnswer = questions[currentQuestionId].previousAnswer;

    for (let answer in questions[currentQuestionId].answers) {
      if (
        questions[previousAnswer].answers[answer].nextQuestion ===
        currentQuestionId
      ) {
        delete questions[previousAnswer].answers[answer];
      }
    }
    delete questions[currentQuestionId];
    renderQuestion(previousAnswer || 1);
  }
}

function handleDeleteButtonClick() {
  deleteQuestion();
}

function resetForm() {
  answerIdInput.value = "";
  answerTextInput.value = "";
  nextQuestionIdInput.value = "";
}

backButton.addEventListener("click", handleBackButtonClick);
addElement.addEventListener("click", handleAddButtonClick);
addButton.addEventListener("click", addQuestion);
cancelAddButton.addEventListener("click", () => {
  addForm.style.display = "none";
});
editElement.addEventListener("click", handleEditButtonClick);
saveElement.addEventListener("click", editQuestion);
cancelEditButton.addEventListener("click", () => {
  editForm.style.display = "none";
});
deleteElement.addEventListener("click", handleDeleteButtonClick);

renderQuestion(1);

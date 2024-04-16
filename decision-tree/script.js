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

const questions = [
  new Question(
    1,
    "Is it sunny today?",
    [new Answer(1, "Yes", 2), new Answer(2, "No", 3)],
    null
  ),
  new Question(
    2,
    "Are you going for a picnic?",
    [new Answer(1, "Yes", 4), new Answer(2, "No", 5)],
    1
  ),
  new Question(
    3,
    "Are you staying indoors?",
    [new Answer(1, "Yes", 6), new Answer(2, "No", 7)],
    1
  ),
  new Question(4, "You chose go for a picnic", [], 2),
  new Question(5, "You should ask your friend to go shopping", [], 2),
  new Question(
    6,
    "Do you live alone or with family?",
    [new Answer(1, "Live alone", 8), new Answer(2, "With family", 9)],
    3
  ),
  new Question(7, "You can call your friend", [], 3),
  new Question(8, "You should watch TV", [], 6),
  new Question(9, "You should cooking with family", [], 6),
];

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

let recentlyAddedAnswerId = 0;
let currentQuestionId = 1;

function renderQuestion(questionId) {
  let currentQuestion = findQuestionById(questionId);

  if (!currentQuestion) {
    currentQuestion = new Question(
      questionId,
      "Question " + questionId,
      [],
      recentlyAddedAnswerId
    );
    questions.push(currentQuestion);
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
    currentQuestionId = findQuestionById(currentQuestionId).previousAnswer;
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

  findQuestionById(currentQuestionId).answers.push(
    new Answer(newAnswerId, newAnswerText, nextQuestionId)
  );

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
    questionText.value = findQuestionById(currentQuestionId).text;
  }
}

function editQuestion() {
  if (currentQuestionId) {
    findQuestionById(currentQuestionId).text = questionText.value;
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

    const currentQuestion = findQuestionById(currentQuestionId);
    const previousAnswerId = currentQuestion.previousAnswer;

    for (let answer in findQuestionById(previousAnswerId).answers) {
      if (
        findQuestionById(previousAnswerId).answers[answer].nextQuestion ===
        currentQuestionId
      ) {
        findQuestionById(previousAnswerId).answers.splice(answer, 1);
      }
    }

    renderQuestion(previousAnswerId || 1);
  }
}

function handleDeleteButtonClick() {
  deleteQuestion();
}

function findQuestionById(id) {
  return questions.find((question) => question.id === id);
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

class Question {
  constructor(text, answers) {
    this.text = text;
    this.answers = answers;
  }
}

const questions = {
  question1: new Question("Choose a number?", [
    { text: "1", nextQuestion: "question2a" },
    { text: "2", nextQuestion: "question2b" },
    { text: "3", nextQuestion: "question2c" },
  ]),
  question2a: new Question("You chose 1. Choose other number?", [
    { text: "1.1", nextQuestion: "question3a" },
    { text: "1.2", nextQuestion: "question3b" },
  ]),
  question2b: new Question("You chose 2. Choose other number", [
    { text: "2.1", nextQuestion: "question3c" },
    { text: "2.2", nextQuestion: "question3d" },
  ]),
  question2c: new Question("You chose 3. Choose other number?", [
    { text: "3.1", nextQuestion: "question3e" },
    { text: "3.2", nextQuestion: "question3f" },
  ]),
  question3a: new Question("You chose 1.1."),
  question3b: new Question("You chose 1.2."),
  question3c: new Question("You chose 2.1."),
  question3d: new Question("You chose 2.2."),
  question3e: new Question("You chose 3.1."),
  question3f: new Question("You chose 3.2."),
};

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answers");
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
const questionIdInput = document.getElementById("question-id");
const questionTextInput = document.getElementById("question-text");
const questionDisplayInput = document.getElementById("question-display");
const questionTextEdit = document.getElementById("question-text-edit");
const questionDisplayEdit = document.getElementById("question-display-edit");

const history = [];
let currentId = "question1";

function renderQuestion(questionId) {
  const question = questions[questionId];
  currentId = questionId;

  if (!question) {
    alert("Not found");
    return;
  }

  questionElement.innerText = question.text;
  answerElement.innerHTML = "";

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.addEventListener("click", () => {
      history.push(questionId);
      renderQuestion(answer.nextQuestion);
    });
    answerElement.appendChild(button);
  });

  if (history.length > 0) {
    backButton.style.display = "block";
  } else {
    backButton.style.display = "none";
  }
}

function handleBackButtonClick() {
  if (history.length > 0) {
    const previousQuestionId = history.pop();
    renderQuestion(previousQuestionId);
  }
}

function showAddForm() {
  addForm.style.display = "block";
  editForm.style.display = "none";
}

function addQuestion() {
  const newQuestionId = questionIdInput.value;
  const newQuestionText = questionTextInput.value;
  const textDisplay = questionDisplayInput.value;

  if (newQuestionId === "" || newQuestionText === "" || textDisplay === "") {
    alert("Please fill in all fields");
    return;
  }

  if (questions[newQuestionId]) {
    alert("Question already exists");
    return;
  }

  questions[newQuestionId] = new Question(newQuestionText, []);

  questions[currentId].answers.push({
    text: textDisplay,
    nextQuestion: newQuestionId,
  });

  renderQuestion(currentId);
  addForm.style.display = "none";
  resetForm();
}

function handleAddButtonClick() {
  showAddForm();
}

function showEditForm(questionId) {
  addForm.style.display = "none";
  editForm.style.display = "block";
  const question = questions[questionId];
  if (question) {
    questionTextEdit.value = question.text;
  }
}

function editQuestion() {
  const question = questions[currentId];
  const previousQuestionId = history[history.length - 1];

  if (question) {
    question.text = questionTextEdit.value;
    questions[previousQuestionId].answers.forEach((answer) => {
      if (answer.nextQuestion === currentId) {
        answer.text = questionDisplayEdit.value;
      }
    });
    renderQuestion(previousQuestionId);
    editForm.style.display = "none";
  }
}

function handleEditButtonClick() {
  showEditForm(currentId);
}

function deleteQuestion() {
  if (confirm("Are you sure you want to delete this question?") === true) {
    if (currentId === "question1") {
      alert("You cannot delete the root question.");
    }

    const previousQuestionId = history[history.length - 1];

    for (let answer in questions[previousQuestionId].answers) {
      if (
        questions[previousQuestionId].answers[answer].nextQuestion === currentId
      ) {
        delete questions[previousQuestionId].answers[answer];
      }
    }
    delete questions[currentId];
    renderQuestion(previousQuestionId || "question1");
  }
}

function handleDeleteButtonClick() {
  deleteQuestion();
}

function resetForm() {
  questionIdInput.value = "";
  questionTextInput.value = "";
  questionDisplayInput.value = "";
}

backButton.addEventListener("click", handleBackButtonClick);
addElement.addEventListener("click", handleAddButtonClick);
editElement.addEventListener("click", handleEditButtonClick);
deleteElement.addEventListener("click", handleDeleteButtonClick);
saveElement.addEventListener("click", editQuestion);
addButton.addEventListener("click", addQuestion);
cancelAddButton.addEventListener("click", () => {
  addForm.style.display = "none";
});
cancelEditButton.addEventListener("click", () => {
  editForm.style.display = "none";
});

renderQuestion("question1");

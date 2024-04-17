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
const addQuestionForm = document.getElementById("add-question-form");
const addQuestionButton = document.getElementById("add-question-button");
const cancelAddQuestion = document.getElementById("cancel-add-question");
const saveElement = document.getElementById("save");
const addButton = document.getElementById("add-button");
const cancelAddButton = document.getElementById("cancel-add");
const cancelEditButton = document.getElementById("cancel-edit");
const answerIdInput = document.getElementById("answer-id");
const answerTextInput = document.getElementById("answer-text");
const nextQuestionIdInput = document.getElementById("next-question-id");
const questionText = document.getElementById("question-text");
const questionIdInput = document.getElementById("question-id");
const questionTextInput = document.getElementById("add-question-text");
const previousAnswerIdInput = document.getElementById("previous-answer-id");
const answerEditText = document.getElementById("answer-edit-text");
const editAnswerForm = document.getElementById("edit-answer-form");
const saveEditAnswer = document.getElementById("save-edit-answer");
const cancelEditAnswer = document.getElementById("cancel-edit-answer");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-button");

let recentlyAddedAnswerId = 0;
let currentQuestionId = 1;
let chosenAnswerId = 0;

function findQuestionById(id) {
  return questions.find((question) => question.id == id);
}

function findAnswerById(id) {
  return findQuestionById(currentQuestionId).answers.find(
    (answer) => answer.id == id
  );
}

function renderQuestion(questionId) {
  hideAllForms();
  let currentQuestion = findQuestionById(questionId);

  if (!currentQuestion) {
    alert("This answer does not have next question");
  }

  questionElement.innerText = currentQuestion.text;
  answersElement.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const answerContainer = document.createElement("div");

    const answerButton = document.createElement("button");
    answerButton.textContent = answer.text;
    answerButton.addEventListener("click", (event) => {
      event.stopPropagation();
      currentQuestionId = answer.nextQuestion;
      renderQuestion(answer.nextQuestion);
    });

    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.classList.add("answer-button");
    addButton.addEventListener("click", (event) => {
      event.stopPropagation();
      chosenAnswerId = answer.id;
      showAddQuestionForm();
    });
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("answer-button");
    editButton.addEventListener("click", (event) => {
      event.stopPropagation();
      chosenAnswerId = answer.id;
      showEditAnswerForm();
    });
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("answer-button");
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      chosenAnswerId = answer.id;
      deleteAnswer();
    });

    answerContainer.appendChild(answerButton);
    answerContainer.appendChild(addButton);
    answerContainer.appendChild(editButton);
    answerContainer.appendChild(deleteButton);
    answersElement.appendChild(answerContainer);
  });

  if (currentQuestionId !== 1) {
    backButton.style.display = "block";
  } else {
    backButton.style.display = "none";
  }
}

function handleBackButtonClick(event) {
  event.stopPropagation();

  if (currentQuestionId !== 1) {
    currentQuestionId = findQuestionById(currentQuestionId).previousAnswer;
    renderQuestion(currentQuestionId);
  }
}

function showAddForm() {
  addForm.style.display = "block";
  editForm.style.display = "none";
  addQuestionForm.style.display = "none";
}

function addAnswer(event) {
  event.stopPropagation();

  const newAnswerId = answerIdInput.value;
  const newAnswerText = answerTextInput.value;

  if (newAnswerId === "" || newAnswerText === "") {
    alert("Please fill in all fields");
    return;
  }

  for (let i = 0; i < findQuestionById(currentQuestionId).answers.length; i++) {
    if (findQuestionById(currentQuestionId).answers[i].id == newAnswerId) {
      alert("Answer already exists");
      return;
    }
  }

  findQuestionById(currentQuestionId).answers.push(
    new Answer(newAnswerId, newAnswerText, null)
  );

  recentlyAddedAnswerId = chosenAnswerId;

  renderQuestion(currentQuestionId);
  addForm.style.display = "none";
  resetForm();
}

function handleAddButtonClick(event) {
  event.stopPropagation();
  showAddForm();
}

function showEditForm() {
  addForm.style.display = "none";
  editForm.style.display = "block";
  addQuestionForm.style.display = "none";

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
    if (findQuestionById(currentQuestionId).previousAnswer === null) {
      alert("You cannot delete the root question.");
    }

    const currentQuestion = findQuestionById(currentQuestionId);
    const previousAnswerId = currentQuestion.previousAnswer;

    findQuestionById(previousAnswerId).answers = findQuestionById(
      previousAnswerId
    ).answers.filter((answer) => answer.nextQuestion !== currentQuestionId);

    renderQuestion(previousAnswerId || 1);
  }
}

function handleDeleteButtonClick(event) {
  event.stopPropagation();

  deleteQuestion();
}

function resetForm() {
  answerIdInput.value = "";
  answerTextInput.value = "";
  nextQuestionIdInput.value = "";
  previousAnswerIdInput.value = "";
  questionIdInput.value = "";
  questionTextInput.value = "";
}

function hideAllForms() {
  addForm.style.display = "none";
  editForm.style.display = "none";
  addQuestionForm.style.display = "none";
  editAnswerForm.style.display = "none";
}

function showAddQuestionForm() {
  addQuestionForm.style.display = "block";
  editForm.style.display = "none";
  addForm.style.display = "none";
}

function addQuestion() {
  const newQuestionId = questionIdInput.value;
  const newQuestionText = questionTextInput.value;
  const previousAnswerId = chosenAnswerId;

  console.log(chosenAnswerId);

  if (newQuestionId === "" || newQuestionText === "") {
    alert("Please fill in all fields");
    return;
  }

  if (findQuestionById(newQuestionId)) {
    alert("Question already exists");
    return;
  }

  if (findAnswerById(chosenAnswerId).nextQuestion) {
    alert("This answer already has a next question");
    return;
  }

  findAnswerById(chosenAnswerId).nextQuestion = newQuestionId;

  questions.push(
    new Question(newQuestionId, newQuestionText, previousAnswerId)
  );

  alert("Question added successfully");
}

function deleteAnswer() {
  if (confirm("Are you sure you want to delete this answer?") === true) {
    findQuestionById(currentQuestionId).answers = findQuestionById(
      currentQuestionId
    ).answers.filter((answer) => answer.id !== chosenAnswerId);

    renderQuestion(currentQuestionId || 1);
  }
}

const showEditAnswerForm = () => {
  addForm.style.display = "none";
  editAnswerForm.style.display = "block";
  addQuestionForm.style.display = "none";

  answerEditText.value = findAnswerById(chosenAnswerId).text;
};

function editAnswer() {
  findAnswerById(chosenAnswerId).text = answerEditText.value;
  renderQuestion(currentQuestionId);
  editForm.style.display = "none";
  alert("Answer edited successfully");
}

function handleSearchButtonClick(event) {
  event.stopPropagation();
  const searchValue = searchInput.value;
  alert(
    "The question is: " + JSON.stringify(findQuestionById(searchValue).text)
  );
}

backButton.addEventListener("click", handleBackButtonClick);
addElement.addEventListener("click", handleAddButtonClick);
addButton.addEventListener("click", addAnswer);
cancelAddButton.addEventListener("click", (event) => {
  event.stopPropagation();
  addForm.style.display = "none";
});
editElement.addEventListener("click", handleEditButtonClick);
saveElement.addEventListener("click", editQuestion);
cancelEditButton.addEventListener("click", (event) => {
  event.stopPropagation();
  editForm.style.display = "none";
});
deleteElement.addEventListener("click", handleDeleteButtonClick);
addQuestionButton.addEventListener("click", (event) => {
  event.stopPropagation();
  addQuestion();
});
cancelAddQuestion.addEventListener("click", (event) => {
  event.stopPropagation();
  addQuestionForm.style.display = "none";
});
cancelEditAnswer.addEventListener("click", (event) => {
  event.stopPropagation();
  editAnswerForm.style.display = "none";
});
saveEditAnswer.addEventListener("click", editAnswer);
searchButton.addEventListener("click", handleSearchButtonClick);

renderQuestion(1);

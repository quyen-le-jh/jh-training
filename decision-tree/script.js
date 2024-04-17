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

function findQuestionById(id) {
  return questions.find((question) => question.id == id);
}

function findAnswerById(currentQuestionId, answerId) {
  return findQuestionById(currentQuestionId).answers.find(
    (answer) => answer.id == answerId
  );
}

function renderQuestion(currentQuestionId) {
  hideAllForms();
  const currentQuestion = findQuestionById(currentQuestionId);

  if (!currentQuestion) {
    alert("This answer does not have next question");
    return;
  }

  const { id, text, answers, previousAnswer } = currentQuestion;

  //Question element
  questionElement.innerText = text;

  questionElement.setAttribute("data-key", id);
  const addElement = document.createElement("button");
  addElement.textContent = "Add";
  addElement.classList.add("answer-button");
  addElement.setAttribute("data-key", id);
  addElement.addEventListener("click", (event) => {
    event.stopPropagation();
    const chosenQuestionId = event.target.getAttribute("data-key");
    showAddForm(chosenQuestionId);
  });
  const editElement = document.createElement("button");
  editElement.textContent = "Edit";
  editElement.classList.add("answer-button");
  editElement.setAttribute("data-key", id);
  editElement.addEventListener("click", (event) => {
    event.stopPropagation();
    const chosenQuestionId = event.target.getAttribute("data-key");
    showEditForm(chosenQuestionId);
  });
  const deleteElement = document.createElement("button");
  deleteElement.textContent = "Delete";
  deleteElement.classList.add("answer-button");
  deleteElement.setAttribute("data-key", id);
  deleteElement.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteQuestion(event.target.getAttribute("data-key"));
  });
  const backElement = document.createElement("button");
  backElement.textContent = "Back";
  backElement.classList.add("back-button");
  backElement.setAttribute("data-key", id);
  backElement.addEventListener("click", (event) => {
    event.stopPropagation();
    const chosenQuestionId = event.target.getAttribute("data-key");
    handleBackButtonClick(chosenQuestionId);
  });

  questionElement.appendChild(backElement);
  questionElement.appendChild(addElement);
  questionElement.appendChild(editElement);
  questionElement.appendChild(deleteElement);

  //Answer element
  answersElement.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const { id, text, nextQuestion } = answer;
    const answerContainer = document.createElement("div");

    const answerButton = document.createElement("button");
    answerButton.textContent = text;
    answerButton.setAttribute("data-key", nextQuestion);
    answerButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const nextQuestionId = event.target.getAttribute("data-key");
      renderQuestion(nextQuestionId);
    });

    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.classList.add("answer-button");
    addButton.setAttribute("data-key", id);
    addButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const chosenId = event.target.getAttribute("data-key");
      showAddQuestionForm(chosenId, currentQuestionId);
    });
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("answer-button");
    editButton.setAttribute("data-key", id);
    editButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const chosenId = event.target.getAttribute("data-key");
      showEditAnswerForm(chosenId, currentQuestionId);
    });
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("answer-button");
    deleteButton.setAttribute("data-key", id);

    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteAnswer(event.target.getAttribute("data-key"), currentQuestionId);
    });

    answerContainer.appendChild(answerButton);
    answerContainer.appendChild(addButton);
    answerContainer.appendChild(editButton);
    answerContainer.appendChild(deleteButton);
    answersElement.appendChild(answerContainer);
  });

  if (currentQuestionId !== 1) {
    backElement.style.display = "block";
  } else {
    backElement.style.display = "none";
  }
}

function handleBackButtonClick(questionId) {
  if (questionId !== 1) {
    questionId = findQuestionById(questionId).previousAnswer;
    renderQuestion(questionId);
  }
}

function showAddForm(questionId) {
  addForm.style.display = "block";
  editForm.style.display = "none";
  addQuestionForm.style.display = "none";

  const handleAddAnswerClick = () => {
    addAnswer(questionId);
  };

  addButton.addEventListener("click", handleAddAnswerClick);
}

function addAnswer(currentQuestionId) {
  const newAnswerId = answerIdInput.value;
  const newAnswerText = answerTextInput.value;

  if (newAnswerId === "" || newAnswerText === "") {
    alert("Please fill in all fields");
    return;
  }

  const currentQuestion = findQuestionById(currentQuestionId);
  for (let i = 0; i < currentQuestion.answers.length; i++) {
    if (currentQuestion.answers[i].id == newAnswerId) {
      alert("Answer already exists");
      return;
    }
  }

  currentQuestion.answers.push(new Answer(newAnswerId, newAnswerText, null));

  renderQuestion(currentQuestionId);
  addForm.style.display = "none";
  resetForm();
}

function showEditForm(questionId) {
  addForm.style.display = "none";
  editForm.style.display = "block";
  addQuestionForm.style.display = "none";

  if (questionId) {
    questionText.value = findQuestionById(questionId).text;
  }

  const handleSaveEditQuestionClick = (event) => {
    event.stopPropagation();
    editQuestion(questionId);
  };

  saveElement.addEventListener("click", handleSaveEditQuestionClick);
}

function editQuestion(questionId) {
  if (questionId) {
    findQuestionById(questionId).text = questionText.value;
    renderQuestion(questionId);
    editForm.style.display = "none";
    alert("Question edited successfully");
  }
}

function deleteQuestion(questionId) {
  if (confirm("Are you sure you want to delete this question?") === true) {
    if (findQuestionById(questionId).previousAnswer === null) {
      alert("You cannot delete the root question.");
    }

    const currentQuestion = findQuestionById(questionId);
    const previousAnswerId = currentQuestion.previousAnswer;

    findQuestionById(previousAnswerId).answers = findQuestionById(
      previousAnswerId
    ).answers.filter((answer) => answer.nextQuestion != questionId);

    renderQuestion(previousAnswerId || 1);
  }
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

function showAddQuestionForm(answerId, currentQuestionId) {
  addQuestionForm.style.display = "block";
  editForm.style.display = "none";
  addForm.style.display = "none";

  const handleAddClick = () => {
    addQuestion(answerId, currentQuestionId);
  };

  addQuestionButton.addEventListener("click", handleAddClick);
}

function addQuestion(answerId, currentQuestionId) {
  const newQuestionId = questionIdInput.value;
  const newQuestionText = questionTextInput.value;
  const previousAnswerId = answerId;

  if (newQuestionId === "" || newQuestionText === "") {
    alert("Please fill in all fields");
    return;
  }

  if (findQuestionById(newQuestionId)) {
    alert("Question already exists");
    return;
  }

  const currentAnswer = findAnswerById(currentQuestionId, answerId);
  if (currentAnswer.nextQuestion) {
    alert("This answer already has a next question");
    return;
  }

  questions.push(
    new Question(newQuestionId, newQuestionText, previousAnswerId)
  );

  currentAnswer.nextQuestion = newQuestionId;

  alert("Question added successfully");
}

function deleteAnswer(answerId, currentQuestionId) {
  const currentQuestion = findQuestionById(currentQuestionId);
  if (confirm("Are you sure you want to delete this answer?") === true) {
    currentQuestion.answers = currentQuestion.answers.filter(
      (answer) => answer.id != answerId
    );
    renderQuestion(currentQuestionId || 1);
  }
}

const showEditAnswerForm = (answerId, currentQuestionId) => {
  addForm.style.display = "none";
  editAnswerForm.style.display = "block";
  addQuestionForm.style.display = "none";

  answerEditText.value = findAnswerById(currentQuestionId, answerId).text;

  const handleSaveClick = () => {
    editAnswer(answerId, currentQuestionId);
  };

  saveEditAnswer.addEventListener("click", handleSaveClick);
};

function editAnswer(answerId, currentQuestionId) {
  findAnswerById(currentQuestionId, answerId).text = answerEditText.value;
  renderQuestion(currentQuestionId);
  editForm.style.display = "none";
  alert("Answer edited successfully");
}

function handleSearchButtonClick(event) {
  event.stopPropagation();
  const searchValue = searchInput.value;
  const question = findQuestionById(searchValue);
  if (question) {
    alert(
      "The question is: " + JSON.stringify(findQuestionById(searchValue).text)
    );
  } else {
    alert("Question not found");
  }
}

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
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

cancelAddButton.addEventListener("click", (event) => {
  event.stopPropagation();
  addForm.style.display = "none";
});
cancelEditButton.addEventListener("click", (event) => {
  event.stopPropagation();
  editForm.style.display = "none";
});
cancelAddQuestion.addEventListener("click", (event) => {
  event.stopPropagation();
  addQuestionForm.style.display = "none";
});
cancelEditAnswer.addEventListener("click", (event) => {
  event.stopPropagation();
  editAnswerForm.style.display = "none";
});
searchButton.addEventListener("click", handleSearchButtonClick);

renderQuestion(1);

// Funções da Disciplina
function createDiscipline() {
  const disciplineDialog = document.getElementById("discipline-modal");
  disciplineDialog.showModal();

  const titleExist = document.querySelector(".discipline-modal__title");
  if (!titleExist || titleExist.innerText !== "Nova Disciplina") {
    const disciplineHeader = document.getElementById("discipline-header");
    const title = document.createElement("h3");
    title.classList.add("discipline-modal__title");
    title.innerText = "Nova Disciplina";
    disciplineHeader.appendChild(title);
  }
}

function closeDisciplineModal(event) {
  event.preventDefault();
  const disciplineDialog = document.getElementById("discipline-modal");
  disciplineDialog.close();
}

async function saveDisciplineModal(event) {
  event.preventDefault();
  try {
    const nome = document.getElementById("nome-disciplina").value;
    const cargaHoraria = document.getElementById("carga-horaria").value;
    const professor = document.getElementById("nome-professor").value;
    const status = document.getElementById("status").value;
    const observacoes = document.getElementById("observacoes").value;

    const data = {
      nome,
      cargaHoraria,
      professor,
      status,
      observacoes,
    };

    const idDiscipline = document.getElementById("id-disciplina").value;
    const title = document.querySelector(".discipline-modal__title");
    if (title.innerText === "Nova Disciplina") {
      var typeMethod = "POST";
      var url = "http://localhost:3000/disciplinas";
    } else {
      var typeMethod = "PUT";
      var url = `http://localhost:3000/disciplinas/${idDiscipline}`;
    }

    await fetch(url, {
      method: typeMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    alert("Erro ao salvar disciplina", error);
  }
}

async function deleteDiscipline(id) {
  try {
    await fetch(`http://localhost:3000/disciplinas/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    alert("Erro ao apagar disciplina", error);
  }
}

async function editDiscipline(id) {
  const disciplineDialog = document.getElementById("discipline-modal");
  disciplineDialog.showModal();

  const titleExist = document.querySelector(".discipline-modal__title");
  if (!titleExist) {
    const disciplineHeader = document.getElementById("discipline-header");
    const title = document.createElement("h3");
    title.classList.add("discipline-modal__title");
    title.innerText = "Editar Disciplina";
    disciplineHeader.appendChild(title);
  }
  try {
    const response = await fetch(`http://localhost:3000/disciplinas/${id}`);
    const data = await response.json();
    const inputIdDiscipline = document.getElementById("id-disciplina");
    const inputNameDiscipline = document.getElementById("nome-disciplina");
    const inputWorkload = document.getElementById("carga-horaria");
    const inputTeacher = document.getElementById("nome-professor");
    const inputStatus = document.getElementById("status");
    const inputObservations = document.getElementById("observacoes");

    inputIdDiscipline.value = data.id;
    inputNameDiscipline.value = data.nome;
    inputWorkload.value = data.cargaHoraria;
    inputTeacher.value = data.professor;
    inputStatus.value = data.status;
    inputObservations.value = data.observacoes;

    dataUpdate = {
      nome: inputNameDiscipline.value,
      cargaHoraria: inputWorkload.value,
      professor: inputTeacher.value,
      status: inputStatus.value,
      observacoes: inputObservations.value,
    };
  } catch (error) {
    alert("Erro ao editar disciplina", error);
  }
}

// Listando as disciplinas
(async () => {
  try {
    const response = await fetch("http://localhost:3000/disciplinas");
    const data = await response.json();
    const subjectList = document.getElementById("subject-list");

    data.forEach((subject) => {
      const subjectCard = document.createElement("div");
      subjectCard.classList.add("subject-card");

      const subjectTitle = document.createElement("h3");
      subjectTitle.classList.add("subject-card__title");
      subjectTitle.innerText = subject.nome;

      const subjectHR = document.createElement("hr");

      const subjectListUl = document.createElement("ul");
      subjectListUl.classList.add("subject-card__list");

      const subjectWorkload = document.createElement("li");
      subjectWorkload.innerText = `Carga horária: ${subject.cargaHoraria}`;

      const subjectTeacher = document.createElement("li");
      subjectTeacher.innerText = `Professor: ${subject.professor}`;

      const subjectStatusSpan = document.createElement("span");
      subjectStatusSpan.innerText = subject.status;
      if (subject.status === "Obrigatória") {
        subjectStatusSpan.classList.add("tag", "tag--danger");
      } else {
        subjectStatusSpan.classList.add("tag", "tag--success");
      }

      const subjectStatus = document.createElement("li");
      subjectStatus.innerText = "Status: ";

      const subjectDescription = document.createElement("p");
      subjectDescription.innerText = subject.observacoes;

      const subjectButtons = document.createElement("div");
      subjectButtons.classList.add("subject-card_buttons");

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("button", "button--danger");
      deleteButton.innerText = "Apagar";
      deleteButton.onclick = () => {
        deleteDiscipline(subject.id);
      };

      const editButton = document.createElement("button");
      editButton.classList.add("button", "button--success");
      editButton.innerText = "Editar";
      editButton.onclick = () => {
        editDiscipline(subject.id);
      };

      subjectButtons.appendChild(deleteButton);
      subjectButtons.appendChild(editButton);

      subjectStatus.appendChild(subjectStatusSpan);

      subjectListUl.appendChild(subjectWorkload);
      subjectListUl.appendChild(subjectTeacher);
      subjectListUl.appendChild(subjectStatus);

      subjectCard.appendChild(subjectTitle);
      subjectCard.appendChild(subjectHR);
      subjectCard.appendChild(subjectListUl);
      subjectCard.appendChild(subjectDescription);
      subjectCard.appendChild(subjectButtons);

      subjectList.appendChild(subjectCard);
    });
  } catch (error) {
    alert("Erro ao listar disciplinas", error);
  }
})();

// Funções do Estudante
function createStudent() {
  const studentDialog = document.getElementById("student-modal");
  studentDialog.showModal();

  const titleExist = document.querySelector(".student-modal-title");
  if (!titleExist || titleExist.innerText !== "Novo Aluno") {
    const studentHeader = document.getElementById("student-header");
    const title = document.createElement("h3");
    title.classList.add("student-modal-title");
    title.innerText = "Novo Aluno";
    studentHeader.appendChild(title);
  }
}

function closeStudentModal() {
  const studentDialog = document.getElementById("student-modal");
  studentDialog.close();
}

async function saveStudentModal(event) {
  event.preventDefault();
  try {
    const nome = document.getElementById("nome-aluno").value;
    const matricula = document.getElementById("matricula").value;
    const curso = document.getElementById("curso").value;

    const data = {
      nome,
      matricula,
      curso,
    };

    const idStudent = document.getElementById("id-aluno").value;
    const title = document.querySelector(".student-modal-title");
    if (title.innerText === "Novo Aluno") {
      var typeMethod = "POST";
      var url = "http://localhost:3000/alunos";
    } else {
      var typeMethod = "PUT";
      var url = `http://localhost:3000/alunos/${idStudent}`;
    }

    await fetch(url, {
      method: typeMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    alert("Erro ao salvar aluno", error);
  }
}

async function deleteStudent(id) {
  try {
    await fetch(`http://localhost:3000/alunos/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    alert("Erro ao apagar aluno");
  }
}

async function editStudent(id) {
  const studentDialog = document.getElementById("student-modal");
  studentDialog.showModal();

  const titleExist = document.querySelector(".student-modal-title");
  if (!titleExist) {
    const studentHeader = document.getElementById("student-header");
    const title = document.createElement("h3");
    title.classList.add("student-modal-title");
    title.innerText = "Editar Aluno";
    studentHeader.appendChild(title);
  }
  try {
    const response = await fetch(`http://localhost:3000/alunos/${id}`);
    const data = await response.json();
    const inputIdStudent = document.getElementById("id-aluno");
    const inputNameStudent = document.getElementById("nome-aluno");
    const inputRegistration = document.getElementById("matricula");
    const inputCourse = document.getElementById("curso");

    inputIdStudent.value = data.id;
    inputNameStudent.value = data.nome;
    inputRegistration.value = data.matricula;
    inputCourse.value = data.curso;

    dataUpdate = {
      nome: inputNameStudent.value,
      matricula: inputRegistration.value,
      curso: inputCourse.value,
    };
  } catch (error) {
    alert("Erro ao editar aluno", error);
  }
}

// Listando os estudantes
(async () => {
  try {
    const response = await fetch("http://localhost:3000/alunos");
    const data = await response.json();
    const studentList = document.getElementById("student-list");

    data.forEach((student) => {
      const studentTR = document.createElement("tr");

      const studentName = document.createElement("td");
      studentName.innerText = student.nome;

      const studentRegistration = document.createElement("td");
      studentRegistration.innerText = student.matricula;

      const studentCourse = document.createElement("td");
      studentCourse.innerText = student.curso;

      const studentButtons = document.createElement("td");
      studentButtons.classList.add("table_buttons");

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("button", "button--danger");
      deleteButton.innerText = "Apagar";
      deleteButton.onclick = () => {
        deleteStudent(student.id);
      };

      const editButton = document.createElement("button");
      editButton.classList.add("button", "button--success");
      editButton.innerText = "Editar";
      editButton.onclick = () => {
        editStudent(student.id);
      };

      studentButtons.appendChild(deleteButton);
      studentButtons.appendChild(editButton);

      studentTR.appendChild(studentName);
      studentTR.appendChild(studentRegistration);
      studentTR.appendChild(studentCourse);
      studentTR.appendChild(studentButtons);

      studentList.appendChild(studentTR);
    });
  } catch (error) {
    alert("Erro ao listar alunos", error);
  }
})();

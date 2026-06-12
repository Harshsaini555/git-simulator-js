const workingArea = document.getElementById("workingArea");
const stagingArea = document.getElementById("stagingArea");
const commitsArea = document.getElementById("commitsArea");

const fileInput = document.getElementById("fileInput");
const createBtn = document.getElementById("createBtn");

const commitInput = document.getElementById("commitInput");
const commitBtn = document.getElementById("commitBtn");

let workingFiles = [];
let stagedFiles = [];
let commits = [];


// CREATE FILE
createBtn.addEventListener("click", () => {
  const fileName = fileInput.value.trim();

  if (!fileName) return;

  workingFiles.push(fileName);

  fileInput.value = "";

  render();
});


// RENDER EVERYTHING
function render() {
  renderWorkingFiles();
  renderStagedFiles();
  renderCommits();
}


// WORKING AREA
function renderWorkingFiles() {
  workingArea.innerHTML = "";

  workingFiles.forEach((file, index) => {

    const card = document.createElement("div");
    card.className = "file-card";

    card.innerHTML = `
      <span>${file}</span>

      <div class="actions">
        <button onclick="deleteFile(${index})">✖</button>
        <button onclick="stageFile(${index})">➕</button>
      </div>
    `;

    workingArea.appendChild(card);
  });
}


// DELETE FILE
function deleteFile(index) {
  workingFiles.splice(index, 1);
  render();
}


// STAGE FILE
function stageFile(index) {
  const file = workingFiles[index];

  stagedFiles.push(file);

  workingFiles.splice(index, 1);

  render();
}


// STAGING AREA
function renderStagedFiles() {
  stagingArea.innerHTML = "";

  stagedFiles.forEach((file, index) => {

    const card = document.createElement("div");
    card.className = "file-card";

    card.innerHTML = `
      <span>${file}</span>

      <div class="actions">
        <button onclick="unstageFile(${index})">➖</button>
      </div>
    `;

    stagingArea.appendChild(card);
  });
}


// UNSTAGE FILE
function unstageFile(index) {
  const file = stagedFiles[index];

  workingFiles.push(file);

  stagedFiles.splice(index, 1);

  render();
}


// COMMIT
commitBtn.addEventListener("click", () => {

  if (stagedFiles.length === 0) return;

  const message = commitInput.value.trim() || "No Commit Message";

  const newCommit = {
    id: Date.now(),
    message,
    files: [...stagedFiles]
  };

  commits.push(newCommit);

  stagedFiles = [];

  commitInput.value = "";

  render();
});


// RENDER COMMITS
function renderCommits() {

  commitsArea.innerHTML = "";

  commits.forEach(commit => {

    const card = document.createElement("div");
    card.className = "commit-card";

    const filesHTML = commit.files.map(file => {
      return `<div class="chip">${file}</div>`;
    }).join("");

    card.innerHTML = `
      <div class="commit-header">
        <h4>${commit.message}</h4>

        <button class="squash-btn"
          onclick="squashCommit(${commit.id})">
          ✖
        </button>
      </div>

      <div class="commit-files">
        ${filesHTML}
      </div>
    `;

    commitsArea.appendChild(card);
  });
}


// SQUASH COMMIT
function squashCommit(id) {

  const commitIndex = commits.findIndex(c => c.id === id);

  if (commitIndex === -1) return;

  const commit = commits[commitIndex];

  stagedFiles.push(...commit.files);

  commits.splice(commitIndex, 1);

  render();
}
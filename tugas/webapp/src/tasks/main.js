const {
  done,
  cancel,
  getList,
  add,
  getWorkersList,
} = require('./async-action');
const { store$, errorAction, clearErrorAction } = require('./store');

require('./main.css');

const form = document.getElementById('form');
const job = document.getElementById('job');
const assignee = document.getElementById('assignee');
const attachment = document.getElementById('attachment');
const list = document.getElementById('list');
const errorTxt = document.getElementById('error-text');
const loadingTxt = document.getElementById('loading-text');

form.onsubmit = (event) => {
  event.preventDefault();
  store$.dispatch(clearErrorAction());
  if (
    !job.value ||
    !assignee.options[assignee.selectedIndex] ||
    !attachment.files[0]
  ) {
    store$.dispatch(errorAction('form isian tidak lengkap!'));
    return;
  }

  // register user
  store$.dispatch(
    add({
      job: job.value,
      assignee_id: assignee.options[assignee.selectedIndex].value,
      attachment: attachment.files[0],
    })
  );

  // reset form
  form.reset();
};

// presentation layer
store$.subscribe(() => {
  const state = store$.getState();
  render(state);
});
const state = store$.getState();
render(state);

store$.dispatch(getList);
store$.dispatch(getWorkersList);

function render(state) {
  // render error
  if (state.error) {
    errorTxt.textContent = state.error.toString();
  } else {
    errorTxt.textContent = '';
  }
  if (state.loading) {
    loadingTxt.style = '';
  } else {
    loadingTxt.style = 'display:none;';
  }

  // add asignee options
  assignee.innerHTML = '';
  for (let i = 0; i < state.workers.length; i++) {
    const worker = state.workers[i];
    const option = document.createElement('option');
    option.text = worker.name;
    option.value = worker.id;
    assignee.add(option);
  }

  // render list of worker
  list.innerHTML = '';
  for (let i = 0; i < state.tasks.length; i++) {
    const task = state.tasks[i];
    const li = document.createElement('div');
    let innerHtml = `
      <a href="${task.attachment}" target="_blank">lampiran</a>
      <span>${task.job}</span> -
      <span>${task.assignee}</span>
    `;
    if (task.done) {
      innerHtml += '\n<span>sudah selesai</span>';
      li.innerHTML = innerHtml;
    } else {
      const cancelBtn = document.createElement('button');
      cancelBtn.innerText = 'batal';
      cancelBtn.onclick = function () {
        store$.dispatch(cancel(task.id));
      };
      const doneBtn = document.createElement('button');
      doneBtn.innerText = 'selesai';
      doneBtn.onclick = function () {
        store$.dispatch(done(task.id));
      };
      li.innerHTML = innerHtml;
      li.append(cancelBtn, doneBtn);
    }
    list.append(li);
  }
}

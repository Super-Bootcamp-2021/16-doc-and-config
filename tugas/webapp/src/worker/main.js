const { register, getList, remove } = require('./async-action');
const { store$, errorAction, clearErrorAction } = require('./store');

require('./main.css');

const form = document.getElementById('form');
const name = document.getElementById('name');
const age = document.getElementById('age');
const photo = document.getElementById('photo');
const bio = document.getElementById('bio');
const address = document.getElementById('address');
const list = document.getElementById('list');
const errorTxt = document.getElementById('error-text');
const loadingTxt = document.getElementById('loading-text');

form.onsubmit = (event) => {
  event.preventDefault();
  store$.dispatch(clearErrorAction());
  if (
    !name.value ||
    !age.value ||
    !photo.files[0] ||
    !bio.value ||
    !address.value
  ) {
    store$.dispatch(errorAction('form isian tidak lengkap!'));
    return;
  }

  // register user
  store$.dispatch(
    register({
      name: name.value,
      photo: photo.files[0],
      age: age.value,
      bio: bio.value,
      address: address.value,
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

  // render list of worker
  list.innerHTML = '';
  for (let i = 0; i < state.workers.length; i++) {
    const worker = state.workers[i];
    const li = document.createElement('div');
    const rmvBtn = document.createElement('button');
    rmvBtn.innerText = 'hapus';
    rmvBtn.onclick = function () {
      store$.dispatch(remove(worker.id));
    };
    li.innerHTML = `
      <img src="${worker.photo}" alt="" width="30px" height="30px" />
      <span>${worker.name}</span>
    `;
    li.append(rmvBtn);
    list.append(li);
  }
}

const loggingMiddleware = (store) => {
  return (next) => {
    return (action) => {
      console.log('dispatch', action.type);
      let result = next(action);
      return result;
    };
  };
};

const delayActionMiddleware = store => next => action => {
  console.log('state', store.getState());
  if (action.type === 'done') {
    setTimeout(() => {
      next(action);
    }, 3000);
  } else {
    next(action);
  }
}

const asyncMiddleware = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }

  return next(action);
}

module.exports = {
  loggingMiddleware,
  delayActionMiddleware,
  asyncMiddleware,
};

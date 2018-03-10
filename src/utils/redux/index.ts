import { createAction as createReduxAction } from 'redux-actions';

export function createAsyncAction(namspace, type) {
  const TYPE_START     = `${namspace}/${type}_STARTED`;
  const TYPE_SUCCEEDED = `${namspace}/${type}_SUCCEEDED`;
  const TYPE_FAILED    = `${namspace}/${type}_FAILED`;
  const TYPE_CANCELLED = `${namspace}/${type}_CANCELLED`;

  const actionCreators = {
    [TYPE_START]     : createReduxAction(TYPE_START),
    [TYPE_SUCCEEDED] : createReduxAction(TYPE_SUCCEEDED),
    [TYPE_FAILED]    : createReduxAction(TYPE_FAILED),
    [TYPE_CANCELLED] : createReduxAction(TYPE_CANCELLED)
  };

  return {
    start: actionCreators[TYPE_START],
    succeeded: actionCreators[TYPE_SUCCEEDED],
    failed: actionCreators[TYPE_FAILED],
    cancelled: actionCreators[TYPE_CANCELLED],
    START: TYPE_START,
    SUCCEEDED: TYPE_SUCCEEDED,
    FAILED: TYPE_FAILED,
    CANCELLED: TYPE_CANCELLED
  }
}

export function createAction(namspace, type) {
  const TYPE = `${namspace}/${type}`;
  return {
    start: createReduxAction(TYPE),
    START: TYPE,
  }
}
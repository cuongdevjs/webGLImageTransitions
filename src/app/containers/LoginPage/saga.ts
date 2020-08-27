import { call, put, takeLatest } from 'redux-saga/effects';
import { login } from './slice';
import { $post } from 'utils/axios';
import { getMeSaga } from '../App/saga';
import { actions as actionsGlobal } from '../App/slice';

export function* loginSaga({ payload }) {
  try {
    const response = yield call($post, '/auth/signin', payload);
    yield put(login.success(response.data));
    yield call(actionsGlobal.setOptionNotification, {
      message: 'Đăng nhập thành công',
    });
    yield call(actionsGlobal.changeIsOpenNotification, true);
    yield call(getMeSaga);
  } catch {
    yield put(login.failure());
  }
}

export function* loginPageSaga() {
  yield takeLatest(login.TRIGGER, loginSaga);
}

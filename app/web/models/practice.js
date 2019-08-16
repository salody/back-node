export default {
  state: {
    isContinue: false
  },
  reducers: {
    changePractice(state, { payload }) {
      state.isContinue = payload.isContinue
    }

  },
  effects: {
    *changePracticeType({ payload }, { put, call }) {
      yield put({ type: 'changePractice', payload });
    },
  }
};

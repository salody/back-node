export default {
  state: {
    docType:  '',
    docTitle: '',
    url:      '',
    aliUrl:   ''
  },
  reducers: {
    initPreviewDoc(state, { payload }) {
      state.docType = payload.docType
      state.docTitle = payload.docTitle
      state.url = payload.url
      state.aliUrl = payload.aliUrl
    }
  },
  effects: {
    * init({ payload }, { put, call }) {
      yield put({ type: 'initPreviewDoc', payload });
    }
  }
};

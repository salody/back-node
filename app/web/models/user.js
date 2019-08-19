import defaultAvatar from '@/assets/img/avatar_light_default.png'

export default {
  state: {
    info: {
      access_token: '',
      userId:       '',
      enterpriseId: '',
      name:         '',
      watermarks:   [],
      avatar:       defaultAvatar,
      position:     '',
      jobnumber:    ''
    },
    language:     'zh',
  },
  reducers: {
    save(state, { payload }) {
      state.info = payload.userInfo
      state.info.avater = payload.userInfo.avatar || defaultAvatar
    }

  },
  effects: {
    *saveUserInfo({ payload }, { put, call }) {
      yield put({ type: 'save', payload });
    },
  }
};

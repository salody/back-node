const APIConfig = {
  userId:       '',
  enterpriseId: '',
  access_token: '',
  initApi(userInfo) {
    this.userId = userInfo.userId
    this.enterpriseId = userInfo.enterpriseId
    this.access_token = userInfo.access_token
  },
  getUserInfo() {
    return {
      userId:       this.userId,
      enterpriseId: this.enterpriseId,
      access_token: this.access_token
    }
  },
  getPracticeList() {
    return `${API.ENTERPRISE}/v2/${this.enterpriseId}/users/${this.userId}/practices`
  },
  getPracticeBankList(practiceId) {
    return `${API.ENTERPRISE}/v2/${this.enterpriseId}/users/${this.userId}/practices/${practiceId}/query_question_bank`
  },
  getAllPracticeQuestion(scope) {
    return `${API.ENTERPRISE}/v2/${this.enterpriseId}/users/${this.userId}/practices/${scope.practiceId}/query_question`
  },
  getWrongPracticeQuestion(scope) {
    return `${API.ENTERPRISE}/v2/${this.enterpriseId}/users/${this.userId}/practices/${scope.practiceId}/query_wrong_question`
  },
  saveQuestionAnswer(scope) {
    return `${API.ENTERPRISE}/v2/${this.enterpriseId}/users/${this.userId}/practices/${scope.practiceId}/questions/${scope.questionId}/save`
  },
  checkShowWrongTip() {
    return `${API.ENTERPRISE}/v2/${this.enterpriseId}/users/${this.userId}/practices/alert/query`
  },
  setCheckShowWrongTip() {
    return `${API.ENTERPRISE}/v2/${this.enterpriseId}/users/${this.userId}/practices/alert`
  },
  //网站
  getIndustry() {
    return `${API.PLATFORM}/register/industry`
  },
  getIdentifyCode() {
    return `${API.PLATFORM}/verification/code`
  },
  sendMessageCode() {
    return `${API.PLATFORM}/register/code`
  },
  verifyMobleNumber() {
    return `${API.PLATFORM}/register/findByMobile`
  },
  landingAppySubmit() {
    return `${API.PLATFORM}/register`
  },
  // 岗位地图begin
  getPostMapList() {
    return `${API.ENTERPRISE}/v2/${this.enterpriseId}/users/${this.userId}/post_maps`
  },
  getPostMapSummaryById(scope) {
    return `${API.ENTERPRISE}/v2/${this.enterpriseId}/post_maps/${scope.mapId}/introduction`
  },
  showPostMapModal(scope) {
    return `${API.ENTERPRISE}/v2/${this.enterpriseId}/users/${this.userId}/post_maps/${scope.mapId}/pop_window`
  },
  getPostMapDetailById(scope) {
    return `${API.ENTERPRISE}/v2/${this.enterpriseId}/users/${this.userId}/post_maps/${scope.mapId}`
  },
  rceivePostMapReward(scope) {
    return `${API.ENTERPRISE}/v2/${this.enterpriseId}/users/${this.userId}/post_maps/${scope.mapId}/get_awards`
  },
  saveProgress(scope) {
    return (
      `${API.ENTERPRISE}/v2/${this.enterpriseId}/users/${this.userId}/studies/${scope.studyId}/courses` +
      `/${scope.courseId}/resources/${scope.resourceId}/save_progress`
    )
  },
  saveCourseProgress(scope) {
    return `${API.ENTERPRISE}/v2/${this.enterpriseId}/users/${this.userId}/courses/${scope.courseId}/resources/${scope.resourceId}/save_progress`
  },
  getArticleDetail(scope) {
    return `${API.ENTERPRISE}/v2/${this.enterpriseId}/resources/${scope.articleId}/query`
  }
  // 岗位地图end
}

export default APIConfig

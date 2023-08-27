class User {
  constructor(
    sub,
    name,
    email,
    picture,
    multipleChoiceExams = [],
    userSubmissions = []
  ) {
    this._id = sub;
    this.name = name;
    this.email = email;
    this.picture = picture;
    this.multipleChoiceExams = multipleChoiceExams;
    // this.userSubmissions = userSubmissions;
  }
}

module.exports = User;

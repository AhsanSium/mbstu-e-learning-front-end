import React, { Component } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddQuiz from "./AddQuiz";

const ShowCourse = props => (
  <option key={props.todo.courseName} value={props.todo.courseName}>
    {props.todo.courseName}
  </option>
  // <button type="button" class="list-group-item list-group-item-action">{props.todo.courseName}</button>
);
export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      youtubelink: "",
      loaded: 0,
      Courses: [],
      course: "",
      title: "",
      lectureType: "",
      lectureText: "",
      quiz: {}
    };
    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.onChangeLectureType = this.onChangeLectureType.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeYouTubeLink = this.onChangeYouTubeLink.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "https://mbstu-e-learning-back-end.vercel.app/coursebyinstructor?id=" +
        this.props.match.params.id
      )
      .then(response => {
        console.log(this.props.match.params.id);
        this.setState({ Courses: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  CourseList() {
    return this.state.Courses.map(function (currentTodo, i) {
      //  console.log(currentTodo.categoryName)
      return <ShowCourse todo={currentTodo} key={i} />;
    });
  }

  onChangeCourse(e) {
    this.setState({
      course: e.target.value
    });
  }
  onChangeLectureType(e) {
    this.setState({
      lectureType: e.target.value
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeYouTubeLink(e) {
    this.setState({
      youtubelink: e.target.value
    });
  }
  checkMimeType = event => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = [];
    // list allow mime type
    const types = ["video/mp4", "video/mkv"];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every(type => files[x].type !== type)) {
        // create error message and assign to container
        err[x] = files[x].type + " is not a supported format\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };
  maxSelectFile = event => {
    let files = event.target.files;
    if (files.length > 3) {
      const msg = "Only 3 images can be uploaded at a time";
      event.target.value = null;
      toast.warn(msg);
      return false;
    }
    return true;
  };
  checkFileSize = event => {
    let files = event.target.files;
    let size = 2000000000000000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };
  onChangeHandler = event => {
    var files = event.target.files;
    if (
      this.maxSelectFile(event) &&
      this.checkMimeType(event) &&
      this.checkFileSize(event)
    ) {
      // if return true allow to setState
      this.setState({
        selectedFile: files,
        loaded: 0
      });
    }
  };

  onLectureChangeHandler = event => {
    var text = event.target.value;
    console.log(text);
    // if return true allow to setState
    this.setState({
      lectureText: text
    });
  };


  onClickHandler = (e) => {
    e.preventDefault();
    console.log(`Todo course: ${this.state.course}`);
    console.log(`Todo title: ${this.state.title}`);

    if (!this.state.course || !this.state.title || !this.state.lectureType) {
      toast.error("Please Select Missing Field before submit");
      return;
    }

    if (this.state.lectureType === "text") {
      if (!this.state.lectureText) {
        toast.error("Please Enter Text before submit");
        return;
      }
    }
    else if (this.state.lectureType === "video") {
      if (!this.state.selectedFile) {
        toast.error("Please Select video before submit");
        return;
      }
    }
    else if (this.state.lectureType === "quiz") {
      console.log("Quiz", this.state.quiz);
      if (!this.state.quiz) {
        toast.error("Please Enter Quiz before submit");
        return;
      }
    }

    const data = new FormData();
    data.append("course", this.state.course);
    data.append("title", this.state.title);
    data.append("lectureType", this.state.lectureType);

    //var url = URL.createObjectURL(this.state.selectedFile[1]);
    console.log("URL ", this.state.selectedFile);


    if (this.state.youtubelink == "" && this.state.lectureType === "video") {
      data.append("lectureText", "No need");
      data.append("quiz", { text: "No need" });
      for (var x = 0; x < this.state.selectedFile.length; x++) {
        data.append("file", this.state.selectedFile[x]);
      }
    }
    else if (this.state.lectureType === "video") {
      data.append("lectureText", "No need");
      data.append("quiz", { text: "No need" });
      data.append("videoLink", this.state.youtubelink);
    }
    else if (this.state.lectureType === "quiz") {
      data.append("videoLink", "No need");
      data.append("lectureText", "No need");
      console.log("QUIZ ", this.state.quiz);
      data.append("quiz", JSON.stringify(this.state.quiz));
    }
    else {
      data.append("videoLink", "No need");
      data.append("quiz", { text: "No need" });
      data.append("lectureText", this.state.lectureText);
    }

    //console.log(" Upload Data ", data.entries());

    for (const value of data.values()) {
      console.log(value);
    }

    axios
      .post("https://mbstu-e-learning-back-end.vercel.app/lectures/localupload", data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        // then print response status
        console.log(res);
        toast.success("upload success");
      })
      .catch(err => {
        // then print response status
        console.log(err);
        toast.error("upload fail");
      });
    setTimeout(
      function () {
        window.location.reload();
      }.bind(this),
      1300
    );
  };

  render() {
    var message2 = "you have selected " + this.state.course;
    var message3 = "you have selected " + this.state.lectureType;
    return (
      <div>
        <NavBar />
        <div class="container-fluid">
          <div class="row" style={{ marginTop: "30px" }}>
            <div class="offset-md-3 col-md-6">
              <form
                id="mainForm"
                encType="multipart/form-data"
              >
                <h1 className="h3 mb-3 font-weight-normal">Add Lecture</h1>
                <div class="form-group files">
                  <div className="form-group">
                    <label>Course Name </label>
                    <select
                      required
                      className="form-control"
                      name="course"
                      id="ada"
                      onChange={this.onChangeCourse}
                      onClick={this.onChangeCourse}
                      value={this.state.course}
                    >
                      <option value="">Pleace Select ...</option>
                      {this.CourseList()}
                    </select>
                    <p>{message2}</p>
                  </div>

                  <div className="form-group">
                    <label>Lecture Type </label>
                    <select
                      name="lectureType"
                      className="form-control"
                      id="lectureType"
                      required
                      onChange={this.onChangeLectureType}
                      onClick={this.onChangeLectureType}
                      value={this.state.lectureType}
                    >
                      <option value="">Pleace Select ...</option>
                      <option value="video"> Video </option>
                      <option value="text">Text</option>
                      <option value="quiz">Quiz</option>
                    </select>
                    <p>{message3}</p>
                  </div>

                  {
                    this.state.lectureType === "video" &&
                    <>
                      <div className="form-group">
                        <label>Video Title </label>
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.title}
                          onChange={this.onChangeTitle}
                        />
                      </div>

                      <label>Upload Video </label>
                      <input
                        type="file"
                        name="file"
                        class="form-control"
                        multiple
                        onChange={this.onChangeHandler}
                      />
                    </>
                  }

                  {
                    this.state.lectureType === "text" &&
                    <>
                      <div className="form-group">
                        <label>Lecture Title </label>
                        <input
                          required
                          type="text"
                          className="form-control"
                          value={this.state.title}
                          onChange={this.onChangeTitle}
                        />
                      </div>

                      <label>Full Lecture</label>
                      <textarea
                        required
                        type="text"
                        name="lectureText"
                        class="form-control"
                        rows="10" cols="50"
                        onChange={this.onLectureChangeHandler}
                      />
                    </>
                  }

                  {
                    this.state.lectureType === "quiz" &&
                    <>
                      <div className="form-group">
                        <label>Quiz Title </label>
                        <input
                          required
                          type="text"
                          className="form-control"
                          value={this.state.title}
                          onChange={this.onChangeTitle}
                        />
                      </div>

                      <label>Quiz Input</label>
                      <AddQuiz props={this} />
                    </>
                  }




                </div>
                <div class="form-group">
                  <ToastContainer />
                  <Progress max="100" color="success" value={this.state.loaded}>
                    {Math.round(this.state.loaded, 2)}%
                  </Progress>
                </div>

                {
                  this.state.lectureType === "video" &&
                  <>
                    <h3 style={{ textAlign: "center" }}> OR </h3>
                    <div className="form-group">
                      <label>Add YouTube Video URL </label>
                      <input
                        type="text"
                        placeholder="ex: https://www.youtube.com/embed/yO7Q3YWzY"
                        className="form-control"
                        value={this.state.youtubelink}
                        onChange={this.onChangeYouTubeLink}
                      />
                    </div>
                  </>


                }

                <button
                  form="mainForm"
                  type="submit"
                  className="btn btn-success btn-block"
                  onClick={this.onClickHandler}
                  name="Submit"
                >
                  Submit
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

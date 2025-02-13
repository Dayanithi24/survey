import loadModule from "./generator.js";
import surveyCard from "./components/survey-card.js";
import { formInputMap } from "./input.js";
import { store } from "./store.js";
import changeModule from "./script.js";

const finalSurvey = {
  tag: "form",
  attributes: {
    id: "form",
  },
  children: [
    {
      tag: "div",
      attributes: {
        id: "new-survey-title-card",
        class: "new-survey-title-card",
      },
      children: [
        {
          tag: "h1",
          attributes: {
            id: "new-survey-title-card-title",
            class: "new-survey-title-card-title",
          },
          content: "Title",
        },
        {
          tag: "p",
          attributes: {
            id: "new-survey-title-card-description",
            class: "new-survey-title-card-description",
          },
          content: "Description",
        },
      ],
    },
    {
      tag: "div",
      attributes: {
        id: "questions",
        class: "survey-questions",
      },
      children: [],
    },
    {
      tag: "div",
      attributes: {
        class: "final-survey-btn-container",
      },
      children: [
        {
          tag: "input",
          attributes: {
            type: "reset",
            class: "discard-survey-btn",
          },
          content: "Reset",
        },
        {
          tag: "input",
          attributes: {
            type: "submit",
            class: "create-survey-btn",
          },
          content: "Submit",
        },
      ],
    },
  ],
};

const finalSurveyModule = loadModule(finalSurvey);

function generateSurvey(data) {
  const checkboxArray = [];
  console.log("Generate survey", data);
  const questions = finalSurveyModule.querySelector("#questions");
  let child = questions.lastElementChild;
  while (child) {
    questions.removeChild(child);
    child = questions.lastElementChild;
  }
  finalSurveyModule.querySelector("#new-survey-title-card-title").innerText =
    data.title;
  finalSurveyModule.querySelector(
    "#new-survey-title-card-description"
  ).innerText = data.description;
  data.questions.forEach((question) => {
    const newSurveyCard = loadModule(surveyCard);
    newSurveyCard.querySelector(
      "#new-survey-card-question"
    ).innerText = `${question.questionNum}) ${question.question}`;
    const inputArea = newSurveyCard.querySelector("#input-area");
    const id = `question${question.questionNum}`;
    switch (question.inputType) {
      case "multiple choice":
        question.options.forEach((option, optIndex) => {
          const choice = loadModule(formInputMap.get("multiple choice"));
          const input = choice.getElementsByTagName("input")[0];
          const label = choice.getElementsByTagName("label")[0];
          input.setAttribute("id", `${id}-option${optIndex + 1}`);
          input.setAttribute("name", id);
          label.setAttribute("for", `${id}-option${optIndex + 1}`);
          input.setAttribute("value", option);
          // input.setAttribute('required', question.required);
          label.innerText = option;
          inputArea.append(choice);
        });
        break;
      case "checkbox":
        checkboxArray.push(id);
        question.options.forEach((option, optIndex) => {
          const choice = loadModule(formInputMap.get("checkbox"));
          const input = choice.getElementsByTagName("input")[0];
          const label = choice.getElementsByTagName("label")[0];
          input.setAttribute("id", `${id}-option${optIndex + 1}`);
          input.setAttribute("name", id);
          label.setAttribute("for", `${id}-option${optIndex + 1}`);
          input.setAttribute("value", option);
          // input.setAttribute('required', question.required);
          label.innerText = option;
          inputArea.append(choice);
        });
        break;
      case "text":
        const text = loadModule(formInputMap.get("text"));
        text.setAttribute("name", id);
        text.setAttribute("id", id);
        text.setAttribute("minlength", question.minimumLength);
        text.setAttribute("maxlength", question.maximumLength);
        // text.setAttribute('required', question.required);
        inputArea.append(text);
        break;
      case "date":
        const date = loadModule(formInputMap.get("date"));
        date.setAttribute("name", id);
        date.setAttribute("id", id);
        // date.setAttribute('required', question.required);
        inputArea.append(date);
        break;
      case "time":
        const time = loadModule(formInputMap.get("time"));
        time.setAttribute("name", id);
        time.setAttribute("id", id);
        // time.setAttribute('required', question.required);
        inputArea.append(time);
        break;
      case "number":
        const num = loadModule(formInputMap.get("number"));
        num.setAttribute("name", id);
        num.setAttribute("id", id);
        num.setAttribute("min", question.minimumValue);
        num.setAttribute("max", question.maximumValue);
        // num.setAttribute('required', question.required);
        inputArea.append(num);
        break;
      case "file":
        const file = loadModule(formInputMap.get("file"));
        file.setAttribute("name", id);
        file.setAttribute("id", id);
        // file.setAttribute('required', question.required);
        inputArea.append(file);
        break;
    }
    if (question.support_message) {
      const supportMessage = document.createElement("p");
      supportMessage.setAttribute("class", "support-msg");
      supportMessage.innerText = question.support_message;
      inputArea.insertAdjacentElement("afterEnd", supportMessage);
    }
    questions.append(newSurveyCard);
  });

  finalSurveyModule.querySelector('.discard-survey-btn').addEventListener("click", (e) => {
    e.preventDefault();
    swal({
      title: "Sure?",
      text: "Once reset the data will be lost",
      icon: "warning",
      buttons: ["No", "Yes"],
    })
    .then((value) => {
        if(value) finalSurveyModule.reset();
    })
  });

  finalSurveyModule.addEventListener("submit", (e) => {
    e.preventDefault();
    swal({
      title: "Sure?",
      text: "Once submitted the response cannot be edited..",
      icon: "info",
      buttons: ["No", "Yes"],
    }).then((value) => {
      if (value) {
        const formData = new FormData(e.target);
        const jsonData = Object.fromEntries(formData.entries());
        const requestData = {};
        requestData.surveyId = data.id;
        requestData.responses = jsonData;
        requestData.respondedBy = store.name;
        checkboxArray.forEach((question) => {
          requestData.responses[question] = [];
          const arr = document.getElementsByName(question);
          arr.forEach((element) => {
            if (element.checked)
              requestData.responses[question].push(element.value);
          });
        });
        console.log(requestData);

        fetch("http://127.0.0.1:8080/response", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Not found");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            swal("Response Submitted", "", "success");
            if (store.role === "ADMIN") {
              changeModule("admin");
              loadAdminPage();
            } else {
              changeModule("user");
              loadUserPage();
            }
          })
          .catch((error) => console.log(error));
      }
    });
  });
}

export { finalSurveyModule, generateSurvey };

import loadModule from "./generator.js";
import surveyCard from "./components/survey-card.js";
import { formInputMap } from "./input.js";

const newSurvey = {
  tag: "div",
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
      tag: "button",
      attributes: {
        id: "add-question",
        class: "add-question",
      },
      content: "Create Survey",
    },
  ],
};

const newSurveyModule = loadModule(newSurvey);

function loadData(data) {
  console.log("new survey", data);
  const questions = newSurveyModule.querySelector("#questions");
  let child = questions.lastElementChild;
  while (child) {
      questions.removeChild(child);
      child = questions.lastElementChild;
  }
  // console.log(questions);
  newSurveyModule.querySelector("#new-survey-title-card-title").innerText = data.title;
  newSurveyModule.querySelector("#new-survey-title-card-description").innerText = data.description;
  data.questions.forEach((question, index) => {
    const newSurveyCard = loadModule(surveyCard);
    newSurveyCard.querySelector("#new-survey-card-question").innerText = question.question;
    const inputArea = newSurveyCard.querySelector("#input-area");
    const id = `question${index + 1}`;
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
          label.innerText = option;
          inputArea.append(choice);
        });
        break;
      case "checkbox":
        question.options.forEach((option, optIndex) => {
          const choice = loadModule(formInputMap.get("checkbox"));
          const input = choice.getElementsByTagName("input")[0];
          const label = choice.getElementsByTagName("label")[0];
          input.setAttribute("id", `option${optIndex + 1}`);
          input.setAttribute("name", id);
          label.setAttribute("for", `option${optIndex + 1}`);
          input.setAttribute("value", option);
          label.innerText = option;
          inputArea.append(choice);
        });
        break;
      case "text":
        const text = loadModule(formInputMap.get("text"));
        text.setAttribute("name", id);
        text.setAttribute("id", id);
        text.setAttribute("minlength", question.minimum_value);
        text.setAttribute("maxlength", question.minimum_value);
        inputArea.append(text);
        break;
      case "date":
        const date = loadModule(formInputMap.get("date"));
        date.setAttribute("name", id);
        date.setAttribute("id", id);
        inputArea.append(date);
        break;
      case "time":
        const time = loadModule(formInputMap.get("time"));
        time.setAttribute("name", id);
        time.setAttribute("id", id);
        inputArea.append(time);
        break;
      case "number":
        const num = loadModule(formInputMap.get("number"));
        num.setAttribute("name", id);
        num.setAttribute("id", id);
        // num.setAttribute("min", question.);
        inputArea.append(num);
        break;
      case "file":
        const file = loadModule(formInputMap.get("file"));
        file.setAttribute("name", id);
        file.setAttribute("id", id);
        inputArea.append(file);
        break;
    }
    if(question.support_message){
      const supportMessage = document.createElement('p');
      supportMessage.setAttribute('class', 'support-msg')
      supportMessage.innerText = question.support_message;
      inputArea.insertAdjacentElement("afterEnd", supportMessage);
    }
    questions.append(newSurveyCard);
  });
}

export { newSurveyModule, loadData };

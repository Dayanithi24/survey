import createSurveyTitleCard from "./components/create-survey-title-card.js";
import questionCard from "./components/question-card.js";
import loadModule from "./generator.js";
import { inputMap } from "./input.js";
import { loadData } from "./new-survey.js";
import changeModule from "./script.js";

const obj = {
  tag: "div",
  children: [
    {
      tag: "div",
      attributes: {
        id: "create-survey-header",
        class: "create-survey-header",
      },
      children: [
        {
          tag: "span",
          content: "Create Survey",
        },
        {
          tag: "div",
          attributes: {
            class: "create-survey-header-btn-container",
          },
          children: [
            {
              tag: "button",
              attributes: {
                id: "create-survey",
                class: "create-survey-btn",
              },
              content: "Preview",
            },
            {
              tag: "button",
              attributes: {
                id: "discard-survey",
                class: "discard-survey-btn",
              },
              content: "Discard",
            },
          ],
        },
      ],
    },
    {
      tag: "div",
      attributes: {
        id: "form",
        class: "form",
      },
      children: [
        createSurveyTitleCard,
        {
          tag: "div",
          attributes: {
            id: "questions",
          },
          children: [questionCard],
        },
        {
          tag: "button",
          attributes: {
            id: "add-question",
            class: "add-question",
          },
          content: "Add Question",
        },
      ],
    },
  ],
};

const createSurveyModule = loadModule(obj);

const questions = createSurveyModule.querySelector("#questions");

function attachEventListeners(card) {
  const question = card.querySelector(".question-card-question");
  let inputType = card.querySelector("#question-card-dropdown");
  let inputArea = card.querySelector("#question-card-input-area");
  const inc = card.querySelector("#incrementor");
  const d = card.querySelector("#decrementor");
  let dec = card.querySelectorAll("#decrementor");
  const deleteQuestion = card.querySelector("#delete-question");

  question.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });

  if (d) {
    d.addEventListener("click", () => {
      if (dec.length > 1) inputArea.removeChild(d.parentElement);
      dec = card.querySelectorAll("#decrementor");
    });
  }

  inputType.addEventListener("change", () => {
    const element = loadModule(inputMap.get(inputType.value));
    const d = element.querySelector("#decrementor");
    if (d) {
      d.addEventListener("click", () => {
        if (dec.length > 1) inputArea.removeChild(d.parentElement);
        dec = card.querySelectorAll("#decrementor");
      });
    }
    if (
      !(inputType.value === "multiple choice" || inputType.value === "checkbox")
    )
      inc.style.display = "none";
    else inc.style.display = "block";
    inputArea.replaceChildren(element);
  });

  inc.addEventListener("click", () => {
    const element = loadModule(inputMap.get(inputType.value));
    const d = element.querySelector("#decrementor");
    if (d) {
      d.addEventListener("click", () => {
        if (dec.length > 1) inputArea.removeChild(d.parentElement);
        dec = card.querySelectorAll("#decrementor");
      });
    }
    inputArea.append(element);
    dec = card.querySelectorAll("#decrementor");
  });

  deleteQuestion.addEventListener("click", () => {
    swal("Warning", "Do you want to delete the Question", "warning", {
      buttons: true,
      closeOnClickOutside: false,
      dangerMode: true
    })
    .then((value) => {
      if(value){
        questions.removeChild(card);
      }
    });
  });
}

const addQuestion = createSurveyModule.querySelector("#add-question");

attachEventListeners(questions.childNodes[0]);

addQuestion.addEventListener("click", () => {
  const newCard = loadModule(questionCard);
  attachEventListeners(newCard);
  questions.appendChild(newCard);
});

const createSurvey = createSurveyModule.querySelector("#create-survey");
const form = createSurveyModule.querySelector("#form");
const discard = createSurveyModule.querySelector('.discard-survey-btn');

discard.addEventListener('click', () => {
  swal("Sure?", "Do you want to discard?", "warning", {
    buttons: ["No","Yes"],
    closeOnClickOutside: false,
    dangerMode: true
  })
  .then((value) => {
    if(value){
      changeModule('admin');
    }
  });
});

createSurvey.addEventListener("click", () => {
  let flag = true;
  let errorMsg = "";

  function validate(element) {
    if (element.type === 'number' && element.value < 0) {
      flag = false;
      if (!errorMsg.includes("Number shouldn't be negative"))
        errorMsg += "Number shouldn't be negative\n";
      element.style.border = "1px solid red";
    }
      if (element.value === "") {
        flag = false;
        if (!errorMsg.includes("Fill the missing fields"))
          errorMsg += "Fill the missing fields\n";
        element.classList.add('border-red');
        element.addEventListener('blur', () => {
          element.classList.remove('border-red');
        })
      }
      return element.value;
    }
    
    function validateMinMax(min, max) {
      if(Number(min.value) > Number(max.value)){
        flag = false;
        if (!errorMsg.includes("Max value should be greater than min value"))
          errorMsg += "Max value should be greater than min value\n";
        min.classList.add('border-red');
        max.classList.add('border-red');
    }
  }

  const data = {};
  data.title = validate(
    createSurveyModule.querySelector("#create-survey-title-card-title")
  );
  data.description = validate(
    createSurveyModule.querySelector("#create-survey-title-card-description")
  );
  const len = questions.childNodes.length;
  data.questions = [];
  for (let i = 0; i < len; i++) {
    const question = questions.children[i];
    const obj = {};
    obj.question_num = i + 1;
    obj.question = validate(question.querySelector("#question-card-question"));
    const inputType = question.querySelector("#question-card-dropdown").value;
    obj.inputType = inputType;
    obj.support_message = question.querySelector("#support-msg").value;
    obj.error_message = question.querySelector("#error-msg").value;
    obj.required = question.querySelector(".required").checked;
    if (inputType === "multiple choice" || inputType === "checkbox") {
      const options = [];
      const optionInputs = question.querySelectorAll(".input-option");
      for (let i = 0; i < optionInputs.length; i++) {
        options.push(validate(optionInputs[i]));
      }
      obj.options = options;
    } else if (inputType === "text" || inputType === "number") {
      const min = question.querySelector("#min-length");
      const max = question.querySelector("#max-length");
      obj.minimum_value = validate(min);
      obj.maximum_value = validate(max);

      validateMinMax(min,max);

    } else if (inputType === "file") {
      const formats = validate(question.querySelector("#file-formats")).split(
        ","
      );
      obj.file_formats = formats;
      let val = validate(question.querySelector("#number-of-files"));
      obj.maximum_number_of_files = Number(val) > 0 ? val : 1;
      obj.maximum_file_size = validate(question.querySelector("#file-size"));
    }
    data.questions.push(Object.assign({}, obj));
  }
  if (flag) {
    changeModule("new-survey");
    loadData(data);
  } else {
    swal("Error", errorMsg, "error");
  }
});

export default createSurveyModule;

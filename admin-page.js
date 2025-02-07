import formCard from "./components/form-card.js";
import loadModule from "./generator.js";
import changeModule from "./script.js";

const obj = {
  tag: "div",
  attributes: {
    class: "admin-container ",
  },
  children: [
    {
      tag: "div",
      attributes: {
        class: "admin-header",
      },
      children: [
        {
          tag: "span",
          attributes: {
            class: "admin-header-title",
          },
          content: "Survey Master",
        },
        {
          tag: "div",
          attributes: {
            class: "tooltip",
          },
          children: [
            {
              tag: "button",
              attributes: {
                id: "create-survey",
                class: "create-survey-btn",
              },
              content: "New",
            },
            {
              tag: "span",
              attributes: {
                class: "tooltiptext",
              },
              content: 'Create Survey'
            },
          ],
        },
      ],
    },
    {
      tag: "div",
      attributes: {
        class: "admin-main",
      },
      children: [
        formCard,
        formCard,
        formCard,
        formCard,
        
      ],
    },
  ],
};

const adminPage = loadModule(obj);

const createSurvey = adminPage.querySelector("#create-survey");
createSurvey.addEventListener("click", () => {
  const path = "create-survey";
  changeModule(path);
});

export default adminPage;

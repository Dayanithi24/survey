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

const userPage = loadModule(obj);

export default userPage;

import { inputMap } from "../input.js";

const questionCard = {
    tag: 'div',
    attributes: {
        id: 'question-card',
        class: 'question-card',
    },
    children: [
        {
            tag: 'div',
            attributes: {
                id: 'question-card-header',
                class: 'question-card-header',
            },
            children: [
                {
                    tag: "textarea",
                    attributes: {
                      id: "question-card-question",
                      class: "question-card-question border",
                      required: false,
                      placeholder: 'Question',
                  },
              },
              {
                tag: "select",
                attributes: {
                    id: "question-card-dropdown",
                    class: "question-card-dropdown border",
                },
                children: [
                  {
                    tag: "option",
                    attributes: {
                      value: "multiple choice",
                      selected: true,
                    },
                    content: "mcq",
                  },
                  {
                    tag: "option",
                    attributes: {
                      value: "checkbox",
                    },
                    content: "checkbox",
                  },
                  {
                    tag: "option",
                    attributes: {
                      value: "text",
                    },
                    content: "text",
                  },
                  {
                    tag: "option",
                    attributes: {
                      value: "date",
                    },
                    content: "date",
                  },
                  {
                    tag: "option",
                    attributes: {
                      value: "number",
                    },
                    content: "number",
                  },
                  {
                    tag: "option",
                    attributes: {
                      value: "time",
                    },
                    content: "time",
                  },
                  {
                    tag: "option",
                    attributes: {
                      value: "file",
                    },
                    content: "file",
                  },
                ],
              },
            ],
        },
        {
          tag: 'div',
          attributes: {
            id: 'question-card-main',
            class: 'question-card-main'
          },
          children: [
              {
                tag: 'div',
                attributes: {
                  class: 'question-card-input-area-container'
                },
                children: [
                  {
                    tag: 'div',
                    attributes: {
                        id: 'question-card-input-area',
                        class: 'question-card-input-area',
                    },
                    children: [
                        inputMap.get("multiple choice"),
                    ],
                },
                {
                    tag: "button",
                    attributes: {
                      id: "incrementor",
                      class: 'incrementor'
                    },
                    content: "+",
                  },
                ],
              },
              {
                tag: 'div',
                attributes: {
                  class: 'question-card-message-container'
                },
                children: [
                  {
                    tag: "input",
                    attributes: {
                      type: "text",
                      id: 'support-msg',
                      class: 'msg-input border',
                      placeholder: 'Support Message',
                      required: false,
                    },
                  },
                  {
                    tag: "input",
                    attributes: {
                      type: "text",
                      id: 'error-msg',
                      class: 'msg-input border',
                      placeholder: 'Error Message',
                      required: false,
                    },
                  },
                ],
              },
          ],
        },
        {
            tag: 'div',
            attributes: {
                id: 'question-card-footer',
                class: 'question-card-footer',
            },
            children: [
              {
                tag: 'button',
                attributes: {
                  id: 'delete-question',
                },
                content: 'Delete'
              },
              {
                tag: 'div',
                attributes: {
                  id: 'required-container',
                  class: 'required-container',
                },
                children: [
                  {
                    tag: 'label',
                    content: 'Required'
                  },
                  {
                    tag: 'label',
                    attributes: {
                      class: 'toggle-switch'
                    },
                    children: [
                      {
                        tag: 'input',
                        attributes: {
                          type: 'checkbox',
                          class: 'required',
                          hidden: true
                        }
                      },
                      {
                        tag: 'span',
                        attributes: {
                          class: 'toggle'
                        }
                      }
                    ]
                  },
                  
                ]
              }
            ],
        },
    ],
}

export default questionCard;
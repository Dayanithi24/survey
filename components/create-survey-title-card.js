const createSurveyTitleCard = {
  tag: "div",
  attributes: {
    id: "create-survey-title-card",
    class: "create-survey-title-card",
  },
  children: [
    {
      tag: "input",
      attributes: {
        type: "text",
        id: "create-survey-title-card-title",
        class: "create-survey-title-card-title border",
        required: false,
        placeholder: 'Title',
    },
},
{
    tag: "textarea",
    attributes: {
        id: "create-survey-title-card-description",
        class: "create-survey-title-card-description border",
        required: false,
        placeholder: 'Description',
      },
    },
  ],    
};

export default createSurveyTitleCard;

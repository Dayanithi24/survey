const images = ['form1.png', 'form2.webp', 'form3.webp', 'form4.webp', 'form5.webp',]
const formCard = {
  tag: "div",
  attributes: {
    class: 'form-card'
  },
  children: [
    {
      tag: "div",
      attributes: {
        class: 'form-card-image-container'
      },
      children: [
        {
          tag: "img",
          attributes: {
            src: `../images/${images[Math.floor(Math.random() * 10) % 5]}`,
          },
        },
      ],
    },
    {
      tag: "h2",
      attributes: {
        class: 'form-card-title'
      },
      content: "Survey 1",
    },
    {
      tag: 'div', 
      attributes: {
        class: 'form-card-btn-container'
      },
      children: [
        {
          tag: 'button',
          attributes: {
            class: 'view-btn',
          },
          content: 'View Responses'
        },
        {
          tag: 'button',
          attributes: {
            class: 'delete-btn',
          },
          content: 'Delete'
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
    },
    
  ],
};


export default formCard;
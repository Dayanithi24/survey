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
            class: 'form-card-img'
          },
        },
      ],
    },
    {
      tag: "h2",
      attributes: {
        class: 'form-card-title'
      },
      content: " ",
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
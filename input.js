const inputMap = new Map();

inputMap.set("multiple choice", {
  tag: "div",
  attributes: {
    id: 'input-container',
    class: 'input-container',
  },
  children: [
    {
      tag: "div",
      attributes: {
        class: 'radio-btn'
      },
    },
    {
      tag: "input",
      attributes: {
        type: "text",
        class: 'input-option border',
        placeholder: 'Option',
        required: false,
      },
    },
    {
      tag: "button",
      attributes: {
        id: "decrementor",
        class: "decrementor",
      },
      content: "-",
    },
  ],
});
inputMap.set("checkbox", {
  tag: "div",
  attributes: {
    id: 'input-container',
    class: 'input-container',
  },
  children: [
    {
      tag: "div",
      attributes: {
        class: 'checkbox'
      }
    },
    {
      tag: "input",
      attributes: {
        type: "text",
        class: 'input-option border',
        placeholder: 'Option',
        required: false,
      },
    },
    {
      tag: "button",
      attributes: {
        id: "decrementor",
        class: "decrementor",
      },
      content: "-",
    },
  ],
});
inputMap.set("text", {
  tag: "div",
  attributes: {
    class: 'input-type-text'
  },
  children: [
    {
      tag: "input",
      attributes: {
        type: "text",
        class: "input-option border",
        placeholder: 'Text',
        disabled: true,
        required: false,
      },
    },
    {
      tag: 'div',
      attributes: {
        class: 'length-container'
      },
      children: [
        {
          tag: 'label',
          attributes: {
    
          },
          content: 'Text Length : '
        },
        {
          tag: 'input',
          attributes: {
            type: 'number',
            placeholder: 'Minimum',
            id: 'min-length',
            class: 'text-length border',
            min: 0,
            required: true
          }
        },
        {
          tag: 'label',
          attributes: {
    
          },
          content: 'to'
        },
        {
          tag: 'input',
          attributes: {
            type: 'number',
            placeholder: 'Maximum',
            id: 'max-length',
            class: 'text-length border',
            required: true
          }
        },
      ],
    }
  ],
});
inputMap.set("date", {
  tag: "div",
  attributes: {
    class: 'input-type-date'
  },
  children: [
    {
      tag: "input",
      attributes: {
        type: "text",
        class: 'input-option border',
        placeholder: 'Date,Month, Year',
        required: false,
        disabled: true,
      },
    },
  ],
});
inputMap.set("number", {
  tag: "div",
  attributes: {
    class: 'input-type-number'
  },
  children: [
    {
      tag: "input",
      attributes: {
        type: "text",
        class: "input-option border",
        placeholder: 'Number',
        disabled: true,
        required: false,
      },
    },
    {
      tag: 'div',
      attributes: {
        class: 'length-container'
      },
      children: [
        {
          tag: 'label',
          attributes: {
    
          },
          content: 'Range : '
        },
        {
          tag: 'input',
          attributes: {
            type: 'number',
            placeholder: 'Minimum',
            id: 'min-length',
            class: 'text-length border',
            required: true
          }
        },
        {
          tag: 'label',
          attributes: {
    
          },
          content: 'to'
        },
        {
          tag: 'input',
          attributes: {
            type: 'number',
            placeholder: 'Maximum',
            id: 'max-length',
            class: 'text-length border',
            required: true
          }
        },
      ],
    }
  ],
});
inputMap.set("time", {
  tag: "div",
  attributes: {
    class: 'input-type-time'
  },
  children: [
    {
      tag: "input",
      attributes: {
        type: "text",
        class: 'input-option border',
        placeholder: 'Time',
        required: false,
        disabled: true,
      },
    },
  ],
});
inputMap.set("file", {
  tag: "div",
  attributes: {
    id: 'input-type-file'
  },
  children: [
    {
      tag: 'div',
      attributes: {
        id: 'file-input-container',
        class: 'file-input-container',
      },
      children: [
        {
          tag: 'label',
          attributes: {
    
          },
          content: 'File Types : '
        },
        {
          tag: 'input',
          attributes: {
            type: 'Text',
            placeholder: 'pdf,jpg,doc',
            id: 'file-formats',
            class: 'input-option border',
            required: false
          },
          style: {
            width: '50%'
          }
        },
      ]
    },
    {
      tag: 'div',
      attributes: {
        id: 'file-input-container',
        class: 'file-input-container',
      },
      children: [
        {
          tag: 'label',
          attributes: {
    
          },
          content: 'Maximum number of files : '
        },
        {
          tag: 'input',
          attributes: {
            type: 'number',
            id: 'number-of-files',
            class: 'input-option border',
            value: 1,
            min:1,
            required: false
          }
        },
      ]
    },
    {
      tag: 'div',
      attributes: {
        id: 'file-input-container',
        class: 'file-input-container',
      },
      children: [
        {
          tag: 'label',
          attributes: {
    
          },
          content: 'Maximum file size : '
        },
        {
          tag: 'input',
          attributes: {
            type: 'Text',
            placeholder: '500KB',
            id: 'file-size',
            class: 'input-option border',
            required: false
          }
        },
      ]
    },
  ],
});

const formInputMap = new Map();

formInputMap.set("multiple choice", {
  tag: 'div',
  attributes: {
      class: 'input-container'
  },
  children: [
    {
      tag: 'input',
      attributes: {
        type: 'radio',
        class: 'form-input-radio',
      }
    },
    {
      tag: 'label',
      attributes: {
  
      },
      content: ''
    }
  ]
});

formInputMap.set("checkbox", {
  tag: 'div',
  attributes: {
      class: 'input-container'
  },
  children: [
    {
      tag: 'input',
      attributes: {
        type: 'checkbox',
        class: 'form-input-checkbox',
      }
    },
    {
      tag: 'label',
      attributes: {
  
      },
      content: ''
    }
  ]
});

formInputMap.set("text", {
    tag: 'input',
    attributes: {
      type: 'text',
      class: 'form-input-text'
    }
});

formInputMap.set("date", {
  tag: 'input',
  attributes: {
    type: 'date',
    class: 'form-input-date'
  }
});

formInputMap.set("number", {
  tag: 'input',
  attributes: {
    type: 'number',
    class: 'form-input-number'
  }
});

formInputMap.set("time", {
  tag: 'input',
  attributes: {
    type: 'time',
    class: 'form-input-time'
  }
});

formInputMap.set("file", {
  tag: 'input',
  attributes: {
    type: 'file',
    class: 'form-input-file'
  }
});


export { inputMap, formInputMap };


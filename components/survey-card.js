const surveyCard = {
    tag: 'div',
    attributes: {
        id: 'new-survey-card',
        class: 'new-survey-card',
    },
    children: [
        {
            tag: 'p',
            attributes: {
                id: 'new-survey-card-question',
                class: 'new-survey-card-question',
            },
        },
        {
            tag: 'div',
            attributes: {
                id: 'input-area',
                class: 'input-area',
            },
        }
    ]
}

export default surveyCard;
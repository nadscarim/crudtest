const initialState = {
    messages: []
}

// each strategy returns a new state
const strategy = {
    FETCH_MESSAGES: (state, action) => {
        return {...state, ...action.payload}
    },
    CREATE_MESSAGE: (state, action) => {
        console.log('received')
        return {
            ...state,
            messages: [
                ...state.messages,
                action.payload
            ]
        }
    },
    // SOCKET_CREATE_MESSAGE: (state, action) => {
    //     console.log('sent')
    //     return {...state}
    // },
}

export default (state = initialState, action) => {
    if (!(action.type in strategy)) return state
    return strategy[action.type](state, action)
}
export const initialState = {
    data: {
        list: [],
        pages: 0
    },
    modal: {
        visible: false,
        status: null,
        data: {}
    },
    reload: false,
    tableInstance: null
}

const reducers = {
    SET_HOME_STATE: (state, action) => ({ ...state, ...action.payload })
}

export default (state = initialState, action) => {
    if (!(action.type in reducers)) {
        return state
    }
    const newState = reducers[action.type](state, action)
    return newState
}

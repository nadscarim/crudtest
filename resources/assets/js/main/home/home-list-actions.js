import { axios } from 'Shared/bootstrap'
import moment from 'moment'
import TmjPrompt from '../../shared/TmjPrompt'

export const setModuleState = (payload) => async (dispatch) => {
    dispatch({
        type: 'SET_HOME_STATE',
        payload
    })
}

export const getTasks = () => async (dispatch) => {
    const response = await axios.post('/home/get')

    const {
        tasks
    } = response.data

    console.log(tasks)

    dispatch({
        type: 'SET_HOME_STATE',
        payload: {
            data: {
                list: tasks,
                pages: 0
            }
        }
    })
}

export const toggleModal = (params) => async (dispatch) => {
    let modal = params
    const {
        status,
        data
    } = modal

    if (modal.status === 'edit') {
        const form = {
            id: data.id,
            task_title: data.task_title,
            comment: data.comment
        }

        modal.data = {
            ...form
        }
    }

    dispatch({
        type: 'SET_HOME_STATE',
        payload: {
            modal: {
                ...modal
            }
        }
    })
}

export const deleteTask = async (id, reload) => {
    const form = {
        id
    }

    return TmjPrompt.warning('Are you sure?').then(async (isConfirmed) => {
        if (isConfirmed.value) {
            axios.post('/home/delete', form).then((response) => {
                if (response.data.error) {
                    return TmjPrompt.error('Oh no')
                }
                return TmjPrompt.success('Congrats').then(() => {
                    reload()
                })
            })
        }
    })
}

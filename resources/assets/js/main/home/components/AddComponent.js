import axios from 'axios'
import React from 'react'
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Form
} from 'reactstrap'
import TmjPrompt from '../../../shared/TmjPrompt'

const AddComponent = (props) => {
    const {
        modal, updateState, reload, toggle
    } = props

    const {
        visible, status, data
    } = modal

    const onCloseModal = () => {
        toggle()
    }

    const updateModalFields = (items = {}) => {
        updateState({
            modal: {
                ...modal,
                data: {
                    ...data,
                    ...items
                }
            }
        })
    }

    const setModalFields = (event) => {
        const {
            name,
            value
        } = event.target

        updateModalFields({
            [name]: value
        })
    }

    const saveTask = async () => {
        try {
            const form = {
                ...data
            }

            return TmjPrompt.warning('Are you sure?').then(async (isConfirmed) => {
                if (isConfirmed.value) {
                    axios.post('/home/save', form).then((response) => {
                        if (response.data.error) {
                            return TmjPrompt.error('Oh no')
                        }
                        return TmjPrompt.success('congrats').then(() => {
                            reload()
                            onCloseModal()
                        })
                    })
                }
            })
        } catch (error) {
            return console.log(error)
        }
    }

    const updateTask = () => {
        try {
            const form = {
                ...data
            }
            return TmjPrompt.warning('Are you sure?').then(async (isConfirmed) => {
                if (isConfirmed.value) {
                    axios.post('/home/update', form).then((response) => {
                        if (response.data.error) {
                            return TmjPrompt.error('Oh no')
                        }
                        return TmjPrompt.success('congrats').then(() => {
                            reload()
                            onCloseModal()
                        })
                    })
                }
            })
        } catch (error) {
            return console.log(error)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (status === 'add') {
            return saveTask()
        }

        return updateTask()
    }

    return (
        <>
            <Modal isOpen={visible}>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="col-md mb-0">
                        <ModalHeader>{status === 'add' ? 'Add Task' : 'Edit Task'}</ModalHeader>
                        <ModalBody>
                            <div>
                                <FormGroup className="col-md mb-0">

                                    <Label for="task_title" className="col-form-label col-form-label-sm">
                                        Task Title:
                                    </Label>
                                    <Input
                                        type="text"
                                        name="task_title"
                                        value={data.task_title || ''}
                                        onChange={setModalFields}
                                    />
                                </FormGroup>
                                <FormGroup className="col-md mb-0">
                                    <Label for="comment" className="col-form-label col-form-label-sm">Comment</Label>
                                    <Input
                                        type="textarea"
                                        name="comment"
                                        value={data.comment || ''}
                                        onChange={setModalFields}
                                    />
                                </FormGroup>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary">
                                Submit
                            </Button>

                            <Button onClick={onCloseModal}>
                                Cancel
                            </Button>
                            {' '}
                        </ModalFooter>
                    </FormGroup>
                </Form>
            </Modal>
        </>
    )
}

export default AddComponent

// import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
    Button, Container, Row, Col
} from 'reactstrap'
import useHomeState from './hooks/useHomeState'
import {
    toggleModal, setModuleState, getTasks, deleteTask
} from './home-list-actions'
import AddComponent from './components/AddComponent'
import TasksComponent from './components/TasksComponent'

const LoginContainer = () => {
    const dispatch = useDispatch()
    const data = useHomeState('data')
    const modal = useHomeState('modal')
    const reload = useHomeState('reload')

    const pageReload = () => {
        dispatch(setModuleState({ reload: !reload }))
    }

    const setModal = (status = null, selectedData = {}) => {
        let items = {
            visible: !modal.visible,
            status,
            data: selectedData
        }

        dispatch(toggleModal(items))
    }

    const updateState = (item) => dispatch(setModuleState({ ...item }))

    const fetchData = () => dispatch(getTasks())

    useEffect(() => {
        fetchData()
    }, [reload])

    return (
        <>
            <Container className="container">
                <Row className="mb-3">
                    <Col className="float">
                        <div className="row justify-content-between p-3">
                            <div className="mr-1">
                                <Button
                                    color="primary"
                                    size="sm"
                                    onClick={() => setModal('add')}
                                    className="mr-1"
                                >
                                    <i className="fa fa-plus m-1" aria-hidden="true" />
                                    Add Task
                                </Button>
                            </div>
                        </div>
                        <AddComponent
                            modal={modal}
                            toggle={setModal}
                            updateState={updateState}
                            reload={pageReload}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="float">

                        <TasksComponent
                            data={data.list || []}
                            onFetchData={fetchData}
                            onDelete={deleteTask}
                            setModal={setModal}
                            reload={pageReload}
                        />

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginContainer

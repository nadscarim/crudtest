/* eslint-disable */
import React, {useEffect} from 'react'
import { FaTimes } from 'react-icons/fa'
import {AiFillEdit} from 'react-icons/ai'

const Task = (props) => {
    const {
        taskItems,
        onDelete,
        reload,
        setModal,
    } = props

    return (
        
        <div className={`task ${taskItems.id ? 'reminder': ''}`}>
            <div className='asd'>
                <h3> {taskItems.task_title}{' '} </h3>
                <div >
                    <AiFillEdit onClick={() => setModal('edit', taskItems)} /> <FaTimes onClick={() => onDelete(taskItems.id, reload)} />
                </div>
            </div>
            <p>{taskItems.comment}</p>
        </div>
    )
}

export default Task


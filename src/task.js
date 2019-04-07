import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import './app.css'


const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
    margin-right: 8px;
`;

/*const backgroundColor = props => props.isDragging ? 'lightgreen' : 'white';*/

class TaskContainer extends React.Component {
    render(){
        const { provided, snapshot, innerRef } = this.props;
        const isDragging = this.props.isDragging ? ' isDragging' : ''
        return(
            <div className={'task-container' + isDragging}
                {...provided.draggableProps}
                ref={innerRef}
            >
                <Handle {...provided.dragHandleProps}/>
                { this.props.task.content }
            </div>
        )
    }
}

export default class Task extends React.Component {
    render() {

        return (
            <Draggable
                draggableId={ this.props.task.id }
                index={ this.props.index }
            >
                { (provided, snapshot) => (
                    <TaskContainer
                        provided={provided}
                        snapshot={snapshot}
                        isDragging={snapshot.isDragging}
                        innerRef={provided.innerRef}
                        task={ this.props.task}
                    />
                )}
            </Draggable>
        )
    }
}
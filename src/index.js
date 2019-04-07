import React from 'react';
import ReactDOM from 'react-dom';

import { DragDropContext } from "react-beautiful-dnd";
import initialData from './initial-data';
import Column from './column';



class App extends React.Component {
    state = initialData;

    onDragStart = () => {
        //document.body.style.color = 'orange';
    };

    onDragUpdate = () => {

    }

    onDragEnd = result => {
        //document.body.style.color = 'inherit';

        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if ( /*user dropped item in same position*/
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const column = this.state.columns[source.droppableId];

        /*clone the array*/
        const newTaskIds = Array.from(column.taskIds);

        /*remove one id from position source.index*/
        newTaskIds.splice(source.index, 1);

        /* insert draggable id at position destination.index */
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = { ...column, taskIds: newTaskIds };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newColumn.id]: newColumn,
            },
        };

        this.setState(newState);
    };

    render(){
        return (
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
                onDragUpdate={this.onDragUpdate}
            >
                {this.state.columnOrder.map((columnId) => {
                    const column = this.state.columns[columnId];
                    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                    return <Column key={column.id} column={column} tasks={tasks}/>
                })}
            </DragDropContext>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

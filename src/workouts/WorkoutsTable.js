import React from 'react';
import { Table, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const WorkoutTable = (props) => {

    return (
        <div>
            <h3>History</h3>
            <hr />
            <Table hover striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Novel</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Review</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.workouts.map((workout, id) => {
                            console.log(props)
                            return (
                                <tr key={id}>
                                    <td className="logNumber">{workout.id}</td>
                                    <td><a href={workout.url}>{workout.novel}</a></td>
                                    <td>{workout.author}</td>
                                    <td className="genre">{workout.description}</td>
                                    <td>{workout.review}</td>
                                    <td><form onSubmit={props.update} >
                                    <textarea onChange={props.handleChange} id="review" type="text" name="update"></textarea>
                                    <Button id={workout.id} type="submit" color="primary" onClick={props.update}> Review </Button>
                                    </form></td>
                                    <td><Button id={workout.id} onClick={props.delete} color="danger">Delete</Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default WorkoutTable;
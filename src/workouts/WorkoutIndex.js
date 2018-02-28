import React from 'react';
import WorkoutCreate from './WorkoutCreate';
import { Container, Row, Col } from 'reactstrap';
import WorkoutsTable from './WorkoutsTable';

// this works with the current workout log server, if there server is on a differnt port, they need to change the respective lines for fetch

class WorkoutIndex extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            update: '',
            review: '',
            workouts: []
        }

        this.fetchWorkouts = this.fetchWorkouts.bind(this);
        this.updateWorkoutsArray = this.updateWorkoutsArray.bind(this);
        this.updateWorkouts = this.updateWorkouts.bind(this);
        this.workoutDelete = this.workoutDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentWillMount(){
        this.fetchWorkouts()
    }

    fetchWorkouts(){
        console.log(this.props)
        fetch("http://localhost:3000/api/log", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
              })
        })
        .then((res) => res.json())
        .then((logData) => {
            return this.setState({workouts: logData})
        })
    }
    updateWorkouts(event){
        event.preventDefault()
        console.log(event.target)
        fetch("http://localhost:3000/api/log", {
            method: 'PUT',
            body: JSON.stringify({log:{ review: this.state.update, id: event.target.id }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => res.json())
            .then((logData) => {
                return this.setState({workouts: logData})
            })
            .then(()=>{this.fetchWorkouts()})
        }
    updateWorkoutsArray(){
        this.fetchWorkouts()
    }

    

    workoutDelete(event){
        fetch("http://localhost:3000/api/log", {
            method: 'DELETE',
            body: JSON.stringify({log: {id:event.target.id}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
              })
        })
        .then((res) => this.updateWorkoutsArray())
    }

    render() {
        console.log(this.state.update)
        const workouts = this.state.workouts.length >= 1 ? <WorkoutsTable workouts={this.state.workouts} token={this.props.token} delete={this.workoutDelete} handleChange={this.handleChange} update={this.updateWorkouts}/> : <h2>Input a book</h2> 

        return (
            <Container>
            <Row>
                <Col md="2">
                    <WorkoutCreate token = {this.props.token} updateWorkoutsArray={this.updateWorkoutsArray}/>
                </Col>
                <Col md="10">
                    {workouts}
                </Col>
            </Row>
        </Container>
        )
    }
}

export default WorkoutIndex
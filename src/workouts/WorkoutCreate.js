import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class WorkoutCreate extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            novel: '',
            description: '',
            def: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleSubmit(event) {
        event.preventDefault();

        fetch("http://localhost:3000/api/log", {
            method: 'POST',
            body: JSON.stringify({ log: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => res.json())
            .then((logData) => {
                this.props.updateWorkoutsArray()
                // this is where you would clear out the fields 
            })
    }

    render() {
        return (
            <div>
                <h3>Submit a Book</h3>
                <hr />
                <Form onSubmit={this.handleSubmit} >
                    {/* novel */}
                    <FormGroup>
                        <Label for="novel">Novel</Label>
                        <Input id="novel" type="text" name="novel" placeholder="enter novel" onChange={this.handleChange} />
                    </FormGroup>
                    {/* author */}
                    <FormGroup>
                    <Label for="author">Author</Label>
                    <Input id="author" type="text" name="author" placeholder="enter author" onChange={this.handleChange} />
                    </FormGroup>
                    {/* description */}
                    <FormGroup>
                        <Label for="description">Genre</Label>
                        <Input id="description" type="text" name="description" placeholder="enter genre" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                    <Label for="url">Store URL</Label>
                    <Input id="url" type="text" name="url" placeholder="enter url" onChange={this.handleChange} />
                    </FormGroup>
                    <Button type="submit" color="primary"> Submit </Button>
                </Form>
            </div>
        )
    }
}

export default WorkoutCreate;
import React from "react";
import { Segment, Form } from "semantic-ui-react";

export class AddTodoList extends React.Component {
  handleChange = e => {
    this.props.onListNameChange(e.target.value);
  };

  handleClick = () => {
    this.props.onAddList();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleClick();
  };

  render() {
    return (
      <Segment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              width={14}
              fluid
              type="text"
              value={this.props.listName}
              placeholder="Enter a name for your new list"
              onChange={this.handleChange}
            />
            <Form.Button
              width={2}
              basic
              primary
              floated="right"
              content="Add List"
              disabled={!this.props.listName}
            />
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}

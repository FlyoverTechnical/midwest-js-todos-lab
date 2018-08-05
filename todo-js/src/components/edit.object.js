import React from "react";
import { Form } from "semantic-ui-react";

export class EditUpdateDeleteObject extends React.Component {
  handleSubmit = (e, objId) => {
    e.preventDefault();
    this.handleUpdateButtonClick(objId);
  };

  handleNameChange = e => {
    this.props.onNameChange(e.target.value);
  };

  handleUpdateButtonClick = objId => () => {
    this.props.onUpdateObject(objId);
    this.props.toggleOff();
  };

  handleDeleteButtonClick = objId => () => {
    this.props.onDeleteObject(objId);
  };

  render() {
    const { object, updatedName } = this.props;
    return (
      <Form onSubmit={e => this.handleSubmit(e, object.id)}>
        <Form.Group inline>
          <Form.Input
            width={12}
            fluid
            type="text"
            placeholder="Enter text"
            value={updatedName}
            onChange={this.handleNameChange}
          />
          <Form.Button
            width={2}
            fluid
            primary
            basic
            onClick={this.handleUpdateButtonClick(object.id)}
            content="Update"
            disabled={!updatedName}
          />
          <Form.Button
            width={2}
            fluid
            negative
            basic
            onClick={this.handleDeleteButtonClick(object.id)}
            content="Delete"
          />
        </Form.Group>
      </Form>
    );
  }
}

import React from "react";
import { Form, List, Checkbox } from "semantic-ui-react";
import { EditUpdateDeleteObject } from "./edit.object";

export class TodoList extends React.Component {
  state = { editing: "", updatedItemName: "", items: [] };

  componentDidMount() {
    this.setState({ items: this.props.items });
  }

  toggleEditingOff = () => {
    this.setState({ editing: "" });
  };

  handleItemNameClick = (itemId, itemName) => {
    this.handleItemNameChange(itemName);
    this.setState({ editing: itemId });
  };

  handleItemNameChange = itemName => {
    this.setState({ updatedItemName: itemName });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAddItem(this.props.index, this.props.listId);
  };

  handleDeleteItem = (listId, itemId) => {
    fetch(`/api/todos/${listId}/items/${itemId}`, {
      method: "DELETE",
      credentials: "same-origin"
    }).then(response => {
      this.setState(({ items = [] }) => ({
        items: items.filter(item => item.id !== itemId)
      }));
    });
  };

  handleUpdateItem = (todoId, itemId) => {
    const updatedItem = {
      name: this.state.updatedItemName,
      todoId
    };
    fetch(`/api/todos/${todoId}/items/${itemId}`, {
      method: "PUT",
      credentials: "same-origin",
      body: JSON.stringify(updatedItem),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }).then(() => {
      this.setState(({ items = [], updatedItemName }) => ({
        items: items.map(item => {
          if (item.id === itemId) {
            item.name = updatedItemName;
          }
          return item;
        }),
        updatedItemName: ""
      }));
    });
  };

  handleItemCheckboxChange = (listId, itemId) => {
    let itemToToggle = this.state.items.filter(item => item.id === itemId)[0];
    itemToToggle.completed = !itemToToggle.completed;
    itemToToggle.todoId = listId;

    fetch(`/api/todos/${listId}/items/${itemId}`, {
      method: "PUT",
      credentials: "same-origin",
      body: JSON.stringify(itemToToggle),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }).then(() => {
      this.setState(({ items = [] }) => ({
        items: items.map(item => {
          if (item.id === itemId) {
            item.completed = itemToToggle.completed;
          }
          return item;
        }),
        updatedItemName: ""
      }));
    });
  };

  render() {
    const { editing, updatedItemName, items } = this.state;
    const {
      listId,
      onItemAdderNameChange,
      index,
      itemAdderName
    } = this.props;

    const renderedItems =
      items &&
      items.map(item => {
        if (editing === item.id) {
          return (
            <List.Item key={item.id} className="u-pV">
              <EditUpdateDeleteObject
                object={item}
                updatedName={updatedItemName}
                onDeleteObject={itemId => this.handleDeleteItem(listId, itemId)}
                onUpdateObject={itemId => this.handleUpdateItem(listId, itemId)}
                onNameChange={this.handleItemNameChange}
                toggleOff={this.toggleEditingOff}
              />
            </List.Item>
          );
        } else {
          return (
            <List.Item key={item.id} className="u-pV">
              <List.Content floated="left">
                <List.Description
                  onClick={() => this.handleItemNameClick(item.id, item.name)}
                >
                  {item.name}
                </List.Description>
              </List.Content>
              <List.Content floated="right">
                <Checkbox
                  floated="right"
                  checked={item.completed || false}
                  onChange={() =>
                    this.handleItemCheckboxChange(listId, item.id)
                  }
                />
              </List.Content>
            </List.Item>
          );
        }
      });

    return [
      <Form onSubmit={this.handleSubmit} key="form">
        <Form.Group className="u-pV">
          <Form.Input
            width={14}
            type="text"
            placeholder="What needs to be done?"
            value={itemAdderName}
            onChange={e => onItemAdderNameChange(index, e.target.value)}
          />
          <Form.Button
            width={2}
            positive
            basic
            floated="right"
            content="Add"
            disabled={!itemAdderName}
          />
        </Form.Group>
      </Form>,
      <List key="list" divided verticalAlign="middle">
        {renderedItems}
      </List>
    ];
  }
}

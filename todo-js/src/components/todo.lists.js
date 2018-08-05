import React from "react";
import { Button, Segment } from "semantic-ui-react";
import { EditUpdateDeleteObject } from "./edit.object";
import { TodoList } from "./todo.list";

export class TodoLists extends React.Component {
  state = { editing: "" };

  toggleEditingOff = () => {
    this.setState({ editing: "" });
  };

  handleListNameClick = (listId, listName) => {
    this.props.onListNameChange(listName);
    this.setState({ editing: listId });
  };

  renderNameOrEditField = list => {
    if (this.state.editing === list.id) {
      return (
        <EditUpdateDeleteObject
          object={list}
          updatedName={this.props.updatedListName}
          onDeleteObject={this.props.onDeleteList}
          onUpdateObject={this.props.onUpdateList}
          onNameChange={this.props.onListNameChange}
          toggleOff={this.toggleEditingOff}
        />
      );
    } else {
      return (
        <h3 onClick={() => this.handleListNameClick(list.id, list.name)}>
          {list.name}{" "}
          <Button
            negative
            basic
            floated="right"
            onClick={() => this.props.onDeleteList(list.id)}
          >
            Delete
          </Button>
        </h3>
      );
    }
  };

  render() {
    const { lists, onItemAdderNameChange, onAddItem, itemAdders } = this.props;
    return (
      <div>
        {lists.map((list, index) => (
          <Segment key={list.id}>
            {this.renderNameOrEditField(list)}
            <TodoList
              index={index}
              listId={list.id}
              items={list.items}
              onItemAdderNameChange={onItemAdderNameChange}
              onAddItem={onAddItem}
              itemAdderName={itemAdders[index]}
            />
          </Segment>
        ))}
      </div>
    );
  }
}

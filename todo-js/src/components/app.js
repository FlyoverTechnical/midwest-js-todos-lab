import React from "react";
import { Container, Header } from "semantic-ui-react";
import { TodoLists } from "./todo.lists";
import { AddTodoList } from "./add.todo.list";

import "./app.css";

export class App extends React.Component {
  state = {
    todoLists: [],
    newListName: "",
    updatedListName: "",
    todoItemAdders: []
  };

  componentDidMount() {
    fetch("/api/todos", {
      method: "GET",
      credentials: "same-origin"
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          todoLists: json,
          todoItemAdders: new Array(json.length).fill("")
        });
      });
  }

  handleItemAdderNameChange = (index, name) => {
    this.setState(({ todoItemAdders }) => {
      todoItemAdders[index] = name;
      return { todoItemAdders };
    });
  };

  handleNewListNameChange = newListName => {
    this.setState({ newListName });
  };

  handleUpdatedListNameChange = updatedListName => {
    this.setState({ updatedListName });
  };

  handleNewList = () => {
    let newList = {
      name: this.state.newListName,
      items: []
    };

    fetch("/api/todos", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify(newList),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .then(json => {
        this.setState(({ todoLists }) => ({
          todoLists: [...todoLists, json],
          newListName: ""
        }));
      });
  };

  handleNewItem = (index, todoId) => {
    let newItem = {
      name: this.state.todoItemAdders[index],
      todoId
    };

    fetch("/api/items", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify(newItem),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .then(json => {
        this.setState(({ todoLists, todoItemAdders }) => {
          todoItemAdders[index] = "";
          return {
            todoLists: todoLists.map(todoList => {
              if (todoList.id === todoId) {
                todoList.items.push(json);
              }
              return todoList;
            }),
            todoItemAdders
          };
        });
      });
  };

  handleUpdateList = todoId => {
    let updatedList = {
      name: this.state.updatedListName
    };
    fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      credentials: "same-origin",
      body: JSON.stringify(updatedList),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }).then(response => {
      this.setState(({ todoLists, updatedListName }) => ({
        todoLists: todoLists.map(todoList => {
          if (todoList.id === todoId) {
            todoList.name = updatedListName;
          }
          return todoList;
        }),
        updatedListName: ""
      }));
    });
  };

  handleDeleteList = todoId => {
    fetch(`/api/todos/${todoId}`, {
      method: "DELETE",
      credentials: "same-origin"
    }).then(() =>
      this.setState(({ todoLists }) => ({
        todoLists: todoLists.filter(todoList => todoList.id !== todoId)
      }))
    );
  };

  render() {
    return (
      <Container className="u-pV">
        <Header as="h2">
          <Header.Content>
            Todos Again?
            <Header.Subheader>
              Another Todo Demo For a Workshop
            </Header.Subheader>
          </Header.Content>
        </Header>
        <TodoLists
          lists={this.state.todoLists}
          itemAdders={this.state.todoItemAdders}
          updatedListName={this.state.updatedListName}
          onDeleteList={this.handleDeleteList}
          onUpdateList={this.handleUpdateList}
          onListNameChange={this.handleUpdatedListNameChange}
          onItemAdderNameChange={this.handleItemAdderNameChange}
          onAddItem={this.handleNewItem}
        />
        <AddTodoList
          listName={this.state.newListName}
          onAddList={this.handleNewList}
          onListNameChange={this.handleNewListNameChange}
        />
      </Container>
    );
  }
}

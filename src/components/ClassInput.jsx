/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import Count from "./Count.jsx";

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { title: "Just some demo tasks", edit: false },
        { title: "As an example", edit: false },
      ],
      inputVal: "",
      editInputVal: "",
      prevTodoTitle: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditInputChange = this.handleEditInputChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleEditInputChange(e) {
    this.setState((state) => ({
      ...state,
      editInputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat({ title: state.inputVal, edit: false }),
      inputVal: "",
      editInputVal: "",
    }));
  }

  handleEditSubmit(e) {
    e.preventDefault();

    let index = this.state.todos.findIndex(
      (todo) => todo.title === this.state.prevTodoTitle
    );
    let editedArray = [...this.state.todos];
    editedArray[index] = { title: this.state.editInputVal, edit: false };
    this.setState((state) => ({
      todos: editedArray,
      inputVal: "",
      editInputVal: "",
      prevTodoTitle: "",
    }));
  }

  handleDelete(deleteTodo) {
    let filteredTodos = this.state.todos.filter(
      (todo) => todo.title !== deleteTodo
    );
    this.setState((state) => ({
      todos: filteredTodos,
      inputVal: "",
      editInputVal: "",
    }));
  }

  handleEdit(editTodo) {
    let index = this.state.todos.findIndex((todo) => todo.title === editTodo);
    let editedArray = [...this.state.todos];
    editedArray[index].edit = true;
    this.setState((state) => ({
      todos: editedArray,
      inputVal: "",
      editInputVal: editTodo,
      prevTodoTitle: editTodo,
    }));
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <Count length={this.state.todos.length} />
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            <>
              <li key={todo.title}>
                {!todo.edit ? (
                  <>
                    {todo.title}
                    <button onClick={() => this.handleDelete(todo.title)}>
                      Delete
                    </button>
                    <button onClick={() => this.handleEdit(todo.title)}>
                      Edit
                    </button>
                  </>
                ) : (
                  <form onSubmit={this.handleEditSubmit}>
                    <input
                      type="text"
                      name="task-entry"
                      value={this.state.editInputVal}
                      onChange={this.handleEditInputChange}
                    ></input>
                    <button type="submit">Resubmit</button>
                  </form>
                )}
              </li>
            </>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;

import { Injectable } from '@angular/core';
import { TodoList } from '../models/TodoList';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {
    this.todoLists = JSON.parse(localStorage.getItem('listToken') || '[]');
    this.selectedList = JSON.parse(
      localStorage.getItem('selectedListToken') || 'null'
    );

    console.log(
      'todo-lists: ' + this.todoLists,
      'selected-list: ' + this.selectedList
    );
  }

  public todoLists: TodoList[] = [];
  public selectedList: TodoList | null = null;

  setSelectedList(newSelectedList: TodoList | null): void {
    this.selectedList = newSelectedList;

    localStorage.setItem(
      'selectedListToken',
      JSON.stringify(this.selectedList)
    );
  }

  addList(newListTitle: string): void {
    this.todoLists.push({
      id: this.todoLists.length,
      title: newListTitle,
      todos: [],
    });

    localStorage.setItem('listToken', JSON.stringify(this.todoLists));
    localStorage.setItem(
      'selectedListToken',
      JSON.stringify(this.selectedList)
    );

    console.log(this.todoLists);
  }

  renameList(newListTitle: { title: string; ID: number }): void {
    const list = this.todoLists.find((list) => list.id === newListTitle.ID);
    if (list) {
      list.title = newListTitle.title;
      if (this.selectedList) {
        this.selectedList.title = newListTitle.title;
      }

      localStorage.setItem('listToken', JSON.stringify(this.todoLists));
      localStorage.setItem(
        'selectedListToken',
        JSON.stringify(this.selectedList)
      );
    }
  }

  deleteList(id: number): void {
    this.todoLists = this.todoLists.filter((v, i) => i !== id);
    this.setSelectedList(null);

    localStorage.setItem('listToken', JSON.stringify(this.todoLists));
    localStorage.setItem(
      'selectedListToken',
      JSON.stringify(this.selectedList)
    );
  }

  addTodo(newTodo: string): void {
    this.selectedList?.todos.push({
      content: newTodo,
      completed: false,
    });

    localStorage.setItem('listToken', JSON.stringify(this.todoLists));
    localStorage.setItem(
      'selectedListToken',
      JSON.stringify(this.selectedList)
    );
  }

  deleteTodo(id: number): void {
    if (this.selectedList) {
      this.selectedList.todos = this.selectedList.todos.filter(
        (v, i) => i !== id
      );
    }

    localStorage.setItem('listToken', JSON.stringify(this.todoLists));
    localStorage.setItem(
      'selectedListToken',
      JSON.stringify(this.selectedList)
    );
  }

  toggleTodoDone(id: number): void {
    if (this.selectedList) {
      this.selectedList.todos.map((v, i) => {
        if (i == id) v.completed = !v.completed;
      });
    }

    localStorage.setItem('listToken', JSON.stringify(this.todoLists));
    localStorage.setItem(
      'selectedListToken',
      JSON.stringify(this.selectedList)
    );
  }
}

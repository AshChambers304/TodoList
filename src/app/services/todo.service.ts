import { Injectable } from '@angular/core';
import { TodoList } from '../models/TodoList';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {
    this.todoLists = JSON.parse(localStorage.getItem('listToken') || '[]');
    this.setSelectedList(
      JSON.parse(localStorage.getItem('selectedListToken') || 'null')
    );

    console.log(
      'todo-lists: ' + this.todoLists,
      'selected-list: ' + this.selectedList
    );
  }

  public todoLists: TodoList[] = [];
  public selectedList: TodoList | null = null;

  setSelectedList(newSelectedListID: number | undefined | null): void {
    const list = this.todoLists.find((list) => list.id === newSelectedListID);
    if (list) {
      this.selectedList = list;
    } else {
      this.selectedList = null;
    }

    localStorage.setItem(
      'selectedListToken',
      JSON.stringify(this.selectedList?.id)
    );
  }

  addList(newListTitle: string): void {
    const newID = this.todoLists.length;

    this.todoLists.push({
      id: newID,
      title: newListTitle,
      todos: [],
    });

    const list = this.todoLists.find((list) => list.id === newID);

    if (list) {
      this.setSelectedList(list.id);

      localStorage.setItem('listToken', JSON.stringify(this.todoLists));
      localStorage.setItem(
        'selectedListToken',
        JSON.stringify(this.selectedList?.id)
      );
    }

    console.log(list);
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
        JSON.stringify(this.selectedList?.id)
      );
    }
  }

  deleteList(id: number): void {
    this.todoLists = this.todoLists.filter((list) => list.id !== id);

    this.setSelectedList(null);

    localStorage.setItem('listToken', JSON.stringify(this.todoLists));
    localStorage.setItem(
      'selectedListToken',
      JSON.stringify(this.selectedList?.id)
    );
  }

  addTodo(newTodo: { todoContent: string; id: number }): void {
    const list = this.todoLists.find((list) => list.id === newTodo.id);
    if (list) {
      list.todos.push({
        content: newTodo.todoContent,
        completed: false,
      });

      this.setSelectedList(list.id);

      localStorage.setItem('listToken', JSON.stringify(this.todoLists));
      localStorage.setItem(
        'selectedListToken',
        JSON.stringify(this.selectedList?.id)
      );
    }
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
      JSON.stringify(this.selectedList?.id)
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
      JSON.stringify(this.selectedList?.id)
    );
  }
}

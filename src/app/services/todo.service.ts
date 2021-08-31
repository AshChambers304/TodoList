import { Injectable } from '@angular/core';
import { TodoList } from '../models/TodoList';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}

  public todoLists: TodoList[] = [];
  public selectedList: TodoList | null = null;

  setSelectedList(newSelectedList: TodoList | null): void {
    this.selectedList = newSelectedList;
  }

  addList(newListTitle: string): void {
    this.todoLists.push({
      title: newListTitle,
      todos: [],
    });
  }

  deleteList(id: number): void {
    this.todoLists = this.todoLists.filter((v, i) => i !== id);
    console.log('List deleted');
    this.setSelectedList(null);
  }

  addTodo(newTodo: string): void {
    this.selectedList?.todos.push({
      content: newTodo,
      completed: false,
    });
  }

  deleteTodo(id: number): void {
    if (this.selectedList) {
      this.selectedList.todos = this.selectedList.todos.filter(
        (v, i) => i !== id
      );
    }
  }

  toggleTodoDone(id: number): void {
    if (this.selectedList) {
      this.selectedList.todos.map((v, i) => {
        if (i == id) v.completed = !v.completed;
      });
    }
  }
}

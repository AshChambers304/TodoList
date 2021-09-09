import { Component, OnInit } from '@angular/core';
import { TodoList } from 'src/app/models/TodoList';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public todoLists: TodoList[] = this.todoService.todoLists;
  public selectedList: TodoList | null = this.todoService.selectedList;

  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  handleSelectedListEmitter(newSelectedList: TodoList | null): void {
    this.selectedList = newSelectedList;
    this.todoService.setSelectedList(this.selectedList);
  }

  handleListToDeleteEmitter(id: number): void {
    this.todoService.deleteList(id);
    this.todoLists = this.todoService.todoLists;
    this.selectedList = this.todoService.selectedList;
  }

  handleListTitleEmitter(listTitle: string) {
    this.todoService.addList(listTitle);
  }

  handleTodoToDeleteEmitter(id: number) {
    this.todoService.deleteTodo(id);
  }

  handleToggledDoneTodoEmitter(id: number) {
    this.todoService.toggleTodoDone(id);
  }

  handleTodoContentEmitter(todoContent: string) {
    this.todoService.addTodo(todoContent);
  }
}

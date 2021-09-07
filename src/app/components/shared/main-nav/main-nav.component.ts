import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TodoList } from 'src/app/models/TodoList';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  public todoLists: TodoList[] = this.todoService.todoLists;
  public selectedList: TodoList | null = this.todoService.selectedList;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private todoService: TodoService
  ) {}

  ngOnInit() {}

  handleSelectedListEmitter(newSelectedList: TodoList | null): void {
    this.selectedList = newSelectedList;
    this.todoService.setSelectedList(this.selectedList);
  }

  handleListToDeleteEmitter(id: number): void {
    this.todoService.deleteList(id);
    this.todoLists = this.todoService.todoLists;
    this.selectedList = this.todoService.selectedList;
    console.log('main-nav: ' + this.todoLists, this.selectedList);
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

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoList } from 'src/app/models/TodoList';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent {
  constructor() {}

  @Input() todoLists: TodoList[] = [];
  @Input() selectedList: TodoList | null = null;
  @Output() selectedListEmitter: EventEmitter<TodoList | null> =
    new EventEmitter<TodoList | null>();
  @Output() listToDeleteEmitter: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() listTitleEmitter: EventEmitter<string> = new EventEmitter<string>();

  handleSelectedListEmitter(newSelectedList: TodoList | null): void {
    this.selectedList = newSelectedList;
    this.selectedListEmitter.emit(this.selectedList);
  }

  handleListToDeleteEmitter(id: number): void {
    this.listToDeleteEmitter.emit(id);
  }

  handleListTitleEmitter(listTitle: string) {
    this.listTitleEmitter.emit(listTitle);
  }
}

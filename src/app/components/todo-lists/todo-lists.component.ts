import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TodoList } from '../../models/TodoList';
import { MatDialog } from '@angular/material/dialog';
import { AddListDialogComponent } from '../shared/add-list-dialog/add-list-dialog.component';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
})
export class TodoListsComponent implements OnInit {
  constructor(public dialog: MatDialog, public todoService: TodoService) {}

  @Input() todoLists: TodoList[] = [];
  @Input() selectedList: TodoList | null = null;
  @Output() selectedListEmitter: EventEmitter<TodoList | null> =
    new EventEmitter<TodoList | null>();

  ngOnInit(): void {
    this.todoLists = this.todoService.todoLists;
  }

  setSelectedList(newSelectedList: TodoList | null): void {
    this.todoService.setSelectedList(newSelectedList);
  }

  deleteList(id: number) {
    this.todoService.deleteList(id);
  }

  openDialog(): void {
    this.dialog.open(AddListDialogComponent);
  }
}

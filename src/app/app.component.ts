import { Component, OnInit } from '@angular/core';
import { TodoList } from './models/TodoList';
import { Todo } from './models/Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TodoList';

  constructor() {}

  ngOnInit() {}
}

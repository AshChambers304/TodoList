import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TodoList } from 'src/app/models/TodoList';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @Input() todoList: TodoList[] = [];
  @Input() selectedList: TodoList = {
    title: 'ListOne',
    todos: [
      { content: 'Test', completed: true },
      { content: 'Test2', completed: false },
    ],
  };

  constructor(private breakpointObserver: BreakpointObserver) {}
}

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

  public todoLists: TodoList[] = [];
  public selectedList: TodoList | null = null;

  constructor(private breakpointObserver: BreakpointObserver) {}

  handleSelectedListEmitter(newSelectedList: TodoList | null) {
    this.selectedList = newSelectedList;
  }
}

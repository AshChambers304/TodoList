import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './components/shared/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { TodoComponent } from './components/todo/todo.component';
import { TodoListsComponent } from './components/todo-lists/todo-lists.component';
import { AddListDialogComponent } from './components/shared/dialogs/add-list-dialog/add-list-dialog.component';
import { TodoService } from './services/todo.service';
import { EditListDialogComponent } from './components/shared/dialogs/edit-list-dialog/edit-list-dialog.component';
import { ModalModule } from './components/shared/modal/modal.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddTaskDialogComponent } from './components/shared/dialogs/add-task-dialog/add-task-dialog.component';
import { CalendarComponent } from './components/shared/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    TodoComponent,
    TodoListsComponent,
    AddListDialogComponent,
    EditListDialogComponent,
    AddTaskDialogComponent,
    CalendarComponent,
  ],
  entryComponents: [AddListDialogComponent, EditListDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    FontAwesomeModule,
  ],
  providers: [TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}

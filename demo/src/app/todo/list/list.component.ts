import {Component, OnChanges, ViewEncapsulation,SimpleChanges} from '@angular/core';
import {TodoService} from '../todo.service'
import {Todo} from '../todo';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  providers: [TodoService],
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.Native
})

export class TodoListComponent {
  selectedTodo: any;
  items: Todo[] = [];
  lists: any;

  constructor(
    private todoService: TodoService,
    private router: Router,
  ) {






      this.todoService.getHeadItem().then(
        (todos) => {
          this.items = todos;
          let type = this.selectedTodo ? this.selectedTodo :todos[0]
          this.todoService.getListItem(type).then(
            (lists) => {
              this.lists = lists
            }
          )
        }
      )

    console.log(this.todoService.itemList)
  }
  changeList(item): void {
    this.todoService.getListItem(item).then(
      (lists) => {
        this.lists = lists
        this.selectedTodo = item
        console.log( this.selectedTodo)
      }
    )
  }

  gotoDetail(list, index): void {
    this.router.navigate(['/todo/detail'], {queryParams: {type: this.selectedTodo, index: index}});
  }

}

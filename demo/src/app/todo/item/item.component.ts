import {Component} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'todo-item',
  templateUrl: './item.component.html',

})

export class TodoItemComponent{
    constructor(
      private router: Router,
    ){}
}

import {Component,OnChanges,Input} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {TodoService} from '../todo.service'
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'todo-item',
  templateUrl: './item.component.html',
  styleUrls:['./item.component.css'],
  providers:[TodoService]

})

export class TodoItemComponent implements OnChanges{

    itemList:any
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private todoService: TodoService,

    ){

    }

  ngOnChanges(){
    let type = this.route.snapshot.queryParams['type'];
    this.todoService.getListItem( type ).then(
      (itemList) => this.itemList = itemList
    )
  }



}

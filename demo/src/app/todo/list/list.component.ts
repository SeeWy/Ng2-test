import {Component, OnInit, ViewEncapsulation,SimpleChanges} from '@angular/core';
import {TodoService} from '../todo.service'

import { ActivatedRoute, Router, Params } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import {isUndefined} from "util";

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  providers: [TodoService],
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.Native
})

export class TodoListComponent implements OnInit{
  selectedType: any;
  items:any = [];
  lists: any;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(){
    this.todoService.getHeadItem().then(
      (todos) => {
        console.log(todos)
        this.items = todos;
        if(this.route.snapshot.queryParams['type'] == undefined){
          let type =  this.items[0]
          this.router.navigate(['/todo/list'], {queryParams: {type: type}});
          this.todoService.getListItem(type).then(
            (lists) => {
              this.lists = lists
              this.selectedType = type
            }
          )
        }else{
          this.todoService.getListItem(this.route.snapshot.queryParams['type']).then(
            (lists) => {
              this.lists = lists
              this.selectedType = this.route.snapshot.queryParams['type']
            }
          )
        }
      }
    )
  }

  changeList(item): void {
    this.router.navigate(['/todo/list'], {queryParams: {type: item}});
    this.todoService.getListItem(item).then(
      (lists) => {
        this.lists = lists
        this.selectedType = item
      }
    )
  }

  gotoDetail(list, index): void {
    let type = this.route.snapshot.queryParams['type']
    this.router.navigate(['/todo/detail'], {queryParams: {type: type, index: index}});
  }



}

import {Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TodoService } from '../todo.service';

@Component({
  selector: 'todo-detail',
  templateUrl: './detail.component.html',
  styleUrls:['./detail.component.css']
})

export class TodoDetailComponent implements OnInit {
  // selectedTodo: Todo;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private todoService: TodoService
  ) {}
  infoData:any
  ngOnInit() {
    let index = this.route.snapshot.queryParams['index'];
    let type = this.route.snapshot.queryParams['type'];

    this.todoService.getListItem(type).then(
      (lists) =>{
        this.infoData = lists[index]
      }
    )
  }
}

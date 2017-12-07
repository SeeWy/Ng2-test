import {Injectable} from '@angular/core';
import {Todo} from './todo';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TodoService {

  // 为了生成一个自增的id,保存最后一个生成的id
  itemList:Todo
  lastId: number = 0;
  todos: string; // 任务列表
  lists:void
  selectedTodo:any
  selectType:number
  private headers = new Headers({'Content-Type': 'application/json'});
  private listBaseUrl =  "https://route.showapi.com/126-1?showapi_appid=51250&showapi_test_draft=false&showapi_sign=1074a3fed6514d3f921c5706e4cbc879&type=";
  private  albumBaseurl = "https://route.showapi.com/126-2?order=&page=&showapi_appid=51250&showapi_test_draft=false&showapi_sign=1074a3fed6514d3f921c5706e4cbc879";
  constructor(private http: Http) {}
// &showapi_timestamp=" + Date.parse(new Date())+"

  getHeadItem ():Promise<Todo[]> {
    return this.http.get(this.listBaseUrl)
      .toPromise()
      .then(
        response =>  this.todos = response.json().showapi_res_body.allTypeList
      )
      .catch(this.handleError);
  }
  getListItem (type:number):Promise<number> {

    let options = {search:{type: type}}
    this.selectedTodo = type
    return this.http.get(this.albumBaseurl,options)
      .toPromise()
      .then(
        response =>  this.lists = response.json().showapi_res_body.pagebean.contentlist
      )
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

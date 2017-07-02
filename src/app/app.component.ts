import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit  {
  gitUsers: string[];
  title = 'app works!';
  @ViewChild('searchInput') searchInput: ElementRef;

  constructor (private http: Http) {
    this.gitUsers = new Array<string>();
  }

  ngAfterViewInit(){
    console.log(this.searchInput.nativeElement.value);
    Observable.fromEvent(this.searchInput.nativeElement, 'keyup')
      .debounceTime(500)
      .pluck('target', 'value')
      .filter((value: string) => value.trim().length > 0)
      .map((values: string) => {
        return this.gitUsersSearch(values)
      })
      .forEach(data => {
          data.subscribe(
            (result: Response) => {
              console.log(result);
              let responseBody = result.json();    
              this.gitUsers.push(responseBody.html_url);
              console.log(this.gitUsers);
            }
          );
      });
  }
  gitUsersSearch(searchTerm: string){
    console.log("Inside gitUsersSearch");      
    return this.http.get("https://api.github.com/users/" + searchTerm);
  }
}

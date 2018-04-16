import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  input: string;
  domains: any = [];
  onUserInputChange = new Subject<string>();

  constructor(private http: HttpClient) {
    this.onUserInputChange
      .debounceTime(350)
      .distinctUntilChanged()
      .subscribe((value) => {
        this.getDomains(value);
      });
  }

  updateDomainList(input) {
    this.onUserInputChange.next(input);
  }

  /**
   * Makes a GET request for avalaible domains`
   */
  private getDomains(input: string) {
    this.http.get(`http://localhost:3000/${input}`).subscribe((value) => { this.domains = value; });
  }
}

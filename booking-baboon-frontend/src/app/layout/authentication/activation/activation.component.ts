import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../env/env";

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }
  ngOnInit(): void {
    // Access the query parameter
    const token: string|null = this.route.snapshot.queryParamMap.get('token');
    if (token == null) return
    console.log('Token:', token);
    this.http.get(environment.apiHost + 'users/activate' + '?token=' + token).subscribe()
  }

}

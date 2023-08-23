import { Component, OnInit, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';

import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';
import { environment } from 'src/environments/environment';

import { Event } from '@angular/router';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allMoments: Moment[] = []
  moments: Moment[] = [] // moments mesmo sendo o mesmo array é somente utilizado para view dos itens na página home
  baseApiUrl = environment.baseApiUrl

  // TODO: search
  faSearch= faSearch;
  searchTerm : string = "";

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      this.allMoments = items.data;

      this.allMoments.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');
      });

      //this.allMoments = data;
      this.moments = this.allMoments;

    });
  }

  search(e: any): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter(moment => {
      return moment.title.toLowerCase().includes(value);
    })
  }

}

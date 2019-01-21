import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SearchFilter } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class SearchDataService {
  searchModel: SearchFilter;  // search data object local to srvc
  private currentSearchModel = new Subject<SearchFilter>();  // current filter values which needs to be set in search filter

  constructor() {
    console.log('SearchDataService const: ', this.searchModel);
  }

  getCurrentSearchModel(): Observable<SearchFilter> {
    return this.currentSearchModel.asObservable();
  }

  getSearchData(): SearchFilter {
    return this.searchModel;
  }

  setSearchData(searchModel: SearchFilter): void {
    this.searchModel = Object.assign({}, searchModel);
    this.currentSearchModel.next(this.searchModel);
    console.log('searchModel', this.searchModel);
  }
}

import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SearchDataService } from '../../services/search-data.service';
import { SearchFilter, Product, Category } from '../../model/product';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit, OnChanges {
  @Input() productList: Array<Product>;
  @Input() categoryList: Array<Category>;

  @Output() filterList = new EventEmitter<SearchFilter[]>();

  searchInputValue: string;
  priceRange: string;
  filteredList;
  radioFilter: boolean;
  categoryDropdownFilter: string;
  searchFilter: any;

  constructor(private _searchDataService: SearchDataService) { }

  ngOnInit() {
    this.searchFilter = {
      searchInputValue: '',
      priceRange: '',
      category: ''
    };

    this._searchDataService.getCurrentSearchModel().subscribe((model: SearchFilter) => {
      this.searchFilter = model;
      this.searchProduct(true);
      console.log('*** received updated search model obj *** ', model);
    });
  }
  ngOnChanges() {
    this.filteredList = this.productList;
  }

  searchProduct(searchModelUpdated?: boolean): void {
    this.filteredList = this.productList;
    let filterFilteredList: Array<SearchFilter> = []; // --> give appropriate type
    const regex = new RegExp(this.searchFilter.searchInputValue, 'ig');

    for (const key of Object.keys(this.searchFilter)) {
      if (this.searchFilter[key].length) {
        if (key === 'searchInputValue') {
          this.filteredList = this.filteredList.filter(prod => {
            return prod.name.match(regex);
          });

          console.log('searchInputValue: ', this.filteredList);
        } else if (key === 'priceRange') {
          filterFilteredList = [];

          this.filteredList.forEach(prod => {
            if (this.searchFilter.priceRange === 'less' && prod.price < 5000) {
              filterFilteredList.push(prod);
            } else if (this.searchFilter.priceRange === 'more' && prod.price >= 5000) {
              filterFilteredList.push(prod);
            } else if (this.searchFilter.priceRange === 'noPriceRange') {
              filterFilteredList.push(prod);
            }
          });

          this.filteredList = filterFilteredList;
          // console.log('priceRange: ', this.filteredList);
        } else if (key === 'category') {
          filterFilteredList = [];

          this.filteredList.forEach(prod => {
            if (prod.categories.includes(parseInt(this.searchFilter.category, 10))) {
              filterFilteredList.push(prod);
            }
          });

          this.filteredList = filterFilteredList;
          // console.log('category: ', this.filteredList);
        }
      }
    }
    // console.log('\n\nfiltered: ', this.filteredList);
    this.filterList.emit(this.filteredList);

    if (!searchModelUpdated) {
      this._searchDataService.setSearchData(this.searchFilter);
    }
    // this._searchDataService.setSearchData(this.searchFilter);
  }

  removeFilter(): void {
    this.searchFilter = {
      searchInputValue: '',
      priceRange: '',
      category: ''
    };
    this.filteredList = this.productList;
    this.filterList.emit(this.filteredList);
  }

  // retrieve(): void {
  //   this.searchFilter = this._searchDataService.getSearchData();
  //   this.searchProduct();
  // }
}


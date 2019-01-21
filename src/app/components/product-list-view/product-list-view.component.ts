import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../../services/product-list.service';
import { Products, SearchFilter, Product, Category } from '../../model/product';

@Component({
  selector: 'app-product-list-view',
  templateUrl: './product-list-view.component.html',
  styleUrls: ['./product-list-view.component.scss']
})
export class ProductListViewComponent implements OnInit {
  productList: Array<Product>;
  categoryList: Array<Category>;
  filteredList;

  constructor(private _productListService: ProductListService) { }

  ngOnInit() {
    this._productListService.getProductsList().subscribe((data: Products) => {
      console.log(data);
      this.productList = data.products;
      this.categoryList = data.categories;
      this.filteredList = this.productList;
    });
  }

  onListFiltered(filteredList: SearchFilter): void {
    this.filteredList = filteredList;
    console.log('****', typeof(this.filteredList));
    console.log(this.filteredList.length);
  }

}

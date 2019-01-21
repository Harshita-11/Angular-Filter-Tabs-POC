export interface Products {
  categories: Array<Category>;
  products: Array<Product>;
}

export interface Product {
  name: string;
  itemLeft: number;
  price: number;
  categories: Array<number>;
  rating: number;
}

export interface Category {
  categoryId: number;
  categoryName: string;
}

export interface SearchFilter {
  searchInputValue: string;
  priceRange: string;
  category: string;
}

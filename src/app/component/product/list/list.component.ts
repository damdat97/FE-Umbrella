import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from "../../../model/product";
import {ProductService} from "../../../service/product.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products: Product[] | any;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct() {
    this.productService.getAll().subscribe(data => {
      this.products = data;
      console.log(data);
    }, error => {
      console.log(error);
    })
  }

  addToCart(event: any) {
    console.log(event)
  }
}

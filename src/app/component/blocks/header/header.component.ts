import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {Product} from "../../../model/product";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // products: Product[] = [];
  //
  // product:FormGroup=new FormGroup({
  //   name:new FormControl('')
  // })
  // name:any;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
  }

  // searchByName() {
  //   // @ts-ignore
  //   const name = this.product.value.name;
  //   this.productService.searchByName(name).subscribe((data) => {
  //     console.log(data)
  //     this.products = data;
  //   }, error => {
  //     console.log(error)
  //   })
  //
  // }
}

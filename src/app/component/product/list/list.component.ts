import {Component, OnInit} from '@angular/core';
import {Product} from "../../../model/product";
import {ProductService} from "../../../service/product.service";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products: Product[] | any;
  product:FormGroup=new FormGroup({
    name:new FormControl('')
  })
  constructor(private productService: ProductService,
              private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.getAllProduct()
    // this.getProducts()
  }

  getAllProduct() {
    this.productService.getAll().subscribe(data => {
      this.products = data;
      console.log(data);
    }, error => {
      console.log(error);
    })
  }
  searchByName() {
    const name = this.product.value.name;
    this.productService.searchByName(name).subscribe((data) => {
      console.log(data)
      this.products = data;
    }, error => {
      console.log(error)
    })

  }
  // product:any;
  // p: number = 1;
  // total: number = 0;
  // getProducts(){
  //   // @ts-ignore
  //   this.productService.getProducts(this.p)
  //     .subscribe((response: any) => {
  //       this.product = response.data;
  //       this.total = response.total;
  //     });
  // }
  // pageChangeEvent(event: number){
  //   this.p = event;
  //   this.getProducts();
  // }
}

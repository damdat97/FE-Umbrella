import {Component, OnInit} from '@angular/core';
import {ProductService} from "./service/product.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// @ts-ignore
export class AppComponent implements OnInit{

  constructor(private productService:ProductService) {

  }

  title = 'FE-Umbrella';

}

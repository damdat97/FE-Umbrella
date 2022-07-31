import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ImageService} from "../../../service/image.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {finalize} from "rxjs";

import {Category} from "../../../model/category";
import {CategoryService} from "../../../service/category.service";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    name: new FormControl(),
    categoryId: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl(),
    image: new FormControl(),
  })

  constructor(private router: Router,
              private productService: ProductService,
              private storage: AngularFireStorage,
              private imageService: ImageService,
              private categoryService: CategoryService) {
  }

  selectedImages: any[] = [];
  product: any;
  listCategory: Category[] = []
  idProductImage: any;
  images: any[] = [];

  ngOnInit(): void {
    this.getAllCategory();
  }


  add() {
    this.product = {
      name: this.productForm.value.name,
      category: {
        id: this.productForm.value.categoryId
      },
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      user: {
        id: localStorage.getItem('ID')
      },
      quantity: this.productForm.value.quantity
    }
    console.log(this.product)
    this.productService.save(this.product).subscribe((product) => {
      if (this.selectedImages.length !== 0) {
        for (let i = 0; i < this.selectedImages.length; i++) {
          let selectedImage = this.selectedImages[i];
          var n = Date.now();
          const filePath = `RoomsImages/${n}`;
          const fileRef = this.storage.ref(filePath);
          this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                const image = {
                  linkImg: url,
                  productId: product.id
                };
                console.log(url);
                this.imageService.save(image).subscribe(() => {
                  console.log('SUCCESSFULLY CREATE')
                });
              });
            })
          )
        }
      }
    })
  }

  async showPreview(event: any) {
    let newSelectedImages = [];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      newSelectedImages = event.target.files;
      for (let i = 0; i < event.target.files.length; i++) {
        this.selectedImages.push(event.target.files[i]);
      }
    } else {
      this.selectedImages = [];
    }
    if (newSelectedImages.length !== 0) {
      for (let i = 0; i < newSelectedImages.length; i++) {
        let selectedImage = newSelectedImages[i];
        var n = Date.now();
        const filePath = `RoomsImages/${n}`;
        const fileRef = this.storage.ref(filePath);
        await this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.images.push(url);
            });
          })
        ).subscribe(() => {
        });
      }
    }

  }

  getAllCategory() {
    this.categoryService.getAll().subscribe(value => {
      this.listCategory = value;
    })
  }
}

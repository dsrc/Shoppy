import { Component } from '@angular/core';
import { ProductService } from '../.././services/productService';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
    templateUrl: 'pages.productDetails.html',
    styleUrls: ['pages.productDetails.css'],
    providers: [ProductService]
})
export class ProductDetailsComponent {
    products: any[];
    selectedProduct: any;

    constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private location: Location) { }

    ngOnInit(): void {

        this.route.params.subscribe(params => {
            let id = params['id'];

            this.productService.getProducts().then((prodts: any[]) => {
                let availableProds = prodts.filter(itm => {
                    return itm.info.ProductID == id
                });

                if (availableProds.length > 0) {
                    this.selectedProduct = availableProds[0];                    
                }else{
                    this.selectedProduct = null;                    
                }
            });
        });
    }

    onBack(): void{
        // this.location.back();
        this.router.navigate(['../']);
    }
}
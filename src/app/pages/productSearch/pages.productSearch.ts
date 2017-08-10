import { Component } from '@angular/core';
import { ProductService } from '../.././services/productService';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'pages.productSearch.html',
    styleUrls: ['pages.productSearch.css'],
    providers: [ProductService]
})
export class ProductSearchComponent {
    products: any[];
    selectedProduct: any;
    queryString = '';

    constructor(private router: Router, private productService: ProductService) { }

    getProducts(): void {
        this.productService.getProducts().then(prods => {
            this.products = prods;
        });
    }

    checkNAddProductsAlreadyCached(){
        return new Promise((resolve, reject) => {
            var productsAlreadyLoaded = false;

            var scripts = document.getElementsByTagName("script")

            for (var i = 0; i < scripts.length; ++i) {
                if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').indexOf("products") > -1) {
                    productsAlreadyLoaded = true;
                    break;
                }
            }

            var lstSyncTime = new Date();
            if (!productsAlreadyLoaded) {
                var dynamicScripts = ["https://s3-eu-west-1.amazonaws.com/webshop/tests/products.js"];

                for (var i = 0; i < dynamicScripts.length; i++) {
                    let node = document.createElement('script');
                    node.src = dynamicScripts[i];
                    node.type = 'text/javascript';
                    node.async = false;
                    node.charset = 'utf-8';
                    // node.onrea .onreadystatechange = callback;
                    node.onload = resolve;

                    document.getElementsByTagName('head')[0].appendChild(node);
                    // localStorage.setItem('lastSyncTime', (lstSyncTime.toString()))
                }
            }else{
                resolve();
            }

            let dataReadyIntrRunCnt = 0;
            // let dataReadyIntr =  setInterval(function() {
            //     dataReadyIntrRunCnt++;
            //     if (dataReadyIntrRunCnt > 500) {
            //         // script loading failed...
            //         clearInterval(dataReadyIntr);
            //         dataReadyIntr = null;
            //     }
            //     if (typeof(window["all_products"]) !== "undefined") {
            //         // script loaded...
            //         clearInterval(dataReadyIntr);
            //         dataReadyIntr = null;

            //         resolve();
            //         localStorage.setItem('lastSyncTime', (lstSyncTime.toString()));
            //     }
            // }, 10);
        });
    }

    ngOnInit(): void {
        this.checkNAddProductsAlreadyCached().then(() => {
            this.getProducts();
        });
    }

    onSelect(prod: any): void {
        this.selectedProduct = prod;
        this.router.navigate(['/details', this.selectedProduct.info.ProductID]);
    }
}
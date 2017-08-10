import { Component } from '@angular/core';
import { ProductService } from '../.././services/productService';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
    templateUrl: 'pages.sync.html',
    styleUrls: ['pages.sync.css'],
    providers: [ProductService]
})
export class SyncComponent {

    lastSyncTime : any;

    constructor(private router: Router, private productService: ProductService, private location: Location) {
     }

    ngOnInit(): void {
        this.lastSyncTime = localStorage.getItem('lastSyncTime');        
    }

    doSync(): void {
        this.loadProductScript().then(() => {
            var lstSyncTime = new Date();

            localStorage.setItem('lastSyncTime', (lstSyncTime.toString()))
            localStorage.setItem('lastSyncToken', (lstSyncTime.getTime().toString()))
            this.lastSyncTime = localStorage.getItem('lastSyncTime');
        });
    }

    public loadProductScript() {
        return new Promise((resolve, reject) => {
        var productsAlreadyLoaded = false;

            let allProducts = window["all_products"];
            allProducts = [];
            {
                var lstSyncTime = new Date();
                var dynamicScripts = ["https://s3-eu-west-1.amazonaws.com/webshop/tests/products.js?r=pushUpdate&v=" + lstSyncTime.getTime()];

                for (var i = 0; i < dynamicScripts.length; i++) {
                    let node = document.createElement('script');
                    node.src = dynamicScripts[i];
                    node.type = 'text/javascript';
                    node.async = false;
                    node.charset = 'utf-8';
                    node.onload = resolve;
                    document.getElementsByTagName('head')[0].appendChild(node);
                }            
            }

        });
    }


    goBack(): void{
        this.router.navigate(['../']);
    }

}
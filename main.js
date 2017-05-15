///<reference path="node_modules/rxjs/Observer.d.ts"/>
//import {Observable} from 'rxjs'; -> note: this works, but brings in a huge amount of functionality, so refactoring to the below code reduces the app.js from 3mb to 800kb
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/filter");
var numbers = [1, 5, 10];
//let source = Observable.from(numbers); //higher level
//lower level
var source = Observable_1.Observable.create(function (observer) {
    var index = 0;
    var produceValue = function () {
        observer.next(numbers[index++]);
        if (index < numbers.length) {
            //there is another value to produce
            setTimeout(produceValue, 250);
        }
        else {
            observer.complete();
        }
    };
    //simulates getting data over time
    produceValue();
})
    .map(function (n) { return n * 2; })
    .filter(function (n) { return n > 4; });
//simpler way of implementing an observer
source.subscribe(function (value) { return console.log("value: " + value); }, function (e) { return console.log("error: " + e); }, function () { return console.log("complete"); });
//
// //this is a formal way of creating an observer, you could use this for creating state etc...
// class MyObserver {
//
//     //method that the observerable will invoke on the observer when there is a value to produce
//     next(value) {
//         //every time something is available, this is invoked
//         console.log(`value: ${value}`);
//     }
//
//     error(e) {
//         console.log(`error: ${e}`);
//     }
//
//     //if the observable knows that it has exhausted the data source, complete is called
//     complete() {
//         console.log("complete!");
//     }
// }
//
// source.subscribe(new MyObserver()); 
//# sourceMappingURL=main.js.map
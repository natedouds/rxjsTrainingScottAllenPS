///<reference path="node_modules/rxjs/Observer.d.ts"/>
//import {Observable} from 'rxjs'; -> note: this works, but brings in a huge amount of functionality, so refactoring to the below code reduces the app.js from 3mb to 800kb

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'

let numbers = [1, 5, 10];

//let source = Observable.from(numbers); //higher level

//lower level
let source = Observable.create(
    observer => {

        let index = 0;
        let produceValue = () => {
            observer.next(numbers[index++]);
            if (index < numbers.length) {
                //there is another value to produce
                setTimeout(produceValue, 250);
            } else {
                observer.complete();
            }

        };
        //simulates getting data over time
        produceValue();
    }
)
//operators allow you to establish a processing pipeline for the data, i.e. map, filter
    .map(n => n * 2)
    .filter(n => n > 4);

//simpler way of implementing an observer
source.subscribe(
    value => console.log(`value: ${value}`),
    e => console.log(`error: ${e}`),
    () => console.log("complete")
);


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
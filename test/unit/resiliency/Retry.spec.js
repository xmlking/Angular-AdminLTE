import {BackoffStrategy, Retry} from '../../../app/modules/resiliency/Retry';

//FIXME comment out 'import Reflect from 'reflect';' in  Retry.js to unit test this.

describe('resiliency.Retry', function () {
    'use strict';

    // 1, 2, 3, 4, 5, 5, 5,...
    let retry1 = new Retry({
        maxTries        :5,
        maxDelay        :3,
        backoffStrategy :BackoffStrategy.INCREMENTAL
    });

    // 0.4, 0.8, 1.6, 3.2, 6.4, ...
    let retry2 = new Retry({
        maxTries        :3,
        delayRatio      :0.4,
        backoffStrategy :BackoffStrategy.EXPONENTIAL
    });

    let promiseFunction = (testNum) => {
        return new Promise((resolve, reject) => {
            let randNum = Math.floor((Math.random() * 10) + 1);
            if(randNum === testNum) {resolve(`random number ${randNum} is equal to ${testNum}`);}
            else {reject(`random number ${randNum} is not equal to ${testNum}`);}
        });
    };
    let nonPromiseFunction = (testNum) => {
        console.log('I am non promise function. arg: ' +testNum);
        let randNum = Math.floor((Math.random() * 10) + 1);
        if(randNum === testNum) {return `random number ${randNum} is equal to ${testNum}`;}
        else { throw new Error(`random number ${randNum} is not equal to ${testNum}`);}
    };
    let intermediateFunction = (error, remainingTries, delay) => {
        console.error(`Previous error: [${error}]`);
        console.info(`Previous remaining tries: [${remainingTries}]`);
        console.info(`Previous delay: [${delay}s]`);
        // return false;       // this will cancel additional tries
    };


    beforeEach(function () {
        this.originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    });

    it('should try 3 time with delay of 1, 2, 3 seconds before give up', function (done) {
        console.log(retry1);
        retry1.try.call(retry1,promiseFunction, this, [7], intermediateFunction)
            .then((success) => {
                console.log('Success: ' +success);
                expect(success).toBe('random number 7 is equal to 7');
                done();
            })
            .catch( (error) => {
                console.error('Error: ' + error.message);
                expect(error.message).toMatch(/Giving up! maximum retry attempts reached./);
                done();
            });
    });

    it('should try 3 time with delay of  0.4, 0.8, 1.6 seconds before give up', function (done) {
        console.log(retry2);
        retry2.try(promiseFunction, this, [3])
            .then((success) => {
                console.log('Success: ' +success);
                expect(success).toBe('random number 3 is equal to 3');
                done();
            })
            .catch( (error) => {
                console.error('Error: ' + error.message);
                expect(error.message).toMatch(/Giving up! maximum retry attempts reached./);
                done();
            });
    });

    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = this.originalTimeout;
    });

});


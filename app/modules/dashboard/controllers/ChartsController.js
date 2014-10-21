export default class ChartsController {
  constructor($scope) {
    "use strict";
    this.exampleData = this.getData(4, 40);

    this.exampleData1 =
      [
        {key: "One", y: 5},
        {key: "Two", y: 2},
        {key: "Three", y: 9},
        {key: "Four", y: 7},
        {key: "Five", y: 4},
        {key: "Six", y: 3},
        {key: "Seven", y: 9}
      ];

  }

  xFunction() {
    return (d) => {
      return d.key;
    };
  }
  yFunction() {
    return (d) => {
      return d.y;
    };
  }
  descriptionFunction() {
    return (d) => {
      return d.key;
    }
  }

  rangesFunction(){
    console.log('rangesFunction called');
    return function(d){
      return [50,100,200];
    }
  }

  getData(groups, points) {
    var data = [],
      shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
      random = d3.random.normal();
    for (let i = 0; i < groups; i++) {
      data.push({
        key: 'Group ' + i,
        values: []
      });
      for (let j = 0; j < points; j++) {
        data[i].values.push({
          x: random()
          , y: random()
          , size: Math.random()
          //, shape: shapes[j % 6]
        });
      }
    }
    return data;
  }

  tooltipXContentFunction(){
    return function(key, x, y) {
      return '<strong>YO!' + x + '</strong>'
    }
  }

  getShapeCross(){
    return function(d){
      return 'cross';
    }
  }

  getShapeDiamond(){
    return function(d){
      return 'diamond';
    }
  }


}

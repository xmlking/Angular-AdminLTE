import {Injector} from 'di/index';
import TodoList from '../models/TodoList';
import {Generators} from '../../common/utils/generators';
import moment from 'moment';

export default class TodoController {

  constructor($scope, growl) {

    let injector = new Injector([Generators.keyGenerator]);
    this.todos = injector.get(TodoList);
    this.todos.add('Design a nice theme', true);
    this.todos.add('Make the theme responsive');
    this.todos.add('Let theme shine like a star');
    this.todos.add('Check your messages and notifications');
    this.todos.add('learn AngularJS');
    this.todos.add('build an AngularJS app');

    this.todos.todos[1].createdOn = moment().subtract(4, 'minute');
    this.todos.todos[2].createdOn = moment().subtract(6, 'hour');
    this.todos.todos[3].createdOn = moment().subtract(1, 'day');
    this.todos.todos[4].createdOn = moment().subtract(3, 'day');
    this.todos.todos[5].createdOn = moment().subtract(3, 'month');
    this.todos.todos[6].createdOn = moment().subtract(1, 'year');

    this.newTodo = '';
    this.growl = growl;

    this.sortableOptions = {
      placeholder: "sort-highlight",
      handle: ".handle",
      forcePlaceholderSize: true,
      zIndex: 999999
    };
  }

  addTodo() {
    this.todos.add(this.newTodo, false);
    this.growl.info(`${this.newTodo} ... added`, {ttl: 3000});
    this.newTodo = ''; // clears input
  }

  editTodo(key, text) {
    let anItem = this.todos.getTodo(key);
    this.growl.warning(`${anItem.text} ... edited`, {ttl: 3000});
    this.todos.edit(key,text);
  }

  removeTodo(key) {
    let anItem = this.todos.getTodo(key);
    this.growl.warning(`${anItem.text} ... removed`, {ttl: 3000});
    this.todos.remove(key);
  }

  clearAll() {
    this.todos.clearAll();
    this.growl.error('All Clear', {ttl: 3000});
  }

  completed() {
    return this.todos.completed();
  }

  remaining() {
    return this.todos.remaining();
  }

  dynamicClass(createdOn) {
    //TODO: moment(createdOn).isAfter(dateAfter);
    let ago = moment(createdOn).fromNow(true);
    console.debug(ago);
    if(ago.contains('minute')) {
      return 'label-danger';
    } else if (ago.contains('hour')) {
      return 'label-info';
    } else if (ago.contains('days')) {
      return 'label-success';
    } else if (ago.contains('day')) {
      return 'label-warning';
    } else if (ago.contains('month')) {
      return 'label-primary';
    } else {
      return 'label-default';
    }
  }

}



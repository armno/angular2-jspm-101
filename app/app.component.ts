import { Component } from 'angular2/core';

@Component({
	selector: 'my-app',
	template: '<h1>{{ message }}</h1>'
})

export class AppComponent {
	constructor() {
		this.message = 'My first angular2 app';
	}
}
import { Component } from 'angular2/core';

@Component({
	selector: 'my-app',
	template: `
		<h1>{{ title }}</h1>
		<p>{{ hero.name }}</p>
	`
})

export class AppComponent {
	public title = 'Tour of Heros';
	public hero: Hero = {
		id: 1,
		name: 'Armno'
	}
}

interface Hero {
	id: number;
	name: string;
}
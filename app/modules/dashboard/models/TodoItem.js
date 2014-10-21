export default class TodoItem {
	constructor(text, done = false) {
		this.text = text;
    this.createdOn = new Date();
    this.lastModifiedOn = new Date();
		this.done = done;
	}

	toggle() {
		this.done = !this.done;
	}

	toString() {
		return this.text;
	}

	//toggle = () => { this.completed = !this.completed };
}

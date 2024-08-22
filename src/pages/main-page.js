'use strict'

import { Tab } from '@components/tab'
import { Button } from '@components/button'

class MainPage {
	constructor() {
		this.element = new Tab({
			buttonInstances: [
				new Button({
					icon: 'plus',
					id: 'tab-0',
					className: 'maker-button',
					type: 'rounded-square',
					events: [
						{
							type: 34,
							func: () => {
								console.log('It works')
							}
						}
					]
				}),
				new Button({
					icon: 'plus',
					id: 'tab-1',
					className: 'maker-button',
					type: 'rounded-square',
					events: [
						{
							type: 'click',
							func: () => {
								console.log('It worked!')
							}
						}
					]
				})
			]
		})
	}
	create() {
		console.log(this.element)
		return this.element.create()
	}
}

export { MainPage }

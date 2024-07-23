'use strict'

import { Button } from '@components/button'
import { Page } from '@components/page'

class SaveButton {
	#config

	constructor() {
		this.#config = {
			icon: 'save',
			id: 'quiz-pack-save',
			class_name: 'maker-button',
			type: 'rounded-square',
			events: [
				{
					event_name: 'click',
					func: this.tap.bind(this)
				}
			]
		}
		this.instance = new Button(this.#config)
	}

	create() {
		return this.instance.create()
	}

	remove() {
		return this.instance.remove()
	}

	tap() {
		const config = {
			id: 'quiz-pack-save',
			elements: {
				header: [],
				body: []
			},
			z_index: 8
		}

		return new Page(config).create()
	}
}

export { SaveButton }

'use strict'

import { Button } from '@components/button'
import { Page } from '@components/page'

class SmartAssistantButton {
	#config

	constructor() {
		this.#config = {
			icon: 'bot',
			id: 'smart-assistant',
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
			id: 'smart-assistant',
			elements: {
				header: [],
				body: []
			},
			z_index: 6
		}

		return new Page(config).create()
	}
}

export { SmartAssistantButton }

'use strict'

import { Button } from '@components/button'
import { Page } from '@components/page'

class ConfigQuizButton {
	#config

	constructor() {
		this.#config = {
			icon: 'cog',
			id: 'config-quiz',
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
		const wrapper = document.createElement('div')

		return wrapper
	}
}

export { ConfigQuizButton }

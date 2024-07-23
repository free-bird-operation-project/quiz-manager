'use strict'

import { Button } from '@components/button'
import { Page } from '@components/page'

class PreviewButton {
	#config

	constructor() {
		this.#config = {
			icon: 'eye',
			id: 'quiz-preview',
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
			id: 'preview-quiz-pack',
			elements: {
				header: [],
				body: []
			},
			z_index: 8
		}

		return new Page(config).create()
	}
}

export { PreviewButton }

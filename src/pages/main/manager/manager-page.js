'use strict'

import { Page } from '@components/page'

class ManagerPage {
	#config

	constructor() {
		this.#config = {
			id: 'manager',
			elements: {
				header: [],
				body: []
			},
			z_index: 2
		}
		this.instance = new Page(this.#config)
	}

	create() {
		return this.instance.create()
	}

	remove() {
		return this.instance.remove()
	}
}

export { ManagerPage }

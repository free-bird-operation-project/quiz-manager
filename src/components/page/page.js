'use strict'

import { isConfigVerified } from '@utilities/config/config-verifier'
import { createPage } from './page-create'
import { removePage } from './page-remove'

class Page {
	constructor(config) {
		this.name = 'page'
		this.config = isConfigVerified(this.name, config) ? config : {}
	}

	create() {
		createPage(this.config, this.remove.bind(this))
	}

	remove() {
		removePage(this.config)
	}
}

export { Page }

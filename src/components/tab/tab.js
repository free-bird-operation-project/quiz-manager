'use strict'

import { isConfigVerified } from '../../utilities/config/config-verifier'
import { createTab } from './tab-create'
import { removeTab } from './tab-remove'

class Tab {
	constructor(config) {
		this.name = 'tab'
		this.config = isConfigVerified(this.name, config) ? config : {}
	}

	create() {
		createTab(this.tab)
	}

	remove() {
		removeTab()
	}
}

export { Tab }

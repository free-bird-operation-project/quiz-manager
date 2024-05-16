'use strict'

import { isConfigVerified } from '../../utilities/config/config-verifier'
import { createTab } from './tab-create'
import { removeTab } from './tab-remove'

class Tab {
	constructor(config) {
		this.config = isConfigVerified() ? config : {}
	}

	create() {
		createTab(this.tab)
	}

	remove() {
		removeTab()
	}
}

export { Tab }

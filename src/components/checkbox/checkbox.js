'use strict'

import { isConfigVerified } from '../../utilities/config/config-verifier'
import { createCheckbox } from './checkbox-create'
import { removeCheckbox } from './checkbox-remove'
import { changeCheckboxState } from './checkbox-change-state'

class Checkbox {
	constructor(config) {
		this.name = 'checkbox'
		this.config = isConfigVerified(this.name, config) ? config : {}
	}

	initialize() {
		this.changeState()
	}

	create() {
		createCheckbox(this.config)
	}

	remove() {
		removeCheckbox(this.config)
	}

	changeState() {
		changeCheckboxState(this.config)
	}
}

export { Checkbox }

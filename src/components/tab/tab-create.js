'use strict'

import { setAttributes } from '../../utilities/components/set-attributes'
import { isConfigVerified } from '../../utilities/config/config-verifier'

function createTab(config) {
	if (!isConfigVerified(config)) return

	const { buttons } = config
	const BUTTONS = createTabButtons(buttons)
	const TAB = document.createElement('div')
	setAttributes(TAB, {
		class: `tab`,
		id: 'tab'
	})

	BUTTONS.forEach((button) => {
		TAB.appendChild(button)
	})

	return TAB
}

export { createTab }

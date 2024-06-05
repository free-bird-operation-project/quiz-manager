'use strict'

import { isConfigVerified } from '@utilities/config/config-verifier'
import { setEvents } from '@utilities/components/set-events'

function setButtonEvents(config) {
	if (!isConfigVerified('button', config)) return
	const { id, events } = config
	setEvents(id, events)
}

export { setButtonEvents }

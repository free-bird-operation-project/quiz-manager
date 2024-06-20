'use strict'

function isConfig(config) {
	if (!config) {
		console.error('No configuration has been passed!')
		return false
	}

	return true
}

export { isConfig }

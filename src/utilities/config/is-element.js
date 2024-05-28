'use strict'

function isElement(element) {
	if (typeof element !== 'string') {
		return false
	}

	return true
}

export { isElement }

'use strict'

function setAttributes(element, attributes) {
	if (!element) {
		console.error('The element must be provided.')
		return false
	}

	if (!attributes || Object.keys(attributes).length === 0) {
		console.error('The attributes must be provided.')
		return false
	}

	if (!(element instanceof HTMLElement)) {
		const notValidElement = 'The element provided is not a valid HTML element.'
		console.error(notValidElement)
		return false
	}

	if (typeof attributes !== 'object') {
		const notValidAttributes = 'The attributes provided are not a valid object.'
		console.error(notValidAttributes)
		return false
	}

	Object.entries(attributes).forEach(([key, value]) => {
		element.setAttribute(key, value)
	})

	return true
}

export { setAttributes }

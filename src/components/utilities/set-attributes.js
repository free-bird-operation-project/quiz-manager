import { sanitizeValue } from '@utilities/sanitize-value'

/**
 * Sets attributes on a given HTML element.
 *
 * @param {HTMLElement} element - The HTML element to set attributes on.
 * @param {object} attributes - An object containing key-value pairs of attributes to set.
 * @returns {boolean} Returns true if the attributes are successfully set, false otherwise.
 */
function setAttributes(element, attributes) {
	const isElement = sanitizeValue(element, 'HTMLElement')
	const isAttributes = sanitizeValue(attributes, 'object')

	if (!isElement || !isAttributes || Object.keys(attributes).length === 0) {
		return false
	}

	Object.entries(attributes).forEach(([key, value]) => {
		element.setAttribute(key, value)
	})

	return true
}

export { setAttributes }

import { sanitizeValue } from '@utilities/sanitize-value'

/**
 * @typedef {Object} BooleanAttributes
 * @property {boolean} [readOnly] - Indicates if the element should be read-only.
 * @property {boolean} [hidden] - Indicates if the element should be hidden.
 */

/**
 * Sets specified attributes on the given HTML element.
 *
 * @param {HTMLElement} element - The HTML element to set attributes on.
 * @param {BooleanAttributes} attributes - The attributes to set on the element.
 * @returns {boolean} Returns true if attributes are successfully set, false otherwise.
 */
function setProperty(element, attributes) {
	const isElement = sanitizeValue(element, 'HTMLElement')
	const isAttributes = sanitizeValue(attributes, 'object')

	if (!isElement || !isAttributes || Object.keys(attributes).length === 0) {
		return false
	}

	let flag = true

	Object.entries(attributes).forEach(([key, value]) => {
		if (!sanitizeValue(value, 'boolean')) {
			flag = false
			return
		}

		switch (key) {
			case 'hidden':
				element.hidden = value === true
				break
			case 'readOnly':
				element.readOnly = value === true
				break
			default:
				flag = false
				break
		}
	})

	return flag
}

export { setProperty }

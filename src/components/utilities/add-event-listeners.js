import { sanitizeValue } from '@utilities/sanitize-value'

/**
 * Adds event listeners to a given element based on the provided events.
 *
 * @param {HTMLElement} element - The element to attach the event listeners to.
 * @param {Array} events - An array of objects representing events to be added, each containing `type` (string) and `func` (function as listener).
 * @returns {boolean} Returns true if all event listeners were successfully added, false otherwise.
 */
function addEventListeners(element, events) {
	if (!validateParameters(element, events)) {
		console.error('Cannot add event listeners! Invalid element or events parameter.')
		return false
	}

	events.forEach((event) => {
		element.addEventListener(event.type, event.func)
	})

	return true
}

/**
 * Validates the parameters passed to the function.
 *
 * @param {HTMLElement} element - The HTML element to validate.
 * @param {Array} events - An array of events to validate.
 * @returns {boolean} - Returns true if all parameters are valid, false otherwise.
 */
function validateParameters(element, events) {
	const isValidElement = sanitizeValue(element, 'HTMLElement')
	const isValidEvents = sanitizeValue(events, 'array')

	if (!isValidElement || !isValidEvents) {
		return false
	}

	let flag = true
	events.forEach((event) => {
		const isEvent = sanitizeValue(event, 'object')
		const isEventType = sanitizeValue(event.type, 'string')
		const isEventFunc = sanitizeValue(event.func, 'function')

		if (!isEvent || !isEventType || !isEventFunc) {
			flag = false
		}
	})

	return flag
}

export { addEventListeners }

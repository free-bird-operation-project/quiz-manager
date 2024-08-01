import { sanitizeValue } from '@utilities/sanitize-value'

/**
 * Removes event listeners from a given element based on the provided events.
 *
 * @param {HTMLElement} element - The element from which to remove event listeners.
 * @param {Array} events - An array of objects representing the events to remove.
 * @returns {boolean} Returns true if all event listeners were successfully removed, false otherwise.
 */
function removeEventListeners(element, events) {
	if (!validateParameters(element, events)) {
		console.error('Cannot remove event listeners! Check if the element or the events is valid.')
		return false
	}

	events.forEach((event) => {
		element.removeEventListener(event.type, event.func)
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

export { removeEventListeners }

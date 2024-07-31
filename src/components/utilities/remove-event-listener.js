import { sanitizeValue } from '@utilities/sanitize-value'

/**
 * Removes an event listener from the specified element.
 *
 * @param {HTMLElement} element - The element from which to remove the event listener.
 * @param {object} events - The event object containing the event name and the function to remove.
 */
function removeEventListener(element, events) {
	const isValidElement = sanitizeValue(element, 'HTMLElement')
	const isValidEvents =
		sanitizeValue(events, 'object') &&
		sanitizeValue(events.eventsName, 'string') &&
		sanitizeValue(events.func, 'function')

	if (!isValidElement || !isValidEvents) {
		console.error('Cannot remove event listener.')
		return
	}

	element.removeEventListener(events.eventsName, events.func)
}

export { removeEventListener }

'use strict'

function setEvents(element, events) {
	if (!element) {
		console.error('No element to set events.')
		return false
	}

	if (!events) {
		console.error('No events to set.')
		return false
	}

	for (const event of events) {
		const { event_name: event_name, func: event_handler } = event
		element.addEventListener(event_name, event_handler)
	}

	return true
}

export { setEvents }

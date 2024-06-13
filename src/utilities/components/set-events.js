'use strict'

function setEvents(element, events) {
	if (!element) {
		console.error('No element to set events.')
		return null
	}

	if (!events) {
		console.error('No events to set.')
		return null
	}

	for (const event of events) {
		const { event_name: event_name, func: event_handler } = event
		element.addEventListener(event_name, event_handler)
	}

	return element
}

export { setEvents }

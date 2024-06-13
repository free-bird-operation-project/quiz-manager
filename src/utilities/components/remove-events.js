'use strict'

function removeEvents(element, events) {
	if (!element) {
		console.error('No element to remove events.')
		return
	}

	if (!events) {
		console.error('No events to remove.')
		return
	}

	for (const event of events) {
		const { event_name: event_name, func: event_handler } = event
		element.removeEventListener(event_name, event_handler)
	}

	return element
}

export { removeEvents }

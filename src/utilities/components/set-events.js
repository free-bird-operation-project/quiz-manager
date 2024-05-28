'use strict'

function setEvents(id, events) {
	if (!id) {
		console.error('No ID to set events.')
		return false
	}

	if (!events) {
		console.error('No events to set.')
		return false
	}

	const element = document.getElementById(id)
	if (!element) {
		console.error(`Element with ID ${id} not found.`)
		return false
	}

	for (const event of events) {
		const { event_name: event_name, func: event_handler } = event
		element.addEventListener(event_name, event_handler)
	}

	return true
}

export { setEvents }

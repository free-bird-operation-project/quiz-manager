'use strict'

function createTabButtons(buttons) {
	let BUTTONS = []
	const minimum_buttons = 2

	if (!buttons) {
		console.error('Tab is useless without buttons.')
		return
	}

	buttons.forEach((button, index) => {
		button.id = `tab-button-${index}`
		BUTTONS.push(button)
	})

	if (BUTTONS.length < minimum_buttons) {
		console.error('Nothing is better than one button tab.')
		return
	}

	return BUTTONS
}

export { createTabButtons }

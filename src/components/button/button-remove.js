'use strict'

function removeButton(config) {
	const { id } = config

	const BUTTON = document.getElementById(`button-${id}`)
	if (!BUTTON) return
	BUTTON.remove()
}

export { removeButton }

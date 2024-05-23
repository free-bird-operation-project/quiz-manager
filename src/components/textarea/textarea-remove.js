'use strict'

function removeTextarea(config) {
	const { id } = config
	const TEXTAREA = document.getElementById(id)
	if (!TEXTAREA) return
	TEXTAREA.remove()
}

export { removeTextarea }

'use strict'

function removeTab() {
	const TAB = document.getElementById('tab')

	if (!TAB) return
	TAB.remove()
}

export { removeTab }

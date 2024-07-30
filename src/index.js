'use strict'

import { App } from './app'

/**
 * Initializes the app by appending it to the main element in the document.
 *
 * @param {Element} App - The App element to be appended.
 * @returns {void} - No return value.
 */
function initializeApp(App) {
	const main = document.querySelector('main')

	try {
		if (!App) {
			throw new Error('No app to display.')
		}

		main.appendChild(App)
	} catch (error) {
		console.error(`Error: ${error.message}`)
	}
}

initializeApp(new App().create())

//? Uncomment the next line to trigger the test
// export { initializeApp }

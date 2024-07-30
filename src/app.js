import { MainPage } from '@pages/main-page'
import { sanitizeElements } from '@utilities/sanitize-elements'

/**
 * Class representing an App.
 * @constructor
 */
class App {
	/**
	 * Initializes the elements array with a single instance of `MainPage` created and stored in it.
	 * Calls a private method to retrieve sanitized elements and stores them in the `sanitizedElements` property.
	 */
	constructor() {
		this.elements = [new MainPage().create()]
		this.sanitizedElements = this.#getsanitizedElements()
	}

	/**
	 * Creates a new DocumentFragment by appending all sanitized elements.
	 *
	 * @returns {DocumentFragment} The newly created DocumentFragment containing sanitized elements.
	 */
	create() {
		const app = new DocumentFragment()
		this.sanitizedElements.forEach((element) => {
			app.appendChild(element)
		})

		return app
	}

	/**
	 * Retrieves and sanitizes elements for the App instance.
	 *
	 * @returns {Array} An array of sanitized elements.
	 */
	#getsanitizedElements() {
		try {
			const temporaryElements = []

			if (this.elements.length === 0) {
				return console.error('The elements are empty for App.')
			}

			if (temporaryElements.includes(null)) {
				return console.error('One of the elements for App is not a valid type.')
			}

			this.elements.forEach((element) => {
				temporaryElements.push(sanitizeElements(element, 'HTMLElement'))
			})

			return temporaryElements
		} catch (error) {
			console.error(`Error: ${error}`)
		}
	}
}

export { App }

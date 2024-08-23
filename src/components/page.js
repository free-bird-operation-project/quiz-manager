import { BaseComponent } from './base-component'
import { sanitizeValue } from '@utilities/sanitize-value'
import { Button } from './button'

/**
 * @typedef {Object} PageConfig
 * @property {string} id - The ID of the page.
 * @property {object} elements - The object consist of elements for page.
 * @property {number} zIndex - The z-index of the page.
 */

/**
 * Represents a Page component.
 */
class Page extends BaseComponent {
	/**
	 * Initializes the page instance with the provided configuration.
	 *
	 * @param {PageConfig} config - The configuration object for the page.
	 */
	constructor(config) {
		super(config)
		this.config = sanitizeValue(config, 'object')
	}

	/**
	 * Creates a page element based on the provided configuration.
	 * Adds a header with an exit button if the z-index is greater than 10.
	 * Appends header and body elements to the page based on the elements in the configuration.
	 *
	 * @returns {Element} The created page element.
	 */
	create() {
		const { elements, zIndex, id } = this.config
		const page = this._createContainer('div', {
			id: `page-${id}`,
			class: 'page',
			style: `z-index: ${zIndex}`
		})
		const header = this._createContainer('div', {
			class: 'page-header'
		})

		const zIndexForMainPages = 10

		if (zIndex > zIndexForMainPages) {
			const exitButtonConfig = {
				icon: 'chevron-left',
				id: `exit-page-${zIndex}`,
				className: 'exit',
				type: 'rounded-square',
				events: [
					{
						type: 'click',
						func: this.remove.bind(this)
					}
				]
			}
			const exitButton = new Button(exitButtonConfig).create()
			header.appendChild(exitButton)
		}

		if (elements.header) {
			elements.header.forEach((element) => {
				header.appendChild(element.create())
			})
		}

		const body = this._createContainer('div', {
			class: 'page-body'
		})

		if (elements.body) {
			elements.body.forEach((element) => {
				body.appendChild(element.create())
			})
		}

		page.appendChild(header)
		page.appendChild(body)

		return page
	}

	/**
	 * Removes the page element from the DOM along with its header and body elements if they exist.
	 *
	 * @returns {boolean} Returns true if the page element was successfully removed, otherwise false.
	 */
	remove() {
		const { elements, id } = this.config

		const elementId = `page-${id}`
		const page = document.getElementById(elementId)

		if (elements.header) {
			elements['header'].forEach((element) => {
				element.remove()
			})
		}

		if (elements.body) {
			elements['body'].forEach((element) => {
				element.remove()
			})
		}

		if (page) {
			page.remove()
			return true
		}

		return false
	}
}

export { Page }

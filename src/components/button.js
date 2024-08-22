import { BaseComponent } from './base-component'
import { sanitizeValue } from '@utilities/sanitize-value'
import { addEventListeners } from './utilities/add-event-listeners'
import { removeEventListeners } from './utilities/remove-event-listeners'

/**
 * Config for Button
 *
 * @typedef ButtonConfig
 * @property {string} [className] - Button class name
 * @property {EventListenerObject} events - Event listeners
 * @property {string} icon - Button icon
 * @property {string} id - Button ID
 * @property {string} text - Button text
 * @property {string} [type] - Button type )default: 'transparent')
 */

/**
 * Event listener
 *
 * @typedef EventListenerObject
 * @property {string} type - Event type
 * @property {function(): any} func - Event handler function
 */

/**
 * Button component
 */
class Button extends BaseComponent {
	/**
	 * Initializes the button instance with the provided configuration.
	 *
	 * @param {ButtonConfig} config - The configuration object for the button.
	 */
	constructor(config) {
		super(config)
		this.config = sanitizeValue(config, 'object')
	}

	/**
	 * Creates a button element based on the provided configuration.
	 *
	 * @returns {HTMLElement | null} The created button element or null if events, icon, or text are missing.
	 */
	create() {
		const { className, events, icon, id, text, type = 'transparent' } = this.config
		const button = this._createContainer('div', {
			id: `button-${id}`,
			class: `${className} button ${type}-button`
		})

		if (!events) return null
		if (!icon && !text) return null
		if (icon) button.appendChild(this._createIcon(icon))
		if (text) button.appendChild(this._createText(text))
		addEventListeners(button, events)

		return button
	}

	/**
	 * Removes the button element from the DOM along with its event listeners based on the provided configuration.
	 *
	 * @returns {boolean} Returns true if the button element is successfully removed, otherwise false.
	 */
	remove() {
		const { events, id } = this.config
		const elementId = `button-${id}`
		const button = document.getElementById(elementId)

		if (button) {
			removeEventListeners(button, events)
			button.remove()
			return true
		}

		return false
	}
}

export { Button }

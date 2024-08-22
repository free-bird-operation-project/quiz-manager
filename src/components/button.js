import './styles/button.scss'
import { BaseComponent } from './base-component'
import { sanitizeValue } from '@utilities/sanitize-value'
import { addEventListeners } from './utilities/add-event-listeners'
import { removeEventListeners } from './utilities/remove-event-listeners'

/**
 * @typedef {Object} ButtonConfig
 * @property {string} [id] - The ID of the button. If not provided, a default ID will be used.
 * @property {string} [className] - The class name(s) to be applied to the button.
 * @property {string} [icon] - The name of the icon to be displayed on the button.
 * @property {string} [text] - The text content of the button.
 * @property {string} [type='transparent'] - The type of the button, which affects its styling. Default is 'transparent'.
 * @property {Array<{type: string, func: Function}>} [events] - An array of event listener objects with `type` and `func` properties.
 */

/**
 * Represents a Button component.
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
	 * Creates and returns the button element based on the provided configuration.
	 * If either an icon or text is present in the configuration, it adds them to the button.
	 * Attaches event listeners to the button based on the events provided in the configuration.
	 *
	 * @returns {Element|null} The created button element or null if neither icon nor text is provided.
	 */
	create() {
		const { className, events, icon, id, text, type = 'transparent' } = this.config
		const button = this._createContainer('div', {
			id: `button-${id}`,
			class: `${className} button ${type}-button`
		})

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

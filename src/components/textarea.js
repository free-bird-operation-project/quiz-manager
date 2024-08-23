import { BaseComponent } from './base-component'
import { sanitizeValue } from '@utilities/sanitize-value'

/**
 * Represents a Textarea component.
 */
class Textarea extends BaseComponent {
	/**
	 * Initializes the textarea instance with the provided configuration.
	 *
	 * @param {Object} config - The configuration object for the textarea.
	 */
	constructor(config) {
		super(config)
		this.config = sanitizeValue(config, 'object')
	}

	/**
	 * Creates a textarea element based on the provided configuration.
	 *
	 * @returns {HTMLElement} The created textarea element.
	 */
	create() {
		const { id, className, placeholder, text, readOnly, hidden } = this.config
		const textarea = this._createContainer(
			'textarea',
			{
				id: `textarea-${id}`,
				class: `textarea-${className} textarea`,
				placeholder: placeholder
			},
			{
				readOnly: readOnly,
				hidden: hidden
			}
		)

		if (text) {
			textarea.value = text
		}

		return textarea
	}

	/**
	 * Removes the textarea element from the DOM based on the configuration ID.
	 *
	 * @returns {boolean} Returns true if the textarea element was successfully removed, otherwise false.
	 */
	remove() {
		const { id } = this.config
		const elementId = `textarea-${id}`
		const textarea = document.getElementById(elementId)

		if (textarea) {
			textarea.remove()
			return true
		}

		return false
	}

	/**
	 * Locks the textarea element to make it read-only.
	 *
	 * @returns {boolean} Returns true if the textarea element was successfully locked, otherwise false.
	 */
	lock() {
		const { id } = this.config
		const elementId = `textarea-${id}`
		const textarea = document.getElementById(elementId)

		if (textarea) {
			textarea.readOnly = true
			return true
		}

		return false
	}

	/**
	 * Unlocks the textarea element to make it editable.
	 *
	 * @returns {boolean} Returns true if the textarea element was successfully unlocked, otherwise false.
	 */
	unlock() {
		const { id } = this.config
		const elementId = `textarea-${id}`
		const textarea = document.getElementById(elementId)

		if (textarea) {
			textarea.readOnly = false
			return true
		}

		return false
	}
}

export { Textarea }

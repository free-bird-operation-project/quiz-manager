import { sanitizeValue } from '@utilities/sanitize-value'
import { BaseComponent } from './base-component'

/**
 * @typedef {Object} CheckboxConfig
 * @property {string} id - The ID of the checkbox.
 * @property {string} className - The class name(s) to be applied to the checkbox.
 * @property {string} groupName - The group name of the checkbox.
 * @property {boolean} hidden - The visibility of the checkbox.
 * @property {string} targetId - The target ID of the checkbox.
 */

/**
 * Represents a Checkbox component.
 */
class Checkbox extends BaseComponent {
	/**
	 * Initializes the checkbox instance with the provided configuration.
	 *
	 * @param {CheckboxConfig} config - The configuration object for the checkbox.
	 */
	constructor(config) {
		super(config)
		this.config = sanitizeValue(config, 'object')
	}

	/**
	 * Creates a checkbox element based on the provided configuration.
	 *
	 * @returns {HTMLElement} The created checkbox element.
	 */
	create() {
		const { id, className, targetId, groupName, hidden } = this.config

		const checkbox = this._createContainer(
			'div',
			{
				'id': `checkbox-${id}`,
				'class': `${className} checkboxes`,
				'data-state': 'false',
				'data-group-name': `checkboxes-${groupName}`,
				'data-target-id': targetId
			},
			{
				hidden: hidden
			}
		)

		return checkbox
	}

	/**
	 * Removes the checkbox element from the DOM based on the configuration ID.
	 *
	 * @returns {boolean} Returns true if the checkbox element is successfully removed, otherwise false.
	 */
	remove() {
		const { id } = this.config
		const elementId = `checkbox-${id}`
		const checkbox = document.getElementById(elementId)

		if (checkbox) {
			checkbox.remove()
			return true
		}

		return false
	}
}

export { Checkbox }

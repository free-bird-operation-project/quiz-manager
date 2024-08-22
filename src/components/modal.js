import { BaseComponent } from './base-component'
import { sanitizeValue } from '@utilities/sanitize-value'

/**
 * @typedef {Object} ModalConfig
 * @property {string} id - The ID of the modal.
 * @property {string} icon - The name of the icon to be displayed on the modal.
 * @property {string} title - The title of the modal.
 * @property {Array<Instance>} buttonInstances - An array of button instances for modal.
 */

/**
 * Represents a Modal component.
 */
class Modal extends BaseComponent {
	/**
	 * Initializes the modal instance with the provided configuration.
	 *
	 * @param {ModalConfig} config - The configuration object for the modal.
	 */
	constructor(config) {
		super(config)
		this.config = sanitizeValue(config, 'object')
	}

	/**
	 * Creates the modal element based on the provided configuration.
	 *
	 * @returns {HTMLElement|null} The created modal element or null if invalid configuration.
	 */
	create() {
		const { id, title, icon, buttons } = this.config

		const modal = this._createContainer('div', {
			id: `modal-${id}`,
			class: 'modal'
		})

		const titleContainer = this._createContainer('div', {
			class: 'modal-title-container'
		})
		const iconHolder = this._createIcon(icon)
		const titleText = this._createText(title)

		if (iconHolder) titleContainer.appendChild(iconHolder)
		if (titleText) titleContainer.appendChild(titleText)

		modal.appendChild(titleContainer)

		buttons.forEach((button, index) => {
			button.id = `modal-button-${index}`
			modal.appendChild(button)
		})

		return modal
	}

	/**
	 * Removes the modal element and its buttons from the DOM.
	 */
	remove() {
		const { id, buttonInstances } = this.config

		let allRemoved = true

		buttonInstances.forEach((buttonInstance) => {
			try {
				if (!buttonInstance.remove()) {
					allRemoved = false
				}
			} catch (error) {
				console.error(`Error: ${error}`)
				allRemoved = false
			}
		})

		const modalRemoved = this._removeById(id)
		return allRemoved && modalRemoved
	}
}

export { Modal }

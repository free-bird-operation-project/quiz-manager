import { BaseComponent } from './base-component'

/**
 * Config of Modal
 *
 * @property {ButtonInstance[]} buttonInstances - Modal button's instances
 * @property {string} icon - Modal icon
 * @property {string} id - Modal ID
 * @property {string} title - Modal title
 */

/**
 * Button instance
 *
 * @typedef ButtonInstance
 * @property {string} type - Event type
 * @property {function(): any} func - Event handler function
 */

/**
 * Modal component
 */
class Modal extends BaseComponent {
	constructor(config) {
		super(config)
		this.config = sanitizeValue(config, 'object')
	}

	/**
	 * Creates and returns the modal element based on the provided configuration.
	 * Retrieves the button instances, icon, id, and title from the configuration object.
	 * Constructs the modal container with the specified id and CSS class.
	 * Appends the title container with icon and text elements to the modal.
	 * Iterates over each button instance, adds a CSS class, and appends it to the modal.
	 *
	 * @returns {HTMLElement} The created modal element.
	 */
	create() {
		const { buttonInstances, icon, id, title } = this.config
		const modal = this._createContainer('div', {
			id: id,
			class: 'modal'
		})

		const titleContainer = this._createContainer('div', {
			class: 'modal-title-container'
		})
		titleContainer.appendChild(this._createIcon(icon))
		titleContainer.appendChild(this._createText(title))
		modal.appendChild(titleContainer)

		for (const buttonInstance of buttonInstances) {
			const button = buttonInstance.create()
			button.classList.add('modal-button')
			modal.appendChild(button)
		}

		return modal
	}

	/**
	 * Removes all button instances associated with the modal based on the configuration.
	 * Catches and logs any errors that occur during the removal process.
	 * Finally, removes the modal element by its specified id.
	 *
	 * @returns {boolean} Returns true if the removal process is successful, false otherwise.
	 */
	remove() {
		const { buttonInstances, id } = this.config

		buttonInstances.forEach((buttonInstance) => {
			try {
				buttonInstance.remove()
			} catch (error) {
				console.error(`Error: ${error}`)
				return false
			}
		})

		this._removeById(id)
		return true
	}
}
export { Modal }

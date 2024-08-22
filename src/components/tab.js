import { BaseComponent } from './base-component'
import { sanitizeValue } from '@utilities/sanitize-value'

/**
 * @typedef {Object} TabConfig
 * @property {BaseComponent[]} buttonInstances - An array of button instances that will be added to the tab.
 */

/**
 * Represents a Tab component.
 */
class Tab extends BaseComponent {
	/**
	 * Initializes the Tab instance with the provided configuration.
	 *
	 * @param {TabConfig} config - The configuration object for the tab.
	 */
	constructor(config) {
		super(config)
		this.config = sanitizeValue(config, 'object')
	}

	/**
	 * Creates and returns a tab element based on the configuration provided.
	 * Iterates over the button instances in the configuration, creates corresponding buttons,
	 * adds a specific class to each button, and appends them to the tab element.
	 *
	 * @returns {HTMLElement} The created tab element.
	 */
	create() {
		const { buttonInstances } = this.config
		const tab = this._createContainer('div', {
			id: 'tab',
			class: 'tab'
		})

		for (const buttonInstance of buttonInstances) {
			const button = buttonInstance.create()
			button.classList.add('tab-button')
			tab.appendChild(button)
		}

		return tab
	}

	/**
	 * Removes all button instances associated with the tab.
	 * Catches any errors that occur during the removal process and logs them.
	 * Finally, removes the tab element by its ID 'tab'.
	 *
	 * @returns {boolean} Returns true if all button instances are successfully removed, false otherwise.
	 */
	remove() {
		const { buttonInstances } = this.config
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

		const tabRemoved = this._removeById('tab')
		return allRemoved && tabRemoved
	}
}

export { Tab }

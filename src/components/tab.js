import { BaseComponent } from './base-component'
import { sanitizeValue } from '@utilities/sanitize-value'

/**
 * Config for Tab
 *
 * @typedef TabConfig
 * @property {ButtonInstance[]} buttonInstances - Tab button's instances
 */

/**
 * Button instance
 *
 * @typedef ButtonInstance
 * @property {string} type - Event type
 * @property {function(): any} func - Event handler function
 */

/**
 * Tab component
 */
class Tab extends BaseComponent {
	/**
	 * Initializes the Tab instance with the provided configuration.
	 *
	 * @param {TabConfig} config - Configuration object for the tab
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
	 * Finally, removes the tab element by its id 'tab'.
	 *
	 * @returns {boolean} Returns true if all button instances are successfully removed, false otherwise.
	 */
	remove() {
		const { buttonInstances } = this.config

		buttonInstances.forEach((buttonInstance) => {
			try {
				buttonInstance.remove()
			} catch (error) {
				console.error(`Error: ${error}`)
				return false
			}
		})

		this._removeById(`tab`)
		return true
	}
}

export { Tab }

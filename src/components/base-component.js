import { setAttributes } from '@components/utilities/set-attributes'
import { sanitizeValue } from '@utilities/sanitize-value'
import { setProperties } from './utilities/set-properties'

/**
 * Creates a base component with utility methods for creating container elements, icons, text elements, and removing elements from the DOM.
 * Utilizes the `sanitizeValue` function to validate inputs and the `setAttributes` function to set attributes on elements.
 */
class BaseComponent {
	constructor(config) {
		this.config = sanitizeValue(config, 'object') || {}
	}

	/**
	 * Creates a container element with the specified tag name and attributes.
	 *
	 * @param {string} tagName - The tag name for the container element.
	 * @param {object} attributes - The attributes to be set on the container element.
	 * @param {object} [booleanAttributes] - The boolean attributes to be set on the container element.
	 * @returns {HTMLElement | null} The created container element or null if invalid inputs.
	 */
	_createContainer(tagName, attributes, booleanAttributes) {
		const isTagName = sanitizeValue(tagName, 'string')
		const isAttributes = sanitizeValue(attributes, 'object')

		const container = document.createElement(tagName)

		if (booleanAttributes) {
			sanitizeValue(booleanAttributes, 'object')
			setProperties(container, booleanAttributes)
		}

		if (!isTagName || !isAttributes) {
			return null
		}

		setAttributes(container, attributes)
		return container
	}

	/**
	 * Creates an icon element with the specified icon name.
	 *
	 * @param {string} iconName - The name of the icon to be displayed.
	 * @returns {HTMLElement | null} The created icon element or null if the icon name is invalid.
	 */
	_createIcon(iconName) {
		const isIconName = sanitizeValue(iconName, 'string')

		if (!isIconName) {
			return null
		}

		const iconElement = document.createElement('i')
		setAttributes(iconElement, { 'data-lucide': iconName })
		return iconElement
	}

	/**
	 * Creates a text element with the specified text content.
	 *
	 * @param {string} text - The text content for the text element.
	 * @returns {HTMLParagraphElement | null} The created text element or null if the text content is invalid.
	 */
	_createText(text) {
		const isText = sanitizeValue(text, 'string')

		if (!isText) {
			return null
		}

		const textElement = document.createElement('p')
		textElement.textContent = text
		return textElement
	}

	/**
	 * Removes an element from the DOM by its ID.
	 *
	 * @param {string} id - The ID of the element to be removed.
	 * @returns {boolean} Returns true if the element is successfully removed, false otherwise.
	 */
	_removeById(id) {
		const isId = sanitizeValue(id, 'string')

		if (!isId) {
			return false
		}

		const element = document.getElementById(id)

		if (!element) {
			return false
		}

		element.remove()
		return true
	}
}

export { BaseComponent }

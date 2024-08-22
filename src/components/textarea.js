import { BaseComponent } from './base-component'
import { sanitizeValue } from '@utilities/sanitize-value'

class Textarea extends BaseComponent {
	constructor(config) {
		super(config)
		this.config = sanitizeValue(config)
	}

	create() {
		const { id, className, placeholder, text, readOnly, hidden } = this.config
		const textarea = this._createContainer(
			'div',
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
		const textForTextarea = this._createText(text)
		textarea.appendChild(textForTextarea)

		return textarea
	}

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

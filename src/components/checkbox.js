import { sanitizeValue } from '@utilities/sanitize-value'
import { BaseComponent } from './base-component'

class Checkbox extends BaseComponent {
	constructor(config) {
		super(config)
		this.config = sanitizeValue(config, 'object')
	}

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

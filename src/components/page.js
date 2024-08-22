import { BaseComponent } from './base-component'
import { sanitizeValue } from '@utilities/sanitize-value'
import { Button } from './button'

class Page extends BaseComponent {
	constructor(config) {
		super(config)
		this.config = sanitizeValue(config, 'object')
	}

	create() {
		const { elements, zIndex, id } = this.config
		const page = this._createContainer('div', {
			id: `page-${id}`,
			class: 'page',
			style: `z-index: ${zIndex}`
		})
		const header = this._createContainer('div', {
			class: 'page-header'
		})

		const zIndexForMainPages = 10

		if (zIndex > zIndexForMainPages) {
			const exitButtonConfig = {
				icon: 'chevron-left',
				id: `exit-page-${zIndex}`,
				className: 'exit',
				type: 'rounded-square',
				events: [
					{
						type: 'click',
						func: this.remove.bind(this)
					}
				]
			}
			const exitButton = new Button(exitButtonConfig).create()
			header.appendChild(exitButton)
		}

		if (elements.header) {
			elements.header.forEach((element) => {
				header.appendChild(element.create())
			})
		}

		const body = this._createContainer('div', {
			class: 'page-body'
		})

		if (elements.body) {
			elements.body.forEach((element) => {
				body.appendChild(element.create())
			})
		}

		page.appendChild(header)
		page.appendChild(body)

		return page
	}

	remove() {
		const { elements, id } = this.config

		const elementId = `page-${id}`
		const page = document.getElementById(elementId)

		if (elements.header) {
			elements['header'].forEach((element) => {
				element.remove()
			})
		}

		if (elements.body) {
			elements['body'].forEach((element) => {
				element.remove()
			})
		}

		if (page) {
			page.remove()
			return true
		}

		return false
	}
}

export { Page }

'use strict'

import { isConfigVerified } from '@utilities/config/config-verifier'
import { setAttributes } from '@utilities/components/set-attributes'
import { Button } from './button'

class Page {
	#config

	constructor(config) {
		this.#config = isConfigVerified('page', config) ? config : {}
	}

	create() {
		const { elements, z_index, id } = this.#config

		const header_elements = this.#createNodes(elements.header)
		const body_elements = this.#createNodes(elements.body)

		const PAGE = document.createElement('div')
		setAttributes(PAGE, {
			id: `page-${id}`,
			class_name: 'page',
			style: `z-index: ${z_index}`
		})
		const HEADER = this.#createHeader(header_elements, z_index)
		const BODY = this.#createBody(body_elements)

		PAGE.appendChild(HEADER)
		PAGE.appendChild(BODY)
		return PAGE
	}

	remove() {
		const { id, elements } = this.#config
		let PAGE = document.getElementById(`page-${id}`)

		this.#removeNodes(elements.header)
		this.#removeNodes(elements.body)

		if (!PAGE) return
		PAGE.remove()
		PAGE = null
	}

	#createNodes(elements) {
		if (!elements) return

		const element_array = []

		elements.forEach((element) => {
			element_array.push(element.create())
		})

		return element_array
	}

	#createHeader(elements, z_index) {
		const HEADER = document.createElement('div')
		setAttributes(HEADER, {
			class: 'page-header'
		})

		if (z_index >= 0 && z_index <= 5) {
			return HEADER
		}

		const exit_config = {
			icon: 'chevron-left',
			id: `exit-button-page-${z_index}`,
			class: 'exit',
			type: 'rounded-square',
			events: [
				{
					event_name: 'click',
					func: this.remove.bind(this)
				}
			]
		}
		const exit_button = new Button(exit_config).create()

		HEADER.appendChild(exit_button)

		if (elements) {
			elements.forEach((element) => {
				HEADER.appendChild(element)
			})
		}

		return HEADER
	}

	#createBody(elements) {
		const BODY = document.createElement('div')
		setAttributes(BODY, {
			class: 'page-body'
		})

		elements.forEach((element) => {
			BODY.appendChild(element)
		})

		return BODY
	}

	#removeNodes(elements) {
		if (!elements) return

		elements.forEach((element) => {
			element.remove()
			element = null
		})
	}
}

export { Page }

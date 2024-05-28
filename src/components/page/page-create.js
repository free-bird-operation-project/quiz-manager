'use strict'

import { isConfigVerified } from '../../utilities/config/config-verifier'

function createPage(config, remove) {
	if (!isConfigVerified(config)) return

	const { elements, z_index } = config

	const PAGE = document.createElement('div')
	setAttributes(PAGE, {
		style: `z-index: ${z_index}`
	})
	const HEADER = createHeader(elements.header, remove)
	const BODY = createBody(elements.body)

	PAGE.appendChild(HEADER)
	PAGE.appendChild(BODY)
	return PAGE
}

function createHeader(elements, remove) {
	const HEADER = document.createElement('div')
	const exit_config = {
		button: 'chevron-left',
		id: 'exit-button-page',
		class_name: 'exit',
		events: [
			{
				event_name: 'click',
				func: remove
			}
		]
	}
	const exit_button = new Button(exit_config).create()

	HEADER.appendChild(exit_button)
	elements.forEach((element) => {
		HEADER.appendChild(element)
	})
	return HEADER
}

function createBody(elements) {
	const BODY = document.createElement('div')

	elements.forEach((element) => {
		BODY.appendChild(element)
	})
	return BODY
}

export { createPage }

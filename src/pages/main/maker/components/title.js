'use strict'

import { setAttributes } from '@utilities/components/set-attributes'

class Title {
	create() {
		const title = document.createElement('div')
		setAttributes(title, {
			class: 'main-page-title',
			id: 'maker-title'
		})
		title.textContent = 'Quiz Maker'

		return title
	}

	remove() {
		let title = document.getElementById('maker-title')

		if (title) {
			title.remove()
			title = null
		}
	}
}

export { Title }

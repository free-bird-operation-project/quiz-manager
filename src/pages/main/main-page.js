'use strict'

import { MainTab } from './tab'
import { MakerPage } from './maker/maker-page'
import { ManagerPage } from './manager/manager-page.js'

class MainPage {
	constructor() {
		this.maker_page = new MakerPage()
		this.manager_page = new ManagerPage()
		this.tab = new MainTab()
	}
	create() {
		let main_page = this.#createMainPage()
		let maker_page = this.maker_page.create()
		let manager_page = this.manager_page.create()
		let tab = this.tab.create()

		main_page.appendChild(maker_page)
		main_page.appendChild(manager_page)
		main_page.appendChild(tab)

		return main_page
	}

	remove() {
		this.maker_page.remove()
		this.manager_page.remove()
		this.tab.remove()
	}

	#createMainPage() {
		const main_container = document.querySelector('main')

		if (!main_container) {
			const main_container = document.createElement('main')
			document.body.appendChild(main_container)
			return main_container
		}

		return main_container
	}
}

export { MainPage }

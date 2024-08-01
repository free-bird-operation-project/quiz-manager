'use strict'

import { Tab } from '@components/tab'
import { Button } from '@components/button'

class MainTab {
	#config
	#manager_config = {
		icon: 'folder',
		id: 'manager',
		class_name: 'tab-button tab-active',
		type: 'rounded-square',
		events: [
			{
				event_name: 'click',
				func: this.#managerTap.bind(this)
			}
		]
	}

	#maker_config = {
		icon: 'pencil-ruler',
		id: 'maker',
		class_name: 'tab-button',
		type: 'rounded-square',
		events: [
			{
				event_name: 'click',
				func: this.#makerTap.bind(this)
			}
		]
	}

	#maker_button = new Button(this.#maker_config)
	#manager_button = new Button(this.#manager_config)

	constructor() {
		this.#config = {
			buttons: [this.#maker_button.create(), this.#manager_button.create()]
		}
		this.instance = new Tab(this.#config)
	}

	create() {
		return this.instance.create()
	}

	remove() {
		return this.instance.remove()
	}

	#makerTap() {
		const maker_button = document.getElementById('tab-button-0')
		const manager_button = document.getElementById('tab-button-1')
		const maker_page = document.getElementById('page-maker')
		const manager_page = document.getElementById('page-manager')

		maker_button.classList.add('tab-active')
		manager_button.classList.remove('tab-active')

		manager_page.setAttribute('style', 'z-index: 1')
		maker_page.setAttribute('style', 'z-index: 2')
	}

	#managerTap() {
		const maker_button = document.getElementById('tab-button-0')
		const manager_button = document.getElementById('tab-button-1')
		const maker_page = document.getElementById('page-maker')
		const manager_page = document.getElementById('page-manager')

		manager_button.classList.add('tab-active')
		maker_button.classList.remove('tab-active')

		maker_page.setAttribute('style', 'z-index: 1')
		manager_page.setAttribute('style', 'z-index: 2')
	}
}

export { MainTab }

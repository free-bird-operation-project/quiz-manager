'use strict'

import { isConfigVerified } from '@utilities/config/config-verifier'
import { setAttributes } from '@utilities/components/set-attributes'

class Checkbox {
	#config
	#click_event_handler

	constructor(config) {
		this.#config = isConfigVerified('checkbox', config) ? config : {}
		this.#click_event_handler = this.#handleClick.bind(this)
	}

	create() {
		const { id, class_name, target_id, group_name } = this.#config

		this.#removeLocalStorageCheckboxesItems()

		const node = this.#createNode(id, class_name, target_id, group_name)
		const CHECKBOX = this.#setEvents(node)

		return CHECKBOX
	}

	remove() {
		const { id } = this.#config
		if (!id) return

		let CHECKBOX = document.getElementById(id)

		if (!CHECKBOX) return

		CHECKBOX.removeEventListener('click', this.#click_event_handler)
		CHECKBOX.remove()
		CHECKBOX = null

		this.#removeLocalStorageCheckboxesItems()
	}

	#handleClick(node) {
		const current_state = node.dataset.state
		const new_state = this.#changeState(current_state)
		node.dataset.state = new_state

		const icon = node.querySelector('i')
		const new_icon = this.#changeIcon(icon, new_state)
		icon.dataset.lucide = new_icon

		this.#manageTargets(
			node.dataset.groupName,
			node.dataset.targetId,
			new_state
		)
	}

	#changeState(state) {
		return state === 'false' ? 'true' : 'false'
	}

	#setEvents(node) {
		node.addEventListener('click', () => {
			this.#click_event_handler(node)
		})

		return node
	}

	#changeIcon(icon, state) {
		return state === 'true'
			? (icon.dataset.lucide = 'square-check')
			: (icon.dataset.lucide = 'square')
	}

	#createIcon() {
		const icon = document.createElement('i')
		setAttributes(icon, {
			'data-lucide': 'square'
		})
		icon.textContent = 'Squares'

		return icon
	}

	#createNode(id, class_name, target_id, group_name) {
		const node = document.createElement('div')
		const icon = this.#createIcon()

		setAttributes(node, {
			'id': id,
			'class': `${class_name} checkboxes`.trim(),
			'data-state': 'false',
			'data-group-name': `${group_name}-checkboxes`,
			'data-target-id': target_id
		})

		node.appendChild(icon)

		return node
	}

	#manageTargets(group_name, target_id, state) {
		if (state === 'true') {
			return this.#addTarget(group_name, target_id)
		}

		return this.#removeTarget(group_name, target_id)
	}

	#addTarget(group_name, target_id) {
		let list_of_targets = this.#getTargetsFromStorage(group_name)

		if (list_of_targets.includes(target_id)) return

		list_of_targets.push(target_id)
		this.#setTargetsInStorage(group_name, list_of_targets)

		return list_of_targets
	}

	#removeTarget(group_name, target_id) {
		let list_of_targets = this.#getTargetsFromStorage(group_name)
		const index = list_of_targets.indexOf(target_id)

		if (index !== -1) {
			list_of_targets.splice(index, 1)
			this.#setTargetsInStorage(group_name, list_of_targets)
		}

		return list_of_targets
	}

	#getTargetsFromStorage(group_name) {
		const suffixed_group_name = `${group_name}-checkboxes`
		return JSON.parse(localStorage.getItem(suffixed_group_name)) || []
	}

	#setTargetsInStorage(group_name, targets) {
		const suffixed_group_name = `${group_name}-checkboxes`
		localStorage.setItem(suffixed_group_name, JSON.stringify(targets))
	}

	#removeLocalStorageCheckboxesItems() {
		const suffix = '-checkboxes'

		for (let key in localStorage) {
			if (key.endsWith(suffix)) {
				localStorage.removeItem(key)
			}
		}
	}
}

export { Checkbox }

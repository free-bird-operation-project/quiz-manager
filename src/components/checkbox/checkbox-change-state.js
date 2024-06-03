'use strict'

import { isConfigVerified } from '@utilities/config/config-verifier'

function changeCheckboxState(config) {
	if (!isConfigVerified('checkbox', config)) return

	const { id, group_name, target_id } = config

	const initial_state = document.getElementById(id).dataset.state
	const CHECKBOX = document.getElementById(id)

	if (!CHECKBOX) return false

	CHECKBOX.addEventListener('click', () => {
		const state = changeState(initial_state)
		changeIcon(state, id)
		manageTargets(group_name, target_id, state)
		checkboxElement.dataset.state = state
	})

	return true
}

function changeIcon(state, id) {
	const element = document.getElementById(id)
	if (!element) return

	if (!state) {
		return (element.dataset.lucide = 'square-check')
	}

	return (element.dataset.lucide = 'square')
}

function changeState(state) {
	return !state
}

function manageTargets(group_name, target_id, state) {
	let list_of_targets = JSON.parse(localStorage.getItem(group_name)) || []

	if (state) {
		if (!list_of_targets.includes(target_id)) {
			list_of_targets.push(target_id)
			localStorage.setItem(group_name, JSON.stringify(list_of_targets))
		}
		return
	}

	const index = list_of_targets.indexOf(target_id)
	const not_found = -1

	if (index !== not_found) {
		list_of_targets.splice(index, 1)
		localStorage.setItem(group_name, JSON.stringify(list_of_targets))
	}
}

export { changeCheckboxState }

'use strict'

import { Button } from '@components/button'
import { QuizForm } from '../features/quiz-form/quiz-form'
import { createLucideIcons } from '@utilities/integration/create-lucide-icons'
import { keydownTextareas, sugar } from '../features/quiz-form/database/textarea-event-listener'

class AddQuizFormButton {
	#config

	constructor() {
		this.#config = {
			icon: 'plus',
			id: 'add-quiz-form',
			class_name: 'maker-button',
			type: 'rounded-square',
			events: [
				{
					event_name: 'click',
					func: this.tap.bind(this)
				}
			]
		}
		this.instance = new Button(this.#config)
	}

	create() {
		return this.instance.create()
	}

	remove() {
		return this.instance.remove()
	}

	tap() {
		const quiz_form = new QuizForm()
		const page_body = document.querySelector('#page-maker').querySelector('.page-body')
		page_body.appendChild(quiz_form.create())
		createLucideIcons()
		keydownTextareas()
	}
}

export { AddQuizFormButton }

'use strict'

import { IndexAndIdContainer } from './components/container-index-and-id'
import { DifficultyButton } from './components/button-difficulty'
import { LockAndUnlockButton } from './components/button-lock-and-unlock'
import { ModalButton } from './components/button-modal'
import { QuestionTextarea } from './components/textarea-question'
import { ChoiceATextarea } from './components/textarea-choice-a'
import { ChoiceBTextarea } from './components/textarea-choice-b'
import { ChoiceCTextarea } from './components/textarea-choice-c'
import { ChoiceDTextarea } from './components/textarea-choice-d'
import { ReferencesTextarea } from './components/textarea-references'
import { TagsButton } from './components/button-tags'
import { TagsTextarea } from './components/textarea-tags.js'
import { setAttributes } from '@utilities/components/set-attributes'

class QuizForm {
	static index = 1
	static index_removed = []

	constructor(quiz_object) {
		this.quiz_object = quiz_object || {}
		this.index = QuizForm.index
		this.index_and_id_container = new IndexAndIdContainer(this.index)
		this.difficulty_button = new DifficultyButton(this.quiz_object, this.index)
		this.lock_and_unlock_button = new LockAndUnlockButton(
			this.quiz_object,
			this.index,
			this.lock.bind(this),
			this.unlock.bind(this)
		)
		this.modal_button = new ModalButton(this.index)
		this.question_textarea = new QuestionTextarea(this.quiz_object, this.index)
		this.choice_a_textarea = new ChoiceATextarea(this.quiz_object, this.index)
		this.choice_b_textarea = new ChoiceBTextarea(this.quiz_object, this.index)
		this.choice_c_textarea = new ChoiceCTextarea(this.quiz_object, this.index)
		this.choice_d_textarea = new ChoiceDTextarea(this.quiz_object, this.index)
		this.references_textarea = new ReferencesTextarea(this.quiz_object, this.index)
		this.tags_button = new TagsButton(this.index)
		this.tags_textarea = new TagsTextarea(this.quiz_object, this.index)
		this.main_container = this.#createContainer()
	}

	create() {
		QuizForm.index++
		this.main_container.appendChild(this.index_and_id_container.create())
		this.main_container.appendChild(this.difficulty_button.create())
		this.main_container.appendChild(this.lock_and_unlock_button.create())
		this.main_container.appendChild(this.modal_button.create())
		this.main_container.appendChild(this.question_textarea.create())
		this.main_container.appendChild(this.choice_a_textarea.create())
		this.main_container.appendChild(this.choice_b_textarea.create())
		this.main_container.appendChild(this.choice_c_textarea.create())
		this.main_container.appendChild(this.choice_d_textarea.create())
		this.main_container.appendChild(this.references_textarea.create())
		this.main_container.appendChild(this.tags_textarea.create())
		this.main_container.appendChild(this.tags_button.create())

		return this.main_container
	}

	remove() {
		QuizForm.index_removed.push(this.index)

		QuizForm.index--
		this.index_and_id_container.remove()
		this.difficulty_button.remove()
		this.lock_and_unlock_button.remove()
		this.modal_button.remove()
		this.question_textarea.remove()
		this.choice_a_textarea.remove()
		this.choice_b_textarea.remove()
		this.choice_c_textarea.remove()
		this.choice_d_textarea.remove()
		this.references_textarea.remove()
		this.tags_textarea.remove()
		this.tags_button.remove()

		let container = document.getElementById(`quiz-form-container-${this.index}`)
		container.remove()
		container = null
	}

	lock() {
		this.question_textarea.lock()
		this.choice_a_textarea.lock()
		this.choice_b_textarea.lock()
		this.choice_c_textarea.lock()
		this.choice_d_textarea.lock()
		this.references_textarea.lock()
		this.tags_textarea.lock()
	}

	unlock() {
		this.question_textarea.unlock()
		this.choice_a_textarea.unlock()
		this.choice_b_textarea.unlock()
		this.choice_c_textarea.unlock()
		this.choice_d_textarea.unlock()
		this.references_textarea.unlock()
		this.tags_textarea.unlock()
	}

	#createContainer() {
		const container = document.createElement('div')
		setAttributes(container, {
			class: 'quiz-form-container',
			id: `quiz-form-container-${this.index}`
		})
		return container
	}
}

export { QuizForm }

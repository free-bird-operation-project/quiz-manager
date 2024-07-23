'use strict'

import { Page } from '@components/page'
import { Title } from './components/title'
import { SmartAssistantButton } from './components/button-smart-assistant'
import { ConfigQuizButton } from './components/button-config-quiz'
import { PreviewButton } from './components/button-preview'
import { SaveButton } from './components/button-save'
import { AddQuizFormButton } from './components/button-add-quiz-form'

class MakerPage {
	#config

	constructor() {
		this.#config = {
			id: 'maker',
			elements: {
				header: [
					new Title(),
					new SmartAssistantButton(),
					new ConfigQuizButton(),
					new PreviewButton(),
					new SaveButton()
				],
				body: [new AddQuizFormButton()]
			},
			z_index: 1
		}
		this.instance = new Page(this.#config)
	}

	create() {
		return this.instance.create()
	}

	remove() {
		return this.instance.remove()
	}
}

export { MakerPage }

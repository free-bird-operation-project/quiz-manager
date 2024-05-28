'use strict'

import { isConfigVerified } from '../../utilities/config/config-verifier'

function removeModal(config) {
	if (!isConfigVerified(config)) return

	const { id } = config
	const MODAL = document.createElement(id)

	if (!MODAL) return
	MODAL.remove()
}

export { removeModal }

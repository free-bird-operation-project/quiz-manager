'use strict'

import { isConfigVerified } from '@utilities/config/config-verifier'

function removePage(config) {
	if (!isConfigVerified('page', config)) return

	const { id } = config
	const PAGE = document.createElement(id)

	if (!PAGE) return
	PAGE.remove()
}

export { removePage }

'use strict'

import { hasValidAttributes } from './has-valid-attributes'
import { hasValidTypes } from './has-valid-types'
import { isConfig } from './is-config'

function isConfigVerified(config) {
	const IS_CONFIG = isConfig(config)
	const HAS_VALID_ATTRRIBUTES = hasValidAttributes(config)
	const HAS_VALID_TYPES = hasValidTypes()

	return IS_CONFIG && HAS_VALID_ATTRRIBUTES && HAS_VALID_TYPES
}

export { isConfigVerified }

'use strict'

import { hasValidAttributes } from './has-valid-attributes'
import { hasValidTypes } from './has-valid-types'
import { isConfig } from './is-config'
import { isElement } from './is-element'

function isConfigVerified(element, config) {
	const IS_ELEMENT = isElement(element)
	const IS_CONFIG = isConfig(config)
	const HAS_VALID_ATTRRIBUTES = hasValidAttributes(element, config)
	const HAS_VALID_TYPES = hasValidTypes(config)

	return IS_ELEMENT && IS_CONFIG && HAS_VALID_ATTRRIBUTES && HAS_VALID_TYPES
}

export { isConfigVerified }

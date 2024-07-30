'use strict'

/**
 * Sanitizes the input `element` based on the specified `type`.
 * Validates that the `element` is of the correct type and that `type` is a valid string.
 * If any validation fails, logs an error message and returns `null`.
 *
 * @param {*} element - The value to be validated. Can be of various types including boolean, string, array, object, number, HTMLElement, bigint, symbol, or function.
 * @param {string} type - The expected type of the `element`. Should be a string representing the type (e.g., "boolean", "string", "array", "object", "number", "HTMLElement", "bigint", "symbol", "function", or "null").
 *
 * @returns {*} The original `element` if all validations pass; otherwise, `null`.
 */
function sanitizeElements(element, type) {
	let flag = false
	const conditionList = [
		{
			condition: element === undefined || element === null,
			message: 'Invalid input: element is required.'
		},
		{
			condition: !type,
			message: 'Invalid input: type is required.'
		},
		{
			condition:
				typeof element !== 'boolean' &&
				typeof element !== 'string' &&
				!Array.isArray(element) &&
				typeof element !== 'object' &&
				typeof element !== 'number' &&
				!(element instanceof HTMLElement) &&
				typeof element !== 'bigint' &&
				typeof element !== 'symbol' &&
				typeof element !== 'function',
			message:
				'Invalid input: element must be of a valid type (boolean, string, array, object, number, HTMLElement, bigint, symbol, or function).'
		},
		{
			condition: typeof type !== 'string',
			message: 'Invalid input: type must be a string.'
		},
		{
			condition: !(
				(type === 'array' && Array.isArray(element)) ||
				(type === 'object' &&
					element !== null &&
					typeof element === 'object' &&
					!Array.isArray(element) &&
					!(element instanceof HTMLElement)) ||
				(type === 'HTMLElement' && element instanceof HTMLElement) ||
				(type === 'null' && element === null) ||
				type === typeof element
			),
			message: `Notice: The element and type are not equal. Element is of type ${typeof element}, while type is ${type}.`
		}
	]

	conditionList.forEach((condition) => {
		if (condition.condition) {
			console.error(condition.message)
			flag = true
		}
	})

	if (flag) {
		return null
	}

	return element
}

export { sanitizeElements }

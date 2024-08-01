/**
 * Sanitizes the input `value` based on the specified `type`.
 * Validates that the `value` is of the correct type and that `type` is a valid string.
 * If any validation fails, logs an error message and returns `null`.
 *
 * @param {*} value - The value to be validated. Can be of various types including boolean, string, array, object, number, HTMLElement, bigint, symbol, or function.
 * @param {string} type - The expected type of the `value`. Should be a string representing the type (e.g., "boolean", "string", "array", "object", "number", "HTMLElement", "bigint", "symbol", "function", or "null").
 *
 * @returns {*} The original `value` if all validations pass; otherwise, `null`.
 *
 * @example
 * sanitizeValue('test', 'string') // returns 'test'
 * sanitizeValue(123, 'number') // returns 123
 * sanitizeValue([], 'array') // returns []
 * sanitizeValue({}, 'object') // returns {}
 * sanitizeValue(false, 'boolean') // returns false
 * sanitizeValue(document.createElement('div'), 'HTMLElement') // returns <div></div>
 * sanitizeValue(null, 'string') // returns null
 */
function sanitizeValue(value, type) {
	let flag = false
	const conditionList = [
		{
			condition: value === undefined || value === null,
			message: 'Invalid input: value is required.'
		},
		{
			condition: typeof type !== 'string',
			message: 'Invalid input: type must be a string.'
		},
		{
			condition: !type,
			message: 'Invalid input: type is required.'
		},
		{
			condition:
				!['boolean', 'string', 'object', 'number', 'bigint', 'symbol', 'function'].includes(
					typeof value
				) &&
				!Array.isArray(value) &&
				!(value instanceof HTMLElement),
			message:
				'Invalid input: value must be of a valid type (boolean, string, array, object, number, HTMLElement, bigint, symbol, or function).'
		},
		{
			condition: !(
				(type === 'array' && Array.isArray(value)) ||
				(type === 'object' &&
					value !== null &&
					typeof value === 'object' &&
					!Array.isArray(value) &&
					!(value instanceof HTMLElement)) ||
				(type === 'HTMLElement' && value instanceof HTMLElement) ||
				(type === 'null' && value === null) ||
				type === typeof value
			),
			message: `Notice: The value and type are not equal. Value is of type ${typeof value}, while type is ${type}.`
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

	return value
}

export { sanitizeValue }

/**
 * Sanitizes the input `value` based on the specified `type`.
 * Validates that the `value` is of the correct type and that `type` is a valid string.
 * If any validation fails, logs an error message and returns `null`.
 *
 * @param {*} value - The value to be validated. Can be of various types including boolean, string, array, object, number, HTMLElement, bigint, symbol, or function.
 * @param {string} type - The expected type of the `value`. Should be a string representing the type (e.g., "boolean", "string", "array", "object", "number", "HTMLElement", "bigint", "symbol", "function", or "null").
 *
 * @returns {*} The original `value` if all validations pass; otherwise, `null`.
 */
function sanitizeValue(value, type) {
	let flag = false
	const conditionList = [
		{
			condition: value === undefined || value === null,
			message: 'Invalid input: value is required.'
		},
		{
			condition: !type,
			message: 'Invalid input: type is required.'
		},
		{
			condition:
				typeof value !== 'boolean' &&
				typeof value !== 'string' &&
				!Array.isArray(value) &&
				typeof value !== 'object' &&
				typeof value !== 'number' &&
				!(value instanceof HTMLElement) &&
				typeof value !== 'bigint' &&
				typeof value !== 'symbol' &&
				typeof value !== 'function',
			message:
				'Invalid input: value must be of a valid type (boolean, string, array, object, number, HTMLElement, bigint, symbol, or function).'
		},
		{
			condition: typeof type !== 'string',
			message: 'Invalid input: type must be a string.'
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
			message: `Notice: The value and type are not equal. value is of type ${typeof value}, while type is ${type}.`
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

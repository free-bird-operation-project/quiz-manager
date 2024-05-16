'use strict';
export function hasValidTypes(config) {
	let flag = true;
	const LIST_OF_CONDITION_FOR_TYPES = [
		{
			condition: typeof config !== 'object',
			message: 'The given configuration is not an object.'
		},
		{
			condition:
				config.class_name !== undefined &&
				typeof config.class_name !== 'string',
			message: 'The class_name is not a string.'
		},
		{
			condition: config.text !== undefined && typeof config.text !== 'string',
			message: 'The text is not a string.'
		},
		{
			condition: config.id !== undefined && typeof config.id !== 'string',
			message: 'The id is not a string.'
		},
		{
			condition: config.icon !== undefined && typeof config.icon !== 'string',
			message: 'The icon is not a string.'
		},
		{
			condition: config.type !== undefined && typeof config.type !== 'string',
			message: 'The type is not a string.'
		},
		{
			condition:
				config.events !== undefined && typeof config.events !== 'object',
			message: 'The events is not an object.'
		}
	];

	LIST_OF_CONDITION_FOR_TYPES.forEach((item) => {
		if (item.condition) {
			console.error(item.message);
			flag = false;
		}
	});

	return flag;
}

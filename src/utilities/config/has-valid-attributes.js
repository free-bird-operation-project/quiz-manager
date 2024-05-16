'use strict';

function hasValidAttributes(config) {
	const LIST_OF_VALID_ATTRIBUTES = [
		'class_name',
		'id',
		'text',
		'events',
		'icon',
		'type'
	];
	let flag = true;

	LIST_OF_VALID_ATTRIBUTES.forEach((valid_attribute) => {
		config.forEach((config_attribute) => {
			if (config_attribute !== valid_attribute) {
				console.error(
					`The attribute ${config_attribute} is not recognized as valid.`
				);
				flag = false;
			}
		});
	});

	return flag;
}

export { hasValidAttributes };

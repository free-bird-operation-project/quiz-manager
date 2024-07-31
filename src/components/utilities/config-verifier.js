/**
 * Class for verifying configuration settings of different components.
 */
class ConfigVerifier {
	#validAttributesList = [
		{ button: ['className', 'events', 'icon', 'id', 'text', 'type'] },
		{ checkbox: ['className', 'groupName', 'hidden', 'id', 'state', 'targetId'] },
		{ container: ['className', 'elements', 'id', 'text'] },
		{ modal: ['buttons', 'icon', 'id', 'title'] },
		{ page: ['elements', 'id', 'zIndex'] },
		{ snackbar: ['message'] },
		{ tab: ['buttons'] },
		{ textarea: ['className', 'hidden', 'id', 'placeholder', 'readonly', 'text'] }
	]

	#validAttributesTypesList = {
		string: [
			'className',
			'groupName',
			'icon',
			'id',
			'message',
			'placeholder',
			'text',
			'title',
			'type'
		],
		array: ['buttons', 'events'],
		boolean: ['hidden', 'readonly', 'state'],
		number: ['zIndex'],
		object: ['elements']
	}

	/**
	 * Creates an instance of ConfigVerifier.
	 *
	 * @param {string} componentName - The name of the component to be verified.
	 * @param {Object} config - The configuration object containing attributes to be verified.
	 */
	constructor(componentName, config) {
		this.componentName = componentName
		this.config = config
	}

	/**
	 * Initializes the configuration verification process by checking the component name, config property,
	 * valid attributes, and attribute types.
	 *
	 * @returns {boolean} Returns true if all verification checks pass, false otherwise.
	 */
	initialize() {
		return (
			this.#isComponentName() &&
			this.#isConfig() &&
			this.#hasValidAttributes() &&
			this.#hasValidTypes()
		)
	}

	/**
	 * Checks if the provided component name is valid.
	 *
	 * @returns {boolean} Returns true if the component name is valid, false otherwise.
	 */
	#isComponentName() {
		if (!this.componentName) {
			console.error('Invalid input: componentName is required and must be a non-empty string.')
			return false
		}

		if (typeof this.componentName !== 'string') {
			console.error(
				`Invalid input: componentName is not a string but a ${typeof this.componentName}`
			)
			return false
		}

		return true
	}

	/**
	 * Checks if the config property is valid.
	 *
	 * @returns {boolean} Returns true if the config property is valid, false otherwise.
	 */
	#isConfig() {
		if (!this.config || this.config === undefined || Object.keys(this.config).length === 0) {
			console.error('Invalid input: config is required and must not be empty.')
			return false
		}

		if (typeof this.config !== 'object' || Array.isArray(this.config)) {
			console.error(`Invalid input: config is not an object but a ${typeof this.config}`)
			return false
		}

		return true
	}

	/**
	 * Checks if the provided configuration has valid attributes for the component.
	 *
	 * @returns {boolean} Returns true if all attributes are valid, false if any invalid attribute is found.
	 */
	#hasValidAttributes() {
		const validAttributesEntry = this.#validAttributesList.find((attributeList) =>
			attributeList.hasOwnProperty(this.componentName)
		)

		if (!validAttributesEntry) {
			console.error(`The ${this.componentName} is not found in the list.`)
			return false
		}

		const validAttributesForComponent = validAttributesEntry[`${this.componentName}`]
		const configAttributeKeys = Object.keys(this.config)
		const invalidAttributeKeys = configAttributeKeys.filter(
			(key) => !validAttributesForComponent.includes(key)
		)
		let isValid = true

		if (invalidAttributeKeys.length > 0) {
			invalidAttributeKeys.forEach((invalidKey) => {
				console.error(`The '${invalidKey}' is not valid attribute for '${this.componentName}'.`)
				isValid = false
			})
		}

		return isValid
	}

	/**
	 * Checks if the attributes in the configuration object have valid types based on predefined types.
	 *
	 * @returns {boolean} Returns true if all attribute types are valid, false if any attribute has an invalid type.
	 */
	#hasValidTypes() {
		let isValid = true
		const typeCheckFunctions = {
			string: (key, value) => {
				if (typeof value !== 'string') {
					console.error(`Invalid type for '${key}': Expected 'string', but got '${typeof value}'.`)
					isValid = false
				}
			},
			array: (key, value) => {
				if (!Array.isArray(value)) {
					console.error(`Invalid type for '${key}': Expected 'array', but got '${typeof value}'.`)
					isValid = false
				}
			},
			boolean: (key, value) => {
				if (typeof value !== 'boolean') {
					console.error(`Invalid type for '${key}': Expected 'boolean', but got '${typeof value}'.`)
					isValid = false
				}
			},
			number: (key, value) => {
				if (typeof value !== 'number') {
					console.error(`Invalid type for '${key}': Expected 'number', but got '${typeof value}'.`)
					isValid = false
				}
			},
			object: (key, value) => {
				if (typeof value !== 'object' || Array.isArray(value) || value === null) {
					console.error(`Invalid type for '${key}': Expected 'object', but got '${typeof value}'.`)
					isValid = false
				}
			}
		}

		Object.entries(this.#validAttributesTypesList).forEach(([type, attributes]) => {
			attributes.forEach((attribute) => {
				const value = this.config[attribute]

				if (value !== undefined) {
					typeCheckFunctions[type](attribute, value)
				}
			})
		})

		return isValid
	}
}

export { ConfigVerifier }

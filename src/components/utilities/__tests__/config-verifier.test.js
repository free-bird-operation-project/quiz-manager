import { JSDOM } from 'jsdom'
import { ConfigVerifier } from '../config-verifier'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement
global.MouseEvent = window.MouseEvent
global.DocumentFragment = window.DocumentFragment

describe('ConfigVerifier', () => {
	describe('Component Name Validation', () => {
		it('should validate a valid component name correctly', () => {
			const validButtonConfig = new ConfigVerifier('button', { className: 'btn', id: 'btn1' })
			expect(validButtonConfig.initialize()).toBe(true)
		})

		it('should reject an empty component name', () => {
			const emptyNameConfig = new ConfigVerifier('', { className: 'btn', id: 'btn1' })
			expect(emptyNameConfig.initialize()).toBe(false)
		})

		it('should reject an invalid component name', () => {
			const invalidComponentNameConfig = new ConfigVerifier('unknown', {
				className: 'btn',
				id: 'btn1'
			})
			expect(invalidComponentNameConfig.initialize()).toBe(false)
		})

		it('should reject a non-string component name', () => {
			const nonStringNameConfig = new ConfigVerifier(123, { className: 'btn', id: 'btn1' })
			expect(nonStringNameConfig.initialize()).toBe(false)
		})

		it('should handle a component name with leading/trailing spaces', () => {
			const spacedNameConfig = new ConfigVerifier('  button  ', { className: 'btn', id: 'btn1' })
			expect(spacedNameConfig.initialize()).toBe(false)
		})
	})

	describe('Config Property Validation', () => {
		it('should validate a valid config object', () => {
			const validButtonConfig = new ConfigVerifier('button', { className: 'btn', id: 'btn1' })
			expect(validButtonConfig.initialize()).toBe(true)
		})

		it('should reject null config', () => {
			const nullConfig = new ConfigVerifier('button', null)
			expect(nullConfig.initialize()).toBe(false)
		})

		it('should reject an array as config', () => {
			const arrayConfig = new ConfigVerifier('button', [])
			expect(arrayConfig.initialize()).toBe(false)
		})

		it('should reject an empty config object', () => {
			const emptyConfig = new ConfigVerifier('button', {})
			expect(emptyConfig.initialize()).toBe(false)
		})

		it('should reject config with incorrect data type', () => {
			const incorrectTypeConfig = new ConfigVerifier('button', 'string')
			expect(incorrectTypeConfig.initialize()).toBe(false)
		})
	})

	describe('Valid Attributes Check', () => {
		it('should validate all attributes for the button component', () => {
			const validButtonConfig = new ConfigVerifier('button', {
				className: 'btn',
				id: 'btn1',
				text: 'Click me',
				events: []
			})
			expect(validButtonConfig.initialize()).toBe(true)
		})

		it('should reject config with extra attributes for the button component', () => {
			const extraAttributesButtonConfig = new ConfigVerifier('button', {
				className: 'btn',
				id: 'btn1',
				extra: 'extra'
			})
			expect(extraAttributesButtonConfig.initialize()).toBe(false)
		})

		it('should validate all attributes for the checkbox component', () => {
			const validCheckboxConfig = new ConfigVerifier('checkbox', {
				className: 'checkbox',
				id: 'chk1',
				state: true,
				targetId: 'target1'
			})
			expect(validCheckboxConfig.initialize()).toBe(true)
		})

		it('should reject config with extra attributes for the checkbox component', () => {
			const extraAttributesCheckboxConfig = new ConfigVerifier('checkbox', {
				className: 'checkbox',
				id: 'chk1',
				extra: 'extra'
			})
			expect(extraAttributesCheckboxConfig.initialize()).toBe(false)
		})

		it('should validate all attributes for the container component', () => {
			const validContainerConfig = new ConfigVerifier('container', {
				className: 'container',
				id: 'cont1',
				text: 'Container text'
			})
			expect(validContainerConfig.initialize()).toBe(true)
		})

		it('should reject config with extra attributes for the container component', () => {
			const extraAttributesContainerConfig = new ConfigVerifier('container', {
				className: 'container',
				id: 'cont1',
				extra: 'extra'
			})
			expect(extraAttributesContainerConfig.initialize()).toBe(false)
		})

		it('should validate all attributes for the modal component', () => {
			const validModalConfig = new ConfigVerifier('modal', {
				buttons: [],
				icon: 'icon',
				id: 'modal1',
				title: 'Modal Title'
			})
			expect(validModalConfig.initialize()).toBe(true)
		})

		it('should reject config with extra attributes for the modal component', () => {
			const extraAttributesModalConfig = new ConfigVerifier('modal', {
				buttons: [],
				icon: 'icon',
				id: 'modal1',
				extra: 'extra'
			})
			expect(extraAttributesModalConfig.initialize()).toBe(false)
		})

		it('should validate all attributes for the page component', () => {
			const validPageConfig = new ConfigVerifier('page', { elements: {}, id: 'page1', zIndex: 10 })
			expect(validPageConfig.initialize()).toBe(true)
		})

		it('should reject config with extra attributes for the page component', () => {
			const extraAttributesPageConfig = new ConfigVerifier('page', {
				elements: [],
				id: 'page1',
				extra: 'extra'
			})
			expect(extraAttributesPageConfig.initialize()).toBe(false)
		})

		it('should validate all attributes for the snackbar component', () => {
			const validSnackbarConfig = new ConfigVerifier('snackbar', { message: 'Hello!' })
			expect(validSnackbarConfig.initialize()).toBe(true)
		})

		it('should reject config with extra attributes for the snackbar component', () => {
			const extraAttributesSnackbarConfig = new ConfigVerifier('snackbar', {
				message: 'Hello!',
				extra: 'extra'
			})
			expect(extraAttributesSnackbarConfig.initialize()).toBe(false)
		})

		it('should validate all attributes for the tab component', () => {
			const validTabConfig = new ConfigVerifier('tab', { buttons: [] })
			expect(validTabConfig.initialize()).toBe(true)
		})

		it('should reject config with missing attributes for the tab component', () => {
			const missingAttributesTabConfig = new ConfigVerifier('tab', {})
			expect(missingAttributesTabConfig.initialize()).toBe(false)
		})

		it('should reject config with extra attributes for the tab component', () => {
			const extraAttributesTabConfig = new ConfigVerifier('tab', { buttons: [], extra: 'extra' })
			expect(extraAttributesTabConfig.initialize()).toBe(false)
		})

		it('should validate all attributes for the textarea component', () => {
			const validTextareaConfig = new ConfigVerifier('textarea', {
				id: 'txt1',
				placeholder: 'Enter text',
				readonly: true,
				text: 'Some text'
			})
			expect(validTextareaConfig.initialize()).toBe(true)
		})

		it('should reject config with extra attributes for the textarea component', () => {
			const extraAttributesTextareaConfig = new ConfigVerifier('textarea', {
				id: 'txt1',
				placeholder: 'Enter text',
				extra: 'extra'
			})
			expect(extraAttributesTextareaConfig.initialize()).toBe(false)
		})
	})

	describe('Attribute Types Validation', () => {
		it('should validate correct attribute types for button component', () => {
			const validButtonConfig = new ConfigVerifier('button', {
				className: 'btn',
				id: 'btn1',
				text: 'Click me',
				events: []
			})
			expect(validButtonConfig.initialize()).toBe(true)
		})

		it('should reject invalid types for attributes in button component', () => {
			const invalidButtonConfig = new ConfigVerifier('button', {
				className: 'btn',
				id: 'btn1',
				text: 123,
				events: 'string'
			})
			expect(invalidButtonConfig.initialize()).toBe(false)
		})

		it('should validate correct attribute types for checkbox component', () => {
			const validCheckboxConfig = new ConfigVerifier('checkbox', {
				className: 'checkbox',
				id: 'chk1',
				state: true,
				targetId: 'target1'
			})
			expect(validCheckboxConfig.initialize()).toBe(true)
		})

		it('should reject invalid types for attributes in checkbox component', () => {
			const invalidCheckboxConfig = new ConfigVerifier('checkbox', {
				className: 'checkbox',
				id: 'chk1',
				state: 'true',
				targetId: 123
			})
			expect(invalidCheckboxConfig.initialize()).toBe(false)
		})

		it('should validate correct attribute types for container component', () => {
			const validContainerConfig = new ConfigVerifier('container', {
				className: 'container',
				id: 'cont1',
				text: 'Container text'
			})
			expect(validContainerConfig.initialize()).toBe(true)
		})

		it('should reject invalid types for attributes in container component', () => {
			const invalidContainerConfig = new ConfigVerifier('container', {
				className: 'container',
				id: 'cont1',
				text: 123
			})
			expect(invalidContainerConfig.initialize()).toBe(false)
		})

		it('should validate correct attribute types for modal component', () => {
			const validModalConfig = new ConfigVerifier('modal', {
				buttons: [],
				icon: 'icon',
				id: 'modal1',
				title: 'Modal Title'
			})
			expect(validModalConfig.initialize()).toBe(true)
		})

		it('should reject invalid types for attributes in modal component', () => {
			const invalidModalConfig = new ConfigVerifier('modal', {
				buttons: 'string',
				icon: 'icon',
				id: 'modal1',
				title: 123
			})
			expect(invalidModalConfig.initialize()).toBe(false)
		})

		it('should validate correct attribute types for page component', () => {
			const validPageConfig = new ConfigVerifier('page', { elements: {}, id: 'page1', zIndex: 10 })
			expect(validPageConfig.initialize()).toBe(true)
		})

		it('should reject invalid types for attributes in page component', () => {
			const invalidPageConfig = new ConfigVerifier('page', {
				elements: 'not an array',
				id: 'page1',
				zIndex: 'string'
			})
			expect(invalidPageConfig.initialize()).toBe(false)
		})

		it('should validate correct attribute types for snackbar component', () => {
			const validSnackbarConfig = new ConfigVerifier('snackbar', { message: 'Hello!' })
			expect(validSnackbarConfig.initialize()).toBe(true)
		})

		it('should reject invalid types for attributes in snackbar component', () => {
			const invalidSnackbarConfig = new ConfigVerifier('snackbar', { message: 123 })
			expect(invalidSnackbarConfig.initialize()).toBe(false)
		})

		it('should validate correct attribute types for tab component', () => {
			const validTabConfig = new ConfigVerifier('tab', { buttons: [] })
			expect(validTabConfig.initialize()).toBe(true)
		})

		it('should reject invalid types for attributes in tab component', () => {
			const invalidTabConfig = new ConfigVerifier('tab', { buttons: 'string' })
			expect(invalidTabConfig.initialize()).toBe(false)
		})

		it('should validate correct attribute types for textarea component', () => {
			const validTextareaConfig = new ConfigVerifier('textarea', {
				id: 'txt1',
				placeholder: 'Enter text',
				readonly: true,
				text: 'Some text'
			})
			expect(validTextareaConfig.initialize()).toBe(true)
		})

		it('should reject invalid types for attributes in textarea component', () => {
			const invalidTextareaConfig = new ConfigVerifier('textarea', {
				id: 'txt1',
				placeholder: 123,
				readonly: 'true',
				text: 123
			})
			expect(invalidTextareaConfig.initialize()).toBe(false)
		})
	})
})

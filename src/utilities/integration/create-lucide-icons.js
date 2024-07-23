'use strict'

import {
	createIcons,
	PencilRuler,
	Folder,
	Bot,
	Cog,
	Eye,
	Play,
	Save,
	Plus,
	Lock,
	Unlock,
	Circle,
	Tags,
	RectangleHorizontal,
	EllipsisVertical,
	Smile,
	Frown
} from 'lucide'

function createLucideIcons() {
	createIcons({
		icons: {
			PencilRuler,
			Folder,
			Bot,
			Cog,
			Play,
			Save,
			Eye,
			Plus,
			Lock,
			Unlock,
			Circle,
			Tags,
			RectangleHorizontal,
			EllipsisVertical,
			Smile,
			Frown
		}
	})
}

export { createLucideIcons }

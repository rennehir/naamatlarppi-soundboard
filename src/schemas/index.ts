import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import effect from './effect'
import soundboard from './soundboard'
import youtube from './youtube'

export const schemaTypes = [blockContent, effect, soundboard, youtube]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, effect, soundboard, youtube],
}

import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import effect from './effect'
import soundboard from './soundboard'

export const schemaTypes = [blockContent, effect, soundboard]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, effect, soundboard],
}

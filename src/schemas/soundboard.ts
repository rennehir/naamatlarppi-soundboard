import { defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'soundboard',
  title: 'Soundboard',
  fields: [
    {
      name: 'effects',
      title: 'Effects',
      type: 'array',
      of: [{ type: 'effect' }],
    },
  ],
})

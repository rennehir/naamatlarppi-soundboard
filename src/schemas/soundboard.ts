import { defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'soundboard',
  title: 'Soundboard',
  fields: [
    {
      name: 'songs',
      title: 'Songs',
      type: 'array',
      of: [{ type: 'youtube' }],
    },
    {
      name: 'effects',
      title: 'Effects',
      type: 'array',
      of: [{ type: 'effect' }],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Soundboard',
      }
    },
  },
})

import { defineType } from 'sanity'

export default defineType({
  type: 'object',
  name: 'effect',
  title: 'Sound effect',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'effect',
      title: 'Effect',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
      validation: (Rule) => Rule.required(),
    },
  ],
})

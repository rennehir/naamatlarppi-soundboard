import { AiFillYoutube } from 'react-icons/ai'
import { defineType } from 'sanity'

export default defineType({
  type: 'object',
  name: 'youtube',
  title: 'YouTube',
  icon: AiFillYoutube,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'file',
      title: 'File',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'color',
      title: 'Color',
      type: 'color',
      options: {
        disableAlpha: true,
        colorList: [
          '#1D2BE0',
          '#E00E0B',
          '#676FE0',
          '#E0C351',
          '#5CE084'
        ]
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      color: 'color',
    },
    prepare({ title, color }) {
      return {
        title,
        media: <AiFillYoutube color={color ? color.hex : 'inherit'} />,
      }
    },
  },
})

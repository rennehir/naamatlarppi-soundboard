import { MdMusicNote } from 'react-icons/md'
import { defineType } from 'sanity'

export default defineType({
  type: 'object',
  name: 'effect',
  title: 'Sound effect',
  icon: MdMusicNote,
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
    {
      name: 'color',
      title: 'Color',
      type: 'color',
      options: {
        disableAlpha: true,
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
        media: <MdMusicNote color={color ? color.hex : 'inherit'} />,
      }
    },
  },
})

import type { CollectionConfig } from 'payload'

const mediaDir = process.env.PAYLOAD_MEDIA_DIR || 'media'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: mediaDir,
    imageSizes: [
      {
        name: 'card',
        width: 640,
      },
    ],
  },
}

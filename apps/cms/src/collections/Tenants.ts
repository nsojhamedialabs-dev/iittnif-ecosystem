import type { CollectionConfig } from 'payload'

// Powers the multi-tenant split between iittnif-web and dronagiri-web —
// every TopicPages entry is scoped to one of these.
export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'e.g. "iittnif" or "dronagiri" — used in code, not shown to visitors.',
      },
    },
  ],
}
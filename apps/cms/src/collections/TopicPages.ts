import type { CollectionConfig } from 'payload'
// MOBILE-FIRST: see /MOBILE_FIRST.md — content fields here (title,
// summary, body) should be written mobile-legible: short titles,
// scannable summaries. This is a content-modeling concern, not just a CSS one.

// TopicPages — the single collection that powers EVERY [slug] dynamic
// route across the site: Core Areas, Applied Areas, Technology
// Development, HR & Skill Development, Meta Data Resources.
//
// This is the mechanism that answers "what if a new subsection appears
// later" — it does NOT require a new page.tsx file or a code deploy.
// A TIH Comms editor adds one entry here, and it appears in:
//   1. The correct [slug] route (rendered via the shared TopicPage template)
//   2. The correct mega-menu dropdown (nav queries this same collection)
//
// Draft field shape — to be finalized in Week 1 with Payload's actual
// field builder syntax. This is the CONTENT MODEL, not final code.

export const TopicPages: CollectionConfig = {

  slug: 'topic-pages',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    { name: 'tenant', type: 'select', options: ['iittnif', 'dronagiri'], required: true },

    // Which top-level nav tab this belongs under
    { name: 'section', type: 'select',
      options: ['technology-labs', 'hrd', 'startups-enablement'], required: true },

    // Which sub-menu / dynamic route group within that section
    // e.g. technology-labs -> core-areas | applied-areas | development | resources
    //      hrd             -> pathways
    { name: 'category', type: 'text', required: true },

    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'title', type: 'text', required: true },
    { name: 'summary', type: 'text' },          // one-liner, used in menu + card previews
    { name: 'body', type: 'richText' },
    {
  name: 'heroImage',
  type: 'upload',
  relationTo: 'media',
},
    { name: 'trlStage', type: 'select', options: [
      'research', 'prototype', 'validation', 'deployment'
    ] },                                          // maps to the chromatic spine accent
    { name: 'relatedLinks', type: 'array', fields: [
      { name: 'label', type: 'text' },
      { name: 'href', type: 'text' },
    ]},
    { name: 'order', type: 'number' },            // controls position within its menu

    // Hard rule inherited from PDR Section 09 — enforced at schema/access
    // level for ALL collections, not just this one. No financial, MoU,
    // approval, or disbursement fields ever live in a public collection.
  ],
}

/*
CONTENT MAP — every current menu item, mapped to this collection.
This is the migration checklist for populating TopicPages at launch.

section: technology-labs, category: core-areas
  quantum-technologies · geospatial-tools · data-science · radio-frequency
  · image-processing · indoor-mapping · robotics · defence

section: technology-labs, category: applied-areas
  precision-agriculture · disaster-management · smart-cities · smart-villages
  · land-records-and-insurance · navigation · policy-and-legal

section: technology-labs, category: development
  overview · translational-rd · gnss · gis · lidar · quantum-navigation
  · computer-vision · ai-ml · geo-intel-lab

section: technology-labs, category: resources
  navic-irnss-community · nav-i-gist

section: hrd, category: pathways
  fellowships-internships · ug · pg · phd · postdoc · skill-development
  · nav-i-fossee · nav-i-gee

section: startups-enablement — NOT in TopicPages, these are bespoke
  pages (innovations/, grand-challenges/) since there are only 2 items
  and each deserves distinct design treatment, not a shared template.

NOT in TopicPages (bespoke folders instead):
  about-tih/about-us, about-tih/vision-mission, about-tih/overview,
  technology-labs/collaborations (single item, own design)
*/

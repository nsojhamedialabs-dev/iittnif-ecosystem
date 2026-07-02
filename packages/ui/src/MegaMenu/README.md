# MegaMenu

Renders the dropdown navigation (the "About / Core Areas / Applied Areas"
and "Technology Development / Startups / HR" panels from the old site)
by querying the `topic-pages` CMS collection grouped by `section` +
`category` + `order` — NOT from a hardcoded array in this component.

This is the actual mechanism behind "add a subsection, don't touch code":
a new TopicPages entry with `category: core-areas` appears in this menu
automatically on next data fetch. Bespoke pages (About Us, Vision &
Mission, Collaborations, Innovations, Grand Challenges) are the only
items still manually listed here, because there are few of them and
they don't belong to a repeating category.

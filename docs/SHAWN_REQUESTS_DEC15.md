# Shawn's Implementation Requests - December 15, 2025

## Overview
Additional requirements for the Hylee Shopify theme based on conversation with Shawn.

---

## Navigation Updates

### ✅ 1. Logo as Home Button
**Status:** COMPLETED  
**Priority:** HIGH  
**Description:** Make the Hylee logo the home button and remove redundant "Home" link from navbar

**Requirements:**
- Logo should be clickable and navigate to homepage
- Remove "Home" link from main navigation
- Follows standard practice (Amazon, Walmart, Target)
- Good for brand/name recognition

**Completed:** Removed Home link from main navigation; logo already links to homepage

---

### ✅ 2. Rename "Products" to "Categories"
**Status:** COMPLETED  
**Priority:** HIGH  
**Description:** Change the main navigation link from "Products" to "Categories"

**Requirements:**
- Update navigation link text from "Products" to "Categories"
- This link should show the Product Category page with L1 categories
- More accurate naming convention

**Tasks:**
- [x] Update header.liquid navigation link text
- [x] Update translation file (locales) if applicable
- [x] Ensure link routes to collections/categories page

**Completed:** Changed navigation link from "Products" to "Categories" in header

---

## New Feature: "What's New" Dropdown

### ✅ 3. Add "What's New" Navigation Item with Dropdown
**Status:** COMPLETED  
**Priority:** HIGH  
**Description:** Replace "Deal & promotion & New section" with a "What's New" dropdown menu in main navigation

**Requirements:**
- Add "What's New" link to main navigation bar
- Implement dropdown menu on click/hover
- Dropdown should contain the following items:
  - Deals & Promotions
  - New Additions
  - Season Item Spotlights (e.g., new fall or spring items, Christmas, Halloween, back to school)
  - Special Events

**Tasks:**
- [x] Add "What's New" navigation item to header
- [x] Create dropdown menu structure
- [x] Style dropdown to match site theme (sky blue)
- [x] Add four menu items with proper routing:
  - [x] Deals & Promotions → `/collections/deals-promotions`
  - [x] New Additions → `/collections/new-arrivals`
  - [x] Season Item Spotlights → `/collections/seasonal`
  - [x] Special Events → `/collections/special-events`
- [x] Implement hover/click interaction
- [x] Mobile responsive behavior
- [x] Add ARIA accessibility attributes

**Completed:** Added dropdown with all 4 menu items, styled with sky blue theme, includes emoji icons, click-outside and ESC key support

**Note:** Collections need to be created in Shopify admin:
- `/collections/deals-promotions`
- `/collections/new-arrivals` (already exists)
- `/collections/seasonal`
- `/collections/special-events`

---

## Content Updates

### 🔵 4. Keep Blog
**Status:** NOT STARTED  
**Priority:** LOW  
**Description:** Maintain blog functionality (confirmed to keep)

**Requirements:**
- Ensure blog is accessible and functional
- No changes needed, just confirmation to retain

**Estimated Effort:** 0 minutes (no action needed)

---

## Future Additions

### 🔵 5. Social Media Integration
**Status:** NOT STARTED  
**Priority:** LOW  
**Description:** Add social media links/integration once site is live and operational

**Requirements:**
- Add social media icons/links to footer or header
- Will be implemented later once everything is up and running
- Platforms TBD

**Tasks:**
- [ ] Await confirmation on which social platforms
- [ ] Add social media icon links
- [ ] Style icons to match site theme

**Blocked By:** Site launch and social media account setup

**Estimated Effort:** 1-2 hours

---

## Summary of Changes

### Immediate Priority (High):
1. ✅ Logo as Home Button (COMPLETED)
2. ✅ Rename "Products" to "Categories" (COMPLETED)
3. ✅ Add "What's New" dropdown with 4 sub-items (COMPLETED)

### Future Priority (Low):
4. 🔵 Keep Blog (no action needed)
5. 🔵 Social Media Integration (post-launch)

---

## Notes & Clarifications

**From Conversation:**
- Shawn referenced Walmart's "departments" terminology for categories page
- Target uses "Category" for their equivalent section
- The horizontal categories bar below header is the correct implementation
- Logo being the home button is standard practice across major e-commerce sites
- "What's New" is a cleaner approach than having separate Deal/Promotion/New sections at top level

**Technical Considerations:**
- "What's New" dropdown will need proper collection structure in Shopify
- May need to implement product tagging strategy for seasonal/event items
- Dropdown styling should match the sky blue theme (#0ea5e9)
- Mobile view may need to convert dropdown to accordion or slide-out menu

---

## Status Legend
- ✅ **COMPLETED**: Work is done and deployed
- 🟡 **IN PROGRESS**: Currently being worked on
- 🔵 **NOT STARTED**: Planned but not yet begun
- 🔴 **BLOCKED**: Cannot proceed due to dependency

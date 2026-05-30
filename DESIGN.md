---
name: SIMANTAP Project Management
description: Minimalist, fast, and structured performance monitoring dashboard for teams.
colors:
  primary: "#0369A1"
  background: "#FFFFFF"
  surface: "#F9FAFB"
  surface-hover: "#F3F4F6"
  text-primary: "#111827"
  text-secondary: "#6B7280"
  border: "#E5E7EB"
  success: "#10B981"
  warning: "#F59E0B"
  error: "#EF4444"
typography:
  h1:
    fontFamily: "Inter, sans-serif"
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.2
  h2:
    fontFamily: "Inter, sans-serif"
    fontSize: 1rem
    fontWeight: 600
    lineHeight: 1.5
  body-md:
    fontFamily: "Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  label-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: 0.75rem
    fontWeight: 500
rounded:
  sm: 4px
  md: 6px
  lg: 8px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
components:
  card:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  sidebar-item-active:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.text-primary}"
  list-row:
    borderBottom: "1px solid {colors.border}"
    padding: "{spacing.sm} 0"
  badge-status:
    padding: "2px 8px"
    rounded: "{rounded.full}"
    fontSize: "{typography.label-sm.fontSize}"
    fontWeight: 500
    border: "1px solid {colors.border}"
  accordion-header:
    padding: "{spacing.md} 0"
    borderBottom: "1px solid {colors.border}"
    textColor: "{colors.text-primary}"
    fontWeight: 600
  chart-container:
    backgroundColor: "{colors.background}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  profile-sidebar:
    backgroundColor: "{colors.background}"
    borderLeft: "1px solid {colors.border}"
    padding: "0"
---

## Overview
SIMANTAP is a professional, data-driven team performance monitoring platform. The design prioritizes extreme clarity, fast scanning of information, and a productive, noise-free environment. It adopts a utilitarian, minimalist aesthetic akin to modern developer tools.

## Colors
The palette is intentionally subdued. The pure white (`#FFFFFF`) background creates a clean canvas. Surface colors (`#F9FAFB`) are used strictly for secondary areas like the sidebar or empty states. The primary color (`#0369A1`) is reserved for critical active states and primary buttons to ensure high visibility without overwhelming the user.

## Typography
Geometric sans-serif (Inter) drives the interface. The type scale is tight and compact (body text at 14px) to allow for high data density on list views, while maintaining readability through generous line-heights. 

## Spacing & Layout
The layout utilizes a classic SaaS structure with a fixed top navigation and a left sidebar. The spacing relies on a strict 8px grid system to establish a predictable vertical and horizontal rhythm. 

## Shapes
Corners are subtly rounded (6px for most interactive elements) to appear modern but professional. Avatars and status indicators use full pill shapes (9999px) to contrast with the rectangular structural elements.

## Elevation & Depth
This design uses a strict **Flat Design** philosophy. Depth and structural hierarchy are achieved exclusively through 1px hairline borders (`#E5E7EB`) and background color contrasts (e.g., white main canvas vs. light gray sidebar). 

## Rules to Never Break
- Never use box-shadow utilities for structural elements, modals, or cards.
- Never use multiple bright accent colors; stick to the semantic palette (Success, Warning, Error) only when status indicators require it.
- Always ensure active sidebar states have a clear visual contrast from inactive states.
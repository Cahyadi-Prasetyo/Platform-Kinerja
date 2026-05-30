[CONTEXT] 
Design a team performance monitoring and project management platform. The product helps professionals track work items, manage projects, and monitor performance in a highly structured environment.

[OVERALL STYLE]
Visual style: Minimalist / Editorial with strict Flat design elements. 
Mood: Professional, clean, data-driven. 
Inspired by: Linear, Jira, and GitHub Projects. The interface relies on hairline borders rather than shadows for depth.

[SCREEN TO GENERATE]
Generate the "Project Work Items (List View)" screen with this layout:
- Topnav & Left Sidebar: Keep the same structure as the Home dashboard (Brand logo, search bar, user avatar, collapsible navigation).
- Main Workspace Header: A breadcrumb ("MAGANG UMRAH 2026 > Work Items" with a badge "181"). On the right side, an action bar with view toggle icons (list, board, calendar), a "Display" button, an "Analytics" button, and a primary "Add work item" button.
- Main Content (List View): An accordion-style list grouped by status. 
  - Headers: "Backlog 0", "Todo 0", "In Progress 1", and "Done 180" (expanded).
  - List Rows (inside Done): Clean horizontal rows for each ticket.

[COMPONENTS]
Required components:
- Accordion Header: Bold text with the status name, item count, and an expand/collapse icon.
- Ticket Row: Contains a green check icon, Ticket ID (e.g., MAGANGUMRA-184), Ticket Title, a "Done" status pill, an icon-only button (e.g., chart icon), a date pill ("Mar 13 - Mar 13, 2026"), user avatars, a tag icon, and an overflow menu icon (...). Rows must have a bottom border.
- Primary Button: Solid blue (#0369A1) for "Add work item".

[DESIGN TOKENS]
Colors: Primary #0369A1, Background #FFFFFF, Surface #F9FAFB, Text-primary #111827, Text-secondary #6B7280, Border #E5E7EB, Success #10B981.
Typography: Inter. H1/H2 16px-24px weight 600. Body 14px. Labels 12px weight 500.
Spacing: strict 8px grid system. Dense layout for the list view to maximize data visibility.
Elevation: Strictly flat. 1px solid #E5E7EB borders only.

[CONTENT]
Row 1: "MAGANGUMRA-184", "Install Nitro PDF 14", "Done", "Mar 13 - 13, 2026"
Row 2: "MAGANGUMRA-183", "Melakukan responsivitas (mode mobile) website dashboard strategis Kepri", "Done", "Mar 05 - 05, 2026"

[TECH OUTPUT]
Generate code using Svelte + Tailwind CSS. Use semantic HTML5. No shadow utilities.
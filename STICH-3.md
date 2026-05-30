[CONTEXT] 
Design a team performance monitoring and project management platform.

[OVERALL STYLE]
Visual style: Minimalist / Editorial with strict Flat design elements. No box-shadows.

[SCREEN TO GENERATE]
Generate the "Profile & Analytics Dashboard" screen with this layout:
- Topnav & Left Sidebar: Standard layout as previous screens.
- Main Workspace (Left 70%): 
  - Header with Tabs: "Summary" (active), "Assigned", "Created", "Subscribed", "Activity".
  - Overview Section: 3 cards ("Work items created 63", "Work items assigned 108", "Work items subscribed 129").
  - Workload Section: 5 small summary boxes ("Backlog 0", "Not started 0", "Working on 0", "Completed 108", "Canceled 0") with small colored square indicators.
  - Charts Section: Two panels side-by-side. Left panel: "Work items by Priority" (Vertical Bar Chart). Right panel: "Work items by state" (Donut Chart).
- Right Sidebar (Right 30%): User profile section. 
  - Top: Dark texture cover image, overlapping user avatar.
  - Details: User Name ("Cahyadi Prasetyo"), username ("@prasetyo"). 
  - Meta: "Joined on Jan 12, 2026", "Timezone 17:44 UTC".
  - Projects: A list showing "MAGANG UMRAH 2026" with a 99% completion badge.

[COMPONENTS]
Required components:
- Overview Cards: Light border, flat background, large bold numbers.
- Colored Indicators: Small squares (gray, blue, orange, green, red) next to workload stats.
- Charts: Use simple HTML/CSS or SVG shapes to mock a bar chart and a donut chart visually. 
- Tabs: Active tab has a primary color bottom border. Inactive tabs are gray text.

[DESIGN TOKENS]
Colors: Primary #0369A1, Background #FFFFFF, Surface #F9FAFB, Border #E5E7EB. Chart colors: Green (Completed), Red, Orange, Blue.
Typography: Inter. Numbers in cards should be prominent (24px, bold).
Elevation: Flat design. Use 1px borders to separate the main workspace and the right profile sidebar.

[TECH OUTPUT]
Generate code using Svelte + Tailwind CSS. Build responsive grids (CSS Grid) for the overview cards and charts.
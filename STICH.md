[CONTEXT] 
Design a team performance monitoring and project management platform. The product helps professionals track work items, manage projects, and monitor performance in a highly structured environment.

[OVERALL STYLE]
Visual style: Minimalist / Editorial with strict Flat design elements. 
Mood: Professional, clean, data-driven, and highly organized. 
Inspired by: Linear, Jira, and GitHub Projects. The interface feels productive and relies on hairline borders rather than shadows for depth.

[SCREEN TO GENERATE]
Generate the "Home / Personal Dashboard" screen with this layout:
- Top: A top navigation bar with a brand logo/name ("GEMPAR") on the left, a centered search input ("Search commands..."), and a right section containing a notification icon, help icon, a "Star us on GitHub" button, and a user avatar.
- Sidebar (Left): A collapsible vertical navigation menu divided into sections. Top section has a "New work item" button. Followed by main links (Home, Drafts, Your work, Stickies). "Home" is the active state. Followed by "Workspace" and "Projects" categories.
- Main (Center): A generous workspace area. At the top, a centered greeting and date. Below that, a "Quicklinks" section with an "Add quick link" action and a large empty state card. Below that, a "Recents" section listing recent work item rows.

[COMPONENTS]
Required components:
- Top Search Bar: Subtle rounded corners, light gray background, search icon.
- Sidebar Links: Default state has transparent background with gray text. Active state has a light gray surface background with dark text.
- Empty State Card: Large rectangular area with a light gray surface (#F9FAFB), centered faint icon (representing links/cards), and helper text.
- Recent List Items: Horizontal rows containing an icon, ticket ID, ticket title (truncated if long), timestamp, a success/status icon, and small user avatars.
- Primary Buttons: Ghost or subtle outline style for most actions (like "Manage widgets"). 

[DESIGN TOKENS]
Colors:
- Primary: #0369A1 (used for primary actions, active indicators, and specific icons)
- Background: #FFFFFF
- Surface: #F9FAFB (used for sidebar background, empty state cards, hover states)
- Text-primary: #111827
- Text-secondary: #6B7280
- Border: #E5E7EB
- Success: #10B981

Typography:
- Headings: Geometric sans-serif (Inter or similar), weight 500-600. H1 ~24px for greeting. H2 ~16px for section titles (Quicklinks, Recents).
- Body: Same font, 14px, weight 400.
- Labels: 12px, weight 500.

Spacing: strict 8px grid system. Generous whitespace in the main content area to maintain a calm mood.
Border radius: 6px for inputs, cards, and buttons. Full/pill (9999px) for avatars and badges.
Elevation: Strictly flat. Do not use box-shadows. Use 1px solid #E5E7EB borders to define boundaries between the sidebar, topnav, and cards.

[CONTENT]
Topnav branding: "GEMPAR"
Greeting: "Good morning, Cahyadi Prasetyo"
Date string: "Sunday, May 31 17:43"
Empty state text: "Keep important references, resources, or docs handy for your work"
Recent item 1: "MAGANGUMRA-130", "Melanjutkan konfigurasi dashboard dan pembuatan branch ba...", "about 2 months ago"
Recent item 2: "MAGANGUMRA-36", "Brainstorming Terkait Variabel serta Penyusunan Sheets ...", "about 2 months ago"

[INTERACTIONS]
- Hover: Interactive items (sidebar links, list rows) shift background to #F9FAFB or #F3F4F6. 
- Focus: 2px ring in primary color (#0369A1), offset by 2px to meet accessibility standards.

[RESPONSIVE]
Desktop-first design. Breakpoints: sm 640, md 768, lg 1024, xl 1280.
On mobile: Hide the left sidebar behind a hamburger menu in the topnav. Make the main content full-width with reduced padding.

[ACCESSIBILITY]
WCAG AA compliant. Min contrast 4.5:1 for body text and 3:1 for large text. Visible focus rings on all inputs and buttons. Use semantic HTML5 elements (<header>, <aside>, <main>).

[TECH OUTPUT]
Generate code using Svelte + Tailwind CSS. 
Use semantic HTML structure. Write modular and clean Svelte component markup. Ensure Tailwind utility classes rely strictly on borders for depth, avoiding shadow utilities.

[RULES TO NEVER BREAK]
- Never use box-shadows or drop-shadows for cards or structural elements; rely on 1px borders.
- Never use highly saturated background colors for the main canvas; keep it #FFFFFF.
- Always maintain generous whitespace in the central dashboard area.
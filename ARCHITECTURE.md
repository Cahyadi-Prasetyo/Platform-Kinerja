# ARCHITECTURE & TECH STACK SPECIFICATION

### 1. Design System & Frontend Stack
Untuk mencapai estetika dan performa Linear, arsitektur frontend WAJIB menggunakan:
* **Framework:** Next.js 14+ (App Router) untuk performa rendering maksimal dan optimalisasi SEO/Edge.
* **Styling:** Tailwind CSS untuk utilitas komponen yang cepat dan konsisten.
* **UI Components:** Shadcn/ui (berbasis Radix Primitives). Ini adalah fondasi terbaik untuk mendapatkan kemiripan 99% dengan elemen UI Linear (dropdown, dialog, command menu).
* **Typography:** Menggunakan font `Geist Sans` atau `Inter` dengan tracking agak rapat (`tracking-tight`) untuk memberikan kesan premium.
* **Icons:** Lucide React atau Radix Icons (garis tipis 1.5px, no-fill).

### 2. State Management & Real-time
* **State:** Zustand (ringan, tanpa boilerplate rumit) untuk mengelola state Command Menu dan filter global.
* **Database & Real-time:** Supabase atau PostgreSQL dengan Prisma ORM. Memanfaatkan PostgreSQL WAL/Websockets untuk sinkronisasi data performa tim secara real-time.
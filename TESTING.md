# TESTING & PERFORMANCE QA STRATEGY

### 1. Performance-Centric Testing (The Linear Vibe)
Kunci utama dari desain Linear tidak hanya pada visual, tetapi pada **kecepatan**. AI harus membuat test case untuk mendeteksi degradasi performa:
* **Lighthouse/Core Web Vitals:** Pastikan skor Performance > 95. Tes interaksi untuk memastikan `Interaction to Next Paint (INP)` berada di bawah 50ms.
* **Command Menu Latency:** Buat unit test yang memastikan hasil pencarian muncul dalam < 10ms setelah input diketik.

### 2. Functional Edge Cases
* **Stale Data:** Test skenario ketika dua manajer memperbarui metrik performa karyawan yang sama secara bersamaan (Race Condition).
* **Keyboard Navigation:** Pastikan semua elemen interaktif dapat diakses via `Tab`, `Arrow Keys`, dan `Enter` tanpa menyentuh mouse.
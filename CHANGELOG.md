# Changelog

## 2026-06-07 - Face Liveness / Anti-Spoofing

### Ditambahkan

- Menambahkan anti-spoofing berbasis ONNX ke halaman `src/app/(verification)/verification/face/page.tsx`.
- Menambahkan module `src/lib/face-liveness-detector.ts` untuk menjalankan:
  - RetinaFace (`Widerface-RetinaFace.onnx`) sebagai deteksi bounding box wajah.
  - MiniFASNet (`2.7_80x80_MiniFASNetV2_Fixed.onnx`) sebagai static liveness / anti-spoofing.
- Menambahkan dependency `onnxruntime-web` agar inference ONNX berjalan lokal di browser.
- Menyalin asset model ke:
  - `public/models/liveness/Widerface-RetinaFace.onnx`
  - `public/models/liveness/2.7_80x80_MiniFASNetV2_Fixed.onnx`
- Menyalin runtime WASM ONNX ke `public/ort/` agar `onnxruntime-web` tidak bergantung CDN.

### Diubah

- Flow tombol `Ambil Foto` di halaman face sekarang menunggu dua kondisi:
  - wajah berada di frame/oval yang benar,
  - liveness terdeteksi `REAL` secara stabil.
- Deteksi wajah di halaman face tidak lagi hanya memakai `face-api.js` untuk gate capture. Gate capture sekarang memakai hasil RetinaFace + MiniFASNet.
- Status preview kamera sekarang menampilkan kondisi liveness:
  - `Memuat...`
  - `Posisikan wajah di frame`
  - `Wajah belum pas di frame`
  - `Memverifikasi wajah`
  - `Wajah terdeteksi`
  - `Wajah tidak lolos verifikasi`
- Menambahkan progress bar stabilitas liveness. Foto baru bisa diambil setelah 8 frame berturut-turut lolos sebagai real.
- Membersihkan model `public/models/liveness/Widerface-RetinaFace.onnx` dari initializer yang ikut tercatat sebagai graph input. Sebelum dibersihkan, model memiliki 257 initializer duplicate di graph input dan memicu warning ONNX Runtime seperti `Initializer batch_norm44_var appears in graph inputs`.
- Memverifikasi `public/models/liveness/2.7_80x80_MiniFASNetV2_Fixed.onnx` juga tidak memiliki duplicate initializer input.

### Konfigurasi Liveness

- RetinaFace:
  - input size: `640x640`
  - confidence threshold: `0.6`
  - NMS threshold: `0.4`
- MiniFASNet:
  - input size: `80x80`
  - real threshold: `0.75`
- Capture gate:
  - butuh `8` frame berturut-turut dengan prediksi `REAL`
  - counter reset jika wajah hilang atau prediksi menjadi `FAKE`

### Catatan Keamanan

- Implementasi ini adalah static anti-spoofing berbasis frame wajah. Ini dapat membantu menolak foto, print, atau layar, tetapi belum setara dengan active liveness challenge.
- Hasil liveness masih berjalan di frontend. Untuk production yang lebih kuat, backend sebaiknya ikut menerima dan memvalidasi metadata liveness atau menjalankan validasi ulang.
- Flow submit backend saat ini belum diubah. Data yang dikirim tetap mengikuti kontrak lama: `ticketCode`, `file_wajah`, dan optional `file_suara`.

### Verifikasi

- `yarn build` berhasil.
- Build pertama di sandbox gagal karena Next perlu mengambil Google Fonts. Build berhasil setelah dijalankan dengan akses network.

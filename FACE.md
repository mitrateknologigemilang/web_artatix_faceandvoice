# Face Recognition Tester

Dokumen ini merangkum bagian face recognition dari folder `Front_End_Test/`.
Folder tersebut juga berisi voice dan audio-to-face tester, tetapi bagian itu tidak dibahas di sini.

## File Yang Relevan

- `Front_End_Test/main.html`
  - Dashboard tester untuk enrollment, recognition, model conversion, database management, dan webcam simulation.
  - Bagian face recognition utama ada di tab `Enrollment`, `Recognition`, `Model Conversion`, `Database`, dan `Webcam Sim (JS)`.

- `Front_End_Test/assets/js/pendaftaran.js`
  - Implementasi utama face recognition tester.
  - Berisi class `FaceLivenessDetector` untuk deteksi wajah, anti-spoofing, dan auto-recognition dari kamera.
  - Berisi helper API untuk enrollment, recognition, model conversion, DB stats, dan switch DB.

- `Front_End_Test/assets/models/Widerface-RetinaFace.onnx`
  - Model deteksi wajah.
  - Dipakai untuk menghasilkan bounding box wajah dari frame kamera.

- `Front_End_Test/assets/models/2.7_80x80_MiniFASNetV2_Fixed.onnx`
  - Model anti-spoofing / liveness statis.
  - Dipakai untuk mengklasifikasikan crop wajah sebagai `REAL` atau `FAKE`.

- `Front_End_Test/test.py`
  - Script kecil untuk memuat ulang dan menyimpan model `2.7_80x80_MiniFASNetV2.onnx` menjadi `2.7_80x80_MiniFASNetV2_Fixed.onnx`.
  - Tujuannya memperbaiki file ONNX yang mungkin bermasalah secara format.

## Arsitektur Umum

Tester memakai pola hybrid:

1. Browser menjalankan edge inference menggunakan `onnxruntime-web`.
2. Kamera dibuka lewat `navigator.mediaDevices.getUserMedia`.
3. RetinaFace mendeteksi posisi wajah dari frame kamera.
4. Crop wajah dikirim ke MiniFASNet untuk anti-spoofing.
5. Jika hasil liveness stabil sebagai `REAL`, browser otomatis mengirim foto, bounding box, dan skor liveness ke backend.
6. Backend endpoint `/api/v1/face/recognize` melakukan face recognition dan mengembalikan hasil match.

Jadi, anti-spoofing dilakukan di sisi client, sementara recognition tetap lewat backend.

## Model Dan Konfigurasi

Konfigurasi utama ada di constructor `FaceLivenessDetector`:

```js
this.REQUIRED_CONSECUTIVE_REAL = 8;
this.RECOGNITION_COOLDOWN = 5000;

this.RF_CONFIG = {
    inputSize: 640,
    confThreshold: 0.6,
    nmsThreshold: 0.4,
    variance: [0.1, 0.2]
};

this.MINIFAS_CONFIG = {
    inputSize: 80,
    realThreshold: 0.75
};
```

Artinya:

- RetinaFace menerima input `640x640`.
- Deteksi wajah hanya diterima jika confidence lebih dari `0.6`.
- Bounding box yang overlap difilter dengan NMS threshold `0.4`.
- MiniFASNet menerima crop wajah `80x80`.
- Wajah dianggap real secara raw jika class `REAL` memiliki confidence lebih dari `0.75`.
- Status final `REAL` baru diberikan setelah 8 frame berturut-turut lolos sebagai real.
- Auto-recognition diberi cooldown 5 detik agar tidak spam request ke backend.

## Loading Model

Method `loadModels(retinaFacePath, miniFASPath)`:

1. Membuat anchor RetinaFace dengan `generateAnchors`.
2. Membuat session ONNX Runtime untuk RetinaFace dan MiniFASNet.
3. Menggunakan execution provider `wasm`.
4. Menandai `isModelsLoaded = true` jika kedua model berhasil dimuat.

Path model yang dipakai:

```js
const MODEL_PATH_LIVENESS = '../assets/models/2.7_80x80_MiniFASNetV2_Fixed.onnx';
const MODEL_PATH_DETECTION = '../assets/models/Widerface-RetinaFace.onnx';
```

## Flow Webcam Simulation

Tab `Webcam Sim (JS)` di `main.html` menyediakan:

- tombol `Start Camera & Load Models`,
- elemen `<video id="webcamVideo">`,
- elemen `<canvas id="overlayCanvas">`,
- panel status FPS, jumlah wajah, dan detail liveness.

Flow-nya:

1. `startWebcamSimulation()` dipanggil dari tombol start.
2. Model dimuat jika belum ada detector.
3. Kamera dibuka dengan resolusi `640x480` dan `facingMode: 'user'`.
4. Setelah video siap, `detectFrame()` berjalan terus memakai `requestAnimationFrame`.
5. Setiap frame diproses oleh `detector.processFrame(video)`.
6. Hasil deteksi digambar ke canvas oleh `drawResults`.
7. Panel debug diperbarui oleh `updateUI`.

## Deteksi Wajah Dengan RetinaFace

Method `detectFaces(videoElement)`:

1. Frame video dipreprocess oleh `preprocessRetinaFace`.
2. Tensor dikirim ke session RetinaFace.
3. Output model dibaca oleh `extractRetinaFaceOutput`.
4. Bounding box dikonversi ke koordinat video oleh `postProcessRetinaFace`.
5. NMS dipakai untuk menghapus bounding box duplikat.

Preprocessing RetinaFace:

- Frame video digambar ke canvas `640x640`.
- Pixel diubah menjadi format channel-first: `[1, 3, 640, 640]`.
- Urutan channel yang dipakai adalah BGR.
- Mean subtraction:
  - B dikurangi `104`
  - G dikurangi `117`
  - R dikurangi `123`

Output akhir deteksi wajah berbentuk:

```js
[x1, y1, x2, y2, score]
```

## Anti-Spoofing / Liveness Check

Anti-spoofing dilakukan oleh `checkLivenessRaw(videoElement, face, targetSize)`.

Flow-nya:

1. Bounding box wajah dari RetinaFace dipakai untuk crop wajah.
2. Crop diperbesar dengan `SCALE_FACTOR = 1.5` agar area sekitar wajah ikut masuk.
3. Crop di-resize ke `80x80`.
4. Crop dipreprocess untuk MiniFASNet.
5. MiniFASNet mengeluarkan 3 class logit.
6. Logit diubah menjadi probability dengan softmax.
7. Class dengan probability terbesar dipilih sebagai prediksi.

Mapping class:

```js
0 -> FAKE, dipakai sebagai fake_print
1 -> REAL
2 -> FAKE, dipakai sebagai fake_screen
```

Response internal liveness:

```js
{
    isRealRaw,
    rawLabel,
    confidence,
    probabilities: {
        fake_print,
        real,
        fake_screen
    }
}
```

Wajah dianggap real secara raw jika:

```js
predClass === 1 && confidence > 0.75
```

Catatan penting: ini adalah static anti-spoofing berbasis frame/crop wajah, bukan active liveness seperti kedip, geleng kepala, atau challenge acak.

## Stabilitas Liveness

Hasil `REAL` tidak langsung diterima. `processFrame(videoElement)` memakai counter per wajah:

- Jika frame saat ini `REAL`, counter naik.
- Jika frame saat ini `FAKE`, counter di-reset ke 0.
- Jika counter belum mencapai 8, label UI menjadi `VERIFYING...`.
- Jika counter mencapai 8, label UI menjadi `REAL`.

Tujuannya mengurangi false positive dari satu frame yang kebetulan terlihat real.

Status warna:

- `FAKE`: merah
- `VERIFYING...`: kuning
- `REAL`: hijau

## Auto Recognition

Jika wajah sudah final `REAL`, method `triggerAutoRecognition(videoElement, face, livenessScore)` dipanggil.

Method ini:

1. Mengecek cooldown dan status `isRecognizing`.
2. Mengambil screenshot frame video ke canvas.
3. Mengubah frame menjadi JPEG blob.
4. Mengirim request `multipart/form-data` ke:

```txt
POST /api/v1/face/recognize
```

Payload yang dikirim:

```txt
image
bbox_x
bbox_y
bbox_width
bbox_height
liveness_score
liveness_label = REAL
similarity_threshold = 0.5
adaface_threshold = 0.5
```

Backend lalu mengembalikan status match, user info, liveness score, Cohere similarity, dan AdaFace similarity.

## Manual Recognition Form

Tab `Recognition` di `main.html` menyediakan form manual untuk endpoint yang sama:

```txt
POST /api/v1/face/recognize
```

Field form:

- `image`
- `bbox_x`
- `bbox_y`
- `bbox_width`
- `bbox_height`
- `liveness_score`
- `liveness_label`
- `similarity_threshold`
- `adaface_threshold`

Form ini berguna untuk test manual jika bounding box dan skor liveness berasal dari device lain, misalnya Android edge computing.

## Enrollment

Tab `Enrollment` mengarah ke:

```txt
POST /api/v1/face/enrollment
```

Di HTML saat ini field yang terlihat hanya:

- `nik`
- `status_restoration`

Deskripsi UI menyebut enrollment untuk register user dengan face image, full body image, dan optional voice sample, tetapi input file gambar tidak terlihat di HTML yang ada. Kemungkinan tester ini sudah dipangkas atau belum sinkron dengan deskripsi backend.

## Model Conversion

Tab `Model Conversion` menyediakan dua endpoint:

```txt
POST /api/v1/face/convert-model-to-onnx
POST /api/v1/face/convert-retinaface-to-onnx
```

Fungsinya untuk membantu konversi model:

- MiniFASNet dari PyTorch `.pth` / `.pt` ke ONNX.
- RetinaFace dari Caffe `.caffemodel` + `.prototxt` ke ONNX.

Ini bukan bagian runtime recognition, tetapi dipakai untuk menyiapkan model edge inference.

## Database Management

Tab `Database` menyediakan:

```txt
GET /api/v1/face/db-stats
POST /api/v1/face/switch-db
```

Deskripsi UI menyebut dukungan FAISS lokal dan Pinecone cloud untuk vector database. Ini relevan untuk face recognition backend, bukan untuk liveness di browser.

## Catatan Keamanan

- API key tertulis langsung di `pendaftaran.js`. Untuk aplikasi production, key sebaiknya tidak diletakkan di frontend.
- Karena liveness dilakukan di client, hasil `liveness_score` dan `liveness_label` bisa dimanipulasi jika user mengubah request.
- Backend sebaiknya tetap melakukan validasi ulang liveness atau minimal memverifikasi ulang frame/crop yang dikirim.
- MiniFASNet di sini adalah anti-spoofing statis. Model ini dapat membantu mendeteksi print atau screen attack, tetapi bukan jaminan penuh terhadap replay video, kamera virtual, atau manipulasi client.
- Untuk liveness yang lebih kuat, static anti-spoofing sebaiknya digabung dengan challenge acak seperti kedip, hadap kiri/kanan, atau rekaman video pendek yang diverifikasi backend.

## Relevansi Untuk Halaman Face Saat Ini

Halaman face di project utama saat ini memakai `face-api.js` untuk mengecek wajah berada di frame. Tester `Front_End_Test` memberikan referensi implementasi yang lebih kuat:

1. Pakai ONNX Runtime Web.
2. Pakai RetinaFace untuk deteksi bounding box.
3. Pakai MiniFASNet untuk anti-spoofing frame wajah.
4. Butuh beberapa frame `REAL` berturut-turut sebelum user boleh lanjut.
5. Kirim skor liveness dan metadata bounding box bersama foto ke backend.

Jika ingin diintegrasikan ke halaman `src/app/(verification)/verification/face/page.tsx`, bagian yang paling relevan adalah class `FaceLivenessDetector`, model ONNX di `assets/models`, dan flow `startWebcamSimulation` sampai `processFrame`.

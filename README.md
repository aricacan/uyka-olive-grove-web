# UYKA — İznik Zeytinyağı web sitesi

Next.js 16 statik export (backendsiz). Plan ve tasarım kararları: [docs/PLAN.md](docs/PLAN.md) · Renk/font/fotoğraf nereden değişir: [docs/DESIGN_CONTROLS.md](docs/DESIGN_CONTROLS.md) · Yayına alma (hosting, formlar, DNS): [docs/DEPLOY.md](docs/DEPLOY.md).

```bash
npm install
npm run dev        # http://localhost:3000
npm run assets     # assets/photos + logo → public/images (AVIF/WebP)
npm run build      # statik çıktı: out/
```

İçerik `src/content/` altındadır. Doğrulanmamış iddialar `src/content/claims.ts` içinde `pending` olarak işaretlidir.
Opsiyonel form servisi için `.env.example` dosyasına bakın.

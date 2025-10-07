# Bağış Kamyonu 🚛

3D bağış kamyonu görselleştirmesi ile hedefimize birlikte ulaşalım!

## 🚀 Vercel'de Deploy Etme

### Otomatik Deploy (Önerilen)
1. [Vercel](https://vercel.com) hesabı oluşturun
2. GitHub repository'sini Vercel'a bağlayın  
3. Otomatik deploy başlayacak

### Manuel Deploy
```bash
npm install -g vercel
vercel --prod
```

## 🎯 Özellikler

- ✅ 3D kamyon modeli ve römork
- ✅ Dinamik renk değişimi (bağış yüzdesine göre)
- ✅ Gerçek zamanlı güncelleme
- ✅ Modern, responsive tasarım
- **Mobile Friendly**: Optimized for all devices

## 🛠️ Technologies

- React 18
- Three.js
- @react-three/fiber
- @react-three/drei
- Vite
- CSS3 with modern features

## 📦 Installation

```bash
npm install
```

## 🏃‍♂️ Development

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 🌐 Deploy

This project is configured for Vercel deployment. Simply connect your GitHub repository to Vercel.

## 📁 Project Structure

```
├── public/
│   └── models/
│       ├── tir/
│       └── dorse/
├── src/
│   ├── components/
│   │   ├── TruckScene.jsx
│   │   └── DonationInterface.jsx
│   ├── App.jsx
│   └── App.css
└── vercel.json
```

## 🎯 Usage

1. Set your target donation amount
2. Use quick amount buttons or enter custom amounts
3. Watch the 3D trailer change color as donations increase
4. Track progress with real-time statistics

## 🔧 Configuration

The project is pre-configured for Vercel deployment with optimized build settings.

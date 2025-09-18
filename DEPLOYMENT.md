# Vercel Deployment Instructions

## 📋 Prerequisites

1. GitHub hesabınız olmalı
2. Vercel hesabınız olmalı (GitHub ile bağlanabilir)
3. Projeniz Git repository'de olmalı

## 🚀 Deployment Steps

### 1. Git Repository Oluşturma
```bash
git init
git add .
git commit -m "Initial commit: 3D Donation Tracker"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Vercel'e Deploy Etme

#### Option A: Vercel CLI (Recommended)
```bash
# Vercel CLI kurulumu
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

#### Option B: Vercel Dashboard
1. [vercel.com](https://vercel.com) adresine gidin
2. GitHub ile giriş yapın
3. "New Project" butonuna tıklayın
4. GitHub repository'nizi seçin
5. "Deploy" butonuna tıklayın

## ⚙️ Otomatik Konfigürasyon

Proje şu dosyalarla önceden yapılandırılmıştır:

- `vercel.json` - Vercel deployment ayarları
- `vite.config.js` - Production build optimizasyonu
- `package.json` - Build scriptleri

## 🔧 Environment Variables

Eğer gelecekte API anahtarları kullanırsanız:

1. Vercel Dashboard > Project Settings > Environment Variables
2. Gerekli değişkenleri ekleyin
3. Redeploy edin

## 📊 Performance Optimizations

- Three.js bundle'ları ayrılmış
- Source maps devre dışı
- Minification aktif
- Static asset optimizasyonu

## 🌐 Custom Domain

1. Vercel Dashboard > Project > Settings > Domains
2. Custom domain ekleyin
3. DNS ayarlarını güncelleyin

Deployment sonrası projeniz otomatik olarak şu adreste yayında olacak:
`https://your-project-name.vercel.app`
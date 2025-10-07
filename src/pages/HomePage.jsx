import { useState, Suspense, useRef, useEffect, lazy } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

// Lazy load heavy components
const TruckScene = lazy(() => import('../components/TruckScene'))
const DonationInterface = lazy(() => import('../components/DonationInterface'))
const TargetEditor = lazy(() => import('../components/TargetEditor'))

function HomePage() {
  const [totalDonation, setTotalDonation] = useState(0)
  const [fillPercentage, setFillPercentage] = useState(0)
  const [cameraView, setCameraView] = useState(1)
  const [targetAmount, setTargetAmount] = useState(100000)
  const [showTargetEditor, setShowTargetEditor] = useState(false)
  const controlsRef = useRef()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // URL parametrelerinden başarılı ödemeyi kontrol et
  useEffect(() => {
    const success = searchParams.get('success')
    const paidAmount = searchParams.get('amount')
    
    if (success === 'true' && paidAmount) {
      const amount = Number(paidAmount)
      addDonation(amount)
      
      // URL'yi temizle
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [searchParams])

  // Kamera pozisyonları
  const cameraPositions = {
    1: { position: [45, 20, 35], target: [0, 0, 0] },
    2: { position: [80, 10, 0], target: [0, 0, 0] }
  }

  const addDonation = (amount) => {
    const newTotal = totalDonation + amount
    setTotalDonation(newTotal)
    
    const newPercentage = Math.min((newTotal / targetAmount) * 100, 100)
    setFillPercentage(newPercentage)
  }

  const switchCamera = (viewNumber) => {
    setCameraView(viewNumber)
    if (controlsRef.current) {
      const targetPos = cameraPositions[viewNumber]
      controlsRef.current.object.position.set(...targetPos.position)
      controlsRef.current.target.set(...targetPos.target)
      controlsRef.current.update()
    }
  }

  const updateTargetAmount = (newTarget) => {
    setTargetAmount(newTarget)
    const newPercentage = Math.min((totalDonation / newTarget) * 100, 100)
    setFillPercentage(newPercentage)
    setShowTargetEditor(false)
  }

  const handleDonation = (amount) => {
    // Ödeme sayfasına yönlendir
    navigate(`/payment?amount=${amount}&target=${targetAmount}`)
  }

  return (
    <>
      <div className="header">
        <h1>Bağış Kamyonu</h1>
        <div className="target-display">
          <p>Hedef: ₺{targetAmount.toLocaleString('tr-TR')}</p>
          <button 
            className="edit-target-btn"
            onClick={() => setShowTargetEditor(true)}
            title="Hedef miktarını düzenle"
          >
            ⚙️
          </button>
        </div>
        
        {showTargetEditor && (
          <TargetEditor 
            currentTarget={targetAmount}
            onSave={updateTargetAmount}
            onCancel={() => setShowTargetEditor(false)}
          />
        )}
      </div>
      
      <div className="main-content">
        <div className="canvas-container">
          <Canvas 
            camera={{ position: [45, 20, 35], fov: 20 }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={
              <mesh>
                <boxGeometry args={[10, 5, 20]} />
                <meshStandardMaterial color="#ff6b9d" transparent opacity={0.3} />
              </mesh>
            }>
              <TruckScene fillPercentage={fillPercentage} />
              <Environment preset="city" />
            </Suspense>
            <OrbitControls 
              ref={controlsRef}
              enabled={false}
              enablePan={false}
              enableZoom={false}
              enableRotate={false}
            />
          </Canvas>
          
          <div className="camera-controls">
            <button 
              className={`camera-btn ${cameraView === 1 ? 'active' : ''}`}
              onClick={() => switchCamera(1)}
            >
              1
            </button>
            <button 
              className={`camera-btn ${cameraView === 2 ? 'active' : ''}`}
              onClick={() => switchCamera(2)}
            >
              2
            </button>
          </div>
        </div>
        
        <div className="donation-interface">
          <Suspense fallback={
            <div className="loading-placeholder">
              <div className="loading-spinner"></div>
              <p>Bağış arayüzü yükleniyor...</p>
            </div>
          }>
            <DonationInterface 
              totalDonation={totalDonation}
              targetAmount={targetAmount}
              fillPercentage={fillPercentage}
              onDonate={handleDonation}
            />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default HomePage
"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowRight, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

// GA otimizado - só envia quando necessário
const enviarEvento = (() => {
  let queue = []
  let timeout

  return (evento, props = {}) => {
    queue.push({ evento, props })
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      if (typeof window !== "undefined" && window.gtag && queue.length) {
        queue.forEach(({ evento, props }) => {
          window.gtag("event", evento, props)
        })
        queue = []
      }
    }, 500)
  }
})()

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")
  const [isOnline, setIsOnline] = useState(true)

  // Detecção de conexão minimalista
  useEffect(() => {
    if (typeof window === "undefined") return

    const updateOnlineStatus = () => setIsOnline(navigator.onLine)

    window.addEventListener("online", updateOnlineStatus, { passive: true })
    window.addEventListener("offline", updateOnlineStatus, { passive: true })

    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
    }
  }, [])

  // Tracking minimalista - só o essencial
  useEffect(() => {
    if (typeof window === "undefined") return

    const timer = setTimeout(() => {
      enviarEvento("page_view", {
        device: window.innerWidth < 768 ? "mobile" : "desktop",
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Função de início ultra-otimizada
  const handleStart = useCallback(() => {
    if (isLoading || !isOnline) return

    setIsLoading(true)
    setLoadingProgress(20)

    enviarEvento("quiz_start")

    let progress = 20
    const interval = setInterval(() => {
      progress += 15
      setLoadingProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)

        // Preservar UTMs
        let url = "/quiz/1"
        if (typeof window !== "undefined" && window.location.search) {
          const params = new URLSearchParams(window.location.search)
          const utms = new URLSearchParams()

          for (const [key, value] of params) {
            if (key.startsWith("utm_")) utms.set(key, value)
          }

          if (utms.toString()) url += `?${utms.toString()}`
        }

        router.push(url)
      }
    }, 200)
  }, [isLoading, isOnline, router])

  return (
    <>
      <head>
        <link rel="preconnect" href="https://plansistema.shop/" />
        <link rel="dns-prefetch" href="https://plansistema.shop/" />
      </head>
      <div
        style={{
          backgroundColor: "#000000",
          minHeight: "100vh",
          padding: "20px",
          position: "relative",
        }}
      >
        <style jsx>{`
.btn-quiz-clean{background:linear-gradient(135deg,#dc2626 0%,#b91c1c 100%)!important;color:white!important;border:none!important;padding:16px 32px!important;font-size:16px!important;font-weight:600!important;border-radius:25px!important;text-transform:uppercase!important;cursor:pointer!important;transition:all .3s ease!important;width:100%!important;max-width:280px!important;box-shadow:0 10px 25px rgba(220,38,38,.4)!important;letter-spacing:.5px!important}
.btn-quiz-clean:hover{transform:translateY(-2px)!important;box-shadow:0 15px 35px rgba(220,38,38,.6)!important}
.container-preto{background:linear-gradient(145deg,#000 0%,#111 100%)!important;border:2px solid #333!important;border-radius:20px!important;padding:40px 30px!important;max-width:480px!important;margin:0 auto!important;text-align:center!important;box-shadow:0 20px 60px rgba(0,0,0,.8)!important;contain: layout style;}
.titulo-quiz{color:#fff!important;font-size:28px!important;font-weight:700!important;margin:25px 0 15px 0!important;line-height:1.2!important}
.subtitulo-quiz{color:#e5e5e5!important;font-size:16px!important;margin-bottom:30px!important;font-weight:400!important}
.quiz-info{display:flex!important;justify-content:space-around!important;margin:25px 0!important;padding:15px!important;background:rgba(220,38,38,0.1)!important;border-radius:10px!important;border:1px solid rgba(220,38,38,0.3)!important}
.quiz-info > div{color:#fff!important;font-size:12px!important;font-weight:500!important}
.garantia-simples{display:flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;margin-top:20px!important;color:#888!important;font-size:12px!important}
.logo-pequena{border-radius:10px!important;border:2px solid #dc2626!important;box-shadow:0 0 20px rgba(220,38,38,0.3)!important}
.loading-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.95);display:flex;align-items:center;justify-content:center;z-index:1000;backdrop-filter:blur(5px)}
.loading-content{text-align:center;color:white}
.progress-bar{width:250px;height:6px;background:#333;border-radius:3px;overflow:hidden;margin-top:25px}
.progress-fill{height:100%;background:linear-gradient(90deg,#dc2626,#f87171);transition:width .3s ease;border-radius:3px}
.main-content{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;contain: layout style paint;}
.copyright{position:relative;margin-top:40px;padding:20px;color:#888;font-size:12px;text-align:center}
@media (max-width:768px){.container-preto{padding:30px 20px!important;margin:10px!important}.titulo-quiz{font-size:24px!important}.quiz-info{flex-direction:column!important;gap:8px!important;text-align:center!important}.main-content{min-height:calc(100vh - 40px)}.copyright{margin-top:30px;padding:15px}}
@media (max-width:480px){.container-preto{padding:25px 15px!important;margin:5px!important}.titulo-quiz{font-size:22px!important}.copyright{margin-top:25px;padding:10px;font-size:11px}}
`}</style>

        {/* Loading overlay */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-content">
              <div style={{ fontSize: "18px", fontWeight: "600" }}>Preparando tu evaluación personalizada...</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${loadingProgress}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              left: "20px",
              right: "20px",
              background: "#dc2626",
              color: "white",
              padding: "15px",
              borderRadius: "10px",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage("")}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        )}

        {/* Offline indicator */}
        {!isOnline && (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              background: "#f59e0b",
              color: "white",
              textAlign: "center",
              padding: "10px",
              zIndex: 1000,
            }}
          >
            ⚠️ Sem conexão com a internet
          </div>
        )}

        {/* CONTEÚDO PRINCIPAL OTIMIZADO */}
        <div className="main-content">
          <div className="container-preto">
            
            {/* LOGO MENOR E DISCRETA */}
            <div style={{display: "flex", justifyContent: "center", marginBottom: "25px"}}>
              <Image
                src="https://plansistema.shop/wp-content/uploads/2025/09/b919667b-241e-4411-82c2-b28e2a625cf6.webp"
                alt="Logo Método Renacer"
                width={120}
                height={75}
                className="logo-pequena"
                priority
                fetchPriority="high"
                quality={70}
                sizes="(max-width: 480px) 100px, 120px"
                placeholder="blur"
                blurDataURL="data:image/webp;base64,UklGRpIAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA"
                onError={(e) => {
                  e.target.style.display = "none"
                }}
              />
            </div>

            {/* HEADLINE SIMPLIFICADA */}
            <h1 className="titulo-quiz">
              ¿Acabas de pasar por una ruptura?
            </h1>

            {/* SUBTÍTULO DIRETO */}
            <p className="subtitulo-quiz">
              Descubre tu perfil emocional en 2 minutos
            </p>

            {/* INDICADORES DO QUIZ */}
            <div className="quiz-info">
              <div>⏱️ 2 minutos</div>
              <div>🎯 Resultado instantáneo</div>
              <div>🎁 100% gratuito</div>
            </div>

            {/* CTA SIMPLES */}
            <button onClick={handleStart} disabled={isLoading || !isOnline} className="btn-quiz-clean">
              {isLoading ? (
                "INICIANDO..."
              ) : (
                "INICIAR EVALUACIÓN"
              )}
            </button>

            {/* GARANTIA MÍNIMA */}
            <div className="garantia-simples">
              <Shield size={14} />
              Completamente confidencial
            </div>

          </div>
        </div>

        {/* Copyright mantido */}
        <div className="copyright">RENACER™ Todos los Derechos Reservados.</div>

        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
      <script defer src="data:text/javascript,"></script>
    </>
  )
}

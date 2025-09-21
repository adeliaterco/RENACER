"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  Shield,
  ArrowRight,
  Check,
  Clock,
  Users,
  Heart,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CountdownTimer } from "@/components/countdown-timer"
import { enviarEvento } from "../../lib/analytics"

export default function ResultPageOptimized() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [recentBuyers, setRecentBuyers] = useState(7)
  const [userGender, setUserGender] = useState<string>("")
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedGender = localStorage.getItem("userGender")
    if (savedGender) setUserGender(savedGender)

    setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    // Simular compradores recientes
    const interval = setInterval(() => {
      setRecentBuyers((prev) => {
        const increase = Math.floor(Math.random() * 2) + 1
        return Math.min(prev + increase, 31)
      })
    }, 45000)

    // Registra visualización
    try {
      enviarEvento("visualizou_resultado")
    } catch (error) {
      console.error("Error al registrar evento:", error)
    }

    // Carrega scripts do VTurb
    const loadVTurbScripts = () => {
      // Script principal (VSL)
      if (!document.querySelector('script[src*="68cf84b4c9c4c158bda807e8"]')) {
        const script1 = document.createElement("script")
        script1.src = "https://scripts.converteai.net/529d9a9b-9a02-4648-9d1f-be6bbe950e40/players/68cf84b4c9c4c158bda807e8/v4/player.js"
        script1.async = true
        document.head.appendChild(script1)
      }

      // Script do depoimento (VTurb)
      if (!document.querySelector('script[src*="68ce171a1563ea2ce059118d"]')) {
        const script2 = document.createElement("script")
        script2.src = "https://scripts.converteai.net/529d9a9b-9a02-4648-9d1f-be6bbe950e40/players/68ce171a1563ea2ce059118d/v4/player.js"
        script2.async = true
        document.head.appendChild(script2)
      }
    }

    loadVTurbScripts()

    return () => clearInterval(interval)
  }, [])

  const handlePurchase = () => {
    try {
      enviarEvento("clicou_comprar", {
        posicao: "principal",
      })
    } catch (error) {
      console.error("Error al registrar evento de clic:", error)
    }
    window.open("https://pay.hotmart.com/T101996755F?off=wdtbjbr1&checkoutMode=10&offDiscount=RENACER", "_blank")
  }

  const getPersonalizedPronoun = () => {
    return userGender === "MASCULINO" ? "una nueva versión de ti mismo" : "una nueva versión de ti misma"
  }

  const handleTouchFeedback = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  return (
    <>
      {/* META TAGS MOBILE OTIMIZADAS */}
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-x-hidden w-full max-w-[100vw] mobile-container" ref={contentRef}>
        
        {/* ✅ SEÇÃO 1: RESULTADO INICIAL ADAPTADO */}
        <div className="relative overflow-hidden w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse"></div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
            className="relative z-10 mobile-padding text-center w-full"
          >
            {/* Headline Principal Adaptada */}
            <h1 className="mobile-headline text-white mb-4 sm:mb-6 leading-tight max-w-full break-words">
              🎯 <span className="text-purple-400">¡FELICITACIONES!</span>
              <br />
              TU PERFIL TIENE <span className="text-green-400">92,3%</span>
              <br />
              DE POTENCIAL DE TRANSFORMACIÓN
            </h1>

            {/* Resultado Visual Adaptado */}
            <div className="max-w-sm mx-auto mb-6 sm:mb-8 w-full">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 mobile-border rounded-2xl mobile-card-padding shadow-2xl max-w-full">
                <div className="mobile-circle mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-content mobile-border-white mb-4">
                  <div className="text-center">
                    <span className="mobile-percentage font-extrabold text-black">92,3%</span>
                    <p className="mobile-success-text font-bold text-black">ÉXITO</p>
                  </div>
                </div>
                
                <div className="text-white space-y-2 mobile-info-text">
                  <p><strong>Tiempo estimado:</strong> 21 días</p>
                  <p><strong>Método:</strong> RENACER</p>
                  <p><strong>Tipo:</strong> Transformación profunda</p>
                </div>
              </div>
            </div>

            {/* Transição para VSL Adaptada */}
            <p className="mobile-transition-text text-gray-300 mb-4 font-semibold max-w-full break-words px-2">
              Ahora descubre <span className="text-purple-400 font-bold">cómo transformar tu dolor en poder</span>:
            </p>
          </motion.div>
        </div>

        {/* ✅ SEÇÃO 2: VSL PRINCIPAL ADAPTADA */}
        <div className="mobile-padding bg-gradient-to-r from-gray-900 to-black w-full">
          <div className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-6">
              <h2 className="mobile-section-title font-bold text-white mb-4 max-w-full break-words">
                💫 <span className="text-purple-400">EL MÉTODO</span> QUE TRANSFORMARÁ TU VIDA AMOROSA
              </h2>
              
              <div className="max-w-2xl mx-auto mb-6 w-full">
                <p className="mobile-description text-gray-300 mb-4 break-words">
                  Mira este video donde la Dra. Sofia Mendez revela:
                </p>
                <div className="text-left bg-black/30 rounded-lg mobile-list-padding space-y-2 w-full">
                  <div className="flex items-start text-white mobile-list-text">
                    <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="break-words">Por qué tu perfil tiene <strong className="text-purple-400">92,3% de potencial</strong></span>
                  </div>
                  <div className="flex items-start text-white mobile-list-text">
                    <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="break-words">Los <strong className="text-purple-400">7 pilares</strong> para sanar y renacer</span>
                  </div>
                  <div className="flex items-start text-white mobile-list-text">
                    <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="break-words">Cómo atraer <strong className="text-purple-400">amor consciente</strong> en 21 días</span>
                  </div>
                </div>
              </div>
            </div>

            {/* VSL CENTRALIZADA COM VTURB ADAPTADA */}
            <div className="flex justify-center mb-6 sm:mb-8 w-full">
              <div className="w-full max-w-3xl">
                <div className="relative bg-black rounded-xl sm:rounded-2xl mobile-video-padding mobile-border-purple shadow-2xl w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl sm:rounded-2xl animate-pulse"></div>
                  <div className="relative z-10 w-full mobile-video-container">
                    <vturb-smartplayer 
                      id="vid-68cf84b4c9c4c158bda807e8" 
                      className="mobile-vturb-player"
                    ></vturb-smartplayer>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA ÚNICO APÓS VSL ADAPTADO */}
            <div className="text-center w-full">
              <div className="bg-purple-600 text-white mobile-badge-padding rounded-full inline-block font-bold mobile-badge-text mb-4 sm:mb-6 animate-bounce max-w-full">
                👆 TRANSFORMA TU VIDA AMOROSA PARA SIEMPRE
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="w-full"
              >
                <Button
                  onClick={handlePurchase}
                  size="lg"
                  className="mobile-cta-primary"
                  onTouchStart={handleTouchFeedback}
                >
                  <Heart className="mobile-icon-size mr-2 flex-shrink-0" />
                  <span className="mobile-cta-text text-center leading-tight break-words">
                    <span className="mobile-show">TRANSFORMAR AHORA - $27</span>
                    <span className="desktop-show">QUIERO TRANSFORMAR MI VIDA - $27</span>
                  </span>
                  <ArrowRight className="mobile-icon-size ml-2 flex-shrink-0" />
                </Button>
              </motion.div>

              <p className="text-white mobile-description font-semibold mt-4 max-w-full break-words px-2">
                Es hora de convertirte en <span className="text-purple-400">{getPersonalizedPronoun()}</span>
              </p>
            </div>
          </div>
        </div>

        {/* ✅ SEÇÃO 3: PROVA SOCIAL ADAPTADA (DEPOIMENTO COM VTURB FORMATO STORY) - COM OVERLAY AUMENTADO */}
        <div className="mobile-padding bg-gradient-to-r from-black to-gray-900 w-full">
          <div className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-6">
              <h3 className="mobile-subsection-title font-bold text-white mb-2 max-w-full break-words">
                💬 <span className="text-purple-400">TESTIMONIO REAL</span> DE TRANSFORMACIÓN
              </h3>
              <p className="text-gray-300 mobile-small-text break-words">
                Escucha cómo Lucía transformó completamente su vida amorosa
              </p>
            </div>

            {/* Depoimento em Vídeo com VTurb - FORMATO STORY (9:16) COM OVERLAY AUMENTADO */}
            <div className="flex justify-center mb-6 sm:mb-8 w-full">
              <div className="w-full max-w-sm">
                <div className="relative bg-black rounded-xl sm:rounded-2xl p-2 mobile-border-purple shadow-xl overflow-hidden w-full">
                  
                  {/* Header do Depoimento */}
                  <div className="flex items-center p-2 pb-1">
                    <div className="mobile-avatar rounded-full border border-purple-400 overflow-hidden mr-2 flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                        <span className="text-white font-bold mobile-avatar-text">MC</span>
                      </div>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <h4 className="text-white font-bold mobile-name-text truncate">Lucía M.</h4>
                      <p className="text-green-400 mobile-status-text font-semibold">✅ Transformada en 18 días</p>
                    </div>
                  </div>

                  {/* 🎯 VÍDEO DEPOIMENTO COM OVERLAY AUMENTADO PARA OCULTAR MARCA D'ÁGUA */}
                  <div className="relative mobile-story-video bg-gray-900 rounded-xl overflow-hidden w-full">
                    <div className="relative z-10 w-full mobile-story-container">
                      <vturb-smartplayer 
                        id="vid-68ce171a1563ea2ce059118d" 
                        className="mobile-vturb-story-player"
                      ></vturb-smartplayer>
                    </div>
                    
                    {/* 🔥 OVERLAY AUMENTADO PARA OCULTAR MARCA D'ÁGUA DA HEYGEN */}
                    <div className="story-watermark-overlay-large"></div>
                  </div>

                  {/* Footer com CTA Adaptado */}
                  <div className="p-2 text-center w-full">
                    <Button
                      onClick={handlePurchase}
                      className="mobile-cta-secondary"
                      onTouchStart={handleTouchFeedback}
                    >
                      <Play className="mobile-small-icon mr-1 flex-shrink-0" />
                      <span className="mobile-cta-small-text truncate">
                        <span className="mobile-show">QUIERO TRANSFORMARME</span>
                        <span className="desktop-show">QUIERO LA MISMA TRANSFORMACIÓN</span>
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Números de Prova Social Adaptados */}
            <div className="mobile-grid max-w-2xl mx-auto w-full">
              <div className="bg-gray-800 mobile-stats-padding rounded-lg mobile-border-purple text-center">
                <div className="mobile-stats-number font-bold text-purple-400 mb-1">94%</div>
                <p className="text-white mobile-stats-text break-words">Se transforman en 21 días</p>
              </div>
              <div className="bg-gray-800 mobile-stats-padding rounded-lg mobile-border-purple text-center">
                <div className="mobile-stats-number font-bold text-purple-400 mb-1">4.200+</div>
                <p className="text-white mobile-stats-text break-words">Mujeres transformadas</p>
              </div>
              <div className="bg-gray-800 mobile-stats-padding rounded-lg mobile-border-purple text-center">
                <div className="mobile-stats-number font-bold text-purple-400 mb-1">21</div>
                <p className="text-white mobile-stats-text break-words">Días para renacer</p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ SEÇÃO 4: OFERTA FINAL ADAPTADA */}
        <div className="mobile-padding w-full">
          <div className="max-w-4xl mx-auto w-full">
            <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl mobile-border-yellow w-full">
              <CardContent className="mobile-offer-padding text-center w-full">
                
                {/* Badge de Oferta Adaptado */}
                <div className="bg-yellow-400 text-black font-bold mobile-offer-badge rounded-full inline-block mb-4 sm:mb-6 mobile-badge-text max-w-full">
                  🔥 OFERTA ESPECIAL - SOLO HOY
                </div>

                <h2 className="mobile-offer-title font-black mb-4 sm:mb-6 break-words">MÉTODO RENACER - TRANSFORMACIÓN COMPLETA</h2>

                {/* Preço Adaptado */}
                <div className="bg-black/20 rounded-lg mobile-price-padding mb-4 sm:mb-6 w-full">
                  <div className="text-center mb-4">
                    <div className="mobile-price-main font-black text-yellow-300 mb-2">$27</div>
                    <div className="mobile-price-sub">
                      <span className="line-through text-gray-400 mr-3">$127</span>
                      <span className="text-green-400 font-bold">AHORRAS $100</span>
                    </div>
                  </div>

                  {/* O que inclui Adaptado */}
                  <div className="text-left space-y-2 sm:space-y-3 max-w-md mx-auto w-full">
                    <div className="flex items-start text-white mobile-feature-text">
                      <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">Método RENACER completo</span>
                    </div>
                    <div className="flex items-start text-white mobile-feature-text">
                      <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">Guía de Autoestima Magnética ($47)</span>
                    </div>
                    <div className="flex items-start text-white mobile-feature-text">
                      <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">Plan de Reconstrucción 30 días ($37)</span>
                    </div>
                    <div className="flex items-start text-white mobile-feature-text">
                      <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">Garantía 30 días</span>
                    </div>
                    <div className="flex items-start text-white mobile-feature-text">
                      <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">Acceso inmediato</span>
                    </div>
                  </div>
                </div>

                {/* CTA Principal Adaptado */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="mb-4 sm:mb-6 w-full"
                >
                  <Button
                    onClick={handlePurchase}
                    size="lg"
                    className="mobile-cta-offer"
                    onTouchStart={handleTouchFeedback}
                  >
                    <span className="mobile-cta-offer-text text-center leading-tight break-words">
                      <span className="mobile-show">💫 RENACER AHORA - $27</span>
                      <span className="desktop-show">💫 QUIERO RENACER AHORA POR $27</span>
                    </span>
                    <ArrowRight className="mobile-icon-size ml-2 flex-shrink-0" />
                  </Button>
                </motion.div>

                {/* Urgência Final Adaptada */}
                <div className="bg-red-800 mobile-urgency-padding rounded-lg mb-4 w-full">
                  <p className="text-yellow-300 font-bold mobile-urgency-text mb-2">⏰ OFERTA EXPIRA EN:</p>
                  <div className="mobile-countdown font-black text-white">
                    <CountdownTimer minutes={15} seconds={0} />
                  </div>
                </div>

                {/* Social Proof Final Adaptado */}
                <div className="flex justify-center mobile-social-gap mobile-social-text text-white mb-4 flex-wrap">
                  <div className="flex items-center">
                    <Users className="mobile-social-icon text-purple-400 mr-1" />
                    <span><strong>{recentBuyers}</strong> se transformaron hoy</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mobile-social-icon text-red-400 mr-1" />
                    <span>Últimas horas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ✅ SEÇÃO 5: GARANTIA ADAPTADA */}
        <div className="mobile-padding bg-gradient-to-r from-green-900/30 to-emerald-900/30 w-full">
          <div className="max-w-4xl mx-auto w-full">
            <Card className="bg-green-50 mobile-border-green shadow-2xl w-full">
              <CardContent className="mobile-guarantee-padding text-center w-full">
                <Shield className="mobile-shield-icon text-green-600 mx-auto mb-4" />
                <h2 className="mobile-guarantee-title font-bold text-green-800 mb-4 break-words">GARANTÍA TOTAL DE 30 DÍAS</h2>
                <p className="text-green-700 mobile-guarantee-text font-semibold mb-4 break-words">
                  Si no te sientes transformada, te devolvemos el 100% de tu dinero
                </p>
                <p className="text-green-600 max-w-2xl mx-auto mobile-guarantee-desc break-words">
                  Prueba el Método RENACER durante 30 días. Si no sientes una transformación real, te devolvemos todo sin hacer preguntas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ✅ SEÇÃO 6: FAQ ADAPTADO */}
        <div className="mobile-padding w-full">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="mobile-faq-title font-bold text-white text-center mb-6 sm:mb-8 break-words">PREGUNTAS FRECUENTES</h2>

            <div className="space-y-4 max-w-2xl mx-auto w-full">
              <Card className="bg-gray-800 border border-gray-700 w-full">
                <CardContent className="mobile-faq-padding w-full">
                  <h3 className="mobile-faq-question font-bold text-purple-400 mb-2 break-words">
                    ¿Funciona si mi ruptura fue muy dolorosa?
                  </h3>
                  <p className="text-gray-300 mobile-faq-answer break-words">
                    Sí, especialmente en esos casos. El 89% de nuestras clientas con rupturas traumáticas lograron una transformación completa en menos de 21 días.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border border-gray-700 w-full">
                <CardContent className="mobile-faq-padding w-full">
                  <h3 className="mobile-faq-question font-bold text-purple-400 mb-2 break-words">¿Cuánto tiempo tarda en ver resultados?</h3>
                  <p className="text-gray-300 mobile-faq-answer break-words">
                    El 94% de las mujeres sienten cambios positivos en los primeros 7 días. La transformación completa ocurre en 21 días máximo.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border border-gray-700 w-full">
                <CardContent className="mobile-faq-padding w-full">
                  <h3 className="mobile-faq-question font-bold text-purple-400 mb-2 break-words">¿Cómo recibo el acceso?</h3>
                  <p className="text-gray-300 mobile-faq-answer break-words">
                    Inmediatamente después del pago recibes un email con tus credenciales. Todo el contenido queda disponible al momento.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* ✅ CTA FINAL ADAPTADO */}
        <div className="mobile-padding bg-gradient-to-r from-purple-600 to-pink-600 w-full">
          <div className="max-w-4xl mx-auto text-center w-full">
            <div className="bg-black/20 backdrop-blur-sm rounded-xl sm:rounded-2xl mobile-final-padding mobile-border-yellow w-full">
              <h2 className="mobile-final-title font-black text-white mb-4 break-words">⏰ ÚLTIMA OPORTUNIDAD</h2>
              <p className="mobile-final-subtitle text-white mb-4 sm:mb-6 font-semibold break-words">
                Esta oferta expira en minutos. Después vuelve a $127.
              </p>

              <div className="bg-red-800 mobile-final-countdown-padding rounded-lg mb-4 sm:mb-6 w-full">
                <p className="text-yellow-300 font-bold mobile-final-countdown-label mb-2">TIEMPO RESTANTE:</p>
                <div className="mobile-final-countdown-time font-black text-white">
                  <CountdownTimer minutes={15} seconds={0} />
                </div>
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="w-full"
              >
                <Button
                  onClick={handlePurchase}
                  size="lg"
                  className="mobile-cta-final"
                  onTouchStart={handleTouchFeedback}
                >
                  <span className="mobile-cta-final-text text-center leading-tight break-words">
                    <span className="mobile-show">💫 ¡RENACER YA!</span>
                    <span className="desktop-show">💫 ¡SÍ, QUIERO RENACER AHORA!</span>
                  </span>
                  <ArrowRight className="mobile-icon-size ml-2 flex-shrink-0" />
                </Button>
              </motion.div>

              <p className="text-yellow-300 mobile-final-warning mt-4 font-semibold break-words">
                Tu nueva vida amorosa te está esperando
              </p>
            </div>
          </div>
        </div>

        {/* 🎯 CSS MOBILE-FIRST ADAPTADO COM OVERLAY AUMENTADO PARA MARCA D'ÁGUA */}
        <style jsx global>{`
          /* ===== OVERLAY AUMENTADO PARA OCULTAR MARCA D'ÁGUA HEYGEN ===== */
          .story-watermark-overlay-large {
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            height: clamp(90px, 20vw, 130px) !important;
            background: linear-gradient(
              to top,
              rgba(0, 0, 0, 0.98) 0%,
              rgba(0, 0, 0, 0.95) 20%,
              rgba(0, 0, 0, 0.85) 40%,
              rgba(0, 0, 0, 0.70) 60%,
              rgba(0, 0, 0, 0.50) 75%,
              rgba(0, 0, 0, 0.25) 85%,
              rgba(0, 0, 0, 0.10) 95%,
              transparent 100%
            ) !important;
            z-index: 999999 !important;
            pointer-events: none !important;
            border-radius: 0 0 clamp(0.5rem, 2vw, 1rem) clamp(0.5rem, 2vw, 1rem) !important;
            backdrop-filter: blur(1px) !important;
            -webkit-backdrop-filter: blur(1px) !important;
          }

          /* AJUSTES RESPONSIVOS PARA O OVERLAY AUMENTADO */
          @media (max-width: 375px) {
            .story-watermark-overlay-large {
              height: 80px !important;
            }
          }

          @media (min-width: 640px) {
            .story-watermark-overlay-large {
              height: 110px !important;
            }
          }

          @media (min-width: 768px) {
            .story-watermark-overlay-large {
              height: 120px !important;
            }
          }

          @media (min-width: 1024px) {
            .story-watermark-overlay-large {
              height: 130px !important;
            }
          }

          /* GARANTIR QUE O OVERLAY FUNCIONE EM TODOS OS PLAYERS VTURB */
          vturb-smartplayer[id="vid-68ce171a1563ea2ce059118d"] + .story-watermark-overlay-large {
            z-index: 999999 !important;
          }

          /* ===== CORES ADAPTADAS PARA MÉTODO RENACER ===== */
          .mobile-border-purple {
            border: clamp(1px, 0.5vw, 2px) solid rgb(147 51 234);
          }

          .mobile-cta-primary {
            width: 100% !important;
            max-width: 28rem !important;
            margin: 0 auto !important;
            background: linear-gradient(to right, rgb(147 51 234), rgb(219 39 119)) !important;
            color: white !important;
            font-weight: 900 !important;
            padding: clamp(1rem, 4vw, 1.5rem) clamp(1rem, 4vw, 2rem) !important;
            border-radius: 9999px !important;
            font-size: clamp(1rem, 3vw, 1.25rem) !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
            transition: all 0.3s ease !important;
            border: clamp(2px, 1vw, 4px) solid rgb(250 204 21) !important;
            min-height: clamp(3.5rem, 12vw, 4rem) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
            user-select: none !important;
          }

          .mobile-cta-primary:hover {
            background: linear-gradient(to right, rgb(126 34 206), rgb(190 24 93)) !important;
            transform: scale(1.02) !important;
          }

          .mobile-cta-secondary {
            width: 100% !important;
            background: linear-gradient(to right, rgb(147 51 234), rgb(219 39 119)) !important;
            color: white !important;
            font-weight: 700 !important;
            padding: clamp(0.5rem, 2vw, 0.75rem) clamp(0.5rem, 2vw, 0.75rem) !important;
            border-radius: 9999px !important;
            font-size: clamp(0.75rem, 2.5vw, 0.875rem) !important;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25) !important;
            transition: all 0.3s ease !important;
            min-height: clamp(2.25rem, 8vw, 2.5rem) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
            user-select: none !important;
          }

          .mobile-cta-secondary:hover {
            background: linear-gradient(to right, rgb(126 34 206), rgb(190 24 93)) !important;
          }

          /* ===== VTURB STORY PLAYER (9:16) - CORREÇÃO PRINCIPAL ===== */
          .mobile-story-video {
            aspect-ratio: 9/16 !important;
            height: auto !important;
            width: 100% !important;
            max-width: 100% !important;
            min-height: clamp(300px, 60vw, 500px) !important;
          }

          .mobile-story-container {
            width: 100% !important;
            max-width: 100% !important;
            position: relative !important;
            overflow: hidden !important;
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
            aspect-ratio: 9/16 !important;
          }

          .mobile-vturb-story-player {
            display: block !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
            overflow: hidden !important;
            aspect-ratio: 9/16 !important;
            height: auto !important;
            min-height: clamp(300px, 60vw, 500px) !important;
            object-fit: cover !important;
          }

          /* SELETOR ESPECÍFICO PARA O SEGUNDO VÍDEO (STORY) */
          vturb-smartplayer[id="vid-68ce171a1563ea2ce059118d"] {
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
            overflow: hidden !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
            aspect-ratio: 9/16 !important;
            contain: layout style paint !important;
            object-fit: cover !important;
            min-height: clamp(300px, 60vw, 500px) !important;
          }

          /* GARANTIR QUE O IFRAME INTERNO TAMBÉM SEJA 9:16 */
          vturb-smartplayer[id="vid-68ce171a1563ea2ce059118d"] iframe {
            aspect-ratio: 9/16 !important;
            width: 100% !important;
            height: auto !important;
            min-height: clamp(300px, 60vw, 500px) !important;
            object-fit: cover !important;
          }

          /* ===== VTURB NORMAL PLAYER (16:9) - PRIMEIRO VÍDEO MANTIDO ===== */
          .mobile-video-container {
            width: 100% !important;
            max-width: 100% !important;
            position: relative !important;
            overflow: hidden !important;
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
            aspect-ratio: 16/9 !important;
          }

          .mobile-vturb-player {
            display: block !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
            overflow: hidden !important;
            aspect-ratio: 16/9 !important;
            height: auto !important;
            min-height: clamp(200px, 40vw, 400px) !important;
          }

          /* SELETOR ESPECÍFICO PARA O PRIMEIRO VÍDEO (NORMAL 16:9) */
          vturb-smartplayer[id="vid-68cf84b4c9c4c158bda807e8"] {
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
            overflow: hidden !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
            aspect-ratio: 16/9 !important;
            contain: layout style paint !important;
            min-height: clamp(200px, 40vw, 400px) !important;
          }

          /* ===== RESTO DO CSS MANTIDO IGUAL ===== */
          
          /* ===== RESET E BASE MOBILE-FIRST ===== */
          * {
            box-sizing: border-box !important;
            max-width: 100% !important;
          }

          html {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            width: 100%;
            margin: 0;
            padding: 0;
          }

          .mobile-container {
            max-width: 100vw !important;
            overflow-x: hidden !important;
            width: 100% !important;
            position: relative;
          }

          /* ===== SISTEMA DE BREAKPOINTS ===== */
          .mobile-show { display: inline !important; }
          .desktop-show { display: none !important; }

          @media (min-width: 640px) {
            .mobile-show { display: none !important; }
            .desktop-show { display: inline !important; }
          }

          /* ===== PADDING E SPACING RESPONSIVO ===== */
          .mobile-padding {
            padding: clamp(1rem, 4vw, 2rem) clamp(0.75rem, 3vw, 1rem);
          }

          .mobile-card-padding {
            padding: clamp(1rem, 4vw, 1.5rem);
          }

          .mobile-video-padding {
            padding: clamp(0.5rem, 2vw, 1rem);
          }

          .mobile-list-padding {
            padding: clamp(0.75rem, 3vw, 1rem);
          }

          .mobile-badge-padding {
            padding: clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 4vw, 1.5rem);
          }

          .mobile-offer-padding {
            padding: clamp(1rem, 4vw, 2rem);
          }

          .mobile-price-padding {
            padding: clamp(1rem, 4vw, 1.5rem);
          }

          .mobile-stats-padding {
            padding: clamp(0.75rem, 3vw, 1rem);
          }

          .mobile-urgency-padding {
            padding: clamp(0.75rem, 3vw, 1rem);
          }

          .mobile-guarantee-padding {
            padding: clamp(1rem, 4vw, 1.5rem);
          }

          .mobile-faq-padding {
            padding: clamp(0.75rem, 3vw, 1rem);
          }

          .mobile-final-padding {
            padding: clamp(1rem, 4vw, 1.5rem);
          }

          .mobile-final-countdown-padding {
            padding: clamp(0.75rem, 3vw, 1rem);
          }

          /* ===== TIPOGRAFIA RESPONSIVA ===== */
          .mobile-headline {
            font-size: clamp(1.5rem, 6vw, 3rem);
            line-height: 1.2;
            font-weight: 900;
          }

          .mobile-section-title {
            font-size: clamp(1.25rem, 5vw, 2rem);
            line-height: 1.3;
          }

          .mobile-subsection-title {
            font-size: clamp(1.125rem, 4vw, 1.5rem);
            line-height: 1.3;
          }

          .mobile-offer-title {
            font-size: clamp(1.5rem, 5vw, 2.5rem);
            line-height: 1.2;
          }

          .mobile-final-title {
            font-size: clamp(1.5rem, 5vw, 2rem);
            line-height: 1.2;
          }

          .mobile-guarantee-title {
            font-size: clamp(1.125rem, 4vw, 1.5rem);
            line-height: 1.3;
          }

          .mobile-faq-title {
            font-size: clamp(1.25rem, 4vw, 1.5rem);
            line-height: 1.3;
          }

          .mobile-description {
            font-size: clamp(1rem, 3vw, 1.125rem);
            line-height: 1.5;
          }

          .mobile-transition-text {
            font-size: clamp(1.125rem, 4vw, 1.25rem);
            line-height: 1.4;
          }

          .mobile-info-text {
            font-size: clamp(0.875rem, 3vw, 1rem);
            line-height: 1.4;
          }

          .mobile-list-text {
            font-size: clamp(0.875rem, 3vw, 1rem);
            line-height: 1.4;
          }

          .mobile-badge-text {
            font-size: clamp(0.875rem, 3vw, 1.125rem);
            line-height: 1.3;
          }

          .mobile-small-text {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
            line-height: 1.4;
          }

          .mobile-feature-text {
            font-size: clamp(0.875rem, 3vw, 1rem);
            line-height: 1.4;
          }

          .mobile-price-main {
            font-size: clamp(2.5rem, 8vw, 3.75rem);
            line-height: 1;
          }

          .mobile-price-sub {
            font-size: clamp(1rem, 3vw, 1.25rem);
            line-height: 1.3;
          }

                    .mobile-stats-number {
            font-size: clamp(1.25rem, 4vw, 1.5rem);
            line-height: 1.2;
          }

          .mobile-stats-text {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
            line-height: 1.3;
          }

          .mobile-countdown {
            font-size: clamp(1.5rem, 5vw, 2rem);
            line-height: 1.2;
          }

          .mobile-urgency-text {
            font-size: clamp(0.875rem, 3vw, 1.125rem);
            line-height: 1.3;
          }

          .mobile-social-text {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
            line-height: 1.3;
          }

          .mobile-guarantee-text {
            font-size: clamp(1rem, 3vw, 1.125rem);
            line-height: 1.4;
          }

          .mobile-guarantee-desc {
            font-size: clamp(0.875rem, 3vw, 1rem);
            line-height: 1.4;
          }

          .mobile-faq-question {
            font-size: clamp(0.875rem, 3vw, 1.125rem);
            line-height: 1.3;
          }

          .mobile-faq-answer {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
            line-height: 1.4;
          }

          .mobile-final-subtitle {
            font-size: clamp(1rem, 3vw, 1.25rem);
            line-height: 1.4;
          }

          .mobile-final-countdown-label {
            font-size: clamp(0.875rem, 3vw, 1.125rem);
            line-height: 1.3;
          }

          .mobile-final-countdown-time {
            font-size: clamp(1.75rem, 6vw, 2.25rem);
            line-height: 1.2;
          }

          .mobile-final-warning {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
            line-height: 1.3;
          }

          /* ===== ELEMENTOS ESPECÍFICOS ===== */
          .mobile-circle {
            width: clamp(5rem, 15vw, 6rem);
            height: clamp(5rem, 15vw, 6rem);
          }

          .mobile-percentage {
            font-size: clamp(1.25rem, 4vw, 1.5rem);
            line-height: 1;
          }

          .mobile-success-text {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
            line-height: 1;
          }

          .mobile-avatar {
            width: clamp(1.75rem, 5vw, 2rem);
            height: clamp(1.75rem, 5vw, 2rem);
          }

          .mobile-avatar-text {
            font-size: clamp(0.625rem, 2vw, 0.75rem);
          }

          .mobile-name-text {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
          }

          .mobile-status-text {
            font-size: clamp(0.625rem, 2vw, 0.75rem);
          }

          /* ===== ÍCONES RESPONSIVOS ===== */
          .mobile-icon-size {
            width: clamp(1.25rem, 4vw, 1.5rem);
            height: clamp(1.25rem, 4vw, 1.5rem);
          }

          .mobile-check-icon {
            width: clamp(1rem, 3vw, 1.25rem);
            height: clamp(1rem, 3vw, 1.25rem);
          }

          .mobile-small-icon {
            width: clamp(0.75rem, 2.5vw, 1rem);
            height: clamp(0.75rem, 2.5vw, 1rem);
          }

          .mobile-social-icon {
            width: clamp(0.75rem, 2.5vw, 1rem);
            height: clamp(0.75rem, 2.5vw, 1rem);
          }

          .mobile-shield-icon {
            width: clamp(3rem, 8vw, 4rem);
            height: clamp(3rem, 8vw, 4rem);
          }

          /* ===== BORDAS RESPONSIVAS ===== */
          .mobile-border {
            border-width: clamp(2px, 1vw, 4px);
          }

          .mobile-border-white {
            border: clamp(2px, 1vw, 4px) solid white;
          }

          .mobile-border-orange {
            border: clamp(1px, 0.5vw, 2px) solid rgb(249 115 22);
          }

          .mobile-border-yellow {
            border: clamp(2px, 1vw, 4px) solid rgb(250 204 21);
          }

          .mobile-border-green {
            border: clamp(2px, 1vw, 4px) solid rgb(34 197 94);
          }

          /* ===== GRID RESPONSIVO ===== */
          .mobile-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: clamp(0.5rem, 2vw, 1rem);
          }

          .mobile-social-gap {
            gap: clamp(0.5rem, 2vw, 1rem);
          }

          /* ===== BOTÕES OFFER E FINAL ADAPTADOS ===== */
          .mobile-cta-offer {
            width: 100% !important;
            max-width: 32rem !important;
            margin: 0 auto !important;
            background: rgb(234 179 8) !important;
            color: black !important;
            font-weight: 900 !important;
            padding: clamp(1rem, 4vw, 1.5rem) clamp(1rem, 4vw, 2rem) !important;
            border-radius: 9999px !important;
            font-size: clamp(1.125rem, 4vw, 1.5rem) !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
            transition: all 0.3s ease !important;
            border: clamp(2px, 1vw, 4px) solid white !important;
            min-height: clamp(3.75rem, 14vw, 4.5rem) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
            user-select: none !important;
          }

          .mobile-cta-offer:hover {
            background: rgb(202 138 4) !important;
            transform: scale(1.02) !important;
          }

          .mobile-cta-final {
            width: 100% !important;
            max-width: 28rem !important;
            margin: 0 auto !important;
            background: rgb(234 179 8) !important;
            color: black !important;
            font-weight: 900 !important;
            padding: clamp(1rem, 4vw, 1.5rem) clamp(1rem, 4vw, 2rem) !important;
            border-radius: 9999px !important;
            font-size: clamp(1.125rem, 4vw, 1.5rem) !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
            transition: all 0.3s ease !important;
            border: clamp(2px, 1vw, 4px) solid white !important;
            min-height: clamp(3.75rem, 14vw, 4.5rem) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
            user-select: none !important;
          }

          .mobile-cta-final:hover {
            background: rgb(202 138 4) !important;
            transform: scale(1.05) !important;
          }

          /* ===== TEXTO DOS BOTÕES ===== */
          .mobile-cta-text {
            font-size: clamp(0.875rem, 3vw, 1.125rem) !important;
            line-height: 1.2 !important;
            font-weight: 700 !important;
          }

          .mobile-cta-small-text {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem) !important;
            line-height: 1.2 !important;
            font-weight: 600 !important;
          }

          .mobile-cta-offer-text {
            font-size: clamp(1rem, 3.5vw, 1.25rem) !important;
            line-height: 1.2 !important;
            font-weight: 800 !important;
          }

          .mobile-cta-final-text {
            font-size: clamp(1rem, 3.5vw, 1.25rem) !important;
            line-height: 1.2 !important;
            font-weight: 800 !important;
          }

          /* ===== OTIMIZAÇÕES PARA TELAS MUITO PEQUENAS ===== */
          @media (max-width: 375px) {
            .mobile-padding {
              padding: 1rem 0.75rem !important;
            }

            .mobile-headline {
              font-size: 1.25rem !important;
              line-height: 1.3 !important;
            }

            .mobile-section-title {
              font-size: 1.125rem !important;
            }

            .mobile-offer-title {
              font-size: 1.25rem !important;
            }

            .mobile-price-main {
              font-size: 2rem !important;
            }

            .mobile-grid {
              gap: 0.25rem !important;
            }

            .mobile-cta-primary,
            .mobile-cta-offer,
            .mobile-cta-final {
              padding: 0.875rem 1rem !important;
              min-height: 3rem !important;
              font-size: 0.875rem !important;
            }

            .mobile-vturb-player {
              min-height: 180px !important;
            }

            .mobile-vturb-story-player {
              min-height: 250px !important;
            }

            .mobile-story-video {
              min-height: 250px !important;
            }

            .story-watermark-overlay-large {
              height: 70px !important;
            }
          }

          /* ===== OTIMIZAÇÕES PARA TELAS MÉDIAS ===== */
          @media (min-width: 640px) {
            .mobile-padding {
              padding: 2rem 1rem !important;
            }

            .mobile-grid {
              gap: 1rem !important;
            }

            .mobile-social-gap {
              gap: 1rem !important;
            }

            .mobile-border {
              border-width: 4px !important;
            }

            .mobile-border-purple {
              border-width: 2px !important;
            }

            .mobile-story-video {
              min-height: 400px !important;
            }

            .mobile-vturb-story-player {
              min-height: 400px !important;
            }

            .story-watermark-overlay-large {
              height: 110px !important;
            }
          }

          /* ===== PERFORMANCE E ANIMAÇÕES ===== */
          .bg-gradient-to-r, 
          .bg-gradient-to-br {
            will-change: transform !important;
            backface-visibility: hidden !important;
            transform: translateZ(0) !important;
          }

          /* ===== PREVENÇÃO DE ZOOM NO IOS ===== */
          @supports (-webkit-touch-callout: none) {
            input, 
            select, 
            textarea {
              font-size: 16px !important;
            }
          }

          /* ===== SCROLL SUAVE ===== */
          html {
            scroll-behavior: smooth !important;
          }

          /* ===== TRUNCAMENTO E QUEBRA DE TEXTO ===== */
          .truncate {
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
          }

          .break-words {
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            word-break: break-word !important;
            hyphens: auto !important;
          }

          /* ===== GARANTIR RESPONSIVIDADE TOTAL ===== */
          * {
            max-width: 100% !important;
            box-sizing: border-box !important;
          }

          img, 
          video {
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
            box-sizing: border-box !important;
          }

          /* ===== OTIMIZAÇÕES DE TOUCH ===== */
          button,
          a,
          [role="button"] {
            min-height: 44px !important;
            min-width: 44px !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
            user-select: none !important;
          }

          /* ===== CONTAINER QUERIES FALLBACK ===== */
          @container (max-width: 768px) {
            .mobile-headline { font-size: 1.5rem !important; }
            .mobile-section-title { font-size: 1.25rem !important; }
            .mobile-offer-title { font-size: 1.5rem !important; }
          }

          /* ===== OTIMIZAÇÕES ESPECÍFICAS PARA LANDSCAPE MOBILE ===== */
          @media (max-height: 500px) and (orientation: landscape) {
            .mobile-padding {
              padding: 1rem 0.75rem !important;
            }

            .mobile-headline {
              font-size: 1.25rem !important;
              margin-bottom: 1rem !important;
            }

            .mobile-circle {
              width: 4rem !important;
              height: 4rem !important;
            }

            .mobile-vturb-player {
              min-height: 150px !important;
            }

            .mobile-vturb-story-player {
              min-height: 200px !important;
            }

            .mobile-story-video {
              min-height: 200px !important;
            }

            .story-watermark-overlay-large {
              height: 60px !important;
            }
          }

          /* ===== OTIMIZAÇÕES PARA ACESSIBILIDADE ===== */
          @media (prefers-reduced-motion: reduce) {
            .animate-pulse,
            .animate-bounce {
              animation: none !important;
            }

            motion-div {
              animation: none !important;
            }
          }

          /* ===== DARK MODE COMPATIBILITY ===== */
          @media (prefers-color-scheme: dark) {
            .bg-green-50 {
              background-color: rgb(20 83 45) !important;
            }

            .text-green-800 {
              color: rgb(187 247 208) !important;
            }

            .text-green-700 {
              color: rgb(134 239 172) !important;
            }

            .text-green-600 {
              color: rgb(74 222 128) !important;
            }
          }

          /* ===== GARANTIAS FINAIS DE RESPONSIVIDADE ===== */
          .min-h-screen {
            max-width: 100vw !important;
            overflow-x: hidden !important;
            width: 100% !important;
            position: relative !important;
          }

          .max-w-4xl {
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 auto !important;
            padding: 0 !important;
          }

          .max-w-3xl,
          .max-w-2xl,
          .max-w-xl,
          .max-w-lg,
          .max-w-md,
          .max-w-sm,
          .max-w-xs {
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 auto !important;
          }

          @media (min-width: 640px) {
            .max-w-4xl { max-width: 56rem !important; }
            .max-w-3xl { max-width: 48rem !important; }
            .max-w-2xl { max-width: 42rem !important; }
            .max-w-xl { max-width: 36rem !important; }
            .max-w-lg { max-width: 32rem !important; }
            .max-w-md { max-width: 28rem !important; }
            .max-w-sm { max-width: 24rem !important; }
            .max-w-xs { max-width: 20rem !important; }
          }

          /* ===== FORÇAR ASPECT RATIO STORY PARA VTURB ===== */
          vturb-smartplayer[id="vid-68ce171a1563ea2ce059118d"] video {
            aspect-ratio: 9/16 !important;
            object-fit: cover !important;
            width: 100% !important;
            height: auto !important;
          }

          /* ===== FALLBACK PARA NAVEGADORES SEM SUPORTE A ASPECT-RATIO ===== */
          @supports not (aspect-ratio: 9/16) {
            .mobile-story-video {
              position: relative;
              width: 100%;
              max-width: 400px;
              height: 0;
              padding-bottom: 177.78%; /* 16/9 = 1.778, então 100/1.778 = 56.25% para 9/16 seria 177.78% */
            }

            .mobile-vturb-story-player {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
          }

          /* ===== GARANTIR MÁXIMA PRIORIDADE DO OVERLAY ===== */
          .story-watermark-overlay-large {
            z-index: 999999 !important;
            position: absolute !important;
            pointer-events: none !important;
          }

          /* ===== OVERLAY ALTERNATIVO CASO O PRIMEIRO NÃO FUNCIONE ===== */
          .mobile-story-video::after {
            content: '' !important;
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            height: clamp(90px, 20vw, 130px) !important;
            background: linear-gradient(
              to top,
              rgba(0, 0, 0, 0.98) 0%,
              rgba(0, 0, 0, 0.95) 20%,
              rgba(0, 0, 0, 0.85) 40%,
              rgba(0, 0, 0, 0.70) 60%,
              rgba(0, 0, 0, 0.50) 75%,
              rgba(0, 0, 0, 0.25) 85%,
              rgba(0, 0, 0, 0.10) 95%,
              transparent 100%
            ) !important;
            z-index: 999999 !important;
            pointer-events: none !important;
            border-radius: 0 0 clamp(0.5rem, 2vw, 1rem) clamp(0.5rem, 2vw, 1rem) !important;
          }

          /* ===== OVERLAY EXTRA PARA GARANTIR COBERTURA TOTAL ===== */
          @media (max-width: 480px) {
            .story-watermark-overlay-large {
              height: 85px !important;
              background: linear-gradient(
                to top,
                rgba(0, 0, 0, 0.99) 0%,
                rgba(0, 0, 0, 0.97) 15%,
                rgba(0, 0, 0, 0.90) 30%,
                rgba(0, 0, 0, 0.80) 45%,
                rgba(0, 0, 0, 0.65) 60%,
                rgba(0, 0, 0, 0.45) 75%,
                rgba(0, 0, 0, 0.25) 85%,
                rgba(0, 0, 0, 0.10) 95%,
                transparent 100%
              ) !important;
            }
          }

          /* ===== FORÇAR OVERLAY EM TODOS OS ELEMENTOS VTURB ===== */
          vturb-smartplayer[id="vid-68ce171a1563ea2ce059118d"] {
            position: relative !important;
          }

          vturb-smartplayer[id="vid-68ce171a1563ea2ce059118d"]::after {
            content: '' !important;
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            height: clamp(90px, 20vw, 130px) !important;
            background: linear-gradient(
              to top,
              rgba(0, 0, 0, 0.98) 0%,
              rgba(0, 0, 0, 0.95) 20%,
              rgba(0, 0, 0, 0.85) 40%,
              rgba(0, 0, 0, 0.70) 60%,
              rgba(0, 0, 0, 0.50) 75%,
              rgba(0, 0, 0, 0.25) 85%,
              rgba(0, 0, 0, 0.10) 95%,
              transparent 100%
            ) !important;
            z-index: 999999 !important;
            pointer-events: none !important;
            border-radius: 0 0 clamp(0.5rem, 2vw, 1rem) clamp(0.5rem, 2vw, 1rem) !important;
          }
        `}</style>
      </div>
    </>
  )
}
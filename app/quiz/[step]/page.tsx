"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Gift,
  Check,
  ArrowRight,
  ArrowLeft,
  Heart,
  Clock,
  AlertTriangle,
  User,
  TrendingUp,
  Target,
  Zap,
  Calendar,
  Users,
  MessageCircle,
  Smile,
  Star,
  CheckCircle,
  Trophy,
  Sparkles,
  Flower,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { quizSteps, socialProofMessages, getPersonalizedContent } from "@/lib/quiz-data"
import { BonusUnlock } from "@/components/bonus-unlock"
import { ValueCounter } from "@/components/value-counter"
import { LoadingAnalysis } from "@/components/loading-analysis"

// Função para enviar eventos a Google Analytics
function enviarEvento(nombre_evento, propriedades = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', nombre_evento, propriedades);
    console.log('Evento enviado:', nombre_evento, propriedades);
  }
}

export default function QuizStep() {
  const params = useParams()
  const router = useRouter()
  const step = Number.parseInt(params.step as string)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [quizData, setQuizData] = useState<any>({})
  const [unlockedBonuses, setUnlockedBonuses] = useState<number[]>([])
  const [totalValue, setTotalValue] = useState(0)
  const [showBonusUnlock, setShowBonusUnlock] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [newBonus, setNewBonus] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [peopleCount, setPeopleCount] = useState(23) // Adaptado para mulheres
  const [userGender, setUserGender] = useState<string>("")

  const currentStep = quizSteps[step - 1]
  const progress = (step / 12) * 100

  useEffect(() => {
    // Cargar datos guardados
    const saved = localStorage.getItem("quizData")
    const savedBonuses = localStorage.getItem("unlockedBonuses")
    const savedValue = localStorage.getItem("totalValue")
    const savedGender = localStorage.getItem("userGender")

    if (saved) setQuizData(JSON.parse(saved))
    if (savedBonuses) setUnlockedBonuses(JSON.parse(savedBonuses))
    if (savedValue) setTotalValue(Number.parseInt(savedValue))
    if (savedGender) setUserGender(savedGender)

    // Retraso de animación
    setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    // Registra visualización de la etapa del cuestionario
    enviarEvento('visualizou_etapa_quiz', {
      numero_etapa: step,
      pergunta: currentStep?.question || `Etapa ${step}`,
      metodo: 'RENACER'
    });

    // Avance automático para el paso de experto
    if (currentStep?.autoAdvance) {
      const timer = setTimeout(() => {
        proceedToNextStep()
      }, 3000)

      return () => clearTimeout(timer)
    }

    // Simular contador de mujeres transformadas
    const interval = setInterval(() => {
      setPeopleCount((prev) => prev + Math.floor(Math.random() * 2) + 1)
    }, 45000)

    return () => clearInterval(interval)
  }, [step])

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)

    // Registra evento de respuesta seleccionada
    enviarEvento('selecionou_resposta', {
      numero_etapa: step,
      pergunta: currentStep?.question || `Etapa ${step}`,
      resposta: answer,
      metodo: 'RENACER'
    });

    // Guardar selección de género en el primer paso
    if (step === 1) {
      setUserGender(answer)
      localStorage.setItem("userGender", answer)
    }

    // Retroalimentación visual inmediata
    const button = document.querySelector(`button[data-option="${answer}"]`)
    if (button) {
      button.classList.add("scale-105")
      setTimeout(() => button.classList.remove("scale-105"), 200)
    }
  }

  const handleNext = () => {
    // Registra evento de avance a la siguiente etapa
    enviarEvento('avancou_etapa', {
      numero_etapa: step,
      pergunta: currentStep?.question || `Etapa ${step}`,
      resposta_selecionada: selectedAnswer,
      metodo: 'RENACER'
    });

    // Guardar respuesta
    const newQuizData = { ...quizData, [step]: selectedAnswer }
    setQuizData(newQuizData)
    localStorage.setItem("quizData", JSON.stringify(newQuizData))

    // Mostrar análisis para ciertos pasos
    if (currentStep?.elements?.analysisText || currentStep?.elements?.profileAnalysis) {
      setShowAnalysis(true)
      setTimeout(() => {
        setShowAnalysis(false)
        proceedToNextStep()
      }, 2000)
      return
    }

    proceedToNextStep()
  }

  const proceedToNextStep = () => {
    // Capturar UTMs da URL atual
    const currentUrl = new URL(window.location.href);
    let utmString = '';
    
    // Verificar se há parâmetros UTM na URL atual
    const utmParams = new URLSearchParams();
    for (const [key, value] of currentUrl.searchParams.entries()) {
      if (key.startsWith('utm_')) {
        utmParams.append(key, value);
      }
    }
    
    // Se encontramos UTMs, criar a string de query
    if (utmParams.toString() !== '') {
      utmString = '?' + utmParams.toString();
    }

    // Verificar desbloqueo de bonificación
    if (currentStep?.bonusUnlock && !unlockedBonuses.includes(currentStep.bonusUnlock.id)) {
      // Registra evento de desbloqueo de bonificación
      enviarEvento('desbloqueou_bonus', {
        numero_etapa: step,
        bonus_id: currentStep.bonusUnlock.id,
        bonus_titulo: currentStep.bonusUnlock.title,
        metodo: 'RENACER'
      });

      const newUnlockedBonuses = [...unlockedBonuses, currentStep.bonusUnlock.id]
      const newTotalValue = totalValue + currentStep.bonusUnlock.value

      setUnlockedBonuses(newUnlockedBonuses)
      setTotalValue(newTotalValue)

      // Personalizar bonificación basada en el género
      const personalizedBonus = {
        ...currentStep.bonusUnlock,
        title: getPersonalizedContent(currentStep.bonusUnlock.title, userGender),
        description: getPersonalizedContent(currentStep.bonusUnlock.description, userGender),
      }
      setNewBonus(personalizedBonus)

      localStorage.setItem("unlockedBonuses", JSON.stringify(newUnlockedBonuses))
      localStorage.setItem("totalValue", newTotalValue.toString())

      setShowBonusUnlock(true)
      return
    }

    if (step < 12) {
      router.push(`/quiz/${step + 1}${utmString}`)
    } else {
      enviarEvento('concluiu_quiz', {
        total_etapas_completadas: 12,
        total_bonus_desbloqueados: unlockedBonuses.length,
        metodo: 'RENACER'
      });
      
      router.push(`/resultado${utmString}`)
    }
  }

  const handleBonusUnlockComplete = () => {
    setShowBonusUnlock(false)
    
    // Capturar UTMs da URL atual
    const currentUrl = new URL(window.location.href);
    let utmString = '';
    
    // Verificar se há parâmetros UTM na URL atual
    const utmParams = new URLSearchParams();
    for (const [key, value] of currentUrl.searchParams.entries()) {
      if (key.startsWith('utm_')) {
        utmParams.append(key, value);
      }
    }
    
    // Se encontramos UTMs, criar a string de query
    if (utmParams.toString() !== '') {
      utmString = '?' + utmParams.toString();
    }
    
    if (step < 12) {
      router.push(`/quiz/${step + 1}${utmString}`)
    } else {
      router.push(`/resultado${utmString}`)
    }
  }

  const handleBack = () => {
    // Registra evento de retorno a la etapa anterior
    enviarEvento('retornou_etapa', {
      de_etapa: step,
      para_etapa: step > 1 ? step - 1 : 'inicio',
      metodo: 'RENACER'
    });
    
    // Capturar UTMs da URL atual
    const currentUrl = new URL(window.location.href);
    let utmString = '';
    
    // Verificar se há parâmetros UTM na URL atual
    const utmParams = new URLSearchParams();
    for (const [key, value] of currentUrl.searchParams.entries()) {
      if (key.startsWith('utm_')) {
        utmParams.append(key, value);
      }
    }
    
    // Se encontramos UTMs, criar a string de query
    if (utmParams.toString() !== '') {
      utmString = '?' + utmParams.toString();
    }
    
    if (step > 1) {
      router.push(`/quiz/${step - 1}${utmString}`)
    } else {
      router.push(`/${utmString}`)
    }
  }

  const getStepIcon = (stepNumber: number, index: number) => {
    const iconMaps = {
      1: [User, Users], // Género
      2: [Calendar, TrendingUp, Target, Sparkles], // Edad - adaptado para fases femininas
      3: [Clock, Calendar, Heart, Flower], // Tiempo soltera
      4: [Heart, MessageCircle, Users], // Cómo terminó
      5: [Calendar, Heart, TrendingUp, Clock], // Duración relación
      6: [Smile, Heart, MessageCircle, TrendingUp, Target, Sparkles], // Desafío post-ruptura
      7: [MessageCircle, Heart, Users, TrendingUp, Smile, Sparkles, Flower], // Sentimientos sobre amor
      8: [MessageCircle, Heart, Users, TrendingUp, Sparkles], // Tipo de relación futura
      9: [Heart, TrendingUp, Target, Sparkles], // Nivel de compromiso
    }

    const icons = iconMaps[stepNumber] || [Heart]
    const Icon = icons[index] || Heart
    return <Icon className="w-6 h-6" />
  }

  // Obtener contenido personalizado basado en el género
  const getPersonalizedQuestion = () => {
    return getPersonalizedContent(currentStep.question, userGender)
  }

  const getPersonalizedOptions = () => {
    const options = getPersonalizedContent(currentStep.options, userGender)
    return Array.isArray(options) ? options : currentStep.options
  }

  if (!currentStep) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Cargando tu evaluación...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado con progreso - CORES ADAPTADAS */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-white hover:bg-white/20 border border-white/20"
              disabled={currentStep?.autoAdvance}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>

            <div className="flex items-center gap-4">
              {totalValue > 0 && <ValueCounter value={totalValue} />}
              {currentStep?.elements?.timer && (
                <div className="flex items-center gap-2 text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span>{currentStep.elements.timer}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/20 rounded-full p-1 mb-2">
            <Progress value={progress} className="h-3" />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-white text-sm">
              Etapa {step} de 12 • {Math.round(progress)}% completado
            </p>
            {currentStep?.elements?.profileComplete && (
              <p className="text-purple-400 text-sm font-semibold">
                Análisis de perfil: {currentStep.elements.profileComplete} completo
              </p>
            )}
          </div>
        </div>

        {/* 🔥 DEPOIMENTOS ADAPTADOS PARA MÉTODO RENACER */}
        {currentStep?.elements?.testimonialDisplay && currentStep?.elements?.testimonialText && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <Card className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 border border-purple-500/40 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col space-y-3">
                  {/* Header com avatar e estrelas */}
                  <div className="flex items-center space-x-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {currentStep.elements.testimonialImage ? (
                        <motion.img
                          src={currentStep.elements.testimonialImage}
                          alt={currentStep.elements.testimonialName || "Cliente"}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-purple-500 shadow-md"
                          animate={{
                            y: [0, -2, 0],
                            scale: [1, 1.01, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Nome e estrelas */}
                    <div className="flex-1 min-w-0">
                      {currentStep.elements.testimonialName && (
                        <p className="text-purple-400 font-bold text-sm sm:text-base truncate">
                          {currentStep.elements.testimonialName}
                        </p>
                      )}
                      
                      {/* Estrelas compactas */}
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 + 0.3 }}
                          >
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Texto do depoimento */}
                  <motion.div 
                    className="bg-gray-700/30 rounded-lg p-3 sm:p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-white text-sm sm:text-base leading-relaxed italic">
                      "{currentStep.elements.testimonialText}"
                    </p>
                  </motion.div>

                  {/* Badge de verificação compacto */}
                  <motion.div 
                    className="flex items-center justify-center gap-1 text-green-400 text-xs font-semibold bg-green-900/20 rounded-full py-1 px-3 self-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <CheckCircle className="w-3 h-3" />
                    <span>TRANSFORMACIÓN VERIFICADA</span>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Tarjeta de Pregunta - CORES ADAPTADAS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg border-purple-500/30 shadow-2xl border-2">
            <CardContent className="p-6 sm:p-8">
              {/* Paso de avance automático de experto - ADAPTADO PARA DRA. SOFIA */}
              {currentStep?.autoAdvance && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  {currentStep?.elements?.expertImage ? (
                    <motion.img
                      src={currentStep.elements.expertImage}
                      alt="Dra. Sofia Mendez - Especialista en Transformación Femenina"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-purple-600 mx-auto mb-6"
                      animate={{
                        y: [0, -8, 0],
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-600 to-pink-700 rounded-full flex items-center justify-center mx-auto mb-6">
                      <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                  )}

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6"
                  >
                    <p className="text-purple-400 font-semibold text-base sm:text-lg mb-4">{currentStep.elements?.autoMessage}</p>
                  </motion.div>

                  <div className="flex justify-center">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-3 h-3 bg-purple-500 rounded-full"
                          animate={{
                            opacity: [0.3, 1, 0.3],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Final reveal para step 12 - ADAPTADO */}
              {currentStep?.elements?.finalReveal && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 1, delay: 0.3 }}
                    className="mb-6"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                      <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="mb-6"
                  >
                    <div className="bg-purple-900/50 border border-purple-500 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                        <span className="text-xl sm:text-2xl font-bold text-purple-400">
                          {currentStep.elements.profileComplete}
                        </span>
                      </div>
                      <p className="text-purple-300 font-medium text-sm sm:text-base">Evaluación Completa</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="bg-pink-900/50 border border-pink-500 rounded-lg p-4 mb-6"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
                      <span className="text-pink-300 font-semibold text-sm sm:text-base">Plan de Transformación Generado</span>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Foto de experto para el paso 11 - ADAPTADO */}
              {currentStep?.elements?.expertPhoto && !currentStep?.autoAdvance && (
                <div className="flex justify-center mb-6">
                  {currentStep?.elements?.expertImage ? (
                    <motion.img
                      src={currentStep.elements.expertImage}
                      alt="Dra. Sofia Mendez"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-purple-600"
                      animate={{
                        y: [0, -6, 0],
                        rotate: [0, 2, -2, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-pink-700 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                  )}
                </div>
              )}

              {/* Cálculo de compatibilidad para el paso 11 - ADAPTADO */}
              {currentStep?.elements?.compatibilityCalc && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="mb-6"
                >
                  <div className="bg-purple-900/50 border border-purple-500 rounded-lg p-4 text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-400">
                      {currentStep.elements.compatibilityCalc} de potencial de transformación
                    </div>
                  </div>
                </motion.div>
              )}

              {!currentStep?.autoAdvance && (
                <>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 text-center leading-tight">
                    {getPersonalizedQuestion()}
                  </h2>

                  {currentStep.subtext && (
                    <p className="text-purple-200 text-center mb-6 text-base sm:text-lg font-medium">{currentStep.subtext}</p>
                  )}

                  {currentStep.description && (
                    <p className="text-gray-300 text-center mb-8 text-sm sm:text-base">{currentStep.description}</p>
                  )}

                  {/* Termómetro para nivel de compromiso - CORES ADAPTADAS */}
                  {currentStep?.elements?.thermometer && (
                    <div className="mb-8">
                      <div className="flex justify-between text-gray-300 text-xs sm:text-sm mb-2 font-medium">
                        <span>No estoy segura</span>
                        <span>Totalmente comprometida</span>
                      </div>
                      <div className="bg-gray-700 rounded-full h-3 sm:h-4 mb-4">
                        <motion.div
                          className="bg-gradient-to-r from-purple-500 to-pink-600 h-full rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: selectedAnswer ? "100%" : "0%" }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  )}

                  {getPersonalizedOptions().length > 0 && (
                    <div className="space-y-3 sm:space-y-4">
                      {getPersonalizedOptions().map((option, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          className="relative"
                        >
                          <button
                            onClick={() => handleAnswerSelect(option)}
                            data-option={option}
                            className={`w-full p-4 sm:p-6 text-left justify-start text-wrap h-auto rounded-lg border-2 transition-all duration-300 transform hover:scale-102 ${
                              selectedAnswer === option
                                ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white border-purple-500 shadow-lg scale-105"
                                : "bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-500 shadow-sm"
                            }`}
                          >
                            <div className="flex items-center w-full">
                              {/* Iconos para diferentes pasos */}
                              <div className={`mr-3 sm:mr-4 ${selectedAnswer === option ? "text-white" : "text-purple-400"}`}>
                                {getStepIcon(step, index)}
                              </div>

                              <div
                                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 mr-3 sm:mr-4 flex items-center justify-center transition-all ${
                                  selectedAnswer === option ? "border-white bg-white" : "border-gray-400 bg-gray-700"
                                }`}
                              >
                                {selectedAnswer === option && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-600" />}
                              </div>
                              <span className="flex-1 font-medium text-sm sm:text-base leading-relaxed">{option}</span>
                            </div>
                          </button>

                          {/* Efecto de pulso para botones - CORES ADAPTADAS */}
                          {!selectedAnswer && (
                            <motion.div
                              className="absolute inset-0 rounded-lg border-2 border-purple-400/50 pointer-events-none"
                              animate={{
                                opacity: [0, 0.3, 0],
                                scale: [1, 1.02, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: index * 0.5,
                              }}
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {currentStep.note && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-6 text-center text-purple-300 bg-purple-900/30 p-4 rounded-lg border border-purple-600"
                    >
                      <p className="font-medium text-sm sm:text-base">{currentStep.note}</p>
                    </motion.div>
                  )}

                  {currentStep.warning && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-6 text-center text-red-300 bg-red-900/30 p-4 rounded-lg border border-red-600 flex items-center justify-center gap-2"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <p className="font-medium text-sm sm:text-base">{currentStep.warning}</p>
                    </motion.div>
                  )}

                  {selectedAnswer && getPersonalizedOptions().length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 text-center"
                    >
                      <Button
                        onClick={handleNext}
                        size="lg"
                        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-lg w-full sm:w-auto text-sm sm:text-base"
                      >
                        {step === 12 ? "Ver Mi Transformación" : "Siguiente Pregunta"}
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                      </Button>
                    </motion.div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Prueba Social - ADAPTADA PARA MULHERES */}
        {step > 2 && !currentStep?.autoAdvance && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center space-y-2 mt-6"
          >
            {currentStep?.elements?.counter && (
              <p className="text-white text-xs sm:text-sm bg-white/10 px-3 py-1 rounded-full inline-block">
                👥 {peopleCount} {currentStep.elements.counter}
              </p>
            )}

            {currentStep?.elements?.helpedCounter && (
              <p className="text-purple-400 text-xs sm:text-sm font-semibold bg-purple-900/20 px-3 py-1 rounded-full inline-block">
                ✨ {currentStep.elements.helpedCounter}
              </p>
            )}

            {step > 5 && (
              <p className="text-pink-300 text-xs sm:text-sm bg-pink-900/20 px-3 py-1 rounded-full inline-block">
                {socialProofMessages[Math.min(step - 6, socialProofMessages.length - 1)]}
              </p>
            )}
          </motion.div>
        )}
      </div>

      {/* Modal de Análisis de Carga - TEXTO ADAPTADO */}
      <AnimatePresence>
        {showAnalysis && (
          <LoadingAnalysis
            message={
              currentStep?.elements?.analysisText ||
              currentStep?.elements?.profileAnalysis ||
              "Analizando tu perfil de transformación..."
            }
            successMessage={currentStep?.elements?.successRate}
          />
        )}
      </AnimatePresence>

      {/* Modal de Desbloqueo de Bonificación */}
      <AnimatePresence>
        {showBonusUnlock && newBonus && <BonusUnlock bonus={newBonus} onComplete={handleBonusUnlockComplete} />}
      </AnimatePresence>
    </div>
  )
}
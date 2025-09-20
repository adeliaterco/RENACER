export const quizSteps = [
  {
    id: 1,
    question: "¡NO DEJES QUE EL DOLOR DE LA RUPTURA DEFINA TU FUTURO AMOROSO!",
    description: "Haz la evaluación rápida de 2 minutos y descubre cómo aplicar el MÉTODO RENACER en tu caso específico.",
    subtext: "Selecciona tu género:",
    options: ["MASCULINO", "FEMENINO"],
    warning: "⚠️ ATENCIÓN: ¡Este método comprobado solo debe usarse si estás 100% comprometida en transformar tu vida amorosa!",
    elements: {
      heartbeat: true,
      timer: "Evaluación de 2 minutos",
    },
  },
  {
    id: 2,
    question: "¿CUÁL ES TU EDAD?",
    description: "(Esta información es crucial para personalizar tu proceso de transformación emocional)",
    options: [
      "18-29 - Fase de autodescubrimiento amoroso",
      "29-39 - Período de madurez emocional",
      "39-49 - Momento de renovación personal",
      "50+ - Fase de sabiduría y plenitud",
    ],
    elements: {
      ageIcons: true,
      counter: "mujeres que ya transformaron su vida hoy",
    },
  },
  {
    id: 3,
    question: "¿CUÁNTO TIEMPO LLEVAS SOLTERA DESPUÉS DE LA RUPTURA?",
    description: "(El tiempo es clave para determinar tu estrategia de sanación y renovación)",
    options: {
      masculino: ["Menos de una semana", "Hace 1 mes", "De 2 a 6 meses", "Más de 6 meses"],
      feminino: ["Menos de una semana", "Hace 1 mes", "De 2 a 6 meses", "Más de 6 meses"],
    },
    bonusUnlock: {
      id: 1,
      title: "GUÍA DE AUTOESTIMA MAGNÉTICA",
      value: 47,
      description: "21 ejercicios diarios para reconstruir tu amor propio desde cero.",
    },
  },
  {
    id: 4,
    question: {
      masculino: "¿CÓMO TERMINÓ TU ÚLTIMA RELACIÓN?",
      feminino: "¿CÓMO TERMINÓ TU ÚLTIMA RELACIÓN?",
    },
    description: "(Esta información es vital para determinar tu punto de partida emocional)",
    options: {
      masculino: ["Ella terminó conmigo", "Yo terminé con ella", "Decidimos terminar de mutuo acuerdo"],
      feminino: ["Él terminó conmigo", "Yo terminé con él", "Decidimos terminar de mutuo acuerdo"],
    },
    elements: {
      analysisText: "Analizando tu perfil emocional...",
      successRate: "¡Tu perfil muestra gran potencial de transformación!",
      testimonialDisplay: true,
      testimonialName: "Ana L.",
      testimonialText: "¡En 3 semanas ya me sentía como una nueva mujer y atraje a mi alma gemela!",
      testimonialImage: "https://plansistema.shop/wp-content/uploads/2025/09/01.webp",
    },
  },
  {
    id: 5,
    question: "¿CUÁNTO TIEMPO DURÓ TU ÚLTIMA RELACIÓN?",
    description: "(La intensidad del vínculo anterior influye en tu proceso de renovación)",
    options: ["Más de 3 años", "De 1 a 3 años", "De 6 meses a 1 año", "Menos de 6 meses"],
  },
  {
    id: 6,
    question: "¿CUÁL HA SIDO TU MAYOR DESAFÍO DESPUÉS DE LA RUPTURA?",
    description: "(Identificar tu patrón principal es esencial para tu transformación)",
    options: {
      masculino: [
        "😔 Sentirme perdido y sin rumbo",
        "😢 Lidiar con emociones intensas (ira, tristeza, vacío)",
        "😐 No poder dejar de pensar en el pasado",
        "💔 Miedo a volver a enamorarme",
        "🤔 Baja autoestima y confianza",
        "⚡ Otro",
      ],
      feminino: [
        "😔 Sentirme perdida y sin rumbo",
        "😢 Lidiar con emociones intensas (ira, tristeza, vacío)",
        "😐 No poder dejar de pensar en el pasado",
        "💔 Miedo a volver a enamorarme",
        "🤔 Baja autoestima y confianza",
        "⚡ Otro",
      ],
    },
    elements: {
      profileAnalysis: "Creando tu estrategia personalizada...",
      profileComplete: "46%",
    },
  },
  {
    id: 7,
    question: {
      masculino: "¿CÓMO TE SIENTES RESPECTO AL AMOR EN ESTE MOMENTO?",
      feminino: "¿CÓMO TE SIENTES RESPECTO AL AMOR EN ESTE MOMENTO?",
    },
    description: "(Tu mentalidad actual determinará tu enfoque de transformación)",
    options: {
      masculino: [
        "🧐 Estoy enfocado en sanar y crecer",
        "😢 Siento que nunca volveré a amar",
        "❌ Tengo miedo de volver a sufrir",
        "🤝 Estoy abierto pero con reservas",
        "🤔 Quiero amar pero no sé cómo",
        "😌 Estoy listo para una nueva oportunidad",
        "🔥 Deseo una relación plena y consciente",
      ],
      feminino: [
        "🧐 Estoy enfocada en sanar y crecer",
        "😢 Siento que nunca volveré a amar",
        "❌ Tengo miedo de volver a sufrir",
        "🤝 Estoy abierta pero con reservas",
        "🤔 Quiero amar pero no sé cómo",
        "😌 Estoy lista para una nueva oportunidad",
        "🔥 Deseo una relación plena y consciente",
      ],
    },
    elements: {
      profileComplete: "62%",
      testimonialImage: "",
    },
  },
  {
    id: 8,
    question: {
      masculino: "¿QUÉ TIPO DE RELACIÓN BUSCAS EN EL FUTURO?",
      feminino: "¿QUÉ TIPO DE RELACIÓN BUSCAS EN EL FUTURO?",
    },
    description: "(Tu visión del amor ideal guiará tu proceso de transformación)",
    options: {
      masculino: [
        "🚫 Aún no estoy seguro de querer una relación",
        "🤔 Algo casual sin compromisos",
        "😔 Una relación seria y estable",
        "💔 Un amor verdadero y profundo",
        "🔄 Una conexión espiritual y consciente",
      ],
      feminino: [
        "🚫 Aún no estoy segura de querer una relación",
        "🤔 Algo casual sin compromisos",
        "😔 Una relación seria y estable",
        "💔 Un amor verdadero y profundo",
        "🔄 Una conexión espiritual y consciente",
      ],
    },
    bonusUnlock: {
      id: 2,
      title: "PLAN DE RECONSTRUCCIÓN EMOCIONAL 30 DÍAS",
      value: 37,
      description: "Protocolo paso a paso para sanar heridas y prepararte para el amor consciente.",
    },
    elements: {
      profileComplete: "77%",
      testimonialDisplay: true,
      testimonialName: "Carmen R.",
      testimonialText: "Después de años de relaciones tóxicas, el Método RENACER me enseñó a amarme y atraer a mi pareja ideal. ¡Cambió mi vida!",
      testimonialImage: "https://nutricaoalimentos.shop/wp-content/uploads/2025/09/lg-9xvta-canva-couple-in-love-mafv-z4mya0.jpg",
    },
  },
  {
    id: 9,
    question: {
      masculino: "¿QUÉ TAN COMPROMETIDO ESTÁS CON TRANSFORMAR TU VIDA AMOROSA?",
      feminino: "¿QUÉ TAN COMPROMETIDA ESTÁS CON TRANSFORMAR TU VIDA AMOROSA?",
    },
    description: "(Tu nivel de compromiso determinará tu éxito)",
    subtext: "El 94% de las personas que seleccionaron nivel 4 transformaron completamente su vida amorosa en menos de 21 días usando el MÉTODO RENACER.",
    options: ["1 - No estoy segura", "2 - Me lo estoy pensando", "3 - Bastante comprometida", "4 - Totalmente comprometida"],
    note: "Solo trabajo con personas decididas a transformar su realidad amorosa. El MÉTODO RENACER fue desarrollado para quien está preparada para evolucionar.",
    elements: {
      thermometer: true,
      profileComplete: "85%",
    },
  },
  {
    id: 10,
    question: "DRA. SOFIA MENDEZ ANALIZANDO TU PERFIL...",
    description: "Espera mientras analizo tus respuestas para crear tu estrategia de transformación personalizada.",
    options: [],
    autoAdvance: true,
    elements: {
      expertPhoto: true,
      expertImage: "https://nutricaoalimentos.shop/wp-content/uploads/2025/09/0a259523-4766-4d8e-8a83-928755309fae-e1758319116344.webp",
      autoMessage: "Basándome en 8 años de experiencia ayudando a mujeres como tú...",
      profileComplete: "90%",
    },
  },
  {
    id: 11,
    question: "¡FELICITACIONES! He analizado tu perfil y tengo excelentes noticias para ti.",
    description: "Basándome en tus respuestas y situación específica, el MÉTODO RENACER tiene un 92,3% de probabilidades de transformar completamente tu vida amorosa.",
    options: ["¿VAMOS AL SIGUIENTE PASO?"],
    note: "Estoy aquí para guiarte personalmente en este viaje de transformación. En los últimos 8 años, he ayudado a más de 4.200 mujeres a sanar, crecer y atraer el amor consciente usando este método exclusivo.",
    elements: {
      expertPhoto: true,
      expertImage: "https://nutricaoalimentos.shop/wp-content/uploads/2025/09/0a259523-4766-4d8e-8a83-928755309fae-e1758319116344.webp",
      profileComplete: "95%",
      helpedCounter: "Mujeres transformadas hoy: 23",
      compatibilityCalc: "92,3%",
    },
  },
  {
    id: 12,
    question: "¡TU PLAN DE TRANSFORMACIÓN PERSONALIZADO ESTÁ LISTO!",
    description: "Basado en tus respuestas, he creado la estrategia exacta para que transformes tu vida amorosa y atraigas el amor que mereces.",
    options: ["¡QUIERO VER MI PLAN AHORA!"],
    note: "Prepárate para descubrir los pasos que te llevarán a una nueva versión de ti misma.",
    elements: {
      finalReveal: true,
      profileComplete: "100%",
    },
  }
]

export const bonuses = [
  {
    id: 1,
    title: "GUÍA DE AUTOESTIMA MAGNÉTICA",
    value: 47,
    description: "21 ejercicios diarios para reconstruir tu amor propio desde cero.",
    details: ["✓ 7 Rituales de Autoamor", "✓ 7 Afirmaciones Poderosas", "✓ 7 Ejercicios de Confianza"],
  },
  {
    id: 2,
    title: "PLAN DE RECONSTRUCCIÓN EMOCIONAL 30 DÍAS",
    value: 37,
    description: "Protocolo paso a paso para sanar heridas y prepararte para el amor consciente.",
    details: ["✓ Sanación de Heridas del Pasado", "✓ Construcción de Límites Sanos", "✓ Preparación para Nuevo Amor"],
  },
]

export const testimonials = [
  {
    name: "Ana L., 29 años",
    text: "¡En 3 semanas ya me sentía como una nueva mujer y atraje a mi alma gemela!",
    rating: 5,
  },
  {
    name: "Carmen R., 35 años",
    text: "Después de años de relaciones tóxicas, el Método RENACER me enseñó a amarme y atraer a mi pareja ideal. ¡Cambió mi vida!",
    rating: 5,
  },
  {
    name: "Lucía M., 31 años",
    text: "En solo 21 días pasé de estar destrozada a sentirme empoderada. Ahora tengo una relación increíble basada en el respeto mutuo.",
    rating: 5,
  },
  {
    name: "Isabella S., 28 años",
    text: "Pensé que nunca volvería a confiar en el amor. El Método RENACER me devolvió la esperanza y ahora vivo el amor que siempre soñé.",
    rating: 5,
  },
]

export const socialProofMessages = [
  "¡Estás entre el 23% más comprometida con tu transformación!",
  "¡Tu perfil muestra alto potencial de éxito!",
  "¡Bonificación liberada por tu compromiso!",
  "¡Has desbloqueado los 2 bonos - valor total de $84!",
  "El 92% de las mujeres en tu situación lograron resultados en menos de 21 días",
  "Estás más comprometida que el 78% de las mujeres que hicieron esta evaluación",
  "Tu perfil emocional muestra gran capacidad de transformación",
  "Mujeres como tú han transformado completamente su vida amorosa",
  "Tu nivel de autoconciencia es superior al promedio",
  "Estás lista para el siguiente nivel de evolución amorosa",
]

// Función utilitaria para personalizar textos basados en el género
export function getPersonalizedContent(content, gender) {
  if (typeof content === "string") {
    return content
  }

  if (typeof content === "object" && content !== null) {
    if (content.masculino && content.feminino) {
      return gender === "MASCULINO" ? content.masculino : content.feminino
    }
    return content
  }

  return content
}
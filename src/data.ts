/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudyOption, VisaDocument, TransportCard, RentalPlatform, JobPlatform, CityGuide, LessonTopic, AppLanguage, TutorListing } from './types';

export const LANGUAGES: { code: AppLanguage; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', flag: '🇪🇬' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' }
];

export const TRANSLATIONS: Record<string, Record<AppLanguage, string>> = {
  appName: {
    en: 'Spain Study Portal',
    ar: 'بوابة الدراسة في إسبانيا',
    fr: 'Portail d\'Étude en Espagne',
    es: 'Portal de Estudios España'
  },
  appSubtitle: {
    en: 'Empowering Arab students with step-by-step visa assistance, regional directories, and gamified Spanish mastering from A1 to C2.',
    ar: 'تمكين الطلاب العرب من خلال المساعدة خطوة بخطوة في الحصول على التأشيرات، والأدلة الإقليمية، وإتقان اللغة الإسبانية من A1 إلى C2.',
    fr: 'Accompagnement des étudiants arabes avec visa étape par étape, annuaires régionaux et maîtrise de l\'espagnol de A1 à C2.',
    es: 'Ayudando a estudiantes árabes con visas, directorios regionales y dominio del español de A1 a C2 de forma gamificada.'
  },
  setupProfile: {
    en: 'Setup Your Student Profile',
    ar: 'إعداد ملف الطالب الخاص بك',
    fr: 'Configurez Votre Profil d\'Étudiant',
    es: 'Configura tu Perfil de Estudiante'
  },
  username: {
    en: 'Username',
    ar: 'اسم المستخدم',
    fr: 'Nom d\'utilisateur',
    es: 'Usuario'
  },
  nationality: {
    en: 'Nationality',
    ar: 'الجنسية',
    fr: 'Nationalité',
    es: 'Nacionalidad'
  },
  age: {
    en: 'Age',
    ar: 'العمر',
    fr: 'Âge',
    es: 'Edad'
  },
  saveAndUnlock: {
    en: 'Save & Enter Portal',
    ar: 'حفظ ودخول البوابة',
    fr: 'Enregistrer & Entrer',
    es: 'Guardar e Ingresar'
  },
  premiumRequired: {
    en: 'Premium Student Membership Required',
    ar: 'مطلوب عضوية الطالب المميزة',
    fr: 'Abonnement Étudiant Premium requis',
    es: 'Se requiere Membresía de Estudiante Premium'
  },
  premiumDesc: {
    en: 'Access to the full 300-page interactive e-book (A1-C2), visa roadmap, CV generator, AI peer-to-peer chat monitoring & regional directories. Just €30/month.',
    ar: 'الولوج إلى الكتاب الإلكتروني الكامل المكون من 300 صفحة (A1-C2)، وخارطة طريق التأشيرة، ومنشئ السيرة الذاتية، ومراقبة الدردشة بالذكاء الاصطناعي، والأدلة الإقليمية. 30 يورو شهريًا فقط.',
    fr: 'Accès au livre électronique interactif complet de 300 pages (A1-C2), feuille de route visa, générateur de CV, salon de chat géré par IA et répertoires. Seulement 30 €/mois.',
    es: 'Acceso al libro electrónico interactivo de 300 páginas (A1-C2), hoja de ruta del visado, generador de CV, chat monitorizado por IA y directorios. Solo 30 €/mes.'
  },
  unlockNow: {
    en: 'Unlock Premium for €30 / Month',
    ar: 'اشترك في بريميوم مقابل 30 يورو / شهرياً',
    fr: 'Devenir Membre Premium pour 30 € / Mois',
    es: 'Desbloquear Premium por 30 € / Mes'
  },
  lessons: {
    en: 'Gamified Textbook',
    ar: 'كتاب دراسي تفاعلي',
    fr: 'Livre interactif',
    es: 'Libro Interactivo'
  },
  visaPathway: {
    en: 'Visa & Residency',
    ar: 'التأشيرة والإقامة',
    fr: 'Visa & Résidence',
    es: 'Visado y Residencia'
  },
  studyOptions: {
    en: 'Study System',
    ar: 'النظام الدراسي في إسبانيا',
    fr: 'Système d\'études',
    es: 'Estudios en España'
  },
  survivalGuide: {
    en: 'Survival Guide',
    ar: 'دليل النجاة والمعيشة',
    fr: 'Guide de Survie',
    es: 'Guía de Supervivencia'
  },
  peerChat: {
    en: 'Peer Chat & Exchanges',
    ar: 'غرفة الدردشة والدروس',
    fr: 'Espace de Chat & Tutorat',
    es: 'Chat Estudiantil e Intercambio'
  },
  cvGenerator: {
    en: 'Spanish CV Maker',
    ar: 'منشئ السيرة الذاتية الإسبانية',
    fr: 'Créateur de CV Espagnol',
    es: 'Generador de CV en Español'
  },
  currentStreak: {
    en: 'Current Streak',
    ar: 'النشاط اليومي المستمر',
    fr: 'Série actuelle',
    es: 'Racha Actual'
  },
  totalXP: {
    en: 'Total XP',
    ar: 'مجموع النقاط (XP)',
    fr: 'XP total',
    es: 'Puntos XP'
  },
  currentLevel: {
    en: 'Current Level',
    ar: 'المستوى الحالي',
    fr: 'Niveau actuel',
    es: 'Nivel Actual'
  },
  empadronamientoTitle: {
    en: 'Padrón (Town Hall Registration)',
    ar: 'البلدية (Empadronamiento)',
    fr: 'Le Padron (Inscription Mairie)',
    es: 'Empadronamiento Municipal'
  },
  empadronamientoSteps: {
    en: 'Empadronamiento is the official registration of where you live. You need: 1. Your valid passport & visa, 2. A signed rental contract, 3. The official form from the local Ayuntamiento. Book an appointment (\'Cita Previa\') on the city town hall website as soon as you find persistent housing.',
    ar: 'التسجيل في البلدية (Empadronamiento) هو إثبات السكن الرسمي العقد. تحتاج إلى: 1. جواز سفرك وتأشيرتك الصالحة، 2. عقد إيجار موقع، 3. استمارة التسجيل الرسمية من بلدية الحي (Ayuntamiento). احجز موعدًا مكتوبًا (Cita Previa) عبر موقع البلدية فور العثور على سكن.',
    fr: 'L\'Empadronamiento est l\'enregistrement officiel de votre domicile. Requis : 1. Passeport & visa valides, 2. Contrat de bail signé, 3. Formulaire officiel d\'inscription de la mairie. Prenez rendez-vous (\'Cita Previa\') dès que possible.',
    es: 'El empadronamiento es el registro oficial de su dirección de residencia. Documentos necesarios: 1. Pasaporte y visados en vigor, 2. Contrato de arrendamiento firmado, 3. Impreso municipal de solicitud. Reserve su cita previa inmediatamente.'
  },
  textbookTitle: {
    en: 'Spain Study Portal Spanish textbook',
    ar: 'كتاب اللغة الإسبانية لبوابة الدراسة في إسبانيا',
    fr: 'Manuel d\'espagnol du Portail d\'Étude',
    es: 'Libro de Texto de Español - Portal de Estudios'
  },
  textbookSubtitle: {
    en: 'Complete curriculum spanning 300 pages of interactive exercises & grammar details (From A1 to C2)',
    ar: 'منهج متكامل يمتد لـ 300 صفحة من التدريبات التفاعلية والتفاصيل القواعدية (من A1 إلى C2)',
    fr: 'Programme complet de 300 pages d\'exercices interactifs et détails grammaticaux (de A1 à C2)',
    es: 'Plan de estudios de 300 páginas con ejercicios interactivos y gramática (Niveles A1 a C2)'
  },
  milestoneTest: {
    en: 'Milestone Test',
    ar: 'اختبار ترقية المستوى',
    fr: 'Test d\'étape',
    es: 'Examen de Nivel'
  },
  examInstructions: {
    en: 'Answer at least 10 out of 15 questions correctly to certify capabilities and unlock the next Spanish level.',
    ar: 'أجب بشكل صحيح على 10 أسئلة على الأقل من أصل 15 لتوثيق قدراتك وفتح مستوى الإسبانية التالي.',
    fr: 'Répondez correctement à au moins 10 questions sur 15 pour certifier vos compétences et débloquer le niveau supérieur.',
    es: 'Responda correctamente al menos 10 de las 15 preguntas para certificar sus capacidades y desbloquear el siguiente nivel.'
  },
  exitTest: {
    en: 'Exit Test',
    ar: 'خروج من الاختبار',
    fr: 'Quitter le test',
    es: 'Salir del examen'
  },
  generatingExam: {
    en: 'Generating certified examination syllabus from Gemini...',
    ar: 'جاري إنتاج محتوى الاختبار المعتمد من Gemini...',
    fr: 'Génération du programme d\'examen certifié depuis Gemini...',
    es: 'Generando temario oficial del examen desde Gemini...'
  },
  submitExam: {
    en: 'Submit Exam & Evaluate Advancement',
    ar: 'تسليم الاختبار وتقييم الترقية',
    fr: 'Valider l\'Examen & Évaluer la progression',
    es: 'Enviar Examen y Evaluar Progreso'
  },
  backToChapters: {
    en: 'Back to Chapters',
    ar: 'العودة إلى الفصول',
    fr: 'Retour aux chapitres',
    es: 'Volver a los Capítulos'
  },
  prevPage: {
    en: 'Previous Page',
    ar: 'الصفحة السابقة',
    fr: 'Page précédente',
    es: 'Página Anterior'
  },
  ebookPage: {
    en: 'E-Book PAGE',
    ar: 'صفحة الكتاب',
    fr: 'Livre PAGE',
    es: 'PÁGINA del Libro'
  },
  of: {
    en: 'of',
    ar: 'من',
    fr: 'sur',
    es: 'de'
  },
  nextPage: {
    en: 'Next Page',
    ar: 'الصفحة التالية',
    fr: 'Page suivante',
    es: 'Página Siguiente'
  },
  generatingPage: {
    en: 'Generating page explanations from the 300,000 words syllabus...',
    ar: 'جاري إنتاج شرح الصفحة من منهج الـ 300,000 كلمة...',
    fr: 'Génération des explications depuis le programme de 300 000 mots...',
    es: 'Generando explicaciones detalladas del temario de 300.000 palabras...'
  },
  lessonGlossary: {
    en: 'Lesson Glossary & Translations',
    ar: 'المفردات اللغوية والترجمات',
    fr: 'Glossaire & Traductions de la leçon',
    es: 'Glosario de la Lección y Traducciones'
  },
  alphabetBoard: {
    en: '🔤 Interactive SIELE Spanish Alphabet Board',
    ar: '🔤 لوحة الأبجدية الإسبانية التفاعلية (SIELE)',
    fr: '🔤 Tableau interactif de l\'Alphabet Espagnol SIELE',
    es: '🔤 Tabla del Alfabeto Español Interactivo SIELE'
  },
  alphabetBoardDesc: {
    en: 'Click on any letter below to hear its native pronunciation (via Web Text-to-Speech), view its phonetic model, and see equivalent translations & contexts in your preferred language!',
    ar: 'انقر على أي حرف أدناه لسماع نطقه الأصلي (عبر ميزة تحويل النص إلى كلام)، وعرض نموذجه الصوتي، ورؤية التراجم والسياقات المقابلة بلغتك المفضلة!',
    fr: 'Cliquez sur n\'importe quelle lettre ci-dessous pour écouter sa prononciation native (via Synthèse vocale), voir son modèle phonétique et ses traductions !',
    es: '¡Haz clic en cualquier letra para escuchar su pronunciación nativa (vía Text-to-Speech), ver su modelo fonético y traducciones equivalentes!'
  },
  interactiveHomework: {
    en: 'Interactive Homework & Exercises',
    ar: 'الواجبات المنزلية والتدريبات التفاعلية',
    fr: 'Devoirs & Exercices interactifs',
    es: 'Deberes y Ejercicios Interactivos'
  },
  evaluatingRequirements: {
    en: 'Evaluating local requirements...',
    ar: 'جاري تقييم المتمتطلبات المحلية...',
    fr: 'Évaluation des exigences de la page...',
    es: 'Evaluando requerimientos locales...'
  },
  checkAnswer: {
    en: 'Check Answer',
    ar: 'التحقق من الإجابة',
    fr: 'Vérifier la réponse',
    es: 'Verificar Respuesta'
  },
  writeMissingWord: {
    en: 'Write missing Spanish word...',
    ar: 'اكتب الكلمة الإسبانية المفقودة...',
    fr: 'Écrire le mot espagnol manquant...',
    es: 'Escribe la palabra que falta...'
  },
  verifyAnswer: {
    en: 'Verify Answer',
    ar: 'التحقق من الإجابة الصحيحة',
    fr: 'Valider la réponse',
    es: 'Comprobar Respuesta'
  },
  translateToSpanish: {
    en: 'Translate sentence to Spanish...',
    ar: 'ترجم الجملة إلى الإسبانية...',
    fr: 'Traduire la phrase en espagnol...',
    es: 'Traducir la frase al español...'
  },
  submitTranslation: {
    en: 'Submit Translation',
    ar: 'إرسال الترجمة للدراسة',
    fr: 'Soumettre la traduction',
    es: 'Enviar Traducción'
  },
  checkConjugation: {
    en: 'Check Conjugation',
    ar: 'تأكيد تصريف الفعل',
    fr: 'Vérifier la conjugaison',
    es: 'Verificar Conjugación'
  },
  gradeWithAi: {
    en: 'Grade with AI',
    ar: 'تقييم كشط بالذكاء الاصطناعي',
    fr: 'Évaluer par l\'IA',
    es: 'Evaluar con IA'
  },
  visaTitle: {
    en: 'National student visa (Visado de Estudiante) step-by-step',
    ar: 'تأشيرة الطالب الوطنية (Visado de Estudiante) خطوة بخطوة',
    fr: 'Visa national d\'étudiant (Visado de Estudiante) étape par étape',
    es: 'Visado nacional de estudiante paso a paso'
  },
  visaAlertHeader: {
    en: 'CRITICAL REQUIREMENT: STAYS EXCEEDING 180 DAYS',
    ar: 'متطلب حرج وهام: الإقامات التي تتجاوز 180 يوماً',
    fr: 'EXIGENCE CRITIQUE : SÉJOURS DE PLUS DE 180 JOURS',
    es: 'REQUISITO CRÍTICO: ESTANCIAS SUPERIORES A 180 DÍAS'
  },
  visaAlertDesc: {
    en: 'If your academic program in Spain is 1 full study degree (typically 4 years for Grados or 2 years for Grados Superiores), you must apply for physical card (TIE - Tarjeta de Identidad de Extranjero) within 30 days of arrival in Spain at the police headquarters.',
    ar: 'إذا كان برنامجك الأكاديمي في إسبانيا عبارة عن درجة دراسية كاملة (عادةً 4 سنوات للإجازة Grados أو سنتين للتقني العالي Grados Superiores)، فيجب عليك التقدم بطلب للحصول على بطاقة الإقامة الفعلية (TIE - Tarjeta de Identidad de Extranjero) في غضون 30 يومًا من وصولك لإسبانيا بمقر الشرطة.',
    fr: 'Si votre programme dure plus de 180 jours, vous devez obligatoirement demander physiquement la carte de séjour TIE (Tarjeta de Identidad de Extranjero) dans les 30 jours suivant votre arrivée auprès de la police.',
    es: 'Si su programa de estudios en España supera los 180 días de duración, debe solicitar físicamente la tarjeta TIE (Tarjeta de Identidad de Extranjero) dentro de los 30 días posteriores a su entrada en España.'
  },
  requiredDocIndex: {
    en: 'Required Student Documentation Index',
    ar: 'فهرس المستندات المطلوبة للتقديم على الفيزا',
    fr: 'Index des documents requis pour le visa',
    es: 'Índice de Documentos Estudiantiles Reclamados'
  },
  requiredSteps: {
    en: 'Required steps:',
    ar: 'الخطوات المطلوبة:',
    fr: 'Étapes requises :',
    es: 'Pasos requeridos:'
  },
  appointmentTipHeader: {
    en: '💡 SURVIVAL TIP FOR APPOINTMENTS',
    ar: '💡 نصيحة النجاة لحجز المواعيد والمعاملات',
    fr: '💡 CONSEIL DE SURVIE POUR LES RENDEZ-VOUS',
    es: '💡 CONSEJO DE SUPERVIVENCIA PARA CITAS OFICIALES'
  },
  appointmentTipDesc: {
    en: 'Always ask your landlord or principal lessor for a photocopy of their identity document (DNI/NIE) and a recent utility bill to verify address authority at the city hall offices.',
    ar: 'اطلب دائماً من مالك العقار أو المؤجر الأساسي نسخة ضوئية من وثيقة هويته (DNI/NIE) وفاتورة خدمات حديثة للتحقق من ملكية السكن في مكاتب البلدية.',
    fr: 'Demandez toujours à votre propriétaire une photocopie de sa pièce d\'identité (DNI/NIE) et une facture récente de gaz ou électricité pour confirmer votre logement à la mairie.',
    es: 'Solicite siempre a su arrendador una fotocopia de su DNI/NIE y un recibo reciente de suministros para justificar la veracidad de la vivienda ante el Ayuntamiento.'
  },
  studyTitle: {
    en: 'Educational systems of Spain',
    ar: 'النظام التعليمي والدراسي في إسبانيا',
    fr: 'Systèmes éducatifs en Espagne',
    es: 'Estructura Educativa de España'
  },
  studySubtitle: {
    en: 'Discover degrees, requirements, durations, and estimates for Arab scholars.',
    ar: 'اكتشف الدرجات العلمية والمتطلبات ومدد الدراسة والتكاليف التقديرية للطلاب العرب.',
    fr: 'Découvrez les diplômes, exigences, durées et budgets pour les étudiants.',
    es: 'Descubre titulaciones, requisitos de acceso, duraciones y presupuestos para alumnos.'
  },
  targetSpecialities: {
    en: 'Target Specialities:',
    ar: 'التخصصات المستهدفة:',
    fr: 'Spécialités cibles :',
    es: 'Especialidades Destacadas:'
  },
  accessRequirements: {
    en: 'Access Requirements:',
    ar: 'شروط القبول والولوج:',
    fr: 'Conditions d\'accès :',
    es: 'Requisitos de Acceso:'
  },
  estimatedCost: {
    en: 'Estimated Tuition Cost:',
    ar: 'رسوم الدراسة السنوية التقديرية:',
    fr: 'Coût estimé de la scolarité :',
    es: 'Costo Estimado de Matrícula:'
  },
  survivalTitle: {
    en: 'Transport and housing survival directories',
    ar: 'دليل النقل والمواصلات والسكن الطلابي',
    fr: 'Annuaires de survie de transport et logement',
    es: 'Directorio de Supervivencia: Transporte y Vivienda'
  },
  survivalSubtitle: {
    en: 'Where to get cards, available discounts, and trusted housing portals.',
    ar: 'أماكن استخراج البطاقات، الخصومات المتاحة للشباب، ومواقع البحث عن شقق سكنية موثوقة.',
    fr: 'Où se procurer les cartes de transport, réductions valides et sites d\'hébergement.',
    es: 'Dónde expedir los abonos, descuentos vigentes para estudiantes y portales inmobiliarios.'
  },
  transportCardsTitle: {
    en: ' Youth Transportation Cards (Abono de Autobús)',
    ar: ' بطاقات النقل والمواصلات المخصصة للشباب (Abono Joven)',
    fr: ' Cartes de Transport pour Jeunes (Abono de Autobús)',
    es: ' Tarjetas de Transporte Público Joven (Abono Mensual)'
  },
  howToApply: {
    en: 'How to Apply:',
    ar: 'كيفية التقديم:',
    fr: 'Comment postuler :',
    es: 'Cómo solicitarlo:'
  },
  rentalPortalsTitle: {
    en: 'Rental Housing Portals',
    ar: 'منصات ومواقع البحث عن سكن مخصصة للطلاب',
    fr: 'Portails de Logement Étudiant',
    es: 'Portales de Alquiler de Vivienda'
  },
  pros: {
    en: 'Pros:',
    ar: 'المزايا والإيجابيات:',
    fr: 'Avantages :',
    es: 'Ventajas:'
  },
  cons: {
    en: 'Cons:',
    ar: 'العيوب والتحديات:',
    fr: 'Inconvénients :',
    es: 'Desventajas:'
  },
  jobPlatformsTitle: {
    en: 'Finding Jobs & Internships',
    ar: 'البحث عن فرص عمل وتدريب مهني',
    fr: 'Recherche de Jobs & Stages',
    es: 'Búsqueda de Empleo y Prácticas'
  },
  tips: {
    en: 'Tips:',
    ar: 'نصائح مرافقة للنجاح:',
    fr: 'Conseils :',
    es: 'Consejos de Éxito:'
  },
  studentVisaWorkTitle: {
    en: '💡 WORKING ON STUDENT VISA IN SPAIN',
    ar: '💡 العمل بتأشيرة الطالب في إسبانيا',
    fr: '💡 TRAVAILLER AVEC UN VISA ÉTUDIANT',
    es: '💡 TRABAJAR CON VISADO DE ESTUDIANTE EN ESPAÑA'
  },
  studentVisaWorkDesc: {
    en: 'Under Spain\'s recent immigration reform, students are automatically allowed to work part-time up to 30 hours per week, provided it does not conflict with classes.',
    ar: 'بموجب تعديلات قانون الهجرة الإسباني الأخيرة، يُسمح لحاملي فيزا الطالب بالعمل تلقائياً بدوام جزئي حتى 30 ساعة أسبوعياً بشرط ألا يتعارض العمل مع مواعيد المحاضرات.',
    fr: 'Sous la récente réforme de l\'immigration en Espagne, les étudiants sont automatiquement autorisés à travailler à temps partiel jusqu\'à 30 heures par semaine.',
    es: 'Con la reciente reforma de la Ley de Extranjería, los estudiantes extranjeros tienen permiso de trabajo automático de hasta 30 horas semanales.'
  },
  placesToVisitTitle: {
    en: 'Best Places to visit in each city',
    ar: 'أفضل المعالم والأماكن للزيارة والدراسة في كل مدينة',
    fr: 'Meilleurs endroits à visiter par ville',
    es: 'Mejores Lugares de Interés para Visitar'
  },
  topSights: {
    en: 'Top Sights & Cost:',
    ar: 'أبرز الرموز السياحية والرسوم:',
    fr: 'Principales attractions & Coûts :',
    es: 'Lugares Destacados y Tarifas:'
  },
  guideProTip: {
    en: 'Guide Pro Tip:',
    ar: 'نصيحة الدليل الاحترافية:',
    fr: 'Astuce du guide :',
    es: 'Consejo Avanzado de la Guía:'
  },
  chatTitle: {
    en: 'Peer-to-peer student lounge & tutor exchanges',
    ar: 'ملتقى الطلاب والدروس المشتركة والتبادل المعرفي',
    fr: 'Salon d\'échange étudiant & Cours de tutorat',
    es: 'Comunidad de Intercambio Estudiantil y Tutorías'
  },
  chatSubtitle: {
    en: 'Ask fellow students questions or arrange study lessons (We get a 30% flat transaction fee)',
    ar: 'اطرح الأسئلة على رفاقك الطلاب أو رتب حصصاً دراسية خصوصية (تحتفظ البوابة بعمولة 30% فقط)',
    fr: 'Posez des questions à vos pairs ou planifiez des cours de soutien (Commission fixe de 30% de la plateforme)',
    es: 'Pregunta tus dudas a otros compañeros o concierta clases de apoyo (La plataforma retiene un 30% de comisión)'
  },
  platformMarginFee: {
    en: 'PLATFORM MARGIN FEE:',
    ar: 'رسوم عمولة المنصة:',
    fr: 'FRAIS DE COMMISSION :',
    es: 'COMISIÓN DE LA PLATAFORMA:'
  },
  spainGeneralRoom: {
    en: 'Spain General Room',
    ar: 'الغرفة العامة لإسبانيا',
    fr: 'Salon Général Espagne',
    es: 'Sala General España'
  },
  monitoredByAi: {
    en: 'Conversations monitored by Spain Study AI Tutor',
    ar: 'المحادثات تخضع للمتابعة الفورية والتصحيح من معلم الذكاء الاصطناعي الخاص بالبوابة',
    fr: 'Conversations suivies en temps réel par notre Tuteur IA',
    es: 'Conversaciones monitorizadas por el Profesor de IA de la plataforma'
  },
  tryWritingSpanish: {
    en: 'Try writing in Spanish! E.g. "yo tiene hambre" to trigger the automatic AI grammar feedback.',
    ar: 'جرب الكتابة باللغة الإسبانية! اكتب مثلاً "yo tiene hambre" لترى التصحيح التلقائي للأخطاء عبر الذكاء الاصطناعي.',
    fr: 'Essayez d\'écrire en espagnol ! Ex : "yo tiene hambre" pour voir les corrections de l\'IA.',
    es: '¡Intenta escribir en español! Ej: escribe "yo tiene hambre" para recibir corrección inmediata de la IA.'
  },
  verifiedPeersTitle: {
    en: 'Verified student peers & native tutors',
    ar: 'المنسقون المعتمدون والمعلمون الخصوصيون العرب',
    fr: 'Tuteurs et étudiants natifs certifiés',
    es: 'Tutores Nativos y Compañeros Verificados'
  },
  verifiedPeersDesc: {
    en: 'Hire each other to teach Spanish! Book structured peer calls directly below.',
    ar: 'يمكنكم توظيف بعضكم لتعليم الإسبانية! احجز حصص الاتصال الفردية للمساعدة المباشرة.',
    fr: 'Recrutez-vous pour parfaire votre espagnol ! Réservez un appel de soutien individuel.',
    es: '¡Ayudaos mutuamente con el idioma! Reserva clases personalizadas directamente.'
  },
  hourlyRate: {
    en: 'Hourly Rate:',
    ar: 'سعر الحصة في الساعة:',
    fr: 'Tarif Horaire :',
    es: 'Tarifa por Hora:'
  },
  bookStudyHour: {
    en: 'Book Study Hour',
    ar: 'حجز ساعة دراسية',
    fr: 'Réserver une Heure de cours',
    es: 'Reservar Hora de Apoyo'
  },
  cvMakerTitle: {
    en: 'Spanish standard CV maker',
    ar: 'منشئ السيرة الذاتية وفق المعايير الإسبانية',
    fr: 'Créateur de CV aux normes espagnoles',
    es: 'Creador de Curriculum Vitae Oficial Español'
  },
  cvMakerSubtitle: {
    en: 'Generate a professional, Spanish-styled Curriculum Vitae matching local guidelines.',
    ar: 'أنشئ سيرة ذاتية مهنية بتنسيق محلي يتوافق مع متطلبات الشركات والجهات الإسبانية.',
    fr: 'Générez un CV conforme aux exigences des recruteurs en Espagne.',
    es: 'Diseñe una hoja de vida profesional adaptada por completo a los estándares del mercado laboral local.'
  },
  inputProfileDetails: {
    en: 'Input Professional Profile Details',
    ar: 'أدخل تفاصيل ومؤهلات ملفك الشخصي',
    fr: 'Saisissez vos détails professionnels',
    es: 'Detalles del Perfil Profesional a Rellenar'
  },
  cvPreviewLayout: {
    en: 'Preview Layout (Curriculum Vitae)',
    ar: 'معاينة تصميم السيرة الذاتية (Curriculum Vitae)',
    fr: 'Aperçu du CV généré',
    es: 'Vista Previa del Curriculum Vitae'
  },
  cvPreviewPlaceholder: {
    en: 'Your completed resume preview will render here in pristine European recruitment structure.',
    ar: 'ستظهر معاينة سيرتك الذاتية المنسقة هنا وفق الهيكل الأوروبي المعتمد للموارد البشرية.',
    fr: 'L\'aperçu conforme aux modèles de recrutement européens s\'affichera ici.',
    es: 'La vista previa formateada conforme a los modelos de contratación europeos aparecerá aquí.'
  }
};

export const STUDY_OPTIONS: StudyOption[] = [
  {
    id: 'grado_medio',
    type: 'grado_medio',
    title: {
      en: 'Middle-Grade Vocational Training (Grado Medio)',
      ar: 'التكوين المهني المتوسط (Grado Medio)',
      fr: 'Formation Professionnelle Moyenne (Grado Medio)',
      es: 'Formación Profesional de Grado Medio'
    },
    duration: {
      en: '2 Years (2000 hours)',
      ar: 'سنتان (2000 ساعة)',
      fr: '2 Ans (2000 heures)',
      es: '2 Años (2000 horas)'
    },
    requirements: {
      en: ['Equivalent to ESO (Spanish secondary school graduation)', 'Aged 16+', 'Legal validation of foreign school diplomas (Homologación)'],
      ar: ['ما يعادل شهادة التعليم الإعدادي في إسبانيا (ESO)', 'العمر 16 سنة أو أكثر', 'معادلة الشهادة الأجنبية الرسمية (Homologación)'],
      fr: ['Équivalent de l\'ESO espagnol (Brevet des collèges)', 'Âge minimum 16 ans', 'Homologation des diplômes étrangers'],
      es: ['Estar en posesión del título de ESO o equivalente homologado', 'Tener al menos 16 años cumplidos', 'Superación de prueba de acceso específica si aplica']
    },
    fields: {
      en: ['Administration & Finance', 'Microcomputer Systems & Networks', 'Nursing Assistant', 'Gastronomy & Bakeries'],
      ar: ['الإدارة والمالية', 'الشبكات والأنظمة المعلوماتية الدقيقة', 'مساعد تمريض', 'تحضير الأطعمة والحلويات'],
      fr: ['Administration & Finance', 'Systèmes informatiques & Réseaux', 'Soins infirmiers', 'Gastronomie & Boulangerie'],
      es: ['Sistemas Microinformáticos y Redes', 'Gestión Administrativa', 'Cuidados Auxiliares de Enfermería', 'Gastronomía y Pastelería']
    },
    description: {
      en: 'Practical technical certifications looking to integrate students directly into the Spanish labor market with hands-on internships.',
      ar: 'شهادات تقنية وعملية تهدف إلى إدخال الطلاب مباشرة إلى سوق العمل الإسباني مع توفير تدريب مهني تطبيقي.',
      fr: 'Des certifications techniques très pratiques visant à intégrer directement les étudiants sur le marché de l\'emploi espagnol.',
      es: 'Estudios enfocados a la práctica laboral rápida con un alto índice de inserción y prácticas en empresas reales de España.'
    },
    cost: {
      en: 'Public: €100 - €400/year. Private: €1,500 - €4,000/year.',
      ar: 'الحكومي: 100 - 400 يورو/سنة. الخاص: 1500 - 4000 يورو/سنة.',
      fr: 'Public : 100 - 400 €/an. Privé : 1 500 - 4 000 €/an.',
      es: 'Público: 100 - 400 €/año. Privado: 1.500 - 4.000 €/año.'
    }
  },
  {
    id: 'grado_superior',
    type: 'grado_superior',
    title: {
      en: 'Higher Vocational Training (Grado Superior)',
      ar: 'التكوين المهني العالي (Grado Superior)',
      fr: 'Formation Professionnelle Supérieure (Grado Superior)',
      es: 'Formación Profesional de Grado Superior'
    },
    duration: {
      en: '2 Years (includes 3-6 months company internships)',
      ar: 'سنتان (تشمل من 3 إلى 6 أشهر من التدريب في الشركات)',
      fr: '2 Ans (inclut 3 à 6 mois de stage en entreprise)',
      es: '2 Años (incluido período de prácticas obligatorias)'
    },
    requirements: {
      en: ['High School Diploma/Baccalaureate equivalent', 'Spanish Homologación credential', 'Language Level B1/B2 Spanish recommended'],
      ar: ['شهادة البكالوريا / الثانوية العامة أو ما يعادلها', 'الحصول على وثيقة معادلة الشهادة (Homologación)', 'مستوى إسباني B1/B2 مستحسن'],
      fr: ['Baccalauréat ou équivalent', 'Homologation officielle du diplôme', 'Niveau B1/B2 d\'espagnol fortement conseillé'],
      es: ['Título de Bachiller o equivalente homologado', 'Disponer de credencial homologada de estudios', 'Nivel de español B1 o superior recomendado']
    },
    fields: {
      en: ['Multi-platform App Development (DAM)', 'Web App Development (DAW)', 'International Trade', 'Automotive Technology', 'Cloud Management & Cybersecurity'],
      ar: ['تطوير تطبيقات متعددة المنصات (DAM)', 'تطوير تطبيقات الويب (DAW)', 'التجارة الدولية', 'ميكانيكا السيارات والتكنولوجيا', 'إدارة السحابية والأمن السيبراني'],
      fr: ['Développement d\'Applications Multi-plateformes (DAM)', 'Développement Web (DAW)', 'Commerce International', 'Technologie Automobile'],
      es: ['Desarrollo de Aplicaciones Multiplataforma (DAM)', 'Desarrollo de Aplicaciones Web (DAW)', 'Comercio Internacional', 'Administración de Sistemas Informáticos en Red']
    },
    description: {
      en: 'A highly esteemed tertiary vocational track in Spain. Perfect for tech, business, and web engineering. Leads directly to university entrance (with credit exemptions) or immediate professional recruitment.',
      ar: 'مسار دراسي عالي المستوى يحظى بتقدير كبير في إسبانيا. ممتاز جداً لقطاعات التكنولوجيا والأعمال والويب، ويتيح المرور المباشر للجامعات لخصم المواد.',
      fr: 'Une filière très réputée en Espagne. Parfait en tech, gestion et développement. Permet d\'entrer en université avec équivalences de crédits.',
      es: 'Estudios superiores prácticos de alta calidad tecnológica con créditos convalidables para acceder a estudios universitarios de grado.'
    },
    cost: {
      en: 'Public: €200 - €400/year. Private: €2,000 - €6,000/year.',
      ar: 'الحكومي: 200 - 400 يورو/سنة. الخاص: 2000 - 6000 يورو/سنة.',
      fr: 'Public : 200 - 400 €/an. Privé : 2 000 - 6 000 €/an.',
      es: 'Público: 200 - 400 €/año. Privado: 2.000 - 6.000 €/año.'
    }
  },
  {
    id: 'universidad',
    type: 'universidad',
    title: {
      en: 'University Bachelor Degree (Grado Universitario)',
      ar: 'درجة البكالوريوس الجامعي (Grado)',
      fr: 'Licence Universitaire (Grado)',
      es: 'Grado Universitario'
    },
    duration: {
      en: '4 Years (240 ECTS credits)',
      ar: '4 سنوات (240 نقطة دراسية ECTS)',
      fr: '4 Ans (240 crédits ECTS)',
      es: '4 Años (240 créditos ECTS)'
    },
    requirements: {
      en: ['PCE Selectividad Access Exams (UNEDasiss)', 'Credential of Baccalaureate homologation', 'Spanish language B2 standard certification'],
      ar: ['امتحانات القدرات PCE (من خلال UNEDasiss)', 'شهادة معادلة الثانوية العامة', 'شهادة اللغة الإسبانية بمستوى B2 على الأقل'],
      fr: ['Examen d\'accès PCE (UNEDasiss)', 'Attestation d\'homologation du Baccalauréat', 'Standard B2 en langue espagnole'],
      es: ['Pruebas de Competencias Específicas (PCE por UNEDasiss)', 'Credencial de homologación de Bachillerato', 'Nivel B2 de español certificado']
    },
    fields: {
      en: ['Medicine & Surgery', 'Computer Science Engineer', 'Business Leadership (ADE)', 'Civil Engineering', 'Biotechnology'],
      ar: ['الطب والجراحة', 'هندسة علوم الحاسوب', 'إدارة الأعمال (ADE)', 'الهندسة المدنية', 'التكنولوجيا الحيوية'],
      fr: ['Médecine & Chirurgie', 'Génie Informatique', 'Administration des Affaires (ADE)', 'Biotechnologie'],
      es: ['Ingeniería Informática', 'Administración y Dirección de Empresas (ADE)', 'Medicina', 'Biotecnología']
    },
    description: {
      en: 'Prestigious public and private Spanish universities dating back centuries. Excellent academic and laboratory standards.',
      ar: 'جامعات إسبانية حكومية وخاصة عريقة ذات جودة أكاديمية وبحثية استثنائية معترف بها في جميع دول العالم والوطن العربي.',
      fr: 'Des universités espagnoles prestigieuses et séculaires. Hauts standards académiques et de recherche.',
      es: 'Estudios universitarios de primer ciclo que ofrecen formación académica y científica de primer nivel europeo.'
    },
    cost: {
      en: 'Public: €800 - €2,500/year (rates vary by region). Private: €6,000 - €18,000/year.',
      ar: 'الحكومي: 800 - 2500 يورو/سنة (حسب الإقليم). الخاص: 6000 - 18000 يورو/سنة.',
      fr: 'Public : 800 - 2 500 €/an. Privé : 6 000 - 18 000 €/an.',
      es: 'Público: 800 - 2.500 €/año. Privado: 6.000 - 18.000 €/año.'
    }
  },
  {
    id: 'master',
    type: 'master',
    title: {
      en: 'Master Degree (Máster Universitario)',
      ar: 'درجة الماجستير (Máster)',
      fr: 'Master (Master Universitario)',
      es: 'Máster Universitario'
    },
    duration: {
      en: '1 - 2 Years (60 or 120 ECTS)',
      ar: 'سنة إلى سنتين (60 أو 120 نقطة دراسية ECTS)',
      fr: '1 - 2 Ans (60 ou 120 ECTS)',
      es: '1 - 2 Años (60 o 120 créditos ECTS)'
    },
    requirements: {
      en: ['Completed Bachelor degree', 'Official translations of university syllabus & transcripts', 'Language certification (Spanish B2/C1 or English IELTS depending on teaching language)'],
      ar: ['شهادة البكالوريوس المكتملة', 'ترجمة رسمية لبيان الدرجات والمنهج الدراسي والشهادة الجامعية', 'شهادة اللغة (B2/C1 بالإسبانية أو الإنجليزية إذا كان الماستر بالإنجليزية)'],
      fr: ['Diplôme de licence complété', 'Traductions assermentées des relevés de notes', 'Certificat linguistique de niveau B2 minimum'],
      es: ['Haber completado un título de Grado / Licenciatura', 'Traducción jurada de títulos y expedientes', 'Nivel de idioma requerido según plan de estudios']
    },
    fields: {
      en: ['AI & Machine Learning', 'Renewable Energies', 'Data Analytics & Big Data', 'International Law & Human Rights', 'MBA'],
      ar: ['الذكاء الاصطناعي وتعلم الآلة', 'الطاقات المتجددة', 'تحليل البيانات الضخمة', 'القانون الدولي وحقوق الإنسان', 'إدارة الأعمال MBA'],
      fr: ['Intelligence Artificielle & Data', 'Énergies Renouvelables', 'MBA', 'Droit International'],
      es: ['Inteligencia Artificial', 'Energías Renovables', 'MBA Exclusivo', 'Big Data y Data Science']
    },
    description: {
      en: 'Specialized advanced master programs offered in partnership with global firms and world research frameworks.',
      ar: 'برامج ماجستير متقدمة ومتخصصة تُقدم بالتعاون مع شركات عالمية ومراكز الأبحاث الدولية الكبرى.',
      fr: 'Programmes de master spécialisés de haut niveau, souvent dispensés en partenariat avec des entreprises multinationales.',
      es: 'Programas de postgrado altamente especializados de carácter profesional, científico o académico.'
    },
    cost: {
      en: 'Public: €1,200 - €4,500/year. Private/Business: €8,000 - €25,000/year.',
      ar: 'الحكومي: 1200 - 4500 يورو/سنة. الخاص/إدارة الأعمال: 8000 - 25000 يورو/سنة.',
      fr: 'Public : 1 200 - 4 500 €/an. Privé/Écoles : 8 000 - 25 000 €/an.',
      es: 'Público: 1.200 - 4.500 €/año. Privado: 8.000 - 25.000 €/año.'
    }
  }
];

export const VISA_DOCUMENTS: VisaDocument[] = [
  {
    id: 'form',
    documentName: {
      en: 'National Visa Application Form (Solicitud de visado nacional)',
      ar: 'نموذج طلب تأشيرة السفر الوطنية (Nacional Solicitud)',
      fr: 'Formulaire de demande de Visa National',
      es: 'Formulario de Solicitud de Visado Nacional'
    },
    description: {
      en: 'The formal request form signed by the prospective student.',
      ar: 'استمارة طلب التأشيرة الرسمية الموقعة والمكتوبة بعناية من مقدم الطلب.',
      fr: 'Le formulaire de demande officiel dûment rempli et signé.',
      es: 'El formulario oficial debidamente completado y firmado correspondiente al visado de larga duración .'
    },
    requiredFor: { nationalities: ['all'] },
    steps: {
      en: ['Download the official PDF form from the Spanish embassy/consular portal.', 'Complete all fields in Spanish/capital letters.', 'Print and sign.'],
      ar: ['قم بتحميل النموذج الرسمي بصيغة PDF من موقع السفارة أو القنصلية الإسبانية.', 'املاً كافة الحقول باللغة الإسبانية أو بحروف لاتينية كبيرة.', 'قم بطباعته وتوقيعه يدوياً.'],
      fr: ['Télécharger le formulaire officiel en PDF sur le site du consulat espagnol.', 'Remplir les champs en espagnol ou en lettres majuscules.', 'Imprimer et signer en double exemplaire.'],
      es: ['Descargar el impreso de solicitud oficial del ministerio de asuntos exteriores de España.', 'Completar con bolígrafo negro y letras mayúsculas.', 'Proceder a firmarlo en el campo final.']
    }
  },
  {
    id: 'admission',
    documentName: {
      en: 'Official Admission Certificate (Carta de Admisión)',
      ar: 'رسالة القبول الجامعي الرسمية (Carta de Admisión)',
      fr: 'Lettre d\'Admission Officielle',
      es: 'Carta de Admisión de Centro Docente Autorizado'
    },
    description: {
      en: 'Proof that you have been admitted as a full-time student in an authorized educational institution in Spain.',
      ar: 'وثيقة رسمية تثبت قبولك كطالب مسجل بدوام كامل في مؤسسة تعليمية مرخصة في إسبانيا.',
      fr: 'Preuve d\'acceptation dans une école ou université agréée en Espagne à plein-temps.',
      es: 'Documento que acredite la admisión en un centro docente autorizado para la realización de un programa a tiempo completo.'
    },
    requiredFor: { nationalities: ['all'] },
    steps: {
      en: ['Pay reservation fees if needed.', 'The document must be signed digitally or stamped by the institution.', 'It must state the exact start, end dates and syllabus hours (minimum 20 hours/week).'],
      ar: ['ادفع رسوم حجز المقعد الدراسي إذا لزم الأمر.', 'تأكد من أن الرسالة تحمل توقيعاً رقمياً أو طابعاً رسمياً من المعهد أو الجامعة.', 'يجب أن توضح التواريخ بدقة وعدد الساعات الأسبوعية (ألا تقل عن 20 ساعة/أسبوع).'],
      fr: ['S\'acquitter des frais de réservation si l\'école le demande.', 'La lettre doit porter la signature numérique ou le cachet de l\'établissement.', 'Elle doit mentionner le calendrier exact des cours (minimum 20h par semaine).'],
      es: ['Asegurar el pago de matrícula y tasas obligatorias.', 'La carta debe contener el código de verificación oficial del centro académico.', 'Debe certificar las horas presenciales mínimas semanales del alumno.']
    }
  },
  {
    id: 'funds',
    documentName: {
      en: 'Proof of Financial Sufficiency (Medios Económicos)',
      ar: 'إثبات القدرة المالية والتمويل (Medios Económicos)',
      fr: 'Preuve de Moyens Financiers',
      es: 'Acreditación de Medios Económicos Suficientes'
    },
    description: {
      en: 'Proof you hold 100% of the IPREM index (at least €600 per month of stay in Spain).',
      ar: 'إثبات امتلاكك لـ 100% من مؤشر الدخل العام IPREM (على الأقل 600 يورو شهرياً طوال مدة إقامتك المقررة).',
      fr: 'Preuve de fonds équivalente à 100 % de l\'IPREM espagnol (minimum 600 € par mois d\'études).',
      es: 'Demostración de posesión de fondos fijos correspondientes al 100% del IPREM mensual vigente.'
    },
    requiredFor: { nationalities: ['all'] },
    steps: {
      en: ['Present personal bank statements of the last 3-6 months in English/Spanish.', 'Notarized sponsorship letters from parents along with their bank accounts.', 'Scholarship letters if applicable.'],
      ar: ['تقديم كشوف حساب البنك الشخصي لآخر 3-6 أشهر مترجمة ومصادق عليها.', 'رسالة كفالة أو التزام تضامني موثقة من الوالدين مع كشوف حساباتهم البنكية.', 'خطاب المنحة الرسمية إن وجد.'],
      fr: ['Présenter un historique des comptes des 3 à 6 derniers mois (traduit).', 'Lettre de prise en charge financière notariée des parents avec leurs revenus.', 'Attestation d\'obtention de bourse le cas échéant.'],
      es: ['Extractos bancarios de los últimos 6 meses del propio solicitante o de sus progenitores.', 'Acuerdo notarial de patrocinio económico debidamente traducido por traductor jurado.', 'Resolución pública de subvención o becas.']
    }
  },
  {
    id: 'insurance',
    documentName: {
      en: 'Private Health Insurance Cover (Seguro Médico)',
      ar: 'تأمين صحي خاص شامل (Seguro Médico)',
      fr: 'Assurance Médicale Privée',
      es: 'Seguro Privado de Enfermedad Sin Carencia'
    },
    description: {
      en: 'A comprehensive medical insurance scheme with full coverage in Spain, without gaps, co-payments or limits (sin copago).',
      ar: 'تأمين طبي شامل مع شبكة رعاية كاملة في إسبانيا بدون غطاء مالي منخفض وبدون مساهمة في الدفع (Sin Copago).',
      fr: 'Une assurance santé privée couvrant tous les risques en Espagne, sans copaiement, carence ni franchises.',
      es: 'Póliza de seguro con entidad autorizada de cobertura de enfermedad equivalente al Sistema Nacional de Salud.'
    },
    requiredFor: { nationalities: ['all'] },
    steps: {
      en: ['Contact a Spanish registered broker (e.g. Sanitas, Adeslas, Asisa).', 'Specify you need the specialized student policy "with repatriación and NO copago".', 'Pay the annual policy (around €300 - €500 depending on age).'],
      ar: ['اتصل بوكلاء التأمين الصحي المعترف بهم في إسبانيا (مثل Sanitas, Adeslas, Asisa).', 'حدد رغبتك في "تأمين الطلاب بدون دفع تضامني Sin Copago مع تغطية إعادة الجثمان".', 'ادفع قسط التأمين السنوي (تقريباً 300 - 500 يورو حسب العمر).'],
      fr: ['Contacter un assureur espagnol agréé (Sanitas, Adeslas, Asisa, etc.).', 'Demander l\'offre spéciale étudiants sans franchise et avec option rapatriement.', 'S\'acquitter du paiement annuel (environ 300 à 500 € par an).'],
      es: ['Contratar póliza de seguro médico con compañías españolas autorizadas.', 'Confirmar que incluye la cláusula de repatriación en caso necesario.', 'Efectuar el abono de la prima completa de un año entero.']
    }
  },
  {
    id: 'criminal_record',
    documentName: {
      en: 'Police Criminal Record Certificate (Antecedentes Penales)',
      ar: 'شهادة السوابق العدلية / خلو من السير الإجرامية (فيش وتشبيه)',
      fr: 'Extrait de Casier Judiciaire',
      es: 'Certificado de Antecedentes Penales traducido y apostillado'
    },
    description: {
      en: 'Official document certifying no prior conviction record (Required for stays over 180 days).',
      ar: 'وثيقة رسمية تثبت خلو صحيفتك الجنائية من العقوبات والجرائم (مطلوبة للإقامات التي تزيد عن 180 يومًا).',
      fr: 'Le document officiel établissant l\'absence de condamnations criminelles (si séjour > 180 jours).',
      es: 'Documento original expedido por el país origen que acredite ausencia de delitos penales.'
    },
    requiredFor: { nationalities: ['all'], minAge: 18 },
    steps: {
      en: ['Request from the local Ministry of Interior / Police in your home country.', 'Apply the Hague Apostille or consular legalization.', 'Translate into Spanish by a Sworn Translator certified by Spanish government (Traductor Jurado).'],
      ar: ['اطلب الشهادة من وزارة الداخلية أو إدارة الأمن العام في بلدك الأصلي.', 'قم بالتصديق عليها بالأبوستيل (La Haya) أو التصديق القنصلي الإسباني.', 'قم بترجمتها لدى مترجم محلف معتمد من وزارة الخارجية الإسبانية (Traductor Jurado).'],
      fr: ['Faire la demande ministérielle ou policière correspondante chez vous.', 'Obtenir l\'Apostille de la Haye ou la légalisation consulaire.', 'Faire traduire par un traducteur assermenté espagnol agréé.'],
      es: ['Obtener el certificado penal en su país de residencia original.', 'Legalizar con Convenio de La Haya o vía consular correspondiente.', 'Someter a traducción pública por parte de traductor oficial jurado.']
    }
  }
];

export const TRANSPORT_CARDS: TransportCard[] = [
  {
    id: 'madrid_abono',
    cityName: 'Madrid',
    name: 'Abono Joven Comunidad de Madrid (Tarjetas Consorcio)',
    cost: '€20 / month',
    youthDiscount: 'Flat discount under 26 years old: Unlimited access across all zones (A to E2) for €20.',
    howToApply: {
      en: ['Book an online appointment (Cita Previa) for "Tarjeta de Transporte Público" or apply directly online via targetapublicadeltransporte.com.', 'Bring your valid passport, photo (color passport size), and €4 fee.', 'They print and deliver it instantly at the physical office (located at major metro hubs like Moncloa, Sol, Avenida de América).'],
      ar: ['احجز موعداً إلكترونياً (Cita Previa) للحصول على بطاقة النقل العام أو تقدم عبر الإنترنت.', 'احضر جواز سفرك الأصلي الساري، وصورة شخصية حديثة، ورسوم قدرها 4 يورو.', 'يقومون بطباعتها وتسليمها لك فوراً في المكاتب الرئيسية (الموجودة في محطات المترو مثل Moncloa و Sol و Avenida de América).'],
      fr: ['Prendre rdv en ligne (Cita Previa) sur le site des transports de Madrid.', 'Se présenter avec son passeport, une photo d\'id et 4 € de frais.', 'La carte est imprimée et remise immédiatement au guichet.'],
      es: ['Reservar cita previa en la web de Consorcio de Transportes de Madrid o tramitar por internet.', 'Aportar pasaporte original, foto tamaño carnet y abonar la tasa de 4 euros.', 'La tarjeta se emite en el acto en las oficinas oficiales del metro.']
    },
    details: {
      en: 'Valid for Metro, Urban/Interurban Buses, and Cercanías Train lines throughout the complete Comunidad de Madrid region up to Toledo/Guadalajara.',
      ar: 'صالحة للاستخدام في جميع خطوط المترو، الحافلات الحضرية، والقطارات السريعة (Cercanías) في جميع مناطق مدريد وتوليدو.',
      fr: 'Valide pour le métro, bus urbains/interurbains, et trains Cercanías partout à Madrid.',
      es: 'Acceso ilimitado al metro de Madrid, cercanías renfe y autobuses urbanos de la capital y provincias limítrofes.'
    }
  },
  {
    id: 'bcn_t_jove',
    cityName: 'Barcelona',
    name: 'T-Jove (Targeta Jove ATM)',
    cost: '€40 / 9 tri-monthly (Unlimited)',
    youthDiscount: 'Aged under 30 years old! Unlimited travel for 90 consecutive days for just €40.',
    howToApply: {
      en: ['Buy at any metro terminal ticket machines or via TMB App.', 'Requires a valid passport number or NIE to register the ticket.', 'Print and keep it or download to mobile if using the T-mobility app.'],
      ar: ['اشتري البطاقة من أي آلة بيع تذاكر داخل محطات المترو أو عبر تطبيق TMB.', 'تتطلب إدخال رقم جواز السفر أو رقم الهوية NIE لتسجيل التذكرة بصفة شخصية.', 'اطبعها أو حملها على هاتفك الذكي باستخدام تطبيق T-Mobilitat.'],
      fr: ['Acheter directement aux bornes automatiques dans les stations ou via l\'app TMB.', 'Nécessite votre numéro de passeport ou NIE pour être nominatif.', 'Peut être chargée sur l\'application T-Mobilitat.'],
      es: ['Comprar la tarjeta en máquinas autoventas de metro o cargando saldo en T-Mobilitat.', 'Se asocia de forma nominal al pasaporte del alumno.', 'Uso ilimitado trimestral.']
    },
    details: {
      en: 'Covers unlimited travel on Metro Barcelona (TMB), Rodalies trains, and local buses inside Catalonia zones 1 to 6.',
      ar: 'تغطي السفر غير المحدود على خطوط مترو برشلونة وقطارات Rodalies والحافلات البلدية.',
      fr: 'Couvre le métro, bus de Barcelone, Tram et trains de banlieue Rodalies de la Catalogne.',
      es: 'Bono de transportes ilimitado válido en Metro de Barcelona, tranvías, FGC y Rodalies Catalunya.'
    }
  },
  {
    id: 'valencia_tu_valora',
    cityName: 'Valencia',
    name: 'Tarjeta Jove EMT / Suma Jove',
    cost: '€18 - €25 / month',
    youthDiscount: 'Aged under 31 years old. Get discounts on EMT urban buses & Metrovalencia.',
    howToApply: {
      en: ['Apply online or visit physical offices of ATMV with passport.', 'Bring passport and academic registration letter if requested.'],
      ar: ['قدم الطلب عبر الإنترنت أو تفضل بزيارة المكاتب المادية لـ ATMV مع إظهار جواز السفر.', 'احضر جواز السفر ورسالة التسجيل الأكاديمي.'],
      fr: ['Postuler en ligne sur le site de l\'ATMV ou guichet de métro.', 'Présenter le passeport d\'étudiant.'],
      es: ['Solicitud por internet y recogida rápida física en quioscos autorizados.']
    },
    details: {
      en: 'Enables unlimited network integrations on Metro, EMT buses, and regional commuter trains.',
      ar: 'تتيح السفر المتكامل لغير المحدود على المترو، حافلات EMT والقطارات الإقليمية.',
      fr: 'Enregistrement complet métros et autobus régionaux de la communauté valencienne.',
      es: 'Viajes ilimitados integrados en toda la red metropolitana de Valencia.'
    }
  }
];

export const RENTAL_PLATFORMS: RentalPlatform[] = [
  {
    name: 'Idealista',
    logo: '🏡',
    url: 'https://www.idealista.com',
    pros: {
      en: ['Largest selection of rental rooms and apartments in Spain.', 'Includes direct contact numbers for landlords.', 'High frequency updates.'],
      ar: ['أكبر تشكيلة من الغرف المعروضة والشقق للإيجار في إسبانيا.', 'تشمل أرقام الاتصال المباشرة مع الملاك المؤجرين.', 'تحديثات متكررة جداً.'],
      fr: ['Plus grand choix de chambres et d\'appartements d\'Espagne.', 'Contact direct avec les propriétaires.', 'Mises à jour quotidiennes.'],
      es: ['La base de datos de inmuebles más grande en España.', 'Contacto directo inmediato por llamada.', 'Actualizaciones constantes.']
    },
    cons: {
      en: ['High competition; flats get rented very quickly (in minutes).', 'Prone to listing scams if asked to pay outside.', 'Often managed by agencies with commission fees.'],
      ar: ['منافسة شديدة وعالية؛ تؤجر الشقق بسرعة فائقة.', 'احتمال حدوث احتيال إذا طُلب الدفع خارج المنصة.', 'غالباً ما تدار من قِبل وكالات عقارية تفرض رسوماً.'],
      fr: ['Compétition féroce (les chambres partent en quelques minutes).', 'Attention aux arnaques si on vous demande de payer d\'avance.', 'Beaucoup d\'agences immobilières payantes.'],
      es: ['Mucha competencia para conseguir ofertas asequibles.', 'Requiere agilidad y llamadas continuas en español.', 'Comisiones de agencias frecuentes.']
    },
    studentPopularity: '🏆 95%'
  },
  {
    name: 'Fotocasa',
    logo: '🏢',
    url: 'https://www.fotocasa.es',
    pros: {
      en: ['Clean map layouts to study localized prices.', 'Great filter selections (bills included, student friendly).'],
      ar: ['خرائط تفاعلية نظيفة لدراسة مستويات الأسعار المحلية.', 'فلاتر مساعدة ممتازة (مثلا: الفواتير مشمولة، صديق للطلاب).'],
      fr: ['Excellents filtres et cartes de recherche interactives.', 'Possibilité de filtrer par loyers avec charges comprises.'],
      es: ['Excelente visualización de mapas para comparar tarifas por barrios.']
    },
    cons: {
      en: ['Fewer direct individual landlords, mostly real-estate agencies.'],
      ar: ['نسبة أقل من الأفراد الملاك للبيوت، الأغلبية وكالات عقارية.'],
      fr: ['Plus d\'agences que de particuliers.'],
      es: ['Predominio de inmobiliarias profesionales en su interfaz.']
    },
    studentPopularity: '⭐️ 88%'
  },
  {
    name: 'Spotahome & Uniplaces',
    logo: '🎓',
    url: 'https://www.spotahome.com',
    pros: {
      en: ['100% verified properties by internal inspectors.', 'You can book rooms fully online before coming to Spain.', 'Scam-free security deposit system.'],
      ar: ['عقارات موثقة 100% من قبل مفتشي المنصة يدوياً.', 'يمكنك حجز غرفتك ومسكنك بالكامل عبر الإنترنت قبل السفر.', 'نظام آمن تمامًا للدفع والضمان.'],
      fr: ['Chambres vérifiées sur place par des inspecteurs.', 'Possibilité de réserver avant d\'arriver en Espagne.', 'Système de dépôt sécurisé de garantie.'],
      es: ['Propiedades verificadas por inspectores personales de Spotahome.', 'Reserva online 100% garantizada antes de aterrizar.', 'Protección contra fraudes.']
    },
    cons: {
      en: ['High booking platform platform fee (typically around €150 to €300).', 'No personal visits before checking in.'],
      ar: ['رسوم حجز مرتفعة تتقاضاها المنصة (غالباً بين 150 إلى 300 يورو).', 'لا تتوفر زيارات مسبقة لمشاهدة الغرفة بأنفسكم.'],
      fr: ['Frais de réservation élevés prélevés de 150 € à 300 €.', 'Pas de visites physiques de la chambre possibles.'],
      es: ['Cobro de tasas de gestión por reserva de importe variable.', 'No se admiten visitas físicas presenciales.']
    },
    studentPopularity: '⚡️ 90%'
  }
];

export const JOB_PLATFORMS: JobPlatform[] = [
  {
    name: 'InfoJobs',
    logo: '💼',
    url: 'https://www.infojobs.net',
    focus: {
      en: 'Spain\'s leading portal for mid-to-high career options and technical placements.',
      ar: 'أكبر بوابة توظيف في إسبانيا للوظائف المتوسطة والهندسية والإدارية والتقنية.',
      fr: 'Le premier site d\'emploi en Espagne pour trouver des jobs et stages.',
      es: 'La plataforma líder en España para empleo profesional y ofertas corporativas.'
    },
    tips: {
      en: ['Ensure your resume history is uploaded in Spanish.', 'Enable immediate mobile notifications for applications.'],
      ar: ['تأكد من أن السيرة الذاتية المهنية مكتوبة ومرفوعة بالإسبانية.', 'فعل الإشعارات الفورية على هاتفك لمتابعة الردود.'],
      fr: ['Rédigez obligatoirement votre expérience en espagnol.', 'Activez les notifications immédiates.'],
      es: ['Configurar alertas de empleo diario según tu especialidad laboral.']
    }
  },
  {
    name: 'JobToday',
    logo: '🕒',
    url: 'https://www.jobtoday.com',
    focus: {
      en: 'Part-time student jobs in cafés, shops, kitchens, delivery, and hostels.',
      ar: 'وظائف الطلاب بدوام جزئي في المقاهي، المحلات التجارية، المطابخ والتوصيل.',
      fr: 'Idéal pour les petits boulots d\'étudiants (hôtels, cafés, serveurs).',
      es: 'Empleo rápido ideal para hostelería, camarero, repartos y turnos sueltos.'
    },
    tips: {
      en: ['Direct immediate chat messages with employers inside the application.', 'Apply during mornings for hospitality sectors.'],
      ar: ['محادثات مباشرة وفورية مع أرباب العمل داخل التطبيق.', 'قدم في الصباح الباكر لقطاعات الفنادق والخدمات.'],
      fr: ['Discutez directement avec le gérant par chat.', 'Postulez aux heures calmes.'],
      es: ['Escribir mensajes cordiales directos al reclutador por chat interno.']
    }
  }
];

export const CITY_GUIDES: CityGuide[] = [
  {
    id: 'madrid',
    name: 'Madrid',
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=600',
    highlights: {
      en: ['Capital culture', 'Lively dynamic districts', 'Largest Arab student population'],
      ar: ['نبض العاصمة الثقافي', 'أحياء مفعمة بالحيوية والذكاء', 'أكبر عدد من الطلاب العرب في إسبانيا'],
      fr: ['Capitale vibrante', 'Quartiers animés', 'Importante communauté estudiantine arabe'],
      es: ['Centro cultural', 'Red de metro impecable', 'Mayor comunidad estudiantil']
    },
    placesToVisit: [
      {
        name: 'El Retiro Park',
        description: {
          en: 'A massive beautiful central park with a lake, Crystal Palace and spacious grassy gardens.',
          ar: 'حديقة ريتيرو الشاسعة في قلب العاصمة مع بحيرة جميلة وقصر كريستالي خلاب.',
          fr: 'Le grand parc central avec son lac, son palais de cristal et ses jardins.',
          es: 'Parque centenario de Madrid perfecto para estudiar, hacer deporte y pasear.'
        },
        cost: 'Free'
      },
      {
        name: 'Thyssen & Prado Museum',
        description: {
          en: 'World-famous fine art galleries. Entry is free for students up to 25 with student cards.',
          ar: 'متاحف الفن العالمية الشهيرة. الدخول مجاني بالكامل للطلاب لحين سن 25.',
          fr: 'Musées d\'art réputés. Entrées gratuites avec pass étudiant.',
          es: 'Las pinacotecas del arte mundial. Acceso completamente gratuito presentando carné.'
        },
        cost: 'Free for student'
      }
    ],
    transportTips: {
      en: 'Using the €20 Abono Joven saves you hundreds in travel expenses inside high commuting areas.',
      ar: 'يوفر لك استخدام بطاقة Abono Joven بقيمة 20 يورو مئات اليوروهات شهرياً في الانتقالات والمواصلات.',
      fr: 'En utilisant l\'Abono Joven à 20 €, vous voyagez de manière illimitée.',
      es: 'Se aconseja encarecidamente vincular el bono joven para ahorrar en transporte.'
    }
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efedd?auto=format&fit=crop&q=80&w=600',
    highlights: {
      en: ['Beaches & Mediterranean breeze', 'Architectural Gaudi marvels', 'Tech innovation startups hub'],
      ar: ['الشواطئ الدافئة والنسيم المتوسطي', 'العجائب الهندسية للمعماري غاودي', 'مركز ابتكار تكنولوجيا المعلومات والشركات الناشئة'],
      fr: ['Plages & climat méditerranéen', 'Chefs-d\'œuvre de Gaudi', 'Pôle tech européen'],
      es: ['Playas urbanas', 'Arte clásico vanguardista', 'Dinamismo tecnológico internacional']
    },
    placesToVisit: [
      {
        name: 'Parc Güell & Sagrada Família',
        description: {
          en: 'Outstanding visual landmarks in the city representing Antoni Gaudi\'s masterpieces.',
          ar: 'معالم بصرية مذهلة في المدينة تمثل تحفة الفنان المعماري الشهير أنتوني غاودي.',
          fr: 'Merveilles architecturales dessinées par Gaudi au cœur de la Catalogne.',
          es: 'Parques y obras monumentales icónicas.'
        },
        cost: 'Varies / discount'
      }
    ],
    transportTips: {
      en: 'T-Jove allows 90 days of unlimited travel on all public transport for just €40.',
      ar: 'تتيح لك بطاقة T-Jove سياحة وتنقلاً غير محدود لمدة 90 يوماً متتالياً بـ 40 يورو فقط.',
      fr: 'La carte T-Jove à 40 € inclut métro et trains Rodalies pour 3 mois complets.',
      es: 'El ticket T-Jove cubre todos los viajes por todo el trimestre escolar.'
    }
  }
];

export const LEVEL_TOPICS: LessonTopic[] = [
  // Generates metadata representing 300 customizable "pages" (50 pages per level A1 to C2)
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `A1_${i + 1}`,
    level: 'A1' as const,
    pageNumber: i + 1,
    title: {
      en: `Page ${i+1}: ${getTopicName('A1', i)}`,
      ar: `صفحة ${i+1}: ${getTopicName('A1', i)}`,
      fr: `Page ${i+1}: ${getTopicName('A1', i)}`,
      es: `Pág. ${i+1}: ${getTopicName('A1', i)}`
    },
    category: getCategoryType(i)
  })),
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `A2_${i + 51}`,
    level: 'A2' as const,
    pageNumber: i + 51,
    title: {
      en: `Page ${i+51}: ${getTopicName('A2', i)}`,
      ar: `صفحة ${i+51}: ${getTopicName('A2', i)}`,
      fr: `Page ${i+51}: ${getTopicName('A2', i)}`,
      es: `Pág. ${i+51}: ${getTopicName('A2', i)}`
    },
    category: getCategoryType(i)
  })),
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `B1_${i + 101}`,
    level: 'B1' as const,
    pageNumber: i + 101,
    title: {
      en: `Page ${i+101}: ${getTopicName('B1', i)}`,
      ar: `صفحة ${i+101}: ${getTopicName('B1', i)}`,
      fr: `Page ${i+101}: ${getTopicName('B1', i)}`,
      es: `Pág. ${i+101}: ${getTopicName('B1', i)}`
    },
    category: getCategoryType(i)
  })),
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `B2_${i + 151}`,
    level: 'B2' as const,
    pageNumber: i + 151,
    title: {
      en: `Page ${i+151}: ${getTopicName('B2', i)}`,
      ar: `صفحة ${i+151}: ${getTopicName('B2', i)}`,
      fr: `Page ${i+151}: ${getTopicName('B2', i)}`,
      es: `Pág. ${i+151}: ${getTopicName('B2', i)}`
    },
    category: getCategoryType(i)
  })),
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `C1_${i + 201}`,
    level: 'C1' as const,
    pageNumber: i + 201,
    title: {
      en: `Page ${i+201}: ${getTopicName('C1', i)}`,
      ar: `صفحة ${i+201}: ${getTopicName('C1', i)}`,
      fr: `Page ${i+201}: ${getTopicName('C1', i)}`,
      es: `Pág. ${i+201}: ${getTopicName('C1', i)}`
    },
    category: getCategoryType(i)
  })),
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `C2_${i + 251}`,
    level: 'C2' as const,
    pageNumber: i + 251,
    title: {
      en: `Page ${i+251}: ${getTopicName('C2', i)}`,
      ar: `صفحة ${i+251}: ${getTopicName('C2', i)}`,
      fr: `Page ${i+251}: ${getTopicName('C2', i)}`,
      es: `Pág. ${i+251}: ${getTopicName('C2', i)}`
    },
    category: getCategoryType(i)
  }))
];

function getCategoryType(index: number): 'grammar' | 'vocabulary' | 'pronunciation' | 'essays' {
  if (index % 4 === 0) return 'grammar';
  if (index % 4 === 1) return 'vocabulary';
  if (index % 4 === 2) return 'pronunciation';
  return 'essays';
}

function getTopicName(level: string, index: number): string {
  const topicsA1 = [
    'The Alphabet & Sound Systems',
    'Greetings & Introduction Formulas',
    'Definite & Indefinite Articles',
    'Noun Gender & Plural Formulation',
    'Subject Pronouns (Yo, Tú, Él...)',
    'The Verb Ser: Origins & Identity',
    'The Verb Estar: Location & Status',
    'Numbers 1 to 100 & Basic Math',
    'Colors & Direct Adjective Agreement',
    'Regular AR Verbs in Present Tense',
    'Regular ER Verbs in Present Tense',
    'Regular IR Verbs in Present Tense',
    'Asking Questions: Simple Interrogatives',
    'Days, Months & Calendar Events',
    'Telling Time & Daily Schedules',
    'The Family: Names & Relations',
    'My House: Rooms & Essential Furniture',
    'Stem-Changing Verbs: e->ie Group',
    'Stem-Changing Verbs: o->ue Group',
    'Stem-Changing Verbs: e->i Group',
    'Expressing Preferences (Me Gusta)',
    'Food, Fruits, & Table Vocabulary',
    'Ordering at a Café or Restaurant',
    'Adverbs of Frequency (Siempre, Nunca)',
    'Prepositions of Place (En, Sobre, Bajo)',
    'City Locations: Asking for Directions',
    'University Campus & Student Offices',
    'Classroom Objects & Stationery',
    'Demonstratives (Este, Ese, Aquel)',
    'The Verb Tener: Possession & Age',
    'Common Professions & Workplaces',
    'At the Bank: Opening Student Account',
    'Sports & Physical Activities',
    'Hobbies, Music & Free Time',
    'Weather States & Climate Seasons',
    'Clothing styles & Direct Size Choice',
    'Parts of the Human Body',
    'Describing Physical Appearance',
    'Describing Personality Traits',
    'In the City: Transport (Metro, Bus)',
    'At the Airport & Security Rules',
    'The Euro: Paying & Receiving Change',
    'Simple Connectors: y, o, pero, porque',
    'Health Basics: Visiting the Pharmacy',
    'Cardinal vs Ordinal Numbers',
    'Possessive Adjectives (Mi, Tu, Su)',
    'Animal Kingdom & Domestic Pets',
    'Spanish Cultural Highlights Overview',
    'Writing Brief Postcards & Emails',
    'A1 Benchmark Practice Assessment'
  ];

  const topicsA2 = [
    'Reflexive Verbs & Routine Tasks',
    'Direct Object Pronouns (Lo, La...)',
    'Indirect Object Pronouns (Me, Te, Le...)',
    'Preterite Past Tense: Regular Verbs',
    'Preterite Past Tense: Irregular Verbs',
    'Imperfect Past Tense Conjugation',
    'Preterite vs Imperfect Context Rules',
    'Estar + Gerund: Progress Actions',
    'Ir + a + Infinitivo: Plans & Future',
    'Affirmative Imperative for Tú & Usted',
    'Comparing People, Objects & Places',
    'Superlatives & Direct Exceptions',
    'Double Object Pronouns (Se lo, Se la)',
    'Present Perfect Past Tense (He estado)',
    'Irregular Past Participle Verbs',
    'Biographies & Chronology Connectors',
    'Expressing Obligation: Tener que',
    'Health & Doctor Visits in Spain',
    'Accommodation: Renting flat rooms',
    'Tourism: Bookings & Hotel Procedures',
    'Domestic chores & Home Maintenance',
    'Spanish Regional Geography Overview',
    'Describing Historic Holidays',
    'Past Lifestyles vs Modern Routines',
    'Academic Trajectory & Student CVs',
    'Spain Cuisine: Tapas & Paella',
    'Making Calls & Leaving Messages',
    'Social Networks & Tech Vocabulary',
    'Online Shopping & Deliveries',
    'Natural Landscapes: Mountains & Rivers',
    'Asking & Giving Formal Permission',
    'Expressing Mutual Agreements',
    'Climate Dynamics & Ecological Threats',
    'Post Offices & Local Mail Services',
    'Emergency Protocols & Phone Calls',
    'Writing Simple Inquiry Emails',
    'Emotions, Moods & Internal States',
    'Pop Culture, Cinema & Music Festivals',
    'Art & Celebrated Spanish Creators',
    'Subjunctive Mood: Introductory Ideas',
    'Pronunciation: Sentence Intonations',
    'Accentuación: Agudas, Llanas & Co',
    'Spelling Rules: G vs J & C vs Z',
    'Writing Local Activity Reviews',
    'Saying Probabilities (Quizás, Tal vez)',
    'Registering to Madrid University',
    'Payment methods: Cards vs Cash',
    'The letter H & silent phonetic rules',
    'Informal letters & friendly notes',
    'A2 SIELE Oral Tasks Preparation'
  ];

  const topicsB1 = [
    'Present Subjunctive: Regular Verbs',
    'Present Subjunctive: Irregular Verbs',
    'Subjunctive for Desires and Wishes',
    'Subjunctive for Emotional states',
    'Future Simple Tense Conjugation',
    'Conditional Simple Tense (Me gustaría)',
    'Por vs Para: Ultimate Rules',
    'Preterite Pluperfect: Había cantado',
    'Subjunctive for Doubts & Denial',
    'Subjunctive with Impersonal Sentences',
    'Relative Pronouns (Que, Quien, Cuyo)',
    'Relative Clauses: Indicative vs Subj',
    'Formation of Adverbs ending in -mente',
    'Expressing Hopes & Congratulations',
    'Future Predictions & Forecasts',
    'Debating Opinions with Arguments',
    'Student Visa Consul Interview Prep',
    'Understanding Rental Lease Contracts',
    'Job Search, LinkedIn & Portfolios',
    'Ecology, Recycling & Green Policies',
    'Artificial Intelligence & Smart Devices',
    'Volunteering & NGO Projects in Spain',
    'Spain Political & Senate Structure',
    'Festivals: Fallas, Tomatina, Feria',
    'Healthy Diets & Mediterranean Diet',
    'Famous Museums: El Prado & Reina Sofía',
    'Public Subsidies: Student Transport',
    'Overcoming Cultural Shock & Slangs',
    'Recounting Anecdotes & Funny Stories',
    'Writing Formally to University Deans',
    'Expressing Deep Regret and Apologies',
    'Debating Modern Controversial Issues',
    'Spanish Custom Schedules (Siestas & Co)',
    'Consumerism & Advertising Power',
    'Physical & Mental Stress Management',
    'At the Police: Stolen Passport Reports',
    'Student Fraternities & Activity Groups',
    'Refunding Products & Consumer Rights',
    'Planning Large Events & Ceremonies',
    'Text Splicing: Syntactical Connectors',
    'Vowels Merge (Sinalefa) Articulation',
    'Distinguishing S vs C vs Z acoustic',
    'Phonetics: Sound differences B vs V',
    'Reported speech: Dijo que vendría',
    'Surprises, Disappointments & Excitements',
    'Qualities of highly successful students',
    'Spanish Idioms with Parts of Body',
    'Comparative Email Drafts for SIELE',
    'B1 Letter of Complaint Guidelines',
    'B1 Assessment Checkpoint Success'
  ];

  const topicsB2 = [
    'Imperfect Subjunctive (Ra/Se endings)',
    'Si Clause Hypotheses (Si fuera, iría)',
    'Passive Voice Formulations',
    'Verbs of Change: Volverse & Quedarse',
    'Adverbial Pronouns: Double Accents',
    'Future Perfect Tense usage',
    'Conditional Perfect Tense use',
    'Aunque: Subjunctive vs Indicative',
    'Advanced Connectors: Sin embargo...',
    'Prepositions demanding Subjunctive',
    'Ser vs Estar: Semantics Changes',
    'Impersonal constructions with Se',
    'Complex Relative Pronouns (El cual)',
    'Pluperfect Subjunctive (Hubiera amado)',
    'Expressing formal demands & requests',
    'Argumentative Essay: Structures',
    'Deconstructing Stats & Graph Lines',
    'Polite Interruptions & Debating',
    'Academic Jargon for Research Papers',
    'Internships & Employment Laws',
    'Media Outlets & Critical Newsletter',
    'Spanish Cinematic Art & Goya Awards',
    'Migratory Demographics & Co-existence',
    'Economy Models & Regional Gastronomy',
    'Renewable Energies & Solar Infrastructure',
    'Erasmus exchange & European Credits',
    'E-Learning vs Traditional Classrooms',
    'Student Psychological well-being',
    'Spain Historic Milestones overview',
    'Spanish Legal System & Resident Visas',
    'Literature Analysis: Quijote & Lorca',
    'Academic Collocations & Modismos',
    'Derivational Suffixes to form verbs',
    'Expressing Irony, Sarcasm & Wit',
    'Formal Complaints to Town Halls',
    'Reading Complex Technical Agreements',
    'Scientific Projects oral pitch',
    'Advanced Passive with Se (Se acordó)',
    'Banter, Jokes & Humorous Contexts',
    'Cataluña, Galicia & Euskadi cultures',
    'Diminutives & Aumentativos suffixes',
    'Double Negatives syntax constraints',
    'Periphrasis: Llevar + Gerundio / Participio',
    'Periphrasis: Deber de + Infinitivo',
    'Drafting Newspaper Editorial columns',
    'Vocabulary of Architecture & Murals',
    'Prosodic Stress & Rhythmic Rules',
    'Peninsular Spanish vs LatAm Spanish',
    'Synthesizing Text: Exam summary tips',
    'B2 Exam Final Certification Simulation'
  ];

  const topicsC1 = [
    'Subjunctive in Adverbial Clauses',
    'Nuances of Gerunds vs Infinitives',
    'Inverted Sentences for literary style',
    'Colloquialisms, Idioms & Student Slangs',
    'Advanced Substantive Clauses: El hecho de que',
    'Prepositional Verbs (Acordarse de, Pender de)',
    'Asymmetrical Substantive Agreements',
    'Concessive clauses: Por más que + Subj',
    'Conditional formulas: Como / Con tal de que',
    'Consecutive connectors: De ahí que',
    'Expressing Temporal relations in style',
    'The neuter Article lo + adjective/adverb',
    'Lexical rich synonyms for common verbs',
    'Neologisms & Foreign Loanwords adaptation',
    'Spanish Idiomatic locutions with Colores',
    'Analyzing Complex Historical Texts',
    'The Art of Rhetoric & Persuasion in Debate',
    'Academic Dissertation writing protocols',
    'Spain Constitutional laws for expatriates',
    'Critical Review of Contemporary Literature',
    'Ecosystems, Biodiversity & Water Management',
    'Sociological changes: Modern Spanish Family',
    'Technological Ethics: Data Protection & GDPR',
    'Spain Arts: Flamenco, Zarzuela & Folklore',
    'Philosophy: Stoicism to Unamuno thoughts',
    'Drafting Highly Professional Cover Letters',
    'Presenting PhD proposals with success',
    'Legal Terminology: Títulos, Poderes & Actas',
    'Navigating Taxes: NIE, IRPF and Rent',
    'The housing market: Hypothecarial jargon',
    'Regional Autonomies: Taxes & Regulations',
    'Literary figures: Lorca, Machado & Mistral',
    'Advanced word formatting: Word blending',
    'Vocabulary of Geopolitics & Foreign Affairs',
    'Expressing Subtle Skepticism & Mockery',
    'Writing Speeches & Toast master guides',
    'Reading complex medical & health reports',
    'Metaphorical expressions with animals',
    'Advanced reported speech: Backshifting',
    'Polysemous words: Context definitions',
    'Euphemisms and PC culture in Iberia',
    'Pronunciation: Accented vs Unaccented Monosyllables',
    'Intonation in sarcasm & polite refusal',
    'Sociolects & Dialects across Spain',
    'Reviewing the Spanish Transition to Democracy',
    'Drafting official administrative claims (Instancia)',
    'Expressing Aesthetic appreciations in museums',
    'The future of Spanish as a global language',
    'Advanced synthesis: Condensing multi-source reports',
    'C1 Level Master Graduation Project'
  ];

  const topicsC2 = [
    'Historical evolution of Castilian grammar',
    'Deciphering Medieval & Golden Age texts',
    'Subtle semantic nuances of tense shifting',
    'Hyperbaton, Anafora & Literary figures',
    'Legal, Judicial & Parliamentary registers',
    'Archaic verb conjugations (Vos, Plural styles)',
    'Expressing highly abstract hypotheses',
    'The subjunctive of virtual reality (Quisiera)',
    'Neologisms & Lexicological innovations',
    'Decoding philosophical treatises in Spanish',
    'Rhetorical mechanisms: Irony to Litotes',
    'The architecture of complex macro-sentences',
    'Poetic metrics: Sonnets, Romances & Versolibrismo',
    'Idiomatic expressions derived from bullfighting',
    'The language of cervantine satire',
    'Advanced textual cohesion: Anaphora & Cataphora',
    'Linguistic purism vs evolution (RAE role)',
    'Vocabulary of Epistemology & Metaphysics',
    'Syntactic ambiguity resolution',
    'Pragmatics of courtesy: Indirect speech acts',
    'Expressing double intentions and subtext',
    'Writing highly sophisticated literary essays',
    'Analyzing regional dialects: Andaluz, Canario',
    'Intertextuality and cultural citations',
    'Drafting press releases & high-impact articles',
    'Analyzing political speeches and discourse',
    'Vocabulary of Macroeconomics & Stock markets',
    'Deciphering contracts, patents & statutory laws',
    'Linguistic variations in the Judeo-Spanish (Ladino)',
    'The influence of Arabic on Spanish vocabulary',
    'Prepositional combinations in extreme registers',
    'Advanced speech pacing and breath control',
    'Simultaneous translation technical strategies',
    'The art of negotiation: Diplomatic Spanish',
    'Literary translation: Prose and Verse problems',
    'Vocabulary of Astronomy, Physics & Space',
    'Linguistic play: Palindromes and Calambures',
    'Deconstructing academic reviews & critiques',
    'Using registers of absolute formality (Excia, Ilmo)',
    'Socio-cultural registers: Vulgar vs Cult wordings',
    'Expressing absolute certainty vs ultimate doubt',
    'Writing manifestos & philosophical declarations',
    'Public speaking: Body language & voice project',
    'Intercultural mediation: Resolving major crises',
    'The Cervantes Prize: History & Lit standard',
    'Spanish contribution to European enlightenment',
    'Linguistic rights & co-officiality in Spain',
    'Deciphering administrative regulations of the BOE',
    'C2 Level Ultimate Thesis Dissertation',
    'SIELE / DELE C2 Master Level Exam Simulation'
  ];

  let list = topicsA1;
  if (level === 'A2') list = topicsA2;
  else if (level === 'B1') list = topicsB1;
  else if (level === 'B2') list = topicsB2;
  else if (level === 'C1') list = topicsC1;
  else if (level === 'C2') list = topicsC2;

  return list[index % list.length];
}

export const TUTOR_TEACHERS: TutorListing[] = [
  {
    id: 'tutor_layla',
    tutorName: 'Layla El-Sayed',
    avatar: '👩‍🏫',
    bio: {
      en: 'Trilingual Spanish teacher (Arabic, English, Spanish). Specialist in preparing students from the Levant & Egypt for Selectividad entrance test.',
      ar: 'مُعلمة لغة إسبانية ثلاثية اللغات (العربية، الإنجليزية، الإسبانية). متخصصة في إعداد الطلاب العرب لاجتياز اختبار القدرات في إسبانيا.',
      fr: 'Enseignante trilingue d\'espagnol (Arabe, Anglais, Espagnol). Spécialiste de la préparation aux concours universitaires.',
      es: 'Profesora trilingüe con excelente pedagogía para estudiantes de orígenes árabes.'
    },
    hourlyRate: 15,
    rating: 4.9,
    reviewsCount: 42,
    availability: ['Monday PM', 'Wednesday AM', 'Saturday All-Day']
  },
  {
    id: 'tutor_walid',
    tutorName: 'Prof. Walid Mourad',
    avatar: '👨‍💼',
    bio: {
      en: 'Former Madrid University translator. Specializing in legal document translation, B2 official DELE exams and visa motivation letters.',
      ar: 'مترجم معتمد سابق بجامعة مدريد. متخصص في ترجمة المستندات القانونية وتدريب الطلاب على اختبارات DELE الرسمية والفيزا.',
      fr: 'Ancien traducteur universitaire à Madrid. Spécialisé dans les candidatures de visa et examens officiels DELE.',
      es: 'Traductor certificado del Ministerio de Asuntos Exteriores de España. Éxito garantizado.'
    },
    hourlyRate: 20,
    rating: 5.0,
    reviewsCount: 78,
    availability: ['Tuesday PM', 'Thursday PM', 'Sunday All-Day']
  }
];

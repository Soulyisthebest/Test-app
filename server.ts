/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. Using mock AI responses.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

/// --- RESILIENT OFFLINE FALLBACK ENGINES ---

function getFallbackLesson(level: string, page: number, topicTitle: string, teachingLang: string) {
  const isArabic = teachingLang === 'ar';
  const isFrench = teachingLang === 'fr';

  if (page === 1 || topicTitle.toLowerCase().includes("alphabet") || topicTitle.toLowerCase().includes("abecedario")) {
    return {
      title: `${topicTitle} - SIELE Curriculum`,
      explanation: isArabic ? 
        `مرحباً بكم في الدرس الأول من كتاب لغة إسبانية متكامل للطلاب العرب! خطوتكم الأولى للنجاح الدراسي هي إتقان الأبجدية الإسبانية (El Abecedario) وقواعد صوتياتها الدقيقة.\n\n### قواعد نطق الأحرف الأساسية:\n1. **الأحرف الصوتية (Las Vocales):** الإسبانية لغة صوتية تنطق كما تكتب. الأحرف الصوتية خمسة ولا يتغير نطقها:\n   - **A:** تنطق كالألف الممدودة المفتوحة بوضوح (مثل: Amor - حب).\n   - **E:** تنطق ككسرة خفيفة قصيرة (مثل: Estudiante - طالب).\n   - **I:** تنطق كياء ممدودة صريحة (مثل: Isla - جزيرة).\n   - **O:** تنطق كضمة مفخمة دائرية (مثل: Otoño - خريف).\n   - **U:** تنطق كواو ممدودة ضيقة (مثل: Universidad - جامعة).\n\n2. **مميزات اللكنة الإسبانية الرسمية (Castellano/SIELE):**\n   - **الحرف Ñ (eñe):** حرف فريد من نوعه يلفظ بدمج النون والياء (ني) كما in كلمة "España" (إسبانيا).\n   - **الحرف H (hache):** صامت تماماً ولا يلفظ أبداً! مثلاً "Hola" تنطق "أولا".\n   - **الحرف J (jota):** يلفظ دائماً كالخاء العربية (خ)، مثل "Jardín" (خاردين).\n   - **الحرف Z و C (أمام E و I):** يُنطق كالثاء الكلاسيكية (ث)، مثل "Zapato" (ثاباتو) و"Cero" (ثيرو). هذا يميز لكنة مدريد ووسط إسبانيا عن أمريكا اللاتينية متبعين معايير اختبار الـ SIELE.` 
        : isFrench ?
        `Bienvenue dans votre première leçon de notre manuel complet d'espagnol ! Votre premier pas vers le succès en Espagne est de maîtriser l'alphabet espagnol (El Abecedario).\n\n### Règles fondamentales de prononciation :\n1. **Les Voyelles (Las Vocales) :** L'espagnol est entièrement phonétique. Les cinq voyelles gardent toujours le même son :\n   - **A :** Ouvert, comme le "a" dans "table" (ex: Amor - Amour).\n   - **E :** Ouvert moyen, comme le "é" (ex: Estudiante - Étudiant).\n   - **I :** Comme le "i" standard (ex: Isla - Île).\n   - **O :** Rond et projeté (ex: Otoño - Automne).\n   - **U :** Se prononce toujours "ou" (ex: Universidad - Université).\n\n2. **Lettres Spéciales de la Péninsule :**\n   - **Le Ñ (eñe) :** Se prononce comme le son "gn" dans "mignon" (ex: España).\n   - **Le H (hache) :** Toujours muet ! "Hola" se prononce "ola".\n   - **Le J (jota) :** Se prononce comme une forte aspiration (semblable à l'arabe "خ" ou à la jota d'Espagne).\n   - **Le Z et C (devant E et I) :** Se prononcent comme le "th" anglais dans "think" (ex: Zapato, Cero) selon la prononciation officielle espagnole testée au SIELE.`
        :
        `Welcome to the first lesson of your Spanish textbook! Mastering the Spanish alphabet (El Abecedario) and its clear rules is your gateway to studying in Spain.\n\n### Core Pronunciation Rules:\n1. **The Vowels (Las Vocales):** Spanish is incredibly regular and phonetic. Vowels are short, energetic, and never change sound:\n   - **A:** Open, like "a" in father (e.g. Amor - Love).\n   - **E:** Mid-vowel, like "e" in pet (e.g. Estudiante - Student).\n   - **I:** High vowel, like "ee" in sleep (e.g. Isla - Island).\n   - **O:** Rounded, like "o" in more (e.g. Otoño - Autumn).\n   - **U:** Sharp "oo" sound, like "oo" in boot (e.g. Universidad - University).\n\n2. **Special Peninsular Spanish Consonants:**\n   - **The letter Ñ (eñe):** Unique sound, pronounced like "ny" in canyon (e.g. España - Spain).\n   - **The letter H (hache):** Always 100% silent! "Hola" is pronounced "ola".\n   - **The letter J (jota):** Pronounced as a strong guttural "h" (exact match to the Arabic "خ" sound), such as "Jardín" (garden).\n   - **The letter Z and C (before E and I):** Pronounced as a clear "th" sound as in "think" (e.g. Zapato - shoe, Cero - zero). This is the official Castilian pronunciation tested on the SIELE exam.`,
      vocabulary: [
        { spanish: "El Abecedario", dynamicLang: isArabic ? "الأبجدية" : isFrench ? "L'Alphabet" : "The Alphabet", explanation: "The set of 27 letters representing sounds in Spanish." },
        { spanish: "Hola", dynamicLang: isArabic ? "مرحبا" : isFrench ? "Bonjour" : "Hello", explanation: "Friendly greeting where the letter H is completely silent." },
        { spanish: "España", dynamicLang: isArabic ? "إسبانيا" : isFrench ? "L'Espagne" : "Spain", explanation: "Features the unique Spanish letter Ñ." },
        { spanish: "Universidad", dynamicLang: isArabic ? "جامعة" : isFrench ? "Université" : "University", explanation: "Starts with the 'oo' sound vowel U." }
      ],
      practice: [
        { type: "multiple-choice", question: isArabic ? "أي حرف من الأحرف التالية صامت دائماً ولا يُلفظ؟" : isFrench ? "Laquelle de ces lettres est toujours muette en espagnol ?" : "Which of these letters is always silent in Spanish?", options: ["J", "H", "Ñ", "Z"], correctIndex: 1 },
        { type: "fill-blank", question: isArabic ? "الحرف المميز في كلمة España هو حرف الـ ___" : isFrench ? "La lettre unique présente dans le mot España est le ___" : "The unique letter present inside the word España is ___", blankWord: "ñ" }
      ]
    };
  }

  // Other chapters - create a highly custom, keyword-matched dynamic fallback lesson so pages are never repeated
  let customTitle = `${topicTitle}`;
  let customExplanation = "";
  let customVocab: any[] = [];
  let customPractice: any[] = [];

  const textTitleLower = topicTitle.toLowerCase();

  if (textTitleLower.includes("greetings") || textTitleLower.includes("introduction") || textTitleLower.includes("formula") || textTitleLower.includes("presentar") || textTitleLower.includes("saludo") || textTitleLower.includes("bienvenida")) {
    customTitle = `${topicTitle} - Conversational Spanish Essentials`;
    customExplanation = isArabic ?
      `أهلاً بك في درس صيغ الترحيب والتعارف الأساسية للاندماج في إسبانيا! ركيزة الدرس: **${topicTitle}**.\n\nتعتمد ثقافة إسبانيا على التواصل المفتوح واللطيف. ستبدأ المحادثات دائما بـ "Hola" (مرحباً) متبوعة بـ "¿Qué tal?" (كيف الحال؟). عند التعارف مع زملائك في السكن أو الجامعة، استخدم "Encantado" (فرصة سعيدة للرجل) أو "Encantada" (فرصة سعيدة للمرأة)، وعرّف عن نفسك بـ "Me llamo..." (اسمي...).` :
      isFrench ?
      `Bienvenue dans l'étude des formules d'accueil et de salutations en Espagne : **${topicTitle}**.\n\nEn Espagne, la communication est directe et très chaleureuse. On se salue par un joyeux 'Hola' (Salut) suivi de '¿Cómo estás?' (Comment ça va ?). Pour vous présenter à vos camarades espagnols, utilisez 'Me llamo...' (Je m'appelle) et dites 'Encantado' (Enchanté, pour un homme) ou 'Encantada' (Enchantée, pour une femme).` :
      `Welcome to the Greetings and Conversational Introductions masterclass: **${topicTitle}**.\n\nSpanish social culture is incredibly open, warm, and friendly. Conversations routinely begin with a cheery "Hola" (Hello) followed by "¿Qué tal?" (What's up / How are you?). When meeting local flatmates or university peers, introduce yourself using "Me llamo..." (My name is...) and politely add "Encantado" (Pleased to meet you, if masculine) or "Encantada" (if feminine).`;

    customVocab = [
      { spanish: "El Saludo", dynamicLang: isArabic ? "التحية" : isFrench ? "La Salutation" : "The Greeting", explanation: "Opening polite expressions such as Hola or Buenos días." },
      { spanish: "Mucho Gusto", dynamicLang: isArabic ? "سررت بلقائك" : isFrench ? "Enchanté / Ravi" : "Nice to meet you", explanation: "Universal polite formula used immediately upon meeting someone new." },
      { spanish: "¿Cómo te llamas?", dynamicLang: isArabic ? "ما اسمك؟" : isFrench ? "Comment t'appelles-tu ?" : "What is your name?", explanation: "Informal, essential direct question to ask a peer's identity." },
      { spanish: "El Apodo", dynamicLang: isArabic ? "اللقب" : isFrench ? "Le Surnom" : "The Nickname", explanation: "Common familiar short names used extensively by friends in Spain." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "ماذا تقول فتاة لتعبر عن 'سررت بلقائك' باحترام في إسبانيا؟" : isFrench ? "Que dit une fille pour exprimer 'Enchantée' ?" : "What does a female student say to mean 'Nice to meet you'?", options: ["Encantado", "Encantada", "Hola tú", "Mucho buenos"], correctIndex: 1 },
      { type: "fill-blank", question: "Hola, ¿cómo ___ (are) tú?", blankWord: "estás" },
      { type: "translation", question: "Translate 'My name is Carlos'", correctTranslation: "Me llamo Carlos" },
      { type: "conjugation", verb: "llamarse", pronouns: { yo: "me llamo", tu: "te llamas", el: "se llama" }, question: "Conjugate 'llamarse' for Yo" },
      { type: "writing", question: "Write a short introductory greetings dialogue between two new Madrid roommates.", prompt: "e.g., - Hola, me llamo Layla. - ¡Hola! Encantado, me llamo Walid." }
    ];
  } else if (textTitleLower.includes("color") || textTitleLower.includes("adjective") || textTitleLower.includes("agreement") || textTitleLower.includes("adjetivo")) {
    customTitle = `${topicTitle} - Colors & Describing Objects`;
    customExplanation = isArabic ?
      `مرحباً بك في درس الألوان وتطابق الصفات في اللغة الإسبانية! موضوعنا: **${topicTitle}**.\n\nفي الإسبانية، الصفات توضع **بعد** الاسم وتطابقه في الجنس والعدد. مثلاً، إذا كان الاسم مذكر جمع كـ "los coches" (السيارات)، تكون صفة اللون حمراء "rojos" لتصبح "los coches rojos". انتبه للألوان التي تنتهي بـ "e" مثل "verde" فهي لا تتأثر بالجنس بل بالعدد فقط ("el libro verde" -> "los libros verdes").` :
      isFrench ?
      `Bienvenue dans l'étude des couleurs et de l'accord des adjectifs : **${topicTitle}**.\n\nEn espagnol, les adjectifs se placent presque toujours **après** le nom et s'accordent obligatoirement en genre et en nombre avec lui. Exemple : 'la casa roja' (la maison rouge), 'los libros amarillos' (les livres jaunes). Les couleurs se terminant par 'e' comme 'verde' s'accordent en nombre mais restent invariables en genre.` :
      `Welcome to the Colors and Adjective Agreement workshop: **${topicTitle}**.\n\nIn Spanish, adjectives and colors are placed **after** the nouns they modify. They must match the gender (masculine/feminine) and number (singular/plural) of the noun. For example, "the red books" translates to "los libros rojos" (masculine plural). Colors ending in "e" like "verde" (green) don't change for gender, only for pluralization (e.g., "las mesas verdes").`;

    customVocab = [
      { spanish: "El Color", dynamicLang: isArabic ? "اللون" : isFrench ? "La Couleur" : "The Color", explanation: "Chromatic property applied to physical nouns." },
      { spanish: "Rojo", dynamicLang: isArabic ? "أحمر" : isFrench ? "Rouge" : "Red", explanation: "Vibrant primary color, changes style to roja/rojos/rojas based on agreement." },
      { spanish: "Verde", dynamicLang: isArabic ? "أخضر" : isFrench ? "Vert" : "Green", explanation: "Neutral gender color ending in -e, only adds -s for plural forms." },
      { spanish: "La Concordancia", dynamicLang: isArabic ? "التطابق" : isFrench ? "L'Accord" : "Agreement", explanation: "The rule forcing matching properties between a noun and its modifying adjectives." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "ما هو الجمع الصحيح لـ 'la mesa verde'؟" : isFrench ? "Quel est le pluriel correct de 'la mesa verde' ?" : "What is the correct plural form of 'la mesa verde'?", options: ["las mesas verdes", "los mesas verdes", "las mesas verdos", "las mesa verde"], correctIndex: 0 },
      { type: "fill-blank", question: "El coche ___ (red) es muy rápido.", blankWord: "rojo" },
      { type: "translation", question: "Translate 'The white books'", correctTranslation: "Los libros blancos" },
      { type: "conjugation", verb: "describir", pronouns: { yo: "describo", tu: "describes", el: "describe" }, question: "Conjugate 'describir' for Yo" },
      { type: "writing", question: "Write a short sentence describing three distinct colored items inside your Spain student bedroom.", prompt: "e.g., Tengo una cama blanca, un cuaderno azul y un libro rojo." }
    ];
  } else if (textTitleLower.includes("family") || textTitleLower.includes("relation") || textTitleLower.includes("familia") || textTitleLower.includes("pariente")) {
    customTitle = `${topicTitle} - Describing Domestic Circles & Family`;
    customExplanation = isArabic ?
      `أهلاً بك في درس العائلة وصيغ القرابة! موضوع الدراسة: **${topicTitle}**.\n\nتعتبي العائلة الإسبانية مترابطة جداً. سنتعلم اليوم كيفية الإشارة للأقارب: "padre" (أب)، "madre" (أم)، "hermano" (أخ)، "hijo" (ابن). سنستخدم الأفعال والمستندات للإشارة إلى أفراد أسرتك ووصف صلات القرابة والمهن.` :
      isFrench ?
      `Bienvenue dans le manuel d'étude de la famille et des liens de parenté : **${topicTitle}**.\n\nLa famille est au cœur de la vie espagnole. Aujourd'hui, nous apprenons à nommer vos proches : 'padre' (père), 'madre' (mère), 'hermano' (frère), 'hijo' (fils). C'est essentiel pour raconter votre histoire lors des présentations.` :
      `Welcome to your Spain Study Family and Kinship guide: **${topicTitle}**.\n\nFamily plays a massive role in standard Spanish cultural landscapes. Today we master core descriptors of relatives: "padre" (father), "madre" (mother), "hermano" (brother), and "hijo" (son). Practice describing your roots clearly for SIELE dialogue tasks.`;

    customVocab = [
      { spanish: "La Familia", dynamicLang: isArabic ? "العائلة" : isFrench ? "La Famille" : "The Family", explanation: "The household unit of closely related relatives." },
      { spanish: "El Hermano", dynamicLang: isArabic ? "الأخ" : isFrench ? "Le Frère" : "The Brother", explanation: "Sibling sharing the same mother and father." },
      { spanish: "Los Padres", dynamicLang: isArabic ? "الوالدان" : isFrench ? "Les Parents" : "The Parents", explanation: "Refers collectively to father and mother together." },
      { spanish: "El Pariente", dynamicLang: isArabic ? "القريب" : isFrench ? "Le Parent proche" : "The Relative", explanation: "Broad family connection, like aunts, uncles, and cousins." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "ما معنى كلمة 'Madre' باللغة الإسبانية؟" : isFrench ? "Que signifie 'Madre' ?" : "What is the English meaning of the Spanish word 'Madre'?", options: ["Mother", "Sister", "Uncle", "Niece"], correctIndex: 0 },
      { type: "fill-blank", question: "Mi ___ (brother) se llama Juan.", blankWord: "hermano" },
      { type: "translation", question: "Translate 'My parents live in Madrid'", correctTranslation: "Mis padres viven en Madrid" },
      { type: "conjugation", verb: "viver", pronouns: { yo: "vivo", tu: "vives", el: "vive" }, question: "Conjugate 'vivir' for Nosotros (vivimos)" },
      { type: "writing", question: "Describe your immediate family structure in three simple Spanish sentences.", prompt: "Introduce your parents' and siblings' names if applicable." }
    ];
  } else if (textTitleLower.includes("pronoun") || textTitleLower.includes("yo, tú, él") || textTitleLower.includes("pronombre")) {
    customTitle = `${topicTitle} - Subject Pronouns & Subjects`;
    customExplanation = isArabic ?
      `درس الضمائر الشخصية الفاعلة الأساسية في اللغة الإسبانية! موضوعنا: **${topicTitle}**.\n\nالضمائر الشخصية هي الكلمات التي تعبر عن فاعل الجملة (Yo = أنا، Tú = أنت، Él = هو، Ella = هي). انتبه إلى "Nosotros" (نحن للذكور/المختلط) و"Nosotras" (نحن للإناث فقط). في إسبانيا، نستخدم نادراً الضمائر الصريحة مثل "Yo" لأن علامات تصريف الأفعال تعبر كافياً عن الفاعل!` :
      isFrench ?
      `Bienvenue dans le module d'étude des pronoms personnels sujets : **${topicTitle}**.\n\nLes pronoms désignent le sujet de l'action : 'Yo' (Je), 'Tú' (Tu), 'Él' (Il), 'Ella' (Elle). Notez qu'en espagnol de la Péninsule, les pronoms sont souvent omis car les terminaisons des verbes suffisent amplement à identifier le sujet !` :
      `Welcome to your Subject Pronouns workbook page: **${topicTitle}**.\n\nSubject pronouns specify who carries out the action: "Yo" (I), "Tú" (You, informal), "Él" (He), and "Ella" (She). Note that in Peninsular Spanish, pronouns are usually omitted in speech, as the complex verb endings make it redundant.`;

    customVocab = [
      { spanish: "El Pronombre", dynamicLang: isArabic ? "الضمير" : isFrench ? "Le Pronom" : "The Pronoun", explanation: "Substitute word designating a noun subject directly." },
      { spanish: "Yo", dynamicLang: isArabic ? "أنا" : isFrench ? "Je" : "I", explanation: "First-person singular subject." },
      { spanish: "Nosotros", dynamicLang: isArabic ? "نحن" : isFrench ? "Nous" : "We (masc/mixed)", explanation: "First-person plural pronoun, changes to 'nosotras' for exclusively feminine groups." },
      { spanish: "Usted", dynamicLang: isArabic ? "حضرتك" : isFrench ? "Vous (sing. poli)" : "You (formal singular)", explanation: "Required for formal respectful address of elders or authorities in Spain." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "أي من الضمائر التالية يُستخدم لمخاطبة كبار السن باحترام؟" : isFrench ? "Quel pronom est utilisé pour s'adresser poliment à un aîné ?" : "Which pronoun is used to address elders or officials respectfully?", options: ["Tú", "Usted", "Yo", "Vosotros"], correctIndex: 1 },
      { type: "fill-blank", question: "___ (We, mixed) estudiamos español.", blankWord: "nosotros" },
      { type: "translation", question: "Translate 'She is an international student'", correctTranslation: "Ella es una estudiante internacional" },
      { type: "conjugation", verb: "ser", pronouns: { yo: "soy", tu: "eres", el: "es" }, question: "Conjugate 'ser' for Nosotros" },
      { type: "writing", question: "Write five primary pronouns in Spanish and couple them with their English equivalent meanings.", prompt: "Yo, tú, él, ella, nosotros..." }
    ];
  } else if (textTitleLower.includes("ser:") || textTitleLower.includes("estar:") || textTitleLower.includes("ser/estar") || textTitleLower.includes("ser vs estar")) {
    customTitle = `${topicTitle} - Mastering Ser vs Estar Conjugations`;
    customExplanation = isArabic ?
      `مرحباً بك في أصعب وأهم درس لغوي: الفرق المميز بين الفعلين Ser و Estar! درس اليوم: **${topicTitle}**.\n\nكلا الفعلين يعني "يكون" باللغة العربية، لكن استخداماتهما تختلف كلياً:\n1. **الفعل Ser (أصل دائم):** نستخدمه للصفات المستقرة، الهوية، الجنسية، والمهنة (مثلاً: "Yo soy estudiante" - أنا طالب، "Él es de Egipto" - هو من مصر).\n2. **الفعل Estar (حالة مؤقتة والموقع):** نستخدمه للموقع الجغرافي والحالات الصحية الراهنة (مثلاً: "El piso está en Madrid" - الشقة في مدريد، "Yo estoy cansado" - أنا متعب).` :
      isFrench ?
      `Bienvenue dans la leçon essentielle sur la distinction entre SER et ESTAR : **${topicTitle}**.\n\nCes deux verbes signifient 'Être'. \n1. **Ser (Permanent/Identité) :** Identité, nationalité, origine, métier stable (ex: 'Yo soy estudiante').\n2. **Estar (Temporaire/Situation) :** Émotions passagères, état de santé ou géolocalisation fixe (ex: 'Él está en Madrid', 'La fianza está pagada').` :
      `Welcome to the ultimate Ser vs Estar grammar class: **${topicTitle}**.\n\nWhile both average to "to be", they control radically different contexts in Spanish:\n1. **SER (Identity & Attributes):** Used for permanent characteristics, career, birthplace, and time (e.g., "Yo soy de El Cairo" - I am from Cairo).\n2. **ESTAR (Location & State):** Used for geographic location and current emotional or physical states (e.g., "Madrid está en España" - Madrid is in Spain; "La cocina está limpia" - The kitchen is clean).`;

    customVocab = [
      { spanish: "Ser", dynamicLang: isArabic ? "يكون (دائم)" : isFrench ? "Être (permanent)" : "To Be (permanent)", explanation: "Covers birthplace, nationality, name, and identity traits." },
      { spanish: "Estar", dynamicLang: isArabic ? "يكون (مؤقت/موقع)" : isFrench ? "Être (localité/état)" : "To Be (temporary)", explanation: "Covers health, location of buildings, and mood states." },
      { spanish: "La Identidad", dynamicLang: isArabic ? "الهوية" : isFrench ? "L'Identité" : "Identity", explanation: "Fixed individual traits necessitating 'ser'." },
      { spanish: "El Estado", dynamicLang: isArabic ? "الحالة" : isFrench ? "L'État de santé" : "State or Condition", explanation: "Transient status demanding 'estar' like el coche está roto." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "أي جملة تدل على تحديد الموقع الجغرافي السليم؟" : isFrench ? "Quelle phrase exprime une position géographique correcte ?" : "Which of these sentences correctly expresses geographical location?", options: ["Yo soy en Barcelona", "Yo estoy en Barcelona", "Yo tengo en Barcelona", "Yo voy de Barcelona"], correctIndex: 1 },
      { type: "fill-blank", question: "El agua ___ (is) fría hoy.", blankWord: "está" },
      { type: "translation", question: "Translate 'He is handsome and smart'", correctTranslation: "Él es guapo e inteligente" },
      { type: "conjugation", verb: "ser", pronouns: { yo: "soy", tu: "eres", el: "es" }, question: "Conjugate 'estar' for Yo" },
      { type: "writing", question: "Write two custom sentences showing the difference in meaning of 'La manzana es verde' vs 'La manzana está verde'.", prompt: "Think: permanent color vs temporary ripeness state." }
    ];
  } else if (textTitleLower.includes("ar verb") || textTitleLower.includes("er verb") || textTitleLower.includes("ir verb") || textTitleLower.includes("present tense") || textTitleLower.includes("regular") || textTitleLower.includes("stem-changing") || textTitleLower.includes("e->ie") || textTitleLower.includes("o->ue") || textTitleLower.includes("e->i") || textTitleLower.includes("conjug")) {
    customTitle = `${topicTitle} - Present Tense Conjugation Rules`;
    customExplanation = isArabic ?
      `أهلاً بك في مجمع قواعد تصريف الأفعال الإسبانية القياسية وغير القياسية في الحاضر البسيط! ركيزة الدرس: **${topicTitle}**.\n\nتتقسم الأفعال القياسية إلى ثلاث نهايات رئيسية:\n1. **الأفعال التي تنتهي بـ (-AR):** مثل (Hablar) -> تصرف بالتوالي مع الضمائر: (hablo, hablas, habla, hablamos, habláis, hablan).\n2. **النهايتان (-ER و -IR):** مثل (Comer / Vivir). تنحرف بعض الأفعال الشاذة "Stem-Changing" بتغير حرف العلة بداخل جذورها، مثل (Tener/Querer) فتتحول (e) إلى (ie) مع جميع الضمائر عدا Nosotros (مثال: yo quiero، tú quieres، nosotros queremos).` :
      isFrench ?
      `Manuel de conjugaison systématique de l'espagnol au présent de l'indicatif : **${topicTitle}**.\n\nLes verbes se répartissent en trois groupes de terminaisons : -AR (comme cantar), -ER (comme comer) et -IR (comme escribir). On étudie aussi les verbes à diphtongue (Stem-changing) où le radical se transforme au singulier et à la troisième personne du pluriel (ex: e->ie, o->ue).` :
      `Welcome to Present Tense Conjugation Mastery: **${topicTitle}**.\n\nAll Spanish verbs belong to three main conjugation classes ending in -ar, -er, or -ir. Regular verbs drop these endings to apply personal endings (e.g., -o, -as, -a...). Stem-changing verbs alter a vowel inside the core stem (except for Nosotros/Vosotros), such as vowel "e" becoming "ie" (e.g. Querer -> yo quiero, tú quieres, nosotros queremos).`;

    customVocab = [
      { spanish: "Hablar", dynamicLang: isArabic ? "يتكلم" : isFrench ? "Parler" : "To Speak", explanation: "Most iconic standard -AR verb." },
      { spanish: "Comer", dynamicLang: isArabic ? "يأكل" : isFrench ? "Manger" : "To Eat", explanation: "Core standard -ER verb." },
      { spanish: "Querer", dynamicLang: isArabic ? "يريد" : isFrench ? "Vouloir / Aimer" : "To Want / To Love", explanation: "Features a stem change where e shifts to ie (Yo quiero)." },
      { spanish: "El Infinitivo", dynamicLang: isArabic ? "المصدر" : isFrench ? "L'Infinitif" : "The Infinitive", explanation: "The base unmodified form of any Spanish verb." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "كيف تصرف الفعل 'querer' مع الضمير 'nosotros'؟" : isFrench ? "Comment conjugue-t-on 'querer' avec 'nosotros' ?" : "How do you conjugate 'querer' for 'nosotros'?", options: ["queremos", "quieremos", "quiero", "queren"], correctIndex: 0 },
      { type: "fill-blank", question: "Yo ___ (live) en España.", blankWord: "vivo" },
      { type: "translation", question: "Translate 'They eat delicious tapas'", correctTranslation: "Ellos comen tapas deliciosas" },
      { type: "conjugation", verb: "hablar", pronouns: { yo: "hablo", tu: "hablas", el: "habla" }, question: "Conjugate 'escribir' for Yo" },
      { type: "writing", question: "Draft three Spanish sentences using different regular verbs explaining what you study, where you eat and where you live.", prompt: "Use verbs like estudiar, comer, and vivir." }
    ];
  } else if (textTitleLower.includes("number") || textTitleLower.includes("número") || textTitleLower.includes("math") || textTitleLower.includes("cardinal") || textTitleLower.includes("ordinal")) {
    customTitle = `${topicTitle} - Numbers, Prices & Cardinal Rules`;
    customExplanation = isArabic ?
      `أهلاً بك في درس الأرقام الكاردينال والترتيبية والعمليات الرياضية الحسابية الأساسية! موضوعنا: **${topicTitle}**.\n\nالأرقام الأساسية هي (uno, dos, tres, cuatro, cinco...) بينما الأرقام الترتيبية لتحديد الطبقات أو الرتب هي (primero, segundo, tercero, cuarto...). الأرقام مهمة جداً لمعرفة تكلفة المنتجات، وحساب ثمن غرف السكن الطلابي باليورو والإحصائيات.` :
      isFrench ?
      `Maîtrisez les chiffres cardinaux et ordinaux pour calculer au quotidien : **${topicTitle}**.\n\nLes nombres cardinaux servent à compter (uno, dos, tres, diez...) tandis que les nombres ordinaux expriment l'ordre (primero, segundo, tercero...). C'est indispensable pour payer des frais de visa ou d'abonnement en Espagne.` :
      `Get ready to calculate in Spanish with numbers and basic math terms: **${topicTitle}**.\n\nCardinal numbers let us count objects (uno, dos, tres, cien...), whereas ordinal numbers rank items chronologically (primero, segundo, tercero...). Accurate numbering is crucial for understanding Euro prices, and checking address numbers in urban Spain corridors.`;

    customVocab = [
      { spanish: "Uno", dynamicLang: isArabic ? "واحد" : isFrench ? "Un" : "One", explanation: "The basic unit. Drops to 'un' before masculine singular nouns." },
      { spanish: "Cien", dynamicLang: isArabic ? "مئة" : isFrench ? "Cent" : "One hundred", explanation: "Standard numeric base, stays Cien unless counting larger units like ciento dos." },
      { spanish: "Primero", dynamicLang: isArabic ? "الأول" : isFrench ? "Premier" : "First", explanation: "First ordinal, drops to 'primer' перед masculine nouns." },
      { spanish: "La Suma", dynamicLang: isArabic ? "الجمع" : isFrench ? "L'Addition" : "Addition / Tally", explanation: "Basic math operation." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "ما هو المقابل الرياضي الصحيح لـ 'diez más cinco'؟" : isFrench ? "Quel est le résultat de 'dieez más cinco' ?" : "What is the numeric result of 'diez más cinco'?", options: ["diez", "quince", "veinte", "cincuenta"], correctIndex: 1 },
      { type: "fill-blank", question: "Tengo ___ (5) libros en la mesa.", blankWord: "cinco" },
      { type: "translation", question: "Translate 'The first year'", correctTranslation: "El primer año" },
      { type: "conjugation", verb: "sumar", pronouns: { yo: "sumo", tu: "sumas", el: "suma" }, question: "Conjugate 'sumar' for Yo" },
      { type: "writing", question: "Calculate spelling vocabulary equations: write down the Spanish word result of 20 + 30.", prompt: "Spell the word in Spanish." }
    ];
  } else if (textTitleLower.includes("time") || textTitleLower.includes("schedule") || textTitleLower.includes("day") || textTitleLower.includes("month") || textTitleLower.includes("calendar") || textTitleLower.includes("season") || textTitleLower.includes("date") || textTitleLower.includes("hora") || textTitleLower.includes("calendario")) {
    customTitle = `${topicTitle} - Telling Time, Dates & Calendar events`;
    customExplanation = isArabic ?
      `تعلم كيفية إخبار الوقت وتحديد المواعيد والتواريخ بالإسبانية لتنظيم جدولك الدراسي! تركيز الدرس: **${topicTitle}**.\n\n1. **السؤال عن الوقت:** نسأل دائما "¿Qué hora es?".\n2. **إخبار الوقت:** نستخدم "Es la" للساعة الواحدة فقط ("Es la una"). ونستخدم "Son las" لباقي الساعات ("Son las dos", "Son las tres").\n3. **الأيام والأشهر:** أيام الأسبوع (lunes, martes, miércoles...) تبدأ دائما بأداة تعريف مذكر "el" (مثلاً: "el lunes tengo examen" - يوم الاثنين لدي امتحان).` :
      isFrench ?
      `Bienvenue dans l'étude des heures, des jours et du calendrier scolaire : **${topicTitle}**.\n\nPour demander l'heure, dites '¿Qué hora es?'. Pour y répondre, utilisez 'Es la una' pour 1h, et 'Son las...' pour les autres heures (ex: 'Son las tres'). Les jours de la semaine (lunes, martes...) prennent toujours l'article masculin 'el'.` :
      `Master telling the time, requesting locations, and planning using seasons: **${topicTitle}**.\n\nTo ask for the time, say "¿Qué hora es?". We use "Es la una" (It is 1 o'clock), but "Son las" for all other hours (e.g., "Son las tres" - It is 3 o'clock). Days of the week like lunes, martes, miércoles are always masculine in Spanish, requiring the article "el" (e.g., "el lunes" - on Monday).`;

    customVocab = [
      { spanish: "¿Qué hora es?", dynamicLang: isArabic ? "كم الساعة؟" : isFrench ? "Quelle heure est-il ?" : "What time is it?", explanation: "The universal conversational inquiry for checking current hours." },
      { spanish: "El Lunes", dynamicLang: isArabic ? "يوم الاثنين" : isFrench ? "Le Lundi" : "Monday", explanation: "The primary academic workday on Spanish campuses." },
      { spanish: "El Mes", dynamicLang: isArabic ? "الشهر" : isFrench ? "Le Mois" : "The Month", explanation: "12 units composing the solar Gregorian calendar year." },
      { spanish: "La Cita", dynamicLang: isArabic ? "الموعد" : isFrench ? "Le Rendez-vous / Créneau" : "The Appointment / Date", explanation: "Crucial for police fingerprint cards or consulate queues in Spain." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "كيف تخبر شخصاً أن الساعة هي الثامنة والربع باحترام؟" : isFrench ? "Comment dit-on 'Il est huit heures et quart' ?" : "How do you say 'It is a quarter past eight' in Spanish?", options: ["Son las ocho y cuarto", "Es la una y cuarto", "Son las ocho menos cuarto", "Tengo ocho horas"], correctIndex: 0 },
      { type: "fill-blank", question: "El examen es el ___ (Monday) a las diez.", blankWord: "lunes" },
      { type: "translation", question: "Translate 'It is three o'clock'", correctTranslation: "Son las tres" },
      { type: "conjugation", verb: "fechar", pronouns: { yo: "fecho", tu: "fechas", el: "fecha" }, question: "Conjugate 'comenzar' for El (comienza)" },
      { type: "writing", question: "Write down your typical daily Spanish study routine schedule with times using simple formulas.", prompt: "e.g., Estudio español a las nueve de la mañana." }
    ];
  } else if (textTitleLower.includes("house") || textTitleLower.includes("room") || textTitleLower.includes("piso") || textTitleLower.includes("rent") || textTitleLower.includes("apartment") || textTitleLower.includes("furniture") || textTitleLower.includes("flat") || textTitleLower.includes("chore") || textTitleLower.includes("clean") || textTitleLower.includes("lease") || textTitleLower.includes("alquiler") || textTitleLower.includes("accommodation")) {
    customTitle = `${topicTitle} - Accommodation & Shared Student Flats`;
    customExplanation = isArabic ?
      `دليلك الشامل لاستئجار السكن الطلابي والغرف المشتركة في إسبانيا! محور الدرس: **${topicTitle}**.\n\nعند وصولك لإسبانيا، ستحتاج لاستئجار غرف شقة مشتركة (Piso compartido) وفهم بنود عقود الإيجار (Contrato de alquiler)، ومصطلحات الصيانة وغسل الملابس والأجهزة المنزلية.` :
      isFrench ?
      `Guide complet de la recherche d'appartement et de colocation étudiante en Espagne : **${topicTitle}**.\n\nApprendre à louer un appartement (Alquilar un piso) exige un vocabulaire solide pour comprendre les baux de location, négocier les meubles (muebles) et assumer les frais de nettoyage.` :
      `Welcome to your Spain Student Housing & Renting guide! Focus area: **${topicTitle}**.\n\nFinding a shared flat room (piso compartido) is one of the first survival steps for research scholars in cities like Madrid, Barcelona, or Sevilla. Understanding rental leases (contratos), deposit terms (fianza), and furniture names is critical.`;

    customVocab = [
      { spanish: "El Piso Compartido", dynamicLang: isArabic ? "الشقة المشتركة" : isFrench ? "La Colocation" : "Shared Flat", explanation: "The absolute standard housing solution for international scholars in Spain." },
      { spanish: "Alquilar", dynamicLang: isArabic ? "يستأجر" : isFrench ? "Louer" : "To Rent", explanation: "Verbal action of leasing flat premises in exchange for monthly fees." },
      { spanish: "La Fianza", dynamicLang: isArabic ? "المبلغ التأميني" : isFrench ? "La Caution / Dépôt" : "The Deposit", explanation: "An upfront refundable payment ensuring flat integrity, usually 1 month's rent." },
      { spanish: "La Habitación", dynamicLang: isArabic ? "الغرفة" : isFrench ? "La Chambre" : "The Bedroom", explanation: "Your private sleeping and study quarters inside shared apartments." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "ما معنى مصطلح 'Fianza' لمستأجر الشقة؟" : isFrench ? "Que signifie le terme 'Fianza' ?" : "What is the meaning of the rental term 'Fianza'?", options: ["Rental deposit", "Monthly gas bill", "Inhabited tax", "House key"], correctIndex: 0 },
      { type: "fill-blank", question: "El ___ (flat) tiene cuatro habitaciones.", blankWord: "piso" },
      { type: "translation", question: "Translate to Spanish: 'A big apartment'", correctTranslation: "Un piso grande" },
      { type: "conjugation", verb: "alquilar", pronouns: { yo: "alquilo", tu: "alquilas", el: "alquila" }, question: "Conjugate 'alquilar' for Yo" },
      { type: "writing", question: "Describe briefly in Spanish what your ideal flat has (e.g. bed, table, window).", prompt: "Use vocabulary terms like 'cama', 'mesa', 'ventana'." }
    ];
  } else if (textTitleLower.includes("food") || textTitleLower.includes("restaurant") || textTitleLower.includes("eat") || textTitleLower.includes("café") || textTitleLower.includes("tapas") || textTitleLower.includes("paella") || textTitleLower.includes("gastronom") || textTitleLower.includes("comer")) {
    customTitle = `${topicTitle} - Spanish Food, Cafés & Restaurants`;
    customExplanation = isArabic ?
      `مرحباً بك في عالم الغذاء الإسباني والمطاعم المتميزة! تركيز الدرس اليوم: **${topicTitle}**.\n\nتعتبر ثقافة الطعام وتناول الـ Tapas والـ Paella جزءاً لا يتجزأ من غنى الحياة الاجتماعية في إسبانيا. يجب دراسة تعابير الطلب بأدب، معرفة بوجبات اليوم وحلويات المطابخ الأندلسية الشهيرة.` :
      isFrench ?
      `Découvrez les saveurs de la cuisine espagnole et la communication au restaurant : **${topicTitle}**.\n\nLa gastronomie espagnole, avec ses tapas, tortillas et sa paella emblématique, fait partie intégrante de la culture. Apprenez à commander de l'eau, demander le serveur ou solliciter la note de façon polie.` :
      `Welcome to your Spanish Culinary & Restaurant study sheet! Focus area: **${topicTitle}**.\n\nSpanish food culture—including the world-famous "Paella", "Tortilla", and bar "Tapas"—is an essential pillar of socializing in Spain. Learn how to politely order foods, call the waiter (camarero), and request the check.`;

    customVocab = [
      { spanish: "El Camarero", dynamicLang: isArabic ? "النادل" : isFrench ? "Le Serveur" : "The Waiter", explanation: "The person serving customer orders inside bars or dining rooms." },
      { spanish: "La Cuenta", dynamicLang: isArabic ? "الفاتورة" : isFrench ? "L'Addition" : "The Check", explanation: "The requested mathematical tally of items consumed at a table." },
      { spanish: "Las Tapas", dynamicLang: isArabic ? "أطباق مقبلات صغيرة" : isFrench ? "Amuse-bouches" : "Appetizers / Small Plates", explanation: "Small side portions of savory food served traditionally with beverages in Spanish taverns." },
      { spanish: "La Tortilla", dynamicLang: isArabic ? "العجة الإسبانية بالبطاطس" : isFrench ? "L'Omelette espagnole" : "Spanish Potato Omelette", explanation: "Classic Spanish recipe with eggs and potatoes, an absolute campus staple." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "أي من العبارات تُستخدم لطلب الحساب باحترام؟" : isFrench ? "Comment demande-t-on la note au restaurant ?" : "How do you politely request the final check from a waiter?", options: ["La cuenta, por favor", "Hola tú", "Tengo dinero", "Quiero comer more"], correctIndex: 0 },
      { type: "fill-blank", question: "La ___ (paella) es un plato típico de Valencia.", blankWord: "paella" },
      { type: "translation", question: "Translate 'The delicious Spanish food'", correctTranslation: "La comida española deliciosa" },
      { type: "conjugation", verb: "comer", pronouns: { yo: "como", tu: "comes", el: "come" }, question: "Conjugate 'comer' for Yo" },
      { type: "writing", question: "Write a short sentence ordering water in Spanish.", prompt: "Use 'Un agua, por favor'." }
    ];
  } else if (textTitleLower.includes("university") || textTitleLower.includes("campus") || textTitleLower.includes("student") || textTitleLower.includes("class") || textTitleLower.includes("school") || textTitleLower.includes("visa") || textTitleLower.includes("academic") || textTitleLower.includes("matric") || textTitleLower.includes("registr") || textTitleLower.includes("asignatur") || textTitleLower.includes("beca") || textTitleLower.includes("título") || textTitleLower.includes("homolog")) {
    customTitle = `${topicTitle} - Spanish Academic Registration & Visas`;
    customExplanation = isArabic ?
      `دليلك للدراسة والحياة الأكاديمية والتسجيل في الجامعات الإسبانية! موضوع الدراسة: **${topicTitle}**.\n\nتتطلب الدراسة في إسبانيا معرفة مصطلحات التسجيل الجامعي (Matrícula)، والمحاضرات الفنية، وخطابات الفيزا والقبول الأكاديمي لمقابلة قنصليات إسبانيا في الوطن العربي.` :
      isFrench ?
      `Le guide de l'inscription et de la vie universitaire sur les campus espagnols : **${topicTitle}**.\n\nNaviguer dans les démarches d'inscription administrative (Matrícula) et de visa d'études espagnol requiert des connaissances rigoureuses des termes universitaires pour communiquer avec les facultés.` :
      `Welcome to your Academic Life & Spain Campus helper! Today studying: **${topicTitle}**.\n\nUniversity enrollment processes (Matrícula), academic degrees, exam periods, and counselor letters represent the bulk of legal requirements for non-EU scholars residing in Spain for education.`;

    customVocab = [
      { spanish: "La Matrícula", dynamicLang: isArabic ? "التسجيل / الرسوم" : isFrench ? "L'Inscription" : "University Enrollment", explanation: "Official registration in university courses, involving semester payments." },
      { spanish: "La Universidad", dynamicLang: isArabic ? "الجامعة" : isFrench ? "L'Université" : "The University", explanation: "Higher education campuses providing degree pathways (Grado, Máster)." },
      { spanish: "La Beca", dynamicLang: isArabic ? "المنحة الدراسية" : isFrench ? "La Bourse" : "The Scholarship", explanation: "Financial assistance program funding foreign student tuition expenses." },
      { spanish: "El Visado", dynamicLang: isArabic ? "التأشيرة" : isFrench ? "Le Visa d'études" : "The Student Visa", explanation: "The required legal sticker printed inside your passport enabling entry into Spain." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "ماذا تعني كلمة 'Matrícula' بالنسبة للطالب؟" : isFrench ? "Que signifie le terme 'Matrícula' ?" : "What does the academic term 'Matrícula' stand for?", options: ["University enrollment", "Library loan card", "Train schedule sheet", "Student visa stamp"], correctIndex: 0 },
      { type: "fill-blank", question: "El estudiante va a la ___ (university) en Sevilla.", blankWord: "universidad" },
      { type: "translation", question: "Translate: 'The scholar visa'", correctTranslation: "El visado de estudiante" },
      { type: "conjugation", verb: "estudiar", pronouns: { yo: "estudio", tu: "estudias", el: "estudia" }, question: "Conjugate 'estudiar' for Yo" },
      { type: "writing", question: "Write down the name of your target city in Spain and what you intend to study.", prompt: "e.g., Yo estudio en Madrid, ingeniería." }
    ];
  } else if (textTitleLower.includes("profession") || textTitleLower.includes("work") || textTitleLower.includes("job") || textTitleLower.includes("workplace") || textTitleLower.includes("cv") || textTitleLower.includes("resume")) {
    customTitle = `${topicTitle} - Job Search & Careers in Spain`;
    customExplanation = isArabic ?
      `درس المهن والبحث عن عمل وصياغة السيرة الذاتية (CV) للطلاب في إسبانيا! موضوعنا: **${topicTitle}**.\n\nيصرح قانون العمل الإسباني الحديث للطلاب الدوليين العمل بدوام جزئي يصل إلى 30 ساعة أسبوعياً. ستحتاج لصياغة سيرة ذاتية احترافية باللغة الإسبانية، والتعرف على وكالات التوظيف ومحركات العمل.` :
      isFrench ?
      `Recherche d'emploi et rédaction de CV en Espagne : **${topicTitle}**.\n\nLa législation espagnole récente permet aux étudiants de travailler à temps partiel jusqu'à 30 heures par semaine. Un CV structuré au format espagnol (Sobre Mí, Experiencia) et un profil LinkedIn optimisé sont essentiels.` :
      `Get ready for careers, local jobs, and drafting Spanish CV models: **${topicTitle}**.\n\nRecent Spanish immigration deregulation enables international student visa holders to engage in part-time labor up to 30 hours weekly. Crafting a beautiful Spanish-compliant resume with specialized vocabulary is key to securing jobs.`;

    customVocab = [
      { spanish: "El Trabajo", dynamicLang: isArabic ? "العمل" : isFrench ? "Le Travail / Emploi" : "The Job / Work", explanation: "Employment that provides income during your studies in Spain." },
      { spanish: "Sueldo", dynamicLang: isArabic ? "الراتب" : isFrench ? "Le Salaire" : "Salary / Wages", explanation: "Calculated monthly income compensated for professional work." },
      { spanish: "El Currículum", dynamicLang: isArabic ? "السيرة الذاتية" : isFrench ? "Le CV" : "The Resume/CV", explanation: "Standard document detailing your academic and career trajectory for recruiters." },
      { spanish: "La Entrevista", dynamicLang: isArabic ? "المقابلة الشخصية" : isFrench ? "L'Entretien d'embauche" : "The Job Interview", explanation: "The live meeting with recruiters to assess fit for a specific position." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "كم عدد الساعات المسموح بها قانونياً لعمل الطالب أسبوعياً في إسبانيا؟" : isFrench ? "Combien d'heures par semaine un étudiant étranger peut-il travailler en Espagne ?" : "How many hours weekly can a student legally work in Spain?", options: ["Up to 10 hours", "Up to 30 hours", "Without limit", "Work is fully prohibited"], correctIndex: 1 },
      { type: "fill-blank", question: "Busco un ___ (job) de media jornada en Madrid.", blankWord: "trabajo" },
      { type: "translation", question: "Translate 'The Spanish resume'", correctTranslation: "El currículum español" },
      { type: "conjugation", verb: "trabajar", pronouns: { yo: "trabajo", tu: "trabajas", el: "trabaja" }, question: "Conjugate 'trabajar' for Yo" },
      { type: "writing", question: "Describe your professional skills in two Spanish sentences for a local Madrid retail job application.", prompt: "Mention languages and tech tools." }
    ];
  } else if (textTitleLower.includes("bank") || textTitleLower.includes("euro") || textTitleLower.includes("pay") || textTitleLower.includes("cash") || textTitleLower.includes("tarjeta") || textTitleLower.includes("cuenta")) {
    customTitle = `${topicTitle} - Banking, Expenses & Euro Currency`;
    customExplanation = isArabic ?
      `أهلاً بك في درس المعاملات البنكية وإدارة النفقات باليورو! ركيزة الدرس: **${topicTitle}**.\n\nسيحتاج كل مغترب في إسبانيا لفتح حساب بنكي (Cuenta de ahorros) لاستلام الحوالات ودفع الفواتير. سنتعلم كيفية السؤال عن أسعار الصرف، وعمولات الحسابات الأساسية.` :
      isFrench ?
      `Gérez vos finances, opérations bancaires et paiements en Euros : **${topicTitle}**.\n\nOuvrir un compte bancaire espagnol est l'une des formalités primordiales. Apprenez à gérer les cartes de débit (Tarjeta), les virements bancaires et à utiliser les distributeurs automatiques (Cajero).` :
      `Welcome to your student numeric, arithmetic, and banking worksheet: **${topicTitle}**.\n\nMastering banking terminology is essential for opening a Spanish student bank account, paying tuition fees, and operating with Euro cash or online cards daily on Spain's local network.`;

    customVocab = [
      { spanish: "La Cuenta Bancaria", dynamicLang: isArabic ? "الحساب البنكي" : isFrench ? "Le Compte Bancaire" : "Bank Account", explanation: "Necessary credential for foreign students residing long-term in Spain." },
      { spanish: "El Euro", dynamicLang: isArabic ? "اليورو" : isFrench ? "L'Euro" : "The Euro", explanation: "The official standard monetary currency in Spain and the EU." },
      { spanish: "La Tarjeta", dynamicLang: isArabic ? "البطاقة الائتمانية" : isFrench ? "La Carte de crédit" : "The Card", explanation: "Plastic card used to process cashless transactions at point-of-sale terminals." },
      { spanish: "El Cajero", dynamicLang: isArabic ? "الصراف الآلي / صراف البنك" : isFrench ? "Le Distributeur / Guichet" : "The ATM / Teller", explanation: "The physical screen-integrated machine used to draw physical paper cash." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "ما هي البطاقة التي نستخدمها في الدفع؟" : isFrench ? "Quel outil utilise-t-on pour payer sans espèces ?" : "What do we use to pay digitially on terminal systems?", options: ["La tarjeta", "El libro", "La mesa", "El coche"], correctIndex: 0 },
      { type: "fill-blank", question: "Quiero abrir una ___ (bank account) de estudiante.", blankWord: "cuenta" },
      { type: "translation", question: "Translate 'I don't have Euro cash'", correctTranslation: "No tengo euros en efectivo" },
      { type: "conjugation", verb: "pagar", pronouns: { yo: "pago", tu: "pagas", el: "paga" }, question: "Conjugate 'pagar' for Yo" },
      { type: "writing", question: "Write a short sentence asking a cashier if you can pay with card.", prompt: "Use '¿Puedo pagar con tarjeta?'." }
    ];
  } else if (textTitleLower.includes("sport") || textTitleLower.includes("exercise") || textTitleLower.includes("play") || textTitleLower.includes("music") || textTitleLower.includes("instrument") || textTitleLower.includes("hobby") || textTitleLower.includes("free time") || textTitleLower.includes("leisure") || textTitleLower.includes("ocio")) {
    customTitle = `${topicTitle} - Hobbies, Sports & Leisure Time`;
    customExplanation = isArabic ?
      `درس الهوايات، الرياضات، وأنشطة أوقات الفراغ بالإسبانية! ركيزة الدرس: **${topicTitle}**.\n\nلإجراء صداقات حقيقية في إسبانيا، ستحتاج للتحدث عن اهتماماتك المفضلة: "fútbol" (كرة القدم، الرياضة الأشهر إسبانياً)، "música" (الموسيقى)، أو "tocar un instrumento" (عزف آلة موسيقية مثل الجيتار الإسباني العريق).` :
      isFrench ?
      `Bienvenue dans l'étude des loisirs, des sports et du temps libre : **${topicTitle}**.\n\nParler de vos passions est le meilleur moyen d'échanger avec des camarades. Nous étudions ici le football (fútbol), la musique (música) et l'expression de vos passe-temps ('Me gusta...').` :
      `Let's talk about hobbies, musical tastes, and physical sports exercise: **${topicTitle}**.\n\nDeveloping strong friendships in Spain relies heavily on sharing personal interests or "pasatiempos". Soccer "el fútbol" dominates, but enjoying live "música" and "viajar" (traveling) are highly shared campus passions.`;

    customVocab = [
      { spanish: "El Deporte", dynamicLang: isArabic ? "الرياضة" : isFrench ? "Le Sport" : "The Sport", explanation: "Physical athleticism which fosters team spirit or competitive games." },
      { spanish: "El Pasatiempo", dynamicLang: isArabic ? "الهواية" : isFrench ? "Le Passe-temps" : "The Hobby", explanation: "Pleasurable activities practiced during free time." },
      { spanish: "El Fútbol", dynamicLang: isArabic ? "كرة القدم" : isFrench ? "Le Football" : "Soccer/Football", explanation: "The absolute dominant national sport and social connector across Spain." },
      { spanish: "La Guitarra", dynamicLang: isArabic ? "الجيتار" : isFrench ? "La Guitare" : "The Guitar", explanation: "Iconic Spanish string musical instrument famous in traditional Flamenco." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "ما هي اللعبة الأكثر شعبية في إسبانيا؟" : isFrench ? "Quel est le sport le plus populaire en Espagne ?" : "Which of these sports forms the biggest social connector in Spain?", options: ["El fútbol", "El hockey", "El béisbol", "El cricket"], correctIndex: 0 },
      { type: "fill-blank", question: "En mi tiempo libre me gusta ___ (to play) al tenis.", blankWord: "jugar" },
      { type: "translation", question: "Translate 'I love listening to Spanish music'", correctTranslation: "Me encanta escuchar música española" },
      { type: "conjugation", verb: "jugar", pronouns: { yo: "juego", tu: "juegas", el: "juega" }, question: "Conjugate 'jugar' for Yo" },
      { type: "writing", question: "Write three sentences describing your two favorite hobbies using the 'Me gusta...' structure.", prompt: "e.g., Me gusta leer y me gusta jugar al fútbol." }
    ];
  } else if (textTitleLower.includes("weather") || textTitleLower.includes("climate") || textTitleLower.includes("rain") || textTitleLower.includes("temperature") || textTitleLower.includes("sol") || textTitleLower.includes("tiempo")) {
    customTitle = `${topicTitle} - Weather Systems & Seasons in Spain`;
    customExplanation = isArabic ?
      `درس حالات الطقس والفصول والمناخ المتنوع في إسبانيا! ركيزة الدرس: **${topicTitle}**.\n\nتتميز إسبانيا بتنوع مناخي شاسع: مشمس وحار في الجنوب الأندلسي، لكنه ممطر وبارد رطب في الشمال الجاليكي. نستخدم صيغ هامة لوصف الجو: "Hace sol" (الجو مشمس)، "Hace frío" (الجو بارد)، "Está lloviendo" (إنها تمطر).` :
      isFrench ?
      `Comprendre la météo, les saisons et les dynamiques climatiques : **${topicTitle}**.\n\nL'Espagne bénéficie d'une grande variété climatique : sec et chaud au Sud, plus frais et humide au Nord galicien. On exprime le temps par des locutions comme : 'Hace calor' (Il fait chaud) ou 'Está nublado' (C'est nuageux).` :
      `Learn about weather terms, atmospheric changes and seasons: **${topicTitle}**.\n\nSpain exhibits a highly diverse climate: scorching hot and sun-drenched in southern Andalucía, yet surprisingly wet and chilly in the northern Green Spain regions like Galicia. Expressions like "Hace sol" (It is sunny) and "Está lloviendo" (It is raining) are daily constants.`;

    customVocab = [
      { spanish: "El Tiempo", dynamicLang: isArabic ? "الطقس / الوقت" : isFrench ? "La Météo / Le Temps" : "The Weather", explanation: "Physical atmospheric states or temperature measurements." },
      { spanish: "Hace Calor", dynamicLang: isArabic ? "الجو حار" : isFrench ? "Il fait chaud" : "It is hot", explanation: "Idiomatic expression using 'hacer' to denote warm temperatures." },
      { spanish: "El Verano", dynamicLang: isArabic ? "الصيف" : isFrench ? "L'Été" : "Summer", explanation: "The sunny seasonal quarter when Spanish beaches become highly crowded." },
      { spanish: "La Lluvia", dynamicLang: isArabic ? "المطر" : isFrench ? "La Pluie" : "The Rain", explanation: "Precipitation dominant in northern Galicia and humid Asturias." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "كيف تصف الجو عندما يكون مشمساً بالإسبانية؟" : isFrench ? "Comment dit-on 'Il fait beau/soleil' ?" : "How do you express 'It is sunny' in Spanish?", options: ["Hace sol", "Hace frío", "Está nevando", "Tengo sol"], correctIndex: 0 },
      { type: "fill-blank", question: "En invierno hace mucho ___ (cold).", blankWord: "frío" },
      { type: "translation", question: "Translate 'It is raining in Madrid today'", correctTranslation: "Está lloviendo en Madrid hoy" },
      { type: "conjugation", verb: "llover", pronouns: { yo: "lluevo", tu: "llueves", el: "llueve" }, question: "Conjugate third-person 'llover' for El (llueve)" },
      { type: "writing", question: "Describe your favorite season of the year in Spain (Summer, Autumn, Winter, Spring) and why.", prompt: "Mention features like solar heat or snow." }
    ];
  } else if (textTitleLower.includes("clothing") || textTitleLower.includes("style") || textTitleLower.includes("size") || textTitleLower.includes("fashion") || textTitleLower.includes("vestir") || textTitleLower.includes("ropa")) {
    customTitle = `${topicTitle} - Clothing, Styles & Shopper Sizes`;
    customExplanation = isArabic ?
      `أهلاً بك في عالم الأزياء والملابس والمقاسات وطرق التسوق في المتاجر الإسبانية! موضوعنا: **${topicTitle}**.\n\nسنتعرف على أسماء الملابس الأساسية: "la camisa" (القميص)، "los pantalones" (البنطال)، "los zapatos" (الأحذية). لطلب مقاس ملائم عند التسوق، استخدم السؤال التالي: "¿Tiene una talla más grande/pequeña?" (هل لديك مقاس أكبر/أصغر؟).` :
      isFrench ?
      `S'habiller, choisir sa taille et faire du shopping de mode : **${topicTitle}**.\n\nLa mode est importante en Espagne, patrie d'Inditex (Zara). Apprenez à nommer vos vêtements : 'la camisa' (chemise), 'los pantalones' (pantalon), et à demander votre taille d'ajustement ('la talla').` :
      `Welcome to your Spanish Fashion, Apparel, and Sizing workshop: **${topicTitle}**.\n\nSpain, being home to massive textile conglomerates (like Inditex/Zara), holds a prominent position in fashion. Mastering words like "camisa" (shirt), "pantalones" (trousers), and sizing terms like "la talla" is highly useful when shopping in local retail sectors.`;

    customVocab = [
      { spanish: "La Ropa", dynamicLang: isArabic ? "الملابس" : isFrench ? "Les Vêtements" : "The Clothes", explanation: "General collective word signifying garments worn on the body." },
      { spanish: "La Talla", dynamicLang: isArabic ? "المقاس" : isFrench ? "La Taille de vêtement" : "The Size", explanation: "Standard clothing sizing metrics (S, M, L, XL) used in shopping." },
      { spanish: "La Camisa", dynamicLang: isArabic ? "القميص" : isFrench ? "La Chemise" : "The Shirt", explanation: "Buttoned formal or casual torso shirt." },
      { spanish: "Los Zapatos", dynamicLang: isArabic ? "الأحذية" : isFrench ? "Les Chaussures" : "The Shoes", explanation: "Leather or rubber protective footwear." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "ما هي الكلمة الإسبانية لطلب 'مقاس الملابس'؟" : isFrench ? "Quel terme désigne la taille de vêtements ?" : "What is the Spanish word designating garments size?", options: ["La talla", "El metro", "La fianza", "La cuenta"], correctIndex: 0 },
      { type: "fill-blank", question: "Me gusta llevar ___ (trousers) vaqueros.", blankWord: "pantalones" },
      { type: "translation", question: "Translate 'A black shirt'", correctTranslation: "Una camisa negra" },
      { type: "conjugation", verb: "vestir", pronouns: { yo: "visto", tu: "vistes", el: "viste" }, question: "Conjugate 'vestir' for Yo" },
      { type: "writing", question: "Describe what you are wearing today in Spanish.", prompt: "Include colors and at least two garments." }
    ];
  } else if (textTitleLower.includes("body") || textTitleLower.includes("appearance") || textTitleLower.includes("personality") || textTitleLower.includes("health") || textTitleLower.includes("pharmacy") || textTitleLower.includes("doctor") || textTitleLower.includes("emergency") || textTitleLower.includes("enfermedad") || textTitleLower.includes("farmacia") || textTitleLower.includes("dolor") || textTitleLower.includes("medico")) {
    customTitle = `${topicTitle} - Health, Body Parts & Patient Care`;
    customExplanation = isArabic ?
      `دليلك لزيارة الصيدلية والطبيب ووصف أعراض الألم الجسدي بالإسبانية! ركيزة الدرس: **${topicTitle}**.\n\nعند شعورك بالتعب أو المرض، يمكنك الذهاب إلى صيدلية (Farmacia) أو مركز صحي كطالب. للتعبير عن الألم، نستخدم صيغة ثنائية خاصة: "Doler" (يؤلمني). فمثلاً: "Me duele la cabeza" (تؤلمني رأسي).` :
      isFrench ?
      `Guide de santé, anatomie humaine et consultations médicales : **${topicTitle}**.\n\nEn cas de maladie, savoir exprimer la douleur est crucial. On utilise le verbe 'Doler' : 'Me duele la cabeza' (J'ai mal à la tête). Vous aurez aussi besoin de vocabulaire pour visiter une pharmacie (Farmacia).` :
      `Everything you need to visit a doctor, purchase items at pharmacies, or describe symptoms: **${topicTitle}**.\n\nAccessing Spanish public healthcare or calling emergency numbers requires describing symptoms clearly. The verb "doler" (to hurt) works like gustar: "Me duele la cabeza" (My head hurts) or "Me duelen las piernas" (My legs hurt).`;

    customVocab = [
      { spanish: "La Farmacia", dynamicLang: isArabic ? "الصيدلية" : isFrench ? "La Pharmacie" : "The Pharmacy", explanation: "Green-cross local shop dispensing medication in Spanish districts." },
      { spanish: "Doler", dynamicLang: isArabic ? "يؤلم" : isFrench ? "Faire mal" : "To Hurt", explanation: "Verb used structurally inside expressions of pain like me duele." },
      { spanish: "La Cabeza", dynamicLang: isArabic ? "الرأس" : isFrench ? "La Tête" : "The Head", explanation: "Highest anatomical body region." },
      { spanish: "El Médico", dynamicLang: isArabic ? "الطبيب" : isFrench ? "Le Médecin" : "The MD / Doctor", explanation: "Qualified healthcare official reviewing client health." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "كيف تخبر الطبيب أن رأسك يؤلمك باحترام؟" : isFrench ? "Comment dit-on 'J'ai mal à la tête' ?" : "How do you explain 'My head hurts' in Spanish?", options: ["Me duele la cabeza", "Tengo cabeza grande", "Mucho cabeza malo", "La cabeza está rota"], correctIndex: 0 },
      { type: "fill-blank", question: "El médico trabaja en el ___ (hospital).", blankWord: "hospital" },
      { type: "translation", question: "Translate 'I need a pill for pain'", correctTranslation: "Necesito una pastilla para el dolor" },
      { type: "conjugation", verb: "doler", pronouns: { yo: "duelo", tu: "dueles", el: "duele" }, question: "Conjugate third-person singular 'doler' for El/Ella (duele)" },
      { type: "writing", question: "Draft a simulated brief email to your Spanish professor informing them you are sick and cannot attend class tomorrow.", prompt: "Keep it formal, e.g., Estimado profesor, no puedo venir..." }
    ];
  } else if (textTitleLower.includes("city") || textTitleLower.includes("directions") || textTitleLower.includes("transport") || textTitleLower.includes("bus") || textTitleLower.includes("metro") || textTitleLower.includes("airport") || textTitleLower.includes("travel") || textTitleLower.includes("taxi") || textTitleLower.includes("boleto") || textTitleLower.includes("viaje") || textTitleLower.includes("mapa")) {
    customTitle = `${topicTitle} - City Navigation & Metro Commutes`;
    customExplanation = isArabic ?
      `دليلك للتنقل داخل المترو والحافلة وطلب الاتجاهات في مدن إسبانيا! ركيزة الدرس: **${topicTitle}**.\n\nيعتبر التنقل في مدن إسبانيا كـ مدريد و برشلونة تجربة ممتعة بفضل شبكات النقل المتقدمة. للسؤال عن مكان ما، قل: "¿Dónde está la estación de metro más cercana?" (أين توجد أقرب محطة مترو؟).` :
      isFrench ?
      `Naviguer dans la ville, utiliser le métro et demander son chemin : **${topicTitle}**.\n\nLes réseaux de transport de Madrid et Barcelone sont exceptionnels. Pour demander votre chemin, utilisez '¿Dónde está...?' (Où est... ?). Pensez aussi à acheter le ticket de transport étudiant ('el abono').` :
      `Master getting around the city, buying metro tickets and boarding flights: **${topicTitle}**.\n\nSpanish urban centers possess incredibly clean and rapid train and bus networks. To ask for directions on foot, say "¿Cómo llego a la catedral?" (How do I get to the cathedral?) or look for "la estación de metro" (the metro station).`;

    customVocab = [
      { spanish: "La Estación de Metro", dynamicLang: isArabic ? "محطة المترو" : isFrench ? "La Station de métro" : "The Metro Station", explanation: "Underground transit terminal vital for daily campus commutes." },
      { spanish: "El Billete", dynamicLang: isArabic ? "التذكرة" : isFrench ? "Le Ticket de transport" : "The Ticket", explanation: "The physical slip or card loaded with single or multi-ride travel fare." },
      { spanish: "Girar a la izquierda", dynamicLang: isArabic ? "ينعطف يساراً" : isFrench ? "Tourner à gauche" : "To turn left", explanation: "Critical spatial navigation instruction." },
      { spanish: "Derecho", dynamicLang: isArabic ? "مستقيم" : isFrench ? "Tout droit" : "Straight ahead", explanation: "Adverb meaning moving onward without any side angles." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "كيف تسأل بالإسبانية 'أين محطة القطار؟' باحترام؟" : isFrench ? "Comment demande-t-on 'Où est la gare ?' ?" : "How do you correctly ask 'Where is the train station?'", options: ["¿Dónde está la estación de tren?", "Quiero comer tren", "No hay estación", "El tren está cerrado"], correctIndex: 0 },
      { type: "fill-blank", question: "El autobús va al ___ (airport).", blankWord: "aeropuerto" },
      { type: "translation", question: "Translate 'Go straight and turn left'", correctTranslation: "Ve derecho y gira a la izquierda" },
      { type: "conjugation", verb: "viajar", pronouns: { yo: "viajo", tu: "viajas", el: "viaja" }, question: "Conjugate 'viajar' for Yo" },
      { type: "writing", question: "Draft a simple set of directions in Spanish guiding a lost traveler from the metro to the university gate.", prompt: "Use 've derecho', 'gira', 'calle'." }
    ];
  } else if (textTitleLower.includes("animals") || textTitleLower.includes("pets") || textTitleLower.includes("dog") || textTitleLower.includes("cat") || textTitleLower.includes("animal") || textTitleLower.includes("mascotas")) {
    customTitle = `${topicTitle} - Animals & Pets Vocabulary`;
    customExplanation = isArabic ?
      `تعلم مصطلحات الحيوانات البرية والأليفة بالإسبانية! ركيزة الدرس: **${topicTitle}**.\n\nيمتلك الكثير من الإسبان حيوانات أليفة في منازلهم (Mascotas)، وأشهرها الكلب "el perro" والقط "el gato". سنتعلم كيفية الإشارة إليها ووصف سلوكها العفوي.` :
      isFrench ?
      `Découvrez le vocabulaire des animaux domestiques et sauvages : **${topicTitle}**.\n\nLes animaux de compagnie ('las mascotas') sont très appréciés en Espagne, en particulier le chien ('el perro') et le chat ('el gato'). Apprenons leurs caractéristiques principales.` :
      `Master the ultimate animal and pet descriptors in Spanish: **${topicTitle}**.\n\nMany flatmates in Spain own domestic pets "las mascotas", most frequently "el perro" (dog) or "el gato" (cat). We will learn key terminology to describe them.`;

    customVocab = [
      { spanish: "El Perro", dynamicLang: isArabic ? "الكلب" : isFrench ? "Le Chien" : "The Dog", explanation: "Loyal canine domestic pet commonly walked in Spanish parks." },
      { spanish: "El Gato", dynamicLang: isArabic ? "القط" : isFrench ? "Le Chat" : "The Cat", explanation: "Graceful and independent feline companion." },
      { spanish: "El Pájaro", dynamicLang: isArabic ? "الطائر" : isFrench ? "L'Oiseau" : "The Bird", explanation: "Avian flying species." },
      { spanish: "Las Mascotas", dynamicLang: isArabic ? "الحيوانات الأليفة" : isFrench ? "Les Animaux de compagnie" : "The Pets", explanation: "Animals integrated into loving human households." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "ما هو الاسم الإسباني لحيوان القط الأليف؟" : isFrench ? "Quel est le nom espagnol du chat ?" : "What is the Spanish name for a feline companion?", options: ["El gato", "El perro", "El pájaro", "El caballo"], correctIndex: 0 },
      { type: "fill-blank", question: "Tengo un ___ (dog) muy inteligente.", blankWord: "perro" },
      { type: "translation", question: "Translate 'The birds sing in the park'", correctTranslation: "Los pájaros cantan en el parque" },
      { type: "conjugation", verb: "cuidar", pronouns: { yo: "cuido", tu: "cuidas", el: "cuida" }, question: "Conjugate 'cuidar' for Yo" },
      { type: "writing", question: "Write a short sentence indicating if you prefer dogs or cats and why.", prompt: "e.g., Prefiero los gatos porque son tranquilos." }
    ];
  } else if (textTitleLower.includes("culture") || textTitleLower.includes("highlight") || textTitleLower.includes("regional") || textTitleLower.includes("history") || textTitleLower.includes("literature") || textTitleLower.includes("art") || textTitleLower.includes("museum") || textTitleLower.includes("fallas") || textTitleLower.includes("festival") || textTitleLower.includes("siesta") || textTitleLower.includes("quijote") || textTitleLower.includes("lorca") || textTitleLower.includes("flamenco")) {
    customTitle = `${topicTitle} - Spanish Culture & Traditions`;
    customExplanation = isArabic ?
      `دروس في الثقافة الإسبانية العريقة، الفنون، ومهرجانات المحافظات! ركيزة الدرس: **${topicTitle}**.\n\nتعتبي الثقافة الإسبانية إرثاً غنياً يجمع بين الموسيقى الأندلسية، ورقصة الـ Flamenco الشعبية الحماسية، ومهرجانات شهيرة مثل "Las Fallas" في فالنسيا، والأعمال الأدبية الضخمة كـ Don Quijote لـ Cervantes.` :
      isFrench ?
      `Découvrez la richesse culturelle, historique et artistique de l'Espagne : **${topicTitle}**.\n\nL'Espagne regorge d'un héritage inestimable, de la danse Flamenco andalouse aux fêtes régionales spectaculaires comme Las Fallas ou La Tomatina, en passant par de grands écrivains comme Cervantes.` :
      `Immerse yourself in rich Spanish history, regional arts and massive festivals: **${topicTitle}**.\n\nSpain offers deep cultural milestones, including the vibrant Andalusian dance "Flamenco", regional holiday events like Valencia's "Fallas", and immortal authors like Miguel de Cervantes who wrote Don Quixote.`;

    customVocab = [
      { spanish: "El Flamenco", dynamicLang: isArabic ? "الفلامنكو" : isFrench ? "Le Flamenco" : "Flamenco", explanation: "Intense emotional music and dance style originating from Andalusian roots." },
      { spanish: "El Museo", dynamicLang: isArabic ? "المتحف" : isFrench ? "Le Musée" : "The Museum", explanation: "Exhibition halls displaying masterworks like Madrid's El Prado and Reina Sofía." },
      { spanish: "Las Fallas", dynamicLang: isArabic ? "مهرجان الفالاس في فالنسيا" : isFrench ? "Les Fallas de Valence" : "Las Fallas", explanation: "Stunning spring festival of giant artistic wood/cardboard monuments burnt in fire." },
      { spanish: "La Siesta", dynamicLang: isArabic ? "القيلولة" : isFrench ? "La Sieste" : "The Siesta", explanation: "Traditional short post-lunch break characteristic of warm small Iberian towns." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "أي مهرجان مذهل يشتهر بحرق التماثيل الخشبية العملاقة في فالنسيا؟" : isFrench ? "Quelle fête célèbre-t-on à Valence en brûlant de grandes structures ?" : "Which outstanding Valencian festival is famous for burning giant monuments?", options: ["Las Fallas", "La Tomatina", "San Fermín", "La Navidad"], correctIndex: 0 },
      { type: "fill-blank", question: "El Prado es un ___ (museum) de arte famoso.", blankWord: "museo" },
      { type: "translation", question: "Translate 'Cervantes wrote Don Quijote'", correctTranslation: "Cervantes escribió Don Quijote" },
      { type: "conjugation", verb: "apreciar", pronouns: { yo: "aprecio", tu: "aprecias", el: "aprecia" }, question: "Conjugate 'apreciar' for Yo" },
      { type: "writing", question: "Write down which Spanish cultural component attracts you the most and why you chosen it.", prompt: "e.g., Me encanta el flamenco por su pasión." }
    ];
  } else if (textTitleLower.includes("subjunctive") || textTitleLower.includes("subjuntivo") || textTitleLower.includes("desire") || textTitleLower.includes("wish") || textTitleLower.includes("emotion") || textTitleLower.includes("doubt") || textTitleLower.includes("denial") || textTitleLower.includes("impersonal")) {
    customTitle = `${topicTitle} - Mastering the Subjunctive Mood`;
    customExplanation = isArabic ?
      `دليلك المتقدم لإتقان صيغة الشك والافتراض (El Subjuntivo) للتعبير عن الأمنيات والمشاعر! ركيزة الدرس: **${topicTitle}**.\n\nصيغة الـ Subjuntivo ليست زمناً بل صيغة نحوية تُستخدم عندما ترتبط الجملة بالشك أو تمني حدوث شيء. تركيبة أساسية: "Quiero que..." (أريد منك أن...) متبوعة بالفعل بصيغة الشك (مثلاً: "Quiero que estudies mucho" - أريد منك أن تدرس كثيراً).` :
      isFrench ?
      `Maîtrisez le mode subjonctif pour exprimer souhaits, doutes et émotions : **${topicTitle}**.\n\nLe subjonctif n'est pas un temps mais un mode grammatical qui exprime ce qui est incertain ou désiré. Syntaxe typique : 'Quiero que...' (+ subjonctif), ex: 'Quiero que vengas a España' (Je veux que tu viennes en Espagne).` :
      `Conquer the complex and heavily tested Spanish Subjunctive Mood: **${topicTitle}**.\n\nUnlike indicative statements of fact, the Subjunctive mood (Subjuntivo) defines desires, doubts, emotions and hypothetical actions. A classic structure is "Quiero que + Subjunctive", such as "Quiero que estudies mucho" (I want you to study hard), where "estudies" is subjunctive.`;

    customVocab = [
      { spanish: "Quiero que", dynamicLang: isArabic ? "أريد منك أن" : isFrench ? "Je veux que" : "I want you to", explanation: "Triggers the subjunctive mood in the secondary clause." },
      { spanish: "La Duda", dynamicLang: isArabic ? "الشك" : isFrench ? "Le Doute" : "The Doubt", explanation: "Concept trigger for subjunctive expressions like dudo que..." },
      { spanish: "Ojalá", dynamicLang: isArabic ? "لو علم الله / إن شاء الله" : isFrench ? "Pourvu que / Espérons" : "Hopefully / God willing", explanation: "Borrowed from Arabic 'Inshallah', always triggers the subjunctive mood." },
      { spanish: "El Subjuntivo", dynamicLang: isArabic ? "صيغة الشك والافتراض" : isFrench ? "Le Subjonctif" : "The Subjunctive Mode", explanation: "Required grammatical category for non-factual expressions." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "أكمل الجملة بالصيغة الصحيحة: 'Ojalá yo ___ (vencer/ganar) la beca.'" : isFrench ? "Complétez la phrase au subjonctif: 'Ojalá yo ___ (ganar) la beca.'" : "Complete with the correct subjunctive verb form: 'Ojalá yo ___ (ganar) la beca.'", options: ["gane", "gano", "ganará", "ganaba"], correctIndex: 0 },
      { type: "fill-blank", question: "Quiero que tú ___ (speak) en español hoy.", blankWord: "hables" },
      { type: "translation", question: "Translate 'I hope you can come tomorrow'", correctTranslation: "Espero que puedas venir mañana" },
      { type: "conjugation", verb: "querer", pronouns: { yo: "quiera", tu: "quieras", el: "quiera" }, question: "Conjugate 'hablar' for Tú in Subjunctive (hables)" },
      { type: "writing", question: "Write a short sentence conveying a strong wish for your university friends in Spain using 'Ojalá'.", prompt: "e.g., Ojalá mis amigos tengan éxito en el examen." }
    ];
  } else if (textTitleLower.includes("past") || textTitleLower.includes("preterite") || textTitleLower.includes("indefinido") || textTitleLower.includes("imperfecto") || textTitleLower.includes("imperfect") || textTitleLower.includes("tense") || textTitleLower.includes("perfect") || textTitleLower.includes("gerund") || textTitleLower.includes("pluperfect")) {
    customTitle = `${topicTitle} - Past Tenses: Preterite vs Imperfect`;
    customExplanation = isArabic ?
      `دليلك لمعرفة الاختلافات الزاوية بين أزمنة الماضي بالإسبانية! ركيزة الدرس: **${topicTitle}**.\n\n1. **الماضي البسيط (Indefinido):** نستخدمه للأفعال التي بدأت وانتهت في وقت محدد في الماضي ("Ayer estudié mucho" - بالأمس درست كثيراً).\n2. **الماضي المستمر (Imperfecto):** نستخدمه لوصف حالات الطقس، العمر، والخلفيات الروتينية المستمرة في الماضي ("Cuando era niño vivía en El Cairo" - عندما كنت طفلاً كنت أعيش في القاهرة).` :
      isFrench ?
      `Apprenez à jongler entre le passé composé, le passé simple et l'imparfait : **${topicTitle}**.\n\n1. **Pretérito Indefinido (Passé Simple) :** Actions uniques, délimitées dans le temps (ex: 'Ayer alquilé el piso').\n2. **Pretérito Imperfecto (Imparfait) :** Descriptions passées, habitudes régulières (ex: 'Cuando vivía en Egipto, estudiaba mucho').` :
      `Distinguish clearly between the two past tense systems in Spanish: **${topicTitle}**.\n\n1. **Pretérito Indefinido (Preterite):** Used for single, completed actions at a tracking specific moment in the past (e.g., "Ayer comí paella" - Yesterday I ate paella).\n2. **Pretérito Imperfecto (Imperfect):** Used to describe continuous habits, weather, time, and background moods in the past (e.g., "Cuando vivía en mi país estudaba medicina" - When I lived in my country, I studied medicine).`;

    customVocab = [
      { spanish: "Ayer", dynamicLang: isArabic ? "أمس" : isFrench ? "Hier" : "Yesterday", explanation: "Direct past time modifier triggering preterite verbs." },
      { spanish: "El Pasado", dynamicLang: isArabic ? "الماضي" : isFrench ? "Le Passé" : "The Past", explanation: "Historical time reference frame." },
      { spanish: "Estudié", dynamicLang: isArabic ? "درستُ" : isFrench ? "J'ai étudié" : "I studied", explanation: "First-person preterite of estudiar." },
      { spanish: "Estudiaba", dynamicLang: isArabic ? "كنتُ أدرس" : isFrench ? "J'étudiais" : "I was studying / J used to study", explanation: "First-person imperfect of estudiar representing recurrent habit." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "أي جملة تدل على حدث منتهي تم بالأمس بشكل قاطع؟" : isFrench ? "Quelle phrase indique une action ponctuelle finie hier ?" : "Which sentence indicates a single, completed action from yesterday?", options: ["Ayer estudié mucho", "Antes estudiaba mucho", "Yo estudio mucho", "Yo voy a estudiar mucho"], correctIndex: 0 },
      { type: "fill-blank", question: "El año pasado ___ (I came) a España.", blankWord: "vine" },
      { type: "translation", question: "Translate 'Yesterday I bought a train ticket'", correctTranslation: "Ayer compré un billete de tren" },
      { type: "conjugation", verb: "comer", pronouns: { yo: "comí", tu: "comiste", el: "comió" }, question: "Conjugate 'comer' for Yo in Preterite (comí)" },
      { type: "writing", question: "Write a short sentence with both tenses: something that was happening (imperfect) when interrupted by a completed action (preterite).", prompt: "Think: 'Yo estudiaba cuando mi amigo llamó'." }
    ];
  } else if (textTitleLower.includes("future") || textTitleLower.includes("conditional") || textTitleLower.includes("plan")) {
    customTitle = `${topicTitle} - Describing Plans, Future & Conditionals`;
    customExplanation = isArabic ?
      `تعلم كيفية تخطيط مستقبلك باستخدام أزمنة المستقبل والشرط! تركيز الدرس: **${topicTitle}**.\n\n1. **المستقبل القريب (Ir + a + Infinitivo):** نستخدمه للخطط الحالية المؤكدة ("Voy a estudiar en Barcelona" - سأدرس في برشلونة).\n2. **المستقبل البعيد (Futuro Simple):** نستخدمه للتنبؤات البعيدة ("El próximo año viajaré a Madrid" - العام المقبل سأسافر إلى مدريد).\n3. **زمن الشرط (Condicional):** لقول فرضيات بأدب شديد ("Me gustaría visitar Sevilla" - يروق لي أو أود زيارة إشبيلية).` :
      isFrench ?
      `Planifiez votre avenir en Espagne avec le futur et le conditionnel : **${topicTitle}**.\n\n1. **Futur proche :** 'Ir + a + infinitif' pour vos projets certains (ex: 'Voy a alquilar un piso').\n2. **Futur simple :** Pour les prévisions (ex: 'El año que viene viajaré a Madrid').\n3. **Conditionnel :** Pour exprimer poliment des souhaits (ex: 'Me gustaría visitar Valencia').` :
      `Get ready to map study paths using future and conditional structures: **${topicTitle}**.\n\n1. **Near Future (Ir + a + Infinitive):** Ideal for imminent scheduled plans (e.g., "Voy a estudiar" - I am going to study).\n2. **Simple Future:** Used for long-term forecasts and hopes (e.g., "Mañana viajaré" - Tomorrow I will travel).\n3. **Conditional Mode (Condicional):** Used for wishing outcomes or asking demands politely (e.g., "Me gustaría" - I would like to...).`;

    customVocab = [
      { spanish: "Voy a estudiar", dynamicLang: isArabic ? "سأقوم بالدراسة" : isFrench ? "Je vais étudier" : "I am going to study", explanation: "The near-future periphrasis rule widely active in Spain." },
      { spanish: "El Futuro", dynamicLang: isArabic ? "المستقبل" : isFrench ? "L'Avenir / Le Futur" : "The Future", explanation: "Hypothetical ahead of time structures." },
      { spanish: "Viajaré", dynamicLang: isArabic ? "سأسافر" : isFrench ? "Je voyagerai" : "I will travel", explanation: "Simple future first-person of viajar." },
      { spanish: "Me gustaría", dynamicLang: isArabic ? "أود أو يروق لي أن" : isFrench ? "J'aimerais / Je voudrais" : "I would like to", explanation: "High politeness conditional modifier for request forms." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "أي من هذه الصيغ تدل على الرغبة في طلب شيء بأدب مفرط؟" : isFrench ? "Quelle formule exprime une demande polie ?" : "Which of these forms expresses a polite demand or wish?", options: ["Me gustaría", "Quiero ya", "Dame esto", "Tengo que"], correctIndex: 0 },
      { type: "fill-blank", question: "El año próximo yo ___ (will travel) a Sevilla.", blankWord: "viajaré" },
      { type: "translation", question: "Translate 'We are going to buy a transport card'", correctTranslation: "Vamos a comprar una tarjeta de transporte" },
      { type: "conjugation", verb: "vencer", pronouns: { yo: "viajaré", tu: "viajarás", el: "viajará" }, question: "Conjugate 'ir' for Nosotros in present (vamos)" },
      { type: "writing", question: "Write a short sentence about what you would like to do once your student visa is officially approved.", prompt: "Use 'Me gustaría...'." }
    ];
  } else {
    // General thematic syllabus page fallback (grammar / essay / connection)
    customTitle = `${topicTitle} - Core Chapter Study`;
    customExplanation = isArabic ?
      `مرحباً بك في صفحة كتاب معايير الـ SIELE الأكاديمية لدراسة اللغة بمختلف مستوياتها! الفصل الحالي: **${topicTitle}**.\n\nيحتاج المقيم والباحث في إسبانيا لتدريب مستمر على هيكلة الأفكار المترابطة، واستعمال أدوات الوصل البلاغية بذكاء، مع تجنب الأخطاء الكتابية الشائعة لضمان أفضل الدرجات وتحصيل الإقامة الجامعية بنجاح.` :
      isFrench ?
      `Nouveau chapitre structuré d'apprentissage de l'espagnol académique pour les examens officiels : **${topicTitle}**.\n\nCe sous-chapitre développe vos compétences rédactionnelles et vous prépare minutieusement à l'analyse structurelle exigée par les correcteurs des examens espagnols.` :
      `Welcome to your official SIELE interactive chapter syllabus worksheet! Focusing on: **${topicTitle}**.\n\nThis chapter develops your conversational accuracy, reading comprehension, and syntactical cohesion. It focuses heavily on common expressions and contextual survival structures needed for life in Spain.`;

    customVocab = [
      { spanish: "El Conector", dynamicLang: isArabic ? "أداة الربط" : isFrench ? "Le Connecteur log." : "Sentence Connector", explanation: "Linkers that sequence points gracefully, like 'sin embargo' or 'por consiguiente'." },
      { spanish: "El Examen", dynamicLang: isArabic ? "الامتحان" : isFrench ? "L'Examen" : "The Examination", explanation: "SIELE or DELE certification verifying foreign applicant capabilities." },
      { spanish: "El Éxito", dynamicLang: isArabic ? "النجاح" : isFrench ? "Le Succès" : "Success", explanation: "The ideal product of rigorous structured Spain study preparation." }
    ];

    customPractice = [
      { type: "multiple-choice", question: isArabic ? "أي من هؤلاء هو أداة ربط جيدة تعني (ومع ذلك)؟" : isFrench ? "Lequel est un connecteur signifiant 'Cependant/Pourtant' ?" : "Which of these is an advanced discourse connector meaning 'However'?", options: ["Sin embargo", "Porque", "También", "Y"], correctIndex: 0 },
      { type: "fill-blank", question: "Tengo que estudiar mucho para tener ___ (success).", blankWord: "éxito" },
      { type: "translation", question: "Translate to Spanish: 'A study passport'", correctTranslation: "Un pasaporte de estudio" },
      { type: "conjugation", verb: "aprender", pronouns: { yo: "aprendo", tu: "aprendes", el: "aprende" }, question: "Conjugate 'aprender' for Yo" },
      { type: "writing", question: "Write a short sentence in Spanish about your dream study roadmap.", prompt: "I study Spanish because..." }
    ];
  }

  return {
    title: customTitle,
    explanation: customExplanation,
    vocabulary: customVocab,
    practice: customPractice
  };
}

function getFallbackExam(level: string, teachingLang: string) {
  const isArabic = teachingLang === 'ar';
  const isFrench = teachingLang === 'fr';

  const mockQuestions = [
    {
      question: "Si vas a pagar el alquiler de una habitación, ¿qué significa 'la fianza'?",
      options: [
        isArabic ? "مبلغ تأمين مسترد لحماية الشقة" : isFrench ? "Un dépôt de garantie remboursable" : "A refundable security deposit to protect the flat",
        isArabic ? "فاتورة الكهرباء والغاز الشهرية" : isFrench ? "La facture d'électricité mensuelle" : "The monthly gas and electricity bill",
        isArabic ? "عمولة الوكالة العقارية" : isFrench ? "Les frais d'agence immobilière" : "The real estate agency service fee",
        isArabic ? "عقد الإيجار الرسمي للبلدية" : isFrench ? "Le bail de location officiel" : "The official municipal rent contract"
      ],
      correctIndex: 0,
      culturalTip: "Spain's Ley de Arrendamientos Urbanos dictates returning 'la fianza' within 30 days of lease end if premises are intact."
    },
    {
      question: "¿Cuál es la palabra oficial en España para la tarjeta de transporte de menores de 26 años?",
      options: [
        "El Abono Transporte Joven",
        "La Tarjeta de Viaje Normal",
        "El Ticket de Autobús Único",
        "La Tarjeta Oro de España"
      ],
      correctIndex: 0,
      culturalTip: "In Spain (especially Madrid and Barcelona regions), the Youth Abono provides huge discounts for unlimited travel."
    },
    {
      question: "Para realizar el 'Empadronamiento' en el Ayuntamiento, ¿qué documento necesitas de tu casero?",
      options: [
        isArabic ? "نسخة من هويته DNI وفاتورة خدمات حديثة" : isFrench ? "Une photocopie de sa pièce d'identité DNI et une facture récente" : "A copy of their DNI and a recent utility bill",
        isArabic ? "خطاب توصية أكاديمية" : isFrench ? "Une lettre de recommandation académique" : "An academic recommendation letter",
        isArabic ? "عقد العمل الخاص به" : isFrench ? "Son contrat de travail personnel" : "Their personal labor contract",
        isArabic ? "صورة شخصية ملونة" : isFrench ? "Une photo d'identité en couleur" : "A colored passport-sized photo"
      ],
      correctIndex: 0,
      culturalTip: "The City Hall (Ayuntamiento) requires proof of address authority to register you in 'el padrón municipal'."
    },
    {
      question: "¿Qué frase usas para pedir la cuenta respetuosamente en un bar de tapas?",
      options: [
        "La cuenta, por favor",
        "¡Oye tú, dame la factura!",
        "Quiero pagar ahora mismo",
        "¿Dónde está mi dinero?"
      ],
      correctIndex: 0,
      culturalTip: "Always use the polite conditional or simply 'La cuenta, por favor' to secure your check in Spain."
    },
    {
      question: "Si tu programa de estudios dura más de 180 días, ¿qué debes solicitar obligatoriamente en los primeros 30 días?",
      options: [
        "La Tarjeta de Identidad de Extranjero (TIE)",
        "Un pasaporte nuevo de su embajada",
        "Una cuenta de ahorros internacional",
        "La convalidación de su título de bachiller"
      ],
      correctIndex: 0,
      culturalTip: "Entering on a student visa exceeding 180 days only gets you a 90-day visa stamp. You must apply for your physical TIE card inside Spain."
    },
    {
      question: "Completa la frase: 'Yo ___ un estudiante universitario de ingeniería.'",
      options: ["soy", "estoy", "tengo", "hago"],
      correctIndex: 0,
      culturalTip: "Use 'ser' (soy) for permanent characteristics like occupation, identity, or nationality."
    },
    {
      question: "Completa la frase: 'Hoy la cocina ___ muy limpia.'",
      options: ["está", "es", "tiene", "va"],
      correctIndex: 0,
      culturalTip: "Use 'estar' (está) for temporary states, locations, or conditions like cleanliness."
    },
    {
      question: "¿Cuáles son las tres conjugaciones de infinitivos en la gramática española?",
      options: ["-ar, -er, -ir", "-as, -es, -is", "-an, -en, -in", "-o, -es, -e"],
      correctIndex: 0,
      culturalTip: "All Spanish verbs originate from three simple groups ending in AR, ER, or IR."
    },
    {
      question: "Bajo la reforma de extranjería reciente de España, ¿cuántas horas semanales puede trabajar un estudiante?",
      options: ["Hasta 30 horas", "Hasta 10 horas", "No está permitido trabajar", "Sin límite de horas"],
      correctIndex: 0,
      culturalTip: "Students are legally permitted to work part-time up to 30 hours per week as long as it aligns with class schedules."
    },
    {
      question: "¿Cómo se llama la matrícula o inscripción oficial de las asignaturas universitarias?",
      options: ["La Matrícula", "El Visado", "La Beca", "El Horario"],
      correctIndex: 0,
      culturalTip: "'La Matrícula' refers to either university course enrollment or tuition registration."
    },
    {
      question: "¿Qué ingrediente principal lleva una típica 'Tortilla de Patatas' española?",
      options: ["Patatas y huevos", "Arroz y marisco", "Carne de ternera", "Pasta blanca"],
      correctIndex: 0,
      culturalTip: "The national tortilla is simple yet nutritious, crafted using potatoes, eggs, and optionally onions."
    },
    {
      question: "Si necesitas un avalista para alquilar una casa, ¿qué te están solicitando?",
      options: [
        isArabic ? "ضامن مالي يضمن دفع الإيجار" : isFrench ? "Un garant financier pour le loyer" : "A financial guarantor for the rent",
        isArabic ? "حارس أمن للشقة" : isFrench ? "Un gardien de sécurité" : "A security guard for the flat",
        isArabic ? "رخصة قيادة سارية" : isFrench ? "Un permis de conduire valide" : "A valid driver's license",
        isArabic ? "تأمين صحي دولي" : isFrench ? "Une assurance maladie internationale" : "An international health insurance policy"
      ],
      correctIndex: 0,
      culturalTip: "An 'aval' is a co-signer or guarantor who assumes payments to the landlord if you default."
    },
    {
      question: "¿Qué significa el término 'Homologación de título'?",
      options: [
        isArabic ? "معادلة شهادتك الأجنبية بالشهادة الإسبانية الموازية" : isFrench ? "L'équivalence officielle de votre diplôme étranger" : "Official recognition/equivalence of your foreign degree in Spain",
        isArabic ? "ترجمة شهادتك للغة الإسبانية" : isFrench ? "La traduction de votre diplôme" : "Translating your degree into Spanish",
        isArabic ? "شراء تذكرة طيران طلابية" : isFrench ? "L'achat d'un billet d'avion" : "Buying a student flight ticket",
        isArabic ? "التسجيل في الضمان الاجتماعي" : isFrench ? "L'inscription à la sécurité sociale" : "Registering for Spanish Social Security"
      ],
      correctIndex: 0,
      culturalTip: "To study postgraduate degrees in public universities, getting 'Homologación' or 'Equivalencia' of your Bachelor is highly recommended."
    },
    {
      question: "¿Qué es el 'NIE' (Número de Identidad de Extranjero)?",
      options: [
        isArabic ? "رقم الهوية الضريبية والإدارية الخاص بالأجانب" : isFrench ? "Le numéro d'identification administratif des étrangers" : "The legal and fiscal identification number for foreigners",
        isArabic ? "رقم هاتفك المحمول الإسباني" : isFrench ? "Votre numéro de téléphone espagnol" : "Your Spanish mobile phone number",
        isArabic ? "رقم الحساب البنكي الأوروبي IBAN" : isFrench ? "Le numéro de compte bancaire IBAN" : "Your international IBAN bank account code",
        isArabic ? "رقم الضمان الطبي الوطني" : isFrench ? "Le numéro d'assurance médicale" : "Your national medical insurance number"
      ],
      correctIndex: 0,
      culturalTip: "The NIE is the unique identification number issued to foreigners by national police command in Spain."
    },
    {
      question: "En España, al saludar informalmente a amigos, ¿cuál es el saludo corporal estándar?",
      options: [
        isArabic ? "قبلتان على الخدين (يمين ثم يسار)" : isFrench ? "Deux bises sur les joues" : "Two light kisses on the cheeks (right then left)",
        isArabic ? "انحناءة كاملة بالرأس" : isFrench ? "Une inclinaisons formelle" : "A formal deep bow",
        isArabic ? "مصافحة طويلة بكلتا اليدين" : isFrench ? "Une poignée de main très longue" : "A long two-handed handshake",
        isArabic ? "عناق قوي بدون كلام" : isFrench ? "Un câlin fort en silence" : "A tight silent hug"
      ],
      correctIndex: 0,
      culturalTip: "'Dos besos' is the classic Spanish friendly template across casual and domestic situations."
    }
  ];

  return {
    examTitle: `Official Level ${level} Scholar Advancement Exam`,
    targetXP: 250,
    questions: mockQuestions
  };
}

// 1. GENERATE LESSON SECTION: Fetches complete multi-page custom text and interactive questions on demand
app.post("/api/gemini/generate-lesson", async (req, res) => {
  const { level, page, topicTitle, teachingLang } = req.body;
  
  const prompt = `
    You are an expert Spanish professor teaching Spanish for international students coming to study, live, or work in Spain.
    Create a complete, detailed, and highly comprehensive E-book textbook page for Level ${level || 'A1'}, Page ${page || 1}.
    Topic: "${topicTitle}".
    Teaching Language: ${teachingLang || 'en'} (explain in this language, giving explanations and vocabulary translations).
    
    CRITICAL RULES for highly interesting and rich content:
    1. EXPLANATION: Write a comprehensive, highly interesting pedagogical textbook explanation in ${teachingLang || 'en'}. Avoid generic, safe summaries. It MUST contain:
       - Clear, detailed conceptual context and cultural facts about Spain (e.g., student visa procedures, flat-hunting tips, dining protocols like 'tapa' pricing, or university customs).
       - An immersive real-world dialogue snippet in Spanish (with side-by-side or line-by-line translation in ${teachingLang || 'en'}) illustrating natural, lively conversation suited to this topic.
       - A clear grammar chart or verb conjugation pattern using a beautifully aligned markdown table.
    2. VOCABULARY: Provide exactly 4 highly relevant, important, and SPECIFIC vocabulary items appropriate to "${topicTitle}".
       - Do NOT repeat standard basic words like 'libro' or 'mesa'. Make them 100% thematic and sophisticated!
       - For each item, provide the Spanish word, its translation in ${teachingLang || 'en'} (the 'dynamicLang' field), and a robust, helpful explanation of its real-world use or cultural context in Spain.
    3. PRACTICE EXERCISES: Provide exactly 5 diverse, interactive exercises of these types:
       - 1 MCQ: type 'multiple-choice' with a clear question (in the teaching language or simple Spanish), 4 plausible options, and correctIndex (0-3).
       - 1 Fill-in-the-blank: type 'fill-blank' asking to complete a specific word in Spanish, stating the blankWord.
       - 1 Translation: type 'translation' to translate a full sentence, with correctTranslation.
       - 1 Verb conjugation: type 'conjugation' targeting a verb related to the topic, with verb, pronouns { yo, tu, el }, and a conjugation question.
       - 1 Writing challenge: type 'writing' with a question and a helpful prompt to guide the student's output.
    
    Format your response as a valid JSON object with the following fields:
    - title: "Topic page title"
    - explanation: "High quality markdown explanation with dialogues, tables, and tips"
    - vocabulary: Array of { spanish: "Word", dynamicLang: "Translation", explanation: "Context" }
    - practice: Array of 5 practice exercises as specified.
  `;

  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      return res.json(getFallbackLesson(level, page, topicTitle, teachingLang));
    }

    try {
      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            required: ["title", "explanation", "vocabulary", "practice"],
            properties: {
              title: { type: Type.STRING },
              explanation: { type: Type.STRING },
              vocabulary: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  required: ["spanish", "dynamicLang", "explanation"],
                  properties: {
                    spanish: { type: Type.STRING },
                    dynamicLang: { type: Type.STRING },
                    explanation: { type: Type.STRING }
                  }
                }
              },
              practice: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  required: ["type", "question"],
                  properties: {
                    type: { type: Type.STRING },
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctIndex: { type: Type.INTEGER },
                    blankWord: { type: Type.STRING },
                    correctTranslation: { type: Type.STRING },
                    verb: { type: Type.STRING },
                    pronouns: {
                      type: Type.OBJECT,
                      properties: {
                        yo: { type: Type.STRING },
                        tu: { type: Type.STRING },
                        el: { type: Type.STRING }
                      }
                    },
                    prompt: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });

      if (response.text) {
        return res.json(JSON.parse(response.text));
      } else {
        throw new Error("No response from AI");
      }
    } catch (aiError: any) {
      console.warn("Gemini Generate-Lesson Error (Falling back to local lesson database):", aiError.message || aiError);
      return res.json(getFallbackLesson(level, page, topicTitle, teachingLang));
    }
  } catch (error: any) {
    console.error("Critical Lesson Endpoint Error:", error);
    return res.status(500).json({ error: "Failed to generate lesson content", details: error.message });
  }
});

// 2. GENERATE LEVEL MILESTONE EXAM: Complete 15-30 question exam verifying capabilities
app.post("/api/gemini/generate-exam", async (req, res) => {
  const { level, teachingLang } = req.body;
  const prompt = `
    Create a highly professional level diagnostic certification exam in Spanish for level ${level || 'A1'}.
    The exam is for Arab students going to Spain. Translate directions and explanations to the student's background teaching language (${teachingLang || 'en'}).
    Provide exactly 15 rigorous multiple-choice questions assessing:
    - Grammar structure
    - Verb conjugation (present/past tense)
    - Everyday survival conversation (getting water, bus card, rent negotiation, empadronamiento)
    - Cultural nuances of Spain
    
    Format your response as a valid JSON object with:
    - examTitle: "Level ${level} Official Advancement Test"
    - targetXP: 150
    - questions: Array of 15 questions, each having:
      - question: "Question text in Spanish/Teaching Language"
      - options: ["Option A", "Option B", "Option C", "Option D"]
      - correctIndex: Number (0 to 3)
      - culturalTip: "A valuable explanatory student tip why this option is correct or its use in Spain"
  `;

  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      // Mock Exam generator to function gracefully instantly fallback
      return res.json(getFallbackExam(level, teachingLang));
    }

    try {
      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            required: ["examTitle", "targetXP", "questions"],
            properties: {
              examTitle: { type: Type.STRING },
              targetXP: { type: Type.INTEGER },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  required: ["question", "options", "correctIndex", "culturalTip"],
                  properties: {
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctIndex: { type: Type.INTEGER },
                    culturalTip: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });

      if (response.text) {
        return res.json(JSON.parse(response.text));
      } else {
        throw new Error("Empty response");
      }
    } catch (aiError: any) {
      console.warn("Gemini Generate-Exam Error (Falling back to local exam database):", aiError.message || aiError);
      return res.json(getFallbackExam(level, teachingLang));
    }
  } catch (error: any) {
    console.error("Gemini Generate-Exam Endpoint Error:", error);
    return res.status(500).json({ error: "Failed to generate exam questions", details: error.message });
  }
});

// 3. AI MONITOR FOR PEER-TO-PEER CHAT: Monitors grammar correctness and updates students with suggestions
app.post("/api/gemini/monitor-chat", async (req, res) => {
  const { text } = req.body;
  if (!text || text.trim().length === 0) {
    return res.json({ clean: true, feedback: "" });
  }

  const prompt = `
    You are an AI Moderator and Language Tutor built into the Spain Study Portal chatroom.
    Analyze the following Spanish text sent by an Arab student learning Spanish:
    "${text}"

    If the Spanish is grammatically incorrect, provide a very short, polite grammar correction note (max 20 words).
    Provide both correct Spanish and helpful advice. Keep it completely supportive.
    If the text has no mistakes, return exactly empty string in feedback.
    
    Format response as a JSON object:
    - feedback: "The helpful tutoring suggestion"
  `;

  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      // Non-key fallback
      return res.json({
        feedback: text.toLowerCase().includes("yo es") ? "💡 TIP: Use 'Yo soy' instead of 'yo es' for indicating permanently who you are in Spanish! Keep it up!" : ""
      });
    }

    try {
      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            required: ["feedback"],
            properties: {
              feedback: { type: Type.STRING }
            }
          }
        }
      });

      if (response.text) {
        return res.json(JSON.parse(response.text));
      } else {
        return res.json({ feedback: "" });
      }
    } catch (aiError: any) {
      console.warn("Gemini Monitor-Chat Error:", aiError.message || aiError);
      return res.json({
        feedback: text.toLowerCase().includes("yo es") ? "💡 TIP: Use 'Yo soy' instead of 'yo es' for indicating permanently who you are in Spanish! Keep it up!" : ""
      });
    }
  } catch (error: any) {
    console.error("Gemini Monitor-Chat Error:", error);
    return res.json({ feedback: "" });
  }
});

// 4. SPANISH CV CURRICULUM VITAE GENERATOR: Outputs standard Spanish layouts
app.post("/api/gemini/generate-cv", async (req, res) => {
  const { name, email, targetRole, educationLevel, skills, experience, targetCity } = req.body;
  
  const prompt = `
    You are a professional career counselor in Spain.
    Convert the following profile into a pristine Spanish CV formatted elegantly in structured, responsive HTML with Tailwind CSS classes.
    Do NOT output extraneous markdown tags like \`\`\`html. Output ONLY the raw HTML body.
    Ensure it matches Spanish standard recruiting layouts (incorporating parts like "Sobre Mí", "Educación", "Experiencia", "Idiomas", and "Habilidades").
    Use a beautiful dark or blue slate aesthetic styling.

    Profile:
    - Name: ${name}
    - Email: ${email}
    - Target Role: ${targetRole}
    - Current Education standard: ${educationLevel}
    - Location Target: ${targetCity || "Spain"}
    - Skills: ${skills}
    - Experience: ${experience}
  `;

  try {
    const key = process.env.GEMINI_API_KEY;
    
    const getMockCv = () => {
      return `
        <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
          <div class="border-b pb-4 mb-4 text-center md:text-left">
            <h1 class="text-2xl font-bold text-slate-800">${name || "Student Name"}</h1>
            <p class="text-sm text-indigo-600 font-medium">${targetRole || "Estudiante Académico"}</p>
            <p class="text-xs text-slate-500">${email || "email@example.com"} | Residencia: ${targetCity || "Madrid, España"}</p>
          </div>
          <div class="mb-4">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 border-b pb-1">Perfil Profesional (Sobre Mí)</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">Estudiante internacional motivado y bilingüe buscando integrarse en el sector laboral o de prácticas profesionales de España. Dispuesto a contribuir con dedicación, adaptabilidad y una excelente ética de trabajo.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 border-b pb-1">Formación Académica</h3>
              <p class="font-medium text-xs text-slate-800 mt-2">${educationLevel || "Grado Superior o Universitario"}</p>
              <p class="text-[10px] text-slate-500">España / Origen</p>
            </div>
            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 border-b pb-1">Habilidades Teclas</h3>
              <p class="text-xs text-slate-600 mt-2">${skills || "Idiomas, Trabajo en Equipo, Ofimática"}</p>
            </div>
          </div>
          <div class="mt-4">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 border-b pb-1">Experiencia Laboral</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">${experience || "Experiencia previa y voluntariado internacional."}</p>
          </div>
        </div>
      `;
    };

    if (!key || key === "MY_GEMINI_API_KEY") {
      return res.json({ cvHtml: getMockCv() });
    }

    try {
      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a professional recruiting systems architect in Spain. Output only valid and responsive HTML with Tailwind style tags, with absolutely no preamble, explanation, or markdown wrappers.",
        }
      });

      let cleanHtml = response.text || "";
      // strip markdown wrappers
      if (cleanHtml.includes("```html")) {
        cleanHtml = cleanHtml.split("```html")[1].split("```")[0];
      } else if (cleanHtml.includes("```")) {
        cleanHtml = cleanHtml.split("```")[1].split("```")[0];
      }
      return res.json({ cvHtml: cleanHtml || getMockCv() });
    } catch (aiError: any) {
      console.warn("Gemini CV Error (Falling back to template layout):", aiError.message || aiError);
      return res.json({ cvHtml: getMockCv() });
    }
  } catch (error: any) {
    console.error("Gemini CV Endpoint Error:", error);
    return res.status(500).json({ error: "Failed to generate standard Spanish CV", details: error.message });
  }
});

// Configure Vite middleware / production assets serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    // Dynamically import Vite to run its dev middleware on port 3000
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving static files
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express + Vite Full-Stack Server running on port ${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error("Initialization Failed:", err);
});

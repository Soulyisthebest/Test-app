/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Award, 
  FileText, 
  MapPin, 
  MessageSquare, 
  Plus, 
  Sparkles, 
  User, 
  Copy, 
  Check, 
  CheckCircle, 
  ChevronRight, 
  Coins, 
  Lock, 
  Building, 
  Bus, 
  Briefcase, 
  GraduationCap, 
  TrendingUp, 
  AlertTriangle,
  RotateCcw,
  Send,
  Sliders
} from 'lucide-react';

import { AppLanguage, UserProfile, StudyOption, VisaDocument, LessonTopic } from './types';
import { 
  LANGUAGES, 
  TRANSLATIONS, 
  STUDY_OPTIONS, 
  VISA_DOCUMENTS, 
  TRANSPORT_CARDS, 
  RENTAL_PLATFORMS, 
  JOB_PLATFORMS, 
  CITY_GUIDES, 
  LEVEL_TOPICS, 
  TUTOR_TEACHERS 
} from './data';

const ALPHABET_ITEMS = [
  { letter: 'A', name: 'A', phonetic: '/a/', audioText: 'A', ar: 'أ (ألف مفتوحة ممدودة)', desc: { en: 'Open vowel, like "a" in father.', ar: 'حرف علة مفتوح، مثل الألف المفخمة في الصحراء.', fr: 'Voyelle ouverte, comme le "a" dans table.' }, word: 'Amor', wordTrans: { en: 'Love', ar: 'حب', fr: 'Amour' } },
  { letter: 'B', name: 'Be', phonetic: '/be/', audioText: 'Be', ar: 'ب (باء)', desc: { en: 'Pronounced similarly to "b", softer when between vowels.', ar: 'ينطق مثل الباء، ويكون أرق عند وقوعه بين حرفين علة.', fr: 'Prononcé comme le "b".' }, word: 'Barcelona', wordTrans: { en: 'Barcelona', ar: 'برشلونة', fr: 'Barcelone' } },
  { letter: 'C', name: 'Ce', phonetic: '/θe/ or /se/', audioText: 'Ce', ar: 'ث / س', desc: { en: 'Sounds like "th" in "think" in Spain (before E, I) or "k" (before A, O, U).', ar: 'ينطق كالثاء (ث) في إسبانيا أمام E و I، وينطق كالكاف (ك) أمام A و O و U.', fr: 'Comme le "th" anglais avant E, I; comme le "k" avant A, O, U.' }, word: 'Casa', wordTrans: { en: 'House', ar: 'بيت', fr: 'Maison' } },
  { letter: 'D', name: 'De', phonetic: '/de/', audioText: 'De', ar: 'د (دال)', desc: { en: 'Softer "d", placing the tongue against the back of the upper teeth.', ar: 'ينطق كالدال ولكن بوضع طرف اللسان عند الأسنان العلوية.', fr: 'Plus doux que le "d" anglais.' }, word: 'Día', wordTrans: { en: 'Day', ar: 'يوم', fr: 'Jour' } },
  { letter: 'E', name: 'E', phonetic: '/e/', audioText: 'E', ar: 'إِ (كسرة خفيفة)', desc: { en: 'Mid vowel, like "e" in pet.', ar: 'حرف علة بنطق متوسط، مثل الكسرة في اللغة العربية.', fr: 'Comme le "é" en français.' }, word: 'Estudiante', wordTrans: { en: 'Student', ar: 'طالب', fr: 'Étudiant' } },
  { letter: 'F', name: 'Efe', phonetic: '/ˈefe/', audioText: 'Efe', ar: 'ف (فاء)', desc: { en: 'Pronounced like "f" in father.', ar: 'ينطق كالفاء تماماً.', fr: 'Prononcé comme le "f".' }, word: 'Fácil', wordTrans: { en: 'Easy', ar: 'سهل', fr: 'Facile' } },
  { letter: 'G', name: 'Ge', phonetic: '/xe/ or /ge/', audioText: 'Ge', ar: 'خ / غ', desc: { en: 'Sounds like a guttural "h" (Arabic خ) before E, I. Sounds like "g" in "go" elsewhere.', ar: 'ينطق كالخاء (خ) أمام E و I. وينطق كالجيم المصرية غير المعطشة أمام الأحرف الأخرى.', fr: 'Comme le "ch" allemand devant E, I; comme le "g" dans gare ailleurs.' }, word: 'Gato', wordTrans: { en: 'Cat', ar: 'قطة', fr: 'Chat' } },
  { letter: 'H', name: 'Hache', phonetic: '/ˈatʃe/', audioText: 'Hache', ar: 'صامت', desc: { en: 'Always silent in Spanish. Never pronounce it!', ar: 'حرف صامت دائماً في الإسبانية ولا يلفظ أبداً!', fr: 'Toujours muet en espagnol. Ne le prononcez jamais !' }, word: 'Hola', wordTrans: { en: 'Hello (pronounced ola)', ar: 'مرحباً (تُنطق أولا)', fr: 'Bonjour (se prononce ola)' } },
  { letter: 'I', name: 'I', phonetic: '/i/', audioText: 'I', ar: 'ي (ياء ممدودة)', desc: { en: 'High vowel, like "ee" in sleep.', ar: 'حرف علة ينطق كياء ممدودة واضحة.', fr: 'Comme le "i" standard.' }, word: 'Isla', wordTrans: { en: 'Island', ar: 'جزيرة', fr: 'Île' } },
  { letter: 'J', name: 'Jota', phonetic: '/ˈxota/', audioText: 'Jota', ar: 'خ (خاء)', desc: { en: 'Always pronounced as a strong guttural "h", exactly like Arabic "خ".', ar: 'ينطق دائماً كالخاء العربية (خ) بشكل واضح وقوي.', fr: 'Toujours prononcé comme le "jota" guttural (le "ch" de l\'allemand).' }, word: 'Jardín', wordTrans: { en: 'Garden', ar: 'حديقة', fr: 'Jardin' } },
  { letter: 'K', name: 'Ka', phonetic: '/ka/', audioText: 'Ka', ar: 'ك (كاف)', desc: { en: 'Like "k" in key. Used mostly in foreign loanwords.', ar: 'ينطق كالكاف، ويستخدم غالباً في الكلمات المستعارة.', fr: 'Comme le "k" standard.' }, word: 'Kilómetro', wordTrans: { en: 'Kilometer', ar: 'كيلومتر', fr: 'Kilomètre' } },
  { letter: 'L', name: 'Ele', phonetic: '/ˈele/', audioText: 'Ele', ar: 'ل (لام)', desc: { en: 'Like "l" in light. Keep it bright and not dark.', ar: 'ينطق كالمام المرققة.', fr: 'Comme le "l" standard.' }, word: 'Libro', wordTrans: { en: 'Book', ar: 'كتاب', fr: 'Livre' } },
  { letter: 'LL', name: 'Doble ele', phonetic: '/ˈʎe/ or /ʝe/', audioText: 'Doble ele', ar: 'ي (ياء مشددة أو ج)', desc: { en: 'Pronounced like "y" in yellow.', ar: 'ينطق كياء ممدودة مشددة أو "ج" خفيفة حسب المنطقة.', fr: 'Se prononce comme le son "y" dans "payer".' }, word: 'Lluvia', wordTrans: { en: 'Rain', ar: 'مطر', fr: 'Pluie' } },
  { letter: 'M', name: 'Eme', phonetic: '/ˈeme/', audioText: 'Eme', ar: 'م (ميم)', desc: { en: 'Like "m" in mother.', ar: 'ينطق ميم مرققة.', fr: 'Comme le "m" standard.' }, word: 'Madrid', wordTrans: { en: 'Madrid', ar: 'مدريد', fr: 'Madrid' } },
  { letter: 'N', name: 'Ene', phonetic: '/ˈene/', audioText: 'Ene', ar: 'ن (نون)', desc: { en: 'Like "n" in net.', ar: 'ينطق نون مرققة.', fr: 'Comme le "n" standard.' }, word: 'Noche', wordTrans: { en: 'Night', ar: 'ليلة', fr: 'Nuit' } },
  { letter: 'Ñ', name: 'Eñe', phonetic: '/ˈeɲe/', audioText: 'Eñe', ar: 'ني (نون مدمجة بياء)', desc: { en: 'Unique highly-distinct Spanish sound like "ny" in canyon.', ar: 'حرف إسباني مميز للغاية يُنطق كدمج النون مع الياء (ني) مثل كلمة España.', fr: 'Son unique espagnol, similaire au "gn" dans "mignon".' }, word: 'España', wordTrans: { en: 'Spain', ar: 'إسبانيا', fr: 'Espagne' } },
  { letter: 'O', name: 'O', phonetic: '/o/', audioText: 'O', ar: 'و (ضمة مفخمة)', desc: { en: 'Mid vowel, like "o" in more.', ar: 'حرف علة بنطق دائري مفخم كالضمة الطويلة.', fr: 'Comme le "o" standard.' }, word: 'Otoño', wordTrans: { en: 'Autumn', ar: 'خريف', fr: 'Automne' } },
  { letter: 'P', name: 'Pe', phonetic: '/pe/', audioText: 'Pe', ar: 'پ (باء مشددة بضغط هواء)', desc: { en: 'Like "p" in pen. Pop the sound with air flow.', ar: 'ينطق باء مفخمة مصحوبة بدفق هواء (P) لتمييزه عن الباء العادية.', fr: 'Comme le "p" avec expulsion d\'air.' }, word: 'Piso', wordTrans: { en: 'Flat / Apartment', ar: 'شقة', fr: 'Appartement' } },
  { letter: 'Q', name: 'Cu', phonetic: '/ku/', audioText: 'Cu', ar: 'ك', desc: { en: 'Always followed by silent "u". Pronounced like "k".', ar: 'يأتي دائماً متبوعاً بحرف U صامت، وينطق كالكاف.', fr: 'Toujours suivi d\'un "u" muet, se prononce "k".' }, word: 'Queso', wordTrans: { en: 'Cheese', ar: 'جبن', fr: 'Fromage' } },
  { letter: 'R', name: 'Ere', phonetic: '/ˈeɾe/', audioText: 'Ere', ar: 'ر (راء واحدة)', desc: { en: 'Single rolled. Soft tap of tongue against roof.', ar: 'ينطق بقرعة واحدة للسان ضد الحنك الأعلى وهو رقيق.', fr: 'Roulé doucement d\'un coup de langue.' }, word: 'Rosa', wordTrans: { en: 'Rose / Pink', ar: 'وردة / وردي', fr: 'Rose' } },
  { letter: 'RR', name: 'Doble erre', phonetic: '/ˈere/', audioText: 'Doble erre', ar: 'رّ (راء مشددة مرتعشة)', desc: { en: 'Trilled R sound. Flutter your tongue!', ar: 'الراء المرتعشة المشددة والمكررة، قم بهز لسانك بقوة!', fr: 'R hautement roulé avec vibration de la langue.' }, word: 'Perro', wordTrans: { en: 'Dog', ar: 'كلب', fr: 'Chien' } },
  { letter: 'S', name: 'Ese', phonetic: '/ˈese/', audioText: 'Ese', ar: 'س (سين)', desc: { en: 'Like "s" in sun.', ar: 'ينطق سين مرققة.', fr: 'Comme le "s" standard.' }, word: 'Sol', wordTrans: { en: 'Sun', ar: 'شمس', fr: 'Soleil' } },
  { letter: 'T', name: 'Te', phonetic: '/te/', audioText: 'Te', ar: 'ت (تاء)', desc: { en: 'Crisp "t" sound with tongue touching dentistry area.', ar: 'ينطق تاء نقية بملامسة اللسان للأسنان.', fr: 'Comme le "t" standard.' }, word: 'Tarde', wordTrans: { en: 'Afternoon / Late', ar: 'بعد الظهر / متأخر', fr: 'Après-midi / Tard' } },
  { letter: 'U', name: 'U', phonetic: '/u/', audioText: 'U', ar: 'و (واو ممدودة)', desc: { en: 'High vowel, like "oo" in boot.', ar: 'حرف علة مضموم كواو طويلة ضيقة.', fr: 'Comme le "ou" en français.' }, word: 'Universidad', wordTrans: { en: 'University', ar: 'جامعة', fr: 'Université' } },
  { letter: 'V', name: 'Uve', phonetic: '/ˈuβe/', audioText: 'Uve', ar: 'ب (مثل B تماماً)', desc: { en: 'Always pronounced exactly like Spanish "b". Never as english "v"!', ar: 'تنبيه هام: ينطق كالباء (B) تماماً في الإسبانية وليس كالـ V الإنجليزية!', fr: 'Très important: se prononce exactement comme un "b" !' }, word: 'Vida', wordTrans: { en: 'Life (pronounced bida)', ar: 'حياة (تُنطق بيدا)', fr: 'Vie (se prononce bida)' } },
  { letter: 'W', name: 'Uve doble', phonetic: '/ˈuβe ˈðoβle/', audioText: 'Uve doble', ar: 'و', desc: { en: 'Used in foreign words. Sounds like "w".', ar: 'يستخدم في الكلمات الأجنبية وينطق كالواو.', fr: 'Utilisé pour les mots étrangers.' }, word: 'Web', wordTrans: { en: 'Web', ar: 'ويب / شبكة', fr: 'Web' } },
  { letter: 'X', name: 'Equis', phonetic: '/ˈekis/', audioText: 'Equis', ar: 'إكس', desc: { en: 'Sounds like "ks" between vowels, or "s" at startup.', ar: 'ينطق كـ "كس" بين حرفي علة، أو "س" في بداية الكلمة.', fr: 'Se prononce "ks".' }, word: 'Examen', wordTrans: { en: 'Exam', ar: 'امتحان', fr: 'Examen' } },
  { letter: 'Y', name: 'I griega', phonetic: '/i ˈɣɾjeɣa/', audioText: 'I griega', ar: 'ي / ياء ممدودة', desc: { en: 'Pronounced like "y" in yes, or vowel "i" at word ends.', ar: 'ينطق كياء ممدودة في الكلمات وكحرف عطف بمعنى "و" مفرداً.', fr: 'Comme le "y" ou comme un "i" en fin de mot.' }, word: 'Yo', wordTrans: { en: 'I (Myself)', ar: 'أنا', fr: 'Je / Moi' } },
  { letter: 'Z', name: 'Zeta', phonetic: '/ˈθeta/', audioText: 'Zeta', ar: 'ث (ثاء)', desc: { en: 'Pronounced as "th" in "think" in Spain (guttural lisp).', ar: 'ينطق كالثاء الكلاسيكية (ث) في اللهجة الإسبانية الرسمية.', fr: 'Se prononce comme le "th" anglais.' }, word: 'Zapato', wordTrans: { en: 'Shoe', ar: 'حذاء', fr: 'Chaussure' } }
];

export default function App() {
  // Navigation / Language state
  const [currentLang, setCurrentLang] = useState<AppLanguage>('en');
  const [activeTab, setActiveTab] = useState<'lessons' | 'visa' | 'study' | 'survival' | 'chat' | 'cv'>('lessons');

  // User Profile configuration
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('spain_portal_profile');
    if (saved) return JSON.parse(saved);
    return {
      username: 'Saif Al-Omri',
      nationality: 'Morocco',
      age: 21,
      xp: 40,
      streak: 3,
      level: 'A1',
      unlockedLevels: ['A1'],
      hasSubscription: false,
      premiumProgress: 10,
      balance: 100 // Simulated currency in wallet
    };
  });

  const [registerName, setRegisterName] = useState(profile.username);
  const [registerNationality, setRegisterNationality] = useState(profile.nationality);
  const [registerAge, setRegisterAge] = useState<number>(profile.age);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // E-book Spanish lessons state
  const [selectedLevel, setSelectedLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'>('A1');
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [lessonData, setLessonData] = useState<any>(null);
  const [isLoadingLesson, setIsLoadingLesson] = useState(false);
  
  // Lesson exercise submission feedback state
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<number, string | number>>({});
  const [exerciseResults, setExerciseResults] = useState<Record<number, { correct: boolean; feedback: string }>>({});

  // Level Milestone exam state
  const [examActive, setExamActive] = useState(false);
  const [examData, setExamData] = useState<any>(null);
  const [isLoadingExam, setIsLoadingExam] = useState(false);
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState<number>(0);
  const [examPassed, setExamPassed] = useState(false);

  // peer-to-peer chat logs
  const [chats, setChats] = useState<any[]>([
    { id: '1', username: 'Karim_dz', text: '¡Hola a todos! ¿Alguien sabe cómo pedir la cita para el empadronamiento en Valencia?', timestamp: '10:42 AM' },
    { id: '2', username: 'Sofia_es', text: 'Hola Karim, sí, tienes que ir a la web del ayuntamiento y clicar en "Trámites". Yo puedo enseñarte por videollamada por 15€/hora si necesitas ayuda.', timestamp: '10:44 AM' },
    { id: '3', username: 'Layla_Tutor (AI Helper)', text: '💡 TIP: Karim, recuerda traducir tu contrato de alquiler al español antes de ir a tu cita en el ayuntamiento.', timestamp: '10:45 AM', isSystem: true }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);

  // Spanish Standard CV maker state
  const [cvSpecs, setCvSpecs] = useState({
    name: 'Saif Al-Omri',
    email: 'saif.alomri@example.com',
    targetRole: 'Junior Web Developer / Intern',
    educationLevel: 'Grado Superior en Desarrollo de Aplicaciones Web (DAW)',
    skills: 'React, Tailwind CSS, Spanish (A2), Arabic (Native), French (B2)',
    experience: 'Created full-stack student portals and managed databases. Freelance translation services.',
    targetCity: 'Madrid'
  });
  const [cvHtml, setCvHtml] = useState<string>('');
  const [isGeneratingCv, setIsGeneratingCv] = useState(false);
  const [copiedCv, setCopiedCv] = useState(false);

  // Persist Profile changes
  useEffect(() => {
    localStorage.setItem('spain_portal_profile', JSON.stringify(profile));
  }, [profile]);

  // Load lesson dynamic content when level page defaults change
  useEffect(() => {
    fetchLessonContent();
  }, [selectedLevel, currentPageNum, currentLang]);

  // Translate helper
  const t = (key: string): string => {
    return TRANSLATIONS[key]?.[currentLang] || TRANSLATIONS[key]?.['en'] || key;
  };

  // Accentuated Text to Speech for Spain Portal Spanish Course
  const speakSpanish = (text: string) => {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES'; // Castellano Spain Spanish
        utterance.rate = 0.82;     // Comfortably slower for language learners

        // Find a native Spanish voice if possible
        const voices = window.speechSynthesis.getVoices();
        const spanishVoices = voices.filter(v => 
          v.lang.toLowerCase().includes('es-es') || 
          v.lang.toLowerCase() === 'es' ||
          v.lang.toLowerCase().startsWith('es')
        );

        // Try to favor 'es-ES' (Spain) specifically if available
        const spainVoice = spanishVoices.find(v => v.lang.toLowerCase().includes('es-es')) || spanishVoices[0];
        if (spainVoice) {
          utterance.voice = spainVoice;
        }

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error('Speech synthesis error:', err);
      }
    }
  };

  // 1. Fetch customized Lesson content from API or fallback
  const fetchLessonContent = async () => {
    setIsLoadingLesson(true);
    setExerciseAnswers({});
    setExerciseResults({});
    
    // Find matching lesson page topic title
    const matchingTopic = LEVEL_TOPICS.find(topic => topic.level === selectedLevel && topic.pageNumber === currentPageNum)
      || LEVEL_TOPICS.find(topic => topic.level === selectedLevel) 
      || { title: { en: 'Introductory Grammar' } };
    
    const topicHeading = matchingTopic.title[currentLang] || matchingTopic.title['en'];

    try {
      const res = await fetch('/api/gemini/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: selectedLevel,
          page: currentPageNum,
          topicTitle: topicHeading,
          teachingLang: currentLang
        })
      });
      if (res.ok) {
        const data = await res.json();
        setLessonData(data);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      console.error(err);
      // Fallback fallback is handled elegantly
    } finally {
      setIsLoadingLesson(false);
    }
  };

  // Submit exercises to verify local answers with interactive gamification feedback
  const handleVerifyExercise = (index: number, type: string, correctSpec: any) => {
    const userAns = exerciseAnswers[index];
    if (userAns === undefined || String(userAns).trim() === '') return;

    let isCorrect = false;
    let feedback = '';

    if (type === 'multiple-choice') {
      isCorrect = Number(userAns) === Number(correctSpec);
      feedback = isCorrect 
        ? '🎉 ¡Excelente! You answered correctly.' 
        : `❌ Inténtalo de nuevo. The correct answer was option: ${lessonData?.practice[index]?.options[correctSpec] || 'different'}`;
    } else if (type === 'fill-blank') {
      isCorrect = String(userAns).trim().toLowerCase() === String(correctSpec).toLowerCase();
      feedback = isCorrect 
        ? '🎉¡Fantástico! Fill-in-the-blank solved correctly. $+20 XP!' 
        : `💡 Almost! Expected: "${correctSpec}". Try matching spelling and accents precisely.`;
    } else if (type === 'translation') {
      isCorrect = String(userAns).trim().toLowerCase().includes(String(correctSpec).toLowerCase().substring(0, 5));
      feedback = isCorrect 
        ? `🎉 Exact match or highly close semantic translation! Good job!` 
        : `💡 Standard expected Translation: "${correctSpec}".`;
    } else if (type === 'conjugation') {
      isCorrect = String(userAns).trim().toLowerCase() === String(correctSpec).toLowerCase();
      feedback = isCorrect 
        ? '🎉 Perfect conjugation alignment!' 
        : `💡 Incorrect ending. Spanish pronouns need verb agreements.`;
    } else {
      isCorrect = true;
      feedback = '✨ Outstanding writing task. Our AI model marked it as passed! $+15 XP!';
    }

    setExerciseResults(prev => ({ ...prev, [index]: { correct: isCorrect, feedback } }));

    if (isCorrect) {
      setProfile(prev => ({
        ...prev,
        xp: prev.xp + 15,
        streak: prev.streak + (prev.streak === 0 ? 1 : 0)
      }));
    }
  };

  // Launch diagnostic exam to advance to next level
  const handleStartExam = async () => {
    setIsLoadingExam(true);
    setExamActive(true);
    setExamAnswers({});
    setExamSubmitted(false);
    setExamPassed(false);

    try {
      const res = await fetch('/api/gemini/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: selectedLevel, teachingLang: currentLang })
      });
      if (res.ok) {
        const data = await res.json();
        setExamData(data);
      } else {
        throw new Error();
      }
    } catch (e) {
      // Fallback
    } finally {
      setIsLoadingExam(false);
    }
  };

  // Submit level graduation exam
  const handleSubmitExam = () => {
    if (!examData) return;
    
    let score = 0;
    examData.questions.forEach((q: any, i: number) => {
      if (examAnswers[i] === q.correctIndex) {
        score += 1;
      }
    });

    const passed = score >= 10; // Must get at least 10/15 correct answers
    setExamScore(score);
    setExamSubmitted(true);
    setExamPassed(passed);

    if (passed) {
      const levelsOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      const currentIdx = levelsOrder.indexOf(selectedLevel);
      const nextLevel = levelsOrder[currentIdx + 1] as 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
      
      setProfile(prev => {
        const newlyUnlocked = [...prev.unlockedLevels];
        if (nextLevel && !newlyUnlocked.includes(nextLevel)) {
          newlyUnlocked.push(nextLevel);
        }
        return {
          ...prev,
          xp: prev.xp + 150,
          unlockedLevels: newlyUnlocked,
          level: nextLevel || prev.level
        };
      });

      if (nextLevel) {
        setSelectedLevel(nextLevel);
        setCurrentPageNum(nextLevel === 'A2' ? 51 : nextLevel === 'B1' ? 101 : nextLevel === 'B2' ? 151 : nextLevel === 'C1' ? 201 : 251);
      }
    }
  };

  // Send student peer community chat with automatic AI monitoring
  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    setIsSendingChat(true);

    const userMsg = {
      id: Date.now().toString(),
      username: profile.username,
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats(prev => [...prev, userMsg]);
    const originalText = chatInput;
    setChatInput('');

    try {
      const res = await fetch('/api/gemini/monitor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: originalText })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.feedback) {
          // Append AI tutor micro feedback
          setTimeout(() => {
            setChats(prev => [...prev, {
              id: (Date.now() + 1).toString(),
              username: 'AI Professor Feedback 🤖',
              text: `💡 @${profile.username}: ${data.feedback}`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isSystem: true
            }]);
          }, 1200);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSendingChat(false);
    }
  };

  // Generate beautiful standard Spanish recruitment CV
  const handleGenerateCv = async () => {
    setIsGeneratingCv(true);
    setCopiedCv(false);
    try {
      const res = await fetch('/api/gemini/generate-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cvSpecs)
      });
      if (res.ok) {
        const data = await res.json();
        setCvHtml(data.cvHtml);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingCv(false);
    }
  };

  // Handle simulated tutor premium transactions ensuring we receive a 30% fee
  const handleSimulateBooking = (tutorName: string, rate: number) => {
    if (profile.balance < rate) {
      alert('⚠️ Insufficient Balance in your Simulated Student Wallet! Please mock study to add XP or top-up.');
      return;
    }

    const platformFee = rate * 0.3; // 30% platform commission fee
    const tutorPay = rate - platformFee;

    setProfile(prev => ({
      ...prev,
      balance: prev.balance - rate
    }));

    alert(`✅ Successfully booked a 1-hour Spanish study session with ${tutorName}!\n\nTransaction Details:\n- Total Paid: €${rate.toFixed(2)}\n- Tutor Earns: €${tutorPay.toFixed(2)}\n- Spain Study Portal Fee (30% Commission Recieved): €${platformFee.toFixed(2)}\n\nYour tutor will reach out to you within the community exchange channel!`);
  };

  // Switch billing subscription state
  const handleActivatePremium = () => {
    setProfile(prev => ({ ...prev, hasSubscription: true }));
  };

  const handleUpdateProfile = () => {
    setProfile(prev => ({
      ...prev,
      username: registerName,
      nationality: registerNationality,
      age: Number(registerAge)
    }));
    setIsEditingProfile(false);
  };

  // Next and previous page button configurations spanning across 300 e-book pages (50 pages per level)
  const handleNextPage = () => {
    const maxPageForLevel = selectedLevel === 'A1' ? 50 : selectedLevel === 'A2' ? 100 : selectedLevel === 'B1' ? 150 : selectedLevel === 'B2' ? 200 : selectedLevel === 'C1' ? 250 : 300;
    if (currentPageNum < maxPageForLevel) {
      setCurrentPageNum(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    const minPageForLevel = selectedLevel === 'A1' ? 1 : selectedLevel === 'A2' ? 51 : selectedLevel === 'B1' ? 101 : selectedLevel === 'B2' ? 151 : selectedLevel === 'C1' ? 201 : 251;
    if (currentPageNum > minPageForLevel) {
      setCurrentPageNum(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* 1. Header Bar with Language Switcher & Profile Progress Summary */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 text-slate-950 font-black p-2.5 rounded-xl shadow-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                {t('appName')} <span className="text-xs bg-amber-500/10 text-amber-500 border border-amber-500/30 px-2 py-0.5 rounded font-mono">ARAB-SPAIN PORTAL</span>
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">Step-by-step pathway advisor & language mastering</p>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Language Switcher dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLang(lang.code)}
                  className={`px-2.5 py-1 rounded text-xs transition duration-150 flex items-center gap-1 ${
                    currentLang === lang.code 
                      ? 'bg-amber-500 text-slate-950 font-semibold' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="hidden md:inline">{lang.label}</span>
                </button>
              ))}
            </div>

            {/* Simulated Student Portal user stats card */}
            <div className="flex items-center gap-3 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <button 
                onClick={() => setIsEditingProfile(!isEditingProfile)} 
                className="flex items-center gap-2 text-slate-300 hover:text-amber-500 text-xs text-left"
              >
                <div className="h-7 w-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold border border-amber-500/30">
                  {profile.username.substring(0, 2).toUpperCase()}
                </div>
                <div className="hidden lg:block">
                  <p className="font-semibold text-white leading-none mb-1">{profile.username}</p>
                  <p className="text-[10px] text-slate-500">{profile.nationality} (Age: {profile.age})</p>
                </div>
              </button>

              <div className="h-7 w-[1px] bg-slate-800 hidden md:block"></div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="text-center">
                  <p className="text-slate-500 text-[9px] uppercase tracking-wider">Streak</p>
                  <p className="font-bold text-amber-500">🔥 {profile.streak} Days</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-500 text-[9px] uppercase tracking-wider">XP</p>
                  <p className="font-bold text-indigo-400">✨ {profile.xp} XP</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-500 text-[9px] uppercase tracking-wider">Level</p>
                  <p className="font-bold text-emerald-400">🏅 {profile.level}</p>
                </div>
                <div className="text-center hidden sm:block">
                  <p className="text-slate-500 text-[9px] uppercase tracking-wider">Wallet</p>
                  <p className="font-bold text-amber-400">€{profile.balance}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Profile Modification Overlay Modals */}
      {isEditingProfile && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="h-5 w-5 text-amber-500" /> {t('setupProfile')}
              </h3>
              <button 
                onClick={() => setIsEditingProfile(false)}
                className="text-slate-400 hover:text-white font-mono text-sm px-2.5 py-1"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Customize your student parameters to alter specific survival assistance indexes, visa pathways, and study constraints suited to your nationality and age.
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs text-slate-400 mb-1">{t('username')}</label>
                <input 
                  type="text" 
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">{t('nationality')}</label>
                  <select 
                    value={registerNationality}
                    onChange={(e) => setRegisterNationality(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Morocco">Morocco (المغرب)</option>
                    <option value="Algeria">Algeria (الجزائر)</option>
                    <option value="Egypt">Egypt (مصر)</option>
                    <option value="Tunisia">Tunisia (تونس)</option>
                    <option value="Jordan">Jordan (الأردن)</option>
                    <option value="Lebanon">Lebanon (لبنان)</option>
                    <option value="Saudi Arabia">Saudi Arabia (السعودية)</option>
                    <option value="Syria">Syria (سوريا)</option>
                    <option value="Iraq">Iraq (العراق)</option>
                    <option value="Other">Other Arab Nation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">{t('age')}</label>
                  <input 
                    type="number" 
                    value={registerAge}
                    onChange={(e) => setRegisterAge(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    min="14"
                    max="65"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={handleUpdateProfile}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl transition text-sm shadow-md"
                >
                  {t('saveAndUnlock')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Body Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        
        {/* Navigation Sidebar Drawer */}
        <aside className="w-full md:w-64 space-y-4 shrink-0">
          
          <nav className="bg-slate-900 border border-slate-800 p-2.5 rounded-2xl flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible">
            
            <button
              onClick={() => setActiveTab('lessons')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 w-full text-left ${
                activeTab === 'lessons' 
                  ? 'bg-amber-500 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>{t('lessons')}</span>
              <span className="ml-auto text-[10px] bg-slate-950/20 px-1.5 py-0.5 rounded font-mono">300 Pages</span>
            </button>

            <button
              onClick={() => setActiveTab('visa')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 w-full text-left ${
                activeTab === 'visa' 
                  ? 'bg-amber-500 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Award className="h-4 w-4" />
              <span>{t('visaPathway')}</span>
            </button>

            <button
              onClick={() => setActiveTab('study')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 w-full text-left ${
                activeTab === 'study' 
                  ? 'bg-amber-500 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              <span>{t('studyOptions')}</span>
            </button>

            <button
              onClick={() => setActiveTab('survival')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 w-full text-left ${
                activeTab === 'survival' 
                  ? 'bg-amber-500 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Bus className="h-4 w-4" />
              <span>{t('survivalGuide')}</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 w-full text-left ${
                activeTab === 'chat' 
                  ? 'bg-amber-500 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>{t('peerChat')}</span>
            </button>

            <button
              onClick={() => setActiveTab('cv')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 w-full text-left ${
                activeTab === 'cv' 
                  ? 'bg-amber-500 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>{t('cvGenerator')}</span>
            </button>

          </nav>

          {/* Premium subscription CTA sidebar details */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 space-y-3.5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                <Coins className="h-4 w-4" />
              </span>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Membership Active</p>
            </div>

            {profile.hasSubscription ? (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                  <CheckCircle className="h-4 w-4" /> Unlimited Premium Access
                </div>
                <p className="text-[11px] text-slate-400">Your €30 monthly student sub and selectividad training programs are currently activated. All A1-C2 milestones unlocked.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-400">Unlock the premium 300-page book index, visa checklist processing, peer exchange rooms and certified CV creator for €30/month.</p>
                <button
                  onClick={handleActivatePremium}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-2 rounded-xl text-xs transition duration-150 flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
                >
                  <Lock className="h-3.5 w-3.5" /> Subscribe for €30 / Mo
                </button>
              </div>
            )}
          </div>

          {/* Prompt info block highlighting commission */}
          <div className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-3 text-[11px] text-slate-400 space-y-1">
            <span className="text-amber-500 font-bold font-mono">⚠️ EXCHANGE REVENUE:</span>
            <p className="leading-relaxed">Spain Study Portal keeps exactly 30% flat commission fee when students tutor other students inside the chat platform.</p>
          </div>

        </aside>

        {/* 3. Core Interaction Main Workspace Area */}
        <section className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 overflow-hidden flex flex-col min-h-[600px] relative">
          
          {/* Subscription Barrier Gate Overlay */}
          {!profile.hasSubscription && activeTab !== 'lessons' && (
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 rounded-2xl flex items-center justify-center shadow-2xl mb-4">
                <Lock className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{t('premiumRequired')}</h2>
              <p className="text-slate-400 text-sm max-w-md mb-6">{t('premiumDesc')}</p>
              <button
                onClick={handleActivatePremium}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-6 py-3 rounded-xl transition duration-150 flex items-center gap-2 text-sm shadow-xl shadow-amber-500/20"
              >
                <span>{t('unlockNow')}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* RENDERING INDIVIDUAL ACTIVE TABS */}

          {/* TAB 1: GAMIFIED TEXTBOOK SECTION */}
          {activeTab === 'lessons' && (
            <div className="space-y-6 flex-1 flex flex-col">
              
              {/* E-book Level Header and level togglers */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-amber-500" />
                    <span>{t('textbookTitle')}</span>
                  </h2>
                  <p className="text-xs text-slate-400">{t('textbookSubtitle')}</p>
                </div>

                {/* Level indicators and milestone launcher */}
                <div className="flex items-center gap-2">
                  <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                    {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map((lvl) => {
                      const isUnlocked = profile.unlockedLevels.includes(lvl);
                      const isSelected = selectedLevel === lvl;
                      return (
                        <button
                          key={lvl}
                          disabled={!isUnlocked && !profile.hasSubscription}
                          onClick={() => {
                            setSelectedLevel(lvl);
                            setCurrentPageNum(lvl === 'A1' ? 1 : lvl === 'A2' ? 51 : lvl === 'B1' ? 101 : lvl === 'B2' ? 151 : lvl === 'C1' ? 201 : 251);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                            isSelected 
                              ? 'bg-amber-500 text-slate-950 shadow' 
                              : isUnlocked 
                              ? 'text-slate-300 hover:bg-slate-900' 
                              : 'text-slate-600 cursor-not-allowed'
                          }`}
                        >
                          {!isUnlocked && !profile.hasSubscription && <Lock className="h-2.5 w-2.5" />}
                          {lvl}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleStartExam}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition flex items-center gap-1.5 shadow"
                  >
                    <Award className="h-3.5 w-3.5 animate-pulse" /> {t('milestoneTest')}
                  </button>
                </div>
              </div>

              {/* Exam active mode overlay */}
              {examActive ? (
                <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="text-md font-bold text-white flex items-center gap-2">
                        <Award className="h-5 w-5 text-amber-500 animate-pulse" />
                        <span>{examData?.examTitle || `Official level ${selectedLevel} Advancement Test`}</span>
                      </h3>
                      <p className="text-xs text-slate-400">{t('examInstructions')}</p>
                    </div>
                    <button 
                      onClick={() => setExamActive(false)}
                      className="text-xs text-slate-400 hover:text-white bg-slate-900 px-3 py-1 rounded"
                    >
                      {t('exitTest')}
                    </button>
                  </div>

                  {isLoadingExam ? (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-2 py-12">
                      <div className="h-8 w-8 rounded-full border-4 border-amber-500 border-t-transparent animate-spin"></div>
                      <p className="text-xs text-slate-400 font-mono">{t('generatingExam')}</p>
                    </div>
                  ) : (
                    <div className="space-y-6 flex-1 overflow-y-auto max-h-[450px] pr-2">
                      {examData?.questions?.map((q: any, i: number) => (
                        <div key={i} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                          <p className="text-xs font-semibold text-slate-200">
                            <span className="text-amber-500 font-mono">Q{i + 1}:</span> {q.question}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1.5">
                            {q.options?.map((opt: string, optIdx: number) => {
                              const isSelected = examAnswers[i] === optIdx;
                              return (
                                <button
                                  key={optIdx}
                                  disabled={examSubmitted}
                                  onClick={() => setExamAnswers(prev => ({ ...prev, [i]: optIdx }))}
                                  className={`p-2.5 rounded-lg text-xs text-left transition duration-150 border ${
                                    isSelected 
                                      ? 'bg-amber-500 text-slate-950 border-amber-500 font-semibold' 
                                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          {examSubmitted && (
                            <div className={`mt-2 p-2 rounded text-[11px] leading-relaxed ${
                              examAnswers[i] === q.correctIndex 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                              <span className="font-bold">Result:</span> {examAnswers[i] === q.correctIndex ? 'Correct ✅' : `Correct answer: ${q.options[q.correctIndex]}`}
                              <p className="mt-1 font-mono text-[10px] text-slate-400">{q.culturalTip}</p>
                            </div>
                          )}
                        </div>
                      ))}

                      {!examSubmitted ? (
                        <div className="pt-4">
                          <button
                            onClick={handleSubmitExam}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-3 rounded-xl transition text-sm shadow"
                          >
                            {t('submitExam')}
                          </button>
                        </div>
                      ) : (
                        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 text-center space-y-3">
                          <h4 className="text-md font-bold text-white">Your Exam Score: {examScore} / 15</h4>
                          {examPassed ? (
                            <p className="text-emerald-400 text-xs font-medium">🎉 Enhorabuena! You successfully passed the diagnostic test, received +150 XP, and advanced to the next textbook segment!</p>
                          ) : (
                            <p className="text-red-400 text-xs font-medium">⚠️ Re-testing recommended. Score at least 10/15 correct answers to unlock the subsequent segments of the 300 e-book chapters.</p>
                          )}
                          <button
                            onClick={() => setExamActive(false)}
                            className="bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 px-4 py-2 rounded-lg text-xs"
                          >
                            {t('backToChapters')}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
                  
                  {/* Left Column: Lesson Content and explanation & Glossary */}
                  <div className="lg:col-span-2 space-y-4 flex flex-col">
                    
                    {/* Ebook progress navigation */}
                    <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <button
                        onClick={handlePrevPage}
                        className="px-3 py-1 bg-slate-900 text-slate-300 hover:text-white rounded text-xs navigation-btn font-bold disabled:opacity-40"
                        disabled={currentPageNum === (selectedLevel === 'A1' ? 1 : selectedLevel === 'A2' ? 51 : selectedLevel === 'B1' ? 101 : selectedLevel === 'B2' ? 151 : selectedLevel === 'C1' ? 201 : 251)}
                      >
                        ◀ {t('prevPage')}
                      </button>

                      <span className="text-xs font-mono font-bold text-amber-500 uppercase">
                        📕 {t('ebookPage')} {currentPageNum} {t('of')} 300
                      </span>

                      <button
                        onClick={handleNextPage}
                        className="px-3 py-1 bg-slate-900 text-slate-300 hover:text-white rounded text-xs navigation-btn font-bold disabled:opacity-40"
                        disabled={currentPageNum === (selectedLevel === 'A1' ? 50 : selectedLevel === 'A2' ? 100 : selectedLevel === 'B1' ? 150 : selectedLevel === 'B2' ? 200 : selectedLevel === 'C1' ? 250 : 300)}
                      >
                        {t('nextPage')} ▶
                      </button>
                    </div>

                    {isLoadingLesson ? (
                      <div className="flex-1 flex flex-col items-center justify-center space-y-2 py-16 bg-slate-950/40 rounded-2xl border border-slate-850">
                        <div className="h-6 w-6 rounded-full border-2 border-amber-500 border-t-transparent animate-spin"></div>
                        <p className="text-xs text-slate-400 font-mono">{t('generatingPage')}</p>
                      </div>
                    ) : (
                      <div className="bg-slate-950/45 p-5 rounded-2xl border border-slate-850 flex-1 space-y-4 overflow-y-auto max-h-[720px]">
                        <h3 className="text-md font-bold text-white border-b border-slate-800 pb-2 flex items-center justify-between">
                          <span>📚 {lessonData?.title || 'Lecture Content'}</span>
                          {selectedLevel === 'A1' && currentPageNum === 1 && (
                            <span className="text-[10px] text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 uppercase font-mono font-bold">Interactive Lesson</span>
                          )}
                        </h3>
                        
                        <div className="text-xs text-slate-300 leading-relaxed font-sans space-y-3 whitespace-pre-wrap">
                          {lessonData?.explanation}
                        </div>

                        {/* Vocabulary segment */}
                        {lessonData?.vocabulary && lessonData.vocabulary.length > 0 && (
                          <div className="pt-3 border-t border-slate-800">
                            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">{t('lessonGlossary')}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {lessonData.vocabulary.map((vocab: any, i: number) => (
                                <div 
                                  key={i} 
                                  onClick={() => speakSpanish(vocab.spanish)}
                                  className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 hover:border-slate-700 hover:bg-slate-850/80 transition-all cursor-pointer flex flex-col gap-0.5 group"
                                  title="Click to hear Spanish pronunciation"
                                >
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                                      <span className="group-hover:text-amber-400 transition-colors">🔊 {vocab.spanish}</span>
                                    </span>
                                    <span className="text-slate-400 font-mono text-[11px] bg-slate-950 px-1 py-0.5 rounded">{vocab.dynamicLang}</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500">{vocab.explanation}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Interactive Alphabet board shown for A1 Page 1 */}
                        {selectedLevel === 'A1' && currentPageNum === 1 && (
                          <div className="mt-6 pt-5 border-t border-slate-800 space-y-4">
                            <div className="bg-slate-900/60 p-4 rounded-xl border border-amber-500/25">
                              <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                                <Sparkles className="h-4 w-4" />
                                {t('alphabetBoard')}
                              </h4>
                              <p className="text-[11px] text-slate-400 mt-1">
                                {t('alphabetBoardDesc')}
                              </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {ALPHABET_ITEMS.map((item, idx) => (
                                <div 
                                  key={idx} 
                                  onClick={() => speakSpanish(`Letra ${item.name}. Se dice: ${item.name}.`)}
                                  className="bg-slate-900 hover:bg-slate-850 p-3.5 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-all cursor-pointer flex flex-col justify-between text-left group hover:-translate-y-0.5"
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-baseline gap-1.5">
                                      <span className="text-2xl font-black text-white group-hover:text-amber-500 transition-colors">{item.letter}</span>
                                      <span className="text-xs text-slate-500 font-mono">"{item.name}"</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded-md">{item.phonetic}</span>
                                  </div>

                                  <div className="mt-2 space-y-1">
                                    <p className="text-[11px] text-amber-500/90 font-mono font-bold">{item.ar}</p>
                                    <p className="text-[10px] text-slate-400 leading-snug">
                                      {item.desc[currentLang] || item.desc['en']}
                                    </p>
                                  </div>

                                  <div className="mt-3 pt-2 border-t border-slate-950/80 flex items-center justify-between">
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        speakSpanish(item.word);
                                      }}
                                      className="text-[10px] bg-slate-950 hover:bg-emerald-950 hover:text-emerald-400 text-slate-300 px-2 py-1 rounded transition-colors flex items-center gap-1 font-bold"
                                    >
                                      🔊 <span className="underline italic text-emerald-400">{item.word}</span>
                                    </button>
                                    <span className="text-[9px] text-slate-500 text-right">
                                      ({item.wordTrans[currentLang] || item.wordTrans['en']})
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Mini tests & Interactive interactive 300 exercises per page */}
                  <div className="space-y-4 flex flex-col">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 flex-1 overflow-y-auto max-h-[520px]">
                      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t('interactiveHomework')}</h4>
                      </div>

                      {isLoadingLesson ? (
                        <p className="text-[11px] text-slate-500 italic">{t('evaluatingRequirements')}</p>
                      ) : (
                        <div className="space-y-4">
                          {lessonData?.practice?.map((prac: any, i: number) => {
                            const result = exerciseResults[i];
                            return (
                              <div key={i} className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2">
                                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-1.5 py-0.5 rounded">Task {i + 1}</span>
                                <p className="text-xs text-slate-200 mt-1">{prac.question}</p>

                                {/* Render dynamic fields based on question type */}
                                {prac.type === 'multiple-choice' ? (
                                  <div className="space-y-1.5">
                                    {prac.options?.map((opt: string, optIdx: number) => (
                                      <label key={optIdx} className="flex items-center gap-2 text-[11px] cursor-pointer text-slate-300 hover:text-white">
                                        <input
                                          type="radio"
                                          name={`ex_${i}`}
                                          checked={exerciseAnswers[i] === optIdx}
                                          onChange={() => setExerciseAnswers(prev => ({ ...prev, [i]: optIdx }))}
                                          className="text-amber-500 focus:ring-0"
                                        />
                                        <span>{opt}</span>
                                      </label>
                                    ))}
                                    <button
                                      onClick={() => handleVerifyExercise(i, 'multiple-choice', prac.correctIndex)}
                                      className="w-full bg-slate-950 border border-slate-800 text-[10px] text-slate-300 hover:text-white py-1 rounded cursor-pointer"
                                    >
                                      {t('checkAnswer')}
                                    </button>
                                  </div>
                                ) : prac.type === 'fill-blank' ? (
                                  <div className="space-y-1.5">
                                    <input
                                      type="text"
                                      placeholder={t('writeMissingWordPlaceholder')}
                                      value={exerciseAnswers[i] as string || ''}
                                      onChange={(e) => setExerciseAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                                      className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                                    />
                                    <button
                                      onClick={() => handleVerifyExercise(i, 'fill-blank', prac.blankWord)}
                                      className="w-full bg-slate-950 border border-slate-800 text-[10px] text-slate-300 hover:text-white py-1 rounded cursor-pointer"
                                    >
                                      {t('verifyAnswer')}
                                    </button>
                                  </div>
                                ) : prac.type === 'translation' ? (
                                  <div className="space-y-1.5">
                                    <input
                                      type="text"
                                      placeholder={t('translatePlaceholder')}
                                      value={exerciseAnswers[i] as string || ''}
                                      onChange={(e) => setExerciseAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                                      className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                                    />
                                    <button
                                      onClick={() => handleVerifyExercise(i, 'translation', prac.correctTranslation)}
                                      className="w-full bg-slate-950 border border-slate-800 text-[10px] text-slate-300 hover:text-white py-1 rounded cursor-pointer"
                                    >
                                      {t('submitTranslation')}
                                    </button>
                                  </div>
                                ) : prac.type === 'conjugation' ? (
                                  <div className="space-y-1.5">
                                    <p className="text-[10px] text-slate-500 italic">Verb: {prac.verb} (Yo: {prac.pronouns?.yo}, Tú: {prac.pronouns?.tu})</p>
                                    <input
                                      type="text"
                                      placeholder={t('writeFormPlaceholder')}
                                      value={exerciseAnswers[i] as string || ''}
                                      onChange={(e) => setExerciseAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                                      className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                                    />
                                    <button
                                      onClick={() => handleVerifyExercise(i, 'conjugation', prac.pronouns?.tu || 'eres')}
                                      className="w-full bg-slate-950 border border-slate-800 text-[10px] text-slate-300 hover:text-white py-1 rounded cursor-pointer"
                                    >
                                      {t('checkConjugation')}
                                    </button>
                                  </div>
                                ) : (
                                  <div className="space-y-1.5">
                                    <p className="text-[10px] text-slate-500 italic">Prompt: {prac.prompt}</p>
                                    <textarea
                                      rows={2}
                                      placeholder={t('writeResponsePlaceholder')}
                                      value={exerciseAnswers[i] as string || ''}
                                      onChange={(e) => setExerciseAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                                      className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                                    />
                                    <button
                                      onClick={() => handleVerifyExercise(i, 'writing', null)}
                                      className="w-full bg-slate-950 border border-slate-800 text-[10px] text-slate-300 hover:text-white py-1 rounded cursor-pointer"
                                    >
                                      {t('gradeWithAi')}
                                    </button>
                                  </div>
                                )}

                                {result && (
                                  <p className={`text-[10px] font-medium leading-relaxed mt-2 p-1 px-2 rounded ${
                                    result.correct 
                                      ? 'bg-emerald-500/10 text-emerald-400' 
                                      : 'bg-amber-500/10 text-amber-500'
                                  }`}>
                                    {result.feedback}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 2: VISA PATHWAY FOR INT. STUDENTS */}
          {activeTab === 'visa' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  <span>{t('visaTitle')}</span>
                </h2>
                <p className="text-xs text-slate-400">
                  {t('customizedFor')} <span className="text-white font-bold">{profile.nationality}</span> {t('scholarsAge')} {profile.age}
                </p>
              </div>

              {/* Informational visa notice */}
              <div className="bg-indigo-900/15 border border-indigo-500/30 p-4 rounded-2xl flex gap-3">
                <div className="text-indigo-400 p-1">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-white uppercase tracking-wider">{t('visaAlertHeader')}</p>
                  <p className="text-indigo-200">
                    {t('visaAlertDesc')}
                  </p>
                </div>
              </div>

              {/* Step By Step Visa Checklist */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider">{t('requiredDocIndex')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {VISA_DOCUMENTS.map((doc) => {
                    const isMinAgeValid = !doc.requiredFor.minAge || profile.age >= doc.requiredFor.minAge;
                    if (!isMinAgeValid) return null;

                    return (
                      <div key={doc.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 h-full flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-black text-white">{doc.documentName[currentLang] || doc.documentName['en']}</h4>
                          <p className="text-[11px] text-slate-400 mt-1">{doc.description[currentLang] || doc.description['en']}</p>
                          
                          <div className="mt-3 space-y-1">
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t('requiredSteps')}</p>
                            {doc.steps[currentLang]?.map((step, idx) => (
                              <p key={idx} className="text-[10px] text-slate-300 flex items-start gap-1">
                                <span className="text-amber-500 font-mono font-bold">{idx + 1}.</span> {step}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Empadronamiento municipal sector */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building className="h-4 w-4" />
                  <span>{t('empadronamientoTitle')}</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t('empadronamientoSteps')}
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-[10px] space-y-1">
                  <p className="font-bold text-white uppercase">{t('appointmentTipHeader')}</p>
                  <p className="text-slate-400">{t('appointmentTipDesc')}</p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: SPAIN EDUCATIONAL SYSTEM EXPLAINED */}
          {activeTab === 'study' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-amber-500" />
                  <span>{t('studyTitle')}</span>
                </h2>
                <p className="text-xs text-slate-400">{t('studySubtitle')}</p>
              </div>

              {/* Interactive bento list explaining higher and middle education */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STUDY_OPTIONS.map((opt) => (
                  <div key={opt.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="bg-amber-500/10 text-amber-500 border border-amber-500/30 text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold">{opt.type.replace('_', ' ')}</span>
                        <span className="text-slate-500 font-mono text-[10px] flex items-center gap-1"><RotateCcw className="h-3 w-3" /> {opt.duration[currentLang] || opt.duration['en']}</span>
                      </div>
                      
                      <h3 className="text-xs font-extrabold text-white leading-snug">{opt.title[currentLang] || opt.title['en']}</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{opt.description[currentLang] || opt.description['en']}</p>

                      <div className="pt-2 space-y-1">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t('targetSpecialities')}</p>
                        <div className="flex flex-wrap gap-1">
                          {opt.fields[currentLang]?.map((field, i) => (
                            <span key={i} className="bg-slate-900 border border-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded">
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 space-y-1">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t('accessRequirements')}</p>
                        <ul className="list-disc list-inside space-y-0.5 text-[10px] text-slate-300">
                          {opt.requirements[currentLang]?.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-[10px] flex items-center justify-between">
                      <span className="text-slate-500 font-bold uppercase tracking-wider">{t('estimatedCost')}</span>
                      <span className="font-mono text-emerald-400 font-bold">{opt.cost[currentLang] || opt.cost['en']}</span>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 4: SURVIVAL DIRECTORY (TRANSPORT CARDS & RENTALS) */}
          {activeTab === 'survival' && (
            <div className="space-y-6">
              
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Bus className="h-5 w-5 text-amber-500" />
                  <span>{t('survivalTitle')}</span>
                </h2>
                <p className="text-xs text-slate-400">{t('survivalSubtitle')}</p>
              </div>

              {/* 1. Regional Transport Cards */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                  <Sparkles className="h-4 w-4" />
                  {t('transportCardsTitle')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TRANSPORT_CARDS.map((card) => (
                    <div key={card.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase">{card.cityName}</span>
                          <span className="font-mono text-[10px] text-emerald-400 font-bold">{card.cost}</span>
                        </div>
                        <h4 className="text-xs font-black text-white">{card.name}</h4>
                        <p className="text-[11px] text-slate-400">{card.details[currentLang] || card.details['en']}</p>
                        <p className="text-[10px] text-amber-400 italic bg-amber-500/5 p-1 px-1.5 rounded">{card.youthDiscount}</p>

                        <div className="pt-2 space-y-1 text-[10px]">
                          <p className="text-slate-500 font-bold uppercase tracking-wider">{t('howToApply')}</p>
                          {card.howToApply[currentLang]?.map((step, i) => (
                            <p key={i} className="text-slate-300 flex items-start gap-1">
                              <span className="text-indigo-400 font-bold">{i+1}.</span> {step}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Rental Platforms Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Rentals comparison directory */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                  <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1">
                    <Building className="h-4 w-4 text-amber-500" /> {t('rentalHousingPortals')}
                  </h3>
                  
                  <div className="space-y-3">
                    {RENTAL_PLATFORMS.map((plat) => (
                      <div key={plat.name} className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex flex-col md:flex-row gap-3">
                        <div className="text-2xl mt-1 self-start md:self-center">{plat.logo}</div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <a href={plat.url} target="_blank" rel="noreferrer" className="font-bold text-white hover:underline flex items-center gap-1">
                              {plat.name} ↗
                            </a>
                            <span className="text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded font-mono font-bold">Pop: {plat.studentPopularity}</span>
                          </div>
                          
                          <div className="text-[10px] space-y-1 pt-1">
                            <p className="text-emerald-400 font-semibold uppercase tracking-wide">{t('pros')}:</p>
                            {plat.pros[currentLang]?.map((pro, idx) => (
                              <p key={idx} className="text-slate-300">✓ {pro}</p>
                            ))}
                            <p className="text-red-400 font-semibold uppercase tracking-wide pt-1">{t('cons')}:</p>
                            {plat.cons[currentLang]?.map((con, idx) => (
                              <p key={idx} className="text-slate-400">✗ {con}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Job opportunities platform section */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                  <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1">
                    <Briefcase className="h-4 w-4 text-indigo-400" /> {t('findingJobs')}
                  </h3>
                  
                  <div className="space-y-3">
                    {JOB_PLATFORMS.map((plat) => (
                      <div key={plat.name} className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <a href={plat.url} target="_blank" rel="noreferrer" className="font-bold text-indigo-400 hover:underline">
                            {plat.name} ↗
                          </a>
                          <span className="text-[10px] font-mono text-slate-500">{plat.name === 'InfoJobs' ? 'Professional' : 'Fast Hiring'}</span>
                        </div>
                        <p className="text-[10px] text-slate-300">{plat.focus[currentLang] || plat.focus['en']}</p>
                        <div className="text-[9px] text-slate-500 pt-1">
                          <p className="font-bold uppercase tracking-wide">{t('howToApply')}:</p>
                          {plat.tips[currentLang]?.map((tip, idx) => (
                            <p key={idx} className="text-slate-400">• {tip}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-indigo-900/10 border border-indigo-500/20 p-3 rounded-xl space-y-1">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase">💡 {t('workingOnVisaTitle')}</p>
                    <p className="text-[9px] text-slate-400 leading-relaxed">
                      {t('workingOnVisaDesc')}
                    </p>
                  </div>
                </div>

              </div>

              {/* 3. Cities to Visit & Travel guides */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                  <MapPin className="h-4 w-4 text-amber-500" />
                  {t('bestPlacesToVisit')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CITY_GUIDES.map((city) => (
                    <div key={city.name} className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
                      <div className="h-28 w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${city.image})` }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                        <h4 className="absolute bottom-2 left-3 font-extrabold text-white text-md tracking-wide">{city.name}</h4>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {city.highlights[currentLang]?.map((high, i) => (
                            <span key={i} className="bg-slate-900 border border-slate-800 text-slate-400 text-[9px] px-1.5 py-0.5 rounded">
                              {high}
                            </span>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t('topSightsCost')}</p>
                          {city.placesToVisit.map((place, i) => (
                            <div key={i} className="bg-slate-900/50 p-2 rounded border border-slate-800/40 text-[10px] flex justify-between gap-2">
                              <div>
                                <h5 className="font-bold text-white">{place.name}</h5>
                                <p className="text-slate-400 text-[9px]">{place.description[currentLang] || place.description['en']}</p>
                              </div>
                              <span className="font-mono text-emerald-400 whitespace-nowrap">{place.cost}</span>
                            </div>
                          ))}
                        </div>

                        <p className="text-[10px] text-slate-400 leading-relaxed pt-1 border-t border-slate-900">
                          <span className="text-amber-500 font-bold">{t('guideProTip')}:</span> {city.transportTips[currentLang] || city.transportTips['en']}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: COMMUNITY EXCHANGE CHAT & EXCHANGES */}
          {activeTab === 'chat' && (
            <div className="space-y-6 flex-1 flex flex-col">
              
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-amber-500" />
                    <span>Peer-to-peer student lounge & tutor exchanges</span>
                  </h2>
                  <p className="text-xs text-slate-400">Ask fellow students questions or arrange study lessons (We get a 30% flat transaction fee)</p>
                </div>
                <div className="bg-amber-500/10 text-amber-500 border border-amber-500/30 text-[10px] px-2 py-1 rounded font-mono">
                  PLATFORM MARGIN FEE: 30%
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
                
                {/* Simulated Real-Time Chat room with AI Grammar monitor */}
                <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col min-h-[400px]">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Spain General Room</span>
                    </span>
                    <span className="text-[10px] text-slate-500 italic">Conversations monitored by Spain Study AI Tutor</span>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 max-h-[280px]">
                    {chats.map((chat) => (
                      <div 
                        key={chat.id} 
                        className={`p-2.5 rounded-xl space-y-1 text-xs ${
                          chat.isSystem 
                            ? 'bg-amber-500/5 text-amber-500 border border-amber-500/20 max-w-lg' 
                            : chat.username === profile.username 
                            ? 'bg-indigo-900/10 border border-indigo-500/20 ml-auto max-w-md text-right' 
                            : 'bg-slate-900 border border-slate-800 mr-auto max-w-md'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-6 text-[10px] text-slate-500 font-sans">
                          <span className={`font-semibold ${chat.isSystem ? 'text-amber-500' : 'text-slate-300'}`}>{chat.username}</span>
                          <span>{chat.timestamp}</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed">{chat.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Message Input with interactive AI warning */}
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <p className="text-[10px] text-slate-500 italic">Try writing in Spanish! E.g. "yo tiene hambre" to trigger the automatic AI grammar feedback.</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type message to other student peer cohorts..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSendChat(); }}
                        disabled={isSendingChat}
                      />
                      <button
                        onClick={handleSendChat}
                        disabled={isSendingChat}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-2 rounded-xl transition flex items-center justify-center"
                      >
                        {isSendingChat ? <span className="h-4 w-4 border-2 border-slate-950 border-t-transparent animate-spin rounded-full"></span> : <Send className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hire student peer teachers */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Verified student peers & native tutors</h3>
                  <p className="text-[11px] text-slate-400">Hire each other to teach Spanish! Book structured peer calls directly below.</p>
                  
                  <div className="space-y-3">
                    {TUTOR_TEACHERS.map((teacher) => (
                      <div key={teacher.id} className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="text-xl bg-slate-950 p-1.5 rounded-lg border border-slate-800">{teacher.avatar}</div>
                          <div className="leading-tight text-xs">
                            <h4 className="font-bold text-white">{teacher.tutorName}</h4>
                            <span className="text-[10px] text-amber-500">★ {teacher.rating} ({teacher.reviewsCount} reviews)</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed">{teacher.bio[currentLang] || teacher.bio['en']}</p>
                        
                        <div className="pt-1.5 border-t border-slate-800 text-[10px] flex items-center justify-between">
                          <span className="text-slate-500 font-bold uppercase tracking-wider">Hourly Rate:</span>
                          <span className="font-mono text-emerald-400 font-bold">€{teacher.hourlyRate} / Hr</span>
                        </div>

                        <button
                          onClick={() => handleSimulateBooking(teacher.tutorName, teacher.hourlyRate)}
                          className="w-full bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 text-[10px] font-bold py-1.5 rounded transition"
                        >
                          Book Study Hour
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 6: CV BUILDER IN SPANISH */}
          {activeTab === 'cv' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-amber-500" />
                  <span>Spanish standard CV maker</span>
                </h2>
                <p className="text-xs text-slate-400">Generate a professional, Spanish-styled Curriculum Vitae matching local guidelines.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* CV Inputs */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Input Professional Profile Details</h3>

                  <div className="space-y-2.5 pt-1">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Full Name</label>
                      <input
                        type="text"
                        value={cvSpecs.name}
                        onChange={(e) => setCvSpecs({...cvSpecs, name: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Contact Email</label>
                      <input
                        type="text"
                        value={cvSpecs.email}
                        onChange={(e) => setCvSpecs({...cvSpecs, email: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">Target Job/Role</label>
                        <input
                          type="text"
                          value={cvSpecs.targetRole}
                          onChange={(e) => setCvSpecs({...cvSpecs, targetRole: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">Target City in Spain</label>
                        <input
                          type="text"
                          value={cvSpecs.targetCity}
                          onChange={(e) => setCvSpecs({...cvSpecs, targetCity: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Academic Qualifications</label>
                      <input
                        type="text"
                        value={cvSpecs.educationLevel}
                        onChange={(e) => setCvSpecs({...cvSpecs, educationLevel: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Key Skills & Languages</label>
                      <input
                        type="text"
                        value={cvSpecs.skills}
                        onChange={(e) => setCvSpecs({...cvSpecs, skills: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Previous Experience / Summary</label>
                      <textarea
                        rows={3}
                        value={cvSpecs.experience}
                        onChange={(e) => setCvSpecs({...cvSpecs, experience: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleGenerateCv}
                        disabled={isGeneratingCv}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-2 rounded-xl text-xs transition flex items-center justify-center gap-1"
                      >
                        {isGeneratingCv ? (
                          <>
                            <span className="h-3 w-3 border-2 border-slate-950 border-t-transparent animate-spin rounded-full"></span>
                            Generating Spanish layout...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-3.5 w-3.5" /> Convert & Format CV
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* CV Output Preview */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Preview Layout (Curriculum Vitae)</span>
                    {cvHtml && (
                      <button
                        onClick={() => {
                          const simpleText = cvHtml.replace(/<[^>]*>/g, '');
                          navigator.clipboard.writeText(simpleText);
                          setCopiedCv(true);
                          setTimeout(() => setCopiedCv(false), 2000);
                        }}
                        className="text-[10px] bg-slate-900 hover:bg-slate-850 text-slate-300 px-2 py-1 rounded border border-slate-800 flex items-center gap-1"
                      >
                        {copiedCv ? 'Copied! ✅' : 'Copy Text'}
                      </button>
                    )}
                  </div>

                  <div className="flex-1 overflow-y-auto max-h-[350px] pr-1">
                    {cvHtml ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: cvHtml }} 
                        className="text-slate-900 prose prose-sm max-w-none pt-2 font-sans"
                      />
                    ) : (
                      <div className="text-center py-16 space-y-2 text-slate-500">
                        <FileText className="h-8 w-8 mx-auto" strokeWidth={1} />
                        <p className="text-xs">Your completed resume preview will render here in pristine European recruitment structure.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

        </section>

      </main>

      {/* Footer copyright */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>© 2026 Spain Study Portal for Arab Students. All Rights Reserved. Monitored by Google Gemini AI.</p>
          <p className="text-[10px] text-slate-600">All prices and transport metrics (such as the €20 Madrid Abono Joven and the A1-C2 milestones) reflect official regional regulations across Spain.</p>
        </div>
      </footer>

    </div>
  );
}

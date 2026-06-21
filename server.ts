import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Initialize Claude client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const DB_FILE = path.join(process.cwd(), "database.json");

// ======================== TYPES ========================
interface Student {
  id: string; name: string; lastName?: string; phone?: string; email: string;
  country: string; city: string; targetCity: string; gender: string; age: number;
  language: string; level: string; academicGoal: string; currentEducation?: string;
  currentCountry?: string; professionalGoal: string; xp: number; streak: number;
  completedLessons: number; completedExams: number; studyTimeMinutes: number;
  hasCv: boolean; registrationDate: string; premiumStatus: boolean;
  vocationalTopChoice: string; isInternshipReady: boolean; hasJobReady: boolean;
  activeInCommunity: boolean; channel: string; paymentAmount: number; isBlocked?: boolean;
}
interface Teacher {
  id: string; name: string; subject: string; email: string; bio: string;
  phone?: string; photoUrl?: string; rating: number;
}
interface DB {
  students: Student[];
  communityMessages: Array<{ id: string; user: string; text: string; time: string; system?: boolean; email?: string }>;
  customMetrics: { totalPageViews: number; totalVisits: number; avgSessionSeconds: number; bounceRatePercent: number };
  alerts: Array<{ id: string; title: string; type: "warning"|"success"|"info"; timestamp: string; violatorEmail?: string; violatorName?: string; isViolationUnit?: boolean }>;
  teachers?: Teacher[];
}

const BAD_WORDS = ["mierda","puta","puto","cabron","joder","maricon","gilipollas","pendejo","merde","putain","connard","salope","shit","fuck","bitch","asshole","bastard","cunt","zamel","kahba","9ahba","khara","zab"];

function containsBadWords(text: string): boolean {
  const norm = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  return BAD_WORDS.some(w => norm.includes(w));
}

function getDefaultTeachers(): Teacher[] {
  return [
    { id:"teach_1", name:"Mónica Ruiz Castro", subject:"Español A1-B2 (Comprensión y Gramática)", email:"monica.ruiz@espana-study.com", bio:"Profesora nativa de Madrid con 8 años de experiencia preparando a alumnos marroquíes y argelinos para FP y universidades en España.", phone:"+34 612 345 678", photoUrl:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200", rating:5 },
    { id:"teach_2", name:"Yassine El Amrani", subject:"Preparación PCE Selectividad (Matemáticas y Física)", email:"yassine.amrani@espana-study.com", bio:"Doctor por la Universidad de Granada, especialista en guiar a estudiantes de Marruecos y Argelia para superar las pruebas UNEDasiss.", phone:"+34 688 123 456", photoUrl:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200", rating:5 },
    { id:"teach_3", name:"Prof. Alberto Sanz", subject:"Español Técnico para FP (Informática y Sanidad)", email:"alberto.sanz@espana-study.com", bio:"Especialista en enseñanza de terminología técnica para alumnos de Grado Superior (DAW, DAM, Sanidad).", phone:"+34 633 987 654", photoUrl:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200", rating:4.8 }
  ];
}

function seedDatabase(): DB {
  const students: Student[] = [];
  const firstNames = ["Youssef","Sofiane","Fatima","Leila","Omar","Amine","Tarik","Rayan","Meriem","Selma","Khalid","Rachid","Driss","Nabil","Mourad","Samira","Kenza","Soulaymane","Amina","Yasmin"];
  const lastNames = ["Alaoui","Benjelloun","Mansouri","Haddad","Mezouar","Belkacem","Saidi","Cherif","Amrani","Berrada","Tazi","Sabiri","Rami","Zouhair","Jaadi"];
  const countries = ["Morocco","Algeria","Tunisia","Egypt"];
  const cities: Record<string,string[]> = { Morocco:["Rabat","Casablanca","Marrakech","Fes","Tangier","Oujda"], Algeria:["Algiers","Oran","Constantine","Annaba"], Tunisia:["Tunis","Sousse","Sfax"], Egypt:["Cairo","Alexandria","Giza"] };
  const channels = ["Instagram","Facebook","SEO","Direct","Referred"];
  const levels = ["A1","A2","B1","B2","C1"];
  const goals = ["FP Grado Superior","Universidad","Grado Medio","Máster"];
  const sectors = ["Informática","Sanidad","Administración","Marketing","Hostelería","Comercio","Electricidad","Mecánica"];
  const spanishCities = ["Madrid","Barcelona","Valencia","Sevilla","Zaragoza"];
  const now = new Date();

  for (let i = 0; i < 260; i++) {
    const isPremium = Math.random() < 0.16;
    const country = countries[Math.floor(Math.random() * countries.length)];
    const originCity = cities[country][Math.floor(Math.random() * cities[country].length)];
    const regDate = new Date(); regDate.setDate(now.getDate() - Math.floor(Math.random()*120));
    const fn = firstNames[Math.floor(Math.random()*firstNames.length)];
    const ln = lastNames[Math.floor(Math.random()*lastNames.length)];
    const sector = sectors[Math.floor(Math.random()*sectors.length)];
    const completedExams = Math.floor(Math.random()*3);
    const completedLessons = Math.floor(Math.random()*12) + completedExams*5;
    const xp = completedLessons*15 + completedExams*50 + Math.floor(Math.random()*30);
    students.push({
      id:`stud_${i+1000}`, name:`${fn} ${ln}`, email:`${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`,
      country, city:originCity, targetCity:spanishCities[Math.floor(Math.random()*spanishCities.length)],
      gender:Math.random()<0.45?"Femenino":"Masculino", age:Math.floor(Math.random()*11)+18,
      language:Math.random()<0.70?"ar":"fr", level:levels[Math.floor(Math.random()*levels.length)],
      academicGoal:goals[Math.floor(Math.random()*goals.length)], professionalGoal:`Especialista en ${sector}`,
      xp, streak:Math.floor(Math.random()*8), completedLessons, completedExams,
      studyTimeMinutes:completedLessons*25+Math.floor(Math.random()*90), hasCv:Math.random()<0.40,
      registrationDate:regDate.toISOString().split("T")[0], premiumStatus:isPremium,
      vocationalTopChoice:sector, isInternshipReady:isPremium&&Math.random()<0.60,
      hasJobReady:isPremium&&Math.random()<0.50, activeInCommunity:Math.random()<0.75,
      channel:channels[Math.floor(Math.random()*channels.length)], paymentAmount:isPremium?89:0, isBlocked:false
    });
  }

  return {
    students,
    communityMessages:[
      { id:"msg_1", user:"Youssef Alaoui", text:"¡Hola! ¿Alguien ha solicitado el visado en Rabat recientemente?", time:"2026-06-21T11:20:00Z", email:"youssef.alaoui@example.com" },
      { id:"msg_2", user:"Sofia Mansouri", text:"Hola Youssef, sí, la cita previa suele tardar unos 10 días en aparecer. ¡Organízate bien!", time:"2026-06-21T11:22:00Z", email:"sofia.mansouri@example.com" },
      { id:"msg_3", user:"Profesor de España 🤖", text:"💡 Asegúrate de que tu seguro médico privado tenga cobertura del 100% repatriación y sea 'sin copago'.", time:"2026-06-21T11:23:00Z", system:true }
    ],
    customMetrics:{ totalPageViews:63820, totalVisits:12450, avgSessionSeconds:432, bounceRatePercent:24.5 },
    alerts:[
      { id:"alert_1", title:"Crecimiento del 45% en visados aprobados desde Marruecos", type:"success", timestamp:"Hace 2 horas" },
      { id:"alert_2", title:"Descenso de registros en Argelia las últimas 48h", type:"warning", timestamp:"Hace 5 horas" },
      { id:"alert_3", title:"Contenido de Tarjetas de Transporte funciona muy bien", type:"info", timestamp:"Hace 1 día" }
    ],
    teachers: getDefaultTeachers()
  };
}

function readDB(): DB {
  try {
    if (fs.existsSync(DB_FILE)) {
      const db = JSON.parse(fs.readFileSync(DB_FILE,"utf-8"));
      if (!db.teachers) { db.teachers = getDefaultTeachers(); writeDB(db); }
      return db;
    }
  } catch(e) { console.error("DB read error:",e); }
  const seeded = seedDatabase();
  writeDB(seeded);
  return seeded;
}
function writeDB(db: DB) {
  try { fs.writeFileSync(DB_FILE, JSON.stringify(db,null,2),"utf-8"); }
  catch(e) { console.error("DB write error:",e); }
}

// ======================== CLAUDE HELPERS ========================
async function claudeJSON(prompt: string, system: string = ""): Promise<any> {
  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: system || "You are a helpful assistant. Always respond with valid JSON only, no markdown, no code blocks.",
    messages: [{ role:"user", content: prompt }]
  });
  const text = (msg.content[0] as any).text || "{}";
  return JSON.parse(text.replace(/```json|```/g,"").trim());
}

// ======================== SERVER ========================
async function startServer() {
  app.use(express.json());

  app.get("/api/health", (_req, res) => res.json({ status:"ok", ai:"claude-sonnet-4-6" }));

  // DB Stats
  app.get("/api/db/stats", (_req, res) => res.json(readDB()));

  // Student login/register
  app.post("/api/auth/student-login", (req, res) => {
    const { email, name, lastName, phone, country, age, gender, currentEducation, academicGoal, city, targetCity, currentCountry } = req.body;
    if (!email) return res.status(400).json({ error:"Email requerido." });
    const db = readDB();
    let student = db.students.find(s => s.email.toLowerCase()===email.toLowerCase());
    if (student) {
      if (student.isBlocked) return res.status(403).json({ success:false, error:"Acceso restringido por infracción de directrices." });
    } else {
      student = {
        id:`stud_${Date.now()}`, name:name||email.split("@")[0], lastName:lastName||"", phone:phone||"",
        email:email.toLowerCase(), country:country||"Morocco", city:city||"Rabat", targetCity:targetCity||"Madrid",
        gender:gender||"Masculino", age:age?Number(age):20, language:"fr", level:"A1",
        academicGoal:academicGoal||"FP Grado Superior", currentEducation:currentEducation||"Bachillerato",
        currentCountry:currentCountry||country||"Morocco", professionalGoal:"Estudiante",
        xp:0, streak:1, completedLessons:0, completedExams:0, studyTimeMinutes:0, hasCv:false,
        registrationDate:new Date().toISOString().split("T")[0], premiumStatus:false,
        vocationalTopChoice:"Informática", isInternshipReady:false, hasJobReady:false,
        activeInCommunity:true, channel:"Direct", paymentAmount:0, isBlocked:false
      };
      db.students.push(student);
      writeDB(db);
    }
    res.json({ success:true, student });
  });

  // Update student
  app.post("/api/student/update", (req, res) => {
    const { id, updates } = req.body;
    if (!id) return res.status(400).json({ error:"ID requerido" });
    const db = readDB();
    const idx = db.students.findIndex(s => s.id===id);
    if (idx!==-1) { db.students[idx]={...db.students[idx],...updates}; writeDB(db); res.json({ success:true, student:db.students[idx] }); }
    else res.status(404).json({ error:"Estudiante no encontrado" });
  });

  // Admin update metrics
  app.post("/api/admin/update-metrics", (req, res) => {
    const { customMetrics, alerts, newAlert } = req.body;
    const db = readDB();
    if (customMetrics) db.customMetrics = {...db.customMetrics,...customMetrics};
    if (alerts) db.alerts = alerts;
    if (newAlert) db.alerts.unshift({ id:`alert_${Date.now()}`, title:newAlert.title, type:newAlert.type||"info", timestamp:"Ahora" });
    writeDB(db);
    res.json({ success:true, db });
  });

  // Admin dismiss alert
  app.post("/api/admin/dismiss-alert", (req, res) => {
    const { id } = req.body;
    const db = readDB();
    db.alerts = db.alerts.filter(a => a.id!==id);
    writeDB(db);
    res.json({ success:true });
  });

  // Community post
  app.post("/api/community/post", (req, res) => {
    const { user, text, email } = req.body;
    if (!text||!user) return res.status(400).json({ error:"User y text requeridos" });
    const db = readDB();
    if (containsBadWords(text)) {
      db.alerts.unshift({ id:`viol_${Date.now()}`, title:`⚠️ COMENTARIO RESTRINGIDO de "${user}" (${email||"?"}): "${text}"`, type:"warning", timestamp:"Ahora", violatorEmail:email, violatorName:user, isViolationUnit:true });
      writeDB(db);
      return res.status(400).json({ success:false, restricted:true, error:"Comentario con palabras inapropiadas." });
    }
    const msg = { id:`msg_${Date.now()}`, user, text, time:new Date().toISOString(), email };
    db.communityMessages.push(msg);
    if (email) { const idx=db.students.findIndex(s=>s.email.toLowerCase()===email.toLowerCase()); if(idx!==-1){db.students[idx].xp+=5;db.students[idx].activeInCommunity=true;} }
    writeDB(db);
    res.json({ success:true, message:msg });
  });

  // Community delete
  app.post("/api/community/delete", (req, res) => {
    const { id } = req.body;
    const db = readDB();
    db.communityMessages = db.communityMessages.filter(m => m.id!==id);
    writeDB(db);
    res.json({ success:true, communityMessages:db.communityMessages });
  });

  // Block student
  app.post("/api/admin/block-student", (req, res) => {
    const { email, block } = req.body;
    if (!email) return res.status(400).json({ error:"Email requerido" });
    const db = readDB();
    const idx = db.students.findIndex(s => s.email.toLowerCase()===email.toLowerCase());
    if (idx!==-1) {
      db.students[idx].isBlocked=!!block;
      if (block) db.alerts=db.alerts.filter(a=>!(a.violatorEmail&&a.violatorEmail.toLowerCase()===email.toLowerCase()));
      writeDB(db);
      res.json({ success:true, student:db.students[idx] });
    } else res.status(404).json({ error:"Estudiante no encontrado" });
  });

  // Teachers CRUD
  app.post("/api/teachers/create", (req, res) => {
    const { name, subject, email, bio, phone, photoUrl, rating } = req.body;
    if (!name||!subject||!email) return res.status(400).json({ error:"Nombre, asignatura y email requeridos" });
    const db = readDB();
    if (!db.teachers) db.teachers=[];
    const t: Teacher = { id:`teach_${Date.now()}`, name, subject, email, bio:bio||"Profesor colaborador.", phone:phone||"", photoUrl:photoUrl||"", rating:rating?Number(rating):5 };
    db.teachers.push(t);
    writeDB(db);
    res.json({ success:true, teacher:t, teachers:db.teachers });
  });
  app.post("/api/teachers/update", (req, res) => {
    const { id, ...updates } = req.body;
    if (!id) return res.status(400).json({ error:"ID requerido" });
    const db = readDB();
    if (!db.teachers) db.teachers=[];
    const idx = db.teachers.findIndex(t=>t.id===id);
    if (idx!==-1) { db.teachers[idx]={...db.teachers[idx],...updates}; writeDB(db); res.json({ success:true, teacher:db.teachers[idx], teachers:db.teachers }); }
    else res.status(404).json({ error:"Profesor no encontrado" });
  });
  app.post("/api/teachers/delete", (req, res) => {
    const { id } = req.body;
    const db = readDB();
    if (!db.teachers) db.teachers=[];
    db.teachers = db.teachers.filter(t=>t.id!==id);
    writeDB(db);
    res.json({ success:true, teachers:db.teachers });
  });

  // AI Admin Advisor (Claude)
  app.post("/api/admin/advisor", async (req: any, res: any) => {
    const { query } = req.body;
    if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error:"ANTHROPIC_API_KEY not configured" });
    const db = readDB();
    const total = db.students.length;
    const premium = db.students.filter(s=>s.premiumStatus).length;
    const origMap: Record<string,number> = {};
    db.students.forEach(s=>{ origMap[s.country]=(origMap[s.country]||0)+1; });
    const context = `Eres el asistente BI experto del portal 'Atrévete a España'.\nMétricas: ${total} estudiantes, ${premium} premium (${((premium/total)*100).toFixed(1)}% conversión), países: ${JSON.stringify(origMap)}, vistas: ${db.customMetrics.totalPageViews}.\nPregunta del dueño: "${query}"\nResponde en español con análisis detallado y recomendaciones accionables. Usa Markdown.`;
    try {
      const msg = await anthropic.messages.create({ model:"claude-sonnet-4-6", max_tokens:2000, messages:[{role:"user",content:context}] });
      res.json({ response:(msg.content[0] as any).text });
    } catch(e:any) { res.status(500).json({ error:e.message }); }
  });

  // Generate Lesson (Claude)
  app.post("/api/lesson", async (req: any, res: any) => {
    const { level, page, topic, targetLang } = req.body;
    if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error:"ANTHROPIC_API_KEY not configured" });
    const prompt = `You are an expert Spanish language professor teaching ${targetLang}-speaking students.
Create a comprehensive textbook lesson for CEFR level ${level}, page ${page}/300, topic: "${topic}".

Return ONLY valid JSON (no markdown, no code blocks):
{
  "title": "lesson title",
  "explanation": "800-1200 word detailed explanation with markdown formatting, tables for conjugations, examples with translations",
  "vocabulary": [{"spanish":"word","dynamicLang":"translation in ${targetLang}","explanation":"usage note"}],
  "practice": [
    {"type":"multiple-choice","question":"...","options":["A","B","C","D"],"correctIndex":0},
    {"type":"fill-blank","question":"Yo ___ estudiante.","blankWord":"soy"},
    {"type":"translation","question":"Translate: I speak Spanish","correctTranslation":"Hablo español"},
    {"type":"conjugation","question":"Conjugate HABLAR for tú:","verb":"hablar","correctAnswer":"hablas"}
  ]
}
Include 6-8 vocabulary items and 6-8 practice exercises.`;
    try {
      const result = await claudeJSON(prompt);
      res.json(result);
    } catch(e:any) { res.status(500).json({ error:e.message }); }
  });

  // Generate Exam (Claude)
  app.post("/api/exam", async (req: any, res: any) => {
    const { level, examId, targetLang } = req.body;
    if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error:"ANTHROPIC_API_KEY not configured" });
    const prompt = `Create an official SIELE-style Spanish exam version ${examId||1}/30 for CEFR level ${level}. Student interface language: ${targetLang}.

Return ONLY valid JSON (no markdown):
{
  "examTitle": "Official ${level} Exam - Version ${examId}",
  "questions": [
    {"question":"...","options":["A","B","C","D"],"correctIndex":0,"tip":"grammar explanation in ${targetLang}","tarea":1}
  ]
}

Requirements:
- Exactly 40 questions, divided into 5 Tareas of 8 questions each
- Tarea 1 (Q1-8): CEFR A1 - basic vocabulary, greetings, simple sentences
- Tarea 2 (Q9-16): CEFR A2 - daily routines, past tenses, descriptions  
- Tarea 3 (Q17-24): CEFR B1 - opinions, ser/estar, future tense
- Tarea 4 (Q25-32): CEFR B2 - subjuntivo, por/para, advanced grammar
- Tarea 5 (Q33-40): CEFR C1 - idioms, literary analysis, advanced register
- Focus ONLY on Spanish language, NOT on visas, bureaucracy or admin topics
- Each question has exactly 4 options and 1 correct index (0-3)
- Include tarea number (1-5) for each question`;
    try {
      const result = await claudeJSON(prompt);
      res.json(result);
    } catch(e:any) { res.status(500).json({ error:e.message }); }
  });

  // Generate CV (Claude)
  app.post("/api/cv", async (req: any, res: any) => {
    const { name, email, role, city, edu, skills, exp } = req.body;
    if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error:"ANTHROPIC_API_KEY not configured" });
    const prompt = `Create a professional Spanish-format CV in HTML for:
Name: ${name} | Email: ${email} | Role: ${role} | City: ${city} | Education: ${edu} | Skills: ${skills} | Experience: ${exp}

Return ONLY valid JSON (no markdown):
{"cvHtml": "<div style='font-family:sans-serif;color:#1e293b;padding:20px'>...complete styled HTML CV...</div>"}

The HTML must include sections: Datos Personales, Objetivo Profesional, Formación Académica, Experiencia, Competencias, Idiomas.
Use inline CSS. White background. Professional European format.`;
    try {
      const result = await claudeJSON(prompt);
      res.json(result);
    } catch(e:any) { res.status(500).json({ error:e.message }); }
  });

  // Chat grammar correction (Claude)
  app.post("/api/chat-correct", async (req: any, res: any) => {
    const { message } = req.body;
    if (!process.env.ANTHROPIC_API_KEY) return res.json({ tip:null });
    const prompt = `An Arab student wrote in a Spanish community chat: "${message}"
If there are Spanish grammar errors, give 1-2 sentence correction tip in French or Arabic.
If no Spanish or no errors, respond: {"tip":null}
Return ONLY valid JSON: {"tip":"correction tip or null"}`;
    try {
      const result = await claudeJSON(prompt);
      res.json(result);
    } catch(e) { res.json({ tip:null }); }
  });

  // Vite dev or static prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server:{ middlewareMode:true }, appType:"spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(),"dist");
    app.use(express.static(distPath));
    app.get("*",(_req,res) => res.sendFile(path.join(distPath,"index.html")));
  }

  app.listen(PORT, "0.0.0.0", () => console.log(`✅ Spain Study Portal running on port ${PORT} with Claude AI`));
}

startServer();

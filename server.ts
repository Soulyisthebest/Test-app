import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { "User-Agent": "aistudio-build" } }
});

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
interface Teacher { id: string; name: string; subject: string; email: string; bio: string; phone?: string; photoUrl?: string; rating: number; }
interface DB { students: Student[]; communityMessages: any[]; customMetrics: { totalPageViews: number; totalVisits: number; avgSessionSeconds: number; bounceRatePercent: number }; alerts: any[]; teachers: Teacher[]; }

let db_client: any = null;
let usePostgres = false;

async function initDB() {
  if (process.env.DATABASE_URL) {
    try {
      const { default: pg } = await import("pg");
      db_client = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
      await db_client.query(`
        CREATE TABLE IF NOT EXISTS students (id TEXT PRIMARY KEY, data JSONB NOT NULL, created_at TIMESTAMP DEFAULT NOW());
        CREATE TABLE IF NOT EXISTS community_messages (id TEXT PRIMARY KEY, data JSONB NOT NULL, created_at TIMESTAMP DEFAULT NOW());
        CREATE TABLE IF NOT EXISTS app_data (key TEXT PRIMARY KEY, value JSONB NOT NULL);
      `);
      await db_client.query(`
        INSERT INTO app_data (key, value) VALUES
          ('customMetrics', '{"totalPageViews":63820,"totalVisits":12450,"avgSessionSeconds":432,"bounceRatePercent":24.5}'),
          ('alerts', '[{"id":"alert_1","title":"Crecimiento del 45% en visados aprobados desde Marruecos","type":"success","timestamp":"Hace 2 horas"},{"id":"alert_2","title":"Descenso de registros en Argelia las ultimas 48h","type":"warning","timestamp":"Hace 5 horas"},{"id":"alert_3","title":"Tarjetas de Transporte funciona muy bien","type":"info","timestamp":"Hace 1 dia"}]'),
          ('teachers', '[{"id":"teach_1","name":"Monica Ruiz Castro","subject":"Espanol A1-B2","email":"monica@espana-study.com","bio":"Profesora nativa de Madrid con 8 anos de experiencia.","phone":"+34 612 345 678","photoUrl":"https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200","rating":5},{"id":"teach_2","name":"Yassine El Amrani","subject":"PCE Selectividad","email":"yassine@espana-study.com","bio":"Doctor por la Universidad de Granada, especialista en UNEDasiss.","phone":"+34 688 123 456","photoUrl":"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200","rating":5},{"id":"teach_3","name":"Prof. Alberto Sanz","subject":"Espanol Tecnico FP","email":"alberto@espana-study.com","bio":"Especialista en terminologia tecnica para DAW, DAM, Sanidad.","phone":"+34 633 987 654","photoUrl":"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200","rating":4.8}]')
        ON CONFLICT (key) DO NOTHING;
      `);
      const { rows } = await db_client.query("SELECT COUNT(*) FROM students");
      if (parseInt(rows[0].count) === 0) await seedPostgres();
      usePostgres = true;
      console.log("Connected to PostgreSQL");
    } catch(e) {
      console.log("PostgreSQL failed, using JSON:", (e as any).message);
    }
  }
}

const DB_FILE = path.join(process.cwd(), "database.json");
const BAD_WORDS = ["mierda","puta","puto","cabron","joder","maricon","gilipollas","pendejo","merde","putain","connard","salope","shit","fuck","bitch","asshole","bastard","zamel","kahba","9ahba","khara","zab"];
function isBad(text: string) { const n=text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""); return BAD_WORDS.some(w=>n.includes(w)); }

function getTeachers(): Teacher[] {
  return [
    {id:"teach_1",name:"Monica Ruiz Castro",subject:"Espanol A1-B2 (Comprension y Gramatica)",email:"monica.ruiz@espana-study.com",bio:"Profesora nativa de Madrid con mas de 8 anos de experiencia preparando a alumnos marroquies y argelinos para integrarse en FP y universidades en Espana. Experta en pedagogia CEFR.",phone:"+34 612 345 678",photoUrl:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",rating:5},
    {id:"teach_2",name:"Yassine El Amrani",subject:"Preparacion PCE Selectividad (Matematicas y Fisica)",email:"yassine.amrani@espana-study.com",bio:"Doctor por la Universidad de Granada, especialista en guiar a estudiantes de Marruecos y Argelia para superar las pruebas UNEDasiss.",phone:"+34 688 123 456",photoUrl:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",rating:5},
    {id:"teach_3",name:"Prof. Alberto Sanz",subject:"Espanol Tecnico para FP (Informatica y Sanidad)",email:"alberto.sanz@espana-study.com",bio:"Especialista en ensenanza de terminologia tecnica para alumnos de Grado Superior (DAW, DAM, Sanidad).",phone:"+34 633 987 654",photoUrl:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",rating:4.8}
  ];
}

function seedStudents(): Student[] {
  const fns=["Youssef","Sofiane","Fatima","Leila","Omar","Amine","Tarik","Rayan","Meriem","Selma","Khalid","Rachid","Driss","Nabil","Mourad","Samira","Kenza","Soulaymane","Amina","Yasmin"];
  const lns=["Alaoui","Benjelloun","Mansouri","Haddad","Mezouar","Belkacem","Saidi","Cherif","Amrani","Berrada","Tazi","Sabiri","Rami","Zouhair","Jaadi"];
  const mc=["Rabat","Casablanca","Marrakech","Fes","Tangier","Oujda"],ac=["Algiers","Oran","Constantine","Annaba"],tc=["Tunis","Sousse","Sfax"],ec=["Cairo","Alexandria","Giza"];
  const chs=["Instagram","Facebook","SEO","Direct","Referred"],lvls=["A1","A2","B1","B2","C1"],gls=["FP Grado Superior","Universidad","Grado Medio","Master"],secs=["Informatica","Sanidad","Administracion","Marketing","Hosteleria","Comercio","Electricidad","Mecanica"],scs=["Madrid","Barcelona","Valencia","Sevilla","Zaragoza"];
  const students: Student[] = [],now=new Date();
  for(let i=0;i<260;i++){
    const ip=Math.random()<0.16,cr=Math.random();
    let country="Morocco",oc="Rabat";
    if(cr<0.60){country="Morocco";oc=mc[Math.floor(Math.random()*mc.length)];}
    else if(cr<0.85){country="Algeria";oc=ac[Math.floor(Math.random()*ac.length)];}
    else if(cr<0.95){country="Tunisia";oc=tc[Math.floor(Math.random()*tc.length)];}
    else{country="Egypt";oc=ec[Math.floor(Math.random()*ec.length)];}
    const rd=new Date();rd.setDate(now.getDate()-Math.floor(Math.random()*120));
    const fn=fns[Math.floor(Math.random()*fns.length)],ln=lns[Math.floor(Math.random()*lns.length)];
    const sec=secs[Math.floor(Math.random()*secs.length)],ce=Math.floor(Math.random()*3),cl=Math.floor(Math.random()*12)+ce*5,lv=lvls[Math.floor(Math.random()*lvls.length)];
    students.push({id:`stud_${i+1000}`,name:`${fn} ${ln}`,email:`${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`,country,city:oc,targetCity:scs[Math.floor(Math.random()*scs.length)],gender:Math.random()<0.45?"Femenino":"Masculino",age:Math.floor(Math.random()*11)+18,language:Math.random()<0.70?"ar":"fr",level:lv,academicGoal:gls[Math.floor(Math.random()*gls.length)],professionalGoal:`Especialista en ${sec}`,xp:cl*15+ce*50+Math.floor(Math.random()*30),streak:Math.floor(Math.random()*8),completedLessons:cl,completedExams:ce,studyTimeMinutes:cl*25+Math.floor(Math.random()*90),hasCv:Math.random()<0.40,registrationDate:rd.toISOString().split("T")[0],premiumStatus:ip,vocationalTopChoice:sec,isInternshipReady:ip&&Math.random()<0.60,hasJobReady:ip&&lv!=="A1"&&Math.random()<0.50,activeInCommunity:Math.random()<0.75,channel:chs[Math.floor(Math.random()*chs.length)],paymentAmount:ip?89:0,isBlocked:false});
  }
  return students;
}

function readJson(): DB {
  try{if(fs.existsSync(DB_FILE)){const db=JSON.parse(fs.readFileSync(DB_FILE,"utf-8"));if(!db.teachers)db.teachers=getTeachers();return db;}}catch(e){}
  const db: DB={students:seedStudents(),communityMessages:[{id:"msg_1",user:"Youssef Alaoui",text:"Hola! Alguien ha solicitado el visado en Rabat recientemente?",time:"2026-06-21T11:20:00Z",email:"youssef@example.com"},{id:"msg_2",user:"Sofia Mansouri",text:"Hola Youssef, la cita previa suele tardar unos 10 dias. Organizate bien!",time:"2026-06-21T11:22:00Z",email:"sofia@example.com"},{id:"msg_3",user:"Profesor de Espana",text:"CONSEJO: Asegurate de que tu seguro medico privado sea sin copago y tenga cobertura de repatriacion.",time:"2026-06-21T11:23:00Z",system:true}],customMetrics:{totalPageViews:63820,totalVisits:12450,avgSessionSeconds:432,bounceRatePercent:24.5},alerts:[{id:"alert_1",title:"Crecimiento del 45% en visados aprobados desde Marruecos",type:"success",timestamp:"Hace 2 horas"},{id:"alert_2",title:"Descenso de registros en Argelia las ultimas 48h",type:"warning",timestamp:"Hace 5 horas"},{id:"alert_3",title:"Tarjetas de Transporte funciona muy bien",type:"info",timestamp:"Hace 1 dia"}],teachers:getTeachers()};
  fs.writeFileSync(DB_FILE,JSON.stringify(db,null,2),"utf-8");return db;
}
function writeJson(db: DB){try{fs.writeFileSync(DB_FILE,JSON.stringify(db,null,2),"utf-8");}catch(e){}}

async function seedPostgres(){const s=seedStudents();for(const st of s)await db_client.query("INSERT INTO students (id,data) VALUES ($1,$2) ON CONFLICT (id) DO NOTHING",[st.id,st]);}

async function getDB(): Promise<DB>{
  if(!usePostgres)return readJson();
  const [sR,mR,meR,aR,tR]=await Promise.all([db_client.query("SELECT data FROM students ORDER BY created_at DESC"),db_client.query("SELECT data FROM community_messages ORDER BY created_at ASC LIMIT 200"),db_client.query("SELECT value FROM app_data WHERE key='customMetrics'"),db_client.query("SELECT value FROM app_data WHERE key='alerts'"),db_client.query("SELECT value FROM app_data WHERE key='teachers'")]);
  return{students:sR.rows.map((r:any)=>r.data),communityMessages:mR.rows.map((r:any)=>r.data),customMetrics:meR.rows[0]?.value||{totalPageViews:63820,totalVisits:12450,avgSessionSeconds:432,bounceRatePercent:24.5},alerts:aR.rows[0]?.value||[],teachers:tR.rows[0]?.value||getTeachers()};
}
async function findStu(email: string): Promise<Student|null>{
  if(!usePostgres){return readJson().students.find(s=>s.email.toLowerCase()===email.toLowerCase())||null;}
  const r=await db_client.query("SELECT data FROM students WHERE data->>'email'=$1",[email.toLowerCase()]);return r.rows[0]?.data||null;
}
async function saveStu(s: Student){
  if(!usePostgres){const db=readJson();const i=db.students.findIndex(x=>x.id===s.id);if(i!==-1)db.students[i]=s;else db.students.push(s);writeJson(db);return;}
  await db_client.query("INSERT INTO students (id,data) VALUES ($1,$2) ON CONFLICT (id) DO UPDATE SET data=$2",[s.id,s]);
}
async function setKey(key: string,val: any){
  if(!usePostgres){const db=readJson();if(key==="customMetrics")db.customMetrics={...db.customMetrics,...val};else if(key==="alerts")db.alerts=val;else if(key==="teachers")db.teachers=val;writeJson(db);return;}
  await db_client.query("INSERT INTO app_data (key,value) VALUES ($1,$2) ON CONFLICT (key) DO UPDATE SET value=$2",[key,JSON.stringify(val)]);
}
async function getAlerts(): Promise<any[]>{
  if(!usePostgres)return readJson().alerts;
  const r=await db_client.query("SELECT value FROM app_data WHERE key='alerts'");return r.rows[0]?.value||[];
}
async function saveMsg(msg: any){
  if(!usePostgres){const db=readJson();db.communityMessages.push(msg);writeJson(db);return;}
  await db_client.query("INSERT INTO community_messages (id,data) VALUES ($1,$2) ON CONFLICT (id) DO NOTHING",[msg.id,msg]);
}
async function delMsg(id: string){
  if(!usePostgres){const db=readJson();db.communityMessages=db.communityMessages.filter((m:any)=>m.id!==id);writeJson(db);return;}
  await db_client.query("DELETE FROM community_messages WHERE id=$1",[id]);
}

async function startServer(){
  await initDB();
  app.use(express.json());

  app.get("/api/health",(_q,r)=>r.json({status:"ok",db:usePostgres?"postgresql":"json",ai:"gemini"}));
  app.get("/api/db/stats",async(_q,r)=>{try{r.json(await getDB());}catch(e:any){r.status(500).json({error:e.message});}});

  app.post("/api/auth/student-login",async(req:any,res:any)=>{
    const{email,name,lastName,phone,country,age,gender,currentEducation,academicGoal,city,targetCity,currentCountry}=req.body;
    if(!email)return res.status(400).json({error:"El correo electronico es requerido."});
    let s=await findStu(email);
    if(s){if(s.isBlocked)return res.status(403).json({success:false,error:"SU ACCESO HA SIDO TEMPORALMENTE RESTRINGIDO. Motivo: Infraccion recurrente de las Directrices de la Comunidad."});}
    else{s={id:`stud_${Date.now()}`,name:name||email.split("@")[0],lastName:lastName||"",phone:phone||"",email:email.toLowerCase(),country:country||"Morocco",city:city||"Rabat",targetCity:targetCity||"Madrid",gender:gender||"Masculino",age:age?Number(age):20,language:"fr",level:"A1",academicGoal:academicGoal||"FP Grado Superior",currentEducation:currentEducation||"Bachillerato",currentCountry:currentCountry||country||"Morocco",professionalGoal:"Estudiante de FP / Universidad",xp:0,streak:1,completedLessons:0,completedExams:0,studyTimeMinutes:0,hasCv:false,registrationDate:new Date().toISOString().split("T")[0],premiumStatus:false,vocationalTopChoice:"Informatica",isInternshipReady:false,hasJobReady:false,activeInCommunity:true,channel:"Direct",paymentAmount:0,isBlocked:false};await saveStu(s);}
    res.json({success:true,student:s});
  });

  app.post("/api/student/update",async(req:any,res:any)=>{
    const{id,updates}=req.body;if(!id)return res.status(400).json({error:"Student ID is required"});
    if(!usePostgres){const db=readJson();const i=db.students.findIndex(s=>s.id===id);if(i!==-1){db.students[i]={...db.students[i],...updates};writeJson(db);return res.json({success:true,student:db.students[i]});}return res.status(404).json({error:"Student not found"});}
    const r=await db_client.query("SELECT data FROM students WHERE id=$1",[id]);if(!r.rows[0])return res.status(404).json({error:"Student not found"});
    const u={...r.rows[0].data,...updates};await saveStu(u);res.json({success:true,student:u});
  });

  app.post("/api/admin/update-metrics",async(req:any,res:any)=>{
    const{customMetrics,alerts,newAlert}=req.body;
    if(customMetrics){const db=await getDB();await setKey("customMetrics",{...db.customMetrics,...customMetrics});}
    if(alerts)await setKey("alerts",alerts);
    if(newAlert){const cur=await getAlerts();await setKey("alerts",[{id:`alert_${Date.now()}`,title:newAlert.title,type:newAlert.type||"info",timestamp:"Ahora"},...cur]);}
    res.json({success:true});
  });

  app.post("/api/admin/dismiss-alert",async(req:any,res:any)=>{const a=await getAlerts();await setKey("alerts",a.filter((x:any)=>x.id!==req.body.id));res.json({success:true});});

  app.post("/api/community/post",async(req:any,res:any)=>{
    const{user,text,email}=req.body;if(!text||!user)return res.status(400).json({error:"User and Text are required"});
    if(isBad(text)){const cur=await getAlerts();await setKey("alerts",[{id:`viol_${Date.now()}`,title:`COMENTARIO RESTRINGIDO de "${user}" (${email||"Invitado"}): "${text}"`,type:"warning",timestamp:"Ahora mismo",violatorEmail:email,violatorName:user,isViolationUnit:true},...cur]);return res.status(400).json({success:false,restricted:true,error:"Tu comentario contiene palabras que violan nuestras directrices de la comunidad."});}
    const msg={id:`msg_${Date.now()}`,user,text,time:new Date().toISOString(),email};
    await saveMsg(msg);
    if(email){const s=await findStu(email);if(s){s.xp+=5;s.activeInCommunity=true;await saveStu(s);}}
    res.json({success:true,message:msg,scoreUp:email?5:0});
  });

  app.post("/api/community/delete",async(req:any,res:any)=>{await delMsg(req.body.id);res.json({success:true});});

  app.post("/api/admin/block-student",async(req:any,res:any)=>{
    const{email,block}=req.body;const s=await findStu(email);if(!s)return res.status(404).json({error:"No se encontro el estudiante."});
    s.isBlocked=!!block;await saveStu(s);
    if(block){const a=await getAlerts();await setKey("alerts",a.filter((x:any)=>!(x.violatorEmail&&x.violatorEmail.toLowerCase()===email.toLowerCase())));}
    res.json({success:true,student:s,message:block?"Estudiante bloqueado correctamente.":"Estudiante desbloqueado."});
  });

  app.post("/api/teachers/create",async(req:any,res:any)=>{
    const{name,subject,email,bio,phone,photoUrl,rating}=req.body;if(!name||!subject||!email)return res.status(400).json({error:"Nombre, asignatura y correo son requeridos."});
    const db=await getDB();const teachers=db.teachers||[];const t:Teacher={id:`teach_${Date.now()}`,name,subject,email,bio:bio||"Profesor colaborador.",phone:phone||"",photoUrl:photoUrl||"https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",rating:rating?Number(rating):5};
    teachers.push(t);await setKey("teachers",teachers);res.json({success:true,teacher:t,teachers});
  });
  app.post("/api/teachers/update",async(req:any,res:any)=>{const{id,...u}=req.body;const db=await getDB();const t=(db.teachers||[]).map((x:Teacher)=>x.id===id?{...x,...u}:x);await setKey("teachers",t);res.json({success:true,teachers:t});});
  app.post("/api/teachers/delete",async(req:any,res:any)=>{const db=await getDB();const t=(db.teachers||[]).filter((x:Teacher)=>x.id!==req.body.id);await setKey("teachers",t);res.json({success:true,teachers:t});});

  app.post("/api/admin/advisor",async(req:any,res:any)=>{
    if(!process.env.GEMINI_API_KEY)return res.status(500).json({error:"GEMINI_API_KEY is not configured"});
    const db=await getDB();const tot=db.students.length,pre=db.students.filter((s:any)=>s.premiumStatus).length;
    const om:Record<string,number>={};db.students.forEach((s:any)=>{om[s.country]=(om[s.country]||0)+1;});
    const ctx=`You are the Business Intelligence AI assistant inside the student success portal Atrevete a Espana.\nMetrics: ${tot} students, ${pre} premium (${((pre/tot)*100).toFixed(1)}% conversion), countries: ${JSON.stringify(om)}, views: ${db.customMetrics.totalPageViews}.\nQuery: "${req.body.query}"\nAnswer in Spanish with detailed analysis and actionable recommendations. Use Markdown.`;
    try{const r=await ai.models.generateContent({model:"gemini-2.0-flash",contents:ctx});res.json({response:r.text});}
    catch(e:any){res.status(500).json({error:"Gemini error: "+e.message});}
  });

  app.post("/api/lesson",async(req:any,res:any)=>{
    if(!process.env.GEMINI_API_KEY)return res.status(500).json({error:"GEMINI_API_KEY is not configured"});
    const{level,page,topic,targetLang}=req.body;
    const prompt=`You are an expert Spanish language professor specialized in teaching foreign students speaking ${targetLang}.\nPrepare a highly exhaustive, comprehensive masterclass textbook-style lesson.\nLevel: ${level} (CEFR)\nTopic: "${topic}"\nPage: ${page} of 300\n\nCreate the lesson. The output MUST be a JSON object containing:\n1. "title": A suitable short title for this lesson.\n2. "explanation": A very thorough detailed explanation at least 800-1200 words long. Use rich Markdown formatting including headers, bullet points, tables for conjugation matrices.\n3. "vocabulary": A list of 6-8 key vocabulary terms. Each with "spanish", "dynamicLang" (translation in ${targetLang}), "explanation".\n4. "practice": A list of 6-8 interactive exercises. Mix of: "multiple-choice" (with "options" array and "correctIndex"), "fill-blank" (with "blankWord"), "translation" (with "correctTranslation"), "conjugation" (with "verb" and "correctAnswer"), "writing".\n\nReturn strictly valid JSON.`;
    try{
      const r=await ai.models.generateContent({model:"gemini-2.0-flash",contents:prompt,config:{responseMimeType:"application/json",responseSchema:{type:Type.OBJECT,required:["title","explanation","vocabulary","practice"],properties:{title:{type:Type.STRING},explanation:{type:Type.STRING},vocabulary:{type:Type.ARRAY,items:{type:Type.OBJECT,required:["spanish","dynamicLang","explanation"],properties:{spanish:{type:Type.STRING},dynamicLang:{type:Type.STRING},explanation:{type:Type.STRING}}}},practice:{type:Type.ARRAY,items:{type:Type.OBJECT,required:["type","question"],properties:{type:{type:Type.STRING},question:{type:Type.STRING},options:{type:Type.ARRAY,items:{type:Type.STRING}},correctIndex:{type:Type.INTEGER},blankWord:{type:Type.STRING},correctTranslation:{type:Type.STRING},verb:{type:Type.STRING},correctAnswer:{type:Type.STRING}}}}}}}});
      res.json(JSON.parse(r.text||"{}"));
    }catch(e:any){const iq=e?.message?.includes("429")||e?.status===429;if(iq)res.status(429).json({error:"Gemini Quota Exceeded",isQuota:true});else res.status(500).json({error:e.message||"Failed to generate lesson"});}
  });

  app.post("/api/exam",async(req:any,res:any)=>{
    if(!process.env.GEMINI_API_KEY)return res.status(500).json({error:"GEMINI_API_KEY is not configured"});
    const{level,examId,targetLang}=req.body;const en=examId||1;
    const prompt=`Create a highly thorough official SIELE-inspired Spanish language examination for student level ${level}.\nThis is EXAM VERSION ${en} out of 30. Interface language: ${targetLang}.\n\nCRITICAL: Do NOT include questions about visas, TIE, NIE, empadronamiento, university enrollment. Focus EXCLUSIVELY on Spanish language: grammar, conjugations, vocabulary, everyday dialogues.\n\nStructure: exactly 40 questions in 5 Tareas of 8 questions each:\n- Tarea 1 (Q1-8) [A1]: Simple vocabulary, greetings, basic sentences.\n- Tarea 2 (Q9-16) [A2]: Daily routines, past tenses.\n- Tarea 3 (Q17-24) [B1]: Opinions, ser/estar, future tense, basic subjuntivo.\n- Tarea 4 (Q25-32) [B2]: Advanced subjuntivo, por/para, complex grammar.\n- Tarea 5 (Q33-40) [C1]: Advanced reading, idioms, register.\n\nEach question: 4 options, 1 correctIndex (0-3), a "tip" in ${targetLang}, and "tarea" number (1-5).\n\nReturn strictly valid JSON.`;
    try{
      const r=await ai.models.generateContent({model:"gemini-2.0-flash",contents:prompt,config:{responseMimeType:"application/json",responseSchema:{type:Type.OBJECT,required:["examTitle","questions"],properties:{examTitle:{type:Type.STRING},questions:{type:Type.ARRAY,items:{type:Type.OBJECT,required:["question","options","correctIndex","tip","tarea"],properties:{question:{type:Type.STRING},options:{type:Type.ARRAY,items:{type:Type.STRING}},correctIndex:{type:Type.INTEGER},tip:{type:Type.STRING},tarea:{type:Type.INTEGER}}}}}}}});
      res.json(JSON.parse(r.text||"{}"));
    }catch(e:any){const iq=e?.message?.includes("429")||e?.status===429;if(iq)res.status(429).json({error:"Gemini Quota Exceeded",isQuota:true});else res.status(500).json({error:e.message||"Failed to generate exam"});}
  });

  app.post("/api/cv",async(req:any,res:any)=>{
    if(!process.env.GEMINI_API_KEY)return res.status(500).json({error:"GEMINI_API_KEY is not configured"});
    const{name,email,role,city,edu,skills,exp}=req.body;
    const prompt=`You are a professional Spanish career advisor.\nGenerate a polished European-standard CV in Spanish.\nName: ${name}, Email: ${email}, Role: ${role}, City: ${city}, Education: ${edu}, Skills: ${skills}, Experience: ${exp}\n\nOutput JSON with "cvHtml": beautiful HTML (no html/body/head tags) with sections: Datos personales, Perfil/Objetivo, Formacion academica, Experiencia profesional, Competencias, Idiomas. Use inline CSS, professional styling.`;
    try{
      const r=await ai.models.generateContent({model:"gemini-2.0-flash",contents:prompt,config:{responseMimeType:"application/json",responseSchema:{type:Type.OBJECT,required:["cvHtml"],properties:{cvHtml:{type:Type.STRING}}}}});
      res.json(JSON.parse(r.text||'{"cvHtml":""}'));
    }catch(e:any){const iq=e?.message?.includes("429")||e?.status===429;if(iq)res.status(429).json({error:"Gemini Quota Exceeded",isQuota:true});else res.status(500).json({error:e.message||"Failed to generate CV"});}
  });

  app.post("/api/chat-correct",async(req:any,res:any)=>{
    if(!process.env.GEMINI_API_KEY)return res.json({tip:null});
    const prompt=`An Arab student wrote in a Spanish community chatroom:\n"${req.body.message}"\n\nAnalyze if this message uses Spanish and has grammar/spelling errors.\nIf errors exist, provide a helpful 1-2 sentence correction tip in French, Arabic, or English.\nIf not in Spanish or no mistakes, return null.\n\nReturn JSON with "tip" field.`;
    try{const r=await ai.models.generateContent({model:"gemini-2.0-flash",contents:prompt,config:{responseMimeType:"application/json",responseSchema:{type:Type.OBJECT,required:["tip"],properties:{tip:{type:Type.STRING}}}}});res.json(JSON.parse(r.text||'{"tip":null}'));}
    catch(e){res.json({tip:null});}
  });

  if(process.env.NODE_ENV!=="production"){const vite=await createViteServer({server:{middlewareMode:true},appType:"spa"});app.use(vite.middlewares);}
  else{const dp=path.join(process.cwd(),"dist");app.use(express.static(dp));app.get("*",(_q,r)=>r.sendFile(path.join(dp,"index.html")));}

  app.listen(PORT,"0.0.0.0",()=>console.log(`Spain Study Portal on port ${PORT} | DB: ${usePostgres?"PostgreSQL":"JSON"} | AI: Gemini`));
}

startServer();

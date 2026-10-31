const SUPABASE_URL = "https://umzgmozuiigugboughlp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_NRVJh861SQzMtKwYwg3-5g_PE-W8WMr";

const rules = [
  {re:/\beval\s*\(/gi,title:"Dangerous eval usage",level:"high",why:"eval() dapat mengeksekusi string sebagai kode dan meningkatkan risiko injection."},
  {re:/innerHTML\s*=/gi,title:"Potential DOM XSS sink",level:"high",why:"innerHTML perlu ditangani hati-hati jika sumber datanya tidak dipercaya."},
  {re:/document\.write\s*\(/gi,title:"document.write usage",level:"medium",why:"document.write dapat menjadi sumber masalah injection pada input tertentu."},
  {re:/https?:\/\/[^\s"'`]+/gi,title:"External URL detected",level:"low",why:"Periksa apakah koneksi menggunakan HTTPS dan domainnya memang dipercaya."},
  {re:/(api[_-]?key|secret|password|token)\s*[:=]\s*["'][^"']{8,}["']/gi,title:"Possible hard-coded secret",level:"high",why:"Secret di source code frontend dapat terlihat oleh pengguna."},
  {re:/console\.(log|debug|warn)\s*\(/gi,title:"Debug logging exposed",level:"low",why:"Log debug sebaiknya ditinjau sebelum production."}
];

const input=document.querySelector("#fileInput"), results=document.querySelector("#results");
const scoreEl=document.querySelector("#score"), filesEl=document.querySelector("#files"), findingsEl=document.querySelector("#findings");

input.addEventListener("change", async e=>{
  const fs=[...e.target.files]; if(!fs.length)return;
  results.innerHTML=""; let total=0, score=100;
  for(const f of fs){
    const text=await f.text(); let fileFindings=0;
    for(const r of rules){
      const matches=text.match(r.re); if(!matches)continue;
      fileFindings += matches.length;
      total += matches.length;
      score -= (r.level==="high"?12:r.level==="medium"?6:2)*Math.min(matches.length,4);
      const div=document.createElement("div"); div.className=`finding ${r.level}`;
      div.innerHTML=`<strong>${r.level.toUpperCase()} · ${escapeHtml(r.title)}</strong><small>${escapeHtml(f.name)} — ${escapeHtml(r.why)} Detected: ${matches.length} match.</small>`;
      results.appendChild(div);
    }
    if(!fileFindings){
      const div=document.createElement("div"); div.className="finding low";
      div.innerHTML=`<strong>PASS · ${escapeHtml(f.name)}</strong><small>No known patterns from the current defensive rules were detected.</small>`;
      results.appendChild(div);
    }
  }
  score=Math.max(0,score);
  filesEl.textContent=fs.length; findingsEl.textContent=total; scoreEl.textContent=score;
});
document.querySelector("#clear").onclick=()=>{results.className="empty";results.textContent="Belum ada scan. Pilih file untuk memulai.";filesEl.textContent="0";findingsEl.textContent="0";scoreEl.textContent="100";input.value=""};
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}

const canvas=document.querySelector("#matrix"),ctx=canvas.getContext("2d");
let drops=[];function resize(){canvas.width=innerWidth;canvas.height=innerHeight;drops=Array(Math.ceil(innerWidth/16)).fill(0).map(()=>Math.random()*-50)}
resize();addEventListener("resize",resize);
setInterval(()=>{ctx.fillStyle="rgba(0,0,0,.08)";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle="#21ff62";ctx.font="14px monospace";drops.forEach((y,i)=>{const ch=String.fromCharCode(0x30A0+Math.random()*96);ctx.fillText(ch,i*16,y*16);if(y*16>canvas.height&&Math.random()>.975)drops[i]=0;drops[i]++})},55);

const SK=["Python","Java","SQL","Statistics","Machine Learning","Web Dev","Cloud","Networking","Excel","Financial Modelling","Accounting","Data Visualization","Digital Marketing","SEO & Content","Sales","Negotiation","Communication","Public Speaking","Writing","Leadership","Teamwork","Problem Solving","Critical Thinking","Design Tools","Research","Project Management","Strategy","Teaching","Empathy","Entrepreneurship"];
const RI={R:"Building, fixing, technical work",I:"Analysing, researching, solving puzzles",A:"Creating, designing, writing",S:"Helping, teaching, counselling",E:"Leading, persuading, selling",C:"Organising, numbers, processes"};
const PR={income:"High income",stability:"Job stability",creativity:"Creativity",impact:"Social impact",growth:"Fast growth"};
const CAR=[
["Data Analyst","IC",["SQL","Excel","Statistics","Data Visualization","Communication"],.06,["growth","income"]],
["Machine Learning Engineer","IR",["Python","Machine Learning","Statistics","SQL","Problem Solving"],.10,["growth","income"]],
["Software Developer","IR",["Python","Java","Problem Solving","SQL","Web Dev"],.06,["income","growth"]],
["Cloud / DevOps Engineer","RI",["Cloud","Networking","Python","Problem Solving"],.05,["income","stability"]],
["Cybersecurity Analyst","IR",["Networking","Python","Problem Solving","Critical Thinking"],.05,["stability","income"]],
["UI/UX Designer","AS",["Design Tools","Research","Communication","Problem Solving"],.02,["creativity","impact"]],
["Digital Marketer","EA",["Digital Marketing","SEO & Content","Data Visualization","Communication","Writing"],.02,["growth","creativity"]],
["Financial Analyst","CE",["Financial Modelling","Excel","Accounting","Statistics","Critical Thinking"],.08,["income","stability"]],
["Brand / Marketing Manager","EA",["Strategy","Communication","Digital Marketing","Leadership","Writing"],.03,["creativity","growth"]],
["HR Manager","SE",["Communication","Empathy","Leadership","Negotiation","Teamwork"],.03,["stability","impact"]],
["Operations / Supply Chain Manager","CE",["Project Management","Excel","Problem Solving","Strategy","Leadership"],.04,["stability","income"]],
["Entrepreneur / Startup Founder","EA",["Entrepreneurship","Sales","Leadership","Strategy","Communication"],0,["growth","creativity"]],
["Management Consultant","EI",["Strategy","Critical Thinking","Excel","Communication","Public Speaking"],.08,["income","growth"]],
["Accountant / Auditor","CI",["Accounting","Excel","Critical Thinking","Financial Modelling"],.08,["stability","income"]],
["Content Writer / Journalist","AE",["Writing","Research","SEO & Content","Communication","Critical Thinking"],.02,["creativity","impact"]],
["Teacher / Academician","SI",["Teaching","Communication","Research","Empathy","Public Speaking"],.07,["impact","stability"]],
["Psychologist / Counsellor","SI",["Empathy","Research","Communication","Critical Thinking"],.06,["impact","stability"]],
["Public Policy / Civil Services","SE",["Research","Writing","Critical Thinking","Public Speaking","Leadership"],.06,["impact","stability"]],
["Sales / Business Development","E",["Sales","Negotiation","Communication","Public Speaking","Teamwork"],0,["income","growth"]]
].map(([n,i,s,g,v])=>({n,i,s,g,v}));
const ACT={"Data Analyst":["Build 3 dashboards (Power BI / Tableau)","Complete one real-data analysis project","Apply for analyst internships"],"Machine Learning Engineer":["Reproduce 2 research papers","Deploy a model with an API","Compete on Kaggle"],"Software Developer":["Solve 150 DSA problems","Ship a full-stack app","Contribute to open source"]};
const GEN=n=>ACT[n]||[`Do one real project or case study for ${n}`,"Interview 2 working professionals in this role","Apply for internships, shadowing or live projects"];
const $=id=>document.getElementById(id),cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const chips=(id,o,t="checkbox")=>$(id).innerHTML=Object.entries(o).map(([k,v])=>`<label><input type="${t}" value="${k}">${v}</label>`).join("");
chips("sk",Object.fromEntries(SK.map(x=>[x,x])));chips("pr",PR);
$("ri").innerHTML=Object.entries(RI).map(([k,v])=>`<label class="l">${v}: <b id="v${k}">3</b></label><input type="range" id="r${k}" min="1" max="5" value="3">`).join("");
Object.keys(RI).forEach(k=>$("r"+k).oninput=()=>$("v"+k).textContent=$("r"+k).value);
$("cg").oninput=()=>$("vg").textContent=(+$("cg").value).toFixed(1);$("hr").oninput=()=>$("vh").textContent=$("hr").value;
$("pr").onchange=e=>{const c=[...document.querySelectorAll("#pr input:checked")];if(c.length>2)e.target.checked=false};
const sel=id=>[...document.querySelectorAll("#"+id+" input:checked")].map(x=>x.value);
function show(s){document.querySelectorAll("section").forEach(e=>e.classList.toggle("on",e.id===s));document.querySelectorAll("nav [data-s]").forEach(b=>b.classList.toggle("on",b.dataset.s===s));scrollTo(0,0)}
document.querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>show(b.dataset.s));document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>show(b.dataset.go));
$("th").onclick=()=>{const r=document.documentElement;r.dataset.theme=getComputedStyle(r).getPropertyValue("--bg").trim()==="#0f1117"?"light":"dark"};
function model(){
 const ri={};Object.keys(RI).forEach(k=>ri[k]=+$("r"+k).value);
 const p={yr:$("yr").value,cg:+$("cg").value,sg:$("sg").checked,hr:+$("hr").value,sk:sel("sk"),pr:sel("pr"),ri,i:+$("in").value,p:+$("pj").value,c:+$("ce").value,l:+$("ld").value};
 const exp=cl(.35*Math.min(p.i/2,1)+.30*Math.min(p.p/3,1)+.15*Math.min(p.c/3,1)+.20*Math.min(p.l/2,1));
 const gr=p.sg?.7:p.cg/10;
 const jobs=CAR.map(c=>{const have=c.s.filter(s=>p.sk.includes(s)),sk=have.length/c.s.length,
  it=cl(((c.i.split("").reduce((a,k)=>a+ri[k],0)/c.i.length)-1)/4),
  vf=p.pr.length?c.v.filter(v=>p.pr.includes(v)).length/Math.min(2,p.pr.length):.5;
  const m=(1-c.g)*(.45*sk+.25*it+.15*exp+.15*vf)+c.g*gr;
  return{...c,m:Math.round(m*100),sk,it,vf,have,gaps:c.s.filter(s=>!p.sk.includes(s))}}).sort((a,b)=>b.m-a.m);
 const t=jobs[0],R0=Math.round((.55*t.sk+.30*exp+.15*t.it)*100);
 const hrs=t.gaps.length*40+(1-exp)*120,full=hrs/(p.hr*4.3),ready=R0>=75?0:full*(75-R0)/(88-R0);
 return{p,exp,jobs,t,R0,full,ready}}
function gauge(v,c){const r=54,L=2*Math.PI*r;return `<svg viewBox="0 0 140 140" style="width:160px;display:block;margin:auto"><circle cx="70" cy="70" r="${r}" fill="none" stroke="var(--br)" stroke-width="12"/><circle cx="70" cy="70" r="${r}" fill="none" stroke="${c}" stroke-width="12" stroke-linecap="round" stroke-dasharray="${L*v/100} ${L}" transform="rotate(-90 70 70)"/><text x="70" y="76" text-anchor="middle" font-size="30" font-weight="700" fill="var(--tx)">${v}%</text><text x="70" y="94" text-anchor="middle" font-size="9" fill="var(--mu)">job readiness</text></svg>`}
function radar(ri){const k=Object.keys(RI),R=68,C=100,pt=(i,q)=>{const a=-Math.PI/2+i*Math.PI/3;return[C+Math.cos(a)*R*q,C+Math.sin(a)*R*q]};
 const g=[.4,.7,1].map(q=>`<polygon points="${k.map((_,i)=>pt(i,q).join(",")).join(" ")}" fill="none" stroke="var(--br)"/>`).join("");
 const poly=k.map((x,i)=>pt(i,ri[x]/5).join(",")).join(" "),lb=k.map((x,i)=>{const[a,b]=pt(i,1.25);return `<text x="${a}" y="${b+4}" text-anchor="middle" font-size="12" font-weight="700" fill="var(--mu)">${x}</text>`}).join("");
 return `<svg viewBox="0 0 200 200" style="width:100%;max-width:250px;display:block;margin:auto">${g}<polygon points="${poly}" fill="var(--ac)" fill-opacity=".3" stroke="var(--ac)" stroke-width="2"/>${lb}</svg>`}
function line(M){const W=320,H=170,x=m=>30+m/12*(W-40),y=v=>H-24-v/100*(H-40),f=m=>M.R0>=88?M.R0:Math.min(88,M.R0+(88-M.R0)*m/Math.max(M.full,.5));
 const pts=Array.from({length:13},(_,m)=>x(m)+","+y(f(m))).join(" ");
 return `<svg viewBox="0 0 ${W} ${H}" style="width:100%">${[0,25,50,75,100].map(v=>`<line x1="30" x2="${W-10}" y1="${y(v)}" y2="${y(v)}" stroke="var(--br)"/><text x="4" y="${y(v)+3}" font-size="9" fill="var(--mu)">${v}</text>`).join("")}<line x1="30" x2="${W-10}" y1="${y(75)}" y2="${y(75)}" stroke="var(--ok)" stroke-dasharray="4"/><text x="${W-12}" y="${y(75)-3}" text-anchor="end" font-size="9" fill="var(--ok)">job-ready (75)</text>
 <line x1="30" x2="${W-10}" y1="${y(M.R0)}" y2="${y(M.R0)}" stroke="var(--bd)" stroke-dasharray="3"/><polyline points="${pts}" fill="none" stroke="var(--ac)" stroke-width="2.5"/>${[0,3,6,9,12].map(m=>`<text x="${x(m)}" y="${H-8}" text-anchor="middle" font-size="9" fill="var(--mu)">${m}m</text>`).join("")}</svg><div class="mini">Blue: with your plan · Red dashed: if nothing changes</div>`}
const TYPE=ri=>Object.entries(ri).sort((a,b)=>b[1]-a[1]).slice(0,2).map(x=>x[0]);
function report(){const M=model(),{p,jobs,t,R0,exp}=M,col=R0>=75?"var(--ok)":R0>=50?"var(--wa)":"var(--bd)";
 const ty=TYPE(p.ri),wk=M.ready<=0?"You are already job-ready for this path.":`About ${M.ready<1?"1":Math.ceil(M.ready)} month(s) to reach job-ready at ${p.hr} hrs/week.`;
 const g=t.gaps,ph=[[`Days 1–30`,g.length?`Learn ${g.slice(0,2).join(" and ")} (about 2 weeks each) with a mini-project.`:"Deepen your core skills with advanced practice."],
 ["Days 31–60",`${g[2]?`Learn ${g[2]}. `:""}${GEN(t.n)[0]}.`],["Days 61–90",`${GEN(t.n)[1]}; ${GEN(t.n)[2].toLowerCase()}. Update your resume and LinkedIn.`]];
 const yrN={1:"Explore: try clubs, free courses and one small project.",2:"Build: start projects and certifications, begin a portfolio.",3:"Prove: land an internship and polish your resume.",4:"Launch: apply for jobs or higher studies and do mock interviews.",5:"Launch: apply now, network actively and finish gap skills in parallel."}[p.yr];
 $("out").innerHTML=`<div class="c"><div class="tabs"><button class="on" data-t="a">Overview</button><button data-t="b">Career matches</button><button data-t="c">Roadmap</button><button class="noprint" onclick="window.print()">⬇ Save PDF</button></div>
 <div id="a"><div class="two"><div>${gauge(R0,col)}<div style="text-align:center;margin-top:6px"><b>${t.n}</b><div class="mini">Top match · ${t.m}%</div></div></div><div>${radar(p.ri)}<div class="mini" style="text-align:center">Your interest profile: <b>${ty.map(k=>RI[k].split(",")[0]).join(" + ")}</b></div></div></div>
 <div class="kpi"><div><b>${t.m}%</b><span>Best career match</span></div><div><b>${Math.round(exp*100)}%</b><span>Experience score</span></div><div><b>${t.have.length}/${t.s.length}</b><span>Core skills covered</span></div><div><b>${M.ready<=0?"Now":Math.ceil(M.ready)+" mo"}</b><span>To job-ready</span></div></div>
 <h3>Readiness forecast (12 months)</h3>${line(M)}<p class="mini">${wk}</p>
 <h3 style="margin-top:14px">Key insights</h3><ul><li>You have <b>${t.have.length} of ${t.s.length}</b> core skills for ${t.n}${g.length?`; missing: ${g.join(", ")}`:""}.</li><li>${exp<.4?"Experience is your biggest lever: add an internship or a real project.":"Your experience gives you a solid base; keep documenting results."}</li><li>For ${t.n}, grades make up only <b>${Math.round(t.g*100)}%</b> of the match.${p.sg?" (You skipped CGPA, so a neutral value was used.)":""}</li></ul></div>
 <div id="b" hidden>${jobs.slice(0,6).map(j=>`<div class="job"><div class="row"><b>${j.n}</b><b>${j.m}% match</b></div><div class="bar"><i style="width:${j.m}%"></i></div>
 <div class="mini">Skills ${Math.round(j.sk*100)}% · Interest ${Math.round(j.it*100)}% · Priorities ${Math.round(j.vf*100)}% · Grades weight ${Math.round(j.g*100)}%</div>${j.have.map(x=>`<span class="ok">✓ ${x}</span>`).join("")}${j.gaps.map(x=>`<span class="gap">${x}</span>`).join("")}</div>`).join("")}</div>
 <div id="c" hidden><p><b>Stage advice:</b> ${yrN}</p><h3>90-day plan for ${t.n}</h3>${ph.map(x=>`<div class="ph"><b>${x[0]}</b><br>${x[1]}</div>`).join("")}<h3 style="margin-top:14px">Backup path: ${jobs[1].n}</h3><ul>${GEN(jobs[1].n).map(x=>`<li>${x}</li>`).join("")}${jobs[1].gaps.slice(0,2).map(x=>`<li>Learn ${x}</li>`).join("")}</ul></div></div>`;
 const tb=document.querySelectorAll(".tabs button[data-t]");tb.forEach(b=>b.onclick=()=>{tb.forEach(x=>x.classList.toggle("on",x===b));["a","b","c"].forEach(i=>$(i).hidden=i!==b.dataset.t)});
 if(innerWidth<900)$("out").scrollIntoView({behavior:"smooth"})}
$("go").onclick=report;
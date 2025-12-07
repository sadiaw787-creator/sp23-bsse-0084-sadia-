document.addEventListener('DOMContentLoaded',()=>{
document.getElementById('saveBtn')?.addEventListener('click',saveBasic);
loadPlans();
});
function saveBasic(){
const goal=document.getElementById('goal').value.trim();
const days=document.getElementById('planDays').value;
const date=document.getElementById('startDate').value;
const time=document.getElementById('startTime').value;
if(!goal||!days||!date||!time){ alert('Please fill all fields!'); return; }
let plans=JSON.parse(localStorage.getItem('plans'))||[];
if(plans.some(p=>p.date===date && p.time===time)){ alert('This slot is already taken!'); return; }
const newPlan={id:Date.now(),goal,days:parseInt(days,10),date,time};
plans.push(newPlan);
localStorage.setItem('plans',JSON.stringify(plans));
loadPlans();
alert('Saved Successfully!');
document.getElementById('goal').value='';
}
function loadPlans(){
const plans=JSON.parse(localStorage.getItem('plans'))||[];
const body=document.getElementById('plansBody'); if(!body) return;
body.innerHTML='';
plans.forEach(plan=>{
const tr=document.createElement('tr');
tr.innerHTML=`<td>${plan.id}</td><td>${plan.goal}</td><td>${plan.days}</td><td>${plan.date}</td><td>${plan.time}</td>
<td><button class='btn btn-warning btn-sm me-2' data-id='${plan.id}' data-action='edit'>Edit</button>
<button class='btn btn-danger btn-sm' data-id='${plan.id}' data-action='delete'>Delete</button></td>`;
body.appendChild(tr);
});
body.querySelectorAll('button')?.forEach(b=>b.addEventListener('click',()=>{
const id=Number(b.getAttribute('data-id'));
const action=b.getAttribute('data-action');
if(action==='edit') editPlan(id);
if(action==='delete') deletePlan(id);
}));
}
function editPlan(id){
let plans=JSON.parse(localStorage.getItem('plans'))||[];
const p=plans.find(x=>x.id===id); if(!p){alert('Plan not found'); return;}
document.getElementById('goal').value=p.goal;
document.getElementById('planDays').value=p.days;
document.getElementById('startDate').value=p.date;
document.getElementById('startTime').value=p.time;
deletePlan(id);
}
function deletePlan(id){
let plans=JSON.parse(localStorage.getItem('plans'))||[];
plans=plans.filter(p=>p.id!==id);
localStorage.setItem('plans',JSON.stringify(plans));
loadPlans();
}
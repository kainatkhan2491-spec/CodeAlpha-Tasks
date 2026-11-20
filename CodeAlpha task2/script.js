// Replace ids/URLs with your own images if you like
const photos=[
 {id:10,c:"nature"},{id:11,c:"nature"},{id:15,c:"nature"},{id:28,c:"nature"},
 {id:101,c:"city"},{id:122,c:"city"},{id:164,c:"city"},{id:274,c:"city"},
 {id:200,c:"animals"},{id:219,c:"animals"},{id:237,c:"animals"},{id:169,c:"animals"}
].map(p=>({...p,thumb:`https://picsum.photos/id/${p.id}/500/340`,full:`https://picsum.photos/id/${p.id}/1200/800`}));
const grid=document.getElementById('grid'),lb=document.getElementById('lb'),lbimg=document.getElementById('lbimg'),cap=document.getElementById('cap');
let visible=[],cur=0;
photos.forEach((p,i)=>{
  const d=document.createElement('div');d.className='item';d.dataset.c=p.c;
  d.innerHTML=`<img loading="lazy" src="${p.thumb}" alt="${p.c} photo ${i+1}">`;
  d.onclick=()=>open(p);grid.appendChild(d);p.el=d;
});
function updateVisible(f){
  photos.forEach(p=>p.el.classList.toggle('hide',f!=='all'&&p.c!==f));
  visible=photos.filter(p=>!p.el.classList.contains('hide'));
}
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{
  document.querySelector('.filters .active').classList.remove('active');b.classList.add('active');updateVisible(b.dataset.f);
});
function show(){const p=visible[cur];lbimg.src=p.full;cap.textContent=`${p.c} — ${cur+1} / ${visible.length}`}
function open(p){cur=visible.indexOf(p);lb.classList.add('open');show()}
const step=n=>{cur=(cur+n+visible.length)%visible.length;show()};
document.getElementById('next').onclick=()=>step(1);
document.getElementById('prev').onclick=()=>step(-1);
document.getElementById('close').onclick=()=>lb.classList.remove('open');
lb.onclick=e=>{if(e.target===lb)lb.classList.remove('open')};
document.addEventListener('keydown',e=>{
  if(!lb.classList.contains('open'))return;
  if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1);if(e.key==='Escape')lb.classList.remove('open');
});
updateVisible('all');

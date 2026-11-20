let cur='0',prev=null,op=null,fresh=false;
const curEl=document.getElementById('cur'),exprEl=document.getElementById('expr');
const render=()=>{curEl.textContent=cur;exprEl.textContent=prev!==null&&op?`${prev} ${op}`:''};
function num(n){
  if(fresh){cur='0';fresh=false}
  if(n==='.'&&cur.includes('.'))return;
  cur=(cur==='0'&&n!=='.')?n:cur+n;render();
}
function calc(a,b,o){
  a=parseFloat(a);b=parseFloat(b);
  if(o==='+')return a+b;if(o==='−')return a-b;if(o==='×')return a*b;
  if(o==='÷')return b===0?'Error':a/b;return b;
}
function setOp(o){
  if(op&&!fresh){const r=calc(prev,cur,op);if(r==='Error'){cur='Error';prev=null;op=null;fresh=true;return render()}cur=String(+r.toFixed(10))}
  prev=cur;op=o;fresh=true;render();
}
function equals(){
  if(!op)return;
  const r=calc(prev,cur,op);
  exprEl.textContent=`${prev} ${op} ${cur} =`;
  cur=r==='Error'?'Error':String(+r.toFixed(10));prev=null;op=null;fresh=true;curEl.textContent=cur;
}
function action(a){
  if(a==='clear'){cur='0';prev=null;op=null;fresh=false;render()}
  if(a==='del'){if(fresh||cur==='Error'){cur='0'}else{cur=cur.length>1?cur.slice(0,-1):'0'}render()}
  if(a==='percent'){cur=String(parseFloat(cur)/100);render()}
  if(a==='eq')equals();
}
document.querySelectorAll('button').forEach(b=>b.onclick=()=>{
  if(b.dataset.n)num(b.dataset.n);else if(b.dataset.o)setOp(b.dataset.o);else action(b.dataset.a);
});
document.addEventListener('keydown',e=>{
  const k=e.key;
  if(/[0-9.]/.test(k))num(k);
  else if(k==='+')setOp('+');else if(k==='-')setOp('−');
  else if(k==='*')setOp('×');else if(k==='/'){e.preventDefault();setOp('÷')}
  else if(k==='Enter'||k==='='){e.preventDefault();equals()}
  else if(k==='Backspace')action('del');
  else if(k==='Escape'||k==='Delete')action('clear');
  else if(k==='%')action('percent');
});

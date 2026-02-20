const products=[
{id:'ring-001',name:'Minimal Gold Ring',price:2499,desc:'Elegant daily-wear gold ring.',category:'Rings',img:'assets/minimal-gold-ring.svg'},
{id:'ring-002',name:'Rose Stone Ring',price:3199,desc:'Subtle sparkle with rose crystal.',category:'Rings',img:'assets/rose-stone-ring.svg'},
{id:'neck-001',name:'Pearl Drop Necklace',price:4299,desc:'Classic pearl-inspired drop style.',category:'Necklaces',img:'assets/pearl-drop-necklace.svg'},
{id:'neck-002',name:'Emerald Line Necklace',price:5599,desc:'Refined green stone statement piece.',category:'Necklaces',img:'assets/emerald-line-necklace.svg'},
{id:'ear-001',name:'Classic Hoop Earrings',price:1899,desc:'Lightweight hoops for daily style.',category:'Earrings',img:'assets/classic-hoop-earrings.svg'},
{id:'ear-002',name:'Star Diamond Studs',price:2799,desc:'Compact studs with star brilliance.',category:'Earrings',img:'assets/star-diamond-studs.svg'},
{id:'brace-001',name:'Sleek Chain Bracelet',price:2299,desc:'Minimal chain with premium finish.',category:'Bracelets',img:'assets/sleek-chain-bracelet.svg'},
{id:'brace-002',name:'Charm Gold Bracelet',price:2999,desc:'Stylish charms in warm gold tone.',category:'Bracelets',img:'assets/charm-gold-bracelet.svg'}
];
const state={category:'All',query:''};
const categories=['All',...new Set(products.map(p=>p.category))];

function renderChips(){
  const wrap=document.getElementById('chips');
  wrap.innerHTML=categories.map(c=>`<button class="chip ${c===state.category?'active':''}" data-cat="${c}">${c}</button>`).join('');
  wrap.querySelectorAll('button').forEach(b=>b.onclick=()=>{state.category=b.dataset.cat;render();});
}

function shareActions(p,url){
  const wa=`https://wa.me/?text=${encodeURIComponent(`${p.name} - ₹${p.price} ${url}`)}`;
  return `<div class="share">
    <a class="btn small brand" target="_blank" href="${wa}">WhatsApp</a>
    <button class="btn small" onclick="copyLink('${url}')">Copy Link</button>
    <a class="btn small" target="_blank" href="https://www.instagram.com/">Instagram</a>
    <button class="btn small" onclick="nativeShare('${p.name}',${p.price},'${url}')">Share</button>
  </div>`;
}

window.copyLink=async function(url){await navigator.clipboard.writeText(url);alert('Link copied');}
window.nativeShare=async function(name,price,url){if(navigator.share){await navigator.share({title:name,text:`${name} - ₹${price}`,url});}else{alert('Native share unavailable');}}

function render(){
  renderChips();
  const q=state.query.toLowerCase().trim();
  const filtered=products.filter(p=>(state.category==='All'||p.category===state.category)&&(!q||p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)));
  document.getElementById('count').textContent=`Showing ${filtered.length} products`;
  document.getElementById('grid').innerHTML=filtered.map(p=>{
    const url=`${location.origin}${location.pathname}#${p.id}`;
    return `<article class="card" id="${p.id}">
      <img src="${p.img}" alt="${p.name}">
      <div class="card-body">
        <div class="row"><strong>${p.name}</strong><span class="price">₹${p.price}</span></div>
        <p class="muted">${p.desc}</p>
        <div class="tag">${p.category}</div>
        ${shareActions(p,url)}
      </div>
    </article>`;
  }).join('');
}

document.getElementById('search').addEventListener('input',e=>{state.query=e.target.value;render();});
render();

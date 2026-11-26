(function(){
  var S=window.SITE;
  document.querySelectorAll('[data-site]').forEach(function(e){
    var k=e.getAttribute('data-site');
    if(k==='variante-fmt'){e.textContent=S.variante?'(ou '+S.variante+')':'';return;}
    e.textContent=S[k]||'';
  });
  document.title='Commune de '+S.nom+' — Site officiel (prototype)';
  document.getElementById('pied').textContent=S.pied;
  document.getElementById('contact-lignes').innerHTML=
    '<strong>'+S.contact.adresse+'</strong><br>Téléphone : '+S.contact.telephone+'<br>Courriel : '+S.contact.email;
  document.getElementById('lien-qwc').href=S.qwc;
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);});
  n.addEventListener('click',function(){n.classList.remove('open');});
  if(window.L){
    var m=L.map('map',{scrollWheelZoom:false}).setView(S.carte.centre,S.carte.zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© les contributeurs d\'OpenStreetMap'}).addTo(m);
    var r=L.rectangle(S.carte.emprise,{color:'#b5651d',weight:2,fillOpacity:.08}).addTo(m);
    r.bindTooltip('Emprise de la commune (provisoire)');m.fitBounds(r.getBounds().pad(.1));
  }
})();

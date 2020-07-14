let pohja = document.getElementById("pohja");
pohja.addEventListener("mousedown", paina);
window.addEventListener("mouseup", paasta);
window.addEventListener("mousemove", liikuta);

let kopio = null;
let kohde = null;
let aloitusY = 0;
let nykyY = 0;
let scrollMaara = 0;
let solujenMaara = 150;
let scrolley = 0;

for(let i = 0; i < solujenMaara; i++) {
  let div = document.createElement("div");
  div.classList.add("tiedot")
  pohja.appendChild(div);

  let miniKuva = document.createElement("div");
  miniKuva.classList.add("miniKuva");
  miniKuva.style.backgroundColor = `rgb(${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)})`;
  div.style.backgroundColor = miniKuva.style.backgroundColor;
  div.appendChild(miniKuva);

  let p = document.createElement("p");
  p.textContent = i;
  div.appendChild(p);

  if(i == solujenMaara - 1) {
    let lopetus = document.createElement("div");
    lopetus.classList.add("lopetus")
    pohja.appendChild(lopetus);
  }
}

function paina(e) {
  if(!e.target.classList.contains("tiedot") && !e.target.classList.contains("miniKuva")) return;
  if(e.buttons == 1 && e.target.classList.contains("tiedot")) {
    pohja.style.overflow = "hidden";
    scrollAjastin = setInterval(scroll, 25);
    e.target.style.transition = null;
    kohde = e.target;
    aloitusY = e.y;
    kopio = kohde.cloneNode(true);
    kopio.id = "liikuta";
    kopio.style.animationName = null;
    kopio.style.top = `${Array.from(pohja.children).indexOf(kohde) * 50}px`;
    nykyY = Array.from(pohja.children).indexOf(kohde) * 50;
    pohja.appendChild(kopio);
    kohde.style.opacity = 0;
  } else if(e.buttons == 1 && e.target.classList.contains("miniKuva")) {
    e.target.parentNode.style.animationName = "poisto";
    e.target.parentNode.style.animationFillMode = "forwards";

    poista(e.target.parentNode);
    function poista(i) {
      setTimeout(() => {
        i.remove();
      },100)
    }
  }
}

function paasta(e) { 
  if(kohde == null || e.buttons !== 0) return
  pohja.style.overflow = null;
  poistaTransition(kohde);
  clearInterval(scrollAjastin);

  kohde.style.opacity = null;
  let text = kopio.style.top;
  let num = +text.substring(0, text.length - 2);
  kohde.style.top = `${num - Array.from(pohja.childNodes).indexOf(kohde) * 50}px`;
  kohde.style.zIndex = "1";
  asetaTransition(kohde);
  kohde = null;
  kopio.remove();
}

function liikuta(e) {
  if(e.buttons !== 1 || kohde == null) return;
  if(e.preventDefault) {
    e.preventDefault();
    scrolley = e.y;
  }
  kopio.style.top = `${minmax(0, (pohja.children.length - 3) * 50, nykyY + e.y - aloitusY)}px`;

  if(aloitusY < e.y - 26 && pohja.children.length - 3> nykyY / 50) laske(1);
  else if(aloitusY > e.y + 26 && nykyY > 0) laske(-1);

  let pohjaK = pohja.getBoundingClientRect().bottom;
  let kopioK = kopio.getBoundingClientRect().bottom;
  let pohjaL = pohja.getBoundingClientRect().top;
  let kopioL = kopio.getBoundingClientRect().top;
  if(pohjaK < kopioK + 20) scrollMaara = 50;
  else if(pohjaK < kopioK + 30) scrollMaara = 40;
  else if(pohjaK < kopioK + 40) scrollMaara = 20;
  else if(pohjaK < kopioK + 50) scrollMaara = 10;
  else if(pohjaL > kopioL - 20) scrollMaara = -50;
  else if(pohjaL > kopioL - 30) scrollMaara = -40;
  else if(pohjaL > kopioL - 40) scrollMaara = -20;
  else if(pohjaL > kopioL - 50) scrollMaara = -10;
  else scrollMaara = 0;

  function laske(i) {
    kohde.style.opacity = null;
    pohja.children[nykyY / 50 + i].style.opacity = 0;
    // ota pohja talteen
    let num = pohja.children[nykyY / 50 + i].children[1].textContent;
    let vari = pohja.children[nykyY / 50 + i].style.backgroundColor;

    // muuta pohja kohteeksi
    pohja.children[nykyY / 50 + i].children[1].textContent = kohde.children[1].textContent;
    pohja.children[nykyY / 50 + i].style.backgroundColor = kohde.style.backgroundColor;
    pohja.children[nykyY / 50 + i].children[0].style.backgroundColor = kohde.style.backgroundColor;
    if(i == 1) kohde.style.animationName = `ylos${Math.abs(+kohde.style.animationName.substring(4) - 1)}`;
    else if(i == -1) kohde.style.animationName = `alas${Math.abs(+kohde.style.animationName.substring(4) - 1)}`;

    // muuta kohde pohjaksi
    kohde.children[1].textContent = num;
    kohde.children[0].style.backgroundColor = vari;
    kohde.style.backgroundColor = vari;


    kohde = pohja.children[nykyY / 50 + i];
    aloitusY += 50 * i;
    nykyY += 50 * i;
  }
}

let scrollAjastin;
function scroll() {
  if(scrollMaara == 0) return;
  if(pohja.offsetHeight + pohja.scrollTop + scrollMaara > pohja.scrollHeight) {
    pohja.scrollBy(0, 100);
    return
  } else if(pohja.scrollTop + scrollMaara <= 0) {
    pohja.scrollBy(0, -100);
    return
  }
  pohja.scrollBy(0, scrollMaara);
  aloitusY -= scrollMaara;
  liikuta({y: scrolley, scroll: false, buttons: 1});
}

function minmax(min, max, value) {
  if(value > max) return max;
  else if(value < min) return min;
  else return value;
}

function asetaTransition(e) {
  setTimeout(() => {
    e.style.transition = "top .2s, z-index 0s .2s";
    e.style.top = null
    e.style.zIndex = null;
  }, 50);
}

function poistaTransition(e) {
  setTimeout(() => {
    e.style.transition = null;
  }, 250)
}

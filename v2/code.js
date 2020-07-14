let pohja = document.getElementById("pohja");
pohja.addEventListener("mousedown", paina);
window.addEventListener("mouseup", paasta);
window.addEventListener("mousemove", liikuta);
pohja.addEventListener("mousewheel", scroll);

let kohde = null;
let aloitusY = 0;
let nykyY = 0;
let scrollMaara = 0;
let solujenMaara = 4000;

for(let i = 0; i < solujenMaara; i++) {
  let div = document.createElement("div");
  div.textContent = i;
  div.id = `div${i}`;
  div.classList.add("tiedot")
  div.style.top = `${i * 50}px`
  pohja.appendChild(div);

  if(i == solujenMaara - 1) {
    let lopetus = document.createElement("div");
    lopetus.classList.add("lopetus")
    lopetus.style.top = `${i * 50}px`;
    pohja.appendChild(lopetus);
  }
}

function paina(e) {
  if(e.target.id == "pohja" || e.buttons !== 1) return;
  kohde = e.target;
  kohde.style.backgroundColor = "#ffa372";
  e.preventDefault();
  aloitusY = e.y;
  aloitusY -= +kohde.style.top.substring(0, kohde.style.top.length - 2);
  kohde.style.zIndex = 5;
  pohja.style.overflow = "hidden";
  kohde.style.transition = "0s";
  ajastin = setInterval(scrollaa, 10);
}

function paasta() {
  if(kohde) {
    kohde.style.backgroundColor = null;
    kohde.style.zIndex = null;
    kohde.style.top = `${(+kohde.id.substring(3, Infinity)) * 50}px`;
    pohja.style.overflow = "auto"
    kohde.style.transition = null;
  }
  kohde = null;
  clearInterval(ajastin);
}

function liikuta(e) {
  if(e.buttons !== 1 || kohde == null) return;
  if(kohde.style.top === `${e.y - aloitusY}px`) return;
  nykyY = e.y;
  kohde.style.top = `${e.y - aloitusY}px`;
  if(e.y - aloitusY <= 0) kohde.style.top = `0px`;
  else if(e.y - aloitusY >= 50 * (solujenMaara - 1)) kohde.style.top = `${50 * (solujenMaara - 1)}px`;
  let kohdeKorkeus = +kohde.style.top.substring(0, kohde.style.top.length - 2);
  let idNumero = +kohde.id.substring(3, Infinity);
  let odotettuKorkeus = idNumero * 50;
  if(kohdeKorkeus > odotettuKorkeus + 30 && kohde.id !== `div${solujenMaara - 1}`) { // ALAS
    let siirra = document.getElementById(`div${idNumero + 1}`);
    siirra.id = `div${idNumero}`;
    siirra.style.top = `${idNumero * 50}px`;
    kohde.id = `div${idNumero + 1}`;
  }
  else if(kohdeKorkeus < odotettuKorkeus - 30 && kohde.id !== "div0") { // YLÖS
    let siirra = document.getElementById(`div${idNumero - 1}`);
    siirra.id = `div${idNumero}`;
    siirra.style.top = `${idNumero * 50}px`;
    kohde.id = `div${idNumero - 1}`;
  }

  // scroll jutut
  if(pohja.offsetHeight + pohja.offsetTop - 15 < e.y) scrollMaara = 50;
  else if(pohja.offsetHeight + pohja.offsetTop - 25 < e.y) scrollMaara = 25;
  else if(pohja.offsetHeight + pohja.offsetTop - 35 < e.y) scrollMaara = 10;
  else if(pohja.offsetHeight + pohja.offsetTop - 50 < e.y) scrollMaara = 5;
  else if(pohja.offsetTop + 15 > e.y) scrollMaara = -50;
  else if(pohja.offsetTop + 20 > e.y) scrollMaara = -25;
  else if(pohja.offsetTop + 35 > e.y) scrollMaara = -10;
  else if(pohja.offsetTop + 50 > e.y) scrollMaara = -5;
  else scrollMaara = 0;
}

function scroll(e) {
  // console.log(e);
  // aloitusY -= e.deltaY;
}

let ajastin;
function scrollaa() {
  if(scrollMaara > 0) {
    if(pohja.offsetHeight + pohja.scrollTop + scrollMaara <= pohja.scrollHeight) {
      aloitusY -= scrollMaara;
      pohja.scrollBy(0, scrollMaara);
      paivitaVisual();
    } else if(pohja.offsetHeight + pohja.scrollTop < pohja.scrollHeight) {
      aloitusY -= pohja.scrollHeight - (pohja.offsetHeight + pohja.scrollTop);
      pohja.scrollBy(0, scrollMaara);
      paivitaVisual();
    }
  } else if(scrollMaara < 0) {
    if(pohja.scrollTop + scrollMaara >= 0) {
      aloitusY -= scrollMaara;
      pohja.scrollBy(0, scrollMaara);
      paivitaVisual();
    } else if(pohja.scrollTop > 0) {
      aloitusY += pohja.scrollTop;
      pohja.scrollBy(0, scrollMaara);
      paivitaVisual();
    }
  }
}

function paivitaVisual() { // kopio mouseMove
  if(kohde.style.top === `${nykyY - aloitusY}px`) return;
  kohde.style.top = `${nykyY - aloitusY}px`;
  if(nykyY - aloitusY <= 0) kohde.style.top = `0px`;
  else if(nykyY - aloitusY >= 50 * (solujenMaara - 1)) kohde.style.top = `${50 * (solujenMaara - 1)}px`;
  let kohdeKorkeus = +kohde.style.top.substring(0, kohde.style.top.length - 2);
  let idNumero = +kohde.id.substring(3, Infinity);
  let odotettuKorkeus = idNumero * 50;
  if(kohdeKorkeus > odotettuKorkeus + 30 && kohde.id !== `div${solujenMaara - 1}`) { // ALAS
    let siirra = document.getElementById(`div${idNumero + 1}`);
    siirra.id = `div${idNumero}`;
    siirra.style.top = `${idNumero * 50}px`;
    kohde.id = `div${idNumero + 1}`;
  }
  else if(kohdeKorkeus < odotettuKorkeus - 30 && kohde.id !== "div0") { // YLÖS
    let siirra = document.getElementById(`div${idNumero - 1}`);
    siirra.id = `div${idNumero}`;
    siirra.style.top = `${idNumero * 50}px`;
    kohde.id = `div${idNumero - 1}`;
  }
}

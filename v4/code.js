let pohja = document.getElementById("pohja");
pohja.addEventListener("mousedown", paina);
window.addEventListener("mouseup", paasta);
window.addEventListener("mousemove", liikuta);
pohja.addEventListener("mousewheel", scroll);

let kohde = null;
let kohdeSijainti = 0;
let aloitusY = 0;
let nykyY = 0;
let scrollMaara = 0;
let solujenMaara = 10;

for(let i = 0; i < solujenMaara; i++) {
  let div = document.createElement("div");
  div.textContent = i;
  div.id = `div${i}`;
  div.classList.add("tiedot")
  div.style.top = `0px`
  pohja.appendChild(div);

  if(i == solujenMaara - 1) {
    let lopetus = document.createElement("div");
    lopetus.classList.add("lopetus")
    lopetus.style.top = `-50px`;
    pohja.appendChild(lopetus);
  }
}

function paina(e) {
  if(e.target.id !== "pohja" && e.buttons == 1) {
    kohde = e.target;
    kohde.style.backgroundColor = "#ffa372";
    e.preventDefault();
    aloitusY = e.y;
    aloitusY -= +kohde.style.top.substring(0, kohde.style.top.length - 2);
    kohdeSijainti = +kohde.style.top.substring(0, kohde.style.top.length - 2);
    kohde.style.zIndex = 5;
    pohja.style.overflow = "hidden";
    kohde.style.transition = "0s";
    pohja.style.userSelect = "none";
  } else if(e.buttons == 2) {
    // let kohde = e.target;
    // let idNumero = +kohde.id.substring(3, Infinity);
    // let korkeus = +pohja.childNodes[idNumero].style.top.substring(0, pohja.childNodes[idNumero].style.top.length - 2);
    // kohde.style.transition = "0s";
    // kohde.style.top = `${korkeus - (+kohde.id.substring(3, Infinity)) * 50}px`;
    // // kohde.style.transition = null;
    // console.log(korkeus);
    // console.log((+kohde.id.substring(3, Infinity)) * 50);
    // console.log(korkeus - (+kohde.id.substring(3, Infinity)) * 50);
    // kohde.id = pohja.childNodes[idNumero].id;
    // kohde.textContent = pohja.childNodes[idNumero].textContent;
    // pohja.childNodes[idNumero].remove();
  }
  // ajastin = setInterval(scrollaa, 10);
}

function paasta() {
  if(kohde) {
    kohde.style.backgroundColor = null;
    kohde.style.zIndex = 0;
    kohde.style.top = `${kohdeSijainti}px`;
    pohja.style.overflow = "auto"
    kohde.style.transition = null;
  }
  kohde = null;
  pohja.style.userSelect = null;
  clearInterval(ajastin);
}

function liikuta(e) {
  if(e.buttons !== 1 || kohde == null) return;
  kohde.style.top = `${e.y - aloitusY}px`;
  let korkeus = +kohde.style.top.substring(0, kohde.style.top.length - 2);
  let idNumero = +kohde.id.substring(3, Infinity);
  if(kohdeSijainti < korkeus - 25 && kohde.id !== `div${solujenMaara - 1}`) {
    let siirra = document.getElementById(`div${idNumero + 1}`);
    siirra.id = `div${idNumero}`;
    siirra.style.top = `${(+siirra.style.top.substring(0, siirra.style.top.length - 2)) - 50}px`;
    kohde.id = `div${idNumero + 1}`;
    kohdeSijainti += 50;
  } else if(kohdeSijainti > korkeus + 25 && kohde.id !== "div0") {
    let siirra = document.getElementById(`div${idNumero - 1}`);
    siirra.id = `div${idNumero}`;
    siirra.style.top = `${(+siirra.style.top.substring(0, siirra.style.top.length - 2)) + 50}px`;
    kohde.id = `div${idNumero - 1}`;
    kohdeSijainti -= 50;
  }
}

function scroll(e) {
  // if(kohde == null) return;
  // if(kohde.id == "div0" || kohde.id == `div${solujenMaara - 1}`) return;
  // if(e.deltaY > 0) {
  //   if(pohja.offsetHeight + pohja.scrollTop + e.deltaY <= pohja.scrollHeight) {
  //     aloitusY -= e.deltaY;
  //     for(let i = 0; i <= Math.abs(e.deltaY); i += 50) paivitaVisual();
  //   } else if(pohja.offsetHeight + pohja.scrollTop < pohja.scrollHeight) {
  //     aloitusY -= pohja.scrollHeight - (pohja.offsetHeight + pohja.scrollTop);
  //     for(let i = 0; i <= Math.abs(e.deltaY); i += 50) paivitaVisual();
  //   }
  // } else if(e.deltaY < 0) {
  //   if(pohja.scrollTop + e.deltaY >= 0) {
  //     aloitusY -= e.deltaY;
  //     for(let i = 0; i <= Math.abs(e.deltaY); i += 50) paivitaVisual();
  //   } else if(pohja.scrollTop > 0) {
  //     aloitusY += pohja.scrollTop;
  //     for(let i = 0; i <= Math.abs(e.deltaY); i += 50) paivitaVisual();
  //   }
  // }
}

let ajastin;
function scrollaa() {
  // if(scrollMaara > 0) {
  //   if(pohja.offsetHeight + pohja.scrollTop + scrollMaara <= pohja.scrollHeight) {
  //     aloitusY -= scrollMaara;
  //     pohja.scrollBy(0, scrollMaara);
  //     paivitaVisual();
  //   } else if(pohja.offsetHeight + pohja.scrollTop < pohja.scrollHeight) {
  //     aloitusY -= pohja.scrollHeight - (pohja.offsetHeight + pohja.scrollTop);
  //     pohja.scrollBy(0, scrollMaara);
  //     paivitaVisual();
  //   }
  // } else if(scrollMaara < 0) {
  //   if(pohja.scrollTop + scrollMaara >= 0) {
  //     aloitusY -= scrollMaara;
  //     pohja.scrollBy(0, scrollMaara);
  //     paivitaVisual();
  //   } else if(pohja.scrollTop > 0) {
  //     aloitusY += pohja.scrollTop;
  //     pohja.scrollBy(0, scrollMaara);
  //     paivitaVisual();
  //   }
  // }
}

function paivitaVisual() { // kopio mouseMove
  // if(kohde.style.top === `${nykyY - aloitusY}px`) return;
  console.log("suorittaa");
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
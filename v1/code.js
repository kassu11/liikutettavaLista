const biisit = document.getElementById("biisit");
const wrap = document.getElementById("wrap");

for (i = 0; i < 100; i++) {
  solu = document.createElement("div");
  biisit.appendChild(solu);
}

biisit.addEventListener("mousedown", paina);

// function paina(e) {
//   console.log(e.target.getBoundingClientRect());
//   y = e.y;
//   kohde = e.target;
//   ogY = e.y;
//   index = Array.from(biisit.childNodes).indexOf(kohde);
//   max = Array.from(biisit.childNodes).length;
//   maxY = max * 50 - 50;
//   indexY = index * 50;


//   kohde.style.backgroundColor = "blue";
//   kohde.style.zIndex = "5";

//   window.onmousemove = liikkuu;
//   window.onmouseup = ylos;

//   function liikkuu(hiiri) {
//     hiiri.preventDefault();
//     y = hiiri.y;
//     paivita();
//   };

//   function paivita() {
//     if (y - ogY + indexY > maxY) {
//       kohde.style.top = `${maxY - indexY}px`;
//     } else if (y - ogY + indexY <= 0) {
//       kohde.style.top = `${indexY * -1}px`;
//     } else {
//       kohde.style.top = `${y - ogY}px`;
//     }
//   };

//   function ylos() {
//     window.onmousemove = null;
//     window.onmouseup = null;
//     kohde.style = null;
//   };
// }

function paina(e) {
  console.log(e.target.getBoundingClientRect());
  let kohde = e.target;
  let kohdeY = e.y;
  let index = Array.from(biisit.childNodes).indexOf(kohde);

  kohde.style.backgroundColor = "blue";
  kohde.style.zIndex = "5";

  window.onmousemove = liikkuu;
  window.onmouseup = ylos;

  function liikkuu(hiiri) {
    hiiri.preventDefault();
    y = hiiri.y;
    paivita();
  };

  function paivita() {
    kohde.style.top = `${y - kohdeY}px`;
    // console.log(kohde.getBoundingClientRect())
    korkeus = kohde.style.top;
    korkeus = +korkeus.substring(0, korkeus.length - 2);
    // console.log(text.substring(0, text.length - 2));
    if(Math.abs(korkeus) >= 25) {
      console.log("VAIHA");
      swap(index, index + Math.floor(korkeus / 25));
      // console.log(Array.from(biisit.childNodes).indexOf(kohde));
    }

    // console.log(kohde);
    // console.log(biisit.childNodes[5]);
  };

  function swap(eka, toka) {
    // let kopio = biisit.childNodes[toka];
    // biisit.childNodes[toka] = biisit.childNodes[eka];
    // biisit.childNodes[eka] = kopio;

    // console.log(eka, toka)
    // if(eka < toka) {
    //   biisit.insertBefore(biisit.childNodes[eka], biisit.childNodes[toka]);
    // }
    // index = Array.from(biisit.childNodes).indexOf(kohde);
    // console.log(eka, toka)

    console.log(Math.floor(korkeus / 25))   
    if(eka < toka) {
      biisit.insertBefore(kohde, biisit.childNodes[toka + 1]);
    } else if(eka > toka) {
      biisit.insertBefore(kohde, biisit.childNodes[toka]);
      // kohdeY -= 50;
      // index -= 1;
    }
    // kohde = biisit.childNodes[toka];

    // console.log(kohdeY)
    kohdeY += 50 * Math.floor(korkeus / 25);
    index += Math.floor(korkeus / 25);
    kohde.style.top = `${y - kohdeY}px`;

  }

  function ylos() {
    window.onmousemove = null;
    window.onmouseup = null;
    kohde.style = null;
  };
}
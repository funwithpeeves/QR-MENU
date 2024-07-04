import { buttonsData, menu } from "./db.js";
import { calculatePrice, elements } from "./helpers.js";

// Olay İzleyicileri
// Sayfa yüklenildiği anda renderMenuItems fonksiyonunu çalıştırır ve menu parametresini gönder, renderButtons
// fonsiyonunu çalıştır ve seçili olarak hepsi kategorisine parametre olarak gönder. 
document.addEventListener("DOMContentLoaded", () => {
  renderButtons("all");
  renderMenuItems(menu);
});

// Butonların bulunduğu alana tıklanıldığında searchCategory fonksiyonunu çalıştırır
elements.buttonArea.addEventListener("click", searchCategory);


// Fonksiyonlar
function searchCategory (e){
    // Tıkladığımız butonun data özelliklerine eriştik ve bir değişkene aktardık.
    const category = e.target.dataset.category;
    // Tüm dizi elemanlarında yalnızca kategori değeri butonun kategori değeri ile eşleşirce bu ürünleri getir.
   const filteredMenu = menu.filter((item) => (item.category) === category);
   if (category==="all") {
    renderMenuItems(menu);
   } else {
    renderMenuItems(filteredMenu);
   }

   renderButtons(category);
}
// Ekrana menü elemanlarını aktaracak fonksiyondur.
function renderMenuItems(menuItems){
  // Gönderilen verileri dönüp her bir veri için a etiketi oluştur.
  let menuHTML =  menuItems.map((item) => (
     `
     <a
          id="card"
          href="/productDetail.html?id=${item.id}&category=${item.category}&price=${item.price}"
          class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2"
        >
          <img class="rounded shadow" src="${item.img}" alt="" />
          <div>
            <div class="d-flex justify-content-between align-items-center">
              <h5>${item.title}</h5>
              <p class="text-success">${calculatePrice(item.price)} ₺</p>
            </div>
            <p class="lead">
              ${item.desc}
            </p>
          </div>
        </a>
    
    `

  )) ;
   menuHTML = menuHTML.join("");
   // Oluşturduğumuz menuHtml değişkenini ekrana aktardık.
    elements.menuArea.innerHTML = menuHTML;
}

function renderButtons(active){
  elements.buttonArea.innerHTML = "";
  // Yeni butonlar oluşturmak için buttonsData içerisindeki verileri dönüp her bir veri için buton oluştururuz.
   buttonsData.forEach((btn) => {
    // Her bir veri için bir HTML buton etiketi oluşturur.
    const buttonEle = document.createElement("button");
    // Oluşturduğumuz butonlara class ekledik.
    buttonEle.className = "btn btn-outline-dark filter-btn";
    
    // Oluşturduğumuz butonun içeriğini değiştirme. 
    buttonEle.textContent = btn.text;
    // Oluşturduğumuz butonun hangi kategori de olduğu bilgisini buton elementine ekledil.
    buttonEle.dataset.category = btn.value;

    // Eğer ki active kategorisiyle buton eşleşirse ona farklı class ekle.
    if(btn.value === active) {
      buttonEle.classList.add("bg-dark", "text-light");
    }

    // HTML'e gönderme
    elements.buttonArea.appendChild(buttonEle);
   })
}
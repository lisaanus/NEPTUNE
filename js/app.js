// ======================================================
// CV. NEPTUNE EKA SARANA
// Global State + Product Module
// ======================================================

// ==========================================
// GLOBAL STATE
// ==========================================

let globalProductData = [];
let globalServiceData = [];

let currentSearch = "";
let currentCategory = "Semua Produk";

// ==========================================
// PRODUCT MODULE
// ==========================================

// Memuat data produk dari server
function loadProductGrid() {

    const container = document.getElementById("product-list-grid");
    const searchInput = document.getElementById("prod-search");

    if (!container) return;

fetch("./data/database.json")
        .then(res => res.json())
        .then(data => {

            globalProductData = data.products || [];

            renderFilteredProducts();

            // Live Search
            if (searchInput) {

                searchInput.value = currentSearch;

                searchInput.oninput = function () {

                    currentSearch = this.value.toLowerCase();

                    renderFilteredProducts();

                };

            }

            initCategoryButtons();

        })
        .catch(err => {

            console.error("Gagal mengambil data produk :", err);

            container.innerHTML = `
                <div class="col-span-full text-center py-10 text-red-500">
                    Gagal memuat data produk.
                </div>
            `;

        });

}

// ==========================================
// FILTER PRODUK
// ==========================================

function renderFilteredProducts() {

    const container = document.getElementById("product-list-grid");

    if (!container) return;

    let filtered = globalProductData.filter(product => {

        const matchSearch =

            product.name.toLowerCase().includes(currentSearch) ||

            product.category.toLowerCase().includes(currentSearch);

        const matchCategory =

            currentCategory === "Semua Produk" ||

            product.category === currentCategory;

        return matchSearch && matchCategory;

    });

    renderProducts(filtered, container);

}

// ==========================================
// BUTTON FILTER KATEGORI
// ==========================================

function initCategoryButtons() {

    const buttons = document.querySelectorAll(".category-btn");

    if (!buttons.length) return;

    buttons.forEach(button => {

        button.onclick = function () {

            buttons.forEach(btn => {

                btn.classList.remove(
                    "bg-blue-600",
                    "text-white",
                    "shadow-sm"
                );

                btn.classList.add(
                    "bg-white",
                    "text-gray-700"
                );

            });

            this.classList.remove(
                "bg-white",
                "text-gray-700"
            );

            this.classList.add(
                "bg-blue-600",
                "text-white",
                "shadow-sm"
            );

            currentCategory = this.dataset.category;

            renderFilteredProducts();

        };

    });

}

// ==========================================
// RENDER PRODUCT CARD
// ==========================================

function renderProducts(products, container) {

    container.innerHTML = "";

    if (products.length === 0) {

        container.innerHTML = `

        <div class="col-span-full py-12 text-center">

            <p class="text-gray-400">

                Produk tidak ditemukan.

            </p>

        </div>

        `;

        return;

    }

    products.forEach(product => {

        const card = document.createElement("div");

        card.className = `
            bg-white
            rounded-2xl
            border
            border-gray-200
            shadow-sm
            hover:shadow-lg
            transition
            overflow-hidden
            flex
            flex-col
        `;

        card.innerHTML = `

            <div class="h-52 bg-gray-50 flex items-center justify-center p-4">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="max-h-full object-contain"
                >

            </div>

            <div class="p-5 flex flex-col flex-grow">

                <span
                    class="
                    inline-block
                    w-fit
                    bg-blue-100
                    text-blue-900
                    text-[10px]
                    font-bold
                    px-2
                    py-1
                    rounded
                    uppercase
                    "
                >

                    ${product.category}

                </span>

                <h3
                    class="
                    mt-3
                    text-sm
                    font-bold
                    text-maritimeBlue
                    line-clamp-2
                    "
                >

                    ${product.name}

                </h3>

                <p
                    class="
                    mt-2
                    text-xs
                    text-gray-500
                    line-clamp-3
                    flex-grow
                    "
                >

                    ${product.description || ""}

                </p>

                <div class="mt-5 space-y-2">

                    <button
                        onclick="viewProductDetail('${product.id}')"
                        class="
                        w-full
                        bg-maritimeBlue
                        hover:bg-oceanBlue
                        text-white
                        py-2
                        rounded-lg
                        text-xs
                        font-semibold
                        transition
                        "
                    >

                        Lihat Detail

                    </button>

                    <button
                        onclick="openQuoteModal('${product.name}')"
                        class="
                        w-full
                        border
                        border-maritimeBlue
                        text-maritimeBlue
                        hover:bg-maritimeBlue
                        hover:text-white
                        py-2
                        rounded-lg
                        text-xs
                        font-semibold
                        transition
                        "
                    >

                        Minta Penawaran

                    </button>

                </div>

            </div>

        `;

        container.appendChild(card);

    });

}
// ======================================================
// SERVICE MODULE
// ======================================================

function loadServiceGrid() {

    const container = document.getElementById("services-list-grid");

    if (!container) return;

fetch("./data/database.json")
        .then(res => res.json())
        .then(data => {

            globalServiceData = data.services || [];

            renderServices(globalServiceData, container);

        })
        .catch(err => {

            console.error(err);

            container.innerHTML = `
            <div class="text-center py-10 text-red-500">
                Gagal memuat data layanan.
            </div>
            `;

        });

}

function renderServices(services, container) {

    container.innerHTML = "";

    if (!services.length) {

        container.innerHTML = `
        <div class="col-span-full text-center py-12">
            Tidak ada layanan.
        </div>
        `;

        return;

    }

    services.forEach(service => {

        const card = document.createElement("div");

        card.className =
            "bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition p-5 flex flex-col";

        card.innerHTML = `

            <h3
            class="font-bold text-maritimeBlue text-lg mb-3">

                ${service.title}

            </h3>

            <p
            class="text-sm text-gray-600 leading-relaxed flex-grow">

                ${service.description}

            </p>

            <button

    onclick="switchPage('detail-layanan')"

    class="
    mt-5
    bg-maritimeBlue
    hover:bg-oceanBlue
    text-white
    rounded-lg
    py-2
    text-sm
    font-semibold
    transition
    "

>

    Lihat Detail Layanan

            </button>

        `;

        container.appendChild(card);

    });

}
function viewServiceDetail(id){

    console.log("ID dari tombol:", id);

fetch("./data/database.json")
    .then(res => res.json())
    .then(data => {

        console.log("Semua services:", data.services);

        const service = data.services.find(
            item => item.id === id
        );

        console.log("Service ditemukan:", service);

        if(!service){
            console.log("Service tidak ditemukan");
            return;
        }

        switchPage("detail-layanan");

    });

}
// ======================================================
// PRODUCT DETAIL
// ======================================================

function viewProductDetail(productId) {

    switchPage("detail-produk");

    setTimeout(() => {

        const product = globalProductData.find(

            p => String(p.id) === String(productId)

        );

        if (!product) return;

        document.getElementById("detail-prod-name").textContent =
            product.name;

        document.getElementById("detail-prod-img").src =
            product.image;

        document.getElementById("detail-prod-img").alt =
            product.name;

        const specContainer =
            document.getElementById("detail-prod-spec");

        specContainer.innerHTML = "";

        if (product.specification) {

            const specs = product.specification.split(".");

            specs.forEach(spec => {

                if (spec.trim() !== "") {

                    const p = document.createElement("p");

                    p.innerHTML = `• ${spec}`;

                    specContainer.appendChild(p);

                }

            });

        }

        updateRecentlyViewed(product);

    },300);

}

// =====================================
// SEND INQUIRY TO WHATSAPP
// =====================================

function sendInquiryToWA(){

    const phone = "6281234567890";

    const name =
        document.querySelector('input[placeholder="Name"]')?.value || "";

    const company =
        document.querySelector('input[placeholder="Company Name"]')?.value || "";

    const service =
        document.querySelector('input[placeholder="Jenis Layanan"]')?.value || "";

    const note =
        document.querySelector("textarea")?.value || "";

    const message = encodeURIComponent(

`Halo CV. Neptune Eka Sarana

Nama : ${name}

Perusahaan : ${company}

Layanan : ${service}

Catatan :

${note}`

    );

    window.open(

`https://wa.me/${phone}?text=${message}`,

"_blank"

    );

}
// =====================================
// CONTACT FORM TO WHATSAPP
// =====================================

function handleContactSubmit(event){

    event.preventDefault();

    const nama = document.getElementById("contact-name")?.value || "";
    const email = document.getElementById("contact-email")?.value || "";
    const phone = document.getElementById("contact-phone")?.value || "";
    const subject = document.getElementById("contact-subject")?.value || "";
    const message = document.getElementById("contact-message")?.value || "";


    const text = 
`Halo CV. Neptune Eka Sarana,

Saya ingin menghubungi tim Anda.

Nama / Perusahaan :
${nama}

Email :
${email}

WhatsApp :
${phone}

Perihal :
${subject}

Pesan :
${message}`;


    window.open(
        "https://wa.me/6281344283147?text=" + encodeURIComponent(text),
        "_blank"
    );

}
// =====================================
// Related Products
// =====================================

function loadRelatedProducts() {

    const container = document.getElementById("related-products");

    if (!container) return;

    container.innerHTML = "";

    globalProductData
        .slice(0,4)
        .forEach(prod=>{

            container.innerHTML += `

            <div
            onclick="viewProductDetail(${prod.id})"
            class="cursor-pointer
            border
            rounded-lg
            p-3
            hover:bg-blue-50
            transition">

                <div class="flex gap-3">

                    <img
                    src="${prod.image}"
                    class="w-16
                    h-16
                    object-contain">

                    <div>

                        <h4 class="font-semibold text-sm">

                            ${prod.name}

                        </h4>

                        <p class="text-xs text-gray-500">

                            ${prod.category}

                        </p>

                    </div>

                </div>

            </div>

            `;

        });

}

// ======================================================
// RECENTLY VIEWED
// ======================================================

let recentlyViewed = [];

function updateRecentlyViewed(product){

    if(!product) return;

    recentlyViewed = recentlyViewed.filter(

        item => item.id !== product.id

    );

    recentlyViewed.unshift(product);

    if(recentlyViewed.length > 5){

        recentlyViewed.pop();

    }

    const list = document.getElementById(

        "recently-viewed-list"

    );

    if(!list) return;

    list.innerHTML = "";

    recentlyViewed.forEach(item=>{

        const li=document.createElement("li");

        li.className=

        "cursor-pointer hover:text-blue-600";

        li.innerHTML=`▪ ${item.name}`;

        li.onclick=()=>{

            viewProductDetail(item.id);

        };

        list.appendChild(li);

    });

}

// ======================================================
// SERVICE REQUEST
// ======================================================

function requestServiceDirectly(serviceName){

    switchPage("form-inquiry");

    setTimeout(()=>{

        const input=document.querySelector(

            'input[placeholder="Jenis Layanan"]'

        );

        if(input){

            input.value=serviceName;

        }

    },300);

}

// ==========================================
// QUOTE MODAL
// ==========================================

function openQuoteModal(productName) {

    const modal = document.getElementById("quoteModal");

    if (!modal) return;

    document.getElementById("modalProductName").textContent = productName;

    const phone = "6281234567890";

    const message = encodeURIComponent(
        `Halo CV. Neptune Eka Sarana, saya ingin meminta penawaran harga untuk produk:\n\n${productName}`
    );

    document.getElementById("whatsappBtn").href =
        `https://wa.me/${phone}?text=${message}`;

    modal.classList.remove("hidden");
    modal.classList.add("opacity-100");

}

function closeQuoteModal(){

    const modal = document.getElementById("quoteModal");

    if(!modal) return;

    modal.classList.remove("opacity-100");

    modal.classList.add("hidden");

}
// ======================================================
// PRODUCT REQUEST
// ======================================================

function openInquiryForm(){

    const productName=

        document.getElementById(

            "detail-prod-name"

        ).textContent;

    switchPage("form-inquiry");

    setTimeout(()=>{

        const jenis=document.querySelector(

            'input[placeholder="Jenis Layanan"]'

        );

        const textarea=

            document.querySelector("textarea");

        if(jenis){

            jenis.value="Pembelian Produk";

        }

        if(textarea){

            textarea.value=

            `Saya membutuhkan penawaran harga untuk produk ${productName}.`;

        }

    },300);

}

// 
function initFaqPage() {

    const faqButtons = document.querySelectorAll(".faq-btn");

    faqButtons.forEach(button => {

        button.onclick = function () {

            const answer = this.nextElementSibling;
            const icon = this.querySelector(".faq-icon");

            const isOpen = answer.style.maxHeight &&
                           answer.style.maxHeight !== "0px";

            // tutup semua
            document.querySelectorAll(".faq-answer").forEach(item => {
                item.style.maxHeight = "0px";
            });

            document.querySelectorAll(".faq-icon").forEach(item => {
                item.style.transform = "rotate(0deg)";
            });

            // buka jika sebelumnya tertutup
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.style.transform = "rotate(180deg)";
            }

        };

    });
}

// ==========================================
// DIRECT WHATSAPP
// ==========================================

function redirectToWhatsApp(){

    const productName =
        document.getElementById("detail-prod-name").textContent;

    const phone="6281234567890";

    const text = encodeURIComponent(

`Halo CV. Neptune Eka Sarana,

Saya tertarik dengan produk:

${productName}

Mohon informasi harga dan stoknya.

Terima kasih.`

    );

    window.open(

        `https://wa.me/${phone}?text=${text}`,

        "_blank"

    );

}
function initProductPage(){

    loadProductGrid();

}
function initDetailProductPage(){

    loadRelatedProducts();

}

function toggleSubmenu(){

    const submenu=document.getElementById("submenuCompany");
    const arrow=document.getElementById("submenuArrow");

    if(!submenu || !arrow) return;

    submenu.classList.toggle("hidden");

    if(submenu.classList.contains("hidden")){
        arrow.innerHTML="+";
    }else{
        arrow.innerHTML="−";
    }

}
// ===============================
// CARD REVEAL ANIMATION
// ===============================

document.addEventListener("DOMContentLoaded",()=>{

    const cards=document.querySelectorAll(".reveal-card");

    if(!cards.length) return;


    const observer=new IntersectionObserver((entries)=>{

        entries.forEach((entry,index)=>{

            if(entry.isIntersecting){

                setTimeout(()=>{

                    entry.target.classList.add("active");

                },index*150);


                observer.unobserve(entry.target);

            }

        });


    },{
        threshold:0.15,
        rootMargin:"0px 0px -40px 0px"
    });


    cards.forEach(card=>{

        observer.observe(card);

    });

});

function updateActiveNavbar(page){

    const links=document.querySelectorAll("#navbar-menu button");

    links.forEach(link=>{

        if(link.dataset.page===page){

            link.classList.remove("text-white");

            link.classList.add("text-cyan-300");

        }

        else{

            link.classList.remove("text-cyan-300");

            link.classList.add("text-white");

        }

    });

}

// ===============================
// SIDEBAR
// ===============================

function toggleSidebar(open){

    const sidebar=document.getElementById("sidebarMenu");
    const overlay=document.getElementById("sidebarOverlay");


    if(!sidebar || !overlay) return;


    if(open){

        overlay.classList.remove("hidden");


        setTimeout(()=>{

            overlay.classList.remove("opacity-0");

            sidebar.classList.remove("translate-x-full");


        },10);


    }else{


        overlay.classList.add("opacity-0");

        sidebar.classList.add("translate-x-full");


        setTimeout(()=>{

            overlay.classList.add("hidden");

        },300);

    }

}

function handleMobileNav(page){

    toggleSidebar(false);


    setTimeout(()=>{

        switchPage(page);

    },300);

}

function switchPage(pageName){

    const frame=document.getElementById("content-frame");

    if(!frame) return;


    frame.style.opacity=0;


    setTimeout(()=>{

        fetch(`views/${pageName}.html`)

        .then(res=>res.text())

        .then(html=>{

            frame.innerHTML=html;

            frame.style.opacity=1;
window.scrollTo(0, 0);


            updateActiveNavbar(pageName);
            if (pageName === "beranda") {
    initCTA();
}

            if(pageName==="produk"){
                loadProductGrid();
            }


            if(pageName==="layanan"){
                loadServiceGrid();
            }


            if(pageName==="faq"){
                initFaqPage();
            }

        });


    },200);

}

// ===============================
// NAVBAR SCROLL EFFECT
// ===============================

window.addEventListener("scroll", () => {

    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    if (window.scrollY > 80) {

        navbar.classList.add(
            "scrolled",
            "bg-[#081631]",
            "backdrop-blur-xl",
            "shadow-2xl"
        );

    } else {

        navbar.classList.remove(
            "scrolled",
            "bg-[#081631]",
            "backdrop-blur-xl",
            "shadow-2xl"
        );

    }

});
let ctaInitialized = false;

function initCTA(){

    console.log("initCTA dipanggil");

    const popup = document.getElementById("ctaPopup");

    console.log(popup);

    if(!popup){
        console.log("Popup tidak ditemukan");
        return;
    }

    console.log("Popup ditemukan");

    window.addEventListener("scroll",()=>{

        console.log(window.scrollY);

        if(window.scrollY>600){

            popup.classList.remove("-translate-y-full");
            popup.classList.add("translate-y-0");

        }else{

            popup.classList.remove("translate-y-0");
            popup.classList.add("-translate-y-full");

        }

    });

}
window.switchPage=switchPage;

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if(!navbar) return;

    if (window.scrollY > 50) {

        navbar.classList.remove("bg-transparent");

        navbar.classList.add(
            "bg-blue-950/75",
            "backdrop-blur-lg",
            "shadow-xl"
        );

    } else {

        navbar.classList.remove(
            "bg-blue-950/75",
            "backdrop-blur-lg",
            "shadow-xl"
        );

        navbar.classList.add("bg-transparent");

    }

});

function viewNewsDetail(id) {

    fetch("./data/database.json")
        .then(res => res.json())
        .then(data => {

            const news = data.news.find(item => item.id === id);

            if (!news) return;

            switchPage("detail-berita");

            setTimeout(() => {

                document.getElementById("detail-news-image").src = news.image;
                document.getElementById("detail-news-title").textContent = news.title;
                document.getElementById("detail-news-date").textContent = news.date;
                document.getElementById("sidebar-date").textContent = news.date;
                document.getElementById("detail-news-summary").textContent = news.summary;

                document.getElementById("detail-news-content").innerHTML = `
                    <p>${news.content1}</p>

                    <h2 class="text-3xl font-bold text-blue-950 mt-8 mb-4">
                        Proses Pelaksanaan
                    </h2>

                    <p>${news.content2}</p>

                    <h2 class="text-3xl font-bold text-blue-950 mt-8 mb-4">
                        Komitmen CV. Neptune Eka Sarana
                    </h2>

                    <p>${news.content3}</p>

                    <div class="bg-blue-50 border-l-4 border-cyan-500 p-6 rounded mt-8">

                        <strong class="text-blue-950">
                            Kesimpulan
                        </strong>

                        <p class="mt-3">
                            ${news.conclusion}
                        </p>

                    </div>
                `;

            }, 300);

        })
        .catch(err => console.error(err));

}

// ===============================
// GLOBAL EXPORT
// ===============================

window.loadProductGrid = loadProductGrid;

window.loadServiceGrid = loadServiceGrid;

window.initProductPage = initProductPage;

window.initDetailProductPage = initDetailProductPage;

window.viewProductDetail = viewProductDetail;

window.loadRelatedProducts = loadRelatedProducts;

window.openQuoteModal = openQuoteModal;

window.closeQuoteModal = closeQuoteModal;

window.redirectToWhatsApp = redirectToWhatsApp;

window.openInquiryForm = openInquiryForm;

window.requestServiceDirectly = requestServiceDirectly;

window.sendInquiryToWA = sendInquiryToWA;

window.handleContactSubmit = handleContactSubmit;

window.initFaqPage = initFaqPage;

window.toggleSidebar = toggleSidebar;

window.handleMobileNav = handleMobileNav;

window.toggleSubmenu = toggleSubmenu;

window.viewServiceDetail = viewServiceDetail;

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

const url = "http://localhost:3000/";
let designerData = [];
//banner
const recommendRender = document.querySelector('.recommendRender')
const starStr = ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
class="bi bi-star-fill" viewBox="0 0 16 16">
<path
    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>`;

function getDesigner() {
    axios.get(`${url}designers?_expand=user`)
        .then(function (res) {
            designerData = res.data;
            renderRecommend();
        })
        .catch(function (err) { console.log(err) })

}
getDesigner()
//2022
const popularityRender = document.querySelector('.popularityRender');
let portfolioData;
function getPortfolios() {
    axios.get(`${url}portfolios?_expand=designer`)
        .then(function (res) {
            portfolioData = res.data;
            renderPortfolio();
        })
        .catch(function (err) { console.log(err) })
}
getPortfolios();
function renderPortfolio() {
    str = '';
    for (let i = 0; i < 8; i++) {
        let designerName = designerData.find(x => portfolioData[i].designerId === x.id).user.name;
        let designerArea = designerData.find(x => portfolioData[i].designerId === x.id).user.area;
        let tag = '';
        portfolioData[i].classification.forEach(e => {
            tag += `<a href="#">${e}</a>`;
        })
        str += ` <li class="col">
        <div class="popularityImg">
            <img src="${portfolioData[i].img}"
                class="rounded" alt="...">
            <div class="title">
                <div>${tag}</div>
                <p class="fw-bold">${portfolioData[i].text}</p>
                <p> by <span> ${designerName}/ ${designerArea}</span></p>
            </div>
        </div>
    </li>`
    }
    popularityRender.innerHTML = str;
}

//推薦
function renderRecommend() {
    let str = '';
    for (let i = 0; i < 4; i++) {
        let portfolio;
        axios.get(`${url}portfolios?designerId=${i + 1}&_expand=designer&_limit=1`)
            .then(function (res) {
                portfolio = res.data;
                let star = '';
                for (let e = 0; e < designerData[i].star; e++) {
                    star += starStr;
                }
                str += `  <li class="col  data-id="${designerData[i].id}">
            <div class="card ">
                <div class="card-img-top">
                    <img src="${portfolio[0].img}"
                        alt="...">
                </div>
                <div class="card-body">
                    <div class="designerImg">
                        <img src="${designerData[i].user.img}"
                            alt="">
                    </div>
                    <div class="card-text">
                        <div class="star">
                         ${star}
                        </div>
                        <a href="designer.html?id=${designerData[i].id}">${designerData[i].user.name}</a>
                        <p>${designerData[i].user.area}</p>
                    </div>
                </div>
            </div>
        </li>`
            })
            .catch(err => console.log(err))
    }
    setTimeout(() => recommendRender.innerHTML = str, 1000)
}
// recommendRender.addEventListener('click', function (e) {
//     if (e.target.nodeName === "UL") {
//         return
//     }
//     let id = e.target.closest("li").dataset.id;
//     console.log(id)
//     //document.location.href = `http://127.0.0.1:5500/designer.html?id=${id}`;

// })



//swiper
const swiperRender = document.querySelector('#render');
let commentData;
function getComment() {
    axios.get(`${url}comments?_expand=user&_expand=designer&_limit=9`)
        .then(function (res) {
            commentData = res.data;
            readerSwiper();
        })
        .catch(function (err) { console.log(err) })
}
function readerSwiper() {
    let str = '';
    commentData.forEach(i => {
        let designerName = designerData.find(x => i.designerId === x.id).user.name;
        let designerArea = designerData.find(x => i.designerId === x.id).user.area;
        let designerImg = designerData.find(x => i.designerId === x.id).user.img;
        let star = '';
        for (let e = 0; e < i.star; e++) {
            star += starStr;
        }
        str += `  <div class="swiper-slide">
<div class="commentCard">
    <div class="card-body mb-3">
        <div class="designerImg">
            <img src="${designerImg}"alt="">
        </div>
        <div class="card-text">
            <a href="designer.html?id=${i.designerId}"> ${designerName}</a>
            <p>${designerArea}</p>
            <div class="star">
              ${star}
            </div>
        </div>
    </div>
    <div>
        <div class="commentImg">
            <img src="${i.commentary.img}"
                alt="...">
        </div>
        <div class="user">
            <div class="userImg">
                <img src="${i.user.img}"
                    alt="">
            </div>
            <p class="userName">${i.user.name}</p>
        </div>
        <p class="userText">${i.commentary.text}</p>
    </div>
</div>
</div>`
    })
    swiperRender.innerHTML = str;
}
getComment()


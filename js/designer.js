const url = "http://localhost:3000/";
let params = (new URL(document.location)).searchParams;
let id = parseInt(params.get('id'));
const designerRender = document.querySelector('.designerRender');
const starStr = ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
class="bi bi-star-fill" viewBox="0 0 16 16">
<path
    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>`;
let designerData;

function getDesigner() {
    axios.get(`${url}designers/${id}?_expand=user`)
        .then(function (res) {
            designerData = res.data;
            render();
        })
        .catch(function (err) { console.log(err) })
}
getDesigner();

function render() {
    let star = '';
    for (let i = 0; i < designerData.star; i++) {
        star += starStr;
    }
    let str = ` <div class="titleImg">
<img src="${designerData.user.img}"
    alt="...">
</div>
<div>
<div class="d-flex align-items-center">
    <h3 class="me-5">${designerData.user.name}</h3>
    <div class="star">
      ${star}
    </div>
</div>
<p>${designerData.user.area}</p>
<p>${designerData.text}</p>
</div>`;
    designerRender.innerHTML = str;
}

let portfolioData;
const portfolioRender = document.querySelector('.portfolioRender');
function getPortfolios() {
    axios.get(`${url}portfolios?designerId=${id}&_expand=designer`)
        .then(function (res) {
            portfolioData = res.data;
            readerPortfolios();
        })
        .catch(function (err) { console.log(err) })
}
function readerPortfolios() {
    let str = '';
    portfolioData.forEach(i => {
        let tag = '';
        i.classification.forEach(e => {
            tag += `<a href="#">${e}</a>`;
        })
        str += `<li class="col">
        <div class="styleImg">
            <img src="${i.img}"
                class=" rounded" alt="...">
            <div class="title">
                <div>${tag}</div>
                <p class="fw-bold">${i.text}</p>
                <p> by <span> ${designerData.user.name}/${designerData.user.area}</span></p>
            </div>
        </div>
    </li>`
    });
    portfolioRender.innerHTML = str;
}
getPortfolios();
let commentData;
const commentRender = document.querySelector('.commentRender');
function getComment() {
    axios.get(`${url}comments?designerId=${id}&_expand=user`)
        .then(function (res) {
            commentData = res.data;
            readerComment()
        })
        .catch(function (err) { console.log(err) })
}
function readerComment() {
    let str = '';
    commentData.forEach(i => {
        let star = '';
        for (let e = 0; e < i.star; e++) {
            star += starStr;
        }
        str += `<div class="col">
    <div class="d-comment">
        <div class="commentImg">
            <img src="${i.commentary.img}"
                alt="...">
        </div>
        <div>
            <div class="userImg mb-3">
                <img src="${i.user.img}"
                    alt="">
            </div>
            <p>${i.user.name}/<span>${i.user.area}</span></p>

        </div>
        <div>
            <div class="star ">
            ${star}
            </div>
            <textarea name="" id="" disabled>${i.commentary.text}</textarea>
        </div>
    </div>
</div>`
    })
    commentRender.innerHTML = str;
}
getComment()
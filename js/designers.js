const url = "http://localhost:3000/";
const starStr = ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
class="bi bi-star-fill" viewBox="0 0 16 16">
<path
    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>`;
let designerData = [];
function getDesigner() {
    axios.get(`${url}designers?_expand=user`)
        .then(function (res) {
            designerData = res.data;
            renderData(designerData);
        })
        .catch(function (err) { console.log(err) })
}
getDesigner();


const select = document.querySelector('select')
select.addEventListener('change', function (e) {
    let word = e.target.value;
    let data = designerData.filter(function (i) { return i.user.area == word });
    renderData(data);
})
const render = document.querySelector('.render');

function renderData(data) {
    let str = '';
    data.forEach(function (i) {
        let star = '';
        for (let e = 0; e < i.star; e++) {
            star += starStr;
        }
        str += `<li class="col" data-id="${i.id}">
    <div class="styleImg">
        <img src="${i.user.img}"
            class=" rounded" alt="...">
        <div class="title">
            <div>${star}</div>
            <p class="fw-bold">${i.user.name}/${i.user.area}</p>
        </div>
    </div>
</li>`
    })
    render.innerHTML = str;
}
render.addEventListener('click', function (e) {
    if (e.target.nodeName === "UL") {
        return
    }
    let id = e.target.closest("li").dataset.id;
    document.location.href = `http://127.0.0.1:5500/designer.html?id=${id}`;
})
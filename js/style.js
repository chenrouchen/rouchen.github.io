const url = "http://localhost:3000/";
let data = [];
let word = "全部";
let designerData = [];
function getDesigner() {
    axios.get(`${url}designers?_expand=user`)
        .then(function (res) {
            designerData = res.data;
        })
        .catch(function (err) { console.log(err) })
}
getDesigner();


//分類
const menu = document.querySelector('.menu');
menu.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') {
        return
    }
    word = e.target.textContent;
    getData(word);
})
getData(word);
function getData(word) {
    if (word == "全部") {
        axios.get(`${url}portfolios`)
            .then(function (res) {
                data = res.data;
                renderData();
            })
            .catch(function (err) { console.log(err) })
    } else {
        axios.get(`${url}portfolios?q=${word}`)
            .then(function (res) {
                data = res.data;
                renderData();
            })
            .catch(function (err) { console.log(err) })
    }

}
const render = document.querySelector('.render');
function renderData() {
    let str = '';
    data.forEach(i => {
        let designerName = designerData.find(x => i.designerId === x.id).user.name;
        let designerArea = designerData.find(x => i.designerId === x.id).user.area;
        let tag = '';
        i.classification.forEach(e => {
            tag += `<a href="#">${e}</a>`;
        })
        str += ` <li class="col">
        <div class="styleImg">
            <img src="${i.img}"
                class=" rounded" alt="...">
            <div class="title">
                <div>${tag}</div>
                <p class="fw-bold">${i.text}</p>
                <p> by <span>${designerName}/${designerArea}</span></p>
            </div>
        </div>
    </li>`
    });
    render.innerHTML = str;
}
const bannerDesigner = document.querySelector('.bannerDesigner');
let designersData;
function getDesigners() {
    axios.get(`${url}designers?_expand=user`)
        .then(function (res) {
            designersData = res.data;
            renderBanner();
        })
        .catch(function (err) { console.log(err) })

}
function renderBanner() {
    let str = '';
    for (let i = 1; i < 3; i++) {
        str += ` <a href="designer.html?id=${designersData[i].id}" class="bannerImg">
        <img src="${designersData[i].user.img}"
            alt="" class="img-fluid rounded">
        <div class="top rounded-end">Top ${i}</div>
        <p class="designerName">${designersData[i].user.name}</p>
    </a>`
    }
    bannerDesigner.innerHTML = str;
}
getDesigners();

const search = document.querySelector('#search');
search.addEventListener('keyup', function (e) {
    if (e.code === 'Enter') {
        let word = search.value;
    }
})

function searchStyle(word) {
    axios.get(`${url}portfolios?_expand=designer&q=${word}`)
        .then(function (res) {

        })
}
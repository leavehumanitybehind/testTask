import './scss/main.scss';

const catalog = document.querySelector('.catalog');
const inputFilter = document.querySelector('.filter__input');
const imgArr = ["Image.png", "Imagehandler.png", "Bitmap.png"]
const randomArrayItem = (items) => {
    return items[Math.floor(Math.random() * items.length)];
}

const createCard = (data) => {
    let { id, title, address, type, price } = data;
    let card = `
    <div  class="house__card">
    <a class="house__img" href="/details/${id}">
    <img  src="./image/${randomArrayItem(imgArr)}" alt="${title}"/>
        <p class="house__desc-type ${type == "IndependentLiving" ? 'house__desc-type--green' : ''}">${type}</p>
    </a>
    <div class="house__desc">
        <h3 class="house__desc-title">${title}</h3>
        <p class="house__desc-address">${address}</p> 
        <p class="house__desc-cost"> New Properties for Sale from  <strong class="house__desc-price"> &#163;${price}</strong></p>
        <p class="house__desc-ability">Shared Ownership Available</p>
    </div>
</div>
    `;

    catalog.insertAdjacentHTML('beforeend', card);

}
const URL = 'https://603e38c548171b0017b2ecf7.mockapi.io/homes';
const getData = async function (url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
    }
    return await response.json();
};

const init = () => {
    getData(URL).then(function (data) {
        data.forEach((el) => {
            createCard(el);
        })

    })
}


inputFilter.oninput = function () {
    let val = this.value.trim();
    const cards = document.querySelectorAll('.house__card')

    if (val !== '') {
        cards.forEach(function (el) {
            const title = el.querySelector(".house__desc-title")
            if (title.innerText.search(val) == -1) {
                el.classList.add('hide')
            } else {
                el.classList.remove('hide')
            }
        })
    }
    else {
        cards.forEach(function (el) {
            el.classList.remove('hide')
        });
    }
}

init();

let products = [];
let eles = document.getElementsByClassName('lvresult');

function getAvalibleSlides(){
    return new Promise((resolve, reject) => {
        try{
            for(let i = 1; i < eles.length; i++){
                //Todo Price Property
                //Todo LinkToEbay property
                let el = eles[i];
                let rawTitle = el.querySelector('.vip').innerText;
                let title = cleanTitle(rawTitle);
                let imageSRC = el.querySelector('.img .img .img').getAttribute('src');
                let price = el.querySelector('.lvprice.prc .bold').innerText;
                let link = el.querySelector('.img .img').getAttribute('href');
            
                let product = {
                    title: title,
                    imageSRC: imageSRC,
                    price: price,
                    link: link
                };
            
                products.push(product);
            }
            resolve(products);
        }
        catch{
            reject(products);
        }
    });
}

function cleanTitle(rawTitle){
    let titleAry = rawTitle.split('NEW LISTING ');
    if (titleAry.length <= 1){
        return rawTitle;
    }
    return titleAry[1];
}

getAvalibleSlides()
.then(products => {
    console.log(products);
    sendData(products)
})
.catch(products => {
    console.log(products);
    sendData(products)
});

function sendData(products){
    fetch('https://kaa2vzwsph.execute-api.us-west-2.amazonaws.com/ecommerceconnect', {
        method: 'post',
        body: JSON.stringify(products),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        return response.json();
    })
    .then(async msg => {
        console.log('In success branch');
        console.log(msg);
    })
    .catch(err => {
        console.log(err);
    })
}
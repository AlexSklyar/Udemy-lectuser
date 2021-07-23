class Product {
    // title = 'DEFAULT';
    // imgURL;
    // description;
    // price;
    constructor(title, img, description, price) {
        this.title = title;
        this.imgURL = img;
        this.description = description;
        this.price = price;
    }
}

const productList = {
    products: [
        new Product('A Pillow',
            'https://m.media-amazon.com/images/I/61E-XopDpeL._AC_SL1500_.jpg',
            'A soft pillow!',
            999.99),
        new Product('A Carpet',
            'https://cdn20.pamono.com/p/s/7/4/743551_6kirzxax9f/mid-century-middle-eastern-hand-knotted-wool-carpet.jpg',
            'A carpet wich u might like or not...',
            899.99)
    ],

    render() {
        const renderHook = document.getElementById('app');
        const prodList = document.createElement('ul');
        prodList.className= 'product-list';
        for(const prod of this.products){
        const prodEl = document.createElement('li');
            prodEl.className ='product-item';
            prodEl.innerHTML = `
            <div>
            <img src="${prod.imgURL}" alt="${prod.title}">
            <div class="product-item__content">
            <h2>${prod.title}</h2>
            <h3>\$${prod.price}</h3>
            <p>${prod.description}</p>
            <button>Add to Cart</button>
            
            </div>
            </div>
            `;
            prodList.append(prodEl);
        }
        renderHook.append(prodList)
    }
};

productList.render()
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

const minusButton = document.querySelectorAll('.minus');
const plusButton = document.querySelectorAll('.plus');
const countSpan = document.querySelectorAll('.count');
    
for (let i = 0; i < minusButton.length; i++) {
    minusButton[i].addEventListener('click', () => {
        minusClicked(i);
    });
}

for (let i = 0; i < plusButton.length; i++) {
    plusButton[i].addEventListener('click', () => {
        plusClicked(i);
    });
}
    
function minusClicked(index) {
    var countElement = countSpan[index];
    var count = parseInt(countElement.textContent);
    if (count > 0) {
        count--;
        countElement.textContent = count;
    }
}

function plusClicked(index) {
    var countElement = countSpan[index];
    var count = parseInt(countElement.textContent);
    count++;
    countElement.textContent = count;
}


function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

    var plusButtons = document.getElementsByClassName('plus');
    for (var i = 0; i < plusButtons.length; i++) {
        var plusButton = plusButtons[i];
        plusButton.addEventListener('click', plusClicked);
    }

    var minusButtons = document.getElementsByClassName('minus');
    for (var i = 0; i < minusButtons.length; i++) {
        var minusButton = minusButtons[i];
        minusButton.addEventListener('click', minusClicked);
    }
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    var count = parseInt(shopItem.querySelector('.count').textContent);

    if (count > 0){
        addItemToCart(title, price, imageSrc, count)

        // Reset nilai pada tombol plus dan minus menjadi 0
        shopItem.querySelector('.count').textContent = 0;
    
        updateCartTotal()
    }
}

function addItemToCart(title, price, imageSrc, count) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');

    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <span class="cart-quantity-value">${count}</span>
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
}


function updateCartTotal() {
    var cartItemContainer = document.querySelector('.cart-items');
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.querySelector('.cart-price');
        var quantityElement = cartRow.querySelector('.cart-quantity-value');
        var priceText = priceElement.innerText.replace('Rp. ', ''); // Hapus "Rp. "
        var price = parseFloat(priceText.replace('.', '').replace(',', '.')); // Ganti titik dengan tanda desimal "." dan koma dengan titik
        var quantity = parseInt(quantityElement.textContent); // Ambil kuantitas item

        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;

    // Update tampilan total harga
    document.querySelector('.cart-total-price').innerText = 'Rp. ' + formatNumberWithCommas(total);

    // Hitung pajak (11% dari total)
    var tax = Math.round(total * 0.11);

    document.querySelector('.cart-total-tax').innerText = 'Rp. ' + formatNumberWithCommas(tax);

    // Total harga termasuk pajak
    var totalIncludingTax = total + tax;

    totalIncludingTax = Math.round(totalIncludingTax * 100) / 100;
    
    // Update tampilan total harga dan pajak
    document.querySelector('.cart-total-pricetax').innerText = 'Rp. ' + formatNumberWithCommas(totalIncludingTax);
}

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

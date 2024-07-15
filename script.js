// script.js

const products = [
    { id: 1, name: "Product 1", price: 300, img: "casual2.jpg" },
    { id: 2, name: "Product 2", price: 150, img: "casual3.jpg" },
    { id: 3, name: "Product 3", price: 500, img: "casual2.jpg" },
    { id: 4, name: "Product 4", price: 100, img: "casual2.jpg" },
    { id: 5, name: "Product 5", price: 250, img: "casual3.jpg" },
    { id: 5, name: "Product 5", price: 250, img: "casual3.jpg" },
];

const milestones = {
    10: 5,
    20: 10,
    50: 20
};

function getUserData() {
    let userData = localStorage.getItem('userData');
    if (!userData) {
        userData = { coupons: 0, discounts: [] };
        localStorage.setItem('userData', JSON.stringify(userData));
    } else {
        userData = JSON.parse(userData);
    }
    return userData;
}

function setUserData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
}

function updateDashboard() {
    const userData = getUserData();
    document.getElementById('coupon-count').innerText = userData.coupons;
    const discountsList = document.getElementById('discounts-list');
    discountsList.innerHTML = '';
    userData.discounts.forEach(discount => {
        const li = document.createElement('li');
        li.innerText = `${discount}% off`;
        discountsList.appendChild(li);
    });
}

function renderProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="makePurchase(${product.price})">Buy Now</button>
        `;
        productList.appendChild(productDiv);
    });
}

function makePurchase(price) {
    const userData = getUserData();
    const couponsEarned = calculateCoupons(price);
    userData.coupons += couponsEarned;

    checkMilestones(userData);
    setUserData(userData);
    updateDashboard();
}

function calculateCoupons(amount) {
    return Math.floor(amount / 100);
}

function checkMilestones(userData) {
    for (const milestone in milestones) {
        if (userData.coupons >= milestone && !userData.discounts.includes(milestones[milestone])) {
            userData.discounts.push(milestones[milestone]);
            alert(`Congratulations! You've earned a ${milestones[milestone]}% discount!`);
        }
    }
}

// Initialize the dashboard and products
document.addEventListener('DOMContentLoaded', () => {
    updateDashboard();
    renderProducts();
});

/* This file should contain any DOM manipulation
needed to populate the header, nav, and footer elements
*/
document.addEventListener("DOMContentLoaded", function() {
    const header = document.createElement("header");
    header.innerHTML = '<img class="headerImg" src="/images/fuji.jpg" alt="Fuji" width="1600">' + '<span class="HeadTitle">Come To Kyoto!</span>';

    const nav = document.createElement("nav");
    nav.innerHTML = `
        <a href="/">Home</a>
        <a href="/attractions">Attractions</a>
        <a href="/restaurants">Restaurants</a>
        <a href="/new-restaurant-form">New Restaurant</a>
    `;

    const footer = document.createElement("footer");
    footer.innerHTML = `
        <p>&copy; 2024 Kyoto Travel Guide</p>
    `;
    document.body.insertAdjacentElement("afterbegin", header);
    header.insertAdjacentElement("afterend", nav);
    document.body.insertAdjacentElement("beforeend", footer);
});
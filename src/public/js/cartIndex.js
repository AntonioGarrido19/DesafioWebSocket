const socketClient = io();

//carts
const cartsContainer = document.getElementById("carts_container");

socketClient.emit("getCarts");

socketClient.on("carts", (carts) => {
  const allCarts = carts
    .map((objCarts) => {
      const productsInfo = objCarts.products
        .map((product) => {
          return `
            <li>
              Title: ${product.title}
              Description: ${product.description}
              Price: ${product.price}
            </li>
            <button id='cart_delete_product'>Delete Product</button>
          `;
        })
        .join(" ");
      return `
        <div>
          <p>
          Title: ${objCarts.title}
          Id: ${objCarts._id}
          </p>
          <button>Delete Cart</button>
          <ul>
          ${productsInfo}
        </ul>
        </div>
          `;
    })
    .join(" ");
  cartsContainer.innerHTML = allCarts;
});
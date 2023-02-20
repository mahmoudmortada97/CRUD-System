const ProductListNameinLocalStorage = "Products";
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productCategory = document.getElementById("product-cat");
const productDescription = document.getElementById("product-desc");
const tBody = document.getElementById("product-data");
const updateProductBtn = document.querySelector("#updateProductBtn");
const addProductBtn = document.querySelector("#addProductBtn");
const searchProducts = document.querySelector("#search");
let productToBeUpdated = null;

let productList = getProductsFromLocalStorage();
displayProduct(productList);

// Create New Product and push it to the ProductList
addProductBtn.addEventListener("click", addProduct);
function addProduct() {
  if (
    productNameValidation() &&
    productPriceValidation() &&
    productCatValidation() &&
    productDescValidation()
  ) {
    var product = {
      id: new Date().valueOf(),
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescription.value,
    };
    productList.push(product);
    displayProduct(productList);
    setProductsinLocalStorage(productList);
    updateProductsInputsWithNewValues();
  }
}

function displayProduct(productList) {
  var cartona = ``;
  for (var i = 0; i < productList.length; i++) {
    cartona += ` <tr data-id =${productList[i].id}>
    <td>${i + 1}</td>
    <td>${
      productList[i].newName ? productList[i].newName : productList[i].name
    }</td>
    <td>${productList[i].price}</td>
    <td>${productList[i].category}</td>
    <td>${productList[i].description}</td>
    <td>
      <button class="btn btn-success btn-sm" ">
        Edit
      </button>
    </td>
    <td>
      <button class="btn btn-danger btn-sm" ">
        Delete
      </button>
    </td>
  </tr>`;
  }
  tBody.innerHTML = cartona;
}

tBody.addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    let targtedProduct = null;
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].id == e.target.closest("[data-id]").dataset.id) {
        targtedProduct = productList[i];
      }
    }
    if (e.target.innerText == "Delete") {
      deleteProduct(targtedProduct);
    } else if (e.target.innerText == "Edit") {
      setProductToBeDeleted(targtedProduct);
    }
  }
});
function deleteProduct(targtedForDeleteProduct) {
  let productsNotDeletedList = [];
  for (let i = 0; i < productList.length; i++) {
    if (productList[i] != targtedForDeleteProduct) {
      productsNotDeletedList.push(productList[i]);
    }
    displayProduct(productsNotDeletedList);
    setProductsinLocalStorage(productsNotDeletedList);
  }
}
function setProductToBeDeleted(targtedForUpdateProduct) {
  updateProductsInputsWithNewValues(targtedForUpdateProduct);
  addProductBtn.classList.add("d-none");
  updateProductBtn.classList.replace("d-none", "d-block");
  productToBeUpdated = targtedForUpdateProduct;
}

updateProductBtn.addEventListener("click", updateProduct);
function updateProduct() {
  if (
    productNameValidation() &&
    productPriceValidation() &&
    productCatValidation() &&
    productDescValidation()
  ) {
    productToBeUpdated.name = productName.value;
    productToBeUpdated.price = productPrice.value;
    productToBeUpdated.category = productCategory.value;
    productToBeUpdated.description = productDescription.value;
    addProductBtn.classList.remove("d-none");
    updateProductBtn.classList.add("d-none");

    displayProduct(productList);

    updateProductsInputsWithNewValues();
    setProductsinLocalStorage(productList);
  }
}

searchProducts.addEventListener("input", function (e) {
  let searchedTerm = e.target.value;
  let searchedProductsList = [];
  for (let i = 0; i < productList.length; i++) {
    if (
      productList[i].name.toLowerCase().includes(searchedTerm.toLowerCase())
    ) {
      searchedProductsList.push(productList[i]);
    }
  }
  let hightlitedSearchedList = structuredClone(searchedProductsList);
  for (let i = 0; i < hightlitedSearchedList.length; i++) {
    hightlitedSearchedList[i].name = hightlitedSearchedList[i].name.replace(
      searchedTerm,
      `<span class="text-danger bg-warning">${searchedTerm}</span>`
    );
  }
  displayProduct(hightlitedSearchedList);
});

function updateProductsInputsWithNewValues(flag) {
  productName.value = flag ? flag.name : "";
  productPrice.value = flag ? flag.price : "";
  productCategory.value = flag ? flag.category : "";
  productDescription.value = flag ? flag.description : "";
}

//** Storing & Retreiving Data in Local Storage  **//
function setProductsinLocalStorage(productList) {
  localStorage.setItem("Products", JSON.stringify(productList));
}

function getProductsFromLocalStorage() {
  return JSON.parse(localStorage.getItem(ProductListNameinLocalStorage)) || [];
}

//** Inputs Validations  **//
productName.addEventListener("change", function () {
  productNameValidation();
});

productPrice.addEventListener("change", function () {
  productPriceValidation();
});

productCategory.addEventListener("change", function () {
  productCatValidation();
});

productDescription.addEventListener("change", function () {
  productDescValidation();
});

function productNameValidation() {
  var regex = /^[A-Z][a-z]{3,8}$/;
  if (regex.test(productName.value)) {
    document
      .getElementById("product-name-error")
      .classList.replace("d-block", "d-none");
    document.getElementById("product-name").style.border = "1px solid blue";
  } else {
    document
      .getElementById("product-name-error")
      .classList.replace("d-none", "d-block");
    document.getElementById("product-name").style.border = "1px solid red";
  }

  return regex.test(productName.value);
}
function productPriceValidation() {
  var regex = /^([1-9][0-9][0-9][0-9]|10000)$/;
  if (regex.test(productPrice.value)) {
    document
      .getElementById("product-price-error")
      .classList.replace("d-block", "d-none");
    document.getElementById("product-price").style.border = "1px solid blue";
  } else {
    document
      .getElementById("product-price-error")
      .classList.replace("d-none", "d-block");
    document.getElementById("product-price").style.border = "1px solid red";
  }
  return regex.test(productPrice.value);
}

function productCatValidation() {
  var regex = /^(TV|Mobile|Watch)$/;
  if (regex.test(productCategory.value)) {
    document
      .getElementById("product-cat-error")
      .classList.replace("d-block", "d-none");
    document.getElementById("product-cat").style.border = "1px solid blue";
  } else {
    document
      .getElementById("product-cat-error")
      .classList.replace("d-none", "d-block");
    document.getElementById("product-cat").style.border = "1px solid red";
  }
  return regex.test(productCategory.value);
}
function productDescValidation() {
  var regex = /^(.){0,250}$/;
  if (regex.test(productDescription.value)) {
    document
      .getElementById("product-desc-error")
      .classList.replace("d-block", "d-none");
    document.getElementById("product-desc").style.border = "1px solid blue";
  } else {
    document
      .getElementById("product-desc-error")
      .classList.replace("d-none", "d-block");
    document.getElementById("product-desc").style.border = "1px solid red";
  }
  return regex.test(productDescription.value);
}

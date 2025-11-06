let titel = document.getElementById("titel");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = 'create';
let tmp;

// get total

function getTotal()
{
    if(price.value != '' && taxes.value != '' && ads.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "green";
    }
    else
    {
        total.innerHTML = '';
        total.style.background = "red";
    }
}

// create prodact


let DataProdacr ;

if(localStorage.prodact != null)
{
    DataProdacr = JSON.parse(localStorage.prodact);
}
else
{
    DataProdacr = [];
}

submit.onclick = function()
{
    let NewProduct = {
        titel : titel.value,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value || 0,
        total : total.innerHTML,
        count : count.value || 1,
        category : category.value,
    }
    
    if (mood === 'create')
        {
            // count 
        if(NewProduct.count > 1)
        {
            let count_repet = 0;
            while (count_repet < NewProduct.count)
            {
                DataProdacr.push(NewProduct);
                count_repet++;
            }
        }
        else
            DataProdacr.push(NewProduct);
    }
    else
    {
        DataProdacr[tmp] = NewProduct;
    }

    submit.innerHTML = 'Create';
    mood = 'create';
    count.style.display = 'block';
    

    // save localstorege
    localStorage.setItem('prodact', JSON.stringify(DataProdacr));

    clearData();
    ShowData();
}


// clear inputs

function clearData()
{
    titel.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


// read

function ShowData()
{
    let table = '';
    let i = 0;
    while (i < DataProdacr.length)
        {
            table += `
            <tr>
            <td>${i}</td>
            <td>${DataProdacr[i].titel}</td>
            <td>${DataProdacr[i].price}</td>
            <td>${DataProdacr[i].taxes}</td>
                <td>${DataProdacr[i].ads}</td>
                <td>${DataProdacr[i].discount}</td>
                <td>${DataProdacr[i].total}</td>
                <td>${DataProdacr[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="delate(${i})" id="delate">delate</button></td>
                </tr>
                `
                i++;
            }
            
            document.getElementById('tbody').innerHTML = table;
            let btnDelate = document.getElementById('delateAll');
            if (DataProdacr.length > 0){
                btnDelate.innerHTML = `<button onclick="DelateAll()" id="delateAll">Delate ALL (${DataProdacr.length})</button>`
            }else{
                btnDelate.innerHTML = ``;
        }
            getTotal();
}



ShowData(); 

// delate
function delate(id_delate) {
    DataProdacr.splice(id_delate, 1); 
    localStorage.prodact = JSON.stringify(DataProdacr);
    ShowData();
}

// clean data
function DelateAll()
{
    localStorage.clear();
    DataProdacr.splice(0);
    ShowData();
}

// update

function updateData(i)
{
    titel.value = DataProdacr[i].titel;
    price.value = DataProdacr[i].price;
    taxes.value = DataProdacr[i].taxes;
    ads.value = DataProdacr[i].ads;
    discount.value = DataProdacr[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = DataProdacr[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}

// search



let searchMood = 'titel';

function SearchMood(id)
{
    const searchInput = document.getElementById('search');
    if(id == 'searchTitle')
    {
        searchMood = 'titel';
        searchInput.placeholder = 'search by titel';
    }
    else
        {
            searchMood = 'category';
            searchInput.placeholder = 'search by category';
    }
    searchInput.focus();
}

function SearchData(value)
{
    let table = '';
    value = value.toLowerCase();
    if (searchMood == 'titel')
    {
        let i = 0;
        while (i < DataProdacr.length)
        {
            if (DataProdacr[i].titel.toLowerCase().includes(value))
            {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${DataProdacr[i].titel}</td>
                        <td>${DataProdacr[i].price}</td>
                        <td>${DataProdacr[i].taxes}</td>
                        <td>${DataProdacr[i].ads}</td>
                        <td>${DataProdacr[i].discount}</td>
                        <td>${DataProdacr[i].total}</td>
                        <td>${DataProdacr[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="delate(${i})" id="delate">delate</button></td>
                    </tr>
                        `
            }
            i++;
        }
    }
    else if (searchMood === 'category') {
    let i = 0;
    while (i < DataProdacr.length) {
      if (DataProdacr[i].category.toLowerCase().includes(value)) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${DataProdacr[i].titel}</td>
            <td>${DataProdacr[i].price}</td>
            <td>${DataProdacr[i].taxes}</td>
            <td>${DataProdacr[i].ads}</td>
            <td>${DataProdacr[i].discount}</td>
            <td>${DataProdacr[i].total}</td>
            <td>${DataProdacr[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="delate(${i})" id="delate">Delete</button></td>
          </tr>`;
      }
      i++;
    }
  }
    document.getElementById('tbody').innerHTML = table;
}
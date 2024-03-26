let tablebody = document.getElementById('tablebody');
add = document.getElementById("additem");


function Getandupdate() {

    tit = document.getElementById('title').value;
    des = document.getElementById("description").value;

    if (localStorage.getItem('itemsJson') == null) {
        console.log("updating list");

        itemsToPush = [];
        itemsToPush.push([tit, des]);

        localStorage.setItem('itemsJson', JSON.stringify(itemsToPush));
    }
    else {

        itemToPushString = localStorage.getItem('itemsJson');
        itemsToPush = JSON.parse(itemToPushString);
        itemsToPush.push([tit, des]);
        localStorage.setItem('itemsJson', JSON.stringify(itemsToPush));

    }

    update();
}
function update() {
    if (localStorage.getItem('itemsJson') == null) {


        itemsToPush = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemsToPush));
    }
    else {
        itemToPushString = localStorage.getItem('itemsJson');
        itemsToPush = JSON.parse(itemToPushString);
    }
    let str = " ";
    itemsToPush.forEach((element, index) => {
        str += `
        <tr>
        <th scope="row" id="sno">${index + 1}</th>
        <td id="itemtitle">${element[0]}</td>
        <td id="itemdescription">${element[1]}</td>
        <td><button class="btn btn-primary btn-sm "onclick="deleted(${index})">Delete</button></td>
    </tr>`;
    });
    tablebody.innerHTML = str;
}


add.addEventListener("click", Getandupdate);
update();
function deleted(itemIndex) {
    console.log("item deleting at", itemIndex + 1);
    itemToPushString = localStorage.getItem('itemsJson');
    itemsToPush = JSON.parse(itemToPushString);

    itemsToPush.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemsToPush));
    update();
}
function clearList() {
    localStorage.clear();

    update();
}

let ti = document.getElementsByTagName('title');
ti.innerHTML = "Groceries-List"
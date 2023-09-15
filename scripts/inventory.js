let btnOpen = document.querySelector(".btnOpen");
let box = document.querySelector(".box");
let close = document.querySelector(".close");
let save =document.querySelector("#save");
let edit=document.querySelector("#edit")
const clearData=()=>{
    $('#name').val(""), 
    $('#quantity').val(""),
    $('#price').val("")
    $('#expirationDate').val("")
}
const openPopUpSave=()=>{
    clearData();
    btnOpen.style.display="none";
    box.style.display="block";
    save.style.display="block"
    edit.style.display="none"
}
const openPopUpEdit=()=>{
    btnOpen.style.display="none";
    box.style.display="block";
    edit.style.display="block"
    save.style.display="none"
}
const closePopUp=()=>{
    btnOpen.style.display="block";
    box.style.display="none";
    clearData();
}


const loadInventory=()=>{
    $('#table-body').empty();
    const firestore = firebase.firestore();
    firestore
        .collection('inventory')
        .get().then((result)=>{
            result.forEach((records)=>{
                const data = records.data();
                const row=`
                <tr>
                    <th>${records.id}</th>
                    <td>${data.name}</td>
                    <td>${data.quantity}</td>
                    <td>${data.price}</td>
                    <td>${data.expirationDate}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteData('${records.id}')">Delete</button> |
                        <button class="btn btn-success btn-sm" onclick="updateData('${records.id}')">Update</button>
                    </td>
                </tr>
                `;
                $('#table-body').append(row);
            });
    });

    
}
createInventory=()=>{
    if($('#price').val()>0 |$('#quantity').val()>0){
    const tempInventory={
        name:$('#name').val(), 
        quantity:$('#quantity').val(),
        price:$('#price').val(),
        expirationDate:$('#expirationDate').val()
    };
    const database=firebase.firestore();
    database
    .collection("inventory")
    .add(tempInventory)
    .then((response)=>{
        closePopUp();
        toastr.options.closeMethod = 'fadeOut';
        toastr.options.closeDuration = 300;
        toastr.options.closeEasing = 'swing';
        toastr.success('Added!', 'success!')
        loadInventory();
    })
    .catch((error)=>{
        alert("error")
        console.log(error);
    })
    }else{
        alert("prevent negative quantities or invalid input")
    }
}
inventoryId=undefined;
const updateData=(id)=>{
    inventoryId=id;
    const firestore = firebase.firestore();
    firestore
        .collection('inventory')
        .doc(inventoryId)
        .get().then((response)=>{
            if (response.exists) {
                const data = response.data();
                $('#name').val(data.name), 
                $('#quantity').val(data.quantity),
                $('#price').val(data.price)
                $('#expirationDate').val(data.expirationDate)
                openPopUpEdit();
            }
    })
}
const updateRecord=()=>{
    if (inventoryId){
        const firestore = firebase.firestore();
        firestore
            .collection('inventory')
            .doc(inventoryId)
            .update({
                name:$('#name').val(), 
                quantity:$('#quantity').val(),
        price:$('#price').val(),
        expirationDate:$('#expirationDate').val()
            }).then(()=>{
            inventoryId=undefined;
            closePopUp();
            toastr.options.closeMethod = 'fadeOut';
            toastr.options.closeDuration = 300;
            toastr.options.closeEasing = 'swing';
            toastr.success('Edit!', 'success!')
            loadInventory();
            
        })
    }
}

const deleteData=(id)=>{
    if (confirm('Are you sure?')){
        const firestore = firebase.firestore();
        firestore
            .collection('inventory')
            .doc(id)
            .delete()
            .then(()=>{

                toastr.options.closeMethod = 'fadeOut';
                toastr.options.closeDuration = 300;
                toastr.options.closeEasing = 'swing';
                toastr.success('Deleted!', 'success!')
                inventoryId=undefined;
                loadInventory();
            })
    }
}
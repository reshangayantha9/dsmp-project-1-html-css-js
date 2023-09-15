let btnOpen = document.querySelector(".btnOpen");
let box = document.querySelector(".box");
let close = document.querySelector(".close");
let save =document.querySelector("#save");
let edit=document.querySelector("#edit")
const clearData=()=>{
    $('#name').val(""), 
    $('#specialization').val(""),
    $('#contact').val("")
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


const loadDoctors=()=>{
    $('#table-body').empty();
    const firestore = firebase.firestore();
    firestore
        .collection('doctors')
        .get().then((result)=>{
            result.forEach((records)=>{
                const data = records.data();
                const row=`
                <tr>
                    <th>${records.id}</th>
                    <td>${data.name}</td>
                    <td>${data.specialization}</td>
                    <td>${data.contact}</td>
                    <td>${data.availability}</td>
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
createDoctor=()=>{
    const tempDoctor={
        name:$('#name').val(), 
        specialization:$('#specialization').val(),
        contact:$('#contact').val(),
        availability:true
    };
    const database=firebase.firestore();
    database
    .collection("doctors")
    .add(tempDoctor)
    .then((response)=>{
        closePopUp();
        toastr.options.closeMethod = 'fadeOut';
        toastr.options.closeDuration = 300;
        toastr.options.closeEasing = 'swing';
        toastr.success('Added!', 'success!')
        loadDoctors();
    })
    .catch((error)=>{
        alert("error")
        console.log(error);
    })
}
doctorId=undefined;
const updateData=(id)=>{
    doctorId=id;
    const firestore = firebase.firestore();
    firestore
        .collection('doctors')
        .doc(doctorId)
        .get().then((response)=>{
            if (response.exists) {
                const data = response.data();
                $('#name').val(data.name), 
                $('#specialization').val(data.specialization),
                $('#contact').val(data.contact)
                openPopUpEdit();
            }
    })
}
const updateRecord=()=>{
    if (doctorId){
        const firestore = firebase.firestore();
        firestore
            .collection('doctors')
            .doc(doctorId)
            .update({
                name:$('#name').val(), 
                specialization:$('#specialization').val(),
                contact:$('#contact').val()
            }).then(()=>{
            doctorId=undefined;
            closePopUp();
            toastr.options.closeMethod = 'fadeOut';
            toastr.options.closeDuration = 300;
            toastr.options.closeEasing = 'swing';
            toastr.success('Edit!', 'success!')
            loadDoctors();
            
        })
    }
}

const deleteData=(id)=>{
    if (confirm('Are you sure?')){
        const firestore = firebase.firestore();
        firestore
            .collection('doctors')
            .doc(id)
            .delete()
            .then(()=>{

                toastr.options.closeMethod = 'fadeOut';
                toastr.options.closeDuration = 300;
                toastr.options.closeEasing = 'swing';
                toastr.success('Deleted!', 'success!')
                doctorId=undefined;
                loadDoctors();
            })
    }
}
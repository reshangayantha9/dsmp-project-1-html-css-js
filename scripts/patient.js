let btnOpen = document.querySelector(".btnOpen");
let box = document.querySelector(".box");
let close = document.querySelector(".close");
let save =document.querySelector("#save");
let edit=document.querySelector("#edit")
const clearData=()=>{
    $('#name').val(""), 
    $('#age').val(""),
    $('#gender').val(""),
    $('#contact').val(""),
    $('#medicalHistory').val("")
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


const loadPatient=()=>{
   console.log("sadd");
    $('#table-body').empty();
    const firestore = firebase.firestore();
    firestore
        .collection('patients')
        .get().then((result)=>{
            result.forEach((records)=>{
                const data = records.data();
                const row=`
                <tr>
                    <th>${records.id}</th>
                    <td>${data.name}</td>
                    <td>${data.age}</td>
                    <td>${data.gender}</td>
                    <td>${data.contact}</td>
                    <td>${data. medicalHistory}</td>
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
createPatient=()=>{
    const tempPatient={
        name:$('#name').val(), 
        age:$('#age').val(),
        gender:$('#gender').val(),
        contact:$('#contact').val(),
        medicalHistory:$('#medicalHistory').val()
    };
    const database=firebase.firestore();
    database
    .collection("patients")
    .add(tempPatient)
    .then((response)=>{
        closePopUp();
        toastr.options.closeMethod = 'fadeOut';
        toastr.options.closeDuration = 300;
        toastr.options.closeEasing = 'swing';
        toastr.success('Added!', 'success!')
        loadPatient();
    })
    .catch((error)=>{
        alert("error")
        console.log(error);
    })
}
patientId=undefined;
const updateData=(id)=>{
    patientId=id;
    const firestore = firebase.firestore();
    firestore
        .collection('patients')
        .doc(patientId)
        .get().then((response)=>{
            if (response.exists) {
                const data = response.data();
                $('#name').val(data.name), 
                $('#age').val(data.age),
                $('#gender').val(data.gender),
                $('#contact').val(data.contact),
                $('#medicalHistory').val(data.medicalHistory)
                openPopUpEdit();
            }
    })
}
const updateRecord=()=>{
    if (patientId){
        const firestore = firebase.firestore();
        firestore
            .collection('patients')
            .doc(patientId)
            .update({
                name:$('#name').val(), 
                age:$('#age').val(),
                gender:$('#gender').val(),
        contact:$('#contact').val(),
        medicalHistory:$('#medicalHistory').val()
            }).then(()=>{
            patientId=undefined;
            closePopUp();
            toastr.options.closeMethod = 'fadeOut';
            toastr.options.closeDuration = 300;
            toastr.options.closeEasing = 'swing';
            toastr.success('Edit!', 'success!')
            loadPatient();
            
        })
    }
}

const deleteData=(id)=>{
    if (confirm('Are you sure?')){
        const firestore = firebase.firestore();
        firestore
            .collection('patients')
            .doc(id)
            .delete()
            .then(()=>{

                toastr.options.closeMethod = 'fadeOut';
                toastr.options.closeDuration = 300;
                toastr.options.closeEasing = 'swing';
                toastr.success('Deleted!', 'success!')
                patientId=undefined;
                loadPatient();
            })
    }
}
const printData=(i)=>{
    window.open('../page/report/patientReport.html');
}
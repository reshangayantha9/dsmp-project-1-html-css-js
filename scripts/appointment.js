let isAvailable=false;
const loadIds = ()=>{
    loadDoctorIds();
    loadPatientIds();
    loadBooking();
}
const clearData=()=>{
    $('#name').val("");
    $('#age').val("");
    $('#gender').val("")
    $('#contact').val("")
    $('#medicalHistory').val("")
    $('#doctorName').val("");
    $('#specialization').val("");
    $('#doctorContact').val("")
    $('#availability').val("")
    isAvailable=undefined;
}
const loadPatientIds = () => {
    $('#patient-id').empty();

    const firestore = firebase.firestore();
    firestore
        .collection('patients')
        .get()
        .then((records => {
            records.forEach((result) => {
                const option = $('<option></option>').val(result.id).text(result.id);
                $('#patient-id').append(option);
            })
        }))
}
const loadDoctorIds = () => {
    $('#doctor-id').empty();

    const firestore = firebase.firestore();
    firestore
        .collection('doctors')
        .get()
        .then((records => {
            records.forEach((result) => {
                const option = $('<option></option>').val(result.id).text(result.id);
                $('#doctor-id').append(option);
            })
        }))
}

$('#patient-id').on("change",function (){
    const patientId=$(this).val();
    const firestore = firebase.firestore();
    firestore
        .collection('patients')
        .doc(patientId)
        .get().then((response)=>{
        if (response.exists) {
            const data = response.data();
            $('#name').val(data.name);
            $('#age').val(data.age);
            $('#gender').val(data.gender)
            $('#contact').val(data.contact)
            $('#medicalHistory').val(data.medicalHistory)

        }
    })
});
$('#doctor-id').on("change",function (){
    const doctorId=$(this).val();
    const firestore = firebase.firestore();
    firestore
        .collection('doctors')
        .doc(doctorId)
        .get().then((response)=>{
        if (response.exists) {
            const data = response.data();
            $('#doctorName').val(data.name);
            $('#specialization').val(data.specialization);
            $('#doctorContact').val(data.contact)
            $('#availability').val(data.availability)
            isAvailable=data.availability;
            console.log(isAvailable);
        }
    })
});

const booking=()=>{

    if(isAvailable==="true"){
        let obj={
            patients:{
                patientId:$('#patient-id').val(), 
                name:$('#name').val(), 
                age:$('#age').val(),
                gender:$('#gender').val(),
                contact:$('#contact').val(),
                medicalHistory:$('#medicalHistory').val()
            },
            doctors:{
                doctorId:$('#doctor-id').val(), 
                name:$('#doctorName').val(), 
                specialization:$('#specialization').val(),
                contact:$('#doctorContact').val(),
                availability: $('#availability').val()
            },
            date:$('#date').val()
        }
        const firestore = firebase.firestore();
        firestore
            .collection('booking')
            .where('date', '==', obj.date)
            .where('doctors.doctorId', '==', obj.doctors.doctorId)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    toastr.options.closeMethod = 'fadeOut';
                    toastr.options.closeDuration = 300;
                    toastr.options.closeEasing = 'swing';
                    toastr.error('An appointment with the same date, time, and doctor already exists. Please choose another time or doctor.');
                } else {         
                    firestore
                        .collection('booking')
                        .add(obj)
                        .then((response) => {
                            toastr.options.closeMethod = 'fadeOut';
                            toastr.options.closeDuration = 300;
                            toastr.options.closeEasing = 'swing';
                            toastr.success('Appointment created successfully.');
                            loadIds();
                        })
                        .catch((error) => {
                            toastr.options.closeMethod = 'fadeOut';
                            toastr.options.closeDuration = 300;
                            toastr.options.closeEasing = 'swing';
                            toastr.error('Error creating appointment.');
                        });
                }
            })
            .catch((error) => {
                toastr.options.closeMethod = 'fadeOut';
                toastr.options.closeDuration = 300;
                toastr.options.closeEasing = 'swing';
                toastr.error('Error checking appointment conflict.');
            });
    
    }else{
                toastr.options.closeMethod = 'fadeOut';
                toastr.options.closeDuration = 300;
                toastr.options.closeEasing = 'swing';
                toastr.error('Doctor not available.');
    }
}
const loadBooking=()=>{
    $('#table-body').empty();
    const firestore = firebase.firestore();
    firestore
        .collection('booking')
        .get().then((result)=>{
        result.forEach((records)=>{
            const data = records.data();
            const row=`
                <tr>
                    <td>${records.id}</td>
                    <td>${data.patients.name}</td>
                    <td>${data.doctors.name}</td>
                    <td>${data.date}</td>
                </tr>
                `;
            $('#table-body').append(row);
        });
    });
}
const printData=(i)=>{
    window.open('../page/report/appointmentReport.html');
}
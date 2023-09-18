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
        print()
    });
}
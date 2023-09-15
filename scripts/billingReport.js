const loadBilling=()=>{
    $('#table-body').empty();

    const firestore = firebase.firestore();
    firestore
        .collection('billing')
        .get().then((result)=>{
        result.forEach((records)=>{
            const data = records.data();
            const row=`
                <tr>
                    <td>${records.id}</td>
                    <td>${data.patients.name}</td>
                    <td>${data.serviceProvide}</td>
                    <td>${data.cost}</td>
                    <td>${data.paymentStatus}</td>
                </tr>
                `;
            $('#table-body').append(row);
           
        });
        print();
    });
}
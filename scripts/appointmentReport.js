const loadBooking = () => {

    const queryParameter = new URLSearchParams(window.location.search);
    const fromDate = queryParameter.get('from');
    const toDate = queryParameter.get('to');
    console.log(fromDate);
    console.log(toDate);
    if (fromDate && toDate) {
        $('#table-body').empty();
        const firestore = firebase.firestore();

        firestore
            .collection('booking')
            .get()
            .then((result) => {
                result.forEach((records) => {
                    const data = records.data();
                    const appointmentDateTime = data.date;
                    const appointmentDate = appointmentDateTime.split('T')[0];

                    if (appointmentDate >= fromDate && appointmentDate <= toDate) {
                        const row = `
                <tr>
                  <td>${records.id}</td>
                  <td>${data.patients.name}</td>
                  <td>${data.doctors.name}</td>
                  <td>${appointmentDateTime}</td>
                </tr>
              `;
                        $('#table-body').append(row);
                    }
                });
                print()
            });
    } else {
        toastr.options.closeMethod = 'fadeOut';
        toastr.options.closeDuration = 300;
        toastr.options.closeEasing = 'swing';
        toastr.error('Please select both start and end dates.');
    }
}
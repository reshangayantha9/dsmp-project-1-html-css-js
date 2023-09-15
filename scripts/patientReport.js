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
                 </tr>
                 `;
                 $('#table-body').append(row);
             });
             print();
     });
 
     
 }
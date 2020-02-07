

var verificationDummy = [{
    city: "Mumbai",
    gender: "1",
    name: "test",
    number: "8828183820",
    role: "DOCTOR",
    status: "REGISTERED",
},
{
    city: "Mumbai",
    gender: "1",
    name: "test",
    number: "8828183820",
    role: "DOCTOR",
    status: "REGISTERED",
},
{
    city: "Mumbai",
    gender: "1",
    name: "test",
    number: "8828183820",
    role: "DOCTOR",
    status: "REGISTERED",
}
];

var colHeaders = ['role', 'name', 'gender', 'city', 'status'];

var tableColumns = [{
    data: colHeaders[0],
    title: colHeaders[0].toUpperCase(),
    defaultContent: 'N/A'
},
{
    data: colHeaders[1],
    title: colHeaders[1].toUpperCase(),
    defaultContent: 'N/A'
},
{
    data: colHeaders[2],
    title: colHeaders[2].toUpperCase(),
    defaultContent: 'N/A'
},
{
    data: colHeaders[3],
    title: colHeaders[3].toUpperCase(),
    defaultContent: 'N/A'
},
{
    data: colHeaders[4],
    title: 'Registered On'.toUpperCase(),
    defaultContent: 'N/A'
},
{
    data: null,
    title: 'Actions'
},
];

function populateTable() {
    // console.log('populating ', data);

    table = $('#basic-btn').DataTable({
        // sDom: 'lrtip',
        "scrollX": true,
        paging: true,
        // "autoWidth": false,
        // draw: 1,
        // processing: true,
        // serverSide: true,
        data:verificationDummy ,
        columns: tableColumns,
        "columnDefs": [{
            "targets": -1,
            className: 'dt-right',
            "data": null,
            "defaultContent": `<button class="btn"><i class="fa fa-check"></i></button>
            <button class="btn"><i class="fa fa-phone"></i></button>`
        }, {
            "targets": 4,
            className: 'dt-right'
        }],
        language: {
            searchPlaceholder: "  Search....",
            search: "",
        }
    });



    $('#basic-btn tbody').on('click', 'button', function () {

        console.log('clicked', $(this).find('i').hasClass('fa-check'));
        var data = table.row($(this).parents('tr')).data();

        verificationApprovalObj = {
            ...data,
        };

        selectedRow = table.row($(this).parents('tr'));

        //create arrays if not exists
        if (!verificationApprovalObj.documents) verificationApprovalObj.documents = [];
        if (!verificationApprovalObj.photos) verificationApprovalObj.photos = []; //["../images/fav_icon.png","../images/fav_icon.png","../images/fav_icon.png"];
        if (!verificationApprovalObj.availability) verificationApprovalObj.availability = [];


        console.log('verificationApprovalObj ', verificationApprovalObj);

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }

        if ($(this).find('i').hasClass('fa-check')) {

            //verify the profile

            //show modal
            if (verificationApprovalObj.role === 'DOCTOR') {

                $("#Verif_Modal").modal('show');
                populateModal(verificationApprovalObj);
            } else {
                populateClinicModal(verificationApprovalObj);
                $('#verif_clinic_Modal').modal('show');
            }

        }
        else if ($(this).find('i').hasClass('fa-phone')) {

            // call

            console.log("number:" + verificationApprovalObj.number)
            var data = {
                to: verificationApprovalObj.number
            }

            call('/manage/call', 'POST', data)
                .then((data) => console.log(data))
                .catch((err) => console.log(err));

            // $.ajax({
            //     url: '/manage/call',
            //     type: 'POST',
            //     data: JSON.stringify(data),
            //     dataType: 'json',
            //     contentType: 'application/json',
            //     success: function (data) {
            //         console.log('data ', data);
            //         // resolve(data.data);
            //     },
            //     error: function (err) {
            //         console.log("Error while calling");
            //         // reject(err);
            //     }
            // })
            //call
        }
        else {

        }

    });

}

populateTable()

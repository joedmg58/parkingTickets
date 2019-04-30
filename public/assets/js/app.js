//--------- Logic to handle SPA with Onsen UI ------------------
window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};

//----------------- Login page logic --------------------------------

function login() {
    console.log('Login button pressed');

    return fn.load('tickets-tab.html'); //eliminar despues

    var ajaxRequest = new XMLHttpRequest();
    
    ajaxRequest.open('POST', '/user/login'); 
    ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  //ajaxRequest.send('email=joed@mail.com&password=password');
    //ajaxRequest.setRequestHeader("Content-type", "application/json");

    ajaxRequest.onload = () => {
        var data = JSON.parse( ajaxRequest.responseText );
        console.log(data);
        if (ajaxRequest.status === 200) {
            console.log(data.token);

            localStorage.setItem("token", data.token);

            fn.load('tickets-tab.html'); //go to other page
        } else {
            console.log(data.message);
            ons.notification.toast(data.message, {timeout: 2000});
        }
    };

    const data2Send = {
        'email': document.getElementById('email').value,
        'password': document.getElementById('password').value
    };

    //console.log(JSON.stringify(data2Send));
    
    //ajaxRequest.send(JSON.stringify(data2Send));
    //ajaxRequest.send('email=joed@mail.com&password=password');
    var uri = '';
    for (const prop in data2Send) {
        uri += `${prop}=${data2Send[prop]}&`
    };
    
    //console.log(encodeURI(uri));

    ajaxRequest.send( encodeURI( uri ) );
    
}

//---------------- Tickets page logic --------------------------------

document.addEventListener('init', function(event) {
    if ( event.target.id === 'tickets' ) {
        console.log('tickets.html')

        //ajax GET request to get tickets
        var ajaxRequest = new XMLHttpRequest();
    
        ajaxRequest.open('GET', '/tickets'); 

        ajaxRequest.onload = () => {
            var data = JSON.parse( ajaxRequest.responseText );
            console.log(data);
            if (ajaxRequest.status === 200) {
                //render items
                renderItems('ticketslist', data.tickets);
            } else {
                console.log(data.message);
                ons.notification.toast(data.message, {timeout: 2000});
            }
        };

        ajaxRequest.send();

    }
});

/* <ons-row>
        <ons-col><ons-button modifier="quiet" icon="md-zoom-in"></ons-button></ons-col>
        <ons-col><ons-button modifier="quiet" icon="md-edit"></ons-button></ons-col>
        <ons-col><ons-button modifier="quiet" icon="md-home"></ons-button></ons-col>
        <ons-icon icon="md-zoom-in" size="20px" fixed-width="true"></ons-icon>
    <ons-row> */

createRow = function(date, amount, id) {
    const row = `<div class="expandable-content">
                    <ons-row data-id="${id}">
                        <ons-col>${date}</ons-col>
                        <ons-col>$ ${amount.toFixed(2)}</ons-col>
                        <ons-col>
                            <ons-button modifier="quiet"><ons-icon icon="md-zoom-in" fixed-width="true" size="24px"></ons-icon></ons-button>
                            <ons-button modifier="quiet"><ons-icon icon="md-edit" fixed-width="true" size="24px"></ons-icon></ons-button>
                            <ons-button modifier="quiet"><ons-icon icon="md-zoom-in" fixed-width="true" size="24px"></ons-icon></ons-button>
                        </ons-col>
                    </ons-row>
                </div>`;
    return row;
};

renderItems = function(listId, data) {
    
    var output = '';

    var list = document.getElementById(listId);

    for (var i = 0; i < data.length; i++) {
        let date = new Date(data[i].date);
        output += '<ons-list-item expandable modifier="longdivider">' + 
                  data[i].location + createRow(date.toLocaleDateString(), data[i].amount, data[i]._id) +
                  '</ons-list-item>'; 
    }

    list.innerHTML = output;

}

addTicket = function() {
    //get data from input form
    const jobSite = document.getElementById('jobsite').value.trim();
    const date = document.getElementById('date').value;
    const amount = document.getElementById('amount').value;
    console.log(jobSite, date, amount);
    //make an ajax POST request with data in body and JWT in header
    //if ok refresh tickets list, if not show error
}
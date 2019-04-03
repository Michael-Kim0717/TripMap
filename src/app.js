$(document).ready(function() {

    $('.dropdown-trigger').dropdown();
    $('.modal').modal();

    /* Map elements. */
    var map;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 34.031760, lng: -118.279065},
            zoom: 10
        });

        const LAX = new google.maps.Marker({
            position: {lat: 33.9432746, lng: -118.4027894},
            map: map,
            label: 'LAX'
        });
        const airbnb = new google.maps.Marker({
            position: {lat: 34.05602, lng: -118.30307},
            map: map,
            label: 'AIRBNB'
        });
        LAX.setMap(map);
        airbnb.setMap(map);

        /* Retrieve values from database and add markers to the page. */
        firebase.database().ref('places').once('value', function(snapshot){
            snapshot.forEach(function(childSnapshot){
                if (childSnapshot.val().name !== undefined || childSnapshot.val().category !== undefined || childSnapshot.val().latitude !== undefined || childSnapshot.val().longitude !== undefined) {
                    const marker = new google.maps.Marker({
                        position: {lat: parseFloat(childSnapshot.val().latitude), lng: parseFloat(childSnapshot.val().longitude)},
                        map: map,
                        label: childSnapshot.val().name
                    });
                    switch ((childSnapshot.val().category).toLowerCase()) {
                        case 'food':
                            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                            break;
                        case 'attraction':
                            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
                            break;
                        case 'activity':
                            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/orange-dot.png');
                            break;
                    }
                    marker.setMap(map);
                }
            })
        })
    }

    initMap();

    /* Submit Place button */
    $("#submitPlace").on("click", function(){
        firebase.database().ref('places').push({
            name: $("#name").val(),
            category: $("#category").val(),
            latitude: $("#latitude").val(),
            longitude: $("#longitude").val()
        })
        $("#name").val("");
        $("#category").val("");
        $("#latitude").val("");
        $("#longitude").val("");

        setTimeout(function() {
            window.location.reload();
        }, 500);
    });
    
});
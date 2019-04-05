$(document).ready(function() {

    $('.dropdown-trigger').dropdown();
    $('.modal').modal();

    /* Submit Place button */
    $("#submitPlace").on("click", function(){
        let googleMapsLink = $("#googleMapsLink").val();
        console.log(googleMapsLink);
        const latitude = googleMapsLink.substring(googleMapsLink.indexOf("@") + 1, googleMapsLink.indexOf(","));
        console.log(latitude);
        googleMapsLink = googleMapsLink.substring(googleMapsLink.indexOf(",") + 1);
        console.log(googleMapsLink);
        const longitude = googleMapsLink.substring(0, googleMapsLink.indexOf(","));
        console.log(longitude);

        firebase.database().ref('places').push({
            name: $("#name").val(),
            category: $("#category").val(),
            latitude,
            longitude
        })
        $("#name").val("");
        $("#category").val("");
        $("#googleMapsLink").val("");

        setTimeout(function() {
            window.location.reload();
        }, 500);
    });
    
});
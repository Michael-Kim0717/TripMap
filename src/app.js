$(document).ready(function() {

    $('.dropdown-trigger').dropdown();
    $('.modal').modal();

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
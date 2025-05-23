const cardList = [
    {
        title: "Mangrove Forests",
        image: "images/mangrove.jpg",
        link: "About Mangrove Forests",
        desciption: "Mangroves are salt-tolerant trees and shrubs adapted to thrive in the intertidal zones of coastal areas, characterized by their unique root systems and ability to tolerate high salinity. "
    },
    {
        title: "Grasslands",
        image: "images/grasslands.jpg",
        link: "About Grasslands",
        desciption: "Grassland vegetation is dominated by grasses (Poaceae), but also includes sedges (Cyperaceae), rushes (Juncaceae), legumes, and other herbs, forming a diverse ecosystem found on every continent except Antarctica. "
    }
]

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
    '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
    '</div><div class="card-content">'+
    '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+
    '<div class="card-reveal">'+
        '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
        '<p class="card-text card-desc-color">'+item.desciption+'</p>'+
      '</div></div></div>';
      $("#card-section").append(itemToAppend)
    });
}


const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();

    console.log("Form Data Submitted: ", formData);
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    addCards(cardList);
    $('.modal').modal();
    $('#formSubmit').click(()=>{
        submitForm();
    })
})
$(function(){
    $("[data-toggle='tooltip]").tooltip()
    $("[data-toggle-'popover").popover()
    $(".carousel").carousel({
        interval: 2000
    })

    $('#adquerirInfo').on('show.bs.modal', (e) => {
        $('#adquerirInfoBtn').removeClass('btn-primary').addClass('btn-outline-secondary btn-secondary').prop('disabled',true)
    })

    $('#adquerirInfo').on('hidden.bs.modal',(e) => {
        $('#adquerirInfoBtn').prop('disabled',false);
    })
});
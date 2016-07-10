$(document).ready(function(){
    
    $('#nav-btn').on('click', function(){
        
        $(this).toggleClass('active');
        $('.main-nav').toggleClass('active');
        
    });
    
});
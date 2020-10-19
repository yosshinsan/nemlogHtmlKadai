$(function(){

    $('.yoshi-isClickedIcon').click(function(){      
        const selectedIconAttr = 'icon: lock; ratio: 2';
        const notselectedIconAttr = 'icon: unlock; ratio: 2'
        
        let currentIcon = $(this).attr('uk-icon');
        $(this).removeAttr("uk-icon");
        
        if(currentIcon == selectedIconAttr){
            $(this).attr({'uk-icon':'icon: unlock; ratio: 2'});
        }else{
            $(this).attr({'uk-icon':'icon: lock; ratio: 2'});
        }
    });

});
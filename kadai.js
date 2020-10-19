$(function(){

    $('.yoshi-isClickedIcon').click(function(){      
        
        //アイコンの切り替え
        const selectedIconAttr = 'icon: lock; ratio: 2';
        const notselectedIconAttr = 'icon: unlock; ratio: 2'
        
        let currentIcon = $(this).attr('uk-icon');
        $(this).removeAttr("uk-icon");
        
        if(currentIcon == selectedIconAttr){
            $(this).attr({'uk-icon':'icon: unlock; ratio: 2'});
        }else{
            $(this).attr({'uk-icon':'icon: lock; ratio: 2'});
        }

        //Clickedのカウント
        let currentClicked = Number($('#clicked_counter').text());
        currentClicked +=1;
        $('#clicked_counter').text(currentClicked);
        //let animationClass = 'uk-animation-shake'
        //$('#clicked_counter').removeClass(animationClass).addClass(animationClass);
        $('#clicked_counter').addClass('uk-animation-shake');
        
    });

});
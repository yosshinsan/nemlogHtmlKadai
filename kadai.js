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

        //アニメーションクラスの付加
        let animationClass = 'uk-animation-shake';
        $('#clicked_counter').addClass(animationClass);
        //addClass()の後にremoveClass()を実行するとアニメーションが効かないため
        //時間をおいてからremoveClass()を実施する
        setTimeout(function(){
            $('#clicked_counter').removeClass(animationClass);
        },100);
       
    });

});
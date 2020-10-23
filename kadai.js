$(function(){

    //ゲーム中か判断するフラグ
    let isGameRunning = false;
    //時間計測用のタイマー
    let coutupTimer;
    //ロック/アンロックのアイコン属性
    const lockedIconAttr = 'icon: lock; ratio: 2';
    const unlockedIconAttr = 'icon: unlock; ratio: 2';
    //ロック/アンロックの色
    const lockedColor = 'red';
    const unlockedColor = 'white';

    //はじめに実施する処理
    resetCells();
    
    //時間計測用のタイマーを起動する
    function startCountupTimer(){       
        let sec = 0;
        countupTimer = setInterval(function() {
            // カウントアップ
            sec += 1;       
            $('#yoshi_clicked_timer').html(sec);
        },1000);
    }
    
    //時間計測用のタイマーをとめる
    function stopCountUpTimer(){
        clearInterval(countupTimer);
    }

    //ゲームの開始状態にリセットする
    function gameReset(){
        isGameRunning = false;
        stopCountUpTimer();
        $('#yoshi_clicked_counter').html('0');
        $('#yoshi_clicked_timer').html('0');
        resetCells();
    }

    //セルの状態をリセットする
    function resetCells(){
        $('#yoshi_cell_1').css('background-color',lockedColor).attr({'uk-icon':lockedIconAttr});
        $('#yoshi_cell_2').css('background-color',lockedColor).attr({'uk-icon':lockedIconAttr});
        $('#yoshi_cell_3').css('background-color',lockedColor).attr({'uk-icon':lockedIconAttr});
        $('#yoshi_cell_4').css('background-color',lockedColor).attr({'uk-icon':lockedIconAttr});
        $('#yoshi_cell_5').css('background-color',lockedColor).attr({'uk-icon':lockedIconAttr});
        $('#yoshi_cell_9').css('background-color',lockedColor).attr({'uk-icon':lockedIconAttr});
        $('#yoshi_cell_10').css('background-color',lockedColor).attr({'uk-icon':lockedIconAttr});
        $('#yoshi_cell_11').css('background-color',lockedColor).attr({'uk-icon':lockedIconAttr});
        $('#yoshi_cell_12').css('background-color',lockedColor).attr({'uk-icon':lockedIconAttr});
        $('#yoshi_cell_15').css('background-color',lockedColor).attr({'uk-icon':lockedIconAttr});
        $('#yoshi_cell_16').css('background-color',lockedColor).attr({'uk-icon':lockedIconAttr});
    }

    //鍵マークのクリックイベント
    $('.yoshi-isClickedIcon').click(function(){      
    
        //タイマーの起動
        if(!isGameRunning){
            isGameRunning = true;
            startCountupTimer();
        }
        
        //アイコンの切り替え     
        let currentIcon = $(this).attr('uk-icon');
        $(this).removeAttr("uk-icon");
        if(currentIcon == lockedIconAttr){
            $(this).attr({'uk-icon':unlockedIconAttr});
            $(this).css('background-color',unlockedColor);
        }else{
            $(this).attr({'uk-icon':lockedIconAttr});
            $(this).css('background-color',lockedColor);
        }

        //Clickedのカウント
        let currentClicked = Number($('#yoshi_clicked_counter').text());
        currentClicked +=1;
        $('#yoshi_clicked_counter').html(currentClicked);

        //アニメーションクラスの付加
        let animationClass = 'uk-animation-shake';
        $('#yoshi_clicked_counter').addClass(animationClass);
        //addClass()の後にremoveClass()を実行するとアニメーションが効かないため
        //時間をおいてからremoveClass()を実施する
        setTimeout(function(){
            $('#yoshi_clicked_counter').removeClass(animationClass);
        },100);
       
        //クリックしたセルの四方のセル状態をチェンジ
        let thisCellNumber = $(this).attr('cellNumber');
        paintCells(thisCellNumber);
        
        //クリアチェック
        //クリック回数のテキストが-1でとれてしまうため、時間をおいてからチェックを行う
        setTimeout(function(){
            if(isCleared()){
                let clickedNum = Number($('#yoshi_clicked_counter').text());
                let clickedTime = $('#yoshi_clicked_timer').text();
                alert('congulatuations\n(result)\nclicked : ' + clickedNum + '\ntime : ' + clickedTime+'sec');
                gameReset();
            }
        },100);

    });

    //GiveUpボタンクリックイベント
    $('#yoshi_give_up').click(function(){       
        if(isGameRunning){
            gameReset();
            alert('canceled the game');
        }else{
            alert('Please Start the game');
        }
    })

    //四方のセル状態をチェンジsする
    function paintCells(clickedCellNumber){      
        let numericClickedCellNumber = Number(clickedCellNumber);
        let numericClickedRowNumver = Math.ceil(numericClickedCellNumber/4);

        //四方のセル番号を取得
        //[左隣,右隣,上,下]
        let targetCellNumbers = new Array(); 
        let leftCellNumber = Number(numericClickedCellNumber - 1);
        let rightCellNumber =  Number(numericClickedCellNumber + 1);
        let topCellNumber = Number(numericClickedCellNumber - 4);
        let underCellNumber = Number(numericClickedCellNumber + 4);       
        
        //左右は同じ行場合であれば色チェンジ対象
        if(Math.ceil(leftCellNumber/4) == numericClickedRowNumver){
            targetCellNumbers.push(leftCellNumber);
        }
        if(Math.ceil(rightCellNumber/4) == numericClickedRowNumver){
            targetCellNumbers.push(rightCellNumber);
        }
        targetCellNumbers.push(topCellNumber);
        targetCellNumbers.push(underCellNumber);
        
        //アイコン/色の切り替え
        for(let i=0; i<targetCellNumbers.length; i++){
            let targetCell = $('span[cellNumber="' + targetCellNumbers[i] + '"]');    
            let currentIcon = targetCell.attr('uk-icon');            
            if(currentIcon == lockedIconAttr){
                targetCell.attr({'uk-icon':unlockedIconAttr });
                targetCell.css('background-color',unlockedColor);
            }else{
                targetCell.attr({'uk-icon':lockedIconAttr});
                targetCell.css('background-color',lockedColor);
            }          
        }
    }

    //クリアしたかチェック
    function isCleared(){
        let result = true;
        $('.yoshi-isClickedIcon').each(function(){
            let currentIcon = $(this).attr('uk-icon');            
            if(currentIcon == lockedIconAttr){
                result = false;
                return false;
            }   
        });
        return result;
    }
})
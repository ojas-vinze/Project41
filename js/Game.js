class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        player1 = createSprite(200,500);
        player1.addImage("player1",player_img);
        
        player2 = createSprite(800,500);
        player2.addImage("player2", player_img);
        players=[player1,player2];
    }
    
    play(){
        
        form.hide();        
        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        fill("red");
        textSize(20);
        text("First one to score 20 will be the winner!!",280,50);
        var x =100;
        var y=200;
        var index =0;
        var disp_name=0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;

            if(index === player.index){   
                fill("black");
                textSize(25);
                text(allPlayers[plr].name ,x-25,y+25); 
            }
           
            // Add code to diplay the scores of both 
            // the players on the screen
            textSize(20);
            fill("white");
            disp_name += 50;
            text(allPlayers[plr].name + " : "+ allPlayers[plr].score,50,disp_name);


        }

        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 10
            player.update();
        }
        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.distance += 10
            player.update();
        }
    
        if (frameCount % 20 === 0) {
            fruits = createSprite(random(100, 1000), 0, 100, 100);
            fruits.velocityY = 6;
            var rand = Math.round(random(1,5));
            switch(rand){
                case 1: fruits.addImage("fruit1",fruit1_img);
                break;
                case 2: fruits.addImage("fruit1", fruit2_img);
                break;
                case 3: fruits.addImage("fruit1", fruit3_img);
                break;
                case 4: fruits.addImage("fruit1", fruit4_img);
                break;
                case 5: fruits.addImage("fruit1", fruit5_img);
                break;
            }
            fruitGroup.add(fruits);

            

            if(player.index!==null){
                for(var i=0; i<fruitGroup.length; i++){
                    if (fruitGroup.get(i).isTouching(players[player.index-1])) {
                        fruitGroup.get(i).destroy();
                        player.score = player.score+1;
                        player.update();
                    }
                }
            }
        }

        if(player.score>=20){
            gameState=2;
            game.update(2);
            basket20++;
            basketFull++;
            player.rank=basket20;
            player.update();
            player.updateBasketAt20(basketFull);            
        }

    }

    end(){
        form.hide();
        image(celebrateimg,0,0,1000,800);

        fill("blue");
        textSize(70);
        strokeWeight(6);
        stroke("red");
        text("Game Over!!",350,100);

        strokeWeight(3);
        stroke("black");
        textSize(40);
        text("And the winner is: ",350,200);

        Player.getPlayerInfo();
        if(allPlayers!==undefined){
            fill("black");
            textSize(30);
            for(var plr in allPlayers){
                if(allPlayers[plr].score===20){
                    text(allPlayers[plr].name,500,300)
                }
            }
        }
    }

    leaderboard(){
        // background(celebrateimg);
        // Player.getPlayerInfo();
        // if(allPlayers !== undefined){
        //   fill("black");
        //   textSize(30);
        //   for(var plr in allPlayers){
        //     console.log(allPlayers[plr].rank);
        //     text(allPlayers[plr].rank + allPlayers[plr].name,500,200);
        //   }
        // }
    }
}

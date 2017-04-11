game.newLoopFromConstructor('game', function () {

    var width = game.getWH().w;
    var height = game.getWH().h;




    var map = {
        width: 50,
        height: 30,
        source: [
            '0                                                                                      0',
            '9                                                                                      9',
            '9                                                                                      9',
            '9                                                                                      9',
            '9                                                                                      9',
            '9                                                                                      9',
            '9                                                                                      9',
            '9                                                                                      9',
            '9                                                L                                     9',
            '9       |                        |                          |                       |  9',
            '9    00000000               0000000000           000000000000000000000            000009',
            '9                                                                                      9',
            '9                                                                                      9',
            '9                                                                                      9',
            '9               H                                                                      9',
            '9                    |                      |                              |           9',
            '9               0000000000               000000                         0000000        9',
            '9                                                                                      9',
            '9                                                                                      9',
            '9                                                                                      9',
            '9                                                                                      9',
            '9                                                                                 000009',
            '9                                                                   ||                 9',
            '9                            0000000            000000            W9009W               9',
            '9                            9999999            0    0            W9  9W               9',
            '9                            9999999            0    0            W9  9W               9',
            '9          K        P        9999999C           0    0            W9  9W        |||||| 9',
            '9         0     0000         9999999            0    0            W9  9W        |||||| 9',
            '9000000000000000000000000000000000000000000000000000000000000000000000000000000000000009',
            '9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999'
        ]
    };



    var positionChicken = false;
    var positionPig = false;
    var positionCow = false;
    var positionHare = false;
    var positionLamb = false;

    var object = [];
    var walls = [];
    var gold = [];
    var waters = [];


        OOP.forArr(map.source, function (string, Y) {
            OOP.forArr(string, function (symbol, X) {


                if (!symbol || symbol == '') {
                    return;
                }

                if (symbol == 'K') {
                    positionChicken = point(map.width * X, map.height * Y);
                }

                if (symbol == 'P') {
                    positionPig = point(map.width * X, map.height * Y);
                }

                if (symbol == 'C') {
                    positionCow = point(map.width * X, map.height * Y);
                }

                if (symbol == 'H') {
                    positionHare = point(map.width * X, map.height * Y);
                }

                if (symbol == 'L') {
                    positionLamb = point(map.width * X, map.height * Y);
                }

                if (symbol == '0') {
                    object.push(game.newImageObject({
                        w: map.width, h: map.height,
                        x: map.width * X, y: map.height * Y,
                        file: "Image/grass.png"
                    }));
                }

                if (symbol == '9') {
                    object.push(game.newImageObject({
                        w: map.width, h: map.height,
                        x: map.width * X, y: map.height * Y,
                        file: "Image/ground.png"
                    }));
                }

                if (symbol == 'W') {
                    waters.push(game.newRectObject({
                        w : map.width, h : map.height,
                        x : map.width*X, y : map.height*Y,
                        fillColor : '#084379',
                        alpha : 0.5
                    }));
                }

                if (symbol == 'Q') {
                    walls.push(game.newImageObject({
                        w: map.width, h: map.height,
                        x: map.width * X, y: map.height * Y,
                        file: "Image/004.png",
                        userData: {
                            hp: 5
                        }
                    }));
                }

                if (symbol == '|') {
                    gold.push(game.newAnimationObject({
                        w: map.width, h: map.height,
                        x: map.width * X, y: map.height * Y,
                        animation: pjs.tiles.newAnimation('Image/money.png', 127, 132, 7),
                        userData : {
                            active : true
                        }
                    }));
                }

            });
        });


    var hero = game.newAnimationObject({
        w: 90, h: 90,
        x: 50, y: 565,
        animation: pjs.tiles.newAnimation('Image/Hero/HeroStandR.png', 120, 112, 7),
        visible: true
    });

    var hero2 = game.newAnimationObject({
        w: 90, h: 90,
        x: 50, y: 565,
        animation: pjs.tiles.newAnimation('Image/Hero/HeroRunR.png', 120, 112, 7),
        userData: {
            hp: 1
        },
        visible: false
    });

    var hero3 = game.newAnimationObject({
        w: 90, h: 90,
        x: 50, y: 565,
        animation: pjs.tiles.newAnimation('Image/Hero/HeroRunL.png', 120, 112, 7),
        visible: false
    });

    var hero4 = game.newAnimationObject({
        w: 90, h: 90,
        x: 50, y: 565,
        animation: pjs.tiles.newAnimation('Image/Hero/HeroStandL.png', 120, 112, 7),
        visible: false
    });



    var group = game.newMesh({
        add: [hero, hero2, hero3, hero4]
    });

    var pig = [];
    for(var pigNumber = 0; pigNumber < 1; pigNumber++) {
        pig.push(game.newAnimationObject({
            w: 105, h: 60,
            animation: pjs.tiles.newAnimation('Image/Enemies/PigR.png', 84, 76, 5),
            userData: {
                life: true,
                hp: 2
            },
            position : positionPig ? positionPig : point(0, 0)
        }));
    }

    var pig2 = [];
    for(var pigNumber2 = 0; pigNumber2 < 1; pigNumber2++) {
        pig2.push(game.newAnimationObject({
            w: 105, h: 60,
            animation: pjs.tiles.newAnimation('Image/Enemies/PigL.png', 84, 76, 5),
            userData: {
                life: true,
                hp: 2
            },
            position : positionPig ? positionPig : point(0, 0)
        }));
    }


    var chicken = [];
    for(var i = 0; i < 1; i++) {
        chicken.push(game.newAnimationObject({
            w: 82, h: 65,
            animation: pjs.tiles.newAnimation('Image/Enemies/ChickenR.png', 82, 82, 4),
            userData: {
                life: true,
                hp: 1
            },
            position : positionChicken ? positionChicken : point(0, 0)
        }));
    }

    var chicken2 = [];
    for(var j = 0; j < 1; j++) {
        chicken2.push(game.newAnimationObject({
            w: 82, h: 65,
            animation: pjs.tiles.newAnimation('Image/Enemies/ChickenL.png', 82, 82, 4),
            userData: {
                life: true,
                hp: 1
            },
            position : positionChicken ? positionChicken : point(0, 0)
        }));
    }


    var cow = [];
    for(var cowNumber = 0; cowNumber < 1; cowNumber++) {
        cow.push(game.newAnimationObject({
            w: 84, h: 70,
            animation: pjs.tiles.newAnimation('Image/Enemies/CowR.png', 84, 70, 5),
            userData: {
                life: true,
                hp: 1
            },
            position : positionCow ? positionCow : point(0, 0)
        }));
    }

    var cow2 = [];
    for(var cowNumber2 = 0; cowNumber2 < 1; cowNumber2++) {
        cow2.push(game.newAnimationObject({
            w: 84, h: 70,
            animation: pjs.tiles.newAnimation('Image/Enemies/CowL.png', 84, 70, 5),
            userData: {
                life: true,
                hp: 1
            },
            position : positionCow ? positionCow : point(0, 0)
        }));
    }


    var hare = [];
    for(var hareNumber = 0; hareNumber < 1; hareNumber++) {
        hare.push(game.newAnimationObject({
            w: 80, h: 70,
            animation: pjs.tiles.newAnimation('Image/Enemies/HareR.png', 80, 70, 5),
            userData: {
                life: true,
                hp: 1
            },
            position : positionHare ? positionHare : point(0, 0)
        }));
    }

    var hare2 = [];
    for(var hareNumber2 = 0; hareNumber2 < 1; hareNumber2++) {
        hare2.push(game.newAnimationObject({
            w: 80, h: 70,
            animation: pjs.tiles.newAnimation('Image/Enemies/HareL.png', 80, 70, 5),
            userData: {
                life: true,
                hp: 1
            },
            position : positionHare ? positionHare : point(0, 0)
        }));
    }


    var lamb = [];
    for(var lambNumber = 0; lambNumber < 1; lambNumber++) {
        lamb.push(game.newAnimationObject({
            w: 85, h: 70,
            animation: pjs.tiles.newAnimation('Image/Enemies/LambR.png', 85, 70, 4),
            userData: {
                life: true,
                hp: 1
            },
            position : positionLamb ? positionLamb : point(0, 0)
        }));
    }

    var lamb2 = [];
    for(var lambNumber2 = 0; lambNumber2 < 1; lambNumber2++) {
        lamb2.push(game.newAnimationObject({
            w: 85, h: 70,
            animation: pjs.tiles.newAnimation('Image/Enemies/LambL.png', 85, 70, 4),
            userData: {
                life: true,
                hp: 1
            },
            position : positionLamb ? positionLamb : point(0, 0)
        }));
    }


    var bullet = game.newCircleObject({
        x:0 , y:0,
        radius: 5,
        fillColor: "#ff8000",
        userData: {
            life: false,
            speed: 0
        }
    });




    hero2.gr = 0.5;
    hero2.speed = point(0, 0);
    var flag;

    chicken[0].speed = point(0, 0);
    chicken2[0].speed = point(0, 0);
    pig[0].speed = point(0, 0);
    pig2[0].speed = point(0, 0);
    cow[0].speed = point(0, 0);
    cow2[0].speed = point(0, 0);
    hare[0].speed = point(0, 0);
    hare2[0].speed = point(0, 0);
    lamb[0].speed = point(0, 0);
    lamb2[0].speed = point(0, 0);




    this.update = function () {
        game.clear();

        group.draw();

        for(i in chicken) {
            if(!chicken[i].isInCameraStatic()) continue;
            chicken[i].draw();
        }

        for(j in chicken2) {
            if(!chicken2[j].isInCameraStatic()) continue;
            chicken2[j].draw();
        }

        for(pigNumber in pig) {
            if(!pig[pigNumber].isInCameraStatic()) continue;
            pig[pigNumber].draw();
        }

        for(pigNumber2 in pig2) {
            if(!pig2[pigNumber2].isInCameraStatic()) continue;
            pig2[pigNumber2].draw();
        }

        for(cowNumber in cow) {
            if(!cow[cowNumber].isInCameraStatic()) continue;
            cow[cowNumber].draw();
        }

        for(cowNumber2 in cow2) {
            if(!cow2[cowNumber2].isInCameraStatic()) continue;
            cow2[cowNumber2].draw();
        }

        for(hareNumber in hare) {
            if(!hare[hareNumber].isInCameraStatic()) continue;
            hare[hareNumber].draw();
        }

        for(hareNumber2 in hare2) {
            if(!hare2[hareNumber2].isInCameraStatic()) continue;
            hare2[hareNumber2].draw();
        }

        for(lambNumber in lamb) {
            if(!lamb[lambNumber].isInCameraStatic()) continue;
            lamb[lambNumber].draw();
        }

        for(lambNumber2 in lamb2) {
            if(!lamb2[lambNumber2].isInCameraStatic()) continue;
            lamb2[lambNumber2].draw();
        }


        hero2.speed.y += hero2.gr;




        if(key.isDown('RIGHT')) {
            hero2.speed.x = 4;
            flag = false;
            hero.setVisible(false);
            hero3.setVisible(false);
            hero4.setVisible(false);
            hero2.setVisible(true);
        } else if(key.isDown('LEFT')) {
            hero2.speed.x = -4;
            flag = true;
            hero.setVisible(false);
            hero2.setVisible(false);
            hero4.setVisible(false);
            hero3.setVisible(true);

        } else if(flag) {
            hero2.speed.x = 0;
            flag = true;
            hero.setVisible(false);
            hero2.setVisible(false);
            hero3.setVisible(false);
            hero4.setVisible(true);
        } else {
            hero2.speed.x = 0;
            flag = false;
            hero2.setVisible(false);
            hero3.setVisible(false);
            hero4.setVisible(false);
            hero.setVisible(true);
        }


        if(key.isDown('E') && !bullet.life) {
            bullet.setPosition(hero2.getPosition(2));
            bullet.life = true;
            bullet.setAngle(hero2.getAngle());
        }

        if(bullet.life) {
            bullet.moveAngle(5);
            bullet.draw();
            if(!bullet.isInCameraStatic()) {
                bullet.life = false;
            }
        }

        if(hero2.hp < 1) {
            brush.drawTextS({
                text : "Game over",
                size : 100,
                color : '#ed2313',
                strokeColor : '#002C5D',
                strokeWidth : 1,
                x : (width/2) - 250, y : (height/2) - 50,
                style : 'bold'
            });

            game.setLoop('pause');
            pjs.camera.setPosition(point(0, 0));
        }

        if(chicken[0].x === positionChicken.x  && chicken[0].life && chicken2[0].life) {
            chicken[0].speed.x = 1;
            chicken2[0].speed.x = 1;
            chicken[0].setVisible(true);
            chicken2[0].setVisible(false);
        } else if(chicken[0].x === positionChicken.x + 180 && chicken[0].life && chicken2[0].life) {
            chicken2[0].speed.x = -1;
            chicken[0].speed.x = -1;
            chicken[0].setVisible(false);
            chicken2[0].setVisible(true);
        } else if(!chicken[0].life && !chicken2[0].life) {
            chicken2[0].speed.x = 0;
            chicken[0].speed.x = 0;
            chicken[0].setVisible(false);
            chicken2[0].setVisible(false);
        }

        var z;
        for(z in chicken) {
            if(!chicken[z]) {
                continue;
            }
            if(!chicken[z].isInCamera()) {
                continue;
            }
            if(chicken[z].hp < 1 && chicken[z].life && chicken2[0].life) {
                chicken[z].life = false;
                chicken2[z].life = false;
                hero2.speed.y = -10;
                score++;
            }
            if(chicken[z].isStaticIntersect(hero2.getStaticBox()) && (chicken[z].y - chicken[z].h/1.5) > hero2.y) {
                chicken[z].hp -= 1;
            } else if(chicken[z].isStaticIntersect(hero2.getStaticBox()) && chicken[z].life) {
                hero2.hp -= 1;
            }
        }

        for(var pigN = 0; pigN < 1; pigN++) {
            if (pig[pigN].x === positionPig.x && pig[pigN].life && pig2[pigN].life) {
                pig[pigN].speed.x = 2;
                pig2[pigN].speed.x = 2;
                pig[pigN].setVisible(true);
                pig2[pigN].setVisible(false);
            } else if (pig[0].x === positionPig.x + 330 && pig[0].life && pig2[0].life) {
                pig2[0].speed.x = -2;
                pig[0].speed.x = -2;
                pig[0].setVisible(false);
                pig2[0].setVisible(true);
            } else if (!pig[pigN].life && !pig2[pigN].life) {
                pig2[pigN].speed.x = 0;
                pig[pigN].speed.x = 0;
                pig[pigN].setVisible(false);
                pig2[pigN].setVisible(false);
            }
        }

        var pigC;
        for(pigC in pig) {
            if(!pig[pigC]) {
                continue;
            }
            if(!pig[pigC].isInCamera()) {
                continue;
            }
            if(pig[pigC].hp < 1 && pig[pigC].life && pig2[pigC].life) {
                pig[pigC].life = false;
                pig2[pigC].life = false;
                hero2.speed.y = -10;
                score++;
            }
            if(pig[pigC].isStaticIntersect(hero2.getStaticBox()) && (pig[pigC].y - pig[pigC].h/1.5) > hero2.y) {
                pig[pigC].hp -= 1;
            } else if(pig[pigC].isStaticIntersect(hero2.getStaticBox()) && pig[pigC].life) {
                hero2.hp -= 1;
            }
        }

        if(cow[0].x === positionCow.x  && cow[0].life && cow2[0].life) {
            cow[0].speed.x = 2;
            cow2[0].speed.x = 2;
            cow[0].setVisible(true);
            cow2[0].setVisible(false);
        } else if(cow[0].x === positionCow.x + 500 && cow[0].life && cow2[0].life) {
            cow2[0].speed.x = -2;
            cow[0].speed.x = -2;
            cow[0].setVisible(false);
            cow2[0].setVisible(true);
        } else if(!cow[0].life && !cow2[0].life) {
            cow2[0].speed.x = 0;
            cow[0].speed.x = 0;
            cow[0].setVisible(false);
            cow2[0].setVisible(false);
        }

        var cowC;
        for(cowC in cow) {
            if(!cow[cowC]) {
                continue;
            }
            if(!cow[cowC].isInCamera()) {
                continue;
            }
            if(cow[cowC].hp < 1 && cow[cowC].life && cow2[0].life) {
                cow[cowC].life = false;
                cow2[cowC].life = false;
                hero2.speed.y = -10;
                score++;
            }
            if(cow[cowC].isStaticIntersect(hero2.getStaticBox()) && (cow[cowC].y - cow[cowC].h/1.5) > hero2.y) {
                cow[cowC].hp -= 1;
            } else if(cow[cowC].isStaticIntersect(hero2.getStaticBox()) && cow[cowC].life) {
                hero2.hp -= 1;
            }
        }


        if(hare[0].x === positionHare.x  && hare[0].life && hare2[0].life) {
            hare[0].speed.x = 3;
            hare2[0].speed.x = 3;
            hare[0].setVisible(true);
            hare2[0].setVisible(false);
        } else if(hare[0].x === positionHare.x + 420 && hare[0].life && hare2[0].life) {
            hare2[0].speed.x = -3;
            hare[0].speed.x = -3;
            hare[0].setVisible(false);
            hare2[0].setVisible(true);
        } else if(!hare[0].life && !hare2[0].life) {
            hare2[0].speed.x = 0;
            hare[0].speed.x = 0;
            hare[0].setVisible(false);
            hare2[0].setVisible(false);
        }

        var hareC;
        for(hareC in hare) {
            if(!hare[hareC]) {
                continue;
            }
            if(!hare[hareC].isInCamera()) {
                continue;
            }
            if(hare[hareC].hp < 1 && hare[hareC].life && hare2[0].life) {
                hare[hareC].life = false;
                hare2[hareC].life = false;
                hero2.speed.y = -10;
                score++;
            }
            if(hare[hareC].isStaticIntersect(hero2.getStaticBox()) && (hare[hareC].y - hare[hareC].h/1.5) > hero2.y) {
                hare[hareC].hp -= 1;
            } else if(hare[hareC].isStaticIntersect(hero2.getStaticBox()) && hare[hareC].life) {
                hero2.hp -= 1;
            }
        }


        if(lamb[0].x === positionLamb.x  && lamb[0].life && lamb2[0].life) {
            lamb[0].speed.x = 2;
            lamb2[0].speed.x = 2;
            lamb[0].setVisible(true);
            lamb2[0].setVisible(false);
        } else if(lamb[0].x === positionLamb.x + 950 && lamb[0].life && lamb2[0].life) {
            lamb2[0].speed.x = -2;
            lamb[0].speed.x = -2;
            lamb[0].setVisible(false);
            lamb2[0].setVisible(true);
        } else if(!lamb[0].life && !lamb2[0].life) {
            lamb2[0].speed.x = 0;
            lamb[0].speed.x = 0;
            lamb[0].setVisible(false);
            lamb2[0].setVisible(false);
        }


        var lambC;
        for(lambC in lamb) {
            if(!lamb[lambC]) {
                continue;
            }
            if(!lamb[lambC].isInCamera()) {
                continue;
            }
            if(lamb[lambC].hp < 1 && lamb[lambC].life && lamb2[0].life) {
                lamb[lambC].life = false;
                lamb2[lambC].life = false;
                hero2.speed.y = -10;
                score++;
            }
            if(lamb[lambC].isStaticIntersect(hero2.getStaticBox()) && (lamb[lambC].y - lamb[lambC].h/1.5) > hero2.y) {
                lamb[lambC].hp -= 1;
            } else if(lamb[lambC].isStaticIntersect(hero2.getStaticBox()) && lamb[lambC].life) {
                hero2.hp -= 1;
            }
        }

        OOP.drawArr(object, function (el) {
            if(el.isInCameraStatic()) {
                if(el.isStaticIntersect(hero)) {

                    if(hero2.x + hero2.w > el.x + el.w / 4 && hero2.x < el.x + el.w - el.w / 4) {
                        if (hero2.speed.y > 0 && hero2.y + hero2.h < el.y + el.h / 2) {
                            if (key.isDown('UP')) {
                                hero2.speed.y = -15;
                            } else {
                                hero2.y = el.y - hero2.h;
                                hero2.speed.y *= -0.3;
                                if(hero2.speed.y > -0.3) {
                                    hero2.speed.y = 0;
                                }
                            }
                        } else if (hero2.speed.y < 0 && hero2.y > el.y + el.h / 2) {
                            hero2.y = el.y + el.h;
                            hero2.speed.y = 0;
                        } else if (hero2.speed.y > 0 && hero2.y < el.y + el.h / 2) {
                            hero2.y = el.y - hero2.h;
                            hero2.speed.y = 0;
                        }
                    }

                    if(hero2.y + hero2.h > el.y + el.h / 4 && hero2.y < el.y + el.h - el.h / 4) {
                        if (hero2.speed.x > 0 && hero2.x + hero2.w < el.x + el.w / 2) {
                            hero2.x = el.x - hero2.w;
                            hero2.speed.x = -0.1;
                        }

                        if (hero2.speed.x < 0 && hero2.x > el.x + el.w / 2) {
                            hero2.x = el.w + el.x;
                            hero2.speed.x = 0;
                        }


                    }
                }
            }
        });


        OOP.drawArr(walls, function (el) {
            if(el.isInCameraStatic()) {
                if(el.isStaticIntersect(hero)) {

                    if(hero2.x + hero2.w > el.x + el.w / 4 && hero2.x < el.x + el.w - el.w / 4) {
                        if (hero2.speed.y > 0 && hero2.y + hero2.h < el.y + el.h / 2) {
                            if (key.isDown('UP')) {
                                hero2.speed.y = -10;
                            } else {
                                hero2.y = el.y - hero2.h;
                                hero2.speed.y *= -0.3;
                                if(hero2.speed.y > -0.3) {
                                    hero2.speed.y = 0;
                                }
                            }
                        } else if (hero2.speed.y < 0 && hero2.y > el.y + el.h / 2) {
                            hero2.y = el.y + el.h;
                            hero2.speed.y *= -0.1;
                        } else if (hero2.speed.y > 0 && hero2.y < el.y + el.h / 2) {
                            hero2.y = el.y - hero2.h;
                            hero2.speed.y = 0;
                        }
                    }

                    if(hero2.y + hero2.h > el.y + el.h / 4 && hero2.y < el.y + el.h - el.h / 4) {
                        if (hero2.speed.x > 0 && hero2.x + hero2.w < el.x + el.w / 2) {
                            hero2.x = el.x - hero2.w;
                            hero2.speed.x = 0;
                        }

                        if (hero2.speed.x < 0 && hero2.x > el.x + el.w / 2) {
                            hero2.x = el.w + el.x;
                            hero2.speed.x = 0;
                        }


                    }
                }
            }

            var i;
            for(i in walls) {
                if(!walls[i]) {
                    continue;
                }
                if(!walls[i].isInCamera()) {
                    continue;
                }
                if(walls[i].hp < 1) {
                    walls.splice(i, 1);
                }
                if(bullet.life && walls[i].isStaticIntersect(bullet.getStaticBox())) {
                    bullet.life = false;
                    walls[i].hp -= 1;
                }
            }
        });

        var onWater = false;

        OOP.drawArr(waters, function (water) {
            if (onWater) return;

            if (water.isStaticIntersect(hero2) && hero2.y+hero2.h/2 > water.y) {
                hero2.speed.y -= 0.9;
                onWater = true;
            }
        });



        OOP.drawArr(gold, function (el) {
            if(el.isInCameraStatic()) {
                if(el.active) {
                    if (el.isStaticIntersect(hero2)) {
                        el.active = false;
                        el.fillColor = '#47476b';
                        score++;
                    }
                } else {
                    el.setVisible(false);
                }
            }
        });





        if(hero2.speed.y) {
            hero2.y += hero2.speed.y;
            hero.y += hero2.speed.y;
            hero3.y += hero2.speed.y;
            hero4.y += hero2.speed.y;
        }

        if(hero2.speed.x) {
            hero2.x += hero2.speed.x;
            hero.x += hero2.speed.x;
            hero3.x += hero2.speed.x;
            hero4.x += hero2.speed.x;
        }

        if(chicken[0].speed.x) {
            chicken[0].x += chicken[0].speed.x;
        }

        if(chicken2[0].speed.x) {
            chicken2[0].x += chicken2[0].speed.x;
        }


        for(var pigI = 0; pigI < 1; pigI++) {
            if (pig[pigI].speed.x) {
                pig[pigI].x += pig[pigI].speed.x;
            }


            if (pig2[pigI].speed.x) {
                pig2[pigI].x += pig2[pigI].speed.x;
            }
        }

            if (cow[0].speed.x) {
                cow[0].x += cow[0].speed.x;
            }


        if(cow2[0].speed.x) {
            cow2[0].x += cow2[0].speed.x;
        }

        if(hare[0].speed.x) {
            hare[0].x += hare[0].speed.x;
        }

        if(hare2[0].speed.x) {
            hare2[0].x += hare2[0].speed.x;
        }

        if(lamb[0].speed.x) {
            lamb[0].x += lamb[0].speed.x;
        }

        if(lamb2[0].speed.x) {
            lamb2[0].x += lamb2[0].speed.x;
        }



        brush.drawTextS({
            text : 'Score: '+ score,
            size : 30,
            color : '#FFFFFF',
            strokeColor : '#002C5D',
            strokeWidth : 1,
            x : 10, y : 10,
            style : 'bold'
        });

        camera.follow(hero, 50);
    }
});
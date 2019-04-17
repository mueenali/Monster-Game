new Vue({
    el: "#app",
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        logs:[]
    },
    methods:{
        startGame: function () {
            this.gameReset(true);

        },
        attack:function () {
            if(this.playerDamage(3,10)){
                return;
            }
            this.monsterDamage(5,12);
        }
        ,
        specialAttack: function () {
            if(this.playerDamage(10,20)){
                return;
            }
            this.monsterDamage(5,12);
        }
        ,
        heal:function () {
            let health = this.calculate(5,10);
            this.playerHealth+= health;
            this.log(`Player's health increased by ${health}`,true);
            this.playerHealth > 100? this.playerHealth = 100: this.playerHealth;
            this.monsterDamage(5,10);
        }
        ,
        giveUp:function () {
            this.gameReset(false);
        },
        monsterDamage:function(min,max){
            let damage = this.calculate(min,max);
            this.playerHealth -= damage;
            this.log(`Monster dealt ${damage} damage to player`,false);
            if(this.checkWin('You lost! new game?',this.playerHealth)){
                return true;
            }
        },
        playerDamage: function(min,max){
            let damage = this.calculate(min,max);
            this.monsterHealth -= damage;
            this.log(`Player dealt ${damage} damage to monster`,true);
            if(this.checkWin('You won! new game?',this.monsterHealth)){
                return true;
            }
        },
        calculate: function (min,max) {
            return Math.max(Math.floor(Math.random() * max)+1,min);
        },
        checkWin: function (message,health) {
            if(health <=0){
                if(confirm(message)){
                    this.startGame();
                    return true;
                }
                this.gameReset(false);
                return true;
            }
            return false;

        },
        log:function(message,isTurn){
            this.logs.unshift({
                message,
                playerTurn : isTurn
            });
        },
        gameReset: function (isRunning) {
            this.gameIsRunning = isRunning;
            this.logs = [];
            this.monsterHealth = 100;
            this.playerHealth = 100;
        }
    }
});


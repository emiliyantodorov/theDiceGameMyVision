$(document).ready(function () {
    start();
});

function start() {
    //Variables
    let rollDiceBtn = $(".roll-dice-btn__link");
    let coins = $(".coin");
    let handImgBox = $(".toss-coin-img");
    let startBtnEl = $(".start-btn-box button");
    let sectionTossCoinEl = $(".section-toss-coin");
    let rulesEl = $(".rules-heading");

    rulesEl.on("click", function(event) {
        event.preventDefault();
        event.stopPropagation();

       $("div#myRules").toggle(400);
    });

    startBtnEl.on("click", showTossTheCoinWindow);
    rollDiceBtn.on("click", rollTheDice);


    function showTossTheCoinWindow() {
        startBtnEl.attr("disabled", true);

        sectionTossCoinEl
            .css("opacity", "1")
            .css("display", "flex");

        setTimeout(() => {
            handImgBox
                .css("transform", "translateY(-5rem)")
                .css("opacity", "1");
        }, 500);

        setTimeout(() => {
            coins
                .css("transform", "translateY(-5rem)")
                .css("opacity", "1");
        }, 1200);

        coins.on("click", function (event) {
            let targetEl = $(event.target);
            let randomNumFrom1To2 = randomNumber(2);
            let sectionTossCoin = $(".section-toss-coin");

            targetEl.css("transform", "translateY(-5rem) rotateY(360deg)");

            if (randomNumFrom1To2 === 1) {
                setTimeout(() => {
                    targetEl.text("FIRST :)");
                    $(".p-field--1__frozen-layer").removeClass("frozen");
                    $(".p-field--1__heading span").addClass("red-dot");
                    $(".p-field--2__frozen-layer").addClass("frozen");
                }, 500);
            } else {
                setTimeout(() => {
                    targetEl.text("SECOND :(");
                    $(".p-field--2__frozen-layer").removeClass("frozen");
                    $(".p-field--2__heading span").addClass("red-dot");
                    $(".p-field--1__frozen-layer").addClass("frozen");

                }, 500);
            }

            setTimeout(() => {
                coins.css("opacity", "0")
            }, 2000);

            setTimeout(() => {
                handImgBox
                    .css("opacity", "0")
                    .css("transform", "translateY(5rem)");
            }, 2800);

            setTimeout(() => {
                sectionTossCoin.css("opacity", "0");
            }, 4000);

            setTimeout(() => {
                sectionTossCoin.css("display", "none");
            }, 5000);
        });
    }


    function rollTheDice(event) {
        event.preventDefault();
        event.stopPropagation();

        let currentEl = $(this);
        currentEl.children("");

        let diceImgEl = $(currentEl).parent().siblings(".p-field__dice").children(".p-field__dice--img");
        //Take current points from current player
        let currentPointField = $(event.target).parent().parent().parent().find(".p-field__total-score");
        //Spin the image dice
        rotateSpinnerIcon(currentEl);
        //Take points from the spin dice el
        let currentPoint = randomNumber(6);
        //Change the picture when dice spin
        diceImgEl.attr("src", `images/dice-all-sides/dice-${currentPoint}.png`);
        //Take total points
        let points = +currentPointField.text() + currentPoint;
        //Add total points to he score field of the current player
        currentPointField.text(points);
        //If player hits 20 points he is the winner
        if (points >= 20) {
            showTheWinnerAndEndTheGame(currentEl);
        }

        $(".start-btn").on("click", function () {
            // let targetEl = $(event.target);
            resetGame(currentPointField);
        });

        //If current score = 1 cur player loose all points and its next player turn
        if (currentPoint === 1) {
            whenHitOneFunctionality();
        }
    }

    function resetGame(currentPointField) {
        $(".game-board-layer").css("transform", "scale(0)");
        currentPointField.text("0");
        $(".p-frozen-layer").addClass("frozen");
        $(".section-toss-coin h2").text("WHO WILL BE FIRST ?");
        $(".heads").text("HEADS");
        $(".tails").text("TAILS");

        setTimeout(() => {
            showTossTheCoinWindow();
        }, 1000);


    }

    function showTheWinnerAndEndTheGame(currentElement) {
        let h2El = $("h2");
        let playerHeadingText = currentElement
            .parent()
            .siblings("h3")
            .text()
            .indexOf("1");

        if (playerHeadingText !== -1) {
            h2El.text("Player 1 win");
        } else {
            h2El.text("Player 2 win");
        }

        $(".game-board-layer").css("transform", "scale(1)");
    }

    function whenHitOneFunctionality() {
        let p1field = $(".p-field--1");
        let p2field = $(".p-field--2");
        let p1frozen = $(".p-field--1__frozen-layer");
        let p2frozen = $(".p-field--2__frozen-layer");
        let p1Heading = $(".p-field--1__heading");
        let p2Heading = $(".p-field--2__heading");

        p1field.toggleClass("active-field");
        p2field.toggleClass("active-field");
        p1frozen.toggleClass("frozen");
        p2frozen.toggleClass("frozen");
        p1Heading.children("span").toggleClass("red-dot");
        p2Heading.children("span").toggleClass("red-dot");
    }


    function randomNumber(counter) {
        let points = Math.floor((Math.random() * counter) + 1);

        return points;
    }

    function rotateSpinnerIcon(currentElement) {

        let diceImgEl = $(currentElement).parent().siblings(".p-field__dice").children().first();

        diceImgEl.toggleClass("rotate-item");
    }

}
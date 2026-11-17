
$(function () {

    /* HTML 요소 */
    let vBox = document.querySelector(".video");

    // PC / 모바일 구분
    let isMobile = window.matchMedia("(max-width: 768px)").matches;

    let result = document.querySelector(isMobile ? "#result_m" : "#result");
    let change = document.querySelector(isMobile ? "#chance_m" : "#chance");
    let user = document.querySelector(isMobile ? "#user_m" : "#user");
    let playbtn = document.querySelector(isMobile ? "#play_m" : "#play");
    let resetBtn = document.querySelector(isMobile ? "#reset_m" : "#reset");

    let computerNum;
    let chances = 5;
    let gameStarted = false;
    let gameFinished = false;

    /* 랜덤 숫자 */
    function randomNum() {
        computerNum = Math.floor(Math.random() * 100) + 1;
    }

    /* 게임 초기화 */
    function resetGame() {
        chances = 5;
        randomNum();

        gameFinished = false;

        change.textContent = `CHANCE : ${chances}번`;
        result.textContent = "HEAT : Up / Down / Perfect Heat";

        user.value = "";
        user.disabled = false;
        playbtn.disabled = false;
    }

    /* 영상 변경 */
    function changeVideo(src) {
        vBox.pause();
        vBox.src = src;
        vBox.load();

        let videoPlay = vBox.play();

        if (videoPlay !== undefined) {
            videoPlay.catch(function (error) {
                console.log("영상 재생 오류:", error);
            });
        }
    }

    /* START 버튼 */
    $("#startBtn").on("click", function () {

        $(".bg1").stop(true, true).fadeOut(500, function () {

            $(".bg2").stop(true, true).fadeIn(500);

            resetGame();
            gameStarted = true;

            changeVideo("img/main_v.mp4");
        });

    });

    /* 마우스 */
    $(document).on("mousemove", function (e) {

        $(".cursor").css({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        });

    });

    /* 게임 실행 */
    function play() {

        if (!gameStarted || gameFinished) return;

        let userNum = Number(user.value);

        // 숫자 검사
        if (
            user.value.trim() === "" ||
            !Number.isInteger(userNum) ||
            userNum < 1 ||
            userNum > 100
        ) {
            result.textContent = "1 - 100 사이의 숫자를 입력해주세요!";
            return;
        }

        chances--;

        // UP
        if (computerNum > userNum) {
            result.textContent = "화력을 높이세요 (Up)!";
            changeVideo("img/up_v2.mp4");
        }

        // DOWN
        else if (computerNum < userNum) {
            result.textContent = "화력을 낮추세요 (Down)!";
            changeVideo("img/down_v4.mp4");
        }

        // 정답
        else {
            result.textContent =
                "황금비율 성공! 라면이 완벽하게 익었습니다! (Perfect Heat)!";

            gameFinished = true;
            playbtn.disabled = true;
            user.disabled = true;

            changeVideo("img/finish_v.mp4");
            return;
        }

        // 남은 기회
        change.textContent = `CHANCE : ${chances}번`;

        // 게임 종료
        if (chances === 0) {
            change.textContent = "GAME OVER";
            result.textContent = `적정 화력온도는 ${computerNum}도였습니다!`;

            gameFinished = true;
            playbtn.disabled = true;
            user.disabled = true;

            changeVideo("img/end_v.mp4");
            return;
        }

        user.value = "";
    }

    /* ENTER 버튼 */
    playbtn.addEventListener("click", play);

    /* 엔터키 */
    user.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {
            e.preventDefault();
            play();
        }

    });

    /* 입력창 클릭 */
    user.addEventListener("focus", function () {
        user.value = "";
    });

    /* RESTART 버튼 */
    resetBtn.addEventListener("click", function () {

        resetGame();
        gameStarted = true;

        changeVideo("img/main_v.mp4");
    });

});

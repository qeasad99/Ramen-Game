
$(function () {

    /* HTML 요소 */
    let vBox = document.querySelector(".video");

    // PC / 모바일 화면 구분
    let gameBox;

    if (window.matchMedia("(max-width: 768px)").matches) {
        gameBox = document.querySelector(".txt_m");
    } else {
        gameBox = document.querySelector(".txt");
    }

    // 선택한 영역 안에서 요소 찾기
    let result = gameBox.querySelector("#result");
    let change = gameBox.querySelector("#chance");
    let user = gameBox.querySelector("#user");
    let playbtn = gameBox.querySelector("#play");
    let resetBtn = gameBox.querySelector("#reset");

    let computerNum;
    let chances = 5;

    /* 랜덤 숫자 */
    function randomNum() {
        computerNum = Math.floor(Math.random() * 100 + 1);
    }

    /* 영상 변경 */
    function changeVideo(src) {
        vBox.src = src;
        vBox.load();

        vBox.play().catch(function (error) {
            console.log("영상 재생 오류:", error);
        });
    }

    /* START 버튼 클릭 */
    $("#startBtn").click(function () {

        $(".bg1").fadeOut(500, function () {

            $(".bg2").fadeIn(500);

            chances = 5;
            randomNum();

            change.textContent = `CHANCE : ${chances}번`;
            result.textContent = "HEAT : Up / Down / Perfect Heat";

            user.value = "";
            user.disabled = false;
            playbtn.disabled = false;

            changeVideo("img/main_v.mp4");

        });

    });

    /* 마우스 */
    $(document).on("mousemove", function (e) {

        $(".cursor").css({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`,
        });

    });

    /* 게임 실행 */
    function play() {

        let userNum = Number(user.value);

        // 숫자 입력 검사
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

            playbtn.disabled = true;
            user.disabled = true;

            changeVideo("img/finish_v.mp4");
            return;

        }

        // 남은 기회 표시
        change.textContent = `CHANCE : ${chances}번`;

        // 기회 소진
        if (chances === 0) {

            change.textContent = "GAME OVER";
            result.textContent = `적정 화력온도는 ${computerNum} 도 였습니다!`;

            playbtn.disabled = true;
            user.disabled = true;

            changeVideo("img/end_v.mp4");
            return;

        }

        user.value = "";

    }

    /* ENTER 버튼 클릭 */
    playbtn.addEventListener("click", function () {
        play();
    });

    /* 엔터키 입력 */
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

        chances = 5;
        randomNum();

        change.textContent = `CHANCE : ${chances}번`;
        result.textContent = "HEAT : Up / Down / Perfect Heat";

        playbtn.disabled = false;
        user.disabled = false;

        user.value = "";

        changeVideo("img/main_v.mp4");

    });

});

function init() {
  const texts = document.querySelectorAll(".text span");

  const options = {
    slowmo: true,
    duration: !this.slowmo ? 1 : 4,
    pause: 1, //in seconds
    maxExtension: "1.5px",
    minExtension: "-11px",
    fps: 30,
    selectedEase: 1,
    reverseAnim: 6,
    getEasing: function (n) {
      let ease = n ? n : options.selectedEase;
      if (!n) {
        switch (ease) {
          case 1:
            ease = "power1.easeInOut";
            break;
          case 2:
            ease = SteppedEase.config(options.fps);
            break;
          case 3:
            ease = CustomEase.create(
              "custom",
              "M0,0 C0.212,0 0.162,0 0.4,0 0.506,0 0.46,0.356 0.502,0.504 0.551,0.68 0.61,1 0.7,1 0.982,1 0.734,1 1,1 "
            );
            break;
          case 4:
            ease = "power2.in";
            break;
          case 5:
            ease = "power2.out";
            break;
          case 6:
            ease = "power1.inOut";
            break;
        }
      }
      return ease;
    },
  };

  const { duration, pause, maxExtension, minExtension, getEasing } = options;

  // buttons
  const pausePlayBtn = document.getElementById("pause-play");
  const resetBtn = document.getElementById("reset");

  const tl1 = new TimelineMax({
    immediateRender: false,
  });
  const tl2 = new TimelineMax({
    immediateRender: false,
  });
  const tl3 = new TimelineMax({
    immediateRender: false,
    onComplete: loop,
  });

  function animation() {
    const { reverseAnim } = options;
    tl1
      .fromTo(
        texts[0],
        duration,
        {
          letterSpacing: minExtension,
          opacity: 0,
          autoRound: false,
          ease: getEasing(),
          filter: "blur(2px)",
          steps: 5,
        },
        {
          letterSpacing: maxExtension,
          opacity: 1,
          autoRound: false,
          ease: getEasing(),
          filter: "blur(0px)",
        }
      )
      .to(
        texts[0],
        duration,
        {
          letterSpacing: minExtension,
          opacity: 0,
          autoRound: false,
          ease: getEasing(reverseAnim),
          filter: "blur(2px)",
          steps: 5,
        },
        `+=${pause}`
      );
    tl2
      .fromTo(
        texts[1],
        duration,
        {
          letterSpacing: minExtension,
          opacity: 0,
          ease: getEasing(),
          autoRound: false,
          filter: "blur(2px)",
        },
        {
          letterSpacing: maxExtension,
          ease: getEasing(),
          opacity: 1,
          autoRound: false,
          filter: "blur(0px)",
        },
        `+=${duration + pause}`
      )
      .to(
        texts[1],
        duration,
        {
          letterSpacing: minExtension,
          opacity: 0,
          autoRound: false,
          ease: getEasing(reverseAnim),
          filter: "blur(2px)",
          steps: 5,
        },
        `+=${pause}`
      );

    tl3
      .fromTo(
        texts[2],
        duration,
        {
          letterSpacing: minExtension,
          opacity: 0,
          ease: getEasing(),
          autoRound: false,
          filter: "blur(2px)",
        },
        {
          letterSpacing: maxExtension,
          opacity: 1,
          ease: getEasing(),
          autoRound: false,
          filter: "blur(0px)",
        },
        `+=${(duration + pause) * 2}`
      )
      .to(
        texts[2],
        duration,
        {
          letterSpacing: minExtension,
          opacity: 0,
          autoRound: false,
          ease: getEasing(reverseAnim),
          filter: "blur(2px)",
          steps: 5,
        },
        `+=${pause}`
      );
  }

  // animation reverse
  function reverse() {
    const _this = this;
    setTimeout(
      function () {
        _this.reverse();
      },
      pause * 1000,
      _this
    );
  }

  // buttons handlers

  // pause / play
  function pausePlay() {
    console.log(tl1.paused());
    if (tl1.paused()) {
      tl1.resume();
      tl2.resume();
      tl3.resume();
      btnTextUpdate();
    } else {
      tl1.pause();
      tl2.pause();
      tl3.pause();
      btnTextUpdate();
    }
  }
  function reset() {
    tl1.restart();
    tl2.restart();
    tl3.restart();
  }

  function loop() {
    (function () {
      setTimeout(function () {
        reset();
        btnTextUpdate();
      }, 3000);
    })();
  }

  function btnTextUpdate() {
    tl1.paused()
      ? (pausePlayBtn.innerHTML = " play")
      : (pausePlayBtn.innerHTML = "pause");
  }

  pausePlayBtn.addEventListener("click", pausePlay);
  resetBtn.addEventListener("click", reset);
  animation();
}

init();

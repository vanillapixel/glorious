function init() {
  const texts = document.querySelectorAll(".text span");
  const gDiv = document.querySelector(".bottom .left");

  const slowmo = !true;
  const duration = !slowmo ? 1 : 4; //in seconds
  const pause = 1; // in seconds
  const maxExtension = "1.5px";
  const minExtension = "-11px";
  const gTranslate = [73.5, 95.5, 46.4, 0];
  const bezier1 = "M0,0 C0,0 1,1 1,1";
  const bezier2 =
    "M0,0,C0,0,0.038,-0.174,0.116,-0.11,0.35,0.258,0.442,0.27,0.946,0.876,0.988,0.927,1,1,1,1";
  const bezier3 =
    "M0,0,C0.005,0.011,0.17,0.3,0.17,0.3,0.17,0.3,0.328,0.371,0.458,0.49,0.498,0.528,0.541,0.606,0.582,0.648,0.734,0.805,0.739,0.811,0.822,0.896,0.87,0.946,0.893,0.988,0.946,1.03,0.994,1.068,0.977,0.988,1,0.988";

  // buttons
  const pausePlayBtn = document.getElementById("pause-play");
  const resetBtn = document.getElementById("reset");

  function animation() {
    const tl1 = new TimelineMax({
      immediateRender: false,
      onComplete: reverse
    });
    const tl2 = new TimelineMax({
      immediateRender: false,
      onComplete: reverse
    });
    const tl3 = new TimelineMax({
      immediateRender: false,
      onComplete: reverse
    });

    const g1 = new TimelineMax({});
    const g2 = new TimelineMax({});
    const g3 = new TimelineMax({});
    const g4 = new TimelineMax({});

    tl1.fromTo(
      texts[0],
      duration,
      {
        letterSpacing: minExtension,
        opacity: 0,
        autoRound: false,
        ease: CustomEase.create("custom", bezier1),
        filter: "blur(1px)"
      },
      {
        letterSpacing: maxExtension,
        opacity: 1,
        autoRound: false,
        ease: CustomEase.create("custom", bezier1),
        filter: "blur(0px)"
      }
    );
    g1.to(gDiv, duration, {
      transform: `translate(${-gTranslate[0]}px)`,
      ease: CustomEase.create("custom", bezier1)
    });
    tl2.fromTo(
      texts[1],
      duration,
      {
        letterSpacing: minExtension,
        opacity: 0,
        autoRound: false,
        ease: CustomEase.create("custom", bezier1),
        filter: "blur(1px)"
      },
      {
        letterSpacing: maxExtension,
        opacity: 1,
        autoRound: false,
        ease: CustomEase.create("custom", bezier1),
        filter: "blur(0px)"
      },
      `+=${duration + pause}`
    );
    g2.to(
      gDiv,
      duration,
      {
        transform: `translate(${-gTranslate[1]}px)`,
        ease: CustomEase.create("custom", bezier2)
      },
      `+=${duration + pause}`
    );

    tl3.fromTo(
      texts[2],
      duration,
      {
        letterSpacing: minExtension,
        opacity: 0,
        autoRound: false,
        ease: CustomEase.create("custom", bezier1),
        filter: "blur(1px)"
      },
      {
        letterSpacing: maxExtension,
        opacity: 1,
        autoRound: false,
        ease: CustomEase.create("custom", bezier1),
        filter: "blur(0px)"
      },
      `+=${(duration + pause) * 2}`
    );
    g3.to(
      gDiv,
      duration,
      {
        transform: `translate(${-gTranslate[2]}px)`,
        ease: CustomEase.create("custom", bezier3)
      },
      `+=${(duration + pause) * 2}`
    );
    g4.to(
      gDiv,
      duration,
      {
        transform: `translate(${-gTranslate[3]}px)`,
        ease: CustomEase.create("custom", bezier1)
      },
      `+=${(duration + pause) * 3}`
    );

    // animation reverse
    function reverse() {
      const _this = this;
      setTimeout(
        function() {
          _this.reverse();
        },
        pause * 1000,
        _this
      );
    }

    // buttons handlers

    // pause / play
    function pausePlay() {
      if (pausePlayBtn.innerHTML === "play") {
        tl1.resume();
        tl2.resume();
        tl3.resume();
        g1.resume();
        g2.resume();
        g3.resume();
        g4.resume();
        pausePlayBtn.innerHTML = "pause";
        return;
      }
      tl1.pause();
      tl2.pause();
      tl3.pause();
      g1.pause();
      g2.pause();
      g3.pause();
      g4.pause();
      pausePlayBtn.innerHTML = "play";
    }
    function reset() {
      tl1.restart();
      tl2.restart();
      tl3.restart();
      g1.restart();
      g2.restart();
      g3.restart();
      g4.restart();
    }

    pausePlayBtn.addEventListener("click", pausePlay);
    resetBtn.addEventListener("click", reset);
  }
  animation();
}

init();

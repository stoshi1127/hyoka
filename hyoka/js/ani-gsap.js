 
/**
 * 要素を指定された値にアニメーションさせる
 * @see https://greensock.com/docs/v3/GSAP/gsap.to()
gsap.to(".selector", { options });
 */
 
// 使い方の例
gsap.to(".hoge", {
  x: 100, // x座標を100pxにする
  backgroundColor: "red", // 背景色をredにする
  duration: 1, // 1秒間かけて行う
  delay: 0.5,　// 0.5秒後にこのアニメーションを実行する
  ease: "power2.inOut" // アニメーションのイージングを指定。これには様々な指定ができる
});

// GSAPプラグインをインポート
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);

///////////////////////
// 共通アニメーション //
//////////////////////

// タイピングアニメーション
document.querySelectorAll('.ani-typing').forEach(element => {
    const text = element.getAttribute('data-text'); // タイピングするテキストを動的に取得
    const textLength = text.length; // テキストの文字数を取得
    const baseDuration = 0.07; // 1文字あたりの基本時間を設定
    const duration = textLength * baseDuration; // 文字数に基づいてdurationを計算

    gsap.to(element, {
        duration: duration, // 計算したアニメーションの時間を設定
        text: text,
        ease: "none",
        repeat: 0,
        delay: 0,
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        onComplete: () => {
            element.style.animation = 'none';

            const parentElement = element.parentElement;
            if (parentElement && parentElement.classList.contains('ani-typing-after')) {
                parentElement.classList.add('active');
            }
        }
    });
});

//テキストカラー変更アニメーション
document.querySelectorAll('.ani-color-change').forEach(element => {
    gsap.fromTo(element, {
        filter: 'grayscale(1)',
        },
        {
        filter: 'grayscale(0)',
        duration: 0.2, // アニメーションの時間
        ease: "power3.out",
        scrollTrigger: {
            trigger: element, // トリガーとなる要素
            start: "top 80%", // アニメーションを開始する位置
        },
    });
});

//拡大アニメーション
document.querySelectorAll('.ani-scale01').forEach(element => {
    gsap.to(element, { 
            keyframes: {
                '0%': {
                scale: 0,
                },
                '60%': {
                scale: 1.2,
                },
                '100%': {
                scale: 1,
                },
            },
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
            }
        });
});

//左下からフェードイン
document.querySelectorAll('.ani-fadein-rb').forEach(element => {
    gsap.fromTo(element, {
        y:20,
        x:-20,
        autoAlpha: 0,
        },
        {
            y:0,
            x:0,
            autoAlpha: 1,
            duration: 1.2,
            ease: "circ.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
            }
       });
});

// 下からフェードイン
document.querySelectorAll('.ani-fadein-b').forEach(element => {
    gsap.fromTo(element, {
        y:20,
        autoAlpha: 0,
        },
        {
            y:0,
            autoAlpha: 1,
            duration: 1.2,
            ease: "circ.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
            }
       });
});

// 左からフェードイン
document.querySelectorAll('.ani-fadein-r').forEach(element => {
    gsap.fromTo(element, {
        x: -20,
        autoAlpha: 0,
        },
        {
            x:0,
            autoAlpha: 1,
            duration: 1.5,
            ease: "circ.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
            }
       });
});

// 右からフェードイン
document.querySelectorAll('.ani-fadein-l').forEach(element => {
    gsap.fromTo(element, {
        x: 20,
        autoAlpha: 0,
        },
        {
            x:0,
            autoAlpha: 1,
            duration: 1.2,
            ease: "circ.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
            }
       });
});

// 左から徐々に出現
document.querySelectorAll('.ani-clip-r').forEach(element => {
    gsap.fromTo(element, {
        clipPath: "inset(0 100% 0 0)",
        },
        {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power1.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
            }
       });
});

// 右から徐々に出現
document.querySelectorAll('.ani-clip-l').forEach(element => {
    gsap.fromTo(element, {
        clipPath: "inset(0 0 0 100%)",
        },
        {
            clipPath: "inset(0 0 0 0%)",
            duration: 1.2,
            ease: "power1.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
            }
       });
});

// 拡大出現
document.querySelectorAll('.ani-expansion').forEach(element => {
    gsap.to(element, { 
        keyframes: {
            '0%': {
            scale: 0,
            },
            '100%': {
            scale: 1,
            },
        },
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
        }
    });
});

// 右から徐々に出現
document.querySelectorAll('.ani-clip-bgtxt').forEach(element => {
    gsap.fromTo(element, {
        clipPath: "inset(0 100% 0 0)",
        },
        {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.5,
            ease: "power1.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
            }
       });
    gsap.fromTo(element, {
        color: "transparent"
        },
        {
            color: "#fff",
            duration: 0.5,
            delay: 0.8,
            ease: "power1.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
            }
       });
});



///////////////////////
// 個別アニメーション //
//////////////////////

// 時間差で左下からフェードイン
gsap.fromTo('.ani-fadein-delay01', {
    y: 10,
    x:-10,
    scale: 0.8,
    autoAlpha: 0
 },
 {
    y: 0,
    x: 0,
    scale: 1,
    autoAlpha: 1,
    duration: .5,
    ease: "back.out(1.7)",
    stagger: {
        each: .35,
    },
    scrollTrigger: {
        trigger: '.ani-fadein-delay01',
        start: "top 80%",
    }
 })

//  時間差でフェードイン
gsap.fromTo('.ani-fadein-delay02', {
    autoAlpha: 0
 },
 {
    autoAlpha: 1,
    duration: .3,
    stagger: {
        each: .2,
    },
    scrollTrigger: {
        trigger: '.ani-fadein-delay02',
        start: "top 80%",
    }
 })

//  時間差で左からフェードイン
 gsap.fromTo('.ani-fadein-delay03', {
    x: 20,
    autoAlpha: 0
 },
 {
    x: 0,
    autoAlpha: 1,
    duration: .5,
    stagger: {
        each: .3,
    },
    scrollTrigger: {
        trigger: '.ani-fadein-delay03',
        start: "top 80%",
    }
 }) 

//  時間差で右からフェードイン
 gsap.fromTo('.ani-fadein-delay04', {
    x: -20,
    autoAlpha: 0
 },
 {
    x: 0,
    autoAlpha: 1,
    duration: .5,
    stagger: {
        each: .3,
    },
    scrollTrigger: {
        trigger: '.ani-fadein-delay04',
        start: "top 80%",
    }
 }) 

//  時間差で右からフェードイン(スロー)
 gsap.fromTo('.ani-fadein-delay05', {
    x: -20,
    autoAlpha: 0
 },
 {
    x: 0,
    autoAlpha: 1,
    duration: .7,
    stagger: {
        each: .5,
    },
    scrollTrigger: {
        trigger: '.ani-fadein-delay05',
        start: "top 80%",
    }
 }) 

//パララックスbg
 ScrollTrigger.create({
    trigger: '.fixed-bg01-target', // トリガーとなるセクション
    start: 'top 80%', // トリガーが開始する位置
    end: 'bottom 100%', // トリガーが終了する位置
    onEnter: () => {
        // セクションに入ったときに要素を表示
        gsap.to('#fixed-bg01', { opacity: 1,  duration: 0.8,  ease: "circ.out", });
    },
    onLeave: () => {
        // セクションを離れたときに要素を非表示
        gsap.to('#fixed-bg01', {opacity: 0, duration: 0.8,  ease: "circ.out", });
    },
    onEnterBack: () => {
        // セクションに戻ったときに要素を再表示
        gsap.to('#fixed-bg01', { opacity: 1, duration: 0.8,  ease: "circ.out", });
    },
    onLeaveBack: () => {
        // セクションを再度離れたときに要素を再非表示
        gsap.to('#fixed-bg01', {opacity: 0, duration: 0.8,  ease: "circ.out", });
    }
});
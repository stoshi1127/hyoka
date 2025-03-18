//アコーディオン
$('.js-acd-body').hide();
$('.js-acd-btn').on('click',function() {
	$(this).next('.js-acd-body').slideToggle(300);
	$(this).toggleClass("active");
});
// sp-アコーディオン
$(function(){
    var ua = navigator.userAgent.toLowerCase();
    var eventName;
    if (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1 || ua.indexOf("ipod") > -1) {
      eventName = 'orientationchange';
    } else {
      eventName = 'resize';
    }
  
    $(window).on(eventName, function() {
      if ($(window).width() <= 480) {
          $('.js-sp-acd-body').hide();
          $('.js-sp-acd-btn').removeClass("active");
          $('.js-sp-acd-btn').off('click').on('click', function() {
              $(this).next('.js-sp-acd-body').slideToggle(300);
              $(this).toggleClass("active");
          });
      } else {
          // ウィンドウサイズが480pxを超えた場合の処理を追加することもできます
          $('.js-sp-acd-body').show(); // 例: アコーディオンを展開した状態にする
          $('.js-sp-acd-btn').removeClass("active");
      }
    }).trigger(eventName); // 初回ロード時にも実行するためにトリガー
  });

//hover
$('.js-hover').hover(
	function (){
		$('.js-hover').removeClass("active");
		var  hTarget = $(this).data('htarget');
		$('[data-htarget="' + hTarget + '"]').addClass("active");
	},
	function (){
		$('.js-hover').removeClass("active");
	}
);

// ヘッダー調整
function updateBodyPadding() {
    var headerH = $('header').innerHeight();
    $('body').css('padding-top', headerH + 'px');
}
$(window).on('load', function () {
    updateBodyPadding();
});
$(window).on('resize', function () {
    updateBodyPadding();
});
$(window).scroll(function () {
    // fixed横スクロール対応
    $("header").css("left", -$(window).scrollLeft());

	if ($(this).scrollTop() > 300) {
		$('header').addClass('is-small');
	} else {
		$('header').removeClass('is-small');
	}
});


// アンカーリンク
$('a').on('click',function() { 
    var gnaviHeight = $('header').innerHeight() - $('.header-company').innerHeight();
    var href= $(this).attr("href");
    var neohref = href.indexOf('#')
    var pointHref = href.substr(neohref, href.length);
	var position = $(pointHref).offset().top - gnaviHeight;
        $('body,html').animate({scrollTop:position}, 0, 'swing');
    return false;
});

//耳タブ
$(function() {
    var mvHeight = $('.mv').outerHeight(); 
    var bnr = $('.block-float-bnr'); // クラスを付与する要素

    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop(); // 現在のスクロール位置を取得

        if (scrollTop > mvHeight) {
            bnr.addClass('active');
        } else {
            bnr.removeClass('active');
        }
    });
});





// スキルの円グラフのアニメーション
$(document).ready(function() {
    // スキル円グラフの初期化
    initSkillCircles();
    
    function initSkillCircles() {
      $('.skill-circle').each(function() {
        const skillValue = parseInt($(this).find('.skill-value').text());
        const circle = $(this).find('circle.progress');
        
        // 円周の計算 (2 * π * r)
        const circumference = 2 * Math.PI * 45;
        
        // スキル値に応じたdashoffsetを計算
        const dashOffset = circumference - (circumference * skillValue / 100);
        
        // stroke-dasharray と stroke-dashoffset を設定
        circle.css({
          'stroke-dasharray': circumference,
          'stroke-dashoffset': circumference
        });
        
        // アニメーション
        setTimeout(function() {
          circle.css('stroke-dashoffset', dashOffset);
        }, 300);
      });
    }
    
    // タブ切り替え時にもアニメーションを適用
    $('input[name="switch_radio"]').change(function() {
      if($(this).val() === 'skill') {
        initSkillCircles();
      }
    });
  });
  
  // 円グラフの色をスキル値に応じて変更する関数
  function updateSkillColors() {
    $('.skill-circle').each(function() {
      const skillValue = parseInt($(this).find('.skill-value').text());
      const circle = $(this).find('circle.progress');
      
      // スキル値に応じた色を設定
      if (skillValue >= 90) {
        circle.css('stroke', '#4a8cff');
      } else if (skillValue >= 70) {
        circle.css('stroke', '#5da0ff');
      } else if (skillValue >= 50) {
        circle.css('stroke', '#70b4ff');
      } else {
        circle.css('stroke', '#a0d0ff');
      }
    });
  }
  
  // ページ読み込み時と切り替え時に色を更新
  $(document).ready(function() {
    updateSkillColors();
    
    $('input[name="switch_radio"]').change(function() {
      if($(this).val() === 'skill') {
        updateSkillColors();
      }
    });
  });
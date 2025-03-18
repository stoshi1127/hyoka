document.addEventListener('DOMContentLoaded', function() {
    // スマホの画面幅を定義（例: 768px以下をスマホとする）
    var isMobile = window.innerWidth <= 480;
  
    if (isMobile) {
      var menuButton = document.getElementById('menuButton');
      var menu = document.getElementById('header-menu');
      
      menuButton.addEventListener('click', function() {
          var expanded = this.getAttribute('aria-expanded') === 'true' || false;
          this.setAttribute('aria-expanded', !expanded);
      });
  
      menu.addEventListener('click', function(event) {
          event.stopPropagation(); // メニュー内のクリックイベントをキャンセルしない
      });
  
      document.addEventListener('click', function(event) {
          if (menu.getAttribute('aria-hidden') === 'false') {
              var isClickInsideMenu = menu.contains(event.target);
              var isClickOnMenuButton = menuButton.contains(event.target);
              if (!isClickInsideMenu && !isClickOnMenuButton) {
                  menu.setAttribute('aria-hidden', 'true');
                  menuButton.setAttribute('aria-expanded', 'false');
              }
          }
      });
  
      // ページ内リンクをクリックした際に aria-expanded を false にする
      var links = menu.querySelectorAll('a');
      links.forEach(function(link) {
          link.addEventListener('click', function() {
              menuButton.setAttribute('aria-expanded', 'false');
          });
      });
    }
  });
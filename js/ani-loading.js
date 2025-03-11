document.addEventListener("DOMContentLoaded", function() {
    // const loadingElement = document.querySelector('.loading');
    const visualElement = document.querySelector('.mv');
    const visualBgElement = document.querySelector('.mv-bg');

    // ロードが完了したら
    window.addEventListener('load', function() {
        // アニメーションを停止し、コンテンツを表示
        // loadingElement.style.opacity = '0';
        setTimeout(function() {
            // loadingElement.style.display = 'none';
            // .visual と #visual-bg に active クラスを追加
            if (visualElement) {
                visualElement.classList.add('active');
            }
            if (visualBgElement) {
                visualBgElement.classList.add('active');
            }
        }, 1000); // 1秒のトランジション時間に合わせる
    });
});
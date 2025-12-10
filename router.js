// router.js

const routes = {
    '/': {
        tag: '<home-page></home-page>',
        file: './pages/home_page.js'
    },
    '/about': {
        tag: '<about-page></about-page>',
        file: './pages/about_page.js'
    },
    '/news': {
        tag: '<news-page></news-page>',
        file: './pages/news_page.js'
    },
    '/courses': {
        tag: '<course-page></course-page>',
        file: './pages/course_page.js'
    },
    '/teachers': {
        tag: '<teacher-page></teacher-page>',
        file: './pages/teacher_page.js'
    },
    '/contact': {
        tag: '<contact-page></contact-page>',
        file: './pages/contact_page.js'
    }
};

async function router() {
    const routerView = document.getElementById('router-view');
    // 取得當前 Hash 路徑，預設為 '/'
    let path = window.location.hash.slice(1) || '/';

    // 簡單的路由匹配
    const route = routes[path];

    if (route) {
        try {
            // 1. 顯示載入中... (可選，提升體驗)
            // routerView.innerHTML = '<div class="text-center mt-5"><div class="spinner-border text-secondary"></div></div>';

            // 2. 動態匯入該頁面的 JS 檔案
            // 這行是關鍵：瀏覽器會去下載對應的 .js 檔，Web Component 才會被註冊
            await import(route.file + "?v=2");

            // 3. 檔案載入成功後，將標籤放入 HTML
            routerView.innerHTML = route.tag;

        } catch (error) {
            console.error(`無法載入頁面元件: ${route.file}`, error);
            routerView.innerHTML = `
                <div class="container text-center mt-5">
                    <h3 class="text-danger">頁面載入失敗</h3>
                    <p>請檢查檔案 ${route.file} 是否存在。</p>
                </div>`;
        }
    } else {
        // 404 頁面
        routerView.innerHTML = `
            <div class="container text-center mt-5">
                <h1>404</h1>
                <p>找不到此頁面</p>
                <a href="#/" class="btn btn-primary">回首頁</a>
            </div>`;
    }

    // 換頁後捲動回頂部
    window.scrollTo(0, 0);
}

// 監聽網址 Hash 變化
window.addEventListener('hashchange', router);

// 頁面初次載入時執行
window.addEventListener('load', router);
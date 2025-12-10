// components/header.js
class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <style>
            /* --- 1. Header 容器 --- */
            #main-header {
                background-color: var(--yite-blue);
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
                padding: 10px 0; /* 預設上下寬鬆 */
            }

            /* --- 2. 佈局設定 (Flexbox) --- */
            .header-container {
                display: flex;
                justify-content: space-between; /* 左右推開 */
                align-items: center;
            }

            /* 左側 Logo */
            .navbar-brand img {
                height: 60px; /* Logo 大一點 */
                transition: height 0.3s ease;
            }

            /* 右側區塊 (包含搜尋 + 導航) */
            .right-section {
                display: flex;
                flex-direction: column; /* 垂直堆疊 */
                align-items: flex-end;  /* 靠右對齊 */
                justify-content: center;
            }

            /* --- 3. 右上: 搜尋框 --- */
            .search-row {
                margin-bottom: 5px; /* 與導覽列的間距 */
                transition: all 0.3s ease;
                /* 確保 sticky 時能平滑隱藏 */
                max-height: 50px; 
                opacity: 1;
            }

            .search-input-group {
                position: relative;
            }
            .search-input-group .form-control {
                background-color: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #fff;
                border-radius: 20px;
                padding-left: 15px;
                padding-right: 35px;
                height: 30px;
                font-size: 0.85rem;
                width: 200px;
                transition: width 0.3s;
            }
            .search-input-group .form-control:focus {
                width: 240px;
                background-color: rgba(255, 255, 255, 0.2);
                border-color: var(--yite-gold);
                box-shadow: none;
            }
            .search-input-group .btn-icon {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                border: none;
                background: none;
                color: var(--yite-gold);
                font-size: 0.8rem;
            }

            /* --- 4. 右下: 導覽連結 --- */
            .nav-row {
                /* 導覽列樣式 */
            }
            .navbar-nav {
                flex-direction: row; /* 水平排列連結 */
            }
            .nav-link {
                color: rgba(255, 255, 255, 0.9) !important;
                font-weight: 500;
                margin-left: 20px; /* 連結間距 */
                padding: 0 !important;
                font-size: 1rem;
                position: relative;
                transition: color 0.3s;
            }
            .nav-link:hover, .nav-link.active {
                color: var(--yite-gold) !important;
            }
            /* 底線特效 */
            .nav-link::after {
                content: '';
                display: block;
                width: 0;
                height: 2px;
                background: var(--yite-gold);
                transition: width 0.3s;
                position: absolute;
                bottom: -5px;
                right: 0; /* 從右邊長出來更有設計感 */
            }
            .nav-link:hover::after {
                width: 100%;
                left: 0;
            }

            /* --- 5. Sticky 效果 (向下捲動) --- */
            .sticky-active {
                padding: 5px 0 !important;
                background-color: rgba(22, 43, 78, 0.98) !important;
            }
            /* 隱藏搜尋列 */
            .sticky-active .search-row {
                max-height: 0;
                opacity: 0;
                margin-bottom: 0;
                overflow: hidden;
            }
            /* Logo 縮小 */
            .sticky-active .navbar-brand img {
                height: 40px;
            }
            /* 調整導覽列位置，讓它垂直置中 */
            .sticky-active .right-section {
                justify-content: center; 
            }

            /* --- 6. RWD 手機版調整 --- */
            /* 預設隱藏漢堡按鈕 */
            .mobile-toggle { display: none; }
            
            @media (max-width: 991px) {
                /* 隱藏桌機版右側區塊 */
                .right-section { display: none; }
                /* 顯示漢堡按鈕 */
                .mobile-toggle { display: block; border: none; background: transparent; }
                .mobile-toggle span { filter: invert(1); width: 30px; height: 3px; display: block; background: white; margin: 6px 0; }
                
                /* 手機版 Offcanvas 樣式 */
                .offcanvas-body .navbar-nav {
                    flex-direction: column;
                    align-items: flex-start;
                }
                .offcanvas-body .nav-link {
                    margin: 10px 0;
                    font-size: 1.2rem;
                }
                .mobile-search {
                    margin-top: 20px;
                    width: 100%;
                }
            }
        </style>

        <header id="main-header" class="fixed-top">
            <div class="container header-container">
                
                <a class="navbar-brand" href="#/">
                    <img src="images/yite_logo.jpg" alt="譯德補習班" onerror="this.style.display='none';this.parentElement.innerHTML='<span style=\'color:white;font-weight:bold;font-size:1.5rem;\'>譯德文教</span>'">
                </a>

                <div class="right-section d-none d-lg-flex">
                    <div class="search-row">
                        <form class="search-input-group">
                            <input class="form-control" type="search" placeholder="Search..." aria-label="Search">
                            <button class="btn-icon" type="submit">
                                <i class="fas fa-search"></i>
                            </button>
                        </form>
                    </div>
                    <div class="nav-row">
                        <ul class="navbar-nav">
                            <li class="nav-item"><a class="nav-link" href="#/">首頁</a></li>
                            <li class="nav-item"><a class="nav-link" href="#/about">關於我們</a></li>
                            <li class="nav-item"><a class="nav-link" href="#/news">最新消息</a></li>
                            <li class="nav-item"><a class="nav-link" href="#/courses">熱門課程</a></li>
                            <li class="nav-item"><a class="nav-link" href="#/teachers">師資介紹</a></li>
                            <li class="nav-item"><a class="nav-link" href="#/contact">聯絡我們</a></li>
                        </ul>
                    </div>
                </div>

                <button class="mobile-toggle d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
                    <span></span><span></span><span></span>
                </button>

                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" style="background-color: var(--yite-blue);">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title text-white">選單</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav">
                            <li class="nav-item"><a class="nav-link" href="#/">首頁</a></li>
                            <li class="nav-item"><a class="nav-link" href="#/about">關於我們</a></li>
                            <li class="nav-item"><a class="nav-link" href="#/news">最新消息</a></li>
                            <li class="nav-item"><a class="nav-link" href="#/courses">熱門課程</a></li>
                            <li class="nav-item"><a class="nav-link" href="#/teachers">師資介紹</a></li>
                            <li class="nav-item"><a class="nav-link" href="#/contact">聯絡我們</a></li>
                        </ul>
                        <form class="mobile-search d-flex">
                            <input class="form-control me-2" type="search" placeholder="搜尋課程..." aria-label="Search">
                            <button class="btn btn-outline-warning" type="submit">搜尋</button>
                        </form>
                    </div>
                </div>

            </div>
        </header>
        `;

        this.initStickyEffect();
        this.initAutoCloseMenu();
    }

    // Sticky 效果: 捲動時隱藏搜尋列，縮小 Header
    initStickyEffect() {
        window.addEventListener('scroll', () => {
            const header = this.querySelector('#main-header');
            if (window.scrollY > 50) {
                header.classList.add('sticky-active');
            } else {
                header.classList.remove('sticky-active');
            }
        });
    }

    // 自動收合選單
    initAutoCloseMenu() {
        const navLinks = this.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const openedCanvas = document.querySelector('.offcanvas.show');
                if (openedCanvas) {
                    const closeBtn = openedCanvas.querySelector('.btn-close');
                    if (closeBtn) closeBtn.click();
                }
            });
        });
    }
}

customElements.define('my-header', Header);
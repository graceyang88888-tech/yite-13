// components/sidebar.js
class SidebarLayout extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // 啟用 Shadow DOM 封裝
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        
        <style>
            :host {
                display: block;
                width: 100%;
            }

            /* --- 核心佈局容器 (CSS Grid) --- */
            .layout-container {
                display: grid;
                gap: 30px; /* 欄位間距 */
                padding: 40px 0;
                align-items: start;
            }

            /* --- 桌面版設定 (寬度大於 992px 時) --- */
            @media (min-width: 992px) {
                .layout-container {
                    /* 強制切分兩欄：左側固定 280px，右側佔據剩餘空間 */
                    /* minmax(0, 1fr) 是防止右側內容太寬撐爆版面的關鍵技巧 */
                    grid-template-columns: 280px minmax(0, 1fr); 
                }
                
                /* 桌面版側邊欄可以設定 Sticky (捲動時黏住) */
                .sidebar {
                    position: sticky;
                    top: 100px; 
                }
            }

            /* --- 手機版設定 (寬度小於 992px 時) --- */
            @media (max-width: 991px) {
                .layout-container {
                    /* 變成單欄，讓內容自然堆疊 (上下顯示) */
                    grid-template-columns: 1fr; 
                    gap: 20px;
                }
                
                /* 手機版側邊欄不需要 Sticky，改為一般區塊 */
                .sidebar {
                    position: static;
                    margin-bottom: 20px; /* 與下方內容保持距離 */
                }
            }

            /* --- 側邊欄外觀樣式 --- */
            .sidebar {
                background-color: #fff;
                border: 1px solid #eee;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            }

            .sidebar-title {
                color: #162B4E; /* 品牌深藍 */
                font-weight: bold;
                padding-bottom: 15px;
                border-bottom: 2px solid #F2AC3E; /* 品牌金黃 */
                margin-bottom: 20px;
                font-size: 1.2rem;
            }

            /* 選單連結樣式 */
            .nav-link {
                color: #555;
                padding: 12px 15px;
                border-radius: 5px;
                margin-bottom: 5px;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                text-decoration: none;
                font-size: 1rem;
            }

            .nav-link:hover {
                background-color: #f0f2f5;
                color: #162B4E;
                transform: translateX(5px);
            }

            .nav-link.active {
                background-color: #162B4E;
                color: #fff;
            }

            .nav-link i {
                margin-right: 12px;
                width: 20px;
                text-align: center;
                color: #F2AC3E;
            }
            .nav-link.active i {
                color: #fff;
            }

            /* 右側內容區塊 */
            .content-area {
                background-color: #fff;
                min-width: 0; /* 防止內容撐爆 Grid */
                width: 100%;
            }
        </style>

        <div class="container">
            <div class="layout-container">
                
                <aside class="sidebar">
                    <h3 class="sidebar-title">分類選單</h3>
                    <nav class="nav flex-column">
                        <a href="#/courses" class="nav-link"><i class="fas fa-book-open"></i> 熱門課程</a>
                        <a href="#/teachers" class="nav-link"><i class="fas fa-chalkboard-teacher"></i> 師資團隊</a>
                        <a href="#/news" class="nav-link"><i class="fas fa-bullhorn"></i> 最新消息</a>
                        <a href="#/contact" class="nav-link"><i class="fas fa-envelope"></i> 聯絡我們</a>
                    </nav>
                </aside>

                <main class="content-area">
                    <slot name="content"></slot>
                </main>

            </div>
        </div>
        `;

        this.highlightActiveLink();
    }

    // 自動依據網址 Hash 點亮對應的選單項目
    highlightActiveLink() {
        const hash = window.location.hash;
        // 如果網址有參數 (例如 #/news/1)，只取前面部分
        const currentPath = hash.split('/')[1] ? '#/' + hash.split('/')[1] : '#/';

        const links = this.shadowRoot.querySelectorAll('.nav-link');
        links.forEach(link => {
            const linkHref = link.getAttribute('href');
            // 簡單的模糊比對，確保 /news/1 也能點亮 /news
            if (hash.includes(linkHref.replace('#', ''))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

customElements.define('sidebar-layout', SidebarLayout);
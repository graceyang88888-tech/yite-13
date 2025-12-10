// components/sidebar.js
class SidebarLayout extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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

            /* --- 核心佈局: 強制兩欄 Grid --- */
            .layout-container {
                display: grid;
                /* 左側固定 280px，右側佔據剩餘空間 (1fr) */
                grid-template-columns: 280px 1fr; 
                gap: 30px; /* 欄位間距 */
                padding: 40px 0;
                align-items: start; /* 內容對齊頂部 */
            }

            /* 左側: 側邊欄外觀 */
            .sidebar {
                background-color: #fff;
                border: 1px solid #eee;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                position: sticky; /* 讓側邊欄捲動時黏在上方 */
                top: 90px; /* 配合 Header 的高度與間距 */
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

            /* 目前頁面激活狀態 (需配合 JS 判斷網址) */
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

            /* 右側: 內容區 */
            .content-area {
                /* 確保內容區塊內的圖片或元素不會撐爆 Grid */
                min-width: 0; 
                background-color: #fff; /* 若需要內容區白底可加 */
                border-radius: 8px;
            }
            
            /* 注意：這裡刻意不加 Media Query (@media)，
               嚴格遵守「不允許內容掉下來變成上下顯示」的要求。
               在手機上，這會導致側邊欄與內容擠在一起，
               使用者可能需要左右滑動。 */
            
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

    // 自動標示當前頁面的連結為 Active
    highlightActiveLink() {
        const hash = window.location.hash;
        const links = this.shadowRoot.querySelectorAll('.nav-link');
        links.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

customElements.define('sidebar-layout', SidebarLayout);
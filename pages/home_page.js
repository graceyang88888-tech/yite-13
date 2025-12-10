// pages/home_page.js
class HomePage extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = `
        <style>
            /* Hero Section - 首頁大圖 [cite: 68] */
            .hero-section {
                position: relative;
                width: 100%;
                height: 85vh; /* 佔據螢幕 85% 高度 */
                background-image: url('images/index.jpg'); /* 請確保此圖存在 */
                background-size: cover;
                background-position: center;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            /* 黑色遮罩，增加文字可讀性 [cite: 68] */
            .hero-overlay {
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(22, 43, 78, 0.6); /* 深藍色半透明遮罩 */
            }
            .hero-content {
                position: relative;
                z-index: 1;
                text-align: center;
                color: white;
                padding: 20px;
            }
            .hero-title {
                font-size: 3rem;
                font-weight: bold;
                margin-bottom: 20px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            }
            .btn-cta {
                background-color: var(--yite-gold);
                color: #fff;
                border: none;
                padding: 12px 30px;
                font-size: 1.2rem;
                border-radius: 50px;
                transition: transform 0.3s;
                text-decoration: none;
                display: inline-block;
            }
            .btn-cta:hover {
                transform: scale(1.05);
                color: #fff;
                background-color: #e59b2e;
            }

            /* About Section */
            .section-padding {
                padding: 80px 0;
            }
            .about-img {
                box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                border-radius: 10px;
            }

            /* Parallax Section - 視差滾動 [cite: 70] */
            .parallax-section {
                background-image: url('images/5.jpg'); /* 使用 5.jpg */
                background-attachment: fixed; /* 視差滾動關鍵 */
                background-size: cover;
                background-position: center;
                padding: 100px 0;
                position: relative;
                color: white;
                text-align: center;
            }
            .parallax-overlay {
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(22, 43, 78, 0.7); /* 品牌色遮罩 [cite: 70] */
            }

            /* News Card */
            .news-card {
                border: none;
                box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                transition: transform 0.3s;
                height: 100%;
            }
            .news-card:hover {
                transform: translateY(-5px);
            }
            .news-date {
                color: var(--yite-gold);
                font-weight: bold;
                font-size: 0.9rem;
            }
            .news-category {
                background-color: var(--yite-blue);
                color: white;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 0.8rem;
                margin-right: 10px;
            }
        </style>

        <section class="hero-section">
            <div class="hero-overlay"></div>
            <div class="hero-content container">
                <h1 class="hero-title">啟發潛能，成就未來</h1>
                <p class="lead mb-4">譯德文教，提供最優質的師資與學習環境，陪伴孩子成長的每一步。</p>
                <a href="#/courses" class="btn-cta">探索課程</a>
            </div>
        </section>

        <section class="section-padding bg-white">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 mb-4 mb-lg-0">
                        <img src="images/2.jpg" alt="教學環境" class="img-fluid about-img" style="max-width: 100%; height: auto;">
                    </div>
                    <div class="col-lg-6">
                        <h2 class="mb-4" style="color: var(--yite-blue); font-weight: bold;">關於譯德</h2>
                        <p class="text-muted">
                            我們致力於提供高品質的教育服務，結合現代化教學設施與專業師資團隊。
                            透過引導式教學，讓孩子在快樂中學習，在挑戰中成長。
                        </p>
                        <p class="text-muted">
                            針對不同年齡層的需求，我們設計了多元化的課程，從基礎學科到素養培訓，全面提升孩子的競爭力。
                        </p>
                        <a href="#/about" class="btn btn-outline-primary mt-3">閱讀更多</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="parallax-section">
            <div class="parallax-overlay"></div>
            <div class="container position-relative">
                <h2 class="mb-3">專業師資，用心教學</h2>
                <p class="lead">加入我們，體驗不一樣的學習成效</p>
            </div>
        </section>

        <section class="section-padding" style="background-color: #f8f9fa;">
            <div class="container">
                <div class="d-flex justify-content-between align-items-end mb-5">
                    <h2 style="color: var(--yite-blue); font-weight: bold;">最新消息</h2>
                    <a href="#/news" class="text-decoration-none">查看更多 <i class="fas fa-arrow-right"></i></a>
                </div>
                
                <div class="row" id="home-news-container">
                    <div class="col-12 text-center py-5">
                        <div class="spinner-border text-secondary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;

        // 執行 Fetch 抓取新聞 
        this.fetchLatestNews();
    }

    async fetchLatestNews() {
        try {
            const response = await fetch('data/news.json');
            const data = await response.json();

            // 只取前 3 筆 
            const latestNews = data.slice(0, 3);

            const container = this.querySelector('#home-news-container');
            container.innerHTML = latestNews.map(item => `
                <div class="col-md-4 mb-4">
                    <div class="card news-card h-100">
                        <div class="card-body">
                            <div class="mb-2">
                                <span class="news-category">${item.category}</span>
                                <span class="news-date">${item.date}</span>
                            </div>
                            <h5 class="card-title text-truncate">${item.title}</h5>
                            <p class="card-text text-muted small">${item.summary}</p>
                            <a href="#/news" class="stretched-link"></a>
                        </div>
                    </div>
                </div>
            `).join('');

        } catch (error) {
            console.error('Error fetching news:', error);
            this.querySelector('#home-news-container').innerHTML =
                '<div class="col-12 text-center">暫無最新消息</div>';
        }
    }
}

customElements.define('home-page', HomePage);
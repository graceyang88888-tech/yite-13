// pages/news_page.js
class NewsPage extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = `
        <style>
            .news-item {
                border-bottom: 1px solid #eee;
                padding: 20px 0;
                transition: background-color 0.3s;
            }
            .news-item:hover {
                background-color: #fcfcfc;
            }
            .news-date {
                font-family: monospace;
                color: #888;
                font-size: 0.95rem;
            }
            .badge-news {
                background-color: var(--yite-blue);
                color: white;
                font-weight: normal;
                margin-right: 10px;
            }
            /* 篩選按鈕樣式 */
            .nav-pills .nav-link {
                color: #555;
                margin-right: 10px;
                border-radius: 20px;
                padding: 8px 20px;
            }
            .nav-pills .nav-link.active {
                background-color: var(--yite-gold);
                color: #fff;
            }
        </style>

        <sidebar-layout>
            <div slot="content">
                <h2 class="mb-4 fw-bold" style="color: var(--yite-blue);">最新消息</h2>

                <ul class="nav nav-pills mb-4" id="news-filters">
                    <li class="nav-item">
                        <button class="nav-link active" data-category="all">全部消息</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" data-category="行政公告">行政公告</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" data-category="榮譽榜">榮譽榜</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" data-category="活動訊息">活動訊息</button>
                    </li>
                </ul>

                <div id="news-list">
                    <div class="text-center py-5"><div class="spinner-border text-secondary"></div></div>
                </div>
            </div>
        </sidebar-layout>
        `;

        await this.loadNews();
        this.initFilters();
    }

    async loadNews() {
        try {
            const res = await fetch('data/news.json');
            this.allNews = await res.json();
            this.renderNews(this.allNews);
        } catch (error) {
            console.error('無法讀取新聞:', error);
            this.querySelector('#news-list').innerHTML = '<p class="text-danger">無法載入最新消息。</p>';
        }
    }

    renderNews(data) {
        const container = this.querySelector('#news-list');
        if (data.length === 0) {
            container.innerHTML = '<div class="alert alert-light">目前沒有相關消息。</div>';
            return;
        }

        container.innerHTML = data.map(item => `
            <div class="news-item">
                <div class="d-flex align-items-center mb-2">
                    <span class="badge badge-news rounded-pill px-3">${item.category}</span>
                    <span class="news-date ms-auto"><i class="far fa-clock me-1"></i>${item.date}</span>
                </div>
                <h5 class="mb-2 fw-bold">
                    <a href="#/news/${item.id}" class="text-decoration-none text-dark stretched-link">${item.title}</a>
                </h5>
                <p class="text-muted mb-0 small">${item.summary}</p>
            </div>
        `).join('');
    }

    initFilters() {
        const buttons = this.querySelectorAll('.nav-link');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // 切換按鈕狀態
                buttons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                // 篩選資料
                const category = e.target.dataset.category;
                if (category === 'all') {
                    this.renderNews(this.allNews);
                } else {
                    const filtered = this.allNews.filter(n => n.category === category);
                    this.renderNews(filtered);
                }
            });
        });
    }
}

customElements.define('news-page', NewsPage);
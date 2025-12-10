// pages/about_page.js
class AboutPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <style>
            .about-header {
                background-color: var(--yite-blue);
                color: white;
                padding: 60px 0;
                text-align: center;
                margin-bottom: 50px;
            }
            .about-section {
                padding-bottom: 60px;
            }
            .feature-box {
                padding: 30px;
                border-radius: 10px;
                background: #f8f9fa;
                height: 100%;
                border-left: 5px solid var(--yite-gold);
                box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            }
            .feature-box h4 {
                color: var(--yite-blue);
                font-weight: bold;
                margin-bottom: 15px;
            }
        </style>

        <div class="about-header">
            <div class="container">
                <h1 class="fw-bold">關於譯德文教</h1>
                <p class="lead">專注教育，成就卓越</p>
            </div>
        </div>

        <div class="container about-section">
            <div class="row align-items-center mb-5">
                <div class="col-lg-6 mb-4 mb-lg-0">
                    <img src="images/2.jpg" alt="教學理念" class="img-fluid rounded shadow" onerror="this.src='https://via.placeholder.com/600x400'">
                </div>
                <div class="col-lg-6">
                    <h2 class="mb-3 fw-bold" style="color: var(--yite-blue);">辦學理念</h2>
                    <p class="text-muted lead">我們相信，每個孩子都有無限的潛能。</p>
                    <p>
                        譯德文教集團成立於 2010 年，深耕在地教育十餘載。我們堅持小班制教學，確保每一位學生都能獲得老師充分的關注。
                        不同於傳統填鴨式教育，我們更重視「引導思考」與「自主學習」能力的培養。
                    </p>
                    <p>
                        我們的師資團隊皆經過嚴格篩選與培訓，不僅具備專業學科知識，更充滿教學熱忱，是孩子學習路上的良師益友。
                    </p>
                </div>
            </div>

            <div class="row g-4 mt-3">
                <div class="col-md-4">
                    <div class="feature-box">
                        <h4><i class="fas fa-gem me-2" style="color: var(--yite-gold);"></i>專業師資</h4>
                        <p>網羅各科名師，具備豐富教學經驗，針對考試趨勢精準分析。</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-box">
                        <h4><i class="fas fa-laptop-code me-2" style="color: var(--yite-gold);"></i>智慧學習</h4>
                        <p>結合數位教材與 AI 輔助系統，提供個人化學習歷程與補強建議。</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-box">
                        <h4><i class="fas fa-heart me-2" style="color: var(--yite-gold);"></i>用心陪伴</h4>
                        <p>不僅是知識的傳授，更重視品格教育與心理輔導，陪伴孩子快樂成長。</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('about-page', AboutPage);
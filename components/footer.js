// components/footer.js 
class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <style>
            footer {
                background-color: var(--yite-blue);
                color: var(--text-light);
                padding: 40px 0 20px;
                margin-top: auto; /* 確保置底 */
            }
            footer h5 {
                color: var(--yite-gold);
                font-weight: bold;
                margin-bottom: 20px;
            }
            footer a {
                color: var(--text-light);
                text-decoration: none;
                transition: color 0.3s;
            }
            footer a:hover {
                color: var(--yite-gold);
            }
            .copyright {
                border-top: 1px solid rgba(255,255,255,0.1);
                margin-top: 30px;
                padding-top: 20px;
                font-size: 0.9rem;
                text-align: center;
            }
        </style>
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-md-4 mb-4">
                        <h5>聯絡我們</h5>
                        <p><i class="fas fa-map-marker-alt me-2"></i> 台北市某某區某某路123號</p>
                        <p><i class="fas fa-phone me-2"></i> (02) 1234-5678</p>
                        <p><i class="fas fa-envelope me-2"></i> info@yite.edu.tw</p>
                    </div>
                    <div class="col-md-4 mb-4">
                        <h5>快速連結</h5>
                        <ul class="list-unstyled">
                            <li><a href="#/about">關於我們</a></li>
                            <li><a href="#/courses">課程介紹</a></li>
                            <li><a href="#/teachers">師資團隊</a></li>
                        </ul>
                    </div>
                    <div class="col-md-4 mb-4">
                        <h5>譯德文教</h5>
                        <p>專注於啟發學生的潛能，提供最優質的教學環境與師資，引領孩子邁向卓越的未來。</p>
                    </div>
                </div>
                <div class="copyright">
                    &copy; 2025 譯德文教集團 版權所有 | Designed by AI
                </div>
            </div>
        </footer>
        `;
    }
}
customElements.define('my-footer', Footer);
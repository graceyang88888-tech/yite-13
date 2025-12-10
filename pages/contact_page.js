// pages/contact_page.js
class ContactPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <style>
            .contact-header {
                background: linear-gradient(rgba(22, 43, 78, 0.8), rgba(22, 43, 78, 0.8)), url('images/9.jpg');
                background-size: cover;
                background-position: center;
                color: white;
                padding: 80px 0;
                text-align: center;
            }
            .form-control:focus {
                border-color: var(--yite-gold);
                box-shadow: 0 0 0 0.25rem rgba(242, 172, 62, 0.25);
            }
            .contact-info-item {
                display: flex;
                align-items: flex-start;
                margin-bottom: 20px;
            }
            .contact-icon {
                width: 40px;
                height: 40px;
                background-color: var(--yite-blue);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 15px;
                flex-shrink: 0;
            }
        </style>

        <div class="contact-header">
            <div class="container">
                <h1 class="fw-bold">聯絡我們</h1>
                <p class="lead mb-0">歡迎預約參觀試聽，我們將竭誠為您服務</p>
            </div>
        </div>

        <div class="container py-5">
            <div class="row g-5">
                <div class="col-lg-6">
                    <h3 class="fw-bold mb-4" style="color: var(--yite-blue);">線上諮詢</h3>
                    <form onsubmit="alert('感謝您的留言，我們將盡快與您聯繫！'); return false;">
                        <div class="mb-3">
                            <label class="form-label">家長姓名</label>
                            <input type="text" class="form-control" placeholder="請輸入姓名" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">聯絡電話</label>
                            <input type="tel" class="form-control" placeholder="09xx-xxx-xxx" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">學生年級</label>
                            <select class="form-select">
                                <option>國小</option>
                                <option>國中</option>
                                <option>高中</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">諮詢內容</label>
                            <textarea class="form-control" rows="4" placeholder="例如：想詢問國三數學衝刺班開課時間..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary w-100" style="background-color: var(--yite-blue); border:none;">送出表單</button>
                    </form>
                </div>

                <div class="col-lg-6">
                    <h3 class="fw-bold mb-4" style="color: var(--yite-blue);">班舍資訊</h3>
                    
                    <div class="contact-info-item">
                        <div class="contact-icon"><i class="fas fa-map-marker-alt"></i></div>
                        <div>
                            <h5 class="fw-bold">地址</h5>
                            <p class="text-muted">台北市中正區忠孝西路一段1號 (範例地址)</p>
                        </div>
                    </div>
                    
                    <div class="contact-info-item">
                        <div class="contact-icon"><i class="fas fa-phone"></i></div>
                        <div>
                            <h5 class="fw-bold">電話</h5>
                            <p class="text-muted">(02) 2345-6789</p>
                        </div>
                    </div>

                    <div class="contact-info-item">
                        <div class="contact-icon"><i class="far fa-clock"></i></div>
                        <div>
                            <h5 class="fw-bold">營業時間</h5>
                            <p class="text-muted">週一至週五：14:00 - 21:30<br>週六：09:00 - 18:00</p>
                        </div>
                    </div>

                    <div class="ratio ratio-16x9 mt-4 border rounded overflow-hidden shadow-sm">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.703649719326!2d121.5143!3d25.0441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDAyJzM4LjgiTiAxMjHCsDMwJzUxLjUiRQ!5e0!3m2!1szh-TW!2stw!4v1620000000000!5m2!1szh-TW!2stw" 
                            style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('contact-page', ContactPage);
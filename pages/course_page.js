// pages/course_page.js
class CoursePage extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = `
        <style>
            .course-card {
                border: 1px solid #eee;
                border-radius: 8px;
                overflow: hidden;
                transition: all 0.3s;
                background: white;
                height: 100%;
            }
            .course-card:hover {
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                transform: translateY(-5px);
            }
            .course-img {
                height: 200px;
                object-fit: cover;
                width: 100%;
            }
            .course-body {
                padding: 20px;
            }
            .badge-category {
                background-color: var(--yite-gold);
                color: #fff;
                padding: 5px 10px;
                border-radius: 20px;
                font-size: 0.8rem;
                display: inline-block;
                margin-bottom: 10px;
            }
            .filter-btn {
                margin-right: 10px;
                border-radius: 20px;
                padding: 5px 20px;
            }
            .filter-btn.active {
                background-color: var(--yite-blue);
                color: white;
                border-color: var(--yite-blue);
            }
        </style>

        <sidebar-layout>
            <div slot="content">
                
                <h2 class="mb-4 pb-2 border-bottom" style="color: var(--yite-blue); font-weight:bold;">熱門課程</h2>
                
                <div class="mb-4" id="filter-container">
                    <button class="btn btn-outline-secondary filter-btn active" data-filter="all">全部</button>
                    <button class="btn btn-outline-secondary filter-btn" data-filter="國小">國小</button>
                    <button class="btn btn-outline-secondary filter-btn" data-filter="國中">國中</button>
                    <button class="btn btn-outline-secondary filter-btn" data-filter="高中">高中</button>
                </div>

                <div class="row g-4" id="course-list">
                    <div class="col-12 text-center py-5">
                        <div class="spinner-border text-primary" role="status"></div>
                    </div>
                </div>

            </div>
        </sidebar-layout>
        `;

        await this.loadCourses();
        this.initFilters();
    }

    async loadCourses() {
        try {
            const res = await fetch('data/courses.json');
            this.courses = await res.json(); // 儲存原始資料供篩選用
            this.renderCourses(this.courses);
        } catch (err) {
            console.error(err);
            this.querySelector('#course-list').innerHTML = '<p class="text-danger">無法載入課程資料。</p>';
        }
    }

    renderCourses(data) {
        const container = this.querySelector('#course-list');
        if (data.length === 0) {
            container.innerHTML = '<div class="col-12">沒有相關課程。</div>';
            return;
        }

        container.innerHTML = data.map(course => `
            <div class="col-md-6 col-lg-4"> <div class="course-card">
                    <img src="${course.image}" class="course-img" alt="${course.name}" onerror="this.src='https://via.placeholder.com/400x300?text=Course'">
                    <div class="course-body">
                        <span class="badge-category">${course.category}</span>
                        <h5 class="card-title fw-bold mt-2">${course.name}</h5>
                        <p class="card-text text-muted small"><i class="fas fa-chalkboard-teacher me-2"></i>授課：${course.teacher}</p>
                        <p class="card-text">${course.description}</p>
                        <a href="#/contact" class="btn btn-sm btn-outline-primary w-100 mt-2">立即諮詢</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    initFilters() {
        const buttons = this.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // 1. 切換按鈕樣式
                buttons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                // 2. 執行篩選邏輯
                const category = e.target.dataset.filter;
                if (category === 'all') {
                    this.renderCourses(this.courses);
                } else {
                    const filtered = this.courses.filter(c => c.category === category);
                    this.renderCourses(filtered);
                }
            });
        });
    }
}

customElements.define('course-page', CoursePage);
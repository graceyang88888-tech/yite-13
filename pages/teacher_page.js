// pages/teacher_page.js
class TeacherPage extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = `
        <style>
            .teacher-card {
                background: #fff;
                border-radius: 10px;
                padding: 20px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                display: flex;
                align-items: center;
                gap: 20px;
                transition: transform 0.3s;
            }
            .teacher-card:hover {
                transform: translateX(10px); /* 懸停時向右微動 */
                border-left: 5px solid var(--yite-gold);
            }
            .teacher-img {
                width: 120px;
                height: 120px;
                border-radius: 50%; /* 圓形頭像 */
                object-fit: cover;
                border: 3px solid #f0f2f5;
            }
            .teacher-info h4 {
                color: var(--yite-blue);
                font-weight: bold;
                margin-bottom: 5px;
            }
            .subject-tag {
                color: var(--yite-gold);
                font-weight: bold;
                font-size: 0.9rem;
                margin-bottom: 10px;
                display: block;
            }
            /* 手機版調整為垂直排列 */
            @media (max-width: 768px) {
                .teacher-card {
                    flex-direction: column;
                    text-align: center;
                }
            }
        </style>

        <sidebar-layout>
            <div slot="content">
                <h2 class="mb-5 pb-2 border-bottom" style="color: var(--yite-blue); font-weight:bold;">師資團隊</h2>
                
                <div class="row g-4" id="teacher-list">
                    </div>
            </div>
        </sidebar-layout>
        `;

        this.loadTeachers();
    }

    async loadTeachers() {
        try {
            const res = await fetch('data/teachers.json');
            const data = await res.json();

            const container = this.querySelector('#teacher-list');
            container.innerHTML = data.map(t => `
                <div class="col-12">
                    <div class="teacher-card">
                        <img src="${t.image}" alt="${t.name}" class="teacher-img" onerror="this.src='https://via.placeholder.com/150'">
                        <div class="teacher-info">
                            <h4>${t.name}</h4>
                            <span class="subject-tag">${t.subject}</span>
                            <p class="mb-0 text-muted">${t.bio}</p>
                        </div>
                    </div>
                </div>
            `).join('');

        } catch (error) {
            console.error(error);
        }
    }
}

customElements.define('teacher-page', TeacherPage);
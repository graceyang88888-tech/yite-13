// components/ai_chatbot.js
class AIChatbot extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        // 注意：在前端直接暴露 API Key 有資安風險，正式上線建議透過後端轉發
        // 這裡為了演示方便，直接呼叫 Google API
        this.API_KEY = ''; // ★ 請在此填入您的 Google Gemini API Key，若留空則會使用模擬回應
    }

    connectedCallback() {
        this.innerHTML = `
        <style>
            /* 浮動按鈕 (Launcher) */
            .chatbot-launcher {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 60px;
                height: 60px;
                background-color: var(--yite-blue); /* 品牌深藍 */
                border-radius: 50%;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 9999;
                transition: transform 0.3s, background-color 0.3s;
            }
            .chatbot-launcher:hover {
                transform: scale(1.1);
                background-color: var(--yite-gold); /* 懸停變金色 */
            }
            .chatbot-launcher img {
                width: 35px;
                height: 35px;
            }
            
            /* 聊天視窗 (Window) */
            .chatbot-window {
                position: fixed;
                bottom: 100px;
                right: 30px;
                width: 350px;
                height: 500px;
                background-color: #fff;
                border-radius: 12px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                display: flex;
                flex-direction: column;
                z-index: 9999;
                overflow: hidden;
                opacity: 0;
                pointer-events: none;
                transform: translateY(20px);
                transition: all 0.3s ease;
                border: 1px solid #eee;
            }
            
            /* 開啟狀態 */
            .chatbot-window.open {
                opacity: 1;
                pointer-events: all;
                transform: translateY(0);
            }

            /* 視窗頭部 */
            .chat-header {
                background-color: var(--yite-blue);
                color: #fff;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .chat-header h5 {
                margin: 0;
                font-size: 1.1rem;
                font-weight: bold;
            }
            .btn-close-chat {
                background: none;
                border: none;
                color: #fff;
                font-size: 1.2rem;
                cursor: pointer;
            }

            /* 訊息區域 */
            .chat-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                background-color: #f8f9fa;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            /* 訊息氣泡 */
            .message {
                max-width: 80%;
                padding: 10px 15px;
                border-radius: 15px;
                font-size: 0.95rem;
                line-height: 1.4;
            }
            .message.bot {
                background-color: #e9ecef;
                color: #333;
                align-self: flex-start;
                border-bottom-left-radius: 2px;
            }
            .message.user {
                background-color: var(--yite-blue);
                color: #fff;
                align-self: flex-end;
                border-bottom-right-radius: 2px;
            }

            /* 輸入區域 */
            .chat-input-area {
                padding: 10px;
                border-top: 1px solid #eee;
                background-color: #fff;
                display: flex;
                gap: 10px;
            }
            .chat-input-area input {
                flex: 1;
                border: 1px solid #ddd;
                border-radius: 20px;
                padding: 8px 15px;
                outline: none;
            }
            .chat-input-area button {
                background-color: var(--yite-gold);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                color: #fff;
                cursor: pointer;
                transition: background 0.3s;
            }
            .chat-input-area button:hover {
                background-color: #e59b2e;
            }
            .typing-indicator {
                font-size: 0.8rem;
                color: #888;
                margin-left: 10px;
                display: none;
            }
        </style>

        <div class="chatbot-launcher" id="launcher">
            <i class="fas fa-robot fa-lg" style="color: white;"></i>
            </div>

        <div class="chatbot-window" id="window">
            <div class="chat-header">
                <h5><i class="fas fa-robot me-2"></i>譯德 AI 客服</h5>
                <button class="btn-close-chat" id="close-btn"><i class="fas fa-times"></i></button>
            </div>
            
            <div class="chat-messages" id="messages">
                <div class="message bot">
                    您好！我是譯德文教的 AI 助理。請問有什麼我可以幫您的嗎？<br>
                    (例如：最新課程、師資介紹、補習班地址)
                </div>
            </div>
            
            <span class="typing-indicator" id="typing">AI 正在輸入...</span>

            <div class="chat-input-area">
                <input type="text" id="msg-input" placeholder="請輸入訊息..." />
                <button id="send-btn"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
        `;

        this.initEvents();
    }

    initEvents() {
        const launcher = this.querySelector('#launcher');
        const windowEl = this.querySelector('#window');
        const closeBtn = this.querySelector('#close-btn');
        const sendBtn = this.querySelector('#send-btn');
        const input = this.querySelector('#msg-input');

        // 開關視窗
        const toggleChat = () => {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                windowEl.classList.add('open');
                input.focus();
            } else {
                windowEl.classList.remove('open');
            }
        };

        launcher.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', toggleChat);

        // 發送訊息
        const sendMessage = async () => {
            const text = input.value.trim();
            if (!text) return;

            // 1. 顯示使用者訊息
            this.addMessage(text, 'user');
            input.value = '';

            // 2. 顯示 AI 正在輸入
            const typingIndicator = this.querySelector('#typing');
            typingIndicator.style.display = 'block';

            // 3. 呼叫 Gemini API (或使用模擬回應)
            try {
                const reply = await this.callGeminiAPI(text);
                this.addMessage(reply, 'bot');
            } catch (error) {
                this.addMessage("抱歉，AI 暫時無法連線，請稍後再試。", 'bot');
                console.error(error);
            } finally {
                typingIndicator.style.display = 'none';
            }
        };

        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    addMessage(text, sender) {
        const container = this.querySelector('#messages');
        const div = document.createElement('div');
        div.classList.add('message', sender);
        div.innerHTML = text.replace(/\n/g, '<br>'); // 支援換行
        container.appendChild(div);
        container.scrollTop = container.scrollHeight; // 捲動到底部
    }

    // 呼叫 Google Gemini API
    async callGeminiAPI(userMessage) {
        // 如果沒有設定 API KEY，使用模擬回應 (避免報錯)
        if (!this.API_KEY) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve("這是一個模擬回應 (因為未設定 API Key)。\n您可以詢問：課程資訊、師資陣容、或聯絡方式。");
                }, 10
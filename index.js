new Vue({
    el: '#app',
    data: {
        autorName: 'name',
        text: 'Text',
        imageSrc: 'image.png',  // Это будет содержать строку Base64 изображения
        textFontSize: 25,
        textTopPos: 198
    },
    computed: {
        formattedText() {
            return this.text.replace(/\n/g, '<br>');
        }
    },
    methods: {
        setCookie(name, value, days) {
            const d = new Date();
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = "expires=" + d.toUTCString();
            document.cookie = `${name}=${value}; ${expires}; path=/`;
        },

        getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return null;
        },
        saveInfo() {
            this.setCookie('autorName', this.autorName, 7);
            this.setCookie('text', this.text, 7);
            this.setCookie('textFontSize', this.textFontSize, 7);
            this.setCookie('textTopPos', this.textTopPos, 7);
        },

        loadInfoFromCookies() {
            const savedAutorName = this.getCookie('autorName');
            const savedText = this.getCookie('text');
            const savedTextFontSize = this.getCookie('textFontSize');
            const savedTextTopPos = this.getCookie('textTopPos');

            if (savedAutorName) this.autorName = savedAutorName;
            if (savedText) this.text = savedText;
            if (savedTextFontSize) this.textFontSize = parseInt(savedTextFontSize, 10);
            if (savedTextTopPos) this.textTopPos = parseInt(savedTextTopPos, 10);
        },

        onImageChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imageSrc = e.target.result;
                    this.saveInfo();
                };
                reader.readAsDataURL(file);
            }
        },

        downloadImage() {
            html2canvas(document.querySelector(".ready_photo"), {
                useCORS: true,
                logging: true,
            }).then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL("image/png");
                link.download = 'ready_photo.png';
                link.click();
            });
        },
        resetSettings() {
            this.autorName = ''
            this.text = ''
            this.textFontSize = 25
            this.textTopPos = 198
            this.imageSrc = 'image.png',
            this.saveInfo()
        }
    },
    mounted() {
        this.loadInfoFromCookies();
    }
});
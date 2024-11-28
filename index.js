new Vue({
    el: '#app',
    data: {
        autorName: 'name',
        text: 'Text',
        imageSrc: 'image.png',
        textFontSize: 25,
        textTopPos: 198
    },
    computed: {
        formattedText() {
            // Форматирование текста с переносами строк
            return this.text.replace(/\n/g, '<br>');
        }
    },
    methods: {
        onImageChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imageSrc = e.target.result;
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
        }
        
    }
});

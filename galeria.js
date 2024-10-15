let currentIndex = 0;
        const items = document.querySelectorAll('.item');
        const totalItems = items.length;

        function updateGallery() {
            const offset = -currentIndex * 100; // Desplazamiento en porcentaje
            document.querySelector('.gallery').style.transform = `translateX(${offset}%)`;
        }

        // Función para manejar el desplazamiento con la rueda del ratón
        document.querySelector('.gallery').addEventListener('wheel', function (event) {
            if (event.deltaY > 0) {
                currentIndex = (currentIndex + 1) % totalItems; // Avanza al siguiente
            } else {
                currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Regresa al anterior
            }
            updateGallery(); // Actualiza la galería
            event.preventDefault(); // Evita el desplazamiento de la página
        });

        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM completamente cargado y analizado'); // Mensaje de depuración
        
            // Mapa que asocia cada carpeta con el id de su sección correspondiente
            const foldersMap = {
                'grupo': 'grupo',
                'alba': 'alba',
                'eli': 'eli',
                'jose': 'jose',
                'nikky': 'nikky',
                'lore': 'lore',
                'oscar': 'oscar'
            };
            console.log(foldersMap)
            // Función para comprobar si una imagen existe
            function checkImageExists(url) {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = () => {
                        console.log(`La imagen existe: ${url}`); // Mensaje de depuración
                        resolve(true);  // La imagen existe
                    };
                    img.onerror = () => {
                        console.log(`La imagen no existe: ${url}`); // Mensaje de depuración
                        resolve(false); // La imagen no existe
                    };
                });
            }
        
            // Función para cargar las imágenes
            async function loadImages() {
                for (const folder of Object.keys(foldersMap)) {
                    const sectionId = foldersMap[folder];
                    const galleryContainer = document.querySelector(`#${sectionId} .galeriimagen`);
        
                    if (galleryContainer) {
                        galleryContainer.innerHTML = ''; // Limpia el contenedor antes de agregar imágenes
        
                        let imageIndex = 1;
                        let imageExists = true;
        
                        while (imageExists) {
                            const imageName = `${folder}${imageIndex}.jpg`; // Crea el nombre de la imagen
                            const imageUrl = `${folder}/${imageName}`;
        
                            imageExists = await checkImageExists(imageUrl); // Verifica si la imagen existe
        
                            if (imageExists) {
                                const itemDiv = document.createElement('div');
                                itemDiv.classList.add('item');
        
                                const img = document.createElement('img');
                                img.src = imageUrl; // Ruta de la imagen
                                img.alt = imageName;
        
                                itemDiv.appendChild(img);
                                galleryContainer.appendChild(itemDiv);
                            }
        
                            imageIndex++; // Incrementa el índice para la próxima imagen
                        }
                    } else {
                        console.error(`No se encontró el contenedor para la carpeta "${folder}" en la sección "${sectionId}"`);
                    }
                }
            }
        
            // Cargar las imágenes al cargar la página
            loadImages();
        });
        
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM completamente cargado y analizado'); // Mensaje de depuración
        
            // Función para comprobar si un video existe
            function checkVideoExists(url) {
                return new Promise((resolve) => {
                    const video = document.createElement('video');
                    video.src = url;
                    video.onloadeddata = () => resolve(true);  // El video existe
                    video.onerror = () => resolve(false); // El video no existe
                });
            }
        
            // Función para cargar los videos
            async function loadVideos() {
                const videoContainer = document.getElementById('videoContainer');
                videoContainer.innerHTML = ''; // Limpia el contenedor antes de agregar videos
        
                let videoIndex = 1;
                let videoExists = true;
        
                while (videoExists) {
                    const videoName = `video${videoIndex}.mp4`; // Crea el nombre del video
                    const videoUrl = `video/${videoName}`; // Ajusta la ruta a la carpeta correcta
        
                    videoExists = await checkVideoExists(videoUrl); // Verifica si el video existe
        
                    if (videoExists) {
                        const itemDiv = document.createElement('div');
                        itemDiv.classList.add('item');
        
                        const video = document.createElement('video');
                        video.src = videoUrl; // Ruta del video
                        video.controls = true; // Añadir controles al video
        
                        itemDiv.appendChild(video);
                        videoContainer.appendChild(itemDiv);
                    }
        
                    videoIndex++; // Incrementa el índice para el próximo video
                }
            }
        
            // Cargar los videos al cargar la página
            loadVideos();
        });
        
        
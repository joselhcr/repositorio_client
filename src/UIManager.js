// Obtenemos las referencias a los contenedores principales al inicio
const videoGrid = document.getElementById('videoGrid');
const participantListElement = document.getElementById('participantListElement');

/**
 * Gestiona la creación/eliminación de elementos en la UI,
 * incluyendo los videos de los participantes y la lista de nombres.
 */
export const UIManager = {

    /**
     * Crea una tarjeta de participante completa (div + video + span) para un par remoto.
     * @param {string} userId - El ID único del par.
     * @returns {HTMLVideoElement} - El elemento <video> al que se le debe asignar el stream.
     */
    createVideoElement: (userId) => {
        
        // 1. Crear el contenedor principal
        const participantDiv = document.createElement('div');
        participantDiv.classList.add('video-participant');
        // Asignamos un ID al contenedor para poder encontrarlo y eliminarlo después
        participantDiv.id = `participant-container-${userId}`;

        // 2. Crear el elemento de video
        const videoElement = document.createElement('video');
        videoElement.id = `video-${userId}`; // Mantenemos el ID original para compatibilidad
        videoElement.autoplay = true;
        videoElement.playsInline = true;

        // 3. Crear la etiqueta de nombre
        const nameTag = document.createElement('span');
        // Usamos un nombre temporal. La lista de participantes tendrá el nombre "real".
        nameTag.innerText = `Remoto ${userId.slice(0, 6)}`; 

        // 4. Armar la tarjeta
        participantDiv.appendChild(videoElement);
        participantDiv.appendChild(nameTag);

        // 5. Añadir la tarjeta completa al grid de videos
        videoGrid.appendChild(participantDiv);

        // 6. Devolver solo el elemento <video>
        // El código que llama a esta función (ej. WebRTCManager)
        // necesita este elemento para hacer: video.srcObject = stream
        return videoElement;
    },

    /**
     * Elimina la tarjeta de participante completa (el div) del DOM.
     * @param {string} userId - El ID único del par.
     */
    removeVideoElement: (userId) => {
        // Ahora buscamos el contenedor principal por el ID que le asignamos
        const participantDiv = document.getElementById(`participant-container-${userId}`);
        
        if (participantDiv) {
            participantDiv.remove();
        } else {
            console.warn(`No se encontró el contenedor del participante para el ID: ${userId}`);
        }
    },

    /**
     * Actualiza la lista de participantes en la barra lateral.
     * @param {Array<Object>} participants - Array de objetos {id, name}
     */
    updateParticipantList: (participants) => {
        
        // Verificamos que el elemento de la lista exista
        if (!participantListElement) {
            console.warn('Elemento #participantListElement no encontrado en el DOM.');
            return;
        }

        // 1. Limpiar la lista vieja
        participantListElement.innerHTML = ''; 

        // 2. Crear y añadir los nuevos elementos de la lista
        participants.forEach(participant => {
            const li = document.createElement('li');
            li.textContent = participant.name;
            participantListElement.appendChild(li);
        });
    }
};
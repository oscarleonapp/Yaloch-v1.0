/* Inicializar Muuri */
const grid = new Muuri('.grid', {
	layout: {
		rounding: false
	}
});

/* Transición al Cargar las Imágenes */
window.addEventListener('load', () => {
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('loaded-images');

	/* Listener de los Enlaces para Filtrar por Categoría */
	const enlaces = document.querySelectorAll('#categories a');
	enlaces.forEach((elemento) => {
		elemento.addEventListener('click', (evento) => {
			evento.preventDefault();
			enlaces.forEach((enlace) => enlace.classList.remove('active'));
			event.target.classList.add('active');

			/* Identificar la categoría del enlace que fue cliqueado */
			const categoria = evento.target.innerHTML.toLowerCase();
			categoria === 'todas' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
		});
	});

	/* Listener para la Barra de Búsqueda */
	document.querySelector('#search-bar').addEventListener('input', (evento) => {
		const busqueda = evento.target.value.toLowerCase();
		grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));
	});

	/* Listener para abrir imágenes y videos en el Overlay */
	const overlay = document.getElementById('overlay');
	const overlayImg = document.getElementById('overlay-img');
	const overlayVideo = document.getElementById('overlay-video');
	const descripcionOverlay = document.querySelector('.description');

	document.querySelectorAll('.grid .item img, .grid .item video').forEach((elemento) => {
		elemento.addEventListener('click', () => {
			const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
			overlay.classList.add('active');
			descripcionOverlay.innerHTML = descripcion;

			if (elemento.tagName === "IMG") {
				overlayImg.src = elemento.getAttribute('src');
				overlayImg.style.display = "block";
				overlayVideo.style.display = "none";
				overlayVideo.pause(); // Pausar el video si estaba en reproducción
			} else if (elemento.tagName === "VIDEO") {
				const videoSrc = elemento.querySelector("source").getAttribute('src');
				overlayVideo.src = videoSrc;
				overlayVideo.style.display = "block";
				overlayImg.style.display = "none";
				overlayVideo.play();
			}
		});
	});

	/* EventListener del Botón de Cerrar */
	document.querySelector('#btn-close-popup').addEventListener('click', () => {
		overlay.classList.remove('active');
		overlayImg.src = "";
		overlayVideo.pause();
		overlayVideo.src = "";
	});

	/* Cerrar el overlay al hacer clic fuera del contenido */
	overlay.addEventListener('click', (evento) => {
		if (evento.target.id === 'overlay') {
			overlay.classList.remove('active');
			overlayImg.src = "";
			overlayVideo.pause();
			overlayVideo.src = "";
		}
	});

});

/* Inicializar Muuri */
const grid = new Muuri('.grid', {
	layout: {
		rounding: false
	}
});

/* Transición al Cargar la Imágenes*/
window.addEventListener('load', () => {
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('loaded-images');

	/* Listener de los Enlaces para Filtrar por Categoría */
	const enlaces = document.querySelectorAll('#categories a');
	enlaces.forEach( (elemento) => {
		elemento.addEventListener('click', (evento) => {
			evento.preventDefault();
			enlaces.forEach((enlace) => enlace.classList.remove('active'));
			event.target.classList.add('active');

			/* Identificar la categoria del enlace que fué cliqueado */
			const categoria = evento.target.innerHTML.toLowerCase();
			categoria === 'todas' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
		});
	} );

	/* Listener para la Barra de Búsqueda */
	document.querySelector('#search-bar').addEventListener('input', (evento) => {
		const busqueda = evento.target.value;
		grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
	});

	/* Listener para las Imágenes */
	const overlay = document.getElementById('overlay');
	document.querySelectorAll('.grid .item img').forEach((elemento) => {
		
		elemento.addEventListener('click', () => {
			const ruta = elemento.getAttribute('src');
			const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
			overlay.classList.add('active');
			document.querySelector('#overlay img').src = ruta;
			document.querySelector('#overlay .description').innerHTML = descripcion;
		});
	});

	/* EventListener del Botón de Cerrar */
	document.querySelector('#btn-close-popup').addEventListener('click',  () => {
		overlay.classList.remove('active');
	});

	/* EventListener del Overlay */
	overlay.addEventListener('click', (evento) => {
		evento
		evento.target.id === 'overlay' ? overlay.classList.remove('active') : '';
	});

});
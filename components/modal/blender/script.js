$(function () {
	function toggleModalWrapper($modalWrapper) {
		const classes = $modalWrapper.attr('class').split(/\s+/);
		const baseClass = classes.find((el) => /wrapper$/.test(el));
		$modalWrapper.toggleClass(baseClass.concat('-open'));
	}

	$('[data-modal]').click(function (event) {
		event.stopPropagation();
		const modalID = $(this).data('modal');
		const $modal = $(`#${modalID}`);

		const $modalWrapper = $modal.closest('[data-js="modal-wrapper__version__"]');
		toggleModalWrapper($modalWrapper);
	});

	$('[data-js="modal-closeBtn__version__"]').click(function (event) {
		event.stopPropagation();
		const $modalWrapper = $(this).closest('[data-js="modal-wrapper__version__"]');
		toggleModalWrapper($modalWrapper);
	});

	$('[data-js="modal-wrapper__version__"]').click(function () {
		const $modalWrapper = $(this);
		toggleModalWrapper($modalWrapper);
	});
});
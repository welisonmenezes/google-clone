/**
 *	DROPDOWN
 **/
(function () {

	function toggleDropdown() {
		var buttons = document.querySelectorAll('.dropdown-button');
		if (buttons) {
			[].forEach.call(buttons, function(btn) {
				btn.addEventListener('click', function(evt) {
					evt.stopPropagation();
					var button = evt.target;
					var dropdown = button.parentElement;
					closeDropdown(dropdown);
					dropdown.classList.toggle('open');
				}, true);
			});
		}
	}

	function closeDropdown(dropdown) {
		var drops = document.querySelectorAll('.dropdown.open');
		if (drops) {
			[].forEach.call(drops, function(drop) {
				if (!dropdown || (dropdown && !drop.isSameNode(dropdown))) {
					drop.classList.remove('open');
				}
			});
		}
	}

	function stopPropagationDropdownContent() {
		var dropsContent = document.querySelectorAll('.dropdown-content');
		if (dropsContent) {
			[].forEach.call(dropsContent, function(dc) {
				dc.addEventListener('click', function(evt) {
					evt.stopPropagation();
				});
			});
		}
	}

	// global clicks
	document.addEventListener('click', function() {
		closeDropdown();
	});

	// start methods
	window.addEventListener('load', function () {
		toggleDropdown();
		stopPropagationDropdownContent();
	});

})();
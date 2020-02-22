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


/**
 *	DRAG AND DROP
 **/
(function () {

	var startedEl, leftPos, topPos, clonedEl;
	var container = document.querySelector('.drag-drop-container');
	var draggable = document.querySelectorAll('li[draggable="true"]');

	function dragStart(e) {
		e.dataTransfer.setData('text/plain', 'dragStart');
		e.dataTransfer.effectAllowed = 'move';
		startedEl = e.currentTarget;
		clonedEl = startedEl.cloneNode(true);
		startedEl.classList.add('no-visible');
		clonedEl.classList.add('drag-drop-floating');
		container.classList.add('drag-drop-moving');
		container.parentElement.classList.add('child-moving');
		container.appendChild(clonedEl);
	}

	function drag(e) {
		updateTopLeft(e);
	}

	function drop(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	function dragOver(e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
		var targetEl = e.currentTarget;
		if (isBefore(startedEl, targetEl)) {
			try	{
				targetEl.parentNode.insertBefore(startedEl, targetEl);
			} catch(err) {}
		}
		else {
			try	{
				targetEl.parentNode.insertBefore(startedEl, targetEl.nextElementSibling);
			} catch(err) {}
		}
		updateTopLeft(e);
	}

	function dragEnd() {
		startedEl.classList.remove('no-visible');
		clonedEl.parentNode.removeChild(clonedEl);
		clonedEl = startedEl = null;
		container.classList.remove('drag-drop-moving');
		container.parentElement.classList.remove('child-moving');
	}

	function isBefore(el1, el2) {
		if (el2.parentNode.parentNode === el1.parentNode.parentNode) {
			for (var cur = el1.previousSibling; cur; cur = cur.previousSibling) {
				if (cur === el2) {
					return true;
				}
			}
		}
		return false;
	}

	function updateTopLeft(e) {
		var dragX = e.pageX, dragY = e.pageY;
		leftPos = (dragX - container.offsetParent.offsetLeft - (startedEl.offsetWidth / 2));
		topPos = (dragY - (container.offsetParent.offsetTop - container.offsetParent.scrollTop) - (startedEl.offsetHeight / 2));
		clonedEl.style.top = topPos + 'px';
		clonedEl.style.left = leftPos + 'px';
	}

	// start methods
	window.addEventListener('load', function () {
		if (draggable) {
			[].forEach.call(draggable, function(drag) {
				drag.addEventListener('dragend', dragEnd);
				drag.addEventListener('dragover', dragOver);
				drag.addEventListener('dragstart', dragStart);
				drag.addEventListener('drag', drag);
				// firefox issue
				drag.addEventListener('drop', drop);
			});
		}
	});

})();
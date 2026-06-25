/* poetize 风格交互：打字机 + 樱花飘落 */
(function () {
	'use strict';

	// ---------- 打字机 ----------
	function initTyped() {
		var el = document.getElementById('kira-typed-text');
		var data = document.getElementById('kira-typed-data');
		if (!el || !data) return;

		var texts;
		try {
			texts = JSON.parse(data.textContent.trim());
		} catch (e) {
			texts = [];
		}
		if (!texts.length) return;

		var line = 0;
		var char = 0;
		var deleting = false;

		function tick() {
			var full = texts[line % texts.length];
			if (deleting) {
				char--;
			} else {
				char++;
			}
			el.textContent = full.substring(0, char);

			var delay = deleting ? 60 : 150;
			if (!deleting && char === full.length) {
				delay = 1800; // 打完停顿
				deleting = true;
			} else if (deleting && char === 0) {
				deleting = false;
				line++;
				delay = 400;
			}
			setTimeout(tick, delay);
		}
		tick();
	}

	// ---------- 樱花飘落 ----------
	function initSakura() {
		if (document.body.getAttribute('data-sakura') !== 'true') return;
		if (window.matchMedia && window.matchMedia('(max-width: 1000px)').matches) return;

		var petals = ['❀', '✿', '❁'];
		var max = 14;

		function spawn() {
			var span = document.createElement('span');
			span.className = 'kira-sakura';
			span.textContent = petals[Math.floor(Math.random() * petals.length)];

			var size = 10 + Math.random() * 14;
			var startX = Math.random() * window.innerWidth;
			var duration = 8000 + Math.random() * 7000;
			var drift = (Math.random() - 0.5) * 240;
			var rotate = 360 + Math.random() * 360;

			span.style.left = startX + 'px';
			span.style.fontSize = size + 'px';
			span.style.opacity = 0.4 + Math.random() * 0.5;

			document.body.appendChild(span);

			var anim = span.animate(
				[
					{ transform: 'translate(0, 0) rotate(0deg)' },
					{
						transform:
							'translate(' + drift + 'px, ' + (window.innerHeight + 80) + 'px) rotate(' + rotate + 'deg)'
					}
				],
				{ duration: duration, easing: 'linear' }
			);
			anim.onfinish = function () {
				span.remove();
			};
		}

		// Web Animations API 兜底
		if (!document.body.animate) return;
		for (var i = 0; i < max; i++) {
			setTimeout(spawn, i * 600);
		}
		setInterval(spawn, 1100);
	}

	function ready(fn) {
		if (document.readyState !== 'loading') {
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	}

	ready(function () {
		initTyped();
		initSakura();
	});
})();

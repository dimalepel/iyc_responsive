'use strict';

ready(function () {
    //добавление стрелок к ссылкам содержацим подменю
    (function () {
        var el = document.querySelectorAll('.header-nav>ul>li ul');

        el.forEach(function (item) {
            item.parentNode.classList += ' dropdown';
        });
    })();

    //анимация выпадающих меню
    (function () {
        var el = document.querySelectorAll('.header-nav>ul>li>ul');

        el.forEach(function (item) {
            var height = 0,
                elInner = item.children;

            [].forEach.call(elInner, function (elem) {
                height += elem.offsetHeight;
            });

            item.parentElement.onmouseenter = function () {
                item.style.height = height + 'px';
            };
            item.parentElement.onmouseleave = function () {
                item.style.height = 0;
            };
        });
    })();

    //аккордеон FAQ
    (function () {
        var el = document.querySelectorAll('.question__title');

        el.forEach(function (item) {

            item.addEventListener('click', function () {

                var height = this.nextElementSibling.scrollHeight + 'px';

                if (this.parentElement.classList.contains('active')) {
                    this.nextElementSibling.style.height = '0';
                    this.parentElement.classList.remove('active');
                    return;
                }

                el.forEach(function (item) {
                    item.nextElementSibling.style.height = '0';
                    item.parentElement.classList.remove('active');
                });

                this.parentElement.classList.toggle('active');
                this.nextElementSibling.style.height = height;
            });
        });
    })();

    /////////////////////////////////////////////////////////////////
    function inputFilter() {
        if (document.querySelectorAll('.sale-filter__wrap').length) {
            (function () {

                //проверки
                var maxColumn = function maxColumn() {
                    var width = 0,
                        count = 0;
                    for (var i = 0; i < arrNew.length; i++) {
                        width += arrNew[i].offsetWidth + 60;
                        count++;
                        if (width > maxWidth) {
                            count--;
                            return count;
                        }
                    }
                };

                //сортировка input по длине и рассчет колонок
                var arr = document.querySelectorAll('.sale-filter__el'),
                    arrNew = [],
                    wrap = document.querySelector('.sale-filter__wrap'),
                    maxWidth = wrap.offsetWidth,
                    columns = 0;

                arr.forEach(function (item) {
                    arrNew.push(item);
                });

                arrNew.sort(function (a, b) {
                    return b.offsetWidth - a.offsetWidth;
                });

                var elInColumn = Math.ceil(arrNew.length / maxColumn()),
                    maxCol = maxColumn();

                //колонки
                for (var i = 0; i < maxCol; i++) {
                    (function () {
                        var div = document.createElement('div');
                        div.classList.add('sale-filter__column');

                        //запихиваем элементы в колонку
                        for (var _i = 0; _i < elInColumn; _i++) {
                            if (arrNew.length) {
                                div.append(arrNew.shift());
                            }
                        }

                        wrap.append(div);
                    })();
                }

                document.querySelectorAll('.sale-filter__column').forEach(function (item) {
                    item.classList.add('js-calculated');
                });

                document.querySelector('.sale-filter__wrap').classList.add('js-calculated');
            })();
        }
    }

    ///////////////////////////////
    cutLengthString('.selling-catalog__title', 70, '...');
    cutLengthString('.events-el__title', 50, '...');
    cutLengthString('.sale-catalog__title', 70, '...');
    cutLengthString('.news__title', 99, '...');

    checkedInput();
    resetInput();
    toUp(600, '.up-btn');
    classAfterScroll(0, '.header', 'header_dark');
    dropHover('.recall-main-phone', '.recall-phones');
    inputFilter();
});

/**
 * $(document).ready(function(){}); for JS
 * @param fn - function(){our functions}
 */
function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

/**
 * crop text char length
 *
 * @param el string
 * @param maxLength integer
 * @param endSimbols string
 */
function cutLengthString(el) {
    var maxLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
    var endSimbols = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var arr = document.querySelectorAll(el);

    arr.forEach(function (item, i) {
        //удаление переноса строк и табуляций
        var text = item.textContent.replace(/\s+/g, ' '),
            resultText = void 0;
        if (text.length > +maxLength) {
            resultText = text.slice(0, maxLength).trim() + endSimbols;
            item.textContent = resultText;
        }
    });
}

/**
 * custom input[type='chekbox']
 * toggle class active to parent element input (label) after click
 */
function checkedInput() {
    var checkbox = document.documentElement.querySelectorAll('input[type="checkbox"]');

    checkbox.forEach(function (item) {
        item.addEventListener('click', function () {
            if (this.checked) {
                this.parentElement.classList.add('active');
            } else {
                this.parentElement.classList.remove('active');
            }
        });
    });
}

/**
 * reset for custom input[type='chekbox']
 */
function resetInput() {
    var resetButton = document.documentElement.querySelectorAll('input[type="reset"]'),
        checkbox = document.documentElement.querySelectorAll('input[type="checkbox"]');

    resetButton.forEach(function (item) {
        item.addEventListener('click', function () {
            checkbox.forEach(function (el) {
                setTimeout(function () {
                    if (!el.checked) {
                        el.parentElement.classList.remove('active');
                    }
                }, 100);
            });
        });
    });
}

/**
 * up button
 * @param topPosition integer - show button after topPosition scroll
 * @param btn string - btn class or id
 */
function toUp(topPosition, btn) {
    var goTopBtn = document.querySelector(btn);

    classAfterScroll(topPosition, btn, 'show');

    function backToTop() {
        if (window.pageYOffset > 0) {
            window.scrollBy(0, -20);
            setTimeout(backToTop, 0);
        }
    }

    goTopBtn.addEventListener('click', backToTop);
}

/**
 *
 * @param scroll integer, events after scroll (px)
 * @param target string, target class or id
 * @param addClassName string
 */

	function classAfterScroll(scroll, target, addClassName) {
			var targetClass = document.querySelector(target);

			function scrollWindow() {
					if (window.pageYOffset > scroll) {
							targetClass.classList.add(addClassName);
					} else {
							targetClass.classList.remove(addClassName);
					}
			}

			window.addEventListener('scroll', scrollWindow);
	}


/**
 * sum all inner heights
 * @param target string, class or id
 */
function sumInnerHeight(target) {
    var targetEl = document.querySelector(target),
        elInner = targetEl.children,
        height = 0;

    [].forEach.call(elInner, function (elem) {
        height += Math.max(elem.offsetHeight, parseInt(getComputedStyle(elem).lineHeight));
    });
    console.log(height);
    return height;
}

/**
 * hover and dropdown
 * @param target string, events after hover on block
 * @param dropBlock string
 */
function dropHover(target, dropBlock) {
    var phone = document.querySelector(target),
        drop = document.querySelector(dropBlock),
        isLeave = false;

    if (drop.children.length) {
        phone.classList.add('js-drop-arrow');
    }

    function leaveBlocks() {
        setTimeout(function () {
            if (isLeave) {
                drop.style.height = 0;
                drop.classList.remove('js-active');
                phone.classList.remove('js-active');
            }
        }, 1000);
    }

    phone.onmouseenter = function () {
        drop.style.height = sumInnerHeight(dropBlock) + 'px';
        drop.classList.add('js-active');
        phone.classList.add('js-active');
        isLeave = false;
    };
    phone.onmouseleave = function () {
        isLeave = true;
        leaveBlocks();
    };
    drop.onmouseenter = function () {
        isLeave = false;
    };
    drop.onmouseleave = function () {
        isLeave = true;
        leaveBlocks();
    };
}

//цветные изображения при ховере
function hoverColorImg(target, dataName) {
    var newSrc = void 0,
        src = void 0,
        oldSrc = void 0,
        thisImg = void 0;

    $(document).on('mouseenter', target, function () {
        thisImg = $(this).find('img');
        newSrc = thisImg.attr(dataName);
        oldSrc = thisImg.attr('src');
        src = thisImg.attr('src', newSrc);
    });

    $(document).on('mouseleave', target, function () {
        thisImg.attr('src', oldSrc);
    });

    // if ($(window).width() <= 768) {
    //
    //     $(target).each(function () {
    //         thisImg = $(this).find('img');
    //         newSrc = thisImg.attr(dataName);
    //         src = thisImg.attr('src', newSrc);
    //     });
    //
    // }
}

hoverColorImg('.employers__social a', 'data-hover-src');
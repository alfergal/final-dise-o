
(function($) {
    $.fn.extend({
        formProgress: function(options) {
            var st = {
                speed: 200,
                style: "green",
                bubble: true,
                selector: ".required",
                minPercent: 100,
                message: "Rellena todos los campos !"
            };
            if (options) {
                $.extend(st, options);
            }
            var _this = $(this),
                sel = st.selector,
                mainForm = $(sel).parents("form"),
                names = [],
                timer;
            $(sel + ":radio").each(function() {
                var n = $(this).attr("name");
                if ($.inArray(n, names) < 0) {
                    names.push(n);
                }
            });
            var totalInputs = $(sel).not(":radio").length + names.length;
            $(mainForm).find(sel + ":checkbox, " + sel + ":radio, select" + sel).on("change", function() {
                animateBar.call(_this);
            });
            $(mainForm).find("input[type=text]" + sel + ", input[type=password]" + sel + ", textarea" + sel).on("keyup", function() {
                timer && clearTimeout(timer);
                timer = setTimeout(function() {
                    animateBar.call(_this);
                }, 300);
            });
            return this.each(function() {
                animateBar.call(_this);
            });

            function animateBar() {
                var vars = barData();
                _this.attr("class", st.style);
                $(this).stop().animate({
                    width: vars.toPercent * vars.ratio
                }, st.speed);
                if (st.bubble) {
                    if (vars.bubble.length === 0) {
                        $(this).parent().append('<div class="bubble"><div class="percent">' + vars.toPercent + '%</div><div class="arrow"></div></div>');
                        vars.bubble = $(this).next();
                    } else {
                        vars.bubble.find(".percent").text(vars.toPercent + "%");
                    }
                    vars.bubble.stop().animate({
                        left: (vars.toPercent * vars.ratio) - 5
                    }, st.speed);
                } else {
                    $(this).parent().parent().find('label').find('span').text(vars.toPercent + "% completado");
                }
                preventSubmit(vars.toPercent);
            }

            function barData() {
                var filled = $(sel).filter(function() {
                    return $(this).val();
                }).not(":checkbox, :radio").length + $(sel + ":checked").length;
                return {
                    filled: filled,
                    ratio: _this.parent().width() / 100,
                    toPercent: Math.round((filled * 100) / totalInputs),
                    bubble: _this.next()
                };
            }

            function preventSubmit(percentage) {
                if (!st.minPercent) {
                    return false;
                }
                var targetInput = mainForm.find("input[type=button]");
                if (percentage < st.minPercent) {
                    targetInput.attr("onclick", "alert('" + st.message + " No has completado el " + st.minPercent + "% del cuestionario'); return false;");
                }else{
                    targetInput.attr('onclick', resultadoCuestionario());
                    document.getElementById('bloque-meter').style.display="none";
                    document.getElementById('cuestionario').reset();
                }
            }
        }
    });
})(jQuery);
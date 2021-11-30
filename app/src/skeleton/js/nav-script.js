
    $(document).ready(function () {
        $(".offcanvas-nav").on("click", "a[data-tabs]", function (e) {
            e.stopPropagation();
            var a = $(this),
                li = a.parent(),
                ul = li.parent(),
                intogglemode = $(".nav-pane-toggle").is(":visible"),
                hasul = li.children("ul.collapse").length > 0,
                hasulin = li.children("ul.collapse.in").length > 0;

            //ul.find("ul.collapse.in").collapse("hide");
            ul.children("li").not(li).find("ul.collapse.in").collapse("hide");
            ul.find("li").removeClass("selected");

            li.addClass("selected").find("ul.collapse").collapse("show");

            if (!hasul || !intogglemode || hasulin) {
                $(".exhibit").trigger("content.change", [{
                    "data-tabs": $.parseJSON($(this).attr("data-tabs")),
                    "url": $(this).attr("href")
                }]);
                $(".offcanvas-content").removeClass("nav-pane-open");
            }
            return false;
        });


        $(".offcanvas-nav > li").filter(function (i) {
            return ($(this).hasClass("selected") && $(this).find(".children").length == 0) || (i == 0);
        }).find("a:first").trigger("click");

        $(".nav-pane-toggle").click(function () {
            $(".offcanvas-content").addClass("nav-pane-open");
        });

    });

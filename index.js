$(function() {
    //초등
    $('.pri .work-list dd:nth-child(2)').each(function() {
        var $link = $(this);
        if ($link.find('a').length === 0) {
            var text = $link.text().trim();
            if (text.length > 0) {
                $link.html(
                    '<a href="https://nec-works.github.io/primary' + text + '" target="_blank">' + text + '</a>'
                );
            }
        }
    });
    $('.pri .work-list dd:nth-child(3)').each(function() {
        var $live = $(this);
        if ($live.find('a').length === 0) {
            var text = $live.text().trim();
            if (text.length > 0) {
                $live.html(
                    '<a href="https://primary.ebs.co.kr' + text + '" target="_blank">' + text + '</a>'
                );
            }
        }
    });

    //중학
    $('.mid .work-list dd:nth-child(2)').each(function() {
        var $link = $(this);
        if ($link.find('a').length === 0) {
            var text = $link.text().trim();
            if (text.length > 0) {
                $link.html(
                    '<a href="https://nec-works.github.io/mid' + text + '" target="_blank">' + text + '</a>'
                );
            }
        }
    });
    $('.mid .work-list dd:nth-child(3)').each(function() {
        var $live = $(this);
        if ($live.find('a').length === 0) {
            var text = $live.text().trim();
            if (text.length > 0) {
                $live.html(
                    '<a href="https://mid.ebs.co.kr' + text + '" target="_blank">' + text + '</a>'
                );
            }
        }
    });

});
<!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
<?php
if ($context->isVideo()) {
    echo $savvy->render($context, 'MediaPlayer/Video.tpl.php');
} else {
    echo $savvy->render($context, 'MediaPlayer/Audio.tpl.php');
}
?>
<script>
(function() {
var j, l, t, r = function() {
    WDN.initializePlugin('mediaelement_wdn', [function(){
        WDN.jQuery('#player').mediaelementplayer();
    }]);
};
if (typeof(WDN) === 'undefined') {
    t = '//www.unl.edu/';
    l = function() {
        l = function(){}; WDN.template_path = t; r();
    };
    j = document.createElement('script'); j.type = 'text/javascript'; j.src = t + 'wdn/templates_3.1/scripts/wdn.js';
    j.onreadystatechange = function() {
        if (j.readyState == 'loaded' || j.readyState == 'complete') {
            l();
        }
    };
    j.onload = l; document.getElementsByTagName("head")[0].appendChild(j);
} else {
    r();
}
})();
</script>
<div id="feedlist">
    <h1>Available Channels</h1>
    <p>Select a channel to view.</p>
    <?php
    if (count($context->items)) {
        $pager_layout = new Doctrine_Pager_Layout($context->pager,
        new Doctrine_Pager_Range_Sliding(array('chunk'=>5)),
        UNL_MediaYak_Controller::getURL(null, array_merge($context->options, array('page'=>'{%page_number}'))));
        $pager_layout->setTemplate(' <a href="{%url}">{%page}</a> ');
        $pager_layout->setSelectedTemplate('{%page}');
        $pager_links = $pager_layout->display(null, true);
        echo '<ul>';
        foreach ($context->items as $feed) {
            echo '<li><a href="'.htmlentities(UNL_MediaYak_Controller::getURL($feed)).'">'.$feed->title.'</a> <a href="'.UNL_MediaYak_Controller::getURL($feed, array('format'=>'xml')).'" class="feed-icon"></a>
            <div class="description">'.$feed->description.'</div>
            </li>';
        }
        echo '</ul>';
        ?>
        <em>Displaying <?php echo $context->first; ?> through <?php echo $context->last; ?> out of <?php echo $context->total; ?></em>
        <div class="wdn_pagination"><?php echo $pager_links; ?></div>
<?php 
    } else {
        echo '
        <p>
            Sorry, I could not find any channels.
        </p>';
    }
    ?>
</div>
<?php
$context->feed->loadReference('UNL_MediaYak_Feed_NamespacedElements_itunes');
$context->feed->loadReference('UNL_MediaYak_Feed_NamespacedElements_media');
echo '<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL;
?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:itunesu="http://www.itunesu.com/feed" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title><?php echo $context->feed->title; ?></title>
    <link><?php echo UNL_MediaYak_Controller::getURL($context->feed); ?></link>
    <description><?php echo $context->feed->description; ?></description>
    <language>en-us</language>
    <pubDate><?php echo date('r'); ?></pubDate>
    <lastBuildDate><?php echo date('r'); ?></lastBuildDate>
    <docs>http://www.rssboard.org/rss-specification</docs>
    <generator>UNL_MediaYak 0.1.0</generator>
    <managingEditor>editor@example.com</managingEditor>
    <webMaster>brett.bieber@gmail.com (Brett Bieber)</webMaster>
    <ttl>5</ttl>
    <?php if ($context->feed->hasImage()) : ?>
    <itunes:image href="<?php echo UNL_MediaYak_Controller::getURL($context->feed); ?>/image" />
    <image>
        <url><?php echo UNL_MediaYak_Controller::getURL($context->feed); ?>/image</url>
        <title><?php echo htmlspecialchars($context->feed->image_title, ENT_QUOTES); ?></title>
        <link><?php echo UNL_MediaYak_Controller::getURL($context->feed); ?></link>
        <?php if (isset($context->feed->image_description)): ?>
            <description><?php echo htmlspecialchars($context->feed->image_description); ?></description>
        <?php endif; ?>
    </image>
    <?php endif;
    foreach (array('UNL_MediaYak_Feed_NamespacedElements_itunes',
                   'UNL_MediaYak_Feed_NamespacedElements_media') as $ns_class) {
        foreach ($context->feed->$ns_class as $namespaced_element) {
            $element = "{$namespaced_element['xmlns']}:{$namespaced_element['element']}";
            echo "<$element>{$namespaced_element['value']}</$element>\n";
        }
    }
    echo $savvy->render($context->media_list);
    ?>
    </channel>
</rss>

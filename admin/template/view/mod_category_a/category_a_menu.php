<?php
if (!defined('IN_CONTEXT')) die('access violation error!');

if (!function_exists('showCategoryMenuA')) {
    function showCategoryMenuA(&$category_tree) {
        // TODO : Deal with article categoried list link in menu
        foreach ($category_tree as $category) {
    ?>
    <li>
    <?php
            if (sizeof($category->slaves['ArticleCategory']) > 0) {
    ?>
    <span><?php echo $category->name; ?></span>
	<ul>
        <?php showCategoryMenuA($category->slaves['ArticleCategory']); ?>
    </ul>
    <?php
            } else {
    ?>
    <a href="<?php echo Html::uriquery('mod_article', 'fullist', array('caa_id' => $category->id)); ?>">
    <?php echo $category->name; ?></a>
    <?php
            }
    ?>
    </li>
    <?php
        }
    }
}
$id_seed = Toolkit::randomStr();
?>

<ul id="category_a_menu_<?php echo $id_seed; ?>">
	<?php showCategoryMenuA($categories); ?>
</ul>

<script type="text/javascript" language="javascript">
<!--
	$(function() {
        $('#category_a_menu_<?php echo $id_seed; ?>').ddMenu({
            rootTitle: "<?php echo ParamHolder::get('block_title'); ?>"
        });
    });
//-->
</script>

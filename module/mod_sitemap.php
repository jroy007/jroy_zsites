<?php
if (!defined('IN_CONTEXT')) die('access violation error!');
class ModSitemap extends Module {
protected $_filters = array(
);
public function create_sitemap(){
$tag = ParamHolder::get('tag','b');
$url = $_SERVER[HTTP_HOST].$_SERVER['PHP_SELF'];
$xml = $this->xml_header($tag);
$xml .= $this->article_map($tag,$url);
$xml .= $this->prod_map($tag,$url);
$xml .= $tag=='b'?'</document>':'</urlset>';
if ($tag=='b') {
$fp = fopen(ROOT.'/file/'.THISSITE.'sitemap_baidu.php','wb');
}else{
$fp = fopen(ROOT.'/file/'.THISSITE.'sitemap.php','wb');
}
if (@fwrite($fp,$xml)) {
echo 'XML文件生成成功';
}else{
echo 'XML文件生成失败，请检查根目录下是否有写权限';
}
fclose($fp);
exit;
}
public function xml_header($tag){
if ($tag=='b') {
$email = SessionHolder::get('user/email');
$_site = SessionHolder::get('_SITE');
$site_name = $_site->site_name;
$xml = '<?xml version="1.0" encoding="UTF-8"?>
	    			<document>
	    			<webSite>'.$site_name.'</webSite>
	    			<webMaster>'.$email.'</webMaster>
	    			<updatePeri>15</updatePeri>';
}else{
$xml = '<?xml version="1.0" encoding="UTF-8"?>
    				<urlset xmlns="http://www.google.com/schemas/sitemap/0.84">';
}
return $xml;
}
public function article_map($tag,$url){
$o_article = new Article();
$articles = $o_article->findAll();
foreach ($articles as $article){
if(MOD_REWRITE=='2'){
$tmp = 'http://'.str_replace('/index.php','',$url).'/mod_article-article_content-article_id-'.$article->id.'.html';
}else{
$tmp = 'http://'.$url.'?_m=mod_article&amp;_a=article_content&amp;article_id='.$article->id;
}
if ($tag=='g') {
$str .= '<url>
    						<loc>'.$tmp.'</loc>
    						<lastmod>'.date('Y-m-d H:i:s',$article->create_time).'</lastmod>
    						<changefreq>weekly</changefreq>
    						<priority>0.8</priority>
    					</url>';
}else{
$o_category = new ArticleCategory();
$category = $o_category->find("id=?",array($article->article_category_id));
$cate = $category->name;
$str .= '<item>
	    					<title>'.$article->title.'</title>
	    					<link>'.$tmp.'</link>
	    					<description>'.$article->description.'</description>
	    					<text>'.$article->intro.'</text>
	    					<keywords>'.$article->tag.'</keywords>
	    					<category>'.$cate.'</category>
	    					<author>'.$article->author.'</author>
	    					<source>'.$article->source.'</source>
	    					<pubDate>'.date('Y-m-d H:i:s',$article->create_time).'</pubDate>
	    				</item>';
}
}
return $str;
}
public function prod_map($tag,$url){
$o_product = new Product();
$products = $o_product->findAll();
foreach ($products as $product){
if(MOD_REWRITE=='2'){
$tmp = 'http://'.str_replace('/index.php','',$url).'/mod_product-view-p_id-'.$product->id.'.html';
}else{
$tmp = 'http://'.$url.'?_m=mod_product&amp;_a=view&amp;p_id='.$product->id;
}
if ($tag=='g') {
$str .= '<url>
    						<loc>'.$tmp.'</loc>
    						<lastmod>'.date('Y-m-d H:i:s',$product->create_time).'</lastmod>
    						<changefreq>weekly</changefreq>
    						<priority>0.8</priority>
    					</url>';
}else{
$o_category = new ProductCategory();
$category = $o_category->find("id=?",array($product->product_category_id));
$cate = $category->name;
$str .= '<item>
	    					<title>'.$product->name.'</title>
	    					<link>'.$tmp.'</link>
	    					<description>'.$product->meta_desc.'</description>
	    					<text>'.$product->introduction.'</text>
	    					<keywords>'.$product->meta_key.'</keywords>
	    					<category>'.$cate.'</category>
	    					<pubDate>'.date('Y-m-d H:i:s',$product->create_time).'</pubDate>
	    				</item>';
}
}
return $str;
}
}
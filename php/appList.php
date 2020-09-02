<?php
	function run(){
		$dir = "../app/";
		$files = [];
		if(@$handle = opendir($dir)) {
			while(($file = readdir($handle)) !== false) {
				if($file != ".." && $file != "." && is_dir($dir . "/" . $file) && file_exists($dir . "/" . $file . "/index.html")) {
					$data = [];
					if(file_exists($dir . "/" . $file . "/config.json")){
						$text = file_get_contents($dir . "/" . $file . "/config.json");
						$config = json_decode($text);
						$data["name"] = $config->name;
						$data["icon"] = "app/" . $file . "/" . $config->icon;
						$data["app"]  = "app/" . $file . "/index.html";
						$data["width"] = $config->width;
						$data["height"] = $config->height;
						$data["only"] = $config->only;
					}else{
						$data["name"] = "应用";
						$data["icon"] = "/src/app.svg";
						$data["app"]  = "app/" . $file . "/index.html";
						$data["width"] = 500;
						$data["height"] = 500;
						$data["only"] = true;
					}
					$files[] = $data;
				}
			}
			closedir($handle);
		}
		return json_encode($files);
	}
?>
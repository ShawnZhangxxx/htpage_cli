# htpage_cli

## 准备工作

 1. 不建议在nodeJS6.x之外的版本上运行。低于6版本会有一些特性无法使用，高于6则无法使用fis3工具（该工具用于css打包）。如果版本不对，请去目录下寻找node-v6.14.4-x64.msi安装包。   
 	 node版本请在cmd下执行node -v 命令。如图所示  
	 ![doc/img/node版本.png](doc/img/node版本.png)
 2. 执行目录下的bat脚本，可以关联htpage命令
 3. 然后就可以执行命令了。如图所示为正常情况  
     ![doc/img/htpage.png](doc/img/htpage.png) 

## 使用方式

  - -m 参数：moduleName；功能：创建模块   
	 举例说明：htpage -m module1 :创建名为module1的新模块，同时创建了css与module下的文件

  - -c 参数：moduleName componentName；功能：创建弹出层
  	 举例说明：htpage -c file createFile :创建file模块的一个名叫createFile的弹出层

  - -l 参数：moduleName pageName；功能：创建列表
	 举例说明：htpage -l file 0130 :创建file模块的一个名叫0130的列表画面
	 htpage -l file fileType :创建file模块的一个名叫fileType的列表画面
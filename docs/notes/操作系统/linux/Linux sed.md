##在文件最后面追加一行 使用$a
sed -i '$aJAVA_HOME="/home/ning/.jdks/openjdk-16.0.2"' /home/ning/.bashrc
sed -i '$aPATH=$PATH:$JAVA_HOME/bin' /home/ning/.bashrc
tail /home/ning/.bashrc
source /home/ning/.bashrc
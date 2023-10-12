
## Linux 查看硬件信息

```bash
# 查看主板信息
dmidecode |grep -A16 "System Information$"


# 可以查看cpu信息
lscpu

# 休眠
systemctl suspend

```


## Linux 内核编译

1. install tool..
sudo apt-get install git fakeroot build-essential ncurses-dev xz-utils libssl-dev bc flex libelf- dev bison

2. 从当前机器的启动⽬录拷⻉配置信息到源代码⽬录。这步操作的意思是我们编译内核的配置采⽤ ⽤当前环境⼀致的配置。
cp -v /boot/config-$(uname -r) .config

3. start menu config tool
make menuconfig

4. start compile
make -j 10 上⾯参数是并发数量，通常可以是CPU的2倍。

5. make && sudo make install

6. 查看内核版本
uname -mrs


7. error
  CALL    scripts/checksyscalls.sh
  CALL    scripts/atomic/check-atomics.sh
  DESCEND objtool
  CHK     include/generated/compile.h
  CHK     kernel/kheaders_data.tar.xz
make[1]: *** No rule to make target 'debian/canonical-certs.pem', needed by 'certs/x509_certificate_list'.  Stop.
make: *** [Makefile:1858: certs] Error 2

vim .config
然后找到
CONFIG_SYSTEM_TRUSTED_KEYS,将其设置为空,也就是下面这个样子。
CONFIG_SYSTEM_TRUSTED_KEYS=””



## Linux 调试内核

```bash
scripts/config --disable SYSTEM_REVOCATION_KEYS

scripts/config --disable SYSTEM_TRUSTED_KEYS

make bzImage
make
make install
they are different make target


how to install qemu in ubuntu
sudo apt install qemu-kvm qemu virt-manager virt-viewer libvirt-clients libvirt-daemon-system bridge-utils virtinst libvirt-daemon
refer:
https://www.atechtown.com/install-qemu-on-ubuntu/


```
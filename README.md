#博客的安装

# 1. 安装virtualenv
pip install virtualenv
cd ~
mkdir projects
cd projects
mkdir blog
virtualenv --no-site-packages -p /usr/local/python/bin/python3.7 blogvenv
source blogvenv/bin/activate

# 2. 安装git
yum install git-core

# 3. 安装homebrew
sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"


sudo yum groupinstall 'Development Tools' && sudo yum install curl git ruby bzip2-devel curl-devel expat-devel ncurses-devel zlib-devel

git clone https://github.com/Homebrew/linuxbrew.git ~/.linuxbrew


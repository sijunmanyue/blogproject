import os

import jieba

os.environ['DJANGO_SETTINGS_MODULE'] = 'blogproject.settings'


print(jieba.lcut_for_search('PHP7的性能是最快的吗？'))
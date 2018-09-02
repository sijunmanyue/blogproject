import random, math
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont


def _random_bg_color():
    """获取随机的背景颜色"""
    return random.randint(50, 250), random.randint(50, 255), random.randint(50, 255)


def _random_font_color():
    """获取随机的字体颜色"""
    return random.randint(200, 255), random.randint(0, 50), random.randint(0, 50)


def _random_line_point_color():
    """生成随机颜色"""
    return random.randint(0, 255), random.randint(10, 255), random.randint(64, 255)


def _random_char():
    """获取随机字符"""
    return random.choice([chr(random.randint(65, 90)), str(random.randint(1, 9)), chr(random.randint(97, 122))])


def _char_pos(index, length, size, font_size):
    """
    获取字符的插入点
    :param index: 字符的下标
    :param length: 验证码长度
    :param size: 验证码图片尺寸(width, height)
    :param font_size: 字体大小
    :return:
    """
    width, height = size
    grid_width = math.ceil(width / length)
    return random.randint(grid_width * index, grid_width * (index+1) - font_size), random.randint(0, height-font_size)


def draw(width=279, height=50, length=6, font_file='AaDongRiGuShi-2.ttf', font_size=30):
    """
    绘制验证码图片
    :param width: 图片宽度
    :param height: 图片高度
    :param length: 字符长度
    :param font_file: 字体文件
    :param font_size: 字体大小
    :return: data图片, code验证码
    """
    f = BytesIO()
    font = ImageFont.truetype('blog/static/blog/webfonts/captcha/' + font_file, font_size)

    img = Image.new(mode='RGB', size=(width, height), color=_random_bg_color())
    draw = ImageDraw.Draw(img, mode='RGB')

    char_list = []

    # 画字
    for i in range(length):
        char = _random_char()
        print('='*20, _char_pos(i, length, (width, height), font_size))
        draw.text(_char_pos(i, length, (width, height), font_size), char, _random_font_color(), font=font)
        char_list.append(char)

    # 写干扰点
    for i in range(40):
        draw.point([random.randint(0, width), random.randint(0, height)], fill=_random_line_point_color())

    # 写干扰圆圈
    for i in range(40):
        draw.point([random.randint(0, width), random.randint(0, height)], fill=_random_line_point_color())
        x = random.randint(0, width)
        y = random.randint(0, height)
        draw.arc((x, y, x + 4, y + 4), 0, 90, fill=_random_line_point_color())

    # 画干扰线
    for i in range(5):
        x1 = random.randint(0, width)
        y1 = random.randint(0, height)
        x2 = random.randint(0, width)
        y2 = random.randint(0, height)
        draw.line((x1, y1, x2, y2), fill=_random_line_point_color())

    img.save(f, "png")
    return f.getvalue(), ''.join(char_list)

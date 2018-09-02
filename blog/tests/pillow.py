import random
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont


def check_code(width=120, height=30, char_length=5, font_file='kumo.ttf', font_size=28):
    f = BytesIO()
    img = Image.new(mode='RGB', size=(width, height),
                    color=(random.randint(50, 250), random.randint(50, 255), random.randint(50, 255)))
    draw = ImageDraw.Draw(img, mode='RGB')

    char_list = []
    # 画字
    for i in range(char_length):
        char = random.choice([chr(random.randint(65, 90)), str(random.randint(1, 9)), chr(random.randint(97, 122)), ])
        font = ImageFont.truetype("blog/static/fonts/"+font_file, font_size)
        draw.text([i * 24, 0], char, (random.randint(200, 255), random.randint(0, 50), random.randint(0, 50)),
                  font=font)
        char_list.append(char)

    def rndColor():
        """
        生成随机颜色
        :return:
        """
        return (random.randint(0, 255), random.randint(10, 255), random.randint(64, 255))

    # 写干扰点
    for i in range(40):
        draw.point([random.randint(0, width), random.randint(0, height)], fill=rndColor())

    # 写干扰圆圈
    for i in range(40):
        draw.point([random.randint(0, width), random.randint(0, height)], fill=rndColor())
        x = random.randint(0, width)
        y = random.randint(0, height)
        draw.arc((x, y, x + 4, y + 4), 0, 90, fill=rndColor())

    # 画干扰线
    for i in range(5):
        x1 = random.randint(0, width)
        y1 = random.randint(0, height)
        x2 = random.randint(0, width)
        y2 = random.randint(0, height)
        draw.line((x1, y1, x2, y2), fill=rndColor())

    img.save(f, "png")
    data = f.getvalue()
    s_code = ''.join(char_list)
    return data,s_code
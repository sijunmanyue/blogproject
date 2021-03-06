from django import template
from blog.models import Category

register = template.Library()


@register.inclusion_tag(filename='blog/inclusion_tag/category_popup.html', name='category_popup')
def category_popup():
    sub_categories = Category.objects.filter(isShow=True, isSupCategory=True)
    category_tree = []
    for sup_category in sub_categories:
        sup_category_dict = {'code': sup_category.code, 'name': sup_category.name}
        sub_category_set = []
        for sub_category in sup_category.category_set.all():
            sub_category_dict = {'code': sub_category.code, 'name': sub_category.name}
            sub_category_set.append(sub_category_dict)
        sup_category_dict['sub_category_set'] = sub_category_set
        category_tree.append(sup_category_dict)

    return {'category_tree': category_tree}
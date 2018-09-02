from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.core.paginator import Page


class MyPage(Page):

    def __init__(self, page, width):
        super().__init__(page.object_list, page.number, page.paginator)
        self.width = width
        self.left_range = self.__get_left()
        self.right_range = self.__get_right()

    def __get_left(self):
        if self.number <= self.width:
            return range(1, self.number)
        else:
            return range(self.number - self.width, self.number)

    def __get_right(self):
        if self.number == self.paginator.num_pages:
            return []
        elif self.paginator.num_pages - self.number > self.width:
            return range(self.number + 1, self.number + self.width + 1)
        else:
            return range(self.number + 1, self.paginator.num_pages + 1)


class MyPaginator(Paginator):

    def __init__(self, object_list, per_page, orphans=0,
                 allow_empty_first_page=True):
        super().__init__(object_list, per_page, orphans, allow_empty_first_page)

    def get_my_page(self, number, width):

        return MyPage(super().get_page(number), width)


(function($){
    $(function () {
       tinymce.init({
          selector: "#id_content",
          width:740,
          height:400,
          toolbar: 'codesample preview link code insertdatetime' +
          '| media  image | undo redo |  formatselect | bold italic backcolor  ' +
          '| alignleft aligncenter alignjustify | bullist numlist outdent indent  | removeformat',
           menubar: false,
          plugins: "table advlist autolink lists link image imagetools codesample insertdatetime preview anchor textcolor",
          images_upload_url:'/blog/upload/'
       });
    });
})(django.jQuery);
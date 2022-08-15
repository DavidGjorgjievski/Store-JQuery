$(document).ready(function (){

    var html2;

   $("#list1 li").click(function (){
       $("#list1 li").removeClass("selected");
       var element = $(this);
       element.addClass("selected");

       var code = element.attr("title");

        getStores(code);
   })

   function getStores(code){
        $("#list2").html("")
        $.ajax({
            url: "https://"+code+".herokuapp.com/store_data",
            dataType: "json",
            success: function(data){
                // console.log(data);
                $.each(data.objects.stores,function(i,item){
                    var li = $("<li>");
                    var html = item.storeName + " " + item.region;
                    li.html(html);
                    li.attr("openHours", item.openHours);
                    li.attr("address", item.address);
                    li.attr("description", item.description);


                    var hour = li.attr("openHours");
                    var address = li.attr("address");
                    var description = li.attr("description");

                    html2 = li.html();

                    html2 += "<br>" + "Работно време: " + hour + "<br>" + "Адреса: " + address + "<br>" + "Опис: " + description;

                    li.attr("html1", html)
                    li.attr("html2", html2);
                    var flag = "zatvoreno";
                    li.attr("flag",flag);


                    li.appendTo("#list2");
                })
            }
        })
   }


   $(document).on("click", "#list2 li", function (){

    if(($(this).attr("flag"))=="zatvoreno"){



        var flag = "otvoreno";
        $(this).attr('flag',flag);
        $(this).html("");
        $(this).html($(this).attr("html2"));
    }
     else  if (($(this).attr("flag"))=="otvoreno"){

           var flag = "zatvoreno";
           $(this).attr('flag', flag);

        $(this).html("");
        $(this).html($(this).attr("html1"));
    }
   })

    $("#list2").sortable({
        connectWith: "#list3",
    });

   $("#list3").sortable({
       connectWith: "#list2",
   });
   
   

   
});

  

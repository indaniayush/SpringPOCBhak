	$(document).ready(function(){
				
				$("#category_menu").append("<ul class='nav nav-pills nav-stacked' >");
				
				$.ajax({
					url: "/SpringPocWebPrj_JWS/ProductCategory",
					type: "GET",
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function (result) {
						$.each(result, function(index, category) {
							$("#category_menu").append("<li><a href=JavaScript:call_sub_category('"+category.id+"','"+category.category_name+"'); > "+category.category_name+" </a></li>");
						});
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						console.log("Error : " + textStatus);
					}
				});
				$("#category_menu").append("</ul>");
			});
			
			function call_sub_category( category_id, category_desc ) {
				$("Label[for='show_heading']").html(category_desc);

				var str="";
				$.ajax({
					url: "/SpringPocWebPrj_JWS/ProductSubCategory/"+category_id,
					type: "GET",
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function (result) {	
						//alert("in success");
						$.each(result, function(index, sub_category) {
							  str+="<div class='row text-center'>";
							  str+="<div class='col-lg-10'>";
							  str+="<a href=javascript:call_populate_products('"+sub_category.id+"','"+sub_category.subcategory_name+"')>"; 
							  str+="<div class='thumbnail'> <p><br/><strong>"+sub_category.subcategory_name +"</strong><br/></p> </div> "; 
							  str+="</a> </div> </div>";
						});
						 if(str!=""){
							 $("#show_details").html(str);
						 }else{
							 $("#show_details").html("No Data Found.");
						 }
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						console.log("Error : " + textStatus);
					}
				});	
					
			}
		
			function call_populate_products(sub_category_id, sub_category_desc){
				$("Label[for='show_heading']").html(sub_category_desc);
				var item_count=0;
				var str="";
				
				$.ajax({
					url: "/SpringPocWebPrj_JWS/Product/"+sub_category_id ,
					type: "GET",
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function (result) {
							
							str="<div class='row text-center'>";	
							$.each(result, function(index, products) {
								if(item_count%3==0) {
									str+="<div class='row text-center' > <div class='col-lg-10'> ";
								}
									
								  str+=" <div class='col-sm-2'>";
								  str+="<a href=javascript:call_products_details(product.product_id)>"; 
								  str+="<div class='thumbnail'> <img src='"+products.picture+"' alt='"+products.productName +"' height='200' width='200' > " +
								  "<p><strong>"+products.productName +"</strong></p> Price : " + products.unitPrice + ", Description : " + products.note + " </div> "; 
								  str+="</a> </div> ";
								  
								  item_count++;
								
								if((item_count)%3==0) {
									str+=" </div> </div>"; 
								}
								
							});
							if(item_count==0){
								str+= "<h3> No Product Found! </h3>";
							}
							str+="</div> </div>";
							$("#show_details").html(str);
							
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						console.log("Error : " + textStatus);
						
					}
				});		
											
				
			}
			
			function call_search(search_by){
				var str=""; //alert("in...." + search_by.value);
				if(event.keyCode == 13 && search_by.value!="") {
					$("#show_details").html(str);
					
					$.ajax({
						url: "/SpringPocWebPrj_UI/SearchProduct/"+search_by.value ,
						type: "GET",
						//contentType: "application/json; charset=utf-8",
						dataType: "text",
						success: function (result) {
							//alert(result);
							str = "<div class='modal-dialog'> " +      
									"<div class='modal-content'> "+
										"<div class='modal-header'> "+
											"<h4 class='modal-title' id='myModalLabel'> Search result For <b>" + search_by.value + " </b>: </h4> "+
										"</div> "+
										"<div class='modal-body'>" +
										result +
										"</div>"+
										"<div class='modal-footer' align='center' >"+
										" <input type='button' value='Close' name='btn_close_modal' id='btn_close_modal' onclick='javascript:call_close_modal();'>" +
										"</div>" +
									"</div> "+
								"</div>";
							$("#show_panel").html(str);
							return false;
						},
						error: function (XMLHttpRequest, textStatus, errorThrown) {
							alert(XMLHttpRequest.status);
							alert(errorThrown);
							console.log("Error : " + textStatus);
						}
					});	 
					
			    }
				return false;
			}
		
			function call_close_modal(){
				$("#txt_product_search").val("");
				location.reload(true);
				
			}
			
			
			
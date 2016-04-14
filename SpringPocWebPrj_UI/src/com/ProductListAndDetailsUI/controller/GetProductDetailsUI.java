package com.ProductListAndDetailsUI.controller;


import java.util.Arrays;
import java.util.List;
import java.util.ListIterator;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.ProductListAndDetailsUI.model.Category;
import com.ProductListAndDetailsUI.model.Product;
import com.ProductListAndDetailsUI.model.SubCategory;
import com.google.gson.JsonObject;

@RestController
public class GetProductDetailsUI {
	
	@RequestMapping(value ="/SearchProduct/{searchByVal}", method=RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<String> getDetailsOnSearch(@PathVariable("searchByVal") String search_by_val, HttpServletRequest req){
		RestTemplate restTemplate = new RestTemplate();
		String url =  "http://" + req.getServerName() + ":" + req.getLocalPort() +  "/SpringPocWebPrj_JWS/ProductCategory/"+ search_by_val;
		String detail_str_to_return = "";
		Category[] categoryObj = restTemplate.getForObject(url, Category[].class);
		if(categoryObj!=null && categoryObj.length>0){
			detail_str_to_return += "<p> <b> Categories : </b> " ;
			for(int i=0; i< categoryObj.length; i++){
				detail_str_to_return += "<p>" + categoryObj[i].getCategory_name() + " </p> ";
			}
			detail_str_to_return +=" </p> ";
		}
		url =  "http://" + req.getServerName() + ":" + req.getLocalPort() +  "/SpringPocWebPrj_JWS/SearchSubCategory/"+ search_by_val;
		SubCategory[] subcategoryObj = restTemplate.getForObject(url, SubCategory[].class);
		if(subcategoryObj!=null && subcategoryObj.length>0){
			detail_str_to_return += "<br/><p> <b> SubCategories : </b>" ;
			for(int i=0; i< subcategoryObj.length; i++){
				detail_str_to_return += "<p>" + subcategoryObj[i].getSubcategory_name() + " </p> ";
			}
			detail_str_to_return +=" </p> ";
		}
		url =  "http://" + req.getServerName() + ":" + req.getLocalPort() +  "/SpringPocWebPrj_JWS/SearchProduct/"+ search_by_val;
		Product[] productObj = restTemplate.getForObject(url, Product[].class);
		if(productObj!=null && productObj.length>0){
			detail_str_to_return += "<br/> <p> <b> Products : </b> " ;
			for(int i=0; i< productObj.length; i++){
				detail_str_to_return += "<p>" + productObj[i].getProductName()  + " </p> ";
			}
			detail_str_to_return +=" </p> ";
		}
		if(detail_str_to_return.equals("")){
			detail_str_to_return = "No Data Found!";
		}
		detail_str_to_return ="<div >" + detail_str_to_return +"</div>";
		return new ResponseEntity<String>(detail_str_to_return, HttpStatus.OK);
	}
	
}

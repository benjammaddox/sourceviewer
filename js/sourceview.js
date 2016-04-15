
/****** 
Javascript written to get source code from a webpage and display that code on the page.
Will count html tags on the page and highlight them in the source view.

Written by: Ben Maddox
Date: 4/12/2016
Requires: jquery.js
********/

function highlightTag(tag){
	//TODO This doesn't really leverage jquery, could be updated to
	console.log(tag);
	var text = tag;
	var query = new RegExp("&lt;\\s*\/?\\s*" + text + "\\s*.*?&gt;", "gim");
	var e = document.getElementById("sourceCode").innerHTML;
	var enew = e.replace(/<\s*\/?\s*span\s*.*?>/gi, "");
	var newe = enew.replace(query, "<span>$&</span>");
	document.getElementById("sourceCode").innerHTML = newe;
}

function getTagsAndCounts(elementList){
	var dictionary = {};
	$.each(elementList, function(i,el) {
		if (dictionary[el.nodeName]){
			dictionary[el.nodeName] += 1;
		} else {
			dictionary[el.nodeName] = 1;
		}
	});
	return dictionary;
}

function resetData(){
	$(".tagRows").remove();
}

function getSource()
{
	resetData();
	var url = $("#url").val(), 
		crossOriginUrl = "https://61n6gcm045.execute-api.us-west-2.amazonaws.com/prod/httpProxy/",
		newElem = $("<div></div>"),
		elemDict = {};
	if (url != ""){
		url = crossOriginUrl + url;
	}
	//$("#sourceCode").load('test/index.html'); 
	$.ajax({
	  type:"GET",
	  url: url
	}).done(function(data){
		//Write the raw html to the source element
		$("#sourceCode").text(data);
		var html = $.parseHTML(data), elemList;		
		newElem.append(html);
		//TODO - KNOWN ISSUE
		//While this works, it does seem to drop certain tags - namely html, head and body
		elemList = newElem.find('*');
		elemDict = getTagsAndCounts(elemList);
		for(key in elemDict){
			$("#tags").append("<tr class=\"tagRows\"><td id=\"" + key 
					+ "\" onclick=\"highlightTag(this.id)\">"  
					 + key + "</td><td>" + elemDict[key] + "</td></tr>");
		}
	});	
	return false;
}